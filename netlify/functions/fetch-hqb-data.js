/**
 * MedAnalytica / CRIS GOLD™ — Netlify Serverless Function
 * POST /.netlify/functions/fetch-hqb-data
 *
 * Fetches the latest HQB (HeartQuest) recording for a patient.
 * Accepts: { email } OR { patientId } (HQB UUID)
 *
 * Queries the HQB Hasura GraphQL backend directly — the admin secret
 * never touches the browser.
 *
 * Returns: patient demographics + latest recording data (HRV metrics,
 * filtration rejections, health index, brain spectrum) ready for
 * auto-filling the CRIS GOLD™ New Patient form.
 */

const HQB_GRAPHQL_URL = 'https://api.heartquest-global.com/graphql';

const makeHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Hasura-Admin-Secret': process.env.HQB_ADMIN_SECRET,
});

async function gql(query, variables) {
  const res = await fetch(HQB_GRAPHQL_URL, {
    method: 'POST',
    headers: makeHeaders(),
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`HQB GraphQL HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data;
}

// ── Step 1: resolve email → UUID ─────────────────────────────────────────────
const GET_USER_BY_EMAIL = `
  query GetUsersByEmail($email: String!) {
    userByEmail(email: $email) {
      users {
        id
        email
        firstName
        lastName
        birthDate
      }
    }
  }
`;

// ── Step 2: fetch patient profile + recordings ───────────────────────────────
const GET_HEART_DATA = `
  query GetLatestRecordings($id: uuid!, $_eq: String!) {
    users_by_pk(id: $id) {
      data
      birth_date
      first_name
      last_name
      mobile_phone
    }
    user(id: $_eq) {
      firstName
      lastName
      birthDate
      email
    }
    heart_data(
      where: { owner: { _eq: $_eq }, deleted_on: { _is_null: true } }
      order_by: { created_on: desc }
      limit: 10
    ) {
      id
      title
      created_on
      data
      rr_metadata {
        total_rejected
        total_rr
        total_filtered_rr
        mean
        max
        min
      }
      brain_spectrum {
        delta
        theta
        alpha
        beta
        hbeta
      }
    }
  }
`;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!process.env.HQB_ADMIN_SECRET) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'HQB_ADMIN_SECRET environment variable is not set' }),
    };
  }

  let email, patientId;
  try {
    ({ email, patientId } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!email && !patientId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Provide either email or patientId' }),
    };
  }

  try {
    // ── Resolve email → patientId if needed ──────────────────────────────────
    let userId = patientId;

    if (email && !patientId) {
      const emailData = await gql(GET_USER_BY_EMAIL, { email: email.trim().toLowerCase() });
      const users = emailData?.userByEmail?.users || [];
      if (users.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'No HQB patient found with that email address' }),
        };
      }
      userId = users[0].id;
    }

    // ── Fetch profile + recordings ────────────────────────────────────────────
    const data = await gql(GET_HEART_DATA, { id: userId, _eq: userId });

    if (!data?.users_by_pk && !data?.user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Patient not found in HQB system' }),
      };
    }

    // ── Parse gender from users_by_pk.data JSON ───────────────────────────────
    let gender = '';
    try {
      const meta = JSON.parse(data.users_by_pk?.data || '{}');
      const raw = meta?.data?.gender || '';
      // Normalize to CRIS expected values
      if (raw.toLowerCase() === 'male')   gender = 'Male';
      if (raw.toLowerCase() === 'female') gender = 'Female';
    } catch { /* ignore parse errors */ }

    // ── Build patient demographics ────────────────────────────────────────────
    const patient = {
      firstName:    data.users_by_pk?.first_name || data.user?.firstName || '',
      lastName:     data.users_by_pk?.last_name  || data.user?.lastName  || '',
      dob:          data.users_by_pk?.birth_date || data.user?.birthDate || '',
      gender,
      phone:        data.users_by_pk?.mobile_phone || '',
      email:        data.user?.email || '',
      hqbPatientId: userId,
    };

    // ── Build recording list ──────────────────────────────────────────────────
    const recordings = (data.heart_data || []).map((r) => {
      const d   = r.data   || {};
      const rrm = r.rr_metadata || {};

      return {
        id:          r.id,
        title:       r.title || 'Untitled Recording',
        date:        r.created_on,

        // ── Direct CRIS form field mappings ──────────────────────────────────
        filtrationRejections: rrm.total_rejected ?? null,

        // healthIndex is 0–100 wellness score — best available proxy for ARI
        ari: d.healthIndex != null ? Math.round(d.healthIndex) : null,

        collectionDate: r.created_on
          ? r.created_on.split('T')[0]
          : null,

        // ── HRV metrics (passed to AI — no screenshot needed for these) ──────
        hrv: {
          sdnn:       d.timeDomain?.sdnn        ?? null,
          rmssd:      d.timeDomain?.rmssd       ?? null,
          meanHr:     d.timeDomain?.mean_hr     ?? null,
          minHr:      d.timeDomain?.min_hr      ?? null,
          maxHr:      d.timeDomain?.max_hr      ?? null,
          lf:         d.frequencyDomain?.lf     ?? null,
          hf:         d.frequencyDomain?.hf     ?? null,
          vlf:        d.frequencyDomain?.vlf    ?? null,
          lfHfRatio:  d.frequencyDomain?.lf_hf_ratio   ?? null,
          totalPower: d.frequencyDomain?.total_power    ?? null,
          hfPct:      d.frequencyDomain?.hf_percentage ?? null,
          lfPct:      d.frequencyDomain?.lf_percentage ?? null,
          vlfPct:     d.frequencyDomain?.vlf_percentage ?? null,
          stressIndex: d.stressIndex   ?? null,
          healthIndex: d.healthIndex   ?? null,
          hrvIndex:    d.hrvIndex      ?? null,
        },

        // ── Brain spectrum ────────────────────────────────────────────────────
        brainSpectrum: r.brain_spectrum
          ? {
              delta: r.brain_spectrum.delta,
              theta: r.brain_spectrum.theta,
              alpha: r.brain_spectrum.alpha,
              beta:  r.brain_spectrum.beta,
              hbeta: r.brain_spectrum.hbeta,
            }
          : null,

        // ── Extended biomarkers (all 40+ fields for AI) ───────────────────────
        bioMarkers: {
          // Autonomic / Polyvagal indicators
          bpm:              d.bpm              ?? null,
          icp:              d.icp              ?? null,  // "HIGH" | "WNL"
          dorsalVagus:      d.dorsalVagus      ?? null,
          cns_ans:          d.cns_ans          ?? null,
          yin_yang:         d.yin_yang         ?? null,
          mo:               d.mo               ?? null,
          amo:              d.amo              ?? null,
          ans:              d.ans              ?? null,
          tfi:              d.tfi              ?? null,
          rsai:             d.rsai             ?? null,
          mxdmn:            d.mxdmn            ?? null,
          // CV / metabolic
          cardio_vasc_adapt:  d.cardio_vasc_adapt  ?? null,
          neuro_hormonal_reg: d.neuro_hormonal_reg ?? null,
          inflamIndex:        d.inflamIndex        ?? null,
          bioAge:             d.bioAge             ?? null,
          ageDiff:            d.ageDiff            ?? null,
          // Doshas (Ayurvedic)
          doshas: d.doshas ? {
            vata:  d.doshas.vata  ?? null,
            pitta: d.doshas.pitta ?? null,
            kapha: d.doshas.kapha ?? null,
          } : null,
          // Chakras
          chakras: d.chakras ? {
            ep1: d.chakras.ep1 ?? null,
            ep2: d.chakras.ep2 ?? null,
            ep3: d.chakras.ep3 ?? null,
            ep4: d.chakras.ep4 ?? null,
            ep5: d.chakras.ep5 ?? null,
            ep6: d.chakras.ep6 ?? null,
            ep7: d.chakras.ep7 ?? null,
          } : null,
          // Five elements
          fiveElements: d.fiveElements ? {
            air:   d.fiveElements.air   ?? null,
            fire:  d.fiveElements.fire  ?? null,
            earth: d.fiveElements.earth ?? null,
            ether: d.fiveElements.ether ?? null,
            water: d.fiveElements.water ?? null,
          } : null,
          // Hormones
          hormones: d.hormones ? {
            dhea:         d.hormones.dhea         ?? null,
            t3_t4:        d.hormones.t3_t4        ?? null,
            insulin:      d.hormones.insulin      ?? null,
            cortisol:     d.hormones.cortisol     ?? null,
            estradiol:    d.hormones.estradiol    ?? null,
            pregnenolone: d.hormones.pregnenolone ?? null,
          } : null,
          // Minerals
          minerals: d.minerals ? {
            k:  d.minerals.k  ?? null,
            ca: d.minerals.ca ?? null,
            mg: d.minerals.mg ?? null,
            na: d.minerals.na ?? null,
          } : null,
          // Meridians
          meridians: d.meridians ? {
            bl: d.meridians.bl ?? null,
            gb: d.meridians.gb ?? null,
            ht: d.meridians.ht ?? null,
            ki: d.meridians.ki ?? null,
            li: d.meridians.li ?? null,
            lu: d.meridians.lu ?? null,
            lv: d.meridians.lv ?? null,
            pc: d.meridians.pc ?? null,
            si: d.meridians.si ?? null,
            sp: d.meridians.sp ?? null,
            st: d.meridians.st ?? null,
            tw: d.meridians.tw ?? null,
          } : null,
          // Neurotransmitter balance
          bnt: d.bnt ? {
            ach:   d.bnt.ach   ?? null,
            ct_e:  d.bnt.ct_e  ?? null,
            dopa:  d.bnt.dopa  ?? null,
            gaba:  d.bnt.gaba  ?? null,
            sert:  d.bnt.sert  ?? null,
            ct_ne: d.bnt.ct_ne ?? null,
          } : null,
        },

        // ── RR metadata summary ───────────────────────────────────────────────
        rrSummary: {
          totalRr:         rrm.total_rr         ?? null,
          totalRejected:   rrm.total_rejected   ?? null,
          totalFilteredRr: rrm.total_filtered_rr ?? null,
          mean:            rrm.mean             ?? null,
          max:             rrm.max              ?? null,
          min:             rrm.min              ?? null,
        },
      };
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient, recordings }),
    };

  } catch (err) {
    console.error('[fetch-hqb-data] Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Failed to fetch HQB data' }),
    };
  }
};

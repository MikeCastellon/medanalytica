/**
 * CRIS GOLD™ Drainage, Digestion & Resilience Support — v1.0 LOCKED
 * Source: Dr. Kessler's Mockup + Jeff T Quadrant Product Map (04-03-Docs)
 *
 * All data is deterministic — driven by CRIS GOLD quadrant (Q1–Q4).
 * No AI involvement. Products, dosing, gating, and sequencing are hardcoded.
 */

/* ── Quadrant Header Text ── */

export const QUADRANT_LOGIC_TEXT = {
  Q1: {
    interpretation: 'High emotional load + weak Autonomic Nervous System regulation',
    goal: 'Stabilize, unload gently, support digestion, protect resilience',
    warning: 'Starting too aggressively may cause die-off, bloating, or intolerance. Stabilize before advancing.',
  },
  Q2: {
    interpretation: 'High emotional load + strong resilience',
    goal: 'Unload dysbiosis without destabilizing regulation',
    warning: null,
  },
  Q3: {
    interpretation: 'Low emotional load + weak Autonomic Nervous System regulation',
    goal: 'Rebuild capacity, then expand microbiome',
    warning: null,
  },
  Q4: {
    interpretation: 'Low emotional load + strong resilience',
    goal: 'Maintain balance, prevent drift',
    warning: null,
  },
};

/* ── Sub-section Definitions (locked order) ── */

export const DDR_SECTIONS = [
  { key: 'nutrition',   label: 'Nutrition (Foundation)', order: 1, removable: false },
  { key: 'drainage',    label: 'Drainage',               order: 2, removable: false },
  { key: 'digestion',   label: 'Digestion',              order: 3, removable: false },
  { key: 'resilience',  label: 'Resilience Support',     order: 4, removable: false },
];

/* ── Nutrition (Foundation) ── */

export const NUTRITION_FOUNDATION = {
  dietName: 'Paleo-Based (Gluten-Free & Dairy-Free)',
  summary: 'Anti-inflammatory, nutrient-dense dietary framework to support elimination pathways.',
  goals: [
    'Improve digestion and bowel movements',
    'Support liver function',
    'Reduce irritation in the gut',
    'Improve elimination efficiency',
  ],
  foods: {
    protein: 'Grass-fed meats, wild fish, eggs',
    vegetables: 'Leafy greens, cruciferous vegetables',
    fats: 'Olive oil, avocado, nuts, seeds',
    fruits: 'Berries, apples, citrus',
  },
  explanation: 'Your body removes waste through systems such as the liver, digestive tract, kidneys, and lymphatics. When digestion is impaired, toxins recirculate, elimination slows, and inflammation increases. This nutrition plan is designed to improve digestion and support your body\'s natural elimination pathways.',
  patientExplanation: 'This nutrition plan helps your body process food better and supports your natural detox systems. Focus on whole, unprocessed foods while avoiding gluten and dairy.',
};

/* ── Drainage Products ── */

export const DRAINAGE_PRODUCTS = [
  {
    id: 'apo-hepat',
    name: 'apo-HEPAT',
    dose: '15\u201320 drops 3\u00d7/day in water',
    brand: 'Pekana / Bioresource',
    tag: 'Liver Drainage',
    quadrants: ['Q1', 'Q2', 'Q3', 'Q4'],
    clinicalRole: 'Supports liver detox pathways and bile flow.',
    indications: ['High VLF%', 'Sluggish detox pathways', 'Elevated liver markers'],
    whyItMatters: 'Improves elimination before deeper detox work.',
    patientExplanation: 'Supports your liver and helps your body clear waste more efficiently.',
  },
  {
    id: 'renelix',
    name: 'RENELIX',
    dose: '15\u201320 drops 3\u00d7/day in water',
    brand: 'Pekana / Bioresource',
    tag: 'Kidney Drainage',
    quadrants: ['Q1', 'Q2', 'Q3', 'Q4'],
    clinicalRole: 'Supports kidney filtration and urinary excretion pathways.',
    indications: ['Poor kidney clearance', 'Fluid retention', 'High toxin burden'],
    whyItMatters: 'Kidneys are a primary elimination route \u2014 must be open before deeper interventions.',
    patientExplanation: 'Supports your kidneys in filtering and removing waste from your body.',
  },
  {
    id: 'itires',
    name: 'ITIRES',
    dose: '15\u201320 drops 3\u00d7/day in water',
    brand: 'Pekana / Bioresource',
    tag: 'Lymphatic Drainage',
    quadrants: ['Q1', 'Q2', 'Q3', 'Q4'],
    clinicalRole: 'Supports lymphatic flow and tissue drainage.',
    indications: ['Lymphatic congestion', 'Swelling', 'Sluggish tissue drainage'],
    whyItMatters: 'Lymphatic system must be moving to clear cellular debris and toxins.',
    patientExplanation: 'Helps your lymphatic system move waste out of your tissues more effectively.',
  },
  {
    id: 'detox-kit',
    name: 'Detox Kit (Apo-HEPAT + RENELIX + ITIRES)',
    dose: '15\u201320 drops 3\u00d7/day each in water',
    brand: 'Pekana / Bioresource',
    tag: 'Systemic Drainage',
    quadrants: ['Q2', 'Q4'],
    clinicalRole: 'Combined liver, kidney, and lymphatic drainage for systemic clearance.',
    indications: ['Systemic toxin burden', 'Pre-detox preparation', 'High toxic load'],
    whyItMatters: 'Opens all three major elimination routes simultaneously for comprehensive drainage.',
    patientExplanation: 'A combination of three remedies that work together to support your liver, kidneys, and lymphatic system.',
  },
  {
    id: 'mundipur',
    name: 'Mundipur',
    dose: '1\u20132 tsp in water',
    brand: 'Bioresource',
    tag: 'Gentle Drainage',
    quadrants: ['Q1'],
    clinicalRole: 'Gentle elimination support for fragile, dysregulated systems.',
    indications: ['Q1 patients only', 'Low tolerance for aggressive remedies', 'Sensitive systems'],
    whyItMatters: 'Q1 patients need the gentlest approach \u2014 Mundipur provides elimination support without provoking reactions.',
    patientExplanation: 'A gentle remedy that helps your body eliminate waste without overwhelming your system.',
  },
  {
    id: 'liv-calm',
    name: 'Liv Calm',
    dose: '15\u201320 drops 2\u20133\u00d7/day',
    brand: 'Bioresource',
    tag: 'Liver Support',
    quadrants: ['Q2'],
    clinicalRole: 'Calms and soothes an overactive liver (overactive Phase 1 detoxifier).',
    indications: ['Hot liver', 'Overactive Phase 1 detoxification', 'Liver inflammation'],
    whyItMatters: 'Replaces apo-HEPAT when the liver is overactive rather than sluggish.',
    patientExplanation: 'Helps calm an overactive liver so detoxification proceeds at a safe pace.',
  },
  {
    id: 'toxex',
    name: 'TOXEX',
    dose: 'Start 1\u20135 drops, work up to 10 drops 1\u20132\u00d7/day',
    brand: 'Bioresource',
    tag: 'Deep Excretion',
    quadrants: ['Q4'],
    clinicalRole: 'Strong systemic excretion of xenobiotics, infection-derived toxins, heavy metals.',
    indications: ['Heavy metal burden', 'Xenobiotic toxicity', 'Only for Q4 \u2014 strong systems'],
    whyItMatters: 'Very provocative \u2014 only appropriate when the system is stable and resilient (Q4).',
    patientExplanation: 'A strong detox support used only when your system is strong enough to handle deep cleansing.',
  },
];

/* ── Digestion Products (Quadrant-Aware with Sequencing) ── */

export const DIGESTION_PRODUCTS = [
  {
    id: 'enzalase-pro',
    name: 'EnzalasePro',
    brand: 'U.S. Enzymes / Master Supplements',
    tag: 'Foundational Enzyme',
    tier: 1,
    quadrants: ['Q1', 'Q2', 'Q3', 'Q4'],
    blocked: [],
    requires: [],
    corequisites: [],
    defaultIncluded: { Q1: true, Q2: true, Q3: true, Q4: false },
    doseByQuadrant: {
      Q1: '1 cap per meal (at first bite)',
      Q2: '1\u20132 caps per meal (at first bite)',
      Q3: '1\u20132 caps per meal (at first bite)',
      Q4: 'As needed with meals',
    },
    clinicalRole: 'Foundational digestive activation and fat emulsification. Contains EnzaStim\u00ae (lecithin + oleic acid) for improved enzyme-substrate interaction.',
    indications: ['Bloating after meals', 'Gas', 'Fat intolerance', 'Poor nutrient breakdown', 'Post-meal fatigue'],
    whyItMatters: 'If food is not broken down, microbes are fed incorrectly and dysbiosis persists. Enzymes are the foundation of all digestive support.',
    commonMistakes: ['Underdosing', 'Incorrect timing (must be at first bite)', 'Not adjusting for meal size', 'Skipping fat digestion consideration'],
    patientExplanation: 'Helps your body properly break down food so it doesn\'t sit and ferment in the gut, reducing bloating and gas.',
    scientificSummary: 'A broad-spectrum digestive enzyme formula enhanced with EnzaStim\u00ae to improve lipid emulsification and enzymatic efficiency, supporting comprehensive macronutrient digestion.',
  },
  {
    id: 'theralac-pro',
    name: 'TheralacPro',
    brand: 'Master Supplements / U.S. Enzymes',
    tag: 'Controlled Probiotic',
    tier: 2,
    quadrants: ['Q1', 'Q2', 'Q3', 'Q4'],
    blocked: [],
    requires: ['enzalase-pro'],
    corequisites: [],
    defaultIncluded: { Q1: true, Q2: true, Q3: true, Q4: true },
    doseByQuadrant: {
      Q1: '1 cap every other day \u2192 build slowly',
      Q2: '1 cap daily',
      Q3: '1\u20132 caps daily',
      Q4: '1 cap daily or 3\u20135\u00d7/week',
    },
    clinicalRole: 'Foundational microbiome stabilization with survivable delivery. Uses acid-buffering delivery system (alginate-based protection) through gastric pH. Contains LactoStim\u00ae to enhance microbial growth after delivery.',
    indications: ['Gas, bloating, IBS-type symptoms', 'Post-antibiotic recovery', 'Immune modulation (mucosal layer)', 'Early dysbiosis', 'Patients new to probiotics'],
    whyItMatters: 'If microbes do not survive stomach acid, strain selection becomes irrelevant. TheralacPro solves the delivery problem first, then supports growth.',
    commonMistakes: ['Starting at full dose (causes bloating)', 'Ignoring need for enzymes (poor substrate breakdown)', 'Stopping too early (<3\u20134 weeks)', 'Not explaining transient gas to patient'],
    patientExplanation: 'Delivers beneficial bacteria safely into your gut where they can actually work, using a protective system that helps them survive stomach acid.',
    scientificSummary: 'A multi-strain probiotic utilizing acid-buffering delivery technology to enhance survivability through gastric conditions, combined with LactoStim\u00ae to support post-delivery microbial activity across the upper and mid-GI tract.',
  },
  {
    id: 'truflora-pro',
    name: 'TruFloraPro',
    brand: 'Master Supplements / U.S. Enzymes',
    tag: 'Dysbiosis Intervention',
    tier: 3,
    quadrants: ['Q2'],
    blocked: ['Q1'],
    requires: ['theralac-pro'],
    corequisites: [],
    defaultIncluded: { Q2: true },
    doseByQuadrant: {
      Q2: '1/day \u2192 build to 2/day',
    },
    blockReason: 'Too aggressive for fragile Q1 systems \u2014 risk of die-off, bloating, and intolerance.',
    clinicalRole: 'Microbial rebalancing under active dysbiosis via competitive exclusion. Acid-protected delivery ensures viable organisms reach lower GI tract for deep ecological modulation.',
    indications: ['Dysbiosis / microbial imbalance', 'Post-antimicrobial therapy', 'Immune dysregulation', 'Skin-gut axis issues', 'Toxic burden'],
    whyItMatters: 'Deep delivery allows competitive strains to actually reach dysbiotic niches \u2014 without this, rebalancing fails.',
    commonMistakes: ['Starting too aggressively (die-off)', 'No detox support alongside', 'No enzyme support', 'Misinterpreting die-off as intolerance'],
    patientExplanation: 'A targeted probiotic that helps rebalance your gut bacteria when there\'s an active imbalance, delivered deep into your digestive tract.',
    scientificSummary: 'A clinically targeted probiotic utilizing acid-protective delivery to support deep intestinal transit, enabling competitive microbial rebalancing and restoration of gut ecological stability.',
  },
  {
    id: 'trubifido-pro',
    name: 'TruBifidoPro',
    brand: 'Master Supplements / U.S. Enzymes',
    tag: 'Colon Restoration',
    tier: 3,
    quadrants: ['Q3'],
    blocked: ['Q1'],
    requires: ['theralac-pro'],
    corequisites: ['sunfiber'],
    defaultIncluded: { Q3: true },
    doseByQuadrant: {
      Q3: '1/day \u2192 build to 2\u20133/day',
    },
    blockReason: 'Too aggressive for fragile Q1 systems.',
    clinicalRole: 'Colon restoration and butyrate/SCFA production. Acid-protected delivery enables viable transit to colon. Bifido-dominant formulation targets distal GI.',
    indications: ['Constipation', 'Low fiber tolerance', 'Aging microbiome (>50)', 'Inflammatory bowel tendencies', 'Post-antibiotic depletion'],
    whyItMatters: 'Delivery matters even more here \u2014 Bifidobacteria must reach the colon alive to function. Works synergistically with fiber fermentation for SCFA production.',
    commonMistakes: ['Using without fiber (failure)', 'Underdosing in severe depletion', 'Expecting fast results (takes weeks for colon shift)'],
    patientExplanation: 'Helps restore the beneficial bacteria in your colon that support regular bowel function and reduce inflammation.',
    scientificSummary: 'A Bifidobacteria-focused probiotic delivered via acid-protective technology to support colonization of the distal gut, enhancing short-chain fatty acid production and epithelial integrity.',
  },
  {
    id: 'digestxym-plus',
    name: 'Digestxym+',
    brand: 'U.S. Enzymes / Master Supplements',
    tag: 'Escalation Enzyme',
    tier: 2,
    quadrants: ['Q2', 'Q3', 'Q4'],
    blocked: ['Q1'],
    requires: [],
    corequisites: [],
    neverReplaces: 'enzalase-pro',
    defaultIncluded: { Q2: false, Q3: false, Q4: false },
    doseByQuadrant: {
      Q2: '1\u20132 caps with heavy meals',
      Q3: '1\u20132 caps with heavy meals',
      Q4: '1\u20132 caps with heavy meals (as needed)',
    },
    blockReason: 'Too potent for fragile Q1 systems.',
    clinicalRole: 'High-potency macronutrient breakdown for increased digestive demand. Used as escalation alongside EnzalasePro, never as replacement.',
    indications: ['Chronic bloating', 'Protein maldigestion', 'Large/heavy meals', 'Enzyme insufficiency'],
    whyItMatters: 'Higher enzyme potency for meals that exceed EnzalasePro\'s capacity. Must layer on top, not replace.',
    commonMistakes: ['Replacing EnzalasePro instead of layering', 'Overdosing early', 'Not matching to meal size'],
    patientExplanation: 'A stronger enzyme supplement used alongside your regular enzymes when you have heavier or harder-to-digest meals.',
    scientificSummary: 'A high-potency digestive enzyme blend designed to enhance breakdown of proteins, carbohydrates, and fats in individuals with increased digestive demand.',
  },
  {
    id: 'sunfiber',
    name: 'SunFiber',
    brand: 'Tomorrow\'s Nutrition Pro',
    tag: 'Gut Motility / Fiber',
    tier: 3,
    quadrants: ['Q3'],
    blocked: [],
    requires: [],
    corequisites: [],
    requiredWith: ['trubifido-pro'],
    defaultIncluded: { Q3: true },
    doseByQuadrant: {
      Q3: '1 scoop daily in water',
    },
    clinicalRole: 'Prebiotic fiber that supports colon motility and feeds Bifidobacteria for SCFA production. Essential pairing with TruBifidoPro.',
    indications: ['Constipation', 'Low fiber intake', 'Paired with TruBifidoPro (mandatory)'],
    whyItMatters: 'Without fiber, Bifido supplementation fails. SunFiber provides the substrate Bifidobacteria need to colonize and produce short-chain fatty acids.',
    commonMistakes: ['Omitting when using TruBifidoPro', 'Not explaining importance to patient'],
    patientExplanation: 'A gentle fiber supplement that feeds the beneficial bacteria in your colon and supports regular bowel movements.',
    scientificSummary: 'A partially hydrolyzed guar gum prebiotic fiber supporting colonic fermentation, Bifidobacteria growth, and short-chain fatty acid production.',
  },
];

/* ── Resilience Products ── */

export const RESILIENCE_PRODUCTS = [
  {
    id: 'juve-cal',
    name: 'JUVE-CAL',
    dose: '1 tsp 3\u20134\u00d7/day',
    brand: 'Bioresource',
    tag: 'Restorative Support',
    quadrants: ['Q1', 'Q2', 'Q3'],
    clinicalRole: 'Restorative and rejuvenating support for depleted systems. Supports recovery capacity while the system is being unloaded.',
    indications: ['Low Total Power', 'Low SDNN', 'Fatigue / burnout pattern', 'Depleted nervous system resilience'],
    whyItMatters: 'Used when the system needs support while drainage and recovery processes are active.',
    patientExplanation: 'Supports recovery, energy reserve, and nervous system stability when your body appears depleted.',
  },
  {
    id: 'stress-buster-kit',
    name: 'Stress Buster Kit (Psy-stabil + Dalectro + Neu-regen)',
    dose: 'Psy-stabil \u00bd\u20131 tsp BID; Dalectro \u00bd\u20131 tsp BID; Neu-regen 1\u20132 tsp BID',
    brand: 'Bioresource',
    tag: 'Emotional Load Support',
    quadrants: ['Q1', 'Q2'],
    clinicalRole: 'Soothing nervous system, electrolyte regulation, and mental/emotional exhaustion support. Take away from food 2\u20133\u00d7/day.',
    indications: ['High ELI score', 'Emotional reactivity', 'Mental/emotional exhaustion', 'Elevated sympathetic activation'],
    whyItMatters: 'Addresses the emotional load component that drives Q1/Q2 placement \u2014 without reducing emotional load, drainage alone is insufficient.',
    patientExplanation: 'Three remedies that work together to calm your nervous system, support your electrolytes, and reduce mental and emotional exhaustion.',
  },
];

/* ── Core Principle (Digestion) ── */

export const DIGESTION_CORE_PRINCIPLE = 'Break food \u2192 deliver microbes \u2192 restore colon \u2192 stabilize system';

export const DIGESTION_CLINICAL_TRUTH = 'You cannot fix the microbiome if organisms do not arrive alive. You cannot fix the host if food is not broken down.';

/* ── Section Explanations ── */

export const SECTION_EXPLANATION = {
  main: 'This section focuses on supporting the body\'s elimination pathways, improving digestion and assimilation, and protecting the system during recovery. Drainage is not the same as detoxification. Drainage helps open and support exit pathways such as liver, kidneys, lymphatics, and gut.',
  nutrition: 'Nutrition sets the terrain before intervention. It aligns with the principle that drainage is not detoxification \u2014 it prepares the body\'s natural exit pathways.',
  drainage: 'Drainage helps open and support exit pathways such as liver, kidneys, lymphatics, and gut. It is always the first therapeutic priority.',
  digestion: 'Digestion support is sequenced to reduce fermentation, deliver microbes safely, then rebuild deeper. The protocol must match the Autonomic Nervous System state.',
  resilience: 'Resilience support stabilizes the nervous system, minerals, and recovery capacity during treatment.',
};

/* ── Helper Functions ── */

/**
 * Get products for a section filtered by quadrant.
 * For digestion products, returns quadrant-specific dose.
 */
export function getProductsForSection(sectionKey, quadrant) {
  const q = quadrant || 'Q1';
  let products;

  switch (sectionKey) {
    case 'drainage':
      products = DRAINAGE_PRODUCTS;
      break;
    case 'digestion':
      products = DIGESTION_PRODUCTS;
      break;
    case 'resilience':
      products = RESILIENCE_PRODUCTS;
      break;
    default:
      return [];
  }

  return products.map(p => {
    const isAvailable = p.quadrants.includes(q);
    const isBlocked = p.blocked?.includes(q) || false;
    const dose = p.doseByQuadrant ? (p.doseByQuadrant[q] || p.dose || '') : (p.dose || '');
    const included = p.defaultIncluded ? (p.defaultIncluded[q] ?? false) : isAvailable;

    return {
      ...p,
      dose,
      isAvailable,
      isBlocked,
      defaultIncluded: isAvailable && !isBlocked && included,
    };
  });
}

/**
 * Compute default digestion selections for a quadrant.
 * Returns map of productId → { included, dose }
 */
export function computeDigestionDefaults(quadrant) {
  const q = quadrant || 'Q1';
  const defaults = {};
  DIGESTION_PRODUCTS.forEach(p => {
    const isAvailable = p.quadrants.includes(q);
    const isBlocked = p.blocked?.includes(q) || false;
    const included = isAvailable && !isBlocked && (p.defaultIncluded?.[q] ?? false);
    defaults[p.id] = {
      included,
      dose: p.doseByQuadrant?.[q] || '',
      blocked: isBlocked,
      available: isAvailable,
    };
  });
  return defaults;
}

/**
 * Validate digestion selections against clinical rules.
 * Returns { valid, errors[], warnings[] }
 */
export function validateDigestionSelections(selections, quadrant) {
  const errors = [];
  const warnings = [];
  const q = quadrant || 'Q1';

  const isIncluded = (id) => selections[id]?.included;

  // Rule 1: No aggressive probiotics in Q1
  if (q === 'Q1') {
    if (isIncluded('truflora-pro')) {
      errors.push('TruFloraPro is blocked in Q1 \u2014 patient too fragile for aggressive probiotics.');
    }
    if (isIncluded('digestxym-plus')) {
      errors.push('Digestxym+ is blocked in Q1 \u2014 too potent for fragile systems.');
    }
  }

  // Rule 2: Enzymes required if probiotics selected
  const hasProbiotic = isIncluded('theralac-pro') || isIncluded('truflora-pro') || isIncluded('trubifido-pro');
  if (hasProbiotic && !isIncluded('enzalase-pro')) {
    errors.push('EnzalasePro (enzymes) is required when probiotics are selected \u2014 food must be broken down first.');
  }

  // Rule 3: SunFiber required with TruBifidoPro
  if (isIncluded('trubifido-pro') && !isIncluded('sunfiber')) {
    errors.push('SunFiber is required when TruBifidoPro is selected \u2014 fiber is mandatory for colon restoration.');
  }

  // Rule 4: Digestxym+ never replaces EnzalasePro
  if (isIncluded('digestxym-plus') && !isIncluded('enzalase-pro')) {
    warnings.push('Digestxym+ should supplement EnzalasePro, not replace it.');
  }

  // Rule 5: TheralacPro requires enzymes (sequencing)
  if (isIncluded('theralac-pro') && !isIncluded('enzalase-pro')) {
    warnings.push('TheralacPro works best when paired with EnzalasePro (enzymes first, then probiotics).');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

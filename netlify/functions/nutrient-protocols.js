/**
 * CRIS GOLD™ Therapeutic Nutrient Protocol Reference
 * Organized by category and quadrant with company, product, dosage, and indication.
 *
 * Categories: Drainage, Cell Membrane, Mitochondrial, Neurocognitive, Cardiovascular
 * (Oxidative Stress products are covered within Cell Membrane and Mitochondrial categories)
 *
 * Format: Each entry = { company, product, dosage, indication, notes? }
 * Quadrant-specific products are under Q1–Q4 keys.
 * "all" key = products available for all quadrants.
 */

const NUTRIENT_PROTOCOLS = {

  drainage: {
    description: 'Drainage is the foundational step — opening elimination pathways (liver, lymphatics, kidneys, gut) BEFORE deeper detoxification. Drainage is NOT detox.',
    Q1: [
      { company: 'Bioresource', product: 'Mundipur', dosage: '1-2 tsp in water', indication: 'Gentle elimination' },
      { company: 'Bioresource', product: 'Stress Buster Kit (Psy-stabil + Dalectro + Neu-regen)', dosage: 'Psy-stabil ½-1 tsp BID; Dalectro ½-1 tsp BID; Neu-regen 1-2 tsp BID', indication: 'Soothing/nervous system, electrolyte regulation, mental/emotional exhaustion. Take away from food 2-3x/day' },
    ],
    Q2: [
      { company: 'Bioresource', product: 'Stress Buster Kit', dosage: 'Same as Q1', indication: 'Stabilize ELI' },
      { company: 'Bioresource', product: 'Detox Kit (Apo-HEPAT + RENELIX + ITIRES)', dosage: '15-20 drops 3x/day in water each', indication: 'Apo-HEPAT: master liver drainage; RENELIX: master kidney drainage; ITIRES: master lymphatic drainage' },
      { company: 'Bioresource', product: 'Liv Calm (can replace Apo-HEPAT)', dosage: '15-20 drops, 2-3x/day', indication: 'Calms and soothes a hot liver (overactive Phase 1 detoxifier)' },
    ],
    Q3: [
      { company: 'Bioresource', product: 'Neu-regen', dosage: '1-2 tsp 2x/day', indication: 'Exhaustion' },
      { company: 'Bioresource', product: 'JUVE-CAL', dosage: '1 tsp 3-4x/day', indication: 'Restorative and rejuvenating remedy' },
    ],
    Q4: [
      { company: 'Bioresource', product: 'Detox Kit (Apo-HEPAT + RENELIX + ITIRES)', dosage: '15-20 drops 3x/day in water each', indication: 'Master drainage remedy — all 3 can go in same glass' },
      { company: 'Bioresource', product: 'TOXEX', dosage: 'Start 1-5 drops, slowly work up to 10 drops 1-2x/day', indication: 'Strong systemic excretion of xenobiotics, infection-derived toxins, and heavy metals. Very provocative — test tolerance first' },
    ],
  },

  cellMembrane: {
    description: 'Cell membranes determine receptor sensitivity, ion channel function, hormone signaling, neurotransmitter binding, mineral transport, and intracellular communication. Restoring phospholipid bilayer integrity is foundational.',
    all: [
      { company: 'Quicksilver Scientific', product: 'The One', dosage: '1-2 tsp/day, hold 30 sec before swallowing', indication: 'Mitochondrial reproduction, energy support, 13 adaptogenic herbs, antioxidant array for membrane protection' },
      { company: 'Quicksilver Scientific', product: 'Membrane Mend', dosage: '1 tsp 1-2x/day, 10 min before meals, hold 30-90 sec', indication: 'Repairs damaged lipid membranes with PC, Astaxanthin, DeltaGold Tocotrienols (Vitamin E), Ahiflower essential fatty acids' },
      { company: 'Bioresource', product: 'Lactic Plus', dosage: '30 drops 3x/day in water', indication: 'Improves mitochondria respiration up to 350%, removes waste, promotes healthy acid-base balance' },
      { company: 'Drucker Labs', product: 'IntraMIN / IntraMAX', dosage: '1 fluid oz/day with non-chlorinated water', indication: 'Carbon-bound minerals and vitamins to protect membranes and improve electrochemical gradient (voltage)' },
      { company: 'Designs For Health', product: 'OmegaAvail Ultra DHA', dosage: 'As directed', indication: 'DHA is most crucial for overall membrane fluidity and structural integrity' },
      { company: 'Researched Nutritionals', product: 'H2 Absorb', dosage: 'Dissolve tablet in water, drink', indication: 'Molecular hydrogen gas penetrates cell membranes, reduces hydroxyl radicals, increases NRF2 and glutathione' },
      { company: 'Quicksilver Scientific', product: 'Nanoemulsified D3K2', dosage: '1 pump/day', indication: 'Vitamin D is an important membrane protector. Receptors in 26 tissue sites. Vitamin K provides balance' },
      { company: 'Functional Genomic Nutrition', product: 'Fatty Acid Assist', dosage: '2 capsules with each meal', indication: 'Supports making and utilizing EPA/DHA for membrane incorporation, especially with poor conversion' },
      { company: 'Functional Genomic Nutrition', product: 'NAD+NADPH Assist', dosage: '2 capsules/day', indication: 'For NQO1 conversion of ubiquinone to ubiquinol (CoQ10 reduced form) — vital membrane protector' },
      { company: 'Researched Nutritionals', product: 'Tri-Fortify Liposomal Glutathione', dosage: '1 tsp, hold under tongue 30-60 sec, swallow', indication: 'Glutathione is cofactor for GPX4 that protects cell membranes, especially from ferroptosis' },
      { company: 'Quicksilver Scientific', product: 'Pure PC', dosage: '1 tsp 1-2x/day, hold in mouth, empty stomach', indication: 'Highly absorbable Phosphatidylcholine for membrane repair. Important with decreased vagal tone on HQP' },
      { company: 'U.S. Enzymes', product: 'SULFORAXYM', dosage: '2 capsules/day', indication: 'Activates NRF2 antioxidant response element. Essential for glutathione production and NQO1 regulation. Studies show reduced depressive symptoms' },
    ],
    Q1Q2extra: [
      { company: 'Bioresource', product: 'Stress Buster Kit (Psy-stabil + Dalectro + Neu-regen)', dosage: 'See drainage dosing', indication: 'To reduce elevated ELI in Q1/Q2' },
    ],
  },

  mitochondrial: {
    description: 'Mitochondria regulate ATP production, redox balance, apoptosis, steroidogenesis, neurotransmitter synthesis, immune signaling, and cellular repair. Mitochondrial dysfunction drives fatigue, neurodegeneration, metabolic disease, and cardiovascular disease.',
    all: [
      { company: 'Quicksilver Scientific', product: 'The One', dosage: '1-2 tsp/day, hold 30 sec, empty stomach', indication: 'Comprehensive ATP support with 13 adaptogenic herbs' },
      { company: 'Quicksilver Scientific', product: 'NAD+ / NAD+ Platinum', dosage: '½ tsp by mouth, hold 30-90 sec, empty stomach, refrigerate', indication: 'NMN precursor to NAD+, critical for mitochondrial metabolism and repair' },
      { company: 'Quicksilver Scientific', product: 'CoQ10 Nanoemulsion', dosage: '2 pumps twice daily, hold 30-90 sec, empty stomach', indication: 'Highly absorbable CoQ10 for electron transport chain and ATP production' },
      { company: 'Quicksilver Scientific', product: 'H2 Elite Molecular Hydrogen', dosage: 'Dissolve 1 tablet in water, drink promptly', indication: 'Combats oxidative stress, protects and improves mitochondrial function' },
      { company: 'Quicksilver Scientific', product: 'Longevity Elite', dosage: '1 tsp, hold 30-90 sec, empty stomach', indication: 'AMPK activation and mitochondria biogenesis for energy and cellular regeneration' },
      { company: 'Quicksilver Scientific', product: 'Methyl B-Complex', dosage: '2 pumps (1mL) daily, hold 30 sec, empty stomach', indication: 'Supports metabolic pathways for mitochondrial energy production' },
      { company: 'Researched Nutritionals', product: 'ATP 360', dosage: '3 capsules once daily without food', indication: 'Comprehensive mitochondrial support including CoQ10, NADH, PQQ. Supports mitophagy and membranes' },
      { company: 'Researched Nutritionals', product: 'ATP Fuel', dosage: '5 capsules 30 min before breakfast + 5 before lunch/dinner (first 2 months), then 5/day', indication: 'Maximizes cellular energy with CoQ10, NADH, NT Factor for membrane repair. Protocol: 2 bottles/month first 2 months' },
      { company: 'Researched Nutritionals', product: 'Tri-Fortify Liposomal Glutathione', dosage: '1 tsp, hold under tongue 30-60 sec', indication: 'Protects mitochondria from oxidative stress' },
      { company: 'CellCore Bioscience', product: 'BC-ATP', dosage: '2 capsules/day', indication: 'Bioactive carbon technology recharges mineral concentrations, optimizes ATP cycle for higher output' },
      { company: 'Quicksilver Scientific', product: 'Ergo-Thione+', dosage: '1 tsp, hold 30-90 sec, refrigerate', indication: 'Ergothioneine enters mitochondria via OCTN-1 transporter, direct ROS scavenging, activates NRF2. Synergistic with glutathione' },
      { company: 'Drucker Labs', product: 'IntraMIN / IntraMAX', dosage: '1 fluid oz/day', indication: 'Carbon-bound minerals supporting mitochondrial function and cellular energy ("spark-of-life" nutrients)' },
    ],
  },

  neurocognitive: {
    description: 'Supports neurotransmitter balance, synaptic plasticity, BDNF, nerve growth factor, microglial health, and cognitive function. Addresses brain fog, neuroinflammation, and neurodegeneration risk.',
    all: [
      { company: 'Functional Genomic Nutrition', product: 'M2 Support', dosage: '1-2 capsules/day', indication: 'Supports M1 to M2 microglial shift for brain inflammation and cognitive deficits' },
      { company: 'Designs For Health', product: 'Brain Vitale', dosage: '2 capsules/day with meals', indication: 'Optimizes brain function with acetyl-L-carnitine, GPC, phosphatidylserine, ginkgo biloba, citicoline. Builds brain phospholipids' },
      { company: 'Researched Nutritionals', product: 'BDNF Essentials', dosage: '2 capsules twice daily', indication: 'Supports nerve growth factor and BDNF for neuroplasticity and neurogenesis. Improves Brain Gauge reaction time, mood, and sleep' },
      { company: 'Researched Nutritionals', product: 'Tri-Fortify Liposomal Glutathione', dosage: '1 tsp, hold under tongue 30-60 sec', indication: 'Neuroprotective antioxidant. Depleted in Alzheimers and Parkinsons. Needed for GPX4 membrane protection' },
      { company: 'ADUCO', product: 'MycoREV Neuro', dosage: '1 capsule 2-3x/day', indication: 'Lions Mane, CurQfen turmeric, buckwheat leaf, bovine brain extract. Supports nerve growth factor, cognitive function, healthy mood' },
      { company: 'Master Supplements / U.S. Enzymes', product: 'SUNBALANCE', dosage: '3 capsules/day', indication: 'Supports healthy microglial cells with PEA, Luteolin, Quercetin. Promotes M2 polarization to reduce neuroinflammation' },
      { company: 'Master Supplements / U.S. Enzymes', product: 'SULFORAXM', dosage: '2 capsules/day', indication: 'Standardized sulforaphane from broccoli sprouts + Myrosinase. Activates NRF2 anti-inflammatory pathway, promotes M2 microglial polarization' },
      { company: 'Master Supplements / U.S. Enzymes', product: 'TEAVIGO', dosage: '1-2 capsules/day; capsule can be opened and mixed in hot water as tea', indication: 'EGCG — promotes microglial M1 to M2 polarization, anti-inflammatory, antioxidant pathway activator' },
      { company: 'Master Supplements / U.S. Enzymes', product: 'SUNSPECTRUM', dosage: '1 level scoop in 8-12 oz water', indication: 'Guar Fiber, Curcumin C3 Reduct, Turmeric, CoQ10, SunFiber — reduces neuroinflammation signaling, increases M2 microglial markers' },
      { company: 'Master Supplements / U.S. Enzymes', product: 'TheralacPro', dosage: '1-2 capsules/day', indication: '50 billion CFU probiotic. Improves gut-brain connection and helps balance ELI. Contains Lactobacillus and Bifidobacterium for GI and immune health' },
      { company: 'Functional Genomic Nutrition', product: 'EXCITO-BLOX', dosage: '2 capsules 1-2x/day', indication: 'Supports healthy glutamate and GABA levels. Contains Palmitoylethanolamide (PEA), Magnesium L-Threonate, Magnolia Extract, Zinc, B6. Prevents excitotoxicity' },
      { company: 'Quicksilver Scientific', product: 'Liposomal Magtein', dosage: '1 tsp in the day, repeat 1 hr before bed, hold 30-90 sec, empty stomach', indication: 'Magnesium L-Threonate (Magtein) with liposomal phosphatidylcholine. Supports cognition, mood, sleep, and neuronal membranes' },
      { company: 'Quicksilver Scientific', product: 'Neuro Pregnenolone', dosage: '1 tsp, hold 30-90 sec, empty stomach 10 min before meals', indication: 'Pregnenolone, alpha-GPC, breviscapine, ginkgo biloba, bacopa. Supports neuroplasticity, brain repair, and reduces brain inflammation' },
      { company: 'Functional Genomic Nutrition', product: 'XOME', dosage: '3 capsules/day', indication: 'Reduces NLRP3 inflammasomes — the innate immune complex that triggers neuroinflammation and pyroptosis via IL-1B and IL-18' },
      { company: 'Functional Genomic Nutrition', product: 'Calci Calm', dosage: '4 capsules/day', indication: 'Modulates NMDA receptors to prevent brain cell death from excitotoxicity. Protects neurons from excessive calcium influx while preserving learning and memory' },
      { company: 'Mediherb', product: 'Adrenal Complex', dosage: '1 tablet 1-3x/day', indication: 'Licorice and Rehmannia for adrenal gland support. Caution: contraindicated in high blood pressure, edema, congestive heart failure, low potassium, pregnancy' },
      { company: 'Quicksilver Scientific', product: 'Push Catch Protocol — Liver Sauce', dosage: '1 tsp/day', indication: 'Step 1 of Push Catch detox protocol. Mobilizes toxins for elimination. After taking Liver Sauce, wait 30 minutes before taking Ultra Binder.' },
      { company: 'Quicksilver Scientific', product: 'Push Catch Protocol — Ultra Binder', dosage: '1 tsp in water (take 30 min after Liver Sauce)', indication: 'Step 2 of Push Catch detox protocol. Binds and removes mobilized toxins. Must be taken 30 minutes after Liver Sauce.' },
    ],
    Q1Q2extra: [
      { company: 'Bioresource', product: 'Stress Buster Kit (Psy-stabil + Dalectro + Neu-regen)', dosage: 'Psy-stabil ½-1 tsp BID; Dalectro ½-1 tsp BID; Neu-regen 1-2 tsp BID', indication: 'Stabilizes ELI, soothes nervous system, electrolyte regulation, mental/emotional exhaustion' },
    ],
  },

  cardiovascular: {
    description: 'Addresses endothelial function, nitric oxide signaling, arterial stiffness, microcirculation, autonomic vascular regulation, and cardiac energy. Multi-vendor protocol.',
    Q1: [
      { company: 'Bioresource', product: 'CARDINORMA', dosage: '15-20 drops 3x/day in water', indication: 'Tonify and strengthen heart function' },
      { company: 'Bioresource', product: 'CLAUPAREST (combine with CARDINORMA)', dosage: '15-20 drops 3x/day in water', indication: 'Improves circulation, heart blood stagnation, venous circulation' },
      { company: 'Bioresource', product: 'Coro-CALM', dosage: '15-20 drops 3x/day in water', indication: 'Cardiac sedative, tachycardia, heart rhythm disturbances, irritability of heart Shen. Good for anxiety, fear, worry. If HQP rejections >20' },
      { company: 'Bioresource', product: 'Co-HYPERT (with CARDINORMA, RENELIX, Apo-HEPAT)', dosage: '15-20 drops 3x/day in water', indication: 'Hypertension; resolves metabolic blockages at root of hypertension. Helpful for arterial elasticity and high PP' },
      { company: 'Bioresource', product: 'JUVE-CAL (adjuvant: Neu-regen, Psy-stabil)', dosage: '1 tsp 3-4x/day', indication: 'Restorative and rejuvenating remedy' },
      { company: 'U.S. Enzymes', product: 'NATTOXYM', dosage: '1 capsule empty stomach, 1-2x/day', indication: 'Promotes circulatory health, reduces blood viscosity, dissolves fibrinogen, may reduce CRP. Caution with blood thinners' },
      { company: 'U.S. Enzymes', product: 'THERAXYM', dosage: '1 capsule empty stomach, 1-2x/day', indication: 'Anti-inflammatory, circulatory and heart health. Eliminates biofilms if taken 30 min before antimicrobials' },
      { company: 'U.S. Enzymes', product: 'SERRAXYM', dosage: '1 capsule empty stomach every 8 hrs (up to 3x/day)', indication: 'Potent anti-inflammatory' },
      { company: 'Bioresource', product: 'Stress Buster Kit (if elevated ELI)', dosage: 'Psy-stabil ½-1 tsp BID; Dalectro ½-1 tsp BID; Neu-regen 1-2 tsp BID', indication: 'Stabilize and soothe nervous system for increased ELI' },
    ],
    Q2: [
      { company: 'Berkeley Life', product: 'Berkeley Life', dosage: '2 capsules once/day with water after food', indication: 'Increases nitric oxide for healthy circulatory system regulation' },
      { company: 'Optimal Health Systems', product: 'Optimal Opti-Nitric (combines well with Berkeley Life)', dosage: '2 capsules 2x/day', indication: 'Increases nitric oxide via different pathway for cardiovascular health, energy, circulation' },
      { company: 'Designs For Health', product: 'Nox Synergy', dosage: '1 scoop (9g) in 8 oz water, 2 scoops/day', indication: 'Supports healthy nitric oxide and vascular health' },
      { company: 'Functional Genomic Nutrition', product: 'NOS Support', dosage: '2 capsules/day', indication: 'Potent cardiovascular support to increase nitric oxide' },
      { company: 'Quicksilver Scientific', product: 'Cardio Elite', dosage: 'Swirl gently, measure per instructions, hold 30-90 sec', indication: 'Boosts nitric oxide for better blood flow and circulation' },
      { company: 'Apex Energetics', product: 'K62 NITRITE BALANCE', dosage: '1 tsp 1-2x/day', indication: 'Increases nitric oxide for vascular health' },
      { company: 'Bioresource', product: 'JUVE-CAL (adjuvant: Neu-regen, Psy-stabil for ELI)', dosage: '1 tsp 3-4x/day', indication: 'Restorative and rejuvenating' },
      { company: 'Bioresource', product: 'Stress Buster Kit (if elevated ELI)', dosage: 'See Q1 dosing', indication: 'To stabilize elevated ELI' },
    ],
    Q3: [
      { company: 'Quicksilver Scientific', product: 'Cardio Elite', dosage: 'Swirl gently, hold 30-90 sec', indication: 'Increases circulation, strengthens blood vessels and capillaries' },
      { company: 'Designs For Health', product: 'CoQnol 100 or 200', dosage: '1-2 softgels/day with meals', indication: 'CoQ10 reduced form, crucial for ATP in heart cells' },
      { company: 'Ayush Herbs', product: 'Carditone', dosage: '1 capsule/day preferably at night', indication: 'Supports blood pressure, blood vessels, heart health. Overall cardiovascular wellness' },
      { company: 'Ayush Herbs', product: 'High Omega-3', dosage: '1-2 capsules/day', indication: 'Cardiovascular and endothelial health of blood vessels' },
      { company: 'Designs For Health', product: 'Carnitine Synergy', dosage: '1 capsule/day', indication: 'Heart muscle energy, transports fatty acids into mitochondria. Caution: gut bacteria can convert to TMAO — need healthy microbiome' },
      { company: 'Bioresource', product: 'CARDINORMA', dosage: '15-20 drops 3x/day in water', indication: 'Cardiac insufficiency, heart muscle weakness, overall cardiovascular health' },
    ],
    Q4: [
      { company: 'Designs For Health', product: 'CoQnol 100 or 200', dosage: '1-2 softgels/day with meals', indication: 'CoQ10 reduced form for heart cell ATP' },
      { company: 'Ayush Herbs', product: 'Carditone', dosage: '1 capsule/day at night', indication: 'Blood pressure, blood vessels, heart health' },
      { company: 'U.S. Enzymes', product: 'Lumbroxym', dosage: '1 capsule empty stomach', indication: 'For hypercoagulation and hypoperfusion. Keeps coagulation system healthy. Do NOT take with blood thinners' },
      { company: 'Bioresource', product: 'BOLUOKE (Lumbrokinase)', dosage: '1-2 capsules 1-3x/day on empty stomach', indication: 'For hypercoagulation and hypoperfusion in cardiovascular/cerebrovascular conditions. Do NOT take with blood thinners' },
      { company: 'Berkeley Life', product: 'Berkeley Life', dosage: '2 capsules once/day with water after food', indication: 'Increases nitric oxide for circulatory regulation' },
      { company: 'Optimal Health Systems', product: 'Optimal Opti-Nitric', dosage: '2 capsules 2x/day', indication: 'Nitric oxide for cardiovascular health via complementary pathway' },
    ],
  },
};

/**
 * Generate a compact text representation for the AI system prompt.
 * Format: Category > Quadrant > Product entries
 */
function generatePromptReference() {
  const lines = [];

  for (const [catKey, cat] of Object.entries(NUTRIENT_PROTOCOLS)) {
    const catName = {
      drainage: 'DRAINAGE (ALWAYS FIRST)',
      cellMembrane: 'CELL MEMBRANE REPAIR',
      mitochondrial: 'MITOCHONDRIAL SUPPORT',
      neurocognitive: 'NEURO-COGNITIVE SUPPORT',
      cardiovascular: 'VASCULAR / CARDIOVASCULAR',
    }[catKey] || catKey.toUpperCase();

    lines.push(`\n── ${catName} ──`);
    lines.push(cat.description);

    if (cat.all) {
      lines.push('Products (all quadrants):');
      for (const p of cat.all) {
        lines.push(`  • ${p.product} (${p.company}) — ${p.dosage} — ${p.indication}`);
      }
    }
    if (cat.Q1Q2extra) {
      lines.push('Additional for Q1/Q2 (high ELI):');
      for (const p of cat.Q1Q2extra) {
        lines.push(`  • ${p.product} (${p.company}) — ${p.dosage} — ${p.indication}`);
      }
    }
    for (const q of ['Q1', 'Q2', 'Q3', 'Q4']) {
      if (cat[q]) {
        lines.push(`${q}:`);
        for (const p of cat[q]) {
          lines.push(`  • ${p.product} (${p.company}) — ${p.dosage} — ${p.indication}`);
        }
      }
    }
  }

  return lines.join('\n');
}

module.exports = { NUTRIENT_PROTOCOLS, generatePromptReference };

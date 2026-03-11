/**
 * CRIS GOLD™ Master Protocol List — v2.0 (Revised 03-11)
 * Source: Revised Protocol Matrix documents (03-11-Docs)
 * Each entry: { product, dose, brand, quadrants[], indication? }
 * quadrants: which CRIS quadrants this product is assigned to
 */

export const MASTER_PROTOCOL_LIST = {

  drainage: [
    { product: 'Mundipur',                       dose: '1–2 tsp in water',                          brand: 'Bioresource',            quadrants: ['Q1'], indication: 'Gentle elimination' },
    { product: 'Stress Buster Kit (Psy-stabil + Dalectro + Neu-regen)', dose: 'Psy-stabil ½–1 tsp BID; Dalectro ½–1 tsp BID; Neu-regen 1–2 tsp BID', brand: 'Bioresource', quadrants: ['Q1','Q2'], indication: 'Soothing nervous system, electrolyte regulation, mental/emotional exhaustion. Take away from food 2–3×/day' },
    { product: 'Detox Kit (Apo-HEPAT + RENELIX + ITIRES)', dose: '15–20 drops 3×/day each in water', brand: 'Bioresource', quadrants: ['Q2','Q4'], indication: 'Apo-HEPAT: liver drainage; RENELIX: kidney drainage; ITIRES: lymphatic drainage. All 3 can go in same glass' },
    { product: 'Liv Calm (replaces Apo-HEPAT)',   dose: '15–20 drops 2–3×/day',                     brand: 'Bioresource',            quadrants: ['Q2'], indication: 'Calms and soothes a hot liver (overactive Phase 1 detoxifier)' },
    { product: 'Neu-regen',                       dose: '1–2 tsp 2×/day',                           brand: 'Bioresource',            quadrants: ['Q3'], indication: 'Exhaustion' },
    { product: 'JUVE-CAL',                        dose: '1 tsp 3–4×/day',                           brand: 'Bioresource',            quadrants: ['Q3'], indication: 'Restorative and rejuvenating remedy' },
    { product: 'TOXEX',                           dose: 'Start 1–5 drops, work up to 10 drops 1–2×/day', brand: 'Bioresource',       quadrants: ['Q4'], indication: 'Strong systemic excretion of xenobiotics, infection-derived toxins, heavy metals. Very provocative — test tolerance' },
  ],

  cellMembraneSupport: [
    { product: 'The One',                         dose: '1–2 tsp/day, hold 30 sec before swallowing', brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Mitochondrial reproduction, energy support, 13 adaptogenic herbs, antioxidant array' },
    { product: 'Membrane Mend',                   dose: '1 tsp 1–2×/day, 10 min before meals, hold 30–90 sec', brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Repairs lipid membranes with PC, Astaxanthin, DeltaGold Tocotrienols, Ahiflower essential fatty acids' },
    { product: 'Lactic Plus',                     dose: '30 drops 3×/day in water',                 brand: 'Bioresource',            quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Improves mitochondria respiration up to 350%, removes waste, healthy acid-base balance' },
    { product: 'IntraMIN / IntraMAX',             dose: '1 fl oz/day with non-chlorinated water',   brand: 'Drucker Labs',           quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Carbon-bound minerals and vitamins to protect membranes and improve electrochemical gradient (voltage)' },
    { product: 'OmegaAvail Ultra DHA',            dose: 'As directed',                              brand: 'Designs For Health',     quadrants: ['Q1','Q2','Q3','Q4'], indication: 'DHA is most crucial for overall membrane fluidity and structural integrity' },
    { product: 'H2 Absorb',                       dose: 'Dissolve tablet in water, drink',          brand: 'Researched Nutritionals', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Molecular hydrogen penetrates cell membranes, reduces hydroxyl radicals, increases NRF2 and glutathione' },
    { product: 'Nanoemulsified D3K2',             dose: '1 pump/day',                               brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Vitamin D is important membrane protector. Receptors in 26 tissue sites. K provides balance' },
    { product: 'Fatty Acid Assist',               dose: '2 capsules with each meal',                brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Supports making and utilizing EPA/DHA for membrane incorporation' },
    { product: 'NAD+NADPH Assist',                dose: '2 capsules/day',                           brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'NQO1 conversion of ubiquinone to ubiquinol — vital membrane protector' },
    { product: 'Tri-Fortify Liposomal Glutathione', dose: '1 tsp, hold under tongue 30–60 sec',    brand: 'Researched Nutritionals', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Glutathione is cofactor for GPX4 that protects cell membranes from ferroptosis' },
    { product: 'Pure PC',                         dose: '1 tsp 1–2×/day, hold in mouth, empty stomach', brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Highly absorbable Phosphatidylcholine. Important with decreased vagal tone on HQP' },
    { product: 'SULFORAXYM',                      dose: '2 capsules/day',                           brand: 'U.S. Enzymes',           quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Activates NRF2. Essential for glutathione and NQO1. Studies show reduced depressive symptoms' },
    { product: 'Stress Buster Kit (for high ELI)', dose: 'See drainage dosing',                     brand: 'Bioresource',            quadrants: ['Q1','Q2'], indication: 'To reduce elevated ELI in Q1/Q2' },
  ],

  mitochondrialSupport: [
    { product: 'The One',                         dose: '1–2 tsp/day, hold 30 sec, empty stomach',  brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Comprehensive ATP support with 13 adaptogenic herbs' },
    { product: 'NAD+ / NAD+ Platinum',            dose: '½ tsp, hold 30–90 sec, empty stomach, refrigerate', brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'NMN precursor to NAD+, critical for mitochondrial metabolism and repair' },
    { product: 'CoQ10 Nanoemulsion',              dose: '2 pumps 2×/day, hold 30–90 sec, empty stomach', brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Highly absorbable CoQ10 for electron transport chain and ATP production' },
    { product: 'H2 Elite Molecular Hydrogen',     dose: 'Dissolve 1 tablet in water, drink promptly', brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Combats oxidative stress, protects and improves mitochondrial function' },
    { product: 'Longevity Elite',                 dose: '1 tsp, hold 30–90 sec, empty stomach',     brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'AMPK activation and mitochondria biogenesis for energy and cellular regeneration' },
    { product: 'Methyl B-Complex',                dose: '2 pumps (1mL) daily, hold 30 sec, empty stomach', brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Supports metabolic pathways for mitochondrial energy production' },
    { product: 'ATP 360',                         dose: '3 capsules once daily without food',        brand: 'Researched Nutritionals', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Comprehensive mitochondrial support. CoQ10, NADH, PQQ. Supports mitophagy and membranes' },
    { product: 'ATP Fuel',                        dose: '5 caps 30 min before breakfast + 5 before lunch (first 2 months), then 5/day', brand: 'Researched Nutritionals', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Maximizes cellular energy with CoQ10, NADH, NT Factor. 2 bottles/month first 2 months' },
    { product: 'Tri-Fortify Liposomal Glutathione', dose: '1 tsp, hold under tongue 30–60 sec',    brand: 'Researched Nutritionals', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Protects mitochondria from oxidative stress' },
    { product: 'BC-ATP',                          dose: '2 capsules/day',                           brand: 'CellCore Bioscience',    quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Bioactive carbon technology recharges minerals, optimizes ATP cycle for higher output' },
    { product: 'Ergo-Thione+',                    dose: '1 tsp, hold 30–90 sec, refrigerate',       brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Ergothioneine enters mitochondria via OCTN-1, direct ROS scavenging, activates NRF2. Synergistic with glutathione' },
    { product: 'IntraMIN / IntraMAX',             dose: '1 fl oz/day',                              brand: 'Drucker Labs',           quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Carbon-bound minerals supporting mitochondrial function and cellular energy' },
  ],

  neurocognitiveSupport: [
    { product: 'M2 Support',                      dose: '1–2 capsules/day',                         brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Supports M1 to M2 microglial shift for brain inflammation and cognitive deficits' },
    { product: 'Brain Vitale',                    dose: '2 capsules/day with meals',                brand: 'Designs For Health',     quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Optimizes brain function with acetyl-L-carnitine, GPC, phosphatidylserine, ginkgo, citicoline' },
    { product: 'BDNF Essentials',                 dose: '2 capsules 2×/day',                        brand: 'Researched Nutritionals', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Supports BDNF for neuroplasticity and neurogenesis. Improves Brain Gauge reaction time, mood, sleep' },
    { product: 'Tri-Fortify Liposomal Glutathione', dose: '1 tsp, hold under tongue 30–60 sec',    brand: 'Researched Nutritionals', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Neuroprotective antioxidant. Needed for GPX4 membrane protection. Depleted in neurodegeneration' },
    { product: 'MycoREV Neuro',                   dose: '1 capsule 2–3×/day',                       brand: 'ADUCO',                  quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Lions Mane, CurQfen turmeric, buckwheat leaf. Supports nerve growth factor and cognitive function' },
    { product: 'SUNBALANCE',                      dose: '3 capsules/day',                           brand: 'Master Supplements / U.S. Enzymes', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Supports healthy microglial cells with PEA, Luteolin, Quercetin. Promotes M2 polarization' },
    { product: 'SULFORAXM',                       dose: '2 capsules/day',                           brand: 'Master Supplements / U.S. Enzymes', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Standardized sulforaphane + Myrosinase. Activates NRF2, promotes M2 microglial polarization' },
    { product: 'TEAVIGO',                         dose: '1–2 capsules/day',                         brand: 'Master Supplements / U.S. Enzymes', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'EGCG — promotes M1 to M2 microglial polarization, anti-inflammatory, antioxidant pathway activator' },
    { product: 'SUNSPECTRUM',                     dose: '1 scoop in 8–12 oz water',                 brand: 'Master Supplements / U.S. Enzymes', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Curcumin C3 Reduct, Turmeric, CoQ10, SunFiber — reduces neuroinflammation, increases M2 markers' },
    { product: 'TheralacPro',                     dose: '1–2 capsules/day',                         brand: 'Master Supplements / U.S. Enzymes', quadrants: ['Q1','Q2','Q3','Q4'], indication: '50B CFU probiotic. Improves gut-brain connection and helps balance ELI' },
    { product: 'EXCITO-BLOX',                     dose: '2 capsules 1–2×/day',                      brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Supports healthy glutamate and GABA. PEA, Magnesium L-Threonate, Magnolia Extract, Zinc, B6. Prevents excitotoxicity' },
    { product: 'Liposomal Magtein',               dose: '1 tsp in day + 1 tsp 1 hr before bed, hold 30–90 sec', brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Magnesium L-Threonate with liposomal PC. Supports cognition, mood, sleep, neuronal membranes' },
    { product: 'Neuro Pregnenolone',              dose: '1 tsp, hold 30–90 sec, empty stomach',     brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Pregnenolone, alpha-GPC, breviscapine, ginkgo, bacopa. Neuroplasticity, brain repair, reduces brain inflammation' },
    { product: 'XOME',                            dose: '3 capsules/day',                           brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Reduces NLRP3 inflammasomes — controls neuroinflammation and pyroptosis via IL-1B and IL-18' },
    { product: 'Calci Calm',                      dose: '4 capsules/day',                           brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Modulates NMDA receptors to prevent excitotoxicity. Protects neurons from excess calcium influx' },
    { product: 'Adrenal Complex',                 dose: '1 tablet 1–3×/day',                        brand: 'Mediherb',               quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Licorice and Rehmannia for adrenal support. Caution: contraindicated in hypertension, edema, pregnancy' },
    { product: 'Stress Buster Kit (for high ELI)', dose: 'See drainage dosing',                     brand: 'Bioresource',            quadrants: ['Q1','Q2'], indication: 'Stabilize elevated ELI — soothes nervous system, electrolyte regulation, mental/emotional exhaustion' },
    { product: 'Push Catch Protocol — Liver Sauce', dose: '1 tsp/day',                             brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Step 1 of Push Catch detox protocol. Mobilizes toxins. Wait 30 minutes, then take Ultra Binder.' },
    { product: 'Push Catch Protocol — Ultra Binder', dose: '1 tsp in water (30 min after Liver Sauce)', brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Step 2 of Push Catch detox protocol. Binds and removes mobilized toxins.' },
  ],

  cardiovascularSupport: [
    { product: 'CARDINORMA',                      dose: '15–20 drops 3×/day in water',              brand: 'Bioresource',            quadrants: ['Q1','Q3'], indication: 'Tonify and strengthen heart function. Cardiac insufficiency, heart muscle weakness' },
    { product: 'CLAUPAREST (combine with CARDINORMA)', dose: '15–20 drops 3×/day in water',         brand: 'Bioresource',            quadrants: ['Q1'], indication: 'Improves circulation, heart blood stagnation, venous circulation' },
    { product: 'Coro-CALM',                       dose: '15–20 drops 3×/day in water',              brand: 'Bioresource',            quadrants: ['Q1'], indication: 'Cardiac sedative, tachycardia, heart rhythm disturbances. Good for anxiety, fear, worry. If HQP rejections >20' },
    { product: 'Co-HYPERT (with CARDINORMA, RENELIX, Apo-HEPAT)', dose: '15–20 drops 3×/day in water', brand: 'Bioresource',       quadrants: ['Q1'], indication: 'Hypertension. Resolves metabolic blockages. Helpful for arterial elasticity and high PP' },
    { product: 'JUVE-CAL',                        dose: '1 tsp 3–4×/day',                           brand: 'Bioresource',            quadrants: ['Q1','Q2'], indication: 'Restorative and rejuvenating remedy' },
    { product: 'NATTOXYM',                        dose: '1 cap empty stomach 1–2×/day',             brand: 'U.S. Enzymes',           quadrants: ['Q1'], indication: 'Circulatory health, reduces blood viscosity, dissolves fibrinogen. Caution with blood thinners' },
    { product: 'THERAXYM',                        dose: '1 cap empty stomach 1–2×/day',             brand: 'U.S. Enzymes',           quadrants: ['Q1'], indication: 'Anti-inflammatory, circulatory and heart health. Eliminates biofilms' },
    { product: 'SERRAXYM',                        dose: '1 cap empty stomach every 8 hrs (up to 3×/day)', brand: 'U.S. Enzymes',    quadrants: ['Q1'], indication: 'Potent anti-inflammatory' },
    { product: 'Berkeley Life (Nitric Oxide)',     dose: '2 caps once/day with water after food',    brand: 'Berkeley Life',          quadrants: ['Q2','Q4'], indication: 'Increases nitric oxide for healthy circulatory regulation' },
    { product: 'Optimal Opti-Nitric (combines with Berkeley Life)', dose: '2 caps 2×/day',          brand: 'Optimal Health Systems', quadrants: ['Q2','Q4'], indication: 'Increases nitric oxide via complementary pathway' },
    { product: 'Nox Synergy',                     dose: '1 scoop (9g) in 8 oz water, 2 scoops/day', brand: 'Designs For Health',    quadrants: ['Q2'], indication: 'Supports healthy nitric oxide and vascular health' },
    { product: 'NOS Support',                     dose: '2 caps/day',                               brand: 'Functional Genomic Nutrition', quadrants: ['Q2'], indication: 'Potent cardiovascular support to increase nitric oxide' },
    { product: 'Cardio Elite',                    dose: 'Swirl gently, hold 30–90 sec in mouth',    brand: 'Quicksilver Scientific', quadrants: ['Q2','Q3'], indication: 'Boosts nitric oxide for better blood flow and circulation' },
    { product: 'K62 NITRITE BALANCE',             dose: '1 tsp 1–2×/day',                           brand: 'Apex Energetics',        quadrants: ['Q2'], indication: 'Increases nitric oxide for vascular health' },
    { product: 'CoQnol 100/200',                  dose: '1–2 softgels/day with meals',              brand: 'Designs For Health',     quadrants: ['Q3','Q4'], indication: 'CoQ10 reduced form, crucial for ATP in heart cells' },
    { product: 'Carditone',                       dose: '1 cap/day preferably at night',             brand: 'Ayush Herbs',            quadrants: ['Q3','Q4'], indication: 'Blood pressure support, blood vessels, heart health. Overall cardiovascular wellness' },
    { product: 'High Omega-3',                    dose: '1–2 caps/day',                             brand: 'Ayush Herbs',            quadrants: ['Q3'], indication: 'Cardiovascular and endothelial health of blood vessels' },
    { product: 'Carnitine Synergy',               dose: '1 cap/day',                                brand: 'Designs For Health',     quadrants: ['Q3'], indication: 'Heart muscle energy. Caution: gut bacteria can convert to TMAO — need healthy microbiome' },
    { product: 'Lumbroxym',                       dose: '1 cap empty stomach',                      brand: 'U.S. Enzymes',           quadrants: ['Q4'], indication: 'For hypercoagulation and hypoperfusion. Do NOT take with blood thinners' },
    { product: 'BOLUOKE (Lumbrokinase)',           dose: '1–2 caps 1–3×/day on empty stomach',       brand: 'Bioresource',            quadrants: ['Q4'], indication: 'For hypercoagulation and hypoperfusion. Do NOT take with blood thinners' },
    { product: 'Stress Buster Kit (if elevated ELI)', dose: 'See drainage dosing',                  brand: 'Bioresource',            quadrants: ['Q1','Q2'], indication: 'Stabilize and soothe nervous system for increased ELI' },
  ],

  oxidativeStressSupport: [
    { product: 'Tri-Fortify Liposomal Glutathione', dose: '1 tsp, hold under tongue 30–60 sec',    brand: 'Researched Nutritionals', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Glutathione is cofactor for GPX4 membrane protection. Especially from ferroptosis' },
    { product: 'H2 Absorb',                       dose: 'Dissolve tablet in water, drink',          brand: 'Researched Nutritionals', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Molecular hydrogen reduces hydroxyl radicals, increases NRF2' },
    { product: 'H2 Elite Molecular Hydrogen',     dose: 'Dissolve 1 tablet in water, drink promptly', brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Combats oxidative stress at cellular level' },
    { product: 'SULFORAXYM',                      dose: '2 capsules/day',                           brand: 'U.S. Enzymes',           quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Activates NRF2 antioxidant response element' },
    { product: 'Ergo-Thione+',                    dose: '1 tsp, hold 30–90 sec, refrigerate',       brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Ergothioneine targets mitochondria, direct ROS scavenging, activates NRF2' },
    { product: 'Nanoemulsified D3K2',             dose: '1 pump/day',                               brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Vitamin D is important membrane protector. Activates NRF2' },
    { product: 'CoQ10 Nanoemulsion',              dose: '2 pumps 2×/day',                           brand: 'Quicksilver Scientific', quadrants: ['Q1','Q2','Q3','Q4'], indication: 'Key antioxidant in electron transport chain' },
  ],

};

/** Category display metadata */
export const CATEGORY_META = {
  drainage:             { label: 'Drainage',               icon: '🌊', key: 'drainage' },
  cellMembraneSupport:  { label: 'Cell Membrane Support',  icon: '🔬', key: 'cellMembraneSupport' },
  mitochondrialSupport: { label: 'Mitochondrial Support',  icon: '⚡', key: 'mitochondrialSupport' },
  neurocognitiveSupport:{ label: 'Neurocognitive Support', icon: '🧠', key: 'neurocognitiveSupport' },
  oxidativeStressSupport:{ label: 'Oxidative Stress Support', icon: '🛡️', key: 'oxidativeStressSupport' },
  cardiovascularSupport:{ label: 'Cardiovascular Support', icon: '💓', key: 'cardiovascularSupport' },
};

/** ELI Stress Questionnaire — 10 items, each scored 0–4 */
export const ELI_QUESTIONS = [
  'I feel tension or tightness in my body',
  'My mind races or I have intrusive thoughts',
  'I experience physical tightness in my chest or gut',
  'I crash or feel exhausted after minimal effort',
  'I have difficulty falling or staying asleep',
  'I crave stimulants (caffeine, sugar) to get through the day',
  'I feel emotionally reactive or irritable',
  'I have difficulty concentrating or staying focused',
  'I feel detached, numb, or disconnected',
  'I notice heart palpitations or irregular heartbeat sensations',
];

export const ELI_SCALE = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost Always'];

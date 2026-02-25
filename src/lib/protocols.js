/**
 * CRIS GOLD™ Master Protocol List — v1.0 (LOCKED)
 * Source: Protocol Matrix documents (02-25-Docs)
 * Each entry: { product, dose, brand, quadrants[] }
 * quadrants: which CRIS quadrants this product is assigned to
 */

export const MASTER_PROTOCOL_LIST = {

  drainage: [
    { product: 'Mundipur',                    dose: '1–2 tsp in water',                        brand: 'Bioresource/Pekana',       quadrants: ['Q1'] },
    { product: 'Psy-Stabil (Stress Buster Kit)', dose: '½–1 tsp BID in water',                brand: 'Bioresource/Pekana',       quadrants: ['Q1','Q2'] },
    { product: 'Dalectro (Stress Buster Kit)', dose: '½–1 tsp BID in water',                   brand: 'Bioresource/Pekana',       quadrants: ['Q1','Q2'] },
    { product: 'Neu-Regen (Stress Buster Kit)', dose: '1–2 tsp BID',                           brand: 'Bioresource/Pekana',       quadrants: ['Q1','Q2','Q3'] },
    { product: 'Apo-HEPAT (Detox Kit)',        dose: '15–20 drops 3×/day',                     brand: 'Bioresource/Pekana',       quadrants: ['Q2','Q4'] },
    { product: 'RENELIX (Detox Kit)',          dose: '15–20 drops 3×/day',                     brand: 'Bioresource/Pekana',       quadrants: ['Q2','Q4'] },
    { product: 'ITIRES (Detox Kit)',           dose: '15–20 drops 3×/day',                     brand: 'Bioresource/Pekana',       quadrants: ['Q2','Q4'] },
    { product: 'Liv-Calm',                    dose: '15–20 drops 2–3×/day',                    brand: 'Bioresource/Pekana',       quadrants: ['Q2'] },
    { product: 'JUVE-CAL',                    dose: '1 tsp 3–4×/day',                          brand: 'Bioresource/Pekana',       quadrants: ['Q3'] },
    { product: 'TOXEX',                       dose: 'Start 1–5 drops, work up to 10–20/day',   brand: 'Bioresource/Pekana',       quadrants: ['Q4'] },
  ],

  cellMembraneSupport: [
    { product: 'The One',                     dose: '1–2 tsp/day (hold 30s before swallowing)', brand: 'Quicksilver Scientific',  quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'Membrane Mend',               dose: '1 tsp 1–2×/day',                          brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'Pure PC',                     dose: '1 tsp 1–2×/day',                          brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2'] },
    { product: 'Nanoemulsified D3K2',         dose: '1 pump/day',                              brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'Lactic Plus',                 dose: '30 drops 3×/day',                         brand: 'Bioresource/Pekana',       quadrants: ['Q1','Q2'] },
    { product: 'IntraMIN / IntraMAX',         dose: '1 fl oz/day',                             brand: 'Drucker Labs',             quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'OmegaAvail Ultra DHA',        dose: 'Per label',                               brand: 'Designs for Health',       quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'H2 Absorb',                   dose: '1–2 tablets in water',                    brand: 'Researched Nutritionals',  quadrants: ['Q1','Q2'] },
    { product: 'Tri-Fortify Liposomal Glutathione', dose: '1 tsp',                             brand: 'Researched Nutritionals',  quadrants: ['Q1','Q2','Q3'] },
    { product: 'Fatty Acid Assist',           dose: '2 caps with meals',                       brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'NAD+NADPH Assist',            dose: '2 caps/day',                              brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2'] },
    { product: 'SULFORAXYM',                  dose: '2 caps/day',                              brand: 'U.S. Enzymes',             quadrants: ['Q1','Q2','Q3','Q4'] },
  ],

  mitochondrialSupport: [
    { product: 'The One',                     dose: '1–2 tsp/day (hold 30s before swallowing)', brand: 'Quicksilver Scientific',  quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'NAD+ / NAD+ Platinum',        dose: '½ tsp by mouth',                          brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'CoQ10 Nanoemulsion',          dose: '2 pumps 2×/day',                          brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'H2 Elite Molecular Hydrogen', dose: '1 tablet in water',                       brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2'] },
    { product: 'Longevity Elite',             dose: '1 tsp/day',                               brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'Methyl B-Complex',            dose: '2 pumps/day',                             brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'Ergo-Thione+',               dose: '1 tsp by mouth',                           brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2'] },
    { product: 'ATP 360',                     dose: '3 caps once daily',                       brand: 'Researched Nutritionals',  quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'ATP Fuel',                    dose: '5–10 caps/day',                           brand: 'Researched Nutritionals',  quadrants: ['Q1','Q2'] },
    { product: 'Tri-Fortify Liposomal Glutathione', dose: '1 tsp',                             brand: 'Researched Nutritionals',  quadrants: ['Q1','Q2','Q3'] },
    { product: 'BC-ATP',                      dose: '2 caps/day',                              brand: 'CellCore Bioscience',      quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'H2 Absorb',                   dose: '1–2 tablets in water',                    brand: 'Researched Nutritionals',  quadrants: ['Q1','Q2'] },
    { product: 'Lactic Plus',                 dose: '30 drops 3×/day',                         brand: 'Bioresource/Pekana',       quadrants: ['Q1','Q2'] },
    { product: 'IntraMIN / IntraMAX',         dose: '1 fl oz/day',                             brand: 'Drucker Labs',             quadrants: ['Q1','Q2','Q3','Q4'] },
  ],

  neurocognitiveSupport: [
    { product: 'M2 Support',                  dose: '1–2 caps/day',                            brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'Brain Vitale',                dose: '2 caps/day',                              brand: 'Designs for Health',       quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'BDNF Essentials',             dose: '2 caps 2×/day',                           brand: 'Researched Nutritionals',  quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'Tri-Fortify Liposomal Glutathione', dose: '1 tsp',                             brand: 'Researched Nutritionals',  quadrants: ['Q1','Q2'] },
    { product: 'MycoREV Neuro',               dose: '1 cap 2–3×/day',                          brand: 'ADUCO',                    quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'SUNBALANCE',                  dose: '3 caps/day',                              brand: 'U.S. Enzymes',             quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'SULFORAXYM',                  dose: '2 caps/day',                              brand: 'U.S. Enzymes',             quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'TEAVIGO',                     dose: '1–2×/day',                                brand: 'U.S. Enzymes',             quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'SUNSPECTRUM',                 dose: '1 scoop in water',                        brand: 'U.S. Enzymes',             quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'TheralacPro',                 dose: '1–2 caps/day',                            brand: 'U.S. Enzymes',             quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'EXCITO-BLOX',                 dose: '2 caps 1–2×/day',                         brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2'] },
    { product: 'Liposomal Magtein',           dose: '1 tsp daytime + 1 tsp before bed',        brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'Neuro Pregnenolone',          dose: '1 tsp',                                   brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2'] },
    { product: 'Adrenal Complex',             dose: '1 tab 1–3×/day',                          brand: 'Mediherb',                 quadrants: ['Q3','Q4'] },
    { product: 'XOME',                        dose: '3 caps/day',                              brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2'] },
    { product: 'CalciCalm',                   dose: '4 caps/day',                              brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2'] },
    { product: 'H2S Cofactors',               dose: 'Per label',                               brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2'] },
  ],

  cardiovascularSupport: [
    { product: 'CARDINORMA',                  dose: '15–20 drops 3×/day',                      brand: 'Bioresource/Pekana',       quadrants: ['Q1','Q3'] },
    { product: 'CLAUPAREST',                  dose: '15–20 drops 3×/day',                      brand: 'Bioresource/Pekana',       quadrants: ['Q1'] },
    { product: 'Coro-CALM',                   dose: '15–20 drops 3×/day',                      brand: 'Bioresource/Pekana',       quadrants: ['Q1'] },
    { product: 'Co-HYPERT',                   dose: '15–20 drops 3×/day',                      brand: 'Bioresource/Pekana',       quadrants: ['Q1'] },
    { product: 'JUVE-CAL',                    dose: '1 tsp 3–4×/day',                          brand: 'Bioresource/Pekana',       quadrants: ['Q1','Q2'] },
    { product: 'NATTOXYM',                    dose: '1 cap 1–2×/day (empty stomach)',           brand: 'U.S. Enzymes',             quadrants: ['Q1'] },
    { product: 'THERAXYM',                    dose: '1 cap 1–2×/day (empty stomach)',           brand: 'U.S. Enzymes',             quadrants: ['Q1'] },
    { product: 'SERRAXYM',                    dose: '1 cap every 8 hrs (empty stomach)',        brand: 'U.S. Enzymes',             quadrants: ['Q1'] },
    { product: 'Berkeley Life (Nitric Oxide)', dose: '2 caps once/day',                         brand: 'Berkeley Life',            quadrants: ['Q2','Q4'] },
    { product: 'Opti-Nitric',                 dose: '2 caps 2×/day',                           brand: 'Optimal Health Systems',   quadrants: ['Q2','Q4'] },
    { product: 'Nox Synergy',                 dose: '2 scoops in 8 oz water/day',              brand: 'Designs for Health',       quadrants: ['Q2'] },
    { product: 'NOS Support',                 dose: '2 caps/day',                              brand: 'Functional Genomic Nutrition', quadrants: ['Q2'] },
    { product: 'Cardio Elite',                dose: 'Hold 30–90s in mouth',                    brand: 'Quicksilver Scientific',   quadrants: ['Q2','Q3'] },
    { product: 'K62 Nitrite Balance',         dose: '1 tsp 1–2×/day',                          brand: 'Apex Energetics',          quadrants: ['Q2'] },
    { product: 'CoQnol 100/200',              dose: '1–2 softgels/day',                        brand: 'Designs for Health',       quadrants: ['Q3','Q4'] },
    { product: 'Carditone',                   dose: '1 cap/day at night',                      brand: 'Ayush Herbs',              quadrants: ['Q3','Q4'] },
    { product: 'High Omega-3',                dose: '1–2 caps/day',                            brand: 'Ayush Herbs',              quadrants: ['Q3'] },
    { product: 'Carnitine Synergy',           dose: '1 cap/day',                               brand: 'Designs for Health',       quadrants: ['Q3'] },
    { product: 'LumbroXYM',                   dose: '1 cap on empty stomach',                  brand: 'U.S. Enzymes',             quadrants: ['Q4'] },
    { product: 'BOLUOKE (Lumbrokinase)',       dose: '1–2 caps 1–3×/day (empty stomach)',       brand: 'Bioresource/Pekana',       quadrants: ['Q4'] },
  ],

  oxidativeStressSupport: [
    { product: 'Tri-Fortify Liposomal Glutathione', dose: '1 tsp',                             brand: 'Researched Nutritionals',  quadrants: ['Q1','Q2','Q3'] },
    { product: 'H2 Elite Molecular Hydrogen', dose: '1 tablet in water',                       brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2'] },
    { product: 'H2 Absorb',                   dose: '1–2 tablets in water',                    brand: 'Researched Nutritionals',  quadrants: ['Q1','Q2'] },
    { product: 'SULFORAXYM',                  dose: '2 caps/day',                              brand: 'U.S. Enzymes',             quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'Ergo-Thione+',               dose: '1 tsp by mouth',                           brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2'] },
    { product: 'Nanoemulsified D3K2',         dose: '1 pump/day',                              brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'XOME',                        dose: '3 caps/day',                              brand: 'Functional Genomic Nutrition', quadrants: ['Q1','Q2'] },
    { product: 'CoQ10 Nanoemulsion',          dose: '2 pumps 2×/day',                          brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2','Q3','Q4'] },
    { product: 'Longevity Elite',             dose: '1 tsp/day',                               brand: 'Quicksilver Scientific',   quadrants: ['Q1','Q2','Q3','Q4'] },
  ],

};

/** Category display metadata */
export const CATEGORY_META = {
  drainage:             { label: 'Drainage',               icon: '🌊', key: 'drainage' },
  cellMembraneSupport:  { label: 'Cell Membrane Support',  icon: '🔬', key: 'cellMembraneSupport' },
  mitochondrialSupport: { label: 'Mitochondrial Support',  icon: '⚡', key: 'mitochondrialSupport' },
  neurocognitiveSupport:{ label: 'Neurocognitive Support', icon: '🧠', key: 'neurocognitiveSupport' },
  oxidativeStressSupport:{ label: 'Oxidative Stress Support', icon: '🛡️', key: 'oxidativeStressSupport' },
  cardiovascularSupport:{ label: 'Cardiovascular Support', icon: '🫀', key: 'cardiovascularSupport' },
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

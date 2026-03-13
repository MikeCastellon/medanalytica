interface Recording {

  mo: number
  amo: number
  ans: number
  bnt: bnt
  bpm: number
  icp: "HIGH" | "WNL"
  tfi: number
  rsai: number
  brain: Brain
  dhatu: Dhatu
  mxdmn: number
  bioAge: number
  doshas: Doshas
  ageDiff: number
  chakras: Chakras
  cns_ans: number
  hormones: Hormones
  hrvIndex: number
  minerals: Minerals
  yin_yang: number
  meridians: Meridians
  timeDomain: TimeDomain
  dorsalVagus: number
  healthIndex: number
  inflamIndex: number
  stressIndex: number
  fiveElements: FiveElements
  avgHealthIndex: number
  schema_version: number
  frequencyDomain: FrequencyDomain
  cardio_vasc_adapt: number
  neuro_hormonal_reg: number
}

interface bnt {
  ach: number
  ct_e: number
  dopa: number
  gaba: number
  sert: number
  ct_ne: number
}

interface Brain {
  beta: number
  alpha: number
  delta: number
  hbeta: number
  theta: number
  brain_power: number
  total_power: number
}

interface Dhatu {
  medu: number
  rasa: number
  asthi: number
  majja: number
  mamsa: number
  rakta: number
  shukra: number
}

interface Doshas {
  vata: number
  kapha: number
  pitta: number
  vataSub: VataSub
  kaphaSub: KaphaSub
  pittaSub: PittaSub
}

interface VataSub {
  apana: number
  prana: number
  udana: number
  vyana: number
  samana: number
}

interface KaphaSub {
  bodhaka: number
  kledaka: number
  tarpaka: number
  sleshaka: number
  avalambaka: number
}

interface PittaSub {
  pachaka: number
  ranjaka: number
  sadhaka: number
  alochaka: number
  bhrajaka: number
}

interface Chakras {
  ep1: number
  ep2: number
  ep3: number
  ep4: number
  ep5: number
  ep6: number
  ep7: number
}

interface Hormones {
  dhea: number
  t3_t4: number
  insulin: number
  cortisol: number
  estradiol: number
  pregnenolone: number
}

interface Minerals {
  k: number
  ca: number
  mg: number
  na: number
}

interface Meridians {
  bl: number
  gb: number
  ht: number
  ki: number
  li: number
  lu: number
  lv: number
  pc: number
  si: number
  sp: number
  st: number
  tw: number
}

interface TimeDomain {
  cvsd: number
  sdnn: number
  sdsd: number
  cvnni: number
  rmssd: number
  max_hr: number
  min_hr: number
  nni_20: number
  nni_50: number
  std_hr: number
  mean_hr: number
  pnni_20: number
  pnni_50: number
  mean_nni: number
  range_nni: number
  median_nni: number
}

interface FiveElements {
  air: number
  fire: number
  earth: number
  ether: number
  water: number
}

interface FrequencyDomain {
  hf: number
  lf: number
  vlf: number
  hfnu: number
  lfnu: number
  lf_hf_ratio: number
  total_power: number
  hf_percentage: number
  lf_percentage: number
  vlf_percentage: number
}
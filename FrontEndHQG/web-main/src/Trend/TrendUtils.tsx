import { path } from "d3";

const amoTransfrom = (value: number) => {
  return value * 100;
};

export const transfroms = {
  amo: amoTransfrom,
};

export type BaseSelectItem = {
  fullPath: string;
  path: string;
  label: string;
};

export type SelectItem = BaseSelectItem & {};

export type ParentSelectItem = BaseSelectItem & {
  children: SelectItem[];
};
const ChakraData = [
  {
    fullPath: "data.chakras.ep1",
    path: "ep1",
    label: "EP 1",
  },
  {
    fullPath: "data.chakras.ep2",
    path: "ep2",
    label: "EP 2",
  },
  {
    fullPath: "data.chakras.ep3",
    path: "ep3",
    label: "EP 3",
  },
  {
    fullPath: "data.chakras.ep4",
    path: "ep4",
    label: "EP 4",
  },
  {
    fullPath: "data.chakras.ep5",
    path: "ep5",
    label: "EP 5",
  },
  {
    fullPath: "data.chakras.ep6",
    path: "ep6",
    label: "EP 6",
  },
  {
    fullPath: "data.chakras.ep7",
    path: "ep7",
    label: "EP 7",
  },
];

const NervousSystemData = [
  {
    fullPath: "data.amo",
    path: "amo",
    label: "AMO %",
    children: [],
  },
  {
    fullPath: "data.timeDomain.sdnn",
    path: "sdnn",
    label: "SDNN",
    children: [],
  },
  {
    fullPath: "data.timeDomain.rmssd",
    path: "rmssd",
    label: "RMSSD",
    children: [],
  },
  {
    fullPath: "data.frequencyDomain.total_power",
    path: "total_power",
    label: "Total Power",
    children: [],
  },
  {
    fullPath: "data.stressIndex",
    path: "stressIndex",
    label: "Stress Index",
    children: [],
  },
  {
    fullPath: "data.inflamIndex",
    path: "inflamIndex",
    label: "Inflam Index",
    children: [],
  },
  {
    fullPath: "data.bpm",
    path: "bpm",
    label: "Heart Rate",
    children: [],
  },
  {
    fullPath: "data.frequencyDomain.hf",
    path: "hf",
    label: "HF",
    children: [],
  },
  {
    fullPath: "data.frequencyDomain.lf",
    path: "lf",
    label: "LF",
    children: [],
  },
  {
    fullPath: "data.frequencyDomain.vlf",
    path: "vlf",
    label: "VLF",
    children: [],
  },
];

const HormonesData = [
  {
    fullPath: "data.hormones.dhea",
    path: "dhea",
    label: "DHEA",
    children: [],
  },
  {
    fullPath: "data.hormones.insulin",
    path: "insulin",
    label: "Insulin",
    children: [],
  },
  {
    fullPath: "data.hormones.cortisol",
    path: "cortisol",
    label: "Cortisol",
    children: [],
  },
  {
    fullPath: "data.hormones.estradiol",
    path: "estradiol",
    label: "Estradiol",
    children: [],
  },
  {
    fullPath: "data.hormones.pregnenolone",
    path: "pregnenolone",
    label: "Pregnenolone",
    children: [],
  },
  {
    fullPath: "data.hormones.t3_t4",
    path: "t3_t4",
    label: "T3 T4",
    children: [],
  },
];
const MineralsData = [
  {
    fullPath: "data.minerals.k",
    path: "k",
    label: "Potassium",
    children: [],
  },
  {
    fullPath: "data.minerals.ca",
    path: "ca",
    label: "Calcium",
    children: [],
  },
  {
    fullPath: "data.minerals.mg",
    path: "mg",
    label: "Magnesium",
    children: [],
  },
  {
    fullPath: "data.minerals.na",
    path: "na",
    label: "Sodium",
    children: [],
  },
];

const BNTData = [
  {
    fullPath: "data.bnt.ach",
    path: "ach",
    label: "Ach",
    children: [],
  },
  {
    fullPath: "data.bnt.ct_e",
    path: "ct_e",
    label: "CT E",
    children: [],
  },
  {
    fullPath: "data.bnt.dopa",
    path: "dopa",
    label: "Dopa",
    children: [],
  },
  {
    fullPath: "data.bnt.gaba",
    path: "gaba",
    label: "Gaba",
    children: [],
  },
  {
    fullPath: "data.bnt.sert",
    path: "sert",
    label: "Sert",
    children: [],
  },
  {
    fullPath: "data.bnt.ct_ne",
    path: "ct_ne",
    label: "CT NE",
    children: [],
  },
];

const MeridiansData = [
  {
    fullPath: "data.meridians.bl",
    path: "bl",
    label: "Bladder",
    children: [],
  },
  {
    fullPath: "data.meridians.gb",
    path: "gb",
    label: "Gall Bladder",
    children: [],
  },
  {
    fullPath: "data.meridians.ht",
    path: "ht",
    label: "Heart",
    children: [],
  },
  {
    fullPath: "data.meridians.ki",
    path: "ki",
    label: "Kidney",
    children: [],
  },
  {
    fullPath: "data.meridians.li",
    path: "li",
    label: "Large Intestine",
    children: [],
  },
  {
    fullPath: "data.meridians.lu",
    path: "lu",
    label: "Lung",
    children: [],
  },
  {
    fullPath: "data.meridians.lv",
    path: "lv",
    label: "Liver",
    children: [],
  },
  {
    fullPath: "data.meridians.pc",
    path: "pc",
    label: "Pericardium",
    children: [],
  },
  {
    fullPath: "data.meridians.si",
    path: "si",
    label: "Small Intestine",
    children: [],
  },
  {
    fullPath: "data.meridians.sp",
    path: "sp",
    label: "Spleen",
    children: [],
  },
  {
    fullPath: "data.meridians.st",
    path: "st",
    label: "Stomach",
    children: [],
  },
  {
    fullPath: "data.meridians.tw",
    path: "tw",
    label: "Triple Warmer",
    children: [],
  },
];

const DoshasData = [
  {
    fullPath: "data.doshas.vata",
    path: "vata",
    label: "Vata",
    children: [],
  },
  {
    fullPath: "data.doshas.kapha",
    path: "kapha",
    label: "Kapha",
    children: [],
  },
  {
    fullPath: "data.doshas.pitta",
    path: "pitta",
    label: "Pitta",
    children: [],
  },
];

export const HQData: ParentSelectItem[] = [
  {
    fullPath: "data", // Might need to change this
    path: "data",
    label: "Nervous System",
    children: NervousSystemData,
  },
  {
    fullPath: "data.hormones",
    path: "hormones",
    label: "Hormones",
    children: HormonesData,
  },
  {
    fullPath: "data.minerals",
    path: "minerals",
    label: "Minerals",
    children: MineralsData,
  },
  {
    fullPath: "data.bnt",
    path: "bnt",
    label: "Brain Neurotransmitters",
    children: BNTData,
  },
  {
    fullPath: "data.chakras",
    path: "chakras",
    label: "Chakras",
    children: ChakraData,
  },
  {
    fullPath: "data.meridians",
    path: "meridians",
    label: "Meridians",
    children: MeridiansData,
  },
  {
    fullPath: "data.doashas",
    path: "doshas",
    label: "Ayurvedic Doshas",
    children: DoshasData,
  },
];

export const getSelectItemByPath = (
  fullPath: string
): SelectItem | undefined => {
  const allItems = HQData.flatMap((parent) => parent.children);
  return allItems.find((item) => item.fullPath === fullPath);
};

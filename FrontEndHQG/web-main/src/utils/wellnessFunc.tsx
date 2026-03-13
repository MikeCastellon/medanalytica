export const getAgeRelatedWellnessIndex = (currentAge: number) => {
  const currentAgeIndex = currentAge - 19
  if (currentAge <= 19) {
    return wellnessIndexArray[0]
  }
  if (currentAge >= 91) {
    return wellnessIndexArray[wellnessIndexArray.length - 1]
  }

  return wellnessIndexArray[currentAgeIndex]
}


export const getPeakPerformance = (currentAge: number, currentWellnessIndex: number) => {
  const ageRelatedWellness = getAgeRelatedWellnessIndex(currentAge)
  if (currentAge <= 19) {
    return 100
  }
  const peakPerformance = currentWellnessIndex / ageRelatedWellness * 100

  if (peakPerformance >= 100) {
    return 100
  }
  return peakPerformance

}

const wellnessIndexArray = [
  100,
  90,
  89,
  88,
  86,
  84,
  82,
  80,
  78,
  76,
  74,
  72,
  70,
  68,
  66,
  64,
  62,
  60,
  58,
  56,
  54,
  52,
  50,
  48,
  46,
  44,
  42,
  40,
  38,
  36,
  34,
  32,
  31,
  30,
  29,
  28,
  27,
  26,
  25,
  24,
  23,
  22,
  21,
  20,
  19,
  18,
  17,
  16,
  15,
  14,
  13,
  12,
  11,
  10,
  9,
  9.5,
  9,
  8.5,
  8,
  7.5,
  7,
  6.5,
  6,
  5.5,
  5,
  4.5,
  4,
  3.5,
  3,
  2.5,
  2,
  1.5,
  1,
]
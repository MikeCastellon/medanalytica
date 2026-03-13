interface value {
  title: string
  title_alt: string | null,
  ideal_max: number,
  ideal_min: number,
  id: string
  abs_max: number,
  abs_min: number
}

// return summary object
export const summariseRecording = (recording: Recording, ranges: any[]): any[] => {
  let outOfRange: any[] = []

  recursionMap(recording, outOfRange)

  return outOfRange
}

const recursionMap = (obj: Object, arr: any[]) => {
  for (const property in obj) {
    const key = property as keyof typeof obj
    if (typeof obj[key] == "object") {
      recursionMap(obj[key], arr)
    } else {
      arr.push({
        id: key,
        value: obj[key]
      })
    }
  }
}

interface ValuesMetadata {
  [key: string]: any
}

export const restructureValuesMetadata = (ranges: any[]) => {
  const objects: ValuesMetadata = {}
  ranges.forEach((d) => objects[d.id] = { ...d })
  return objects
}

export const buildReport = (valuesArray: { id: string, value: number }[], rangesObject: any) => {
  const summaryList: any[] = []

  valuesArray.forEach((d) => {
    if (rangesObject[d.id]) {
      const rangeObj = rangesObject[d.id]
      if (d.value < rangeObj.ideal_min) {
        summaryList.push({
          ...d,
          reason: "LOW",
          metadata: {
            ...rangeObj
          }
        })
      }
      if (d.value > rangeObj.ideal_max) {
        summaryList.push({
          ...d,
          reason: "HIGH",
          metadata: {
            ...rangeObj
          }
        })
      }
    }
  })
  return summaryList
}
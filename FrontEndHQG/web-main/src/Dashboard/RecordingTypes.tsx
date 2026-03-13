export type Ecg_File = {
  id: string
}
export type Rr_File = {
  id: string
}

export type TRecording = {
  id: string
  title: string,
  created_on: string,
  data?: any,
  ecg_file?: Ecg_File | null,
  rr_file?: Rr_File | null,
  trend_recording: boolean
}



import Dexie from 'dexie';

interface IRecordingObj {
  id?: number,
  title: string
  recordingString: string;
  ownerId: string
  sampleRate: number
  created_on: Date
}

class HQDatabase extends Dexie {
  recordings!: Dexie.Table<IRecordingObj, number>;
  constructor() {
    super("HQDatabase");

    //
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(1).stores({
      recordings: '++id, title, recordingString, ownerId, sampleRate, created_on'
    })
  }
}

export class RecordingObj implements IRecordingObj {
  id?: number | undefined;
  title: string;
  recordingString: string;
  ownerId: string;
  sampleRate: number;
  created_on: Date;

  constructor(title: string, recordingString: string, ownerId: string, sampleRate: number) {
    this.title = title
    this.recordingString = recordingString
    this.ownerId = ownerId
    this.sampleRate = sampleRate ? sampleRate : 1000
    this.created_on = new Date()
  }

  toFormData() {
    const formData = new FormData()
    formData.append('recordingFile', new File([this.recordingString], `${this.title}.txt`, { type: "text/plain" }));
    formData.append('ownerId', this.ownerId);
    formData.append('sampleRate', this.sampleRate.toString());
    formData.append('title', this.title)
    return formData
  }

  setId(id: number) {
    this.id = id
    return this
  }
}

export const db = new HQDatabase();

// interface IDebugRecording {
//   id?: number | undefined;
//   ownerId: string
//   sampleRate: number
//   created_on: Date
// }

// interface IDebugRecordingData {
//   id?: number | undefined;
//   timestamp: Date
//   data: string
// }

// class HQDebugDatabase extends Dexie {
//   recordings!: Dexie.Table<IDebugRecording, number>
//   recordingData!: Dexie.Table<IDebugRecordingData, number>
//   constructor() {
//     super("debugRecordings")
//     this.version(1).stores({
//       recordings: '++id, ownerId, sampleRate, created_on',
//       recordingData: '++id, timestamp, data'
//     })
//   }
// }

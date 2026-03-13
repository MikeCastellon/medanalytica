import { Subject } from "rxjs";

export const isCapable = 'bluetooth' in navigator;

export const GetHeartQuestDevice = async (services: string[]) => {

  try {
    if (!isCapable) {
      return
    }
    const device = await navigator.bluetooth.requestDevice({
      filters: [{
        name: 'HeartQuest'
      },
      ],
      optionalServices: services
    })
    return device

  } catch (error) {
    console.error(error);

  }
}

export const GetHeartQuestServer = async (device: BluetoothDevice) => {
  try {
    if (!device.gatt) return
    console.log('Connecting to GATT Server...');
    const server = await device.gatt.connect();
    return server
  } catch (error) {
    console.error(error)
  }
}

export const GetHeartQuestService = async (server: BluetoothRemoteGATTServer, serviceUUID: BluetoothServiceUUID) => {
  try {
    console.log('Getting Service...');
    const service = await server.getPrimaryService(serviceUUID);
    return service
  } catch (error) {
    console.error(error);
  }
}

export const startStream = async (service: BluetoothRemoteGATTService) => {
  const writeChar = "dbf90003-1d19-11eb-adc1-0242ac120002"

  try {
    console.log('Getting Characteristic...');
    const writeCharacteristic = await service.getCharacteristic(writeChar);
    console.log("Starting stream...");
    await writeCharacteristic.writeValue(startStData)
  } catch (error) {
    console.error(error);
  }

}

export const readStream = async (service: BluetoothRemoteGATTService, handleNotifications: (event: any) => void) => {
  const dataStreamChar = "dbf90005-1d19-11eb-adc1-0242ac120002"

  try {
    console.log("Subscribe to Stream");
    const readCharacteristic = await service.getCharacteristic(dataStreamChar);
    const readNotification = await readCharacteristic.startNotifications()
    readNotification.addEventListener('characteristicvaluechanged', handleNotifications)
  } catch (error) {
    console.error(error);
  }

}

export const stopStream = async (service: BluetoothRemoteGATTService) => {
  const writeChar = "dbf90003-1d19-11eb-adc1-0242ac120002"

  try {
    console.log('Sending stop command...');
    const writeCharacteristic = await service.getCharacteristic(writeChar);
    const writeResponse = await writeCharacteristic.writeValue(stopStData)
    console.log(writeResponse)

  } catch (error) {
    console.log(error);

  }

}

let txBuffer = new ArrayBuffer(20);
export const startStData = new Uint8Array(txBuffer);
startStData[0] = 0x01
startStData[1] = 0x40
startStData[2] = 0x01
startStData[3] = 0x00
startStData[4] = 0x00

let txBuffer_3 = new ArrayBuffer(20);
export const stopStData = new Uint8Array(txBuffer_3);
stopStData[0] = 0x03
stopStData[1] = 0x40
stopStData[2] = 0x01
stopStData[3] = 0x00
stopStData[4] = 0x00

function handleNotifications(event: any, sub$: Subject<number>) {
  let value: DataView = event.target.value;

  [0, 2, 4, 6, 8, 10, 12, 14, 16, 18].forEach((d) => {
    // a.push(value.getInt16(d, true))
    sub$.next(value.getInt16(d, true))
  })

}
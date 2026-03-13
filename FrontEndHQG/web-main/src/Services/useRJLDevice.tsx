import { useState, useEffect } from "react";

const deviceName = "Q7 BLE Connect";
const bleService = "0000181a-0000-1000-8000-00805f9b34fb";
const bleCharacteristic = "00002a3d-0000-1000-8000-00805f9b34fb";

function useRJLDevice() {
  const [isBluetoothAvailable, setIsBluetoothAvailable] =
    useState<boolean>(false);

  //   const [bluetoothDevice, setBluetoothDevice] =
  //     useState<BluetoothDevice | null>(null);

  //   const [gattCharacteristic, setGattCharacteristic] =
  //     useState<BluetoothRemoteGATTCharacteristic | null>(null);

  const [reactance, setReactance] = useState<number>(0);
  const [resistance, setResistance] = useState<number>(0);
  const [phaseAngle, setPhaseAngle] = useState<number>(0);

  useEffect(() => {
    setIsBluetoothAvailable(!!navigator.bluetooth);
  }, []);

  const resetValues = () => {
    setResistance(0);
    setReactance(0);
    setPhaseAngle(0);
  };

  const getDeviceInfo = () => {
    if (!isBluetoothAvailable) {
      return Promise.reject(
        "Web Bluetooth API is not available in this browser!"
      );
    }

    let options: RequestDeviceOptions = {
      optionalServices: [bleService],
      filters: [{ name: deviceName }, { name: "Arduino" }],
    };

    console.log("Requesting any Bluetooth Device...");
    return navigator.bluetooth
      .requestDevice(options)
      .then((device) => {
        console.log("Got device: " + device.name);
        // setBluetoothDevice(device);
        return device;
      })
      .catch((error) => {
        console.log("Argh! " + error);
        return error;
      });
  };

  const connectGATT = (device: BluetoothDevice) => {
    if (!device) return Promise.reject("No Bluetooth Device");

    // if (device?.gatt?.connected && gattCharacteristic) {
    //   return Promise.resolve(gattCharacteristic);
    // }

    return device.gatt
      ? device.gatt
          .connect()
          .then((server) => server.getPrimaryService(bleService))
          .then((service) => service.getCharacteristic(bleCharacteristic))
          .then((characteristic) => {
            // setGattCharacteristic(characteristic);
            characteristic.addEventListener(
              "characteristicvaluechanged",
              handleReadValue
            );
            return characteristic;
          })
      : Promise.reject("No GATT Server");
  };

  const read = () => {
    console.log("Reading...");
    return getDeviceInfo()
      .then(connectGATT)
      .then((characteristic: any) => {
        console.log("Reading UV Index...");
        return characteristic.readValue();
      })
      .catch((error: any) => {
        console.log("Waiting to start reading: " + error);
      });
  };

  const handleReadValue = (event: Event) => {
    const target = event.target as BluetoothRemoteGATTCharacteristic;
    const value = target.value;
    const textDecoder = new TextDecoder("ascii");
    const newValue = textDecoder.decode(value?.buffer);

    const parse = newValue.split(/,/);
    const resistance = Number(parse[0]) * 1.0;
    const reactance = Number(parse[1]) * 1.0;
    const phase_angle = Number(parse[2]) * 1.0;

    setResistance(resistance);
    setReactance(reactance);
    setPhaseAngle(phase_angle);
    console.log("Done reading..");
  };

  return {
    isBluetoothAvailable,
    getDeviceInfo,
    read,
    resistance,
    reactance,
    phaseAngle,
    resetValues,
  };
}
export default useRJLDevice;

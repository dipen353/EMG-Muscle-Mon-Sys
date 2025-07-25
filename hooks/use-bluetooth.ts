"use client"

import { useState, useCallback } from "react"

interface BluetoothDevice {
  id: string
  name: string
  connected: boolean
}

interface EMGReading {
  deviceId: string
  muscleGroup: string
  emgValue: number
  voltage: number
  timestamp: string
  sessionId: string
  userId: string
}

export const useBluetooth = () => {
  const [device, setDevice] = useState<BluetoothDevice | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connectToDevice = useCallback(async () => {
    if (!navigator.bluetooth) {
      setError("Bluetooth is not supported in this browser")
      return false
    }

    setIsConnecting(true)
    setError(null)

    try {
      // Request Bluetooth device
      const bluetoothDevice = await navigator.bluetooth.requestDevice({
        filters: [{ name: "HC-05" }],
        optionalServices: ["00001101-0000-1000-8000-00805f9b34fb"],
      })

      // Connect to GATT server
      const server = await bluetoothDevice.gatt?.connect()
      if (!server) {
        throw new Error("Failed to connect to GATT server")
      }

      // Get service and characteristic
      const service = await server.getPrimaryService("00001101-0000-1000-8000-00805f9b34fb")
      const characteristic = await service.getCharacteristic("00001101-0000-1000-8000-00805f9b34fb")

      // Set up device info
      const deviceInfo: BluetoothDevice = {
        id: bluetoothDevice.id,
        name: bluetoothDevice.name || "Unknown Device",
        connected: true,
      }

      setDevice(deviceInfo)
      setIsConnecting(false)

      // Listen for data
      characteristic.addEventListener("characteristicvaluechanged", handleDataReceived)
      await characteristic.startNotifications()

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect to Bluetooth device")
      setIsConnecting(false)
      return false
    }
  }, [])

  const handleDataReceived = useCallback((event: Event) => {
    const target = event.target as BluetoothRemoteGATTCharacteristic
    const value = target.value

    if (value) {
      // Parse EMG data from Bluetooth
      const decoder = new TextDecoder()
      const dataString = decoder.decode(value)

      try {
        const emgData: EMGReading = JSON.parse(dataString)
        // Emit custom event with EMG data
        window.dispatchEvent(new CustomEvent("emgData", { detail: emgData }))
      } catch (err) {
        console.error("Failed to parse EMG data:", err)
      }
    }
  }, [])

  const disconnect = useCallback(async () => {
    if (device) {
      try {
        // Disconnect from device
        setDevice(null)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to disconnect")
      }
    }
  }, [device])

  return {
    device,
    isConnecting,
    error,
    connectToDevice,
    disconnect,
    isConnected: !!device?.connected,
  }
}

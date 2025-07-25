"use client"

import { useState, useEffect, useCallback } from "react"

interface EMGDataPoint {
  timestamp: string
  value: number
  voltage: number
  muscleGroup: string
}

interface EMGStats {
  current: number
  peak: number
  average: number
  duration: number
}

export const useEMGData = (muscleGroup = "bicep-left") => {
  const [currentValue, setCurrentValue] = useState(0)
  const [currentVoltage, setCurrentVoltage] = useState(0)
  const [history, setHistory] = useState<EMGDataPoint[]>([])
  const [stats, setStats] = useState<EMGStats>({
    current: 0,
    peak: 0,
    average: 0,
    duration: 0,
  })
  const [isRecording, setIsRecording] = useState(false)

  // Simulate real-time EMG data
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate EMG readings with realistic patterns
      const baseValue = 400
      const timeVariation = Math.sin(Date.now() / 2000) * 150
      const randomNoise = (Math.random() - 0.5) * 100
      const muscleActivation = isRecording ? Math.sin(Date.now() / 1000) * 200 : 0

      const emgValue = Math.max(0, Math.min(1023, baseValue + timeVariation + randomNoise + muscleActivation))

      const voltage = (emgValue / 1023) * 5

      setCurrentValue(Math.round(emgValue))
      setCurrentVoltage(Number.parseFloat(voltage.toFixed(2)))

      // Add to history
      const dataPoint: EMGDataPoint = {
        timestamp: new Date().toISOString(),
        value: Math.round(emgValue),
        voltage: Number.parseFloat(voltage.toFixed(2)),
        muscleGroup,
      }

      setHistory((prev) => {
        const updated = [...prev, dataPoint]
        return updated.slice(-50) // Keep last 50 points
      })

      // Update stats
      setStats((prev) => {
        const newPeak = Math.max(prev.peak, Math.round(emgValue))
        const allValues = [...history.map((h) => h.value), Math.round(emgValue)]
        const newAverage = allValues.reduce((sum, val) => sum + val, 0) / allValues.length

        return {
          current: Math.round(emgValue),
          peak: newPeak,
          average: Math.round(newAverage),
          duration: prev.duration + 0.5, // Increment by 0.5 seconds
        }
      })
    }, 500)

    return () => clearInterval(interval)
  }, [muscleGroup, isRecording, history])

  // Listen for Bluetooth EMG data
  useEffect(() => {
    const handleEMGData = (event: CustomEvent) => {
      const emgReading = event.detail
      setCurrentValue(emgReading.emgValue)
      setCurrentVoltage(emgReading.voltage)

      const dataPoint: EMGDataPoint = {
        timestamp: emgReading.timestamp,
        value: emgReading.emgValue,
        voltage: emgReading.voltage,
        muscleGroup: emgReading.muscleGroup,
      }

      setHistory((prev) => {
        const updated = [...prev, dataPoint]
        return updated.slice(-50)
      })
    }

    window.addEventListener("emgData", handleEMGData as EventListener)
    return () => window.removeEventListener("emgData", handleEMGData as EventListener)
  }, [])

  const startRecording = useCallback(() => {
    setIsRecording(true)
    setStats((prev) => ({ ...prev, duration: 0, peak: 0 }))
  }, [])

  const stopRecording = useCallback(() => {
    setIsRecording(false)
  }, [])

  const resetStats = useCallback(() => {
    setStats({
      current: 0,
      peak: 0,
      average: 0,
      duration: 0,
    })
    setHistory([])
  }, [])

  return {
    currentValue,
    currentVoltage,
    history,
    stats,
    isRecording,
    startRecording,
    stopRecording,
    resetStats,
  }
}

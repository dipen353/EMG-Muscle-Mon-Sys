export const calculateBMI = (height: number, weight: number): number => {
  const heightInMeters = height / 100
  return Number.parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1))
}

export const getBMICategory = (bmi: number): { category: string; color: string } => {
  if (bmi < 18.5) return { category: "Underweight", color: "text-blue-400" }
  if (bmi < 25) return { category: "Normal", color: "text-green-400" }
  if (bmi < 30) return { category: "Overweight", color: "text-yellow-400" }
  return { category: "Obese", color: "text-red-400" }
}

export const processEMGData = (
  rawValue: number,
): {
  voltage: number
  smoothed: number
  activationLevel: "low" | "moderate" | "high"
} => {
  // Convert ADC value to voltage
  const voltage = (rawValue / 1024) * 5.0

  // Apply simple smoothing (in real implementation, use proper filtering)
  const smoothed = voltage

  // Classify activation level
  let activationLevel: "low" | "moderate" | "high" = "low"
  if (smoothed > 3.0) activationLevel = "high"
  else if (smoothed > 1.5) activationLevel = "moderate"

  return {
    voltage: Number.parseFloat(voltage.toFixed(2)),
    smoothed: Number.parseFloat(smoothed.toFixed(2)),
    activationLevel,
  }
}

export const calculateMuscleProgress = (currentSession: number[], previousSession: number[]): number => {
  if (previousSession.length === 0) return 0

  const currentAvg = currentSession.reduce((sum, val) => sum + val, 0) / currentSession.length
  const previousAvg = previousSession.reduce((sum, val) => sum + val, 0) / previousSession.length

  return Number.parseFloat((((currentAvg - previousAvg) / previousAvg) * 100).toFixed(1))
}

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export const getActivationStatus = (
  value: number,
  relaxedBaseline: number,
  flexedBaseline: number,
): { status: "relaxed" | "moderate" | "active" | "fatigue"; color: string } => {
  const range = flexedBaseline - relaxedBaseline
  const threshold1 = relaxedBaseline + range * 0.3
  const threshold2 = relaxedBaseline + range * 0.7
  const fatigueThreshold = flexedBaseline * 1.2

  if (value > fatigueThreshold) {
    return { status: "fatigue", color: "text-red-400" }
  } else if (value > threshold2) {
    return { status: "active", color: "text-green-400" }
  } else if (value > threshold1) {
    return { status: "moderate", color: "text-yellow-400" }
  } else {
    return { status: "relaxed", color: "text-blue-400" }
  }
}

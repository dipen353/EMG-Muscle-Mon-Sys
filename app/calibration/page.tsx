"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Bluetooth, CheckCircle, Circle, ArrowRight, ArrowLeft, Zap, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface MuscleGroup {
  id: string
  name: string
  side: "left" | "right"
  icon: string
  calibrated: boolean
  flexedValue?: number
  relaxedValue?: number
}

const muscleGroups: MuscleGroup[] = [
  { id: "bicep-left", name: "Bicep", side: "left", icon: "BI-L", calibrated: false },
  { id: "bicep-right", name: "Bicep", side: "right", icon: "BI-R", calibrated: false },
  { id: "tricep-left", name: "Tricep", side: "left", icon: "TR-L", calibrated: false },
  { id: "tricep-right", name: "Tricep", side: "right", icon: "TR-R", calibrated: false },
  { id: "quadriceps-left", name: "Quadriceps", side: "left", icon: "QU-L", calibrated: false },
  { id: "quadriceps-right", name: "Quadriceps", side: "right", icon: "QU-R", calibrated: false },
]

export default function CalibrationPage() {
  const [currentMuscleIndex, setCurrentMuscleIndex] = useState(0)
  const [calibrationStep, setCalibrationStep] = useState<"placement" | "relaxed" | "flexed" | "complete">("placement")
  const [muscles, setMuscles] = useState<MuscleGroup[]>(muscleGroups)
  const [emgValue, setEmgValue] = useState(0)
  const [voltage, setVoltage] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  // Simulate EMG data
  useEffect(() => {
    const interval = setInterval(() => {
      const baseValue = calibrationStep === "flexed" ? 600 : 200
      const randomVariation = Math.random() * 100 - 50
      const newEmgValue = Math.max(0, Math.min(1023, baseValue + randomVariation))
      setEmgValue(Math.round(newEmgValue))
      setVoltage(Number.parseFloat(((newEmgValue / 1023) * 5).toFixed(2)))
    }, 100)

    return () => clearInterval(interval)
  }, [calibrationStep])

  // Simulate Bluetooth connection
  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const currentMuscle = muscles[currentMuscleIndex]
  const progress = ((currentMuscleIndex + (calibrationStep === "complete" ? 1 : 0)) / muscles.length) * 100

  const handleRecord = () => {
    setIsRecording(true)

    setTimeout(() => {
      const updatedMuscles = [...muscles]
      if (calibrationStep === "relaxed") {
        updatedMuscles[currentMuscleIndex].relaxedValue = emgValue
        setCalibrationStep("flexed")
      } else if (calibrationStep === "flexed") {
        updatedMuscles[currentMuscleIndex].flexedValue = emgValue
        updatedMuscles[currentMuscleIndex].calibrated = true
        setCalibrationStep("complete")
      }
      setMuscles(updatedMuscles)
      setIsRecording(false)
    }, 2000)
  }

  const handleNext = () => {
    if (currentMuscleIndex < muscles.length - 1) {
      setCurrentMuscleIndex(currentMuscleIndex + 1)
      setCalibrationStep("placement")
    } else {
      // Navigate to dashboard
      window.location.href = "/dashboard"
    }
  }

  const handleBack = () => {
    if (calibrationStep === "flexed") {
      setCalibrationStep("relaxed")
    } else if (calibrationStep === "relaxed") {
      setCalibrationStep("placement")
    } else if (currentMuscleIndex > 0) {
      setCurrentMuscleIndex(currentMuscleIndex - 1)
      setCalibrationStep("complete")
    }
  }

  const getStepInstructions = () => {
    switch (calibrationStep) {
      case "placement":
        return {
          title: "Sensor Placement",
          description: `Place the EMG sensor on your ${currentMuscle.name} (${currentMuscle.side}). Follow the placement guide for optimal readings.`,
          action: "Continue",
          actionFn: () => setCalibrationStep("relaxed"),
        }
      case "relaxed":
        return {
          title: "Record Relaxed State",
          description: "Keep your muscle completely relaxed. We'll record the baseline EMG reading.",
          action: "Record Relaxed",
          actionFn: handleRecord,
        }
      case "flexed":
        return {
          title: "Record Flexed State",
          description: "Flex your muscle at maximum strength. Hold the position steady.",
          action: "Record Flexed",
          actionFn: handleRecord,
        }
      case "complete":
        return {
          title: "Calibration Complete",
          description: `${currentMuscle.name} (${currentMuscle.side}) has been successfully calibrated.`,
          action: currentMuscleIndex === muscles.length - 1 ? "Go to Dashboard" : "Next Muscle",
          actionFn: handleNext,
        }
    }
  }

  const instructions = getStepInstructions()

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Muscle Group Calibration</h1>
          <p className="text-gray-400">Set up baseline readings for accurate muscle monitoring</p>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm text-teal-400">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-800" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Current Muscle Card */}
          <motion.div
            key={currentMuscleIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{currentMuscle.icon}</span>
                    </div>
                    <div>
                      <CardTitle className="text-white">
                        {currentMuscle.name} ({currentMuscle.side})
                      </CardTitle>
                      <CardDescription>
                        Step {currentMuscleIndex + 1} of {muscles.length}
                      </CardDescription>
                    </div>
                  </div>
                  {currentMuscle.calibrated && <CheckCircle className="w-6 h-6 text-green-400" />}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Bluetooth Status */}
                <div className="flex items-center space-x-2">
                  <Bluetooth className={`w-5 h-5 ${isConnected ? "text-teal-400" : "text-gray-400"}`} />
                  <span className={`text-sm ${isConnected ? "text-teal-400" : "text-gray-400"}`}>
                    {isConnected ? "Connected" : "Connecting..."}
                  </span>
                  {isConnected && (
                    <Badge variant="secondary" className="bg-teal-900/20 text-teal-400">
                      esp32_001
                    </Badge>
                  )}
                </div>

                {/* Live EMG Reading */}
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Zap className="w-4 h-4 text-teal-400" />
                        <span className="text-sm text-gray-400">EMG Value</span>
                      </div>
                      <div className="text-3xl font-mono font-bold text-teal-300">{emgValue}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-sm text-gray-400">Voltage</span>
                      </div>
                      <div className="text-3xl font-mono font-bold text-white">{voltage}V</div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="p-4 bg-teal-900/20 border border-teal-600 rounded-lg">
                  <h3 className="text-teal-300 font-semibold mb-2">{instructions.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{instructions.description}</p>

                  {calibrationStep === "placement" && (
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>Ensure proper sensor contact with skin</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {calibrationStep !== "placement" && (currentMuscleIndex > 0 || calibrationStep !== "relaxed") && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}

                  <Button
                    onClick={instructions.actionFn}
                    disabled={!isConnected || isRecording}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {isRecording ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Recording...
                      </>
                    ) : (
                      <>
                        {instructions.action}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Muscle Groups Overview */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Calibration Overview</CardTitle>
              <CardDescription>Track your progress across all muscle groups</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {muscles.map((muscle, index) => (
                  <motion.div
                    key={muscle.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      index === currentMuscleIndex
                        ? "bg-teal-900/20 border-teal-600"
                        : muscle.calibrated
                          ? "bg-green-900/20 border-green-600"
                          : "bg-gray-900/50 border-gray-600"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{muscle.icon}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {muscle.name} ({muscle.side})
                        </div>
                        {muscle.calibrated && muscle.relaxedValue && muscle.flexedValue && (
                          <div className="text-xs text-gray-400">
                            Range: {muscle.relaxedValue} - {muscle.flexedValue}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {index === currentMuscleIndex ? (
                        <Circle className="w-5 h-5 text-teal-400" />
                      ) : muscle.calibrated ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

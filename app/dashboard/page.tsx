"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  Bluetooth,
  Clock,
  TrendingUp,
  Zap,
  Heart,
  Calendar,
  Settings,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import SensorPlacementModal from "@/components/sensor-placement-modal"

interface EMGData {
  timestamp: string
  value: number
  voltage: number
}

interface MuscleGroupData {
  id: string
  name: string
  side: "left" | "right"
  lastSession: string
  progress: number
  rating: number
  nextSession: string
  currentValue: number
  status: "optimal" | "moderate" | "fatigue"
}

const muscleGroups: MuscleGroupData[] = [
  {
    id: "bicep-left",
    name: "Bicep",
    side: "left",
    lastSession: "2 days ago",
    progress: 15,
    rating: 4.2,
    nextSession: "2 days",
    currentValue: 567,
    status: "optimal",
  },
  {
    id: "bicep-right",
    name: "Bicep",
    side: "right",
    lastSession: "3 days ago",
    progress: 8,
    rating: 3.8,
    nextSession: "1 day",
    currentValue: 423,
    status: "moderate",
  },
  {
    id: "tricep-left",
    name: "Tricep",
    side: "left",
    lastSession: "1 day ago",
    progress: 22,
    rating: 4.5,
    nextSession: "3 days",
    currentValue: 678,
    status: "optimal",
  },
  {
    id: "quadriceps-left",
    name: "Quadriceps",
    side: "left",
    lastSession: "4 days ago",
    progress: -5,
    rating: 3.2,
    nextSession: "Today",
    currentValue: 234,
    status: "fatigue",
  },
]

export default function Dashboard() {
  const [currentEMG, setCurrentEMG] = useState(567)
  const [currentVoltage, setCurrentVoltage] = useState(2.8)
  const [selectedMuscle, setSelectedMuscle] = useState("bicep-left")
  const [sessionDuration, setSessionDuration] = useState(0)
  const [emgHistory, setEmgHistory] = useState<EMGData[]>([])
  const [isConnected, setIsConnected] = useState(true)
  const [showSensorModal, setShowSensorModal] = useState(false)
  const [selectedMuscleForSensor, setSelectedMuscleForSensor] = useState<{
    id: string
    name: string
    side: "left" | "right"
  } | null>(null)

  // Simulate real-time EMG data
  useEffect(() => {
    const interval = setInterval(() => {
      const baseValue = 500
      const variation = Math.sin(Date.now() / 1000) * 100 + Math.random() * 50
      const newValue = Math.max(0, Math.min(1023, baseValue + variation))

      setCurrentEMG(Math.round(newValue))
      setCurrentVoltage(Number.parseFloat(((newValue / 1023) * 5).toFixed(2)))

      // Add to history
      const newDataPoint: EMGData = {
        timestamp: new Date().toLocaleTimeString(),
        value: Math.round(newValue),
        voltage: Number.parseFloat(((newValue / 1023) * 5).toFixed(2)),
      }

      setEmgHistory((prev: EMGData[]) => {
        const updated = [...prev, newDataPoint]
        return updated.slice(-20) // Keep last 20 points
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionDuration((prev: number) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-400 bg-green-900/20 border-green-600"
      case "moderate":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-600"
      case "fatigue":
        return "text-red-400 bg-red-900/20 border-red-600"
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-600"
    }
  }

  const currentMuscle = muscleGroups.find((m) => m.id === selectedMuscle) || muscleGroups[0]

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">EMG Dashboard</h1>
            <p className="text-gray-400">Real-time muscle activity monitoring</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Bluetooth className={`w-5 h-5 ${isConnected ? "text-teal-400" : "text-gray-400"}`} />
              <span className={`text-sm ${isConnected ? "text-teal-400" : "text-gray-400"}`}>
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
              onClick={() => (window.location.href = "/settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Real-time EMG Monitor */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-white" />
                      <span>Real-time EMG Monitor</span>
                    </CardTitle>
                    <CardDescription>
                      Live muscle activity from {currentMuscle.name} ({currentMuscle.side})
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(currentMuscle.status)}>
                    {currentMuscle.status.charAt(0).toUpperCase() + currentMuscle.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-white" />
                      <span className="text-sm text-gray-400">EMG Value</span>
                    </div>
                    <motion.div
                      key={currentEMG}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-mono font-bold text-white"
                    >
                      {currentEMG}
                    </motion.div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-sm text-gray-400">Voltage</span>
                    </div>
                    <div className="text-4xl font-mono font-bold text-white">{currentVoltage}V</div>
                  </div>
                </div>

                {/* Real-time Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={emgHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="timestamp" stroke="#9CA3AF" fontSize={12} />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#F3F4F6",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#14B8A6"
                        fill="#14B8A6"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Session Stats */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-white" />
                  <span>Active Session</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-white mb-2">
                    {formatDuration(sessionDuration)}
                  </div>
                  <p className="text-gray-400 text-sm">Session Duration</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Peak EMG:</span>
                    <span className="text-white font-semibold">789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average:</span>
                    <span className="text-white font-semibold">456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Muscle:</span>
                    <span className="text-white">{currentMuscle.name} (L)</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    // Reset session data
                    setSessionDuration(0)
                    setEmgHistory([])
                    // Show confirmation
                    alert("Session ended successfully!")
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  End Session
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-gray-400">Sessions</span>
                  </div>
                  <span className="text-white font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-white" />
                    <span className="text-gray-400">Progress</span>
                  </div>
                  <span className="text-white font-semibold">+12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-400">Alerts</span>
                  </div>
                  <span className="text-yellow-400 font-semibold">1</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Muscle Groups Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Muscle Groups Overview</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
                  onClick={() => (window.location.href = "/analytics")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {muscleGroups.map((muscle, index) => (
                  <motion.div
                    key={muscle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setSelectedMuscle(muscle.id)
                      setSelectedMuscleForSensor({
                        id: muscle.id,
                        name: muscle.name,
                        side: muscle.side,
                      })
                      setShowSensorModal(true)
                    }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                      selectedMuscle === muscle.id
                        ? "border-primary"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    <div className="text-center mb-3">
                      <Activity className="w-6 h-6 text-white mx-auto" />
                      <h3 className="text-white font-semibold mt-1">
                        {muscle.name} ({muscle.side.charAt(0).toUpperCase()})
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Session:</span>
                        <span className="text-gray-300">{muscle.lastSession}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Progress:</span>
                        <span className={muscle.progress >= 0 ? "text-green-400" : "text-red-400"}>
                          {muscle.progress >= 0 ? "+" : ""}
                          {muscle.progress}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rating:</span>
                        <span className="text-white">⭐ {muscle.rating}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next:</span>
                        <span className="text-white">{muscle.nextSession}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Current Level</span>
                        <span className="text-gray-400">{Math.round((muscle.currentValue / 1023) * 100)}%</span>
                      </div>
                      <Progress value={(muscle.currentValue / 1023) * 100} className="h-2 bg-gray-700" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Session History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-white" />
                <span>Recent Sessions</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8">
              <div className="space-y-3">
                {[
                  { date: "Today, 2:30 PM", muscle: "Bicep (Left)", duration: "15:23", quality: "Excellent" },
                  { date: "Today, 10:15 AM", muscle: "Tricep (Left)", duration: "12:45", quality: "Good" },
                  { date: "Yesterday, 6:00 PM", muscle: "Quadriceps (Left)", duration: "18:30", quality: "Fair" },
                  { date: "Yesterday, 3:45 PM", muscle: "Bicep (Right)", duration: "14:12", quality: "Good" },
                ].map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-600"
                  >
                    <div>
                      <div className="text-white font-medium">{session.muscle}</div>
                      <div className="text-gray-400 text-sm">{session.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{session.duration}</div>
                      <div
                        className={`text-sm ${
                          session.quality === "Excellent"
                            ? "text-green-400"
                            : session.quality === "Good"
                              ? "text-white"
                              : "text-yellow-400"
                        }`}
                      >
                        {session.quality}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <SensorPlacementModal
          isOpen={showSensorModal}
          onClose={() => setShowSensorModal(false)}
          muscleGroup={selectedMuscleForSensor || { id: "", name: "", side: "left" }}
        />
      </div>
    </div>
  )
}

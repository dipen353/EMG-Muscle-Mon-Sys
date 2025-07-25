"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Activity, Stethoscope, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface UserData {
  height: string
  weight: string
  age: string
  gender: string
  bmi: number
}

interface PurposeModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (purpose: string) => void
}

const PurposeModal = ({ isOpen, onClose, onSelect }: PurposeModalProps) => {
  if (!isOpen) return null

  const purposes = [
    {
      id: "athlete",
      title: "Athlete",
      description: "Track performance and muscle development",
      icon: Activity,
      color: "text-teal-400",
    },
    {
      id: "patient",
      title: "Physiotherapy Patient",
      description: "Monitor recovery and rehabilitation progress",
      icon: Stethoscope,
      color: "text-blue-400",
    },
    {
      id: "enthusiast",
      title: "Fitness Enthusiast",
      description: "General fitness and muscle training",
      icon: User,
      color: "text-green-400",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Profile Type</h2>
        <p className="text-gray-400 mb-6">Select the option that best describes your use case</p>

        <div className="space-y-3">
          {purposes.map((purpose) => {
            const IconComponent = purpose.icon
            return (
              <motion.button
                key={purpose.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(purpose.id)}
                className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-lg hover:border-teal-500 transition-all duration-300 text-left group"
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-6 h-6 ${purpose.color} group-hover:text-teal-400 transition-colors`} />
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-teal-300 transition-colors">
                      {purpose.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{purpose.description}</p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function LoginPage() {
  const [userData, setUserData] = useState<UserData>({
    height: "",
    weight: "",
    age: "",
    gender: "",
    bmi: 0,
  })
  const [showPurposeModal, setShowPurposeModal] = useState(false)
  const [selectedPurpose, setSelectedPurpose] = useState("")

  const calculateBMI = (height: string, weight: string) => {
    const h = Number.parseFloat(height) / 100 // Convert cm to meters
    const w = Number.parseFloat(weight)
    if (h > 0 && w > 0) {
      return Number.parseFloat((w / (h * h)).toFixed(1))
    }
    return 0
  }

  const handleInputChange = (field: keyof UserData, value: string) => {
    const newData = { ...userData, [field]: value }
    if (field === "height" || field === "weight") {
      newData.bmi = calculateBMI(newData.height, newData.weight)
    }
    setUserData(newData)
  }

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: "Underweight", color: "text-blue-400" }
    if (bmi < 25) return { status: "Normal", color: "text-green-400" }
    if (bmi < 30) return { status: "Overweight", color: "text-yellow-400" }
    return { status: "Obese", color: "text-red-400" }
  }

  const isFormValid = userData.height && userData.weight && userData.age && userData.gender

  const handleSubmit = () => {
    if (isFormValid) {
      setShowPurposeModal(true)
    }
  }

  const handlePurposeSelect = (purpose: string) => {
    setSelectedPurpose(purpose)
    setShowPurposeModal(false)
    // Navigate to calibration page
    window.location.href = "/calibration"
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Activity className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-white">EMG Monitor</CardTitle>
            <CardDescription className="text-gray-400">
              Welcome to your muscle strength monitoring system
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-gray-300">
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={userData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="bg-gray-900 border-gray-600 text-white focus:border-teal-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-gray-300">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={userData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="bg-gray-900 border-gray-600 text-white focus:border-teal-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-300">
                Age (years)
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={userData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="bg-gray-900 border-gray-600 text-white focus:border-teal-500"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-300">Gender</Label>
              <RadioGroup
                value={userData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" className="border-gray-600 text-teal-500" />
                  <Label htmlFor="male" className="text-gray-300">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" className="border-gray-600 text-teal-500" />
                  <Label htmlFor="female" className="text-gray-300">
                    Female
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {userData.bmi > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 bg-gray-900/50 rounded-lg border border-gray-600"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">BMI:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-teal-400">{userData.bmi}</span>
                    <div className={`text-sm ${getBMIStatus(userData.bmi).color}`}>
                      {getBMIStatus(userData.bmi).status}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white disabled:bg-gray-700 disabled:text-gray-400"
            >
              Continue to Setup
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <PurposeModal
        isOpen={showPurposeModal}
        onClose={() => setShowPurposeModal(false)}
        onSelect={handlePurposeSelect}
      />
    </div>
  )
}

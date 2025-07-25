"use client"

import { motion } from "framer-motion"
import { X, MapPin, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SensorPlacementModalProps {
  isOpen: boolean
  onClose: () => void
  muscleGroup: {
    id: string
    name: string
    side: "left" | "right"
  }
}

const placementGuides = {
  "bicep-left": {
    title: "Bicep (Left) Sensor Placement",
    description: "Position the sensor on the belly of the bicep muscle for optimal readings",
    steps: [
      "Clean the skin with alcohol wipe to remove oils and dead skin",
      "Locate the muscle belly - the thickest part of the bicep",
      "Place the sensor parallel to the muscle fibers",
      "Ensure good skin contact with the adhesive electrodes",
      "Avoid placing over tendons or bone prominences",
    ],
    tips: [
      "The sensor should be placed about 1/3 down from the shoulder",
      "Make sure the arm is relaxed during placement",
      "Test the connection by flexing the muscle gently",
    ],
    warnings: [
      "Do not place over cuts, wounds, or irritated skin",
      "Ensure the sensor is not too tight to restrict blood flow",
    ],
  },
  "bicep-right": {
    title: "Bicep (Right) Sensor Placement",
    description: "Position the sensor on the belly of the bicep muscle for optimal readings",
    steps: [
      "Clean the skin with alcohol wipe to remove oils and dead skin",
      "Locate the muscle belly - the thickest part of the bicep",
      "Place the sensor parallel to the muscle fibers",
      "Ensure good skin contact with the adhesive electrodes",
      "Avoid placing over tendons or bone prominences",
    ],
    tips: [
      "The sensor should be placed about 1/3 down from the shoulder",
      "Make sure the arm is relaxed during placement",
      "Test the connection by flexing the muscle gently",
    ],
    warnings: [
      "Do not place over cuts, wounds, or irritated skin",
      "Ensure the sensor is not too tight to restrict blood flow",
    ],
  },
  "tricep-left": {
    title: "Tricep (Left) Sensor Placement",
    description: "Position the sensor on the long head of the tricep muscle",
    steps: [
      "Clean the posterior upper arm area thoroughly",
      "Locate the long head of the tricep (back of the arm)",
      "Place the sensor vertically along the muscle fibers",
      "Ensure the sensor is centered on the muscle belly",
      "Secure with medical tape if needed",
    ],
    tips: [
      "Have the arm slightly bent to locate the muscle better",
      "The sensor should be about halfway between shoulder and elbow",
      "Ensure the person can move their arm freely",
    ],
    warnings: ["Avoid the ulnar nerve area near the elbow", "Do not place too close to the armpit"],
  },
  "tricep-right": {
    title: "Tricep (Right) Sensor Placement",
    description: "Position the sensor on the long head of the tricep muscle",
    steps: [
      "Clean the posterior upper arm area thoroughly",
      "Locate the long head of the tricep (back of the arm)",
      "Place the sensor vertically along the muscle fibers",
      "Ensure the sensor is centered on the muscle belly",
      "Secure with medical tape if needed",
    ],
    tips: [
      "Have the arm slightly bent to locate the muscle better",
      "The sensor should be about halfway between shoulder and elbow",
      "Ensure the person can move their arm freely",
    ],
    warnings: ["Avoid the ulnar nerve area near the elbow", "Do not place too close to the armpit"],
  },
  "quadriceps-left": {
    title: "Quadriceps (Left) Sensor Placement",
    description: "Position the sensor on the vastus lateralis muscle",
    steps: [
      "Clean the front-outer thigh area",
      "Locate the vastus lateralis (outer quadriceps muscle)",
      "Place the sensor about 1/3 down from the hip",
      "Align the sensor with the muscle fiber direction",
      "Ensure secure attachment for leg movement",
    ],
    tips: [
      "The muscle is most prominent when the leg is slightly bent",
      "Avoid the IT band area on the very outside of the thigh",
      "Test by having the person lift their leg slightly",
    ],
    warnings: ["Do not place over the kneecap or joint areas", "Ensure the sensor doesn't interfere with walking"],
  },
  "quadriceps-right": {
    title: "Quadriceps (Right) Sensor Placement",
    description: "Position the sensor on the vastus lateralis muscle",
    steps: [
      "Clean the front-outer thigh area",
      "Locate the vastus lateralis (outer quadriceps muscle)",
      "Place the sensor about 1/3 down from the hip",
      "Align the sensor with the muscle fiber direction",
      "Ensure secure attachment for leg movement",
    ],
    tips: [
      "The muscle is most prominent when the leg is slightly bent",
      "Avoid the IT band area on the very outside of the thigh",
      "Test by having the person lift their leg slightly",
    ],
    warnings: ["Do not place over the kneecap or joint areas", "Ensure the sensor doesn't interfere with walking"],
  },
}

export default function SensorPlacementModal({ isOpen, onClose, muscleGroup }: SensorPlacementModalProps) {
  if (!isOpen) return null

  const guide = placementGuides[muscleGroup.id as keyof typeof placementGuides]

  if (!guide) return null

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
        className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{guide.title}</h2>
            <p className="text-gray-400 mt-1">{guide.description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Placement Steps */}
          <Card className="bg-gray-900/50 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-teal-400" />
                <span>Placement Steps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {guide.steps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-300">{step}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-green-900/20 border-green-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Pro Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {guide.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300">{tip}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Warnings */}
          <Card className="bg-red-900/20 border-red-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span>Important Warnings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {guide.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300">{warning}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1 border-gray-600 text-gray-300 bg-transparent">
              Close Guide
            </Button>
            <Button onClick={onClose} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
              Sensor Placed
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

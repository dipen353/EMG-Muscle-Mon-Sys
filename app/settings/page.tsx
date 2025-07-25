"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Bluetooth, Bell, User, Shield, Download, Trash2, Save, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    sessionReminders: true,
    fatigueAlerts: true,
    progressReports: false,
    deviceConnection: true,
  })

  const [thresholds, setThresholds] = useState({
    fatigueLevel: 800,
    optimalLevel: 600,
    recoveryLevel: 200,
  })

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    userType: "athlete",
    height: "175",
    weight: "70",
    age: "25",
  })

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-8"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.history.back()}
            className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-gray-400">Customize your EMG monitoring experience</p>
          </div>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="profile" className="data-[state=active]:bg-teal-600">
              Profile
            </TabsTrigger>
            <TabsTrigger value="device" className="data-[state=active]:bg-teal-600">
              Device
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-teal-600">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="thresholds" className="data-[state=active]:bg-teal-600">
              Thresholds
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-teal-600">
              Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <User className="w-5 h-5 text-teal-400" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-gray-300">
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      value={profile.height}
                      onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-gray-300">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      value={profile.weight}
                      onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-gray-300">
                      Age
                    </Label>
                    <Input
                      id="age"
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">User Type</Label>
                  <Select
                    value={profile.userType}
                    onValueChange={(value) => setProfile({ ...profile, userType: value })}
                  >
                    <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="athlete">Athlete</SelectItem>
                      <SelectItem value="patient">Physiotherapy Patient</SelectItem>
                      <SelectItem value="enthusiast">Fitness Enthusiast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="device" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Bluetooth className="w-5 h-5 text-teal-400" />
                  <span>Device Management</span>
                </CardTitle>
                <CardDescription>Manage your Bluetooth EMG sensors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">HC-05 EMG Sensor</p>
                      <p className="text-gray-400 text-sm">Connected • esp32_001</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                    Disconnect
                  </Button>
                </div>

                <div className="space-y-4">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    <Bluetooth className="w-4 h-4 mr-2" />
                    Add New Device
                  </Button>

                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 bg-transparent">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Scan for Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-teal-400" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Session Reminders</p>
                      <p className="text-gray-400 text-sm">Get reminded about scheduled muscle training sessions</p>
                    </div>
                    <Switch
                      checked={notifications.sessionReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sessionReminders: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Fatigue Alerts</p>
                      <p className="text-gray-400 text-sm">Receive alerts when muscle fatigue is detected</p>
                    </div>
                    <Switch
                      checked={notifications.fatigueAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, fatigueAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Progress Reports</p>
                      <p className="text-gray-400 text-sm">Weekly progress summaries and achievements</p>
                    </div>
                    <Switch
                      checked={notifications.progressReports}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, progressReports: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Device Connection</p>
                      <p className="text-gray-400 text-sm">Alerts for Bluetooth connection status changes</p>
                    </div>
                    <Switch
                      checked={notifications.deviceConnection}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, deviceConnection: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="thresholds" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-teal-400" />
                  <span>EMG Thresholds</span>
                </CardTitle>
                <CardDescription>Customize EMG value thresholds for different alert levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fatigue" className="text-gray-300">
                      Fatigue Level
                    </Label>
                    <Input
                      id="fatigue"
                      type="number"
                      value={thresholds.fatigueLevel}
                      onChange={(e) => setThresholds({ ...thresholds, fatigueLevel: Number(e.target.value) })}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                    <p className="text-gray-400 text-xs">EMG value that triggers fatigue alerts</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="optimal" className="text-gray-300">
                      Optimal Level
                    </Label>
                    <Input
                      id="optimal"
                      type="number"
                      value={thresholds.optimalLevel}
                      onChange={(e) => setThresholds({ ...thresholds, optimalLevel: Number(e.target.value) })}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                    <p className="text-gray-400 text-xs">Target EMG value for optimal training</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recovery" className="text-gray-300">
                      Recovery Level
                    </Label>
                    <Input
                      id="recovery"
                      type="number"
                      value={thresholds.recoveryLevel}
                      onChange={(e) => setThresholds({ ...thresholds, recoveryLevel: Number(e.target.value) })}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                    <p className="text-gray-400 text-xs">Baseline EMG value for muscle recovery</p>
                  </div>
                </div>

                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Update Thresholds
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Download className="w-5 h-5 text-teal-400" />
                  <span>Data Management</span>
                </CardTitle>
                <CardDescription>Export, backup, or clear your EMG data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export All Data
                  </Button>

                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export Session Data
                  </Button>
                </div>

                <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Permanently delete all your EMG data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

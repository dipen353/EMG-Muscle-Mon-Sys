"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  BarChart3,
  Activity,
  Target,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// PDF generation imports
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface MuscleGroupAnalytics {
  id: string
  name: string
  side: "left" | "right"
  currentValue: number
  trend: number
  sessions: number
  avgProgress: number
  lastSession: string
  status: "improving" | "stable" | "declining"
}

const muscleGroups: MuscleGroupAnalytics[] = [
  {
    id: "bicep-left",
    name: "Bicep",
    side: "left",
    currentValue: 567,
    trend: 15.2,
    sessions: 24,
    avgProgress: 12.5,
    lastSession: "2 days ago",
    status: "improving",
  },
  {
    id: "bicep-right",
    name: "Bicep",
    side: "right",
    currentValue: 523,
    trend: 8.7,
    sessions: 22,
    avgProgress: 9.2,
    lastSession: "3 days ago",
    status: "improving",
  },
  {
    id: "tricep-left",
    name: "Tricep",
    side: "left",
    currentValue: 678,
    trend: 22.1,
    sessions: 28,
    avgProgress: 18.3,
    lastSession: "1 day ago",
    status: "improving",
  },
  {
    id: "tricep-right",
    name: "Tricep",
    side: "right",
    currentValue: 645,
    trend: 19.5,
    sessions: 26,
    avgProgress: 16.8,
    lastSession: "1 day ago",
    status: "improving",
  },
  {
    id: "hamstring-left",
    name: "Hamstring",
    side: "left",
    currentValue: 445,
    trend: -2.3,
    sessions: 18,
    avgProgress: 5.2,
    lastSession: "5 days ago",
    status: "declining",
  },
  {
    id: "hamstring-right",
    name: "Hamstring",
    side: "right",
    currentValue: 467,
    trend: 1.2,
    sessions: 19,
    avgProgress: 6.8,
    lastSession: "4 days ago",
    status: "stable",
  },
  {
    id: "calves-left",
    name: "Calves",
    side: "left",
    currentValue: 389,
    trend: 7.8,
    sessions: 15,
    avgProgress: 8.9,
    lastSession: "3 days ago",
    status: "improving",
  },
  {
    id: "calves-right",
    name: "Calves",
    side: "right",
    currentValue: 402,
    trend: 9.1,
    sessions: 16,
    avgProgress: 10.2,
    lastSession: "2 days ago",
    status: "improving",
  },
  {
    id: "glutes-left",
    name: "Glutes",
    side: "left",
    currentValue: 612,
    trend: 14.7,
    sessions: 21,
    avgProgress: 13.4,
    lastSession: "1 day ago",
    status: "improving",
  },
  {
    id: "glutes-right",
    name: "Glutes",
    side: "right",
    currentValue: 598,
    trend: 12.3,
    sessions: 20,
    avgProgress: 11.8,
    lastSession: "2 days ago",
    status: "improving",
  },
  {
    id: "traps",
    name: "Traps",
    side: "left",
    currentValue: 534,
    trend: 6.5,
    sessions: 14,
    avgProgress: 7.2,
    lastSession: "4 days ago",
    status: "stable",
  },
  {
    id: "lats-left",
    name: "Lats",
    side: "left",
    currentValue: 478,
    trend: 11.2,
    sessions: 17,
    avgProgress: 9.8,
    lastSession: "3 days ago",
    status: "improving",
  },
  {
    id: "lats-right",
    name: "Lats",
    side: "right",
    currentValue: 489,
    trend: 13.1,
    sessions: 18,
    avgProgress: 11.5,
    lastSession: "2 days ago",
    status: "improving",
  },
  {
    id: "rhomboids",
    name: "Rhomboids",
    side: "left",
    currentValue: 356,
    trend: 4.2,
    sessions: 12,
    avgProgress: 5.8,
    lastSession: "6 days ago",
    status: "stable",
  },
  {
    id: "abs",
    name: "Abs",
    side: "left",
    currentValue: 423,
    trend: 16.8,
    sessions: 25,
    avgProgress: 14.2,
    lastSession: "1 day ago",
    status: "improving",
  },
  {
    id: "pecs-left",
    name: "Pecs",
    side: "left",
    currentValue: 567,
    trend: 18.9,
    sessions: 23,
    avgProgress: 15.7,
    lastSession: "2 days ago",
    status: "improving",
  },
  {
    id: "pecs-right",
    name: "Pecs",
    side: "right",
    currentValue: 578,
    trend: 20.1,
    sessions: 24,
    avgProgress: 17.3,
    lastSession: "1 day ago",
    status: "improving",
  },
]

// Sample trend data for charts
const weeklyTrendData = [
  {
    day: "Mon",
    bicep: 420,
    tricep: 380,
    hamstring: 340,
    calves: 290,
    glutes: 450,
    traps: 320,
    lats: 390,
    abs: 260,
    pecs: 410,
  },
  {
    day: "Tue",
    bicep: 445,
    tricep: 410,
    hamstring: 355,
    calves: 310,
    glutes: 480,
    traps: 335,
    lats: 412,
    abs: 278,
    pecs: 428,
  },
  {
    day: "Wed",
    bicep: 467,
    tricep: 435,
    hamstring: 368,
    calves: 325,
    glutes: 495,
    traps: 348,
    lats: 398,
    abs: 295,
    pecs: 395,
  },
  {
    day: "Thu",
    bicep: 489,
    tricep: 458,
    hamstring: 378,
    calves: 340,
    glutes: 520,
    traps: 342,
    lats: 425,
    abs: 284,
    pecs: 442,
  },
  {
    day: "Fri",
    bicep: 512,
    tricep: 482,
    hamstring: 385,
    calves: 358,
    glutes: 545,
    traps: 356,
    lats: 407,
    abs: 301,
    pecs: 418,
  },
  {
    day: "Sat",
    bicep: 534,
    tricep: 505,
    hamstring: 392,
    calves: 375,
    glutes: 570,
    traps: 371,
    lats: 434,
    abs: 318,
    pecs: 456,
  },
  {
    day: "Sun",
    bicep: 567,
    tricep: 528,
    hamstring: 398,
    calves: 389,
    glutes: 598,
    traps: 364,
    lats: 419,
    abs: 312,
    pecs: 433,
  },
]

const muscleDistributionData = [
  { name: "Upper Body", value: 45, color: "#14B8A6" },
  { name: "Lower Body", value: 35, color: "#0D9488" },
  { name: "Core", value: 20, color: "#0F766E" },
]

const monthlyProgressData = [
  { month: "Jan", progress: 5.2 },
  { month: "Feb", progress: 8.1 },
  { month: "Mar", progress: 12.4 },
  { month: "Apr", progress: 15.7 },
  { month: "May", progress: 18.9 },
  { month: "Jun", progress: 22.3 },
]

export default function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("all")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "improving":
        return "text-green-400 bg-green-900/20 border-green-600"
      case "stable":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-600"
      case "declining":
        return "text-red-400 bg-red-900/20 border-red-600"
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-600"
    }
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-400" />
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-400" />
    return <Activity className="w-4 h-4 text-yellow-400" />
  }

  const generatePDFReport = async () => {
    if (!contentRef.current) return

    setIsGeneratingPDF(true)

    try {
      // Create a new jsPDF instance
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Add title
      pdf.setFontSize(20)
      pdf.setTextColor(20, 184, 166) // Teal color
      pdf.text("EMG Analytics Report", 20, 25)

      // Add date
      pdf.setFontSize(12)
      pdf.setTextColor(100, 100, 100)
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35)

      // Add summary statistics
      pdf.setFontSize(16)
      pdf.setTextColor(0, 0, 0)
      pdf.text("Summary Statistics", 20, 50)

      pdf.setFontSize(12)
      const totalSessions = muscleGroups.reduce((sum, muscle) => sum + muscle.sessions, 0)
      const avgProgress = muscleGroups.reduce((sum, muscle) => sum + muscle.avgProgress, 0) / muscleGroups.length
      const improvingMuscles = muscleGroups.filter((m) => m.status === "improving").length

      pdf.text(`Total Sessions: ${totalSessions}`, 20, 65)
      pdf.text(`Average Progress: +${avgProgress.toFixed(1)}%`, 20, 75)
      pdf.text(`Improving Muscle Groups: ${improvingMuscles}/${muscleGroups.length}`, 20, 85)
      pdf.text(`Active Muscle Groups: ${muscleGroups.length}`, 20, 95)

      // Capture charts and add them to PDF
      const charts = contentRef.current.querySelectorAll(".recharts-wrapper")
      let yPosition = 110

      for (let i = 0; i < Math.min(charts.length, 3); i++) {
        const chart = charts[i] as HTMLElement
        if (chart) {
          try {
            const canvas = await html2canvas(chart, {
              backgroundColor: "#1F2937",
              scale: 2,
              logging: false,
            })

            const imgData = canvas.toDataURL("image/png")
            const imgWidth = 170
            const imgHeight = (canvas.height * imgWidth) / canvas.width

            if (yPosition + imgHeight > pageHeight - 20) {
              pdf.addPage()
              yPosition = 20
            }

            pdf.addImage(imgData, "PNG", 20, yPosition, imgWidth, imgHeight)
            yPosition += imgHeight + 15
          } catch (error) {
            console.error("Error capturing chart:", error)
          }
        }
      }

      // Add muscle groups data table
      if (yPosition + 100 > pageHeight - 20) {
        pdf.addPage()
        yPosition = 20
      }

      pdf.setFontSize(16)
      pdf.setTextColor(0, 0, 0)
      pdf.text("Muscle Groups Performance", 20, yPosition)
      yPosition += 15

      // Table headers
      pdf.setFontSize(10)
      pdf.setTextColor(100, 100, 100)
      pdf.text("Muscle Group", 20, yPosition)
      pdf.text("Current EMG", 70, yPosition)
      pdf.text("Trend", 110, yPosition)
      pdf.text("Sessions", 140, yPosition)
      pdf.text("Status", 170, yPosition)
      yPosition += 10

      // Table data
      pdf.setTextColor(0, 0, 0)
      muscleGroups.slice(0, 15).forEach((muscle) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage()
          yPosition = 20
        }

        pdf.text(`${muscle.name} (${muscle.side.charAt(0).toUpperCase()})`, 20, yPosition)
        pdf.text(muscle.currentValue.toString(), 70, yPosition)
        pdf.text(`${muscle.trend >= 0 ? "+" : ""}${muscle.trend}%`, 110, yPosition)
        pdf.text(muscle.sessions.toString(), 140, yPosition)
        pdf.text(muscle.status, 170, yPosition)
        yPosition += 8
      })

      // Add footer
      const totalPages = pdf.internal.pages.length - 1
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.setTextColor(150, 150, 150)
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 30, pageHeight - 10)
        pdf.text("EMG Muscle Monitoring System", 20, pageHeight - 10)
      }

      // Save the PDF
      pdf.save(`EMG_Analytics_Report_${new Date().toISOString().split("T")[0]}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF report. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto" ref={contentRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center space-x-4">
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
              <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-gray-400">Comprehensive muscle performance analysis</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32 bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={generatePDFReport}
              disabled={isGeneratingPDF}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isGeneratingPDF ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>

            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Sessions</p>
                  <p className="text-2xl font-bold text-white">342</p>
                </div>
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Progress</p>
                  <p className="text-2xl font-bold text-white">+15.2%</p>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">Excellent improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Muscles</p>
                  <p className="text-2xl font-bold text-white">17</p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <Target className="w-4 h-4 text-blue-400 mr-1" />
                <span className="text-blue-400 text-sm">Full body coverage</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Peak EMG</p>
                  <p className="text-2xl font-bold text-white">789</p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-purple-400 mr-1" />
                <span className="text-purple-400 text-sm">Personal best</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Analytics Content */}
        <Tabs defaultValue="trends" className="space-y-8">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="trends" className="data-[state=active]:bg-teal-600">
              Muscle Trends
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-teal-600">
              Group Comparison
            </TabsTrigger>
            <TabsTrigger value="distribution" className="data-[state=active]:bg-teal-600">
              Distribution
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-teal-600">
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-8">
            {/* Weekly Trends Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Weekly Muscle Activity Trends</CardTitle>
                <CardDescription>EMG values over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#F3F4F6",
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="bicep" stroke="#14B8A6" strokeWidth={3} name="Bicep" />
                      <Line type="monotone" dataKey="tricep" stroke="#0D9488" strokeWidth={3} name="Tricep" />
                      <Line type="monotone" dataKey="hamstring" stroke="#0F766E" strokeWidth={3} name="Hamstring" />
                      <Line type="monotone" dataKey="calves" stroke="#134E4A" strokeWidth={3} name="Calves" />
                      <Line type="monotone" dataKey="glutes" stroke="#065F46" strokeWidth={3} name="Glutes" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Individual Muscle Group Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {muscleGroups.map((muscle, index) => (
                <motion.div
                  key={muscle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-gray-800 border-gray-700 hover:border-teal-600 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white text-lg">
                            {muscle.name} ({muscle.side.charAt(0).toUpperCase()})
                          </CardTitle>
                          <CardDescription>{muscle.lastSession}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(muscle.status)} variant="outline">
                          {muscle.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Current EMG</span>
                        <span className="text-2xl font-bold text-teal-300">{muscle.currentValue}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Trend</span>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(muscle.trend)}
                          <span
                            className={`font-semibold ${
                              muscle.trend > 0
                                ? "text-green-400"
                                : muscle.trend < 0
                                  ? "text-red-400"
                                  : "text-yellow-400"
                            }`}
                          >
                            {muscle.trend > 0 ? "+" : ""}
                            {muscle.trend}%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Sessions</span>
                        <span className="text-white font-semibold">{muscle.sessions}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Avg Progress</span>
                        <span className="text-teal-400 font-semibold">+{muscle.avgProgress}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Muscle Group Comparison</CardTitle>
                <CardDescription>Compare performance across different muscle groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#F3F4F6",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="bicep" fill="#14B8A6" name="Bicep" />
                      <Bar dataKey="tricep" fill="#0D9488" name="Tricep" />
                      <Bar dataKey="hamstring" fill="#0F766E" name="Hamstring" />
                      <Bar dataKey="calves" fill="#134E4A" name="Calves" />
                      <Bar dataKey="glutes" fill="#065F46" name="Glutes" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Muscle Group Distribution</CardTitle>
                  <CardDescription>Training focus by body region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={muscleDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {muscleDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            color: "#F3F4F6",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {muscleDistributionData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-gray-300">{item.name}</span>
                        </div>
                        <span className="text-white font-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Monthly Progress Trend</CardTitle>
                  <CardDescription>Overall improvement over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyProgressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            color: "#F3F4F6",
                          }}
                        />
                        <Area type="monotone" dataKey="progress" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
                <CardDescription>Detailed performance analysis by muscle group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="pb-3 text-gray-400 font-medium">Muscle Group</th>
                        <th className="pb-3 text-gray-400 font-medium">Current EMG</th>
                        <th className="pb-3 text-gray-400 font-medium">Peak Value</th>
                        <th className="pb-3 text-gray-400 font-medium">Sessions</th>
                        <th className="pb-3 text-gray-400 font-medium">Trend</th>
                        <th className="pb-3 text-gray-400 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      {muscleGroups.map((muscle, index) => (
                        <tr key={muscle.id} className="border-b border-gray-800">
                          <td className="py-3 text-white font-medium">
                            {muscle.name} ({muscle.side.charAt(0).toUpperCase()})
                          </td>
                          <td className="py-3 text-teal-300 font-mono">{muscle.currentValue}</td>
                          <td className="py-3 text-gray-300">{Math.round(muscle.currentValue * 1.2)}</td>
                          <td className="py-3 text-gray-300">{muscle.sessions}</td>
                          <td className="py-3">
                            <div className="flex items-center space-x-1">
                              {getTrendIcon(muscle.trend)}
                              <span
                                className={`font-semibold ${
                                  muscle.trend > 0
                                    ? "text-green-400"
                                    : muscle.trend < 0
                                      ? "text-red-400"
                                      : "text-yellow-400"
                                }`}
                              >
                                {muscle.trend > 0 ? "+" : ""}
                                {muscle.trend}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3">
                            <Badge className={getStatusColor(muscle.status)} variant="outline">
                              {muscle.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

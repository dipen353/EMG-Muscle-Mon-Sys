import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EMG Muscle Monitor - Real-time Muscle Activity Tracking",
  description:
    "Advanced EMG muscle strength monitoring system with Arduino sensors, Bluetooth connectivity, and comprehensive analytics for athletes, patients, and fitness enthusiasts.",
  keywords: "EMG, muscle monitoring, Arduino, Bluetooth, fitness, physiotherapy, muscle strength",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>{children}</body>
    </html>
  )
}

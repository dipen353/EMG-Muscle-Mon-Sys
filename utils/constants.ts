export const MUSCLE_GROUPS = [
  { id: "bicep-left", name: "Bicep", side: "left", icon: "BI-L" },
  { id: "bicep-right", name: "Bicep", side: "right", icon: "BI-R" },
  { id: "tricep-left", name: "Tricep", side: "left", icon: "TR-L" },
  { id: "tricep-right", name: "Tricep", side: "right", icon: "TR-R" },
  { id: "quadriceps-left", name: "Quadriceps", side: "left", icon: "QU-L" },
  { id: "quadriceps-right", name: "Quadriceps", side: "right", icon: "QU-R" },
  { id: "hamstring-left", name: "Hamstring", side: "left", icon: "HA-L" },
  { id: "hamstring-right", name: "Hamstring", side: "right", icon: "HA-R" },
  { id: "calves-left", name: "Calves", side: "left", icon: "CA-L" },
  { id: "calves-right", name: "Calves", side: "right", icon: "CA-R" },
  { id: "glutes-left", name: "Glutes", side: "left", icon: "GL-L" },
  { id: "glutes-right", name: "Glutes", side: "right", icon: "GL-R" },
  { id: "traps", name: "Traps", side: "left", icon: "TR" },
  { id: "lats-left", name: "Lats", side: "left", icon: "LA-L" },
  { id: "lats-right", name: "Lats", side: "right", icon: "LA-R" },
  { id: "rhomboids", name: "Rhomboids", side: "left", icon: "RH" },
  { id: "abs", name: "Abs", side: "left", icon: "AB" },
  { id: "pecs-left", name: "Pecs", side: "left", icon: "PE-L" },
  { id: "pecs-right", name: "Pecs", side: "right", icon: "PE-R" },
] as const

export const USER_TYPES = {
  ATHLETE: "athlete",
  PATIENT: "patient",
  ENTHUSIAST: "enthusiast",
} as const

export const EMG_THRESHOLDS = {
  [USER_TYPES.ATHLETE]: {
    fatigue: 800,
    optimal: 600,
    recovery: 200,
  },
  [USER_TYPES.PATIENT]: {
    fatigue: 600,
    optimal: 400,
    recovery: 150,
  },
  [USER_TYPES.ENTHUSIAST]: {
    fatigue: 700,
    optimal: 500,
    recovery: 175,
  },
} as const

export const BLUETOOTH_CONFIG = {
  SERVICE_UUID: "00001101-0000-1000-8000-00805f9b34fb",
  CHARACTERISTIC_UUID: "00001101-0000-1000-8000-00805f9b34fb",
  DEVICE_NAME: "HC-05",
  SAMPLE_RATE: 100, // Hz
} as const

export const CHART_COLORS = {
  primary: "#14B8A6",
  secondary: "#0D9488",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
} as const

export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const

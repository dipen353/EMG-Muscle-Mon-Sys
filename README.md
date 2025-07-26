Wearable Muscle Strength Monitoring System

A smart biomedical device that monitors muscle activation levels in real-time using Arduino Uno and an EMG sensor, with live feedback via a custom mobile app.


Project Aim
To develop a wearable muscle strength monitor that:
- Measures EMG signals from muscle activity
- Sends real-time data to a phone via Bluetooth
- Displays muscle activation with live graphing and alerts
- Logs user data for long-term progress tracking


Hardware Components
- Arduino Uno
- MyoWare EMG Sensor (not used during initial stages)
- HC-05 Bluetooth Module
- Breadboard and Jumper Wires
- Buzzer (for fatigue alerts)
- Power Supply (USB or 9V battery)
- Smartphone


App Features

User Login
- Collects height, weight, age, and BMI
- Two modes: **Patient** (rehab) and **Athlete** (training)

First-time Setup
- Calibrates muscle groups (biceps, triceps, quads, etc.)
- Stores relaxed vs flexed EMG data for each

Dashboard
- Real-time graph of active session
- Alerts on overstrain based on EMG thresholds
- Weekly reminders to track growth
- Progress graph over time


Biomedical System Overview
- Brain sends signals → motor neurons fire → muscles contract
- This creates electrical potentials detected by EMG sensor


Electronics Workflow
1. EMG signals picked up by MyoWare sensor
2. Signal filtered and amplified
3. Arduino reads analog voltage via ADC
4. Data sent via HC-05 Bluetooth module
5. Mobile app receives and displays graph


Use Cases
- **Patients**: Track muscle recovery, detect early degeneration
- **Athletes**: Optimize workouts, prevent overtraining

Project Roadmap
1. App UI/UX Design (Figma + Frontend)
2. Sensor simulation with dummy data
3. Arduino + HC-05 Bluetooth testing
4. EMG learning & integration (final stage)
5. Hardware-software integration
6. Breadboard prototype → PCB design

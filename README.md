#  Arogya – Doctor Appointment Platform

**A full-stack healthcare platform for booking doctor appointments, managing availability, and enabling seamless patient-doctor interaction.**

 Live: https://arogya-doctors-appointment.vercel.app

---

##  Overview

Arogya is a modern healthcare web application that allows:

*  Patients to find and book doctors
*  Doctors to manage availability and appointments
*  Admins to verify and manage doctors

The platform is designed with a **real-world multi-role architecture**, similar to platforms like Practo.

---

##  Core Features

###  Patient Features

*  Browse doctors by specialization
*  Book appointments with time slots
*  View doctor profiles and availability
*  Access medical history & records

---

###  Doctor Features

*  Manage daily availability
*  View upcoming appointments
*  Mark appointments as completed
*  Add notes for patients
*  **Real-time video consultation using Vonage API**

---

###  Admin Features

*  Verify doctor applications
*  Manage all doctors
*  Suspend or activate doctors
*  Monitor platform activity

---

##  Authentication & Authorization

*  Secure authentication using **Clerk**
*  Social login support (Google, etc.)
*  Session management handled by Clerk
*  Role-based access control:

  * Patient
  * Doctor
  * Admin
*  Protected routes for dashboards and sensitive actions

---

##  Video Consultation System

* Integrated **Vonage Video API (WebRTC-based)**
* Real-time doctor-patient video sessions
*  Video call enabled **30 minutes before scheduled appointment**
*  Secure session-based video rooms
*  Low-latency communication for smooth experience

---

## ⚙️ System Architecture

###  Workflow

1. User signs in via **Clerk authentication**
2. Patient browses doctors by specialization
3. Doctor sets availability (time slots)
4. Patient books appointment
5. System schedules session + prepares video room
6. Doctor & patient join via **Vonage video call**
7. Doctor completes consultation & adds notes
8. System maintains full appointment lifecycle

---

##  Key Functional Modules

*  **Appointment Scheduling System**

  * Dynamic time slot selection
  * Conflict-free booking

*  **Availability Management**

  * Doctors define working hours
  * Applied across all booking days

*  **Dashboard Systems**

  * Admin Dashboard
  * Doctor Dashboard
  * Patient Flow

*  **Video Consultation Engine**

  * Powered by **Vonage API**
  * Time-based activation
  * Secure session handling

---

##  Tech Stack

###  Frontend + Backend

* Next.js (Full Stack)
* React.js
* Tailwind CSS

###  Authentication

* Clerk (Auth + Session Management + OAuth)

###  Video Communication

* Vonage Video API (WebRTC)

###  Deployment

* Vercel (Frontend + Backend)

---

##  Deployment

| Component | Platform |
| --------- | -------- |
| App       | Vercel   |

---

##  Timeline

*  Developed as a full-stack real-world system
*  Deployed on Vercel

---

##  Challenges Solved

*  Designing multi-role architecture (Admin / Doctor / Patient)
*  Building conflict-free appointment system
*  Managing real-time availability logic
*  Implementing secure authentication with Clerk
*  Integrating real-time video calling using Vonage API
*  Structuring scalable dashboards
*  Creating real-world healthcare workflow

---

##  Future Improvements

*  Real-time chat between doctor & patient
*  Payment integration for consultations
*  Advanced analytics dashboard
*  Mobile app version
*  AI-based doctor recommendation system

---

##  Author

**Ankit Singh Chouhan**
Full Stack Developer

---

##  Why This Project Matters

This project demonstrates:

*  Real-world system design
*  Multi-role architecture
*  Full-stack development (Next.js)
*  Real-time communication (WebRTC – Vonage)
*  Secure authentication (Clerk)
*  Production deployment

---

##  Support

If you like this project, consider giving it a ⭐ on GitHub!
It motivates and helps in building more impactful projects 

---

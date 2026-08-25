# NIRVAN '26 — Technical Fest Platform

> **Where Ideas Become Innovation**

A campus-connected digital experience created for **NIRVAN '26 at Graphic Era Hill University, Haldwani**.

🌐 **Live Website:** https://nirwana-193.vercel.app/

---

## 📌 About Our Model

NIRVAN '26 is designed to be more than a conventional technical-fest website.

Our model focuses on creating a digital experience where students can **discover NIRVAN, understand the events, explore previous experiences, connect with the campus, and then register**.

Instead of immediately showing users a registration button, the platform first helps them understand:

- What NIRVAN is
- What they can experience
- Why they should participate
- What previous editions looked like
- How they can become part of the event

The core idea is to combine **creativity, authenticity, and usability** into one experience.

---

## 🏗️ System Architecture

The platform follows a user-focused architecture where the website acts as the central interaction layer between students and the NIRVAN experience.

```text
                         ┌─────────────────────┐
                         │       STUDENT       │
                         │   Existing / New    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    NIRVAN '26 UI   │
                         │   Web Application   │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌─────────────┐       ┌─────────────┐      ┌─────────────┐
       │    Login    │       │    Events   │      │  Experience │
       │ / Register  │       │ & Highlights│      │  & Campus   │
       └──────┬──────┘       └──────┬──────┘      └──────┬──────┘
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Student Journey   │
                         │ Discover → Explore  │
                         │ → Understand → Join │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Registration    │
                         └─────────────────────┘
```

### Architecture Flow

1. **Student enters the platform**
2. **NIRVAN experience introduces the fest**
3. **Student explores events and information**
4. **Previous-event memories provide context**
5. **Campus visuals create authenticity**
6. **The platform communicates the value of participation**
7. **Student proceeds to login/registration**

> **Note:** The project highlights provided for this project describe the product experience and functionality but do not specify the complete underlying backend/database architecture. Therefore, this README does not invent technical components that are not documented.

---

## 🛠️ Tech Stack

### Frontend

- **TypeScript / TSX** — Used for building the interactive frontend components and application logic.
- **HTML** — Used for the structure and semantic content of the website.
- **CSS** — Used for styling, layouts, animations, responsiveness, and the overall visual design.

### Authentication

- **ERP-based login experience**
- Existing students can use their ERP credentials.
- New users can register using their original credentials.

### Deployment

- **Vercel** — Used to deploy and host the live website.

### Technologies at a Glance

| Technology | Purpose |
|---|---|
| TypeScript / TSX | Interactive frontend components and application logic |
| HTML | Website structure and content |
| CSS | Styling, layout, animations, and responsive design |
| ERP Authentication | Student login and registration |
| Vercel | Deployment and hosting |


> **Note:** The provided project documentation does not list the exact frontend framework, programming language, database, or backend services. These should be added here from the actual repository implementation rather than being guessed.

---

## ✨ Key Features

### 🔐 ERP-Based Login

Existing students can directly log in using their ERP credentials, making the experience more connected to the college ecosystem.

New users can register using their original credentials.

---

### 🏫 Campus-Based Experience

The website includes an **animated video of the campus** as part of the interface.

This creates a stronger connection between:

**Digital Platform ↔ Actual Campus ↔ NIRVAN Experience**

Instead of relying only on generic festival visuals, the platform represents the actual environment where NIRVAN takes place.

---

### 🎯 Purpose-Driven Registration

The website does not simply present a **"Register Now"** button.

Before registration, users are given reasons to participate and information about what they can gain from the experience.

The idea is:

```text
Understand the Value
        ↓
Build Interest
        ↓
Explore NIRVAN
        ↓
Register
```

---

### 📸 Previous Event Memories

Previous NIRVAN editions are included to help students who have never experienced the event before.

These memories allow new users to understand:

- Previous events
- The atmosphere
- What participation looks like
- What they can expect from NIRVAN

---

### 🧭 User-Focused Journey

The platform is designed around a natural user journey:

```text
Discover NIRVAN
       ↓
Understand the Fest
       ↓
Explore Events
       ↓
View Previous Memories
       ↓
Experience the Campus
       ↓
Understand Why to Participate
       ↓
Register
```

---

### ✨ Purposeful UI & Interactions

Animations and interactions are not added only for visual appeal.

They are used to:

- Improve engagement
- Guide user attention
- Make information easier to explore
- Create a more interactive experience

---

## 🔄 How Our Model Works

The platform follows a simple principle:

> **Don't ask users to register before helping them understand why they should participate.**

### Step 1 — Discover

The user enters the NIRVAN platform and gets introduced to the event.

### Step 2 — Understand

The platform explains what NIRVAN is and what the experience offers.

### Step 3 — Explore

Users can explore events, information, and previous NIRVAN memories.

### Step 4 — Connect

The campus-based visuals create a stronger connection between the website and the real-world event.

### Step 5 — Decide

Users understand why participating can be valuable.

### Step 6 — Register

After understanding the experience, users can proceed toward registration/login.

---

# 🚀 Why Our Model Is Unique

Our uniqueness does not depend on one individual feature.

It comes from the **combination of multiple experiences in one platform**.

### 1. Real Campus Connection

Instead of using only generic event graphics, the platform uses an animated representation of the actual campus.

### 2. Connected Authentication

ERP-based login makes the platform feel connected to the existing college ecosystem.

### 3. Experience Before Registration

The platform explains the value of participation before asking users to register.

### 4. Previous Memories for New Users

Students who have never attended NIRVAN can understand the atmosphere through previous-event memories.

### 5. User Journey Instead of Information Dump

The website guides users through a sequence instead of displaying all information at once.

### 6. Purposeful Interactions

Animations are used to improve the experience and guide attention, rather than being added only as decoration.

---

## 🆚 What Makes Our Approach Different?

A conventional event website can follow:

```text
Information
     ↓
Events
     ↓
Register
```

Our approach focuses on:

```text
                    ┌───────────────┐
                    │    Connect    │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   Understand  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │    Explore    │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │    Experience │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   Participate │
                    └───────────────┘
```

The goal is not simply:

> **"Get students to register."**

The goal is:

> **"Help students connect with NIRVAN so they want to participate."**

---

## 💡 Our Core Idea

### Creativity + Authenticity + Usability

We wanted to build more than a technical-fest information website.

Our goal was to create a platform that helps users:

**Understand → Explore → Experience → Connect → Participate**

This makes the website an experience around NIRVAN rather than just a collection of event details.

---

## 📊 Project Highlights

| Area | Our Approach |
|---|---|
| Authentication | ERP-based login experience |
| Campus Identity | Animated campus video |
| Engagement | Interactive UI and animations |
| Information | Clear explanation of NIRVAN |
| Previous Events | Memories and highlights |
| Registration | Value explained before registration |
| UX | Guided user journey |
| Overall Goal | Help users connect with NIRVAN |

---

## 🌐 Live Demo

**NIRVAN '26**

https://nirwana-193.vercel.app/

---

## 🎯 Project Goal

The objective of NIRVAN '26 is not simply to build a website for a technical fest.

We wanted to create a digital experience that helps students **understand, explore, and connect with NIRVAN before registering**.

The platform combines:

- Authentic campus identity
- Student-focused information
- Interactive design
- Previous-event experiences
- Connected authentication
- A smooth registration journey

---

## 👥 Team

### NIRVAN '26 Project Team

A collaborative project focused on building a more engaging and campus-connected digital experience for NIRVAN '26.

> **NIRVAN '26 — Where Ideas Become Innovation**

---

## 📄 Project Documentation

The project highlights focus on the combination of ERP login, campus-based visuals, previous-event memories, clear reasons to participate, and a smooth user journey as the core differentiators of the platform.

---

## 📜 License

This project is created for the **NIRVAN '26 technical fest project at Graphic Era Hill University, Haldwani**.

---

<div align="center">

### NIRVAN '26

**Where Ideas Become Innovation**

🌐 https://nirwana-193.vercel.app/

## 👥 Team

### Tech4All

A collaborative team focused on building a more engaging and campus-connected digital experience for NIRVAN '26.

> **NIRVAN '26 — Where Ideas Become Innovation**

</div>

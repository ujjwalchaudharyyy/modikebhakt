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
OUR HEIGHLITED FEATURES :-
1) <img width="1090" height="882" alt="image" src="https://github.com/user-attachments/assets/b123c0b7-2134-401c-b770-f41a04114fc3" />
~ help desk 
2) <img width="712" height="282" alt="image" src="https://github.com/user-attachments/assets/5e3c58b5-1788-42d3-b7a5-2a705d8b0798" />
~ timer for closing upcomig event registration .
3) introduction of nirwan .
<img width="1107" height="657" alt="image" src="https://github.com/user-attachments/assets/2e21d9c4-bad8-4f22-9ff5-a911f83f4b2e" />
<img width="1106" height="892" alt="image" src="https://github.com/user-attachments/assets/d37de6a9-8c03-4460-868b-36383a9cf8b2" />
4) 4 pillar of nirwan 
<img width="1125" height="907" alt="image" src="https://github.com/user-attachments/assets/98c4079d-218d-42c8-9371-daf4bd5ea471" />
5)## Event Filtering System
 <img width="1127" height="915" alt="image" src="https://github.com/user-attachments/assets/4ca13c59-aac1-4912-8a07-c1d976815d36" />


The platform provides a category-based filtering system that allows users to easily find events according to their interests. Instead of displaying every event together, events are divided into different arenas such as Hackathons, Gaming, Cybersecurity/CTF, and Treasure Hunt.

### Available Filters

#### 1. All Arenas

The **All Arenas** filter displays all available events on the platform, regardless of their category.

For example, when the user selects **All Arenas**, events from Hackathons, Gaming, Cybersecurity/CTF, and Treasure Hunt are displayed together.

#### 2. Hackathons

The **Hackathons** filter displays only hackathon-related events.

Users can use this filter when they are specifically looking for coding competitions, software development challenges, innovation-based competitions, or 24-hour hackathons.

Example:

* Coding Hackathon
* AI/ML Hackathon
* Web Development Hackathon
* Innovation Challenge

#### 3. Workshops

A separate **Workshops** category can be used to display only learning and training-based events.

This filter is useful for users who want to attend technical sessions, hands-on training, seminars, or skill-development workshops without viewing competitive events.

Example:

* AI/ML Workshop
* Web Development Workshop
* Cybersecurity Workshop
* Programming Workshop

#### 4. Gaming / E-Sports

The **Gaming / E-Sports** filter displays only gaming-related competitions.

Users can select this category to find LAN tournaments, multiplayer gaming competitions, and other E-Sports events.

Example:

* LAN Tournament
* Valorant Tournament
* BGMI Tournament
* Other E-Sports Competitions

#### 5. Cybersecurity / CTF

The **Cybersecurity / CTF** filter displays events related to cybersecurity and Capture The Flag competitions.

This category is useful for participants interested in ethical hacking, penetration testing, digital security, and cybersecurity challenges.

Example:

* Capture The Flag (CTF)
* Cybersecurity Challenge
* Penetration Testing Competition
* Ethical Hacking Event

#### 6. Treasure Hunt

The **Treasure Hunt** filter displays only treasure-hunt and clue-solving based events.

These events can involve physical locations, puzzles, QR codes, AR-based clues, and logical challenges.

Example:

* AR Treasure Hunt
* Campus Treasure Hunt
* QR Code Hunt
* Puzzle Challenge

### How the Filtering Works

When a user selects a category, the system checks the **category/type of every event** and displays only the events matching the selected filter.

For example:

```text
User selects → Hackathons

System checks:
Event 1 → Hackathon → SHOW
Event 2 → Gaming → HIDE
Event 3 → CTF → HIDE
Event 4 → Treasure Hunt → HIDE
Event 5 → Hackathon → SHOW
```

Similarly, if the user selects **Gaming / E-Sports**, only gaming events are displayed.

### Search + Filter

The page also provides a **search bar** that allows users to search events by:

* Event title
* Track
* Venue
* Skills
* Technology
* Event category

The search and category filter can work together. For example, a user can select **Hackathons** and then search for **AI**, so the system displays only hackathons related to AI.

### Sorting

The page also contains a sorting option such as **Highest Prize Pool**. This allows users to arrange the displayed events according to the prize amount.

Therefore, the event discovery system provides three main ways to find events:

1. **Category Filtering** – Find events according to their type.
2. **Search** – Find events using keywords.
3. **Sorting** – Arrange events according to criteria such as prize pool.

### Event-Specific Separation

The system keeps different event categories logically separated:

| Category            | Purpose                                      |
| ------------------- | -------------------------------------------- |
| Hackathon           | Coding and innovation competitions           |
| Workshop            | Learning and skill-development sessions      |
| Gaming / E-Sports   | Gaming and LAN tournaments                   |
| Cybersecurity / CTF | Cybersecurity and ethical-hacking challenges |
| Treasure Hunt       | Puzzle, clue and AR-based activities         |
| All Arenas          | Displays all event categories                |

This makes the platform easier to navigate and helps users quickly discover the type of event they are interested in.
6) theme change ( dark mode and light mode ) 
<img width="1127" height="905" alt="image" src="https://github.com/user-attachments/assets/ccdb6d2f-03b4-4804-9e87-828bcab29780" />
7) ## 48-Hour Event Chronology / Schedule
<img width="1122" height="900" alt="image" src="https://github.com/user-attachments/assets/50bb3a6f-d80a-4a54-a68a-18b6a8f6434d" />


The **Event Chronology** page provides a complete time-based schedule of all events taking place during the 48-hour fest. It helps participants understand **which event is happening, on which day, at what time, at which venue, and under which track**.

The schedule is presented in a **timeline format**, making it easy for users to follow the complete event flow.

### 1. Day-Based Schedule

The schedule is divided into different days.

Currently, the interface provides:

* **Day 01 – 12 October 2026**
* **Day 02 – 13 October 2026**

Users can switch between the days to view the events scheduled for that particular date.

For example:

```text
DAY 01
12 OCT 2026
        ↓
Events scheduled on Day 01

DAY 02
13 OCT 2026
        ↓
Events scheduled on Day 02
```

This prevents all 48 hours of events from being displayed together and makes the schedule easier to understand.

### 2. Track-Based Filtering

Along with the day selection, the page provides a **track filter**.

Available tracks include:

* **All Tracks**
* **Hackathon**
* **Gaming**
* **Cyber**
* **Workshop**
* **Ceremony**

The user can select a specific track to view only the events belonging to that category.

For example:

```text
User selects → HACKATHON

System checks all scheduled events:

Opening Ceremony → Ceremony → HIDE
Hackathon Kickoff → Hackathon → SHOW
Gaming Tournament → Gaming → HIDE
Cybersecurity CTF → Cyber → HIDE
Workshop → Workshop → HIDE
```

This makes it easier for participants to follow only the events relevant to them.

### 3. Timeline-Based Event Display

Every event is displayed as a timeline card.

Each card contains important information such as:

* Event time
* Venue
* Event title
* Event description
* Speaker / organizer
* Event track
* Additional event tags
* Add to Calendar option

The vertical timeline visually represents the chronological order of events.

### 4. Event Time

Each event clearly displays its starting and ending time.

For example:

**09:00 AM – 10:00 AM**

This allows participants to quickly understand the duration of an event and plan their schedule accordingly.

### 5. Venue Information

Every scheduled event contains its venue/location.

For example:

**Main Auditorium (Ground Floor)**

This helps participants know exactly where they need to go for a particular event.

### 6. Event Details

The schedule provides a short description of every event.

For example, the **Grand Inauguration & Opening Ceremony** includes details about the lamp lighting, welcome address, unveiling of trophies, and the fest keynote.

This allows users to understand what will happen during an event without opening a separate page.

### 7. Speaker Information

If an event has a speaker or special guest, the schedule displays the speaker information.

Example:

**Speaker: Dr. Aarav Sharma & University Leadership**

This is particularly useful for workshops, seminars, inauguration ceremonies, and expert sessions.

### 8. Event Tags

Special labels can be attached to important events.

For example:

**FLAGSHIP STAGE**

Such tags help users identify important or major events quickly.

### 9. Add to Calendar

The **Add to Calendar** button allows participants to save an event to their personal calendar.

This helps users avoid missing important events and manage their personal schedule during the fest.

### 10. Combined Day + Track Filtering

The most important feature of this page is that **Day Selection and Track Filtering can work together**.

For example:

```text
Selected Day → Day 01
Selected Track → Hackathon

Result:
Only Hackathon events scheduled on Day 01
are displayed in chronological order.
```

Similarly:

```text
Selected Day → Day 02
Selected Track → Gaming

Result:
Only Gaming events scheduled on Day 02
are displayed.
```

### Overall Working

The schedule system follows this flow:

```text
                 EVENT DATABASE
                       ↓
              Select Event Day
                       ↓
             Select Event Track
                       ↓
              Filter Events
                       ↓
          Sort by Start Time
                       ↓
             Display Timeline
                       ↓
       Time + Venue + Event Details
                       ↓
              Add to Calendar
```

### Purpose of the Schedule Page

The main purpose of the Event Chronology system is to provide participants with a **single organized view of the complete fest schedule**.

Instead of manually searching through different event pages, users can:

1. Select the required day.
2. Select the required event track.
3. View events in chronological order.
4. Check the event time and venue.
5. Read event details.
6. Add important events to their calendar.

This makes the 48-hour fest schedule **organized, searchable, track-specific, and easy to follow**.
8) prize calculator 
<img width="1105" height="897" alt="image" src="https://github.com/user-attachments/assets/d28128a0-0dc3-4d7e-bb2f-13a4631e67c5" />
<img width="1127" height="927" alt="image" src="https://github.com/user-attachments/assets/622ae239-8377-4a11-9497-4d10e4c551ce" />
9) sponsors 
<img width="1115" height="902" alt="image" src="https://github.com/user-attachments/assets/b65c737f-da18-4921-b89d-e30ecdcdb3f1" />
<img width="1117" height="906" alt="image" src="https://github.com/user-attachments/assets/25b8c746-988c-47a9-9704-11fcf24d9644" />
10) event gallery 
<img width="1130" height="905" alt="image" src="https://github.com/user-attachments/assets/a4c91483-5e03-49c6-ba28-ffbf6f4d8973" />
11) FREQUENTLY ASKED QUESTIONS
<img width="1126" height="906" alt="image" src="https://github.com/user-attachments/assets/4273c9db-45dc-4261-918f-d149e4c95d8b" />
12)  GEHU HELP DESK
<img width="1117" height="907" alt="image" src="https://github.com/user-attachments/assets/53eb4927-fd70-4884-8a4f-7b534418d527" />
<img width="1097" height="896" alt="image" src="https://github.com/user-attachments/assets/32a52406-982a-498c-92f5-fe691d3c5b6a" />
13) REGISTRATION PROCESS 
<img width="1110" height="887" alt="image" src="https://github.com/user-attachments/assets/5aab08d6-bd91-418e-8e9b-20d5bb7ea374" />
EVENT SELECTION 
<img width="1096" height="887" alt="image" src="https://github.com/user-attachments/assets/e11d9c23-7e29-43ec-a845-ac39d5e5b753" />
CHECKOUT PAGE AND PAYMENT PAGE 
<img width="1065" height="890" alt="image" src="https://github.com/user-attachments/assets/8b847c0c-9d96-41a4-a004-0bee1232e7b2" />
PROMO CODE APPLY AND PAYMENT PAGE 
<img width="1121" height="892" alt="image" src="https://github.com/user-attachments/assets/2b889ade-3940-4255-ac2c-5e4634a14366" />
14) TEAM QR CODE GENRATION FOR ATTENDACE / PAYMENT DONE 
<img width="1122" height="896" alt="image" src="https://github.com/user-attachments/assets/c901fa13-e67e-43cc-a4e9-934012374c7b" />
U CAN ALSO PRINT THIS QR CODE AND PAYMENT SUCCESFULL PAGE 
<img width="1445" height="937" alt="image" src="https://github.com/user-attachments/assets/9250078d-36e9-432c-b361-2ec243314f65" />







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

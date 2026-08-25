import { FestEvent, ScheduleItem, Speaker, Sponsor, GalleryItem, FAQItem } from '../types/fest';

export const FEST_INFO = {
  name: "NIRVAN '26",
  edition: "Web-a-thon 4.0 Challenge",
  tagline: "Where Ideas Become Innovation",
  organization: "Graphic Era Hill University (GEHU)",
  campus: "Haldwani Campus, Uttarakhand",
  fullVenue: "Graphic Era Hill University, Nainital Road, Haldwani, Uttarakhand - 263139",
  dates: "October 12 – 13, 2026",
  targetDate: "2026-10-12T09:00:00+05:30",
  contactEmail: "nirvan@gehu.in",
  contactPhone: "+91 1256489632",
  stats: {
    prizePool: "₹1,50,000+",
    participants: "2,000+",
    eventsCount: "15+",
    partnerColleges: "45+",
    sponsorsCount: "10+",
    workshopsCount: "4+"
  },
  socials: {
    instagram: "https://instagram.com/gehu_haldwani",
    github: "https://github.com/gehu-official",
    linkedin: "https://linkedin.com/school/graphic-era-hill-university",
    discord: "https://discord.gg/nirvan26",
    youtube: "https://youtube.com/@GEHUHaldwaniOfficial",
    twitter: "https://twitter.com/gehuhaldwani"
  }
};

export const FEST_EVENTS: FestEvent[] = [
  {
    id: 'hackathon',
    name: 'HACKATHON (Web-a-thon 4.0)',
    category: 'hackathon',
    tagline: '24-Hour Non-Stop Code & Innovation Challenge',
    description: 'High-energy innovation challenge to solve real-world problems under time constraints across Web, AI, HealthTech & GreenTech.',
    longDescription: 'The flagship hackathon of NIRVAN 26 challenges developers, designers, and innovators to build working software or hardware solutions within 24 hours. Participants will have access to cloud credits, mentorship from industry architects, and lightning review rounds.',
    date: '12 October 2026',
    time: '10:00 AM – 13 Oct 10:00 AM',
    venue: 'Computer Lab 1 & Innovation Wing',
    teamSize: '2–4 members',
    minTeamSize: 2,
    maxTeamSize: 4,
    registrationFee: 100,
    prizePool: '₹15,000',
    prizeAmount: 15000,
    firstPrize: '₹10,000 + Tech Goodies & Cloud Credits',
    secondPrize: '₹5,000 + Mentorship Vouchers',
    thirdPrize: 'Internship Fast-Track + Premium Subscriptions',
    image: 'https://images.pexels.com/photos/1181260/pexels-photo-1181260.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    badge: 'Flagship Event',
    isFeatured: true,
    slotsRemaining: 14,
    tags: ['Web3', 'AI/ML', 'FullStack', '24H Code', 'Cloud'],
    highlights: [
      '24-Hour round-the-clock lab access with high-speed 1Gbps WiFi',
      'Continuous mentorship from senior architects of top tech firms',
      'Midnight energy drinks, pizza sprint, and tech swags for all teams',
      'Fast-track internship referrals for top 3 teams'
    ],
    rules: [
      'Teams must consist of 2 to 4 members from recognized educational institutions.',
      'All code, prototypes, and assets must be written during the hackathon period.',
      'Open-source libraries and APIs are permitted; pre-built full applications will lead to immediate disqualification.',
      'Final submission must include a functional GitHub repository and 3-minute live presentation to jury.'
    ],
    judgingCriteria: [
      'Innovation & Originality (30%)',
      'Technical Execution & Code Quality (30%)',
      'Real-world Feasibility & Business Value (20%)',
      'UI/UX Design & Pitch Presentation (20%)'
    ],
    coordinators: [
      { name: 'Arjun Mehta', phone: '+91 98765 43210', email: 'arjun.m@gehu.in' },
      { name: 'Simran Kaur', phone: '+91 98765 43211', email: 'simran.k@gehu.in' }
    ]
  },
  {
    id: 'treasure-hunt',
    name: 'THE CYBER TREASURE HUNT',
    category: 'treasure-hunt',
    tagline: 'Cryptic Clues, Augmented Reality & Campus Mystery',
    description: 'Thrilling adventure combining logic, teamwork, observation, and puzzle-solving across the sprawling GEHU Haldwani campus.',
    longDescription: 'Put on your detective hats! Decode multi-layered ciphers, scan hidden RFID & QR tags, solve digital escape room enigmas, and sprint through campus hotspots to unlock the grand vault.',
    date: '12 October 2026',
    time: '11:00 AM – 02:00 PM',
    venue: 'Seminar Hall (Start Point) & Campus Grounds',
    teamSize: '2–3 members',
    minTeamSize: 2,
    maxTeamSize: 3,
    registrationFee: 0,
    prizePool: '₹8,000',
    prizeAmount: 8000,
    firstPrize: '₹5,000 + Golden Cipher Trophy',
    secondPrize: '₹3,000 + Explorer Swag Box',
    image: '/images/treasure-hunt-cyber.jpg',
    badge: 'Campus Adventure',
    isFeatured: true,
    slotsRemaining: 8,
    tags: ['Cryptography', 'Puzzle Solving', 'AR Hunt', 'Campus Quest'],
    highlights: [
      'Multi-level progressive clue unlocking via web app',
      'Physical checkpoints with hidden hardware easter eggs',
      'Fast-paced race against timer with live campus leaderboard',
      'Exciting tech gadgets as surprise checkpoint bonuses'
    ],
    rules: [
      'Each team must have 2 or 3 members with at least one charged smartphone with internet access.',
      'Tampering with physical checkpoints or campus property is strictly forbidden.',
      'Collaboration between competing teams is prohibited and will cause deduction of points.',
      'First team to solve all clues and unlock the central terminal wins.'
    ],
    judgingCriteria: [
      'Fastest Completion Time (50%)',
      'Accuracy of Decoded Ciphers (30%)',
      'Bonus Puzzle Tokens Collected (20%)'
    ],
    coordinators: [
      { name: 'Rohan Joshi', phone: '+91 98765 43212', email: 'rohan.j@gehu.in' }
    ]
  },
  {
    id: 'esports',
    name: 'E-SPORTS CHAMPIONSHIP',
    category: 'gaming',
    tagline: 'Tactical Showdown: Valorant & BGMI LAN Arena',
    description: 'Ultimate competitive gaming arena testing strategy, reflexes, coordination, and clutch performance on ultra-low latency LAN.',
    longDescription: 'Gear up for an adrenaline-pumping esports tournament with professional casting, live stage projection, dedicated tournament servers, and intense 5v5 / squad brackets.',
    date: '12 October 2026',
    time: '02:00 PM – 07:00 PM',
    venue: 'Computer Lab 2 & Gaming Arena',
    teamSize: '4–5 members',
    minTeamSize: 4,
    maxTeamSize: 5,
    registrationFee: 100,
    prizePool: '₹12,000',
    prizeAmount: 12000,
    firstPrize: '₹8,000 + Esports Champion Trophies',
    secondPrize: '₹4,000 + Gaming Peripherals',
    image: 'https://images.pexels.com/photos/9072394/pexels-photo-9072394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    badge: 'LAN Tournament',
    isFeatured: true,
    slotsRemaining: 6,
    tags: ['Valorant', 'BGMI', 'Esports', 'LAN Gaming', 'FPS'],
    highlights: [
      'Dedicated 240Hz mechanical gaming setups and gigabit LAN',
      'Live shoutcasting by campus esports commentators',
      'Double elimination brackets with big screen stream',
      'Exclusive RGB gaming swags for MVPs'
    ],
    rules: [
      'Teams must register with their standard gaming handles and Steam/Riot/BGMI IDs.',
      'Use of third-party hacks, macros, or unfair scripts is an instant permanent ban.',
      'Players may bring their own mice, keyboards, and headsets after official inspection.',
      'Tournament referee decision is final in all dispute situations.'
    ],
    judgingCriteria: [
      'Tournament Bracket Victories (Single/Double Elimination)',
      'Kill-Death Ratio & Objective Score for tiebreakers'
    ],
    coordinators: [
      { name: 'Sameer Negi', phone: '+91 98765 43213', email: 'sameer.n@gehu.in' }
    ]
  },
  {
    id: 'ctf',
    name: 'CAPTURE THE FLAG (CTF)',
    category: 'cybersecurity',
    tagline: 'Cyber Siege: Web Exploits, Crypto & Reverse Engineering',
    description: 'Cybersecurity challenge covering cryptography, web security, reverse engineering, digital forensics, and network penetration.',
    longDescription: 'Step into the shoes of ethical hackers in a jeopardy-style CTF. Penetrate vulnerable target machines, crack military-grade ciphers, analyze network pcap dumps, and submit hidden flags.',
    date: '12 October 2026',
    time: '04:00 PM – 08:30 PM',
    venue: 'Open Ground Cyber Tent & NetLab',
    teamSize: '1–3 members',
    minTeamSize: 1,
    maxTeamSize: 3,
    registrationFee: 50,
    prizePool: '₹10,000',
    prizeAmount: 10000,
    firstPrize: '₹7,000 + Certified Ethical Hacker Vouchers',
    secondPrize: '₹3,000 + Security Hardware Tools',
    image: 'https://images.pexels.com/photos/5380618/pexels-photo-5380618.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    badge: 'Ethical Hacking',
    isFeatured: true,
    slotsRemaining: 12,
    tags: ['Cybersecurity', 'Web Exploitation', 'Cryptography', 'Forensics', 'Reverse Eng'],
    highlights: [
      'Custom vulnerable containerized sandbox environments',
      'Categories: Web, Pwn, Crypto, Forensics, OSINT, Reverse Engineering',
      'Real-time blood flags score updates with live projector display',
      'Networking with elite cyber security research professionals'
    ],
    rules: [
      'Teams are strictly prohibited from attacking the score server or competitor machines.',
      'Flag sharing between teams will result in immediate disqualification of both parties.',
      'Brute-forcing challenge servers is prohibited unless explicitly stated in the challenge.',
      'Dynamic scoring applies: flag values decrease as more teams solve the challenge.'
    ],
    judgingCriteria: [
      'Highest Total Points on the CTFd Leaderboard',
      'Time of Last Flag Submission in case of tie'
    ],
    coordinators: [
      { name: 'Devendra Rawat', phone: '+91 98765 43214', email: 'devendra.r@gehu.in' }
    ]
  },
  {
    id: 'workshop',
    name: 'WORKSHOP',
    category: 'workshop',
    tagline: 'Hands-on Learning Experience with Industry Experts',
    description: 'Interactive hands-on learning experience led by industry experts covering modern web development, cloud, and career-ready tech skills.',
    longDescription: 'A practical, beginner-friendly workshop where industry professionals guide you step-by-step through building real projects. Learn modern development workflows, deployment, and best practices — and leave with a working project and a verified certificate.',
    date: '13 October 2026',
    time: '10:30 AM – 01:00 PM',
    venue: 'Main Auditorium',
    teamSize: 'Individual (1 person)',
    minTeamSize: 1,
    maxTeamSize: 1,
    registrationFee: 0,
    prizePool: 'Certificate & Goodies',
    prizeAmount: 0,
    firstPrize: 'Official GEHU Certificate of Participation',
    secondPrize: 'Workshop Kit & Fest Goodies',
    image: 'https://images.pexels.com/photos/1181279/pexels-photo-1181279.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    badge: 'Free Entry',
    isFeatured: true,
    slotsRemaining: 40,
    tags: ['Web Development', 'Hands-on', 'Beginner Friendly', 'Certificate'],
    highlights: [
      'Live guided project building with industry mentors',
      'Bring your laptop — everything else is provided',
      'Verified certificate for your resume and LinkedIn',
      'Q&A and career guidance session at the end'
    ],
    rules: [
      'Open to all students — no prior experience required.',
      'Participants must bring their own laptop and charger.',
      'Seats are limited and allotted on first-come, first-served basis.'
    ],
    judgingCriteria: [
      'Attendance & Hands-on Project Completion'
    ],
    coordinators: [
      { name: 'Ananya Sharma', phone: '+91 98765 43215', email: 'ananya.s@gehu.in' }
    ]
  }
];

// (Archived events — fest से हटा दिए गए हैं, site पर show नहीं होते)
export const REMOVED_EVENTS_ARCHIVE = [
  {
    id: 'workshop',
    name: 'GEN-AI & AUTONOMOUS AGENTS WORKSHOP',
    category: 'workshop',
    tagline: 'Hands-on Masterclass: LLMs, LangChain & Agentic AI',
    description: 'Interactive hands-on learning experience led by industry experts on architecting production-ready AI agents and LLM pipelines.',
    longDescription: 'Deep dive into generative AI paradigms! Learn how to build retrieval-augmented generation (RAG) systems, multi-agent frameworks, and deploy intelligent voice/text agents with real industry practitioners.',
    date: '13 October 2026',
    time: '10:30 AM – 01:00 PM',
    venue: 'Main Auditorium & Live Virtual Stream',
    teamSize: 'Individual (1 person)',
    minTeamSize: 1,
    maxTeamSize: 1,
    registrationFee: 0,
    prizePool: 'Certification & Swags',
    prizeAmount: 0,
    firstPrize: 'Official GEHU & Partner Certificate of Mastery',
    secondPrize: 'Free Cloud AI Credits ($100 Value)',
    image: 'https://images.pexels.com/photos/1181279/pexels-photo-1181279.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    badge: 'Industry Certified',
    isFeatured: true,
    slotsRemaining: 35,
    tags: ['GenAI', 'LLMs', 'LangChain', 'OpenAI', 'Python'],
    highlights: [
      'Guided live coding session with free API keys provided',
      'Build and deploy a full AI autonomous agent from scratch in 2.5 hours',
      'Q&A session with AI researchers from top tech multinationals',
      'Verified digital credential for your LinkedIn profile'
    ],
    rules: [
      'Open to all students, faculty, and working professionals.',
      'Participants must bring their own laptop with Python 3.10+ installed.',
      'Colab / Jupyter notebook links will be shared prior to the session.'
    ],
    judgingCriteria: [
      'Interactive Workshop Quiz & Capstone Deployment'
    ],
    coordinators: [
      { name: 'Ananya Sharma', phone: '+91 98765 43215', email: 'ananya.s@gehu.in' }
    ]
  },
  {
    id: 'hacksprint',
    name: 'HACKSPRINT (Design & Prototype Clash)',
    category: 'hackathon',
    tagline: '4-Hour Rapid UI/UX & Interactive Prototype Sprint',
    description: 'Fast 4-hour sprint to craft high-fidelity digital interfaces, micro-interactions, and reactive web prototypes for a surprise theme.',
    longDescription: 'Test your swift design thinking and frontend agility. Receive a secret client problem statement at 06:00 PM and present an interactive clickable prototype by 10:00 PM.',
    date: '12 October 2026',
    time: '06:00 PM – 10:00 PM',
    venue: 'Innovation Lab (Floor 2)',
    teamSize: '1–2 members',
    minTeamSize: 1,
    maxTeamSize: 2,
    registrationFee: 50,
    prizePool: '₹7,000',
    prizeAmount: 7000,
    firstPrize: '₹4,500 + UI/UX Design Tool Subscriptions',
    secondPrize: '₹2,500 + Design System Kits',
    image: 'https://images.pexels.com/photos/4385446/pexels-photo-4385446.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    badge: 'Rapid Sprint',
    slotsRemaining: 10,
    tags: ['UI/UX', 'Figma', 'Frontend', 'React', 'Rapid Prototype'],
    highlights: [
      'Surprise design brief unveiled at the start whistle',
      'Feedback from professional UI/UX directors',
      'Focus on usability, accessibility, and visual aesthetics'
    ],
    rules: [
      'Prototypes can be built in Figma, Penpot, or React/HTML/CSS.',
      'All mockups and code must be authored inside the 4-hour window.'
    ],
    judgingCriteria: [
      'Aesthetic Polishing & Modern UI (35%)',
      'User Experience & Accessibility (35%)',
      'Micro-interactions & Responsiveness (30%)'
    ],
    coordinators: [
      { name: 'Kunal Bisht', phone: '+91 98765 43216', email: 'kunal.b@gehu.in' }
    ]
  },
  {
    id: 'robo-sumo',
    name: 'ROBO-SUMO & DRONE ARENA',
    category: 'robotics',
    tagline: 'High-Torque Combat & Autonomous Drone Obstacle Course',
    description: 'Build combat-ready robots and agile micro-drones to clash in circular dojo arenas and navigate aerial obstacle hoops.',
    longDescription: 'Witness high-voltage metal clashes! Autonomous and RC robots face off in the circular ring to push rivals out, while FPV drones navigate tight neon rings and agility gates.',
    date: '13 October 2026',
    time: '01:30 PM – 04:30 PM',
    venue: 'Tech Arena & Outdoor Quadrangle',
    teamSize: '2–4 members',
    minTeamSize: 2,
    maxTeamSize: 4,
    registrationFee: 100,
    prizePool: '₹12,000',
    prizeAmount: 12000,
    firstPrize: '₹8,000 + Robo Warrior Trophy',
    secondPrize: '₹4,000 + Motor Driver & Sensor Kits',
    image: 'https://images.pexels.com/photos/7868886/pexels-photo-7868886.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    badge: 'Hardware Combat',
    slotsRemaining: 9,
    tags: ['Robotics', 'Arduino', 'Drones', 'Hardware', 'Combat'],
    highlights: [
      'Heavy-duty safety enclosure for combat matches',
      'Real-time pit stop repair zone with solders and battery charging',
      'Live slow-motion action replays on big screens'
    ],
    rules: [
      'Bot weight must not exceed 5kg. Maximum dimensions 30x30x30 cm.',
      'No hazardous materials, flammable liquids, or untethered projectiles allowed.'
    ],
    judgingCriteria: [
      'Ring Dominance & Push Outs (50%)',
      'Build Quality & Mechanical Ingenuity (30%)',
      'Autonomous Sensor Control (20%)'
    ],
    coordinators: [
      { name: 'Harshita Pandey', phone: '+91 98765 43217', email: 'harshita.p@gehu.in' }
    ]
  },
  {
    id: 'prompt-battle',
    name: 'PROMPT BATTLE & AI CREATIVE ARENA',
    category: 'workshop',
    tagline: 'Prompt Engineering, AI Art & Algorithmic Storytelling',
    description: 'Real-time competitive prompt battle! Create photorealistic visuals, compelling stories, and complex code prompts against the clock.',
    longDescription: 'Challenge your mental precision with generative AI prompts. Compete in 1v1 live prompt face-offs across Midjourney, Stable Diffusion, and Claude/ChatGPT modules.',
    date: '13 October 2026',
    time: '03:30 PM – 05:30 PM',
    venue: 'Design Lab 3',
    teamSize: 'Individual (1 person)',
    minTeamSize: 1,
    maxTeamSize: 1,
    registrationFee: 0,
    prizePool: '₹5,000',
    prizeAmount: 5000,
    firstPrize: '₹3,500 + AI Studio Pro Licenses',
    secondPrize: '₹1,500 + Creative Swag Pack',
    image: 'https://images.pexels.com/photos/5473951/pexels-photo-5473951.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    badge: 'AI Creative Clash',
    slotsRemaining: 20,
    tags: ['Prompt Engineering', 'Midjourney', 'Generative Art', 'AI Tools'],
    highlights: [
      '1v1 real-time prompt generation duel with audience voting',
      'Secret themes revealed 60 seconds before generation countdown',
      'Free premium AI sandbox environment access'
    ],
    rules: [
      'All prompts must be created live inside the competition platform.',
      'No offensive or NSFW prompt directives are allowed.'
    ],
    judgingCriteria: [
      'Prompt Precision & Quality (40%)',
      'Visual / Story Output Alignment with Theme (40%)',
      'Audience & Jury Live Score (20%)'
    ],
    coordinators: [
      { name: 'Nikhil Verma', phone: '+91 98765 43218', email: 'nikhil.v@gehu.in' }
    ]
  }
];

export const FEST_SCHEDULE: ScheduleItem[] = [
  // DAY 1
  {
    id: 's1',
    day: 'day1',
    dateStr: '12 October 2026',
    time: '09:00 AM',
    endTime: '10:00 AM',
    title: 'Grand Inauguration & Opening Ceremony',
    description: 'Lighting of the lamp, welcome address by Chancellor & Campus Director, unveiling of Web-a-thon 4.0 trophies and fest keynote.',
    venue: 'Main Auditorium (Ground Floor)',
    category: 'ceremony',
    speaker: 'Dr. Aarav Sharma & University Leadership',
    isLive: false
  },
  {
    id: 's2',
    day: 'day1',
    dateStr: '12 October 2026',
    time: '10:00 AM',
    endTime: '10:30 AM',
    title: 'Hackathon (Web-a-thon 4.0) Kickoff & Track Reveal',
    description: 'Problem statements unlocked, cloud credit disbursement, team check-in and 24-hour hack sprint timer begins.',
    venue: 'Computer Lab 1 & Innovation Wing',
    category: 'hackathon',
    isLive: true
  },
  {
    id: 's3',
    day: 'day1',
    dateStr: '12 October 2026',
    time: '11:00 AM',
    endTime: '01:00 PM',
    title: 'The Cyber Treasure Hunt (Round 1 & 2)',
    description: 'Cryptic clue solving, campus AR tag hunt, and team puzzle sprint across scenic GEHU campus.',
    venue: 'Seminar Hall (Flag off) & Campus Grounds',
    category: 'hackathon'
  },
  {
    id: 's4',
    day: 'day1',
    dateStr: '12 October 2026',
    time: '01:00 PM',
    endTime: '02:00 PM',
    title: 'Lunch Break & Networking Lounge',
    description: 'Complimentary buffet lunch for all participants, sponsor networking desks, and music chillout lounge.',
    venue: 'Food Court & Cafeteria Garden',
    category: 'break'
  },
  {
    id: 's5',
    day: 'day1',
    dateStr: '12 October 2026',
    time: '02:00 PM',
    endTime: '04:00 PM',
    title: 'E-Sports Championship (Valorant & BGMI Qualifiers)',
    description: 'Fast-paced tactical LAN matches, big screen live casting, and intense double-elimination brackets.',
    venue: 'Computer Lab 2 & Cyber Arena',
    category: 'gaming'
  },
  {
    id: 's6',
    day: 'day1',
    dateStr: '12 October 2026',
    time: '04:00 PM',
    endTime: '06:00 PM',
    title: 'CTF (Capture The Flag) Cyber Siege',
    description: 'Jeopardy style ethical hacking challenges: Web vulnerabilities, cryptography, binary reverse engineering.',
    venue: 'Open Ground Cyber Tent & NetLab',
    category: 'cyber'
  },
  {
    id: 's8',
    day: 'day1',
    dateStr: '12 October 2026',
    time: '08:30 PM',
    endTime: '10:30 PM',
    title: 'Cyber Night: DJ Laser Show & Midnight Energy Surge',
    description: 'Electric musical laser night, midnight snacks, and coffee refills for overnight hackathon warriors.',
    venue: 'Amphitheatre & Lab Hub',
    category: 'ceremony'
  },

  // DAY 2
  {
    id: 's9',
    day: 'day2',
    dateStr: '13 October 2026',
    time: '09:00 AM',
    endTime: '10:00 AM',
    title: 'Hackathon Final Commit & Code Freeze',
    description: '24-hour hackathon timer ends. Repository submission deadline, build validation, and preliminary code review.',
    venue: 'Computer Lab 1',
    category: 'hackathon'
  },
  {
    id: 's10',
    day: 'day2',
    dateStr: '13 October 2026',
    time: '10:30 AM',
    endTime: '01:00 PM',
    title: 'Hands-on Workshop by Industry Experts',
    description: 'Interactive hands-on learning session — build a real project step-by-step with guidance from industry professionals. Free entry with certificate.',
    venue: 'Main Auditorium',
    category: 'workshop',
    speaker: 'Industry Mentors & GEHU Faculty'
  },
  {
    id: 's11',
    day: 'day2',
    dateStr: '13 October 2026',
    time: '01:00 PM',
    endTime: '02:00 PM',
    title: 'Lunch & Project Expo Walkthrough',
    description: 'Gourmet lunch break while judges and attendees walk through student hardware and software expo booths.',
    venue: 'Central Expo Hall & Food Court',
    category: 'break'
  },
  {
    id: 's13',
    day: 'day2',
    dateStr: '13 October 2026',
    time: '02:30 PM',
    endTime: '04:30 PM',
    title: 'Web-a-thon 4.0 Top 10 Grand Jury Pitches',
    description: 'Top 10 shortlisted hackathon teams pitch to a panel of venture capitalists and chief technology officers.',
    venue: 'Main Auditorium',
    category: 'judging'
  },
  {
    id: 's14',
    day: 'day2',
    dateStr: '13 October 2026',
    time: '05:00 PM',
    endTime: '07:00 PM',
    title: 'Grand Valedictory & Prize Distribution Ceremony',
    description: 'Announcement of champions across all tracks, trophy presentations, cash prize handover, and fest farewell.',
    venue: 'Main Auditorium',
    category: 'ceremony'
  }
];

export const FEST_SPEAKERS: Speaker[] = [
  {
    id: 'sp1',
    name: 'Dr. Aarav Sharma',
    role: 'AI Research Director',
    organization: 'DeepMatrix AI (Ex-Google Brain)',
    avatar: 'https://images.pexels.com/photos/16970130/pexels-photo-16970130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    bio: 'Pioneering researcher in transformer architectures and decentralized intelligence with 15+ patents and top NeurIPS publications.',
    topic: 'Keynote: The Post-Transformer Era & Autonomous Systems',
    sessionTime: 'Day 1 • 09:30 AM',
    featuredBadge: 'Keynote Speaker',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
      github: 'https://github.com'
    }
  },
  {
    id: 'sp2',
    name: 'Priya Nair',
    role: 'Chief Security Architect',
    organization: 'CyberShield Labs & DEF CON Mentor',
    avatar: 'https://images.pexels.com/photos/8365066/pexels-photo-8365066.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    bio: 'International ethical hacker, cloud defense strategist, and keynote speaker on zero-trust offensive security paradigms.',
    topic: 'Masterclass: Zero-Trust Defense in the Age of AI Threats',
    sessionTime: 'Day 2 • 10:30 AM',
    featuredBadge: 'Cyber Specialist',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com'
    }
  },
  {
    id: 'sp3',
    name: 'Vikramaditya Sen',
    role: 'VP of Engineering',
    organization: 'DevLabs Global',
    avatar: 'https://images.pexels.com/photos/12903019/pexels-photo-12903019.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    bio: 'Distributed systems architect scaling cloud infrastructure to hundreds of millions of daily concurrent users across 40 countries.',
    topic: 'Building Resilient Hyper-Scale Distributed Systems',
    sessionTime: 'Day 1 • 03:00 PM',
    featuredBadge: 'Tech Leader',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    id: 'sp4',
    name: 'Sneha Roy',
    role: 'Product Design Director',
    organization: 'NeoCreative Studio',
    avatar: 'https://images.pexels.com/photos/1181521/pexels-photo-1181521.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    bio: 'Award-winning UI/UX director passionate about spatial computing, micro-interactions, and human-centric design systems.',
    topic: 'Designing Emotional Interfaces in Spatial Computing',
    sessionTime: 'Day 1 • 06:15 PM',
    featuredBadge: 'Design Mentor',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com'
    }
  }
];

export const FEST_SPONSORS: Sponsor[] = [
  // TITLE
  {
    id: 'spon1',
    name: 'TechCorp Global',
    tier: 'title',
    logoText: 'TechCorp',
    categoryLabel: 'Title Sponsor',
    description: 'Global pioneer in enterprise cloud, AI infrastructure, and next-generation cognitive computing solutions.',
    perks: '₹50K Hackathon Grant + Direct Interview Tracks',
    website: 'https://techcorp.example.com'
  },
  {
    id: 'spon2',
    name: 'Zeopto Systems',
    tier: 'title',
    logoText: 'Zeopto',
    categoryLabel: 'Title Sponsor',
    description: 'Next-generation quantum-resistant cryptography and high-frequency network engineering.',
    perks: 'Lead Hardware Sponsor & Cloud Compute Partner',
    website: 'https://zeopto.example.com'
  },
  // GOLD
  {
    id: 'spon3',
    name: 'DevLabs',
    tier: 'gold',
    logoText: 'DevLabs',
    categoryLabel: 'Gold Sponsor',
    description: 'Empowering software engineering teams with intelligent developer toolchains and CI/CD automation.',
    perks: 'Developer Swags + API Credit Vouchers',
    website: 'https://devlabs.example.com'
  },
  {
    id: 'spon4',
    name: 'CloudNova.xyz',
    tier: 'gold',
    logoText: 'CloudNova',
    categoryLabel: 'Gold Sponsor',
    description: 'Serverless cloud hosting platform engineered for ultra-fast edge deployments and real-time state sync.',
    perks: '$5,000 Edge Compute Credits for All Teams',
    website: 'https://cloudnova.xyz'
  },
  {
    id: 'spon5',
    name: 'lovable.Ai',
    tier: 'gold',
    logoText: 'lovable.Ai',
    categoryLabel: 'Gold Sponsor',
    description: 'Fullstack AI building engine that turns ideas and designs into production-ready software in seconds.',
    perks: 'AI Pro Subscriptions & Fast Prototype Grants',
    website: 'https://lovable.ai'
  },
  {
    id: 'spon6',
    name: 'HackNest',
    tier: 'gold',
    logoText: 'HackNest',
    categoryLabel: 'Gold Sponsor',
    description: 'Premier hackathon incubator and community platform connecting elite student builders with angel investors.',
    perks: 'Incubation Grant & Demo Day Showcase',
    website: 'https://hacknest.example.com'
  },
  // COMMUNITY PARTNERS
  {
    id: 'spon7',
    name: 'GitHub Community',
    tier: 'community',
    logoText: 'GitHub Campus',
    categoryLabel: 'Community Partner',
    description: 'World largest open source development ecosystem and student developer pack partner.',
    perks: 'GitHub Pro Packs + Octocat Swag Packs',
    website: 'https://github.com'
  },
  {
    id: 'spon8',
    name: 'Google Developer Groups (GDG)',
    tier: 'community',
    logoText: 'GDG Haldwani',
    categoryLabel: 'Community Partner',
    description: 'Community-led tech enthusiasts gathering to learn, share, and innovate with Google developer technologies.',
    perks: 'Workshop Mentorship & Community Badges',
    website: 'https://developers.google.com/community/gdg'
  }
];

export const FEST_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'HACKATHON (Web-a-thon 4.0)',
    category: 'hackathon',
    imageUrl: 'https://images.pexels.com/photos/1181260/pexels-photo-1181260.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    caption: 'Teams building real projects in the 24-hour coding challenge.',
    year: '2025'
  },
  {
    id: 'g2',
    title: 'THE CYBER TREASURE HUNT',
    category: 'campus',
    imageUrl: '/images/treasure-hunt-cyber.jpg',
    caption: 'Students solving clues and puzzles across the campus.',
    year: '2025'
  },
  {
    id: 'g3',
    title: 'E-SPORTS CHAMPIONSHIP',
    category: 'gaming',
    imageUrl: 'https://images.pexels.com/photos/9072394/pexels-photo-9072394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    caption: 'Ultimate competitive gaming arena testing strategy, reflexes, and skill.',
    year: '2025'
  },
  {
    id: 'g4',
    title: 'CAPTURE THE FLAG (CTF)',
    category: 'hackathon',
    imageUrl: 'https://images.pexels.com/photos/5380618/pexels-photo-5380618.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    caption: 'Cybersecurity challenge with cryptography, web security, and forensics.',
    year: '2025'
  },
  {
    id: 'g5',
    title: 'WORKSHOP',
    category: 'keynote',
    imageUrl: 'https://images.pexels.com/photos/1181279/pexels-photo-1181279.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    caption: 'Hands-on learning session with industry experts.',
    year: '2025'
  }
];

export const FEST_FAQS: FAQItem[] = [
  {
    id: 'faq1',
    category: 'general',
    question: 'Who is eligible to participate in NIRVAN 26?',
    answer: 'NIRVAN 26 is open to all enrolled undergraduate and postgraduate students from engineering, management, design, and computer application streams across India. Valid college ID cards are required during on-campus check-in.'
  },
  {
    id: 'faq2',
    category: 'registration',
    question: 'Can I register for multiple events during the fest?',
    answer: 'Yes! You can select and participate in multiple non-overlapping events. For instance, you can participate in the Treasure Hunt and CTF Challenge, or combine Workshops with Gaming tournaments. The registration modal automatically aggregates your event bundle.'
  },
  {
    id: 'faq3',
    category: 'hackathon',
    question: 'Are hardware and software tracks combined in Web-a-thon 4.0?',
    answer: 'Web-a-thon 4.0 welcomes both software applications (Web/Mobile/AI) and IoT/embedded hardware prototypes. We provide high-speed WiFi, power sockets, monitor extensions, and standard electronics lab testing equipment.'
  },
  {
    id: 'faq4',
    category: 'logistics',
    question: 'Is accommodation provided for outstation participants?',
    answer: 'Yes! Graphic Era Hill University provides secure hostel accommodation and meals on a nominal first-come, first-served basis for outstation teams. Make sure to check the "Accommodation Required" checkbox during registration.'
  },
  {
    id: 'faq5',
    category: 'general',
    question: 'Will all participants receive certificates and swags?',
    answer: 'Absolutely! Every registered attendee gets an official NIRVAN 26 holographic participant kit, digital verifiable certificate, fest stickers, and lunch/refreshment coupons.'
  },
  {
    id: 'faq6',
    category: 'hackathon',
    question: 'What is the team size limit for the hackathon?',
    answer: 'Hackathon teams can have between 2 to 4 members. Solo registrations will be provided an opportunity to join our Discord matchmaking lounge prior to the event.'
  }
];

export const FEST_PILLARS = [
  {
    title: 'INNOVATION',
    subtitle: 'Think Beyond Boundaries',
    description: 'Transform theoretical concepts into disruptive production-grade software and intelligent hardware solutions.',
    icon: 'Lightbulb',
    stat: '50+ Prototypes Expected',
    color: 'cyan'
  },
  {
    title: 'TECHNOLOGY',
    subtitle: 'Next-Gen Cyber Stack',
    description: 'Leverage state-of-the-art AI models, edge compute nodes, cloud infrastructure, and quantum-resistant protocols.',
    icon: 'Cpu',
    stat: '10+ Tech Stacks Supported',
    color: 'purple'
  },
  {
    title: 'COMPETITION',
    subtitle: 'Battle of the Elite Minds',
    description: 'Pit your skills against top developers, designers, and gamers from 45+ premier institutions nationwide.',
    icon: 'Trophy',
    stat: '₹1.5 Lakh Prize Pool',
    color: 'amber'
  },
  {
    title: 'COMMUNITY',
    subtitle: 'Network & Elevate Together',
    description: 'Build lifelong bonds with visionary mentors, tech startup founders, angel investors, and peer developers.',
    icon: 'Users',
    stat: '2,000+ Innovators',
    color: 'emerald'
  }
];

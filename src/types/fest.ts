export type EventCategory = 'all' | 'hackathon' | 'gaming' | 'cybersecurity' | 'treasure-hunt' | 'workshop' | 'robotics';

export interface FestEvent {
  id: string;
  name: string;
  category: EventCategory;
  tagline: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  minTeamSize: number;
  maxTeamSize: number;
  registrationFee: number; // in INR (0 = Free)
  prizePool: string;
  prizeAmount: number;
  firstPrize: string;
  secondPrize: string;
  thirdPrize?: string;
  image: string;
  badge: string;
  highlights: string[];
  rules: string[];
  judgingCriteria: string[];
  coordinators: {
    name: string;
    phone: string;
    email: string;
  }[];
  isFeatured?: boolean;
  slotsRemaining: number;
  tags: string[];
}

export interface ScheduleItem {
  id: string;
  day: 'day1' | 'day2';
  dateStr: string;
  time: string;
  endTime?: string;
  title: string;
  description: string;
  venue: string;
  category: 'ceremony' | 'hackathon' | 'gaming' | 'cyber' | 'workshop' | 'break' | 'judging';
  speaker?: string;
  isLive?: boolean;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  bio: string;
  topic: string;
  sessionTime: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  featuredBadge?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'title' | 'gold' | 'community' | 'media';
  logoText: string;
  description: string;
  perks: string;
  website: string;
  categoryLabel: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'hackathon' | 'gaming' | 'keynote' | 'campus' | 'robotics';
  imageUrl: string;
  caption: string;
  year: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'registration' | 'hackathon' | 'logistics';
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  branchYear: string;
  eventIds: string[];
  participationType: 'solo' | 'team';
  teamName?: string;
  teamMembers?: {
    name: string;
    email: string;
    phone: string;
  }[];
  githubUrl?: string;
  accommodationRequired: boolean;
  couponCode?: string;
}

export interface TicketPassData {
  ticketId: string;
  registrationNumber: string;
  attendeeName: string;
  collegeName: string;
  eventNames: string[];
  teamName?: string;
  qrCodeSeed: string;
  issueDate: string;
  tier: 'VIP Innovator' | 'Hacker Pass' | 'Gamer Access' | 'Delegate';
}

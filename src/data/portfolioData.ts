import { Project, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'Francis',
  role: 'Software Developer & IT Student',
  status: 'Available for Opportunities',
  email: 'frncs4class@gmail.com',
  githubUrl: 'https://github.com/FranzTryhard',
  githubHandle: 'FranzTryhard',
  portraitUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBaz9V7ZdJQ6lzYowH6us7AHEUk9OD9kog5x7DRiEZh-3Fojz7MhbSlUz5yX5LDI6Ih9Ov95TNZd1B05bCtVlfd_txexcs-pgIFuE2cKHPG6i1UZWOdjkWvh8CLoynRf74fR6E_kudTa5j5d5hORgK-wrImJWevKHU4wc2tBma-9x4ULFpzzQH_DGNq2siu4xpF_Azvsj6LlI8hsM6-74AFOBtON97ul5f06nk5orGeiOI5Ec4wG4Udy6N8tg5QNWVbw',
  heroIntro: "I'm Francis, an aspiring software developer and IT student building practical digital experiences through code, experimentation, and problem-solving.",
  aboutHeading: "I'm an IT student who enjoys turning ideas into useful digital solutions. I learn by building projects, experimenting with new technologies, and solving real-world problems.",
  aboutDescription: "My journey revolves around crafting software that balances clean system architecture with purposeful user interfaces. From developing end-to-end full-stack backends to architecting reliable database schemas and responsive cross-platform applications, I focus on practical execution, continuous curiosity, and delivering work that truly works."
};

export const CURRENT_TECH = [
  'Python',
  'JavaScript',
  'PostgreSQL',
  'React Native',
  'Node.js',
  'Django'
];

export const PROJECTS: Project[] = [
  {
    id: 'easytrip',
    number: '01',
    category: 'TRAVEL ARCHITECTURE',
    title: 'EasyTrip',
    description: 'A comprehensive trip-planning application organizing complex travel itineraries by calendar dates, customizable budget tiers, and curated accommodation preferences.',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    version: 'v1.2.0',
    status: 'Online'
  },
  {
    id: 'electrack',
    number: '02',
    category: 'SMART MONITORING',
    title: 'ElecTrack',
    description: 'A smart energy management concept engineered to assist residential households in monitoring consumption, estimating projected monthly utility costs, and detecting high-load peak usage patterns.',
    tags: ['Python', 'Django', 'Time-Series DB'],
    version: 'Live 1.4 kW/h',
    status: 'Monitoring'
  },
  {
    id: 'palosebo',
    number: '03',
    category: 'MULTIPLAYER GAME CONCEPT',
    title: 'Palosebo',
    description: 'Traditional Filipino-inspired competitive greased-pole climbing game concept featuring physics-based friction mechanics, a synchronized 2-player race mode, and distributed global leaderboards.',
    tags: ['JavaScript', 'HTML5 Canvas', 'WebSockets'],
    version: 'Race Match #849',
    status: 'Live Pole Ascent'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'SQL']
  },
  {
    title: 'Web & Backend',
    skills: ['Django', 'Node.js', 'REST APIs', 'Express']
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'Relational Modeling', 'Redis', 'Database Indexing']
  },
  {
    title: 'Mobile Engineering',
    skills: ['React Native', 'Mobile UI Patterns', 'Expo', 'Async Storage']
  },
  {
    title: 'Tools, Architecture & Workflow',
    skills: ['Git', 'GitHub', 'VS Code', 'System Design Fundamentals', 'REST Architecture', 'CI/CD Basics'],
    span: 'sm:col-span-2 lg:col-span-2'
  }
];

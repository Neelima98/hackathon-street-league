// Dummy data for videos and series
export const mockVideos = [
  {
    id: 1,
    title: 'How to Learn English Fast!',
    guide: 'Jane Doe',
    link: 'dQw4w9WgXcQ', // YouTube video ID
    level: 'Beginner',
    accent: 'US',
    topics: ['Speaking', 'Listening'],
    locked: false,
  },
  {
    id: 2,
    title: 'Mastering English Pronunciation',
    guide: 'John Smith',
    link: '9bZkp7q19f0',
    level: 'Intermediate',
    accent: 'UK',
    topics: ['Pronunciation'],
    locked: true,
  },
  {
    id: 3,
    title: 'English Idioms for Daily Life',
    guide: 'Emily Clark',
    link: '3JZ_D3ELwOQ',
    level: 'Advanced',
    accent: 'AU',
    topics: ['Idioms', 'Vocabulary'],
    locked: false,
  },
]

export const mockSeries = [
  {
    id: 1,
    title: 'Business English Series',
    name: 'Business English Series',
    guide: 'Jane Doe',
    link: 'dQw4w9WgXcQ',
    level: 'Intermediate',
    accent: 'US',
    topics: ['Business', 'Meetings'],
    locked: false,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    shortDescription: 'Master business English for meetings and presentations.',
    description:
      'A series focused on English for business settings, including meetings, presentations, and negotiations.',
  },
  {
    id: 2,
    title: 'Travel English Series',
    name: 'Travel English Series',
    guide: 'John Smith',
    link: '9bZkp7q19f0',
    level: 'Beginner',
    accent: 'UK',
    topics: ['Travel', 'Culture'],
    locked: false,
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg',
    shortDescription: 'Essential English for travelers.',
    description:
      'Learn the basics of English for travel, including airport, hotel, and sightseeing conversations.',
  },
  {
    id: 3,
    title: 'Everyday English Series',
    name: 'Everyday English Series',
    guide: 'Emily Clark',
    link: '3JZ_D3ELwOQ',
    level: 'Beginner',
    accent: 'AU',
    topics: ['Daily Life', 'Conversation'],
    locked: false,
    thumbnail: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
    shortDescription: 'English for daily conversations.',
    description:
      'Improve your English for everyday situations like shopping, dining, and making friends.',
  },
  {
    id: 4,
    title: 'Advanced Grammar Series',
    name: 'Advanced Grammar Series',
    guide: 'Michael Brown',
    link: 'e-ORhEE9VVg',
    level: 'Advanced',
    accent: 'US',
    topics: ['Grammar', 'Writing'],
    locked: true,
    thumbnail: 'https://img.youtube.com/vi/e-ORhEE9VVg/hqdefault.jpg',
    shortDescription: 'Take your grammar to the next level.',
    description:
      'Deep dive into advanced English grammar and writing skills for professionals and students.',
  },
  {
    id: 5,
    title: 'Pronunciation Mastery',
    name: 'Pronunciation Mastery',
    guide: 'Sarah Lee',
    link: 'L_jWHffIx5E',
    level: 'Intermediate',
    accent: 'UK',
    topics: ['Pronunciation', 'Speaking'],
    locked: false,
    thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/hqdefault.jpg',
    shortDescription: 'Perfect your English pronunciation.',
    description:
      'A series dedicated to mastering English pronunciation and speaking clearly in any situation.',
  },
]

export const mockEvents = [
  {
    id: 'sess-2001',
    title: 'Maths: Algebra – Variables & Expressions',
    start: '2026-02-03T09:30:00',
    end: '2026-02-03T10:30:00',
    extendedProps: {
      location: 'Room 3',
      sessionType: 'Lesson',
      cohort: 'Cohort 4',
    },
  },
  {
    id: 'sess-2002',
    title: 'English: Creative Writing Workshop',
    start: '2026-02-04T11:00:00',
    end: '2026-02-04T12:00:00',
    extendedProps: {
      location: 'Room 5',
      sessionType: 'Lesson',
      cohort: 'Cohort 3',
    },
  },
  {
    id: 'sess-2003',
    title: '1:1 Progress Review',
    start: '2026-02-05T15:00:00',
    end: '2026-02-05T15:30:00',
    extendedProps: {
      location: 'Mentor Office',
      sessionType: '1:1',
      cohort: 'Personal',
    },
  },
  {
    id: 'sess-2004',
    title: 'Science Lab: Chemical Reactions',
    start: '2026-02-06T13:00:00',
    end: '2026-02-06T14:30:00',
    extendedProps: {
      location: 'Lab 2',
      sessionType: 'Practical',
      cohort: 'Cohort 2',
    },
  },
]

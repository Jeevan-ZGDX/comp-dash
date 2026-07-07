import type { Competition, CompetitionCategory, CompetitionScope, CompetitionMode, DashboardStats, Registration, RegistrationStatus } from '@comp-dash/types'

function makeComp(id: string, overrides: Partial<Competition> = {}): Competition {
  return {
    id, title: '', description: '', shortDescription: '', category: 'hackathon' as CompetitionCategory,
    scope: 'college' as CompetitionScope, mode: 'offline' as CompetitionMode, organizer: '',
    organizerLogo: null, bannerUrl: null, websiteUrl: '#', registrationUrl: '#',
    teamSizeMin: 1, teamSizeMax: 4, prizePool: '₹50,000', registrationDeadline: '2025-07-15',
    startDate: '2025-06-01', endDate: '2025-06-15',
    eligibility: { departments: [], yearOfStudy: [], description: '' },
    tags: [], createdAt: '2025-01-01', updatedAt: '2025-01-01',
    ...overrides,
  }
}

function makeReg(id: string, overrides: Partial<Registration> = {}): Registration {
  return {
    id, competitionId: '', competition: makeComp(''), userId: '',
    status: 'pending_verification' as RegistrationStatus, registeredAt: new Date().toISOString(),
    verifiedAt: null, verificationMethod: null, extractedConfirmationId: null,
    extractedEmail: null, rejectionReason: null, notes: null,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    ...overrides,
  }
}

let competitions: Competition[] = [
  makeComp('1', { title: 'HackFusion 2025', category: 'hackathon', organizer: 'CSE Department', mode: 'offline', registrationDeadline: '2025-07-15', prizePool: '₹50,000', shortDescription: '24-hour hackathon', description: 'A 24-hour hackathon to build innovative solutions.', createdAt: '2025-01-15' }),
  makeComp('2', { title: 'AI Innovation Challenge', category: 'hackathon', organizer: 'AIDS Department', mode: 'online', registrationDeadline: '2025-06-30', prizePool: '₹25,000', scope: 'national', shortDescription: 'AI solutions challenge', description: 'Build AI-powered solutions for real-world problems.', createdAt: '2025-02-01' }),
  makeComp('3', { title: 'Code Blitz', category: 'workshop', organizer: 'IT Department', mode: 'offline', registrationDeadline: '2025-07-10', prizePool: '₹30,000', shortDescription: 'CP workshop', description: 'Competitive programming workshop and contest.', createdAt: '2025-03-10' }),
  makeComp('4', { title: 'Tech Summit Hackathon', category: 'hackathon', organizer: 'IEEE Student Branch', mode: 'hybrid', registrationDeadline: '2025-07-20', prizePool: '₹1,00,000', scope: 'international', shortDescription: 'Global hackathon', description: 'Global hackathon with industry mentors.', createdAt: '2025-02-20' }),
  makeComp('5', { title: 'IEEE Paper Presentation', category: 'paper_presentation', organizer: 'IEEE Student Branch', mode: 'offline', registrationDeadline: '2025-07-05', prizePool: '₹15,000', scope: 'national', shortDescription: 'Paper presentation', description: 'Present your research papers and win prizes.', createdAt: '2025-03-01' }),
  makeComp('6', { title: 'Web Development Bootcamp', category: 'workshop', organizer: 'CSE Department', mode: 'online', registrationDeadline: '2025-08-01', prizePool: '₹10,000', shortDescription: 'Web dev bootcamp', description: 'Full-stack web development intensive bootcamp.', createdAt: '2025-04-01' }),
  makeComp('7', { title: 'Google Cloud Internship', category: 'internship', organizer: 'Google Developer Groups', mode: 'online', registrationDeadline: '2025-07-25', prizePool: '₹75,000', scope: 'national', shortDescription: 'Cloud internship', description: 'Paid internship opportunity with Google Cloud.', createdAt: '2025-03-15' }),
  makeComp('8', { title: 'Data Science Workshop', category: 'workshop', organizer: 'AIDS Department', mode: 'hybrid', registrationDeadline: '2025-08-10', prizePool: '₹5,000', shortDescription: 'Data science workshop', description: 'Hands-on data science workshop with real datasets.', createdAt: '2025-04-10' }),
]

interface StudentRecord {
  id: string; name: string; email: string; department: string; year: string; section: string; registered: number; verified: number
}

const students: StudentRecord[] = [
  { id: '1', name: 'Jeevan R', email: 'jeevan.r@citchennai.net', department: 'CSE', year: '3rd Year', section: 'A', registered: 8, verified: 6 },
  { id: '2', name: 'Kavin Raj', email: 'kavin.r@citchennai.net', department: 'AIDS', year: '3rd Year', section: 'B', registered: 5, verified: 4 },
  { id: '3', name: 'Harini S', email: 'harini.s@citchennai.net', department: 'IT', year: '2nd Year', section: 'A', registered: 3, verified: 3 },
  { id: '4', name: 'Yuvanaj G', email: 'yuvanaj.g@citchennai.net', department: 'CSE', year: '4th Year', section: 'A', registered: 12, verified: 10 },
  { id: '5', name: 'Pranav M', email: 'pranav.m@citchennai.net', department: 'CSE', year: '3rd Year', section: 'C', registered: 6, verified: 5 },
  { id: '6', name: 'Sneha R', email: 'sneha.r@citchennai.net', department: 'IT', year: '3rd Year', section: 'B', registered: 7, verified: 5 },
  { id: '7', name: 'Arun K', email: 'arun.k@citchennai.net', department: 'AIDS', year: '2nd Year', section: 'A', registered: 4, verified: 3 },
  { id: '8', name: 'Divya M', email: 'divya.m@citchennai.net', department: 'CSE', year: '1st Year', section: 'A', registered: 2, verified: 2 },
]

interface AdvisorRecord {
  id: string; name: string; email: string; department: string; assignedSections: string[]; pendingVerifications: number
}

const advisors: AdvisorRecord[] = [
  { id: '1', name: 'Dr. Priya Sharma', email: 'priya.sharma@citchennai.net', department: 'CSE', assignedSections: ['3A', '3B', '3C'], pendingVerifications: 4 },
  { id: '2', name: 'Mr. Arun Kumar', email: 'arun.kumar@citchennai.net', department: 'IT', assignedSections: ['2A', '2B'], pendingVerifications: 2 },
  { id: '3', name: 'Dr. Meena Raj', email: 'meena.raj@citchennai.net', department: 'AIDS', assignedSections: ['4A', '4B'], pendingVerifications: 7 },
  { id: '4', name: 'Dr. S. Rajkumar', email: 'rajkumar.s@citchennai.net', department: 'CSE', assignedSections: ['4A', '4C'], pendingVerifications: 3 },
  { id: '5', name: 'Ms. Lakshmi P', email: 'lakshmi.p@citchennai.net', department: 'IT', assignedSections: ['3A', '3B'], pendingVerifications: 5 },
]

interface WinnerRecord {
  id: string; studentName: string; email: string; competition: string; department: string; position: string; prize: string; date: string
}

const winners: WinnerRecord[] = [
  { id: '1', studentName: 'Jeevan R', email: 'jeevan.r@citchennai.net', competition: 'HackFusion 2025', department: 'CSE', position: '1st', prize: '₹50,000', date: '2025-06-15' },
  { id: '2', studentName: 'Kavin Raj', email: 'kavin.r@citchennai.net', competition: 'AI Innovation Challenge', department: 'AIDS', position: '2nd', prize: '₹25,000', date: '2025-05-20' },
  { id: '3', studentName: 'Harini S', email: 'harini.s@citchennai.net', competition: 'Code Blitz', department: 'IT', position: '1st', prize: '₹30,000', date: '2025-05-10' },
  { id: '4', studentName: 'Yuvanaj G', email: 'yuvanaj.g@citchennai.net', competition: 'Tech Summit Hackathon', department: 'CSE', position: '3rd', prize: '₹10,000', date: '2025-04-28' },
  { id: '5', studentName: 'Pranav M', email: 'pranav.m@citchennai.net', competition: 'IEEE Paper Presentation', department: 'CSE', position: '1st', prize: '₹15,000', date: '2025-04-12' },
  { id: '6', studentName: 'Sneha R', email: 'sneha.r@citchennai.net', competition: 'Web Development Bootcamp', department: 'IT', position: '2nd', prize: '₹5,000', date: '2025-06-01' },
  { id: '7', studentName: 'Arun K', email: 'arun.k@citchennai.net', competition: 'Data Science Workshop', department: 'AIDS', position: '3rd', prize: '₹2,000', date: '2025-05-25' },
]

let registrations: Registration[] = [
  makeReg('1', { userId: 'Jeevan R', competitionId: '1', competition: competitions[0], status: 'verified', registeredAt: '2025-06-01T00:00:00Z', verifiedAt: '2025-06-03T00:00:00Z', verificationMethod: 'screenshot', extractedConfirmationId: 'CONF-001' }),
  makeReg('2', { userId: 'Kavin Raj', competitionId: '2', competition: competitions[1], status: 'pending_verification', registeredAt: '2025-06-05T00:00:00Z' }),
  makeReg('3', { userId: 'Harini S', competitionId: '3', competition: competitions[2], status: 'verified', registeredAt: '2025-06-02T00:00:00Z', verifiedAt: '2025-06-04T00:00:00Z', verificationMethod: 'email', extractedEmail: 'harini.s@citchennai.net' }),
  makeReg('4', { userId: 'Yuvanaj G', competitionId: '4', competition: competitions[3], status: 'completed', registeredAt: '2025-05-20T00:00:00Z', verifiedAt: '2025-05-25T00:00:00Z', verificationMethod: 'screenshot', extractedConfirmationId: 'CONF-004' }),
  makeReg('5', { userId: 'Pranav M', competitionId: '5', competition: competitions[4], status: 'verified', registeredAt: '2025-06-10T00:00:00Z', verifiedAt: '2025-06-12T00:00:00Z', verificationMethod: 'manual' }),
  makeReg('6', { userId: 'Sneha R', competitionId: '6', competition: competitions[5], status: 'pending_verification', registeredAt: '2025-06-15T00:00:00Z' }),
  makeReg('7', { userId: 'Arun K', competitionId: '7', competition: competitions[6], status: 'rejected', registeredAt: '2025-06-08T00:00:00Z', verifiedAt: '2025-06-09T00:00:00Z', verificationMethod: 'screenshot', rejectionReason: 'Incomplete documents', notes: 'Missing confirmation email' }),
  makeReg('8', { userId: 'Divya M', competitionId: '1', competition: competitions[0], status: 'verified', registeredAt: '2025-06-12T00:00:00Z', verifiedAt: '2025-06-14T00:00:00Z', verificationMethod: 'email', extractedEmail: 'divya.m@citchennai.net' }),
  makeReg('9', { userId: 'Jeevan R', competitionId: '2', competition: competitions[1], status: 'pending_verification', registeredAt: '2025-06-14T00:00:00Z' }),
  makeReg('10', { userId: 'Kavin Raj', competitionId: '3', competition: competitions[2], status: 'verified', registeredAt: '2025-06-11T00:00:00Z', verifiedAt: '2025-06-13T00:00:00Z', verificationMethod: 'screenshot', extractedConfirmationId: 'CONF-010' }),
]

function getDashboardStats(): DashboardStats {
  return {
    totalCompetitions: competitions.length,
    totalRegistrations: students.reduce((sum, s) => sum + s.registered, 0),
    verifiedRegistrations: students.reduce((sum, s) => sum + s.verified, 0),
    verificationRate: Math.round((students.reduce((sum, s) => sum + s.verified, 0) / Math.max(students.reduce((sum, s) => sum + s.registered, 0), 1)) * 100),
    registrationsOverTime: [
      { date: '2025-05-12', count: 12 },
      { date: '2025-05-13', count: 18 },
      { date: '2025-05-14', count: 15 },
      { date: '2025-05-15', count: 25 },
      { date: '2025-05-16', count: 22 },
      { date: '2025-05-17', count: 30 },
      { date: '2025-05-18', count: 28 },
    ],
    topDepartments: [
      { name: 'CSE', count: 45 }, { name: 'IT', count: 32 }, { name: 'AIDS', count: 28 }, { name: 'ECE', count: 20 }, { name: 'MECH', count: 15 },
    ],
    recentVerified: registrations.filter(r => r.status === 'verified').slice(0, 5),
    pendingVerifications: registrations.filter(r => r.status === 'pending_verification').slice(0, 5),
  }
}

let nextId = 100

const departmentInfo = [
  { id: '1', name: 'CSE', fullName: 'Computer Science & Engineering', studentCount: 240, competitionCount: 18 },
  { id: '2', name: 'AIDS', fullName: 'Artificial Intelligence & Data Science', studentCount: 180, competitionCount: 14 },
  { id: '3', name: 'IT', fullName: 'Information Technology', studentCount: 160, competitionCount: 12 },
  { id: '4', name: 'ECE', fullName: 'Electronics & Communication Engineering', studentCount: 140, competitionCount: 10 },
  { id: '5', name: 'EEE', fullName: 'Electrical & Electronics Engineering', studentCount: 120, competitionCount: 8 },
  { id: '6', name: 'Mechanical', fullName: 'Mechanical Engineering', studentCount: 100, competitionCount: 6 },
]

const yearLabels: Record<string, string> = {
  '1st Year': '1', '2nd Year': '2', '3rd Year': '3', '4th Year': '4',
}

function getSectionLabel(student: StudentRecord): string {
  return `${yearLabels[student.year] || '?'}${student.section}`
}

export const mockStore = {
  getCompetitions: (filters?: { category?: string; search?: string }) => {
    let filtered = [...competitions]
    if (filters?.category && filters.category !== 'all') {
      filtered = filtered.filter(c => c.category === filters.category)
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter(c => c.title.toLowerCase().includes(q) || c.organizer.toLowerCase().includes(q))
    }
    return { data: filtered, total: filtered.length }
  },

  addCompetition: (data: { title: string; category: string; organizer: string; mode: string; scope: string; prizePool: string; registrationDeadline: string; description: string; shortDescription: string }) => {
    const newComp = makeComp(String(++nextId), {
      title: data.title, category: data.category as CompetitionCategory,
      organizer: data.organizer, mode: data.mode as CompetitionMode,
      scope: data.scope as CompetitionScope, prizePool: data.prizePool,
      registrationDeadline: data.registrationDeadline, description: data.description,
      shortDescription: data.shortDescription,
    })
    competitions = [newComp, ...competitions]
    return newComp
  },

  getStudents: () => [...students],

  addStudent: (data: { name: string; email: string; department: string; year: string; section: string }) => {
    const newStudent: StudentRecord = { ...data, id: String(++nextId), registered: 0, verified: 0 }
    students.push(newStudent)
    return newStudent
  },

  getAdvisors: () => [...advisors],

  addAdvisor: (data: { name: string; email: string; department: string; assignedSections: string[] }) => {
    const newAdvisor: AdvisorRecord = { ...data, id: String(++nextId), pendingVerifications: 0 }
    advisors.push(newAdvisor)
    return newAdvisor
  },

  getWinners: () => [...winners],

  addWinner: (data: { studentName: string; email: string; competition: string; department: string; position: string; prize: string; date: string }) => {
    const newWinner: WinnerRecord = { ...data, id: String(++nextId) }
    winners.push(newWinner)
    return newWinner
  },

  getRegistrations: (filters?: { status?: string; search?: string; page?: number; limit?: number }) => {
    let filtered = [...registrations]
    if (filters?.status && filters.status !== 'all') {
      filtered = filtered.filter(r => r.status === filters.status)
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter(r => r.userId.toLowerCase().includes(q))
    }
    const page = filters?.page || 1
    const limit = filters?.limit || 10
    const start = (page - 1) * limit
    const paged = filtered.slice(start, start + limit)
    return { data: paged, total: filtered.length }
  },

  getDashboardStats,

  getAnalytics: () => ({
    totalCompetitions: competitions.length,
    totalStudents: students.length,
    totalAdvisors: advisors.length,
    totalRegistrations: registrations.length,
    verifiedRate: Math.round((registrations.filter(r => r.status === 'verified' || r.status === 'completed').length / Math.max(registrations.length, 1)) * 100),
    pendingRate: Math.round((registrations.filter(r => r.status === 'pending_verification').length / Math.max(registrations.length, 1)) * 100),
  }),

  getDepartments: () => [...departmentInfo],

  getDepartment: (id: string) => departmentInfo.find(d => d.id === id) || null,

  getDepartmentSections: (deptName: string): string[] => {
    const deptStudents = students.filter(s => s.department === deptName)
    const sectionSet = new Set(deptStudents.map(getSectionLabel))
    const deptAdvisors = advisors.filter(a => a.department === deptName)
    deptAdvisors.forEach(a => a.assignedSections.forEach(s => sectionSet.add(s)))
    return Array.from(sectionSet).sort()
  },

  getStudentsBySection: (deptName: string, sectionLabel: string) => {
    return students.filter(s => {
      if (s.department !== deptName) return false
      return getSectionLabel(s) === sectionLabel
    })
  },

  getStudentsByDepartment: (deptName: string) => {
    return students.filter(s => s.department === deptName)
  },

  addSection: (deptName: string, sectionLabel: string): boolean => {
    const sectionStudents = students.filter(s => s.department === deptName)
    const existing = new Set(sectionStudents.map(getSectionLabel))
    const yearMap: Record<string, string> = { '1': '1st Year', '2': '2nd Year', '3': '3rd Year', '4': '4th Year' }
    const yearDigit = sectionLabel.charAt(0)
    const sectionChar = sectionLabel.charAt(1).toUpperCase()
    const yearLabel = yearMap[yearDigit]
    if (!yearLabel || !sectionChar) return false
    if (existing.has(sectionLabel)) return false
    students.push({
      id: String(++nextId), name: `New Student ${sectionLabel}`, email: `student.${sectionLabel.toLowerCase()}@citchennai.net`,
      department: deptName, year: yearLabel, section: sectionChar, registered: 0, verified: 0,
    })
    return true
  },
}

'use client'

import { useState } from 'react'
import { Dialog, Input } from '@comp-dash/design-system'

interface AddStudentModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: {
    name: string
    email: string
    department: string
    year: string
    section: string
  }) => void
}

const departments = ['CSE', 'IT', 'AIDS', 'ECE', 'EEE', 'MECH', 'CIVIL', 'AIML']
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']
const sections = ['A', 'B', 'C']

export function AddStudentModal({ open, onClose, onSubmit }: AddStudentModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('CSE')
  const [year, setYear] = useState('1st Year')
  const [section, setSection] = useState('A')

  const handleSubmit = () => {
    if (!name || !email) return
    onSubmit({ name, email, department, year, section })
    setName(''); setEmail(''); setDepartment('CSE'); setYear('1st Year'); setSection('A')
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Add Student"
      actions={[
        { label: 'Cancel', onClick: onClose, variant: 'secondary' },
        { label: 'Add Student', onClick: handleSubmit, variant: 'primary' },
      ]}
    >
      <div className="space-y-4">
        <Input label="Student Name" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@citchennai.net" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
          <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent">
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Year</label>
            <select value={year} onChange={e => setYear(e.target.value)} className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent">
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Section</label>
            <select value={section} onChange={e => setSection(e.target.value)} className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent">
              {sections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

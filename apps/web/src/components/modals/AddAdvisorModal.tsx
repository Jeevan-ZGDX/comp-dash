'use client'

import { useState } from 'react'
import { Dialog, Input } from '@comp-dash/design-system'

interface AddAdvisorModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: {
    name: string
    email: string
    department: string
    assignedSections: string[]
  }) => void
}

const departments = ['CSE', 'IT', 'AIDS', 'ECE', 'EEE', 'MECH', 'CIVIL', 'AIML']
const sectionOptions = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C']

export function AddAdvisorModal({ open, onClose, onSubmit }: AddAdvisorModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('CSE')
  const [sections, setSections] = useState<string[]>([])

  const toggleSection = (s: string) => {
    setSections(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const handleSubmit = () => {
    if (!name || !email) return
    onSubmit({ name, email, department, assignedSections: sections })
    setName(''); setEmail(''); setDepartment('CSE'); setSections([])
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Add Advisor"
      actions={[
        { label: 'Cancel', onClick: onClose, variant: 'secondary' },
        { label: 'Add Advisor', onClick: handleSubmit, variant: 'primary' },
      ]}
    >
      <div className="space-y-4">
        <Input label="Advisor Name" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@citchennai.net" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
          <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent">
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned Sections</label>
          <div className="flex flex-wrap gap-2">
            {sectionOptions.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSection(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sections.includes(s)
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  )
}

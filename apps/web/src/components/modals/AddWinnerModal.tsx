'use client'

import { useState } from 'react'
import { Dialog, Input } from '@comp-dash/design-system'

interface AddWinnerModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: {
    studentName: string
    email: string
    competition: string
    department: string
    position: string
    prize: string
    date: string
  }) => void
}

const departments = ['CSE', 'IT', 'AIDS', 'ECE', 'EEE', 'MECH', 'CIVIL', 'AIML']
const positions = ['1st', '2nd', '3rd']

export function AddWinnerModal({ open, onClose, onSubmit }: AddWinnerModalProps) {
  const [studentName, setStudentName] = useState('')
  const [email, setEmail] = useState('')
  const [competition, setCompetition] = useState('')
  const [department, setDepartment] = useState('CSE')
  const [position, setPosition] = useState('1st')
  const [prize, setPrize] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = () => {
    if (!studentName || !competition || !prize) return
    onSubmit({ studentName, email, competition, department, position, prize, date })
    setStudentName(''); setEmail(''); setCompetition('')
    setDepartment('CSE'); setPosition('1st'); setPrize(''); setDate(new Date().toISOString().split('T')[0])
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Add Winner"
      actions={[
        { label: 'Cancel', onClick: onClose, variant: 'secondary' },
        { label: 'Add Winner', onClick: handleSubmit, variant: 'primary' },
      ]}
    >
      <div className="space-y-4">
        <Input label="Student Name" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Full name" />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@citchennai.net" />
        <Input label="Competition" value={competition} onChange={e => setCompetition(e.target.value)} placeholder="Competition name" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
          <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent">
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Position</label>
            <select value={position} onChange={e => setPosition(e.target.value)} className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent">
              {positions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <Input label="Prize" value={prize} onChange={e => setPrize(e.target.value)} placeholder="e.g. ₹50,000" />
        </div>
        <Input label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
    </Dialog>
  )
}

'use client'

import { useState } from 'react'
import { Dialog, Input, Button } from '@comp-dash/design-system'

interface AddCompetitionModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: {
    title: string
    category: string
    organizer: string
    mode: string
    scope: string
    prizePool: string
    registrationDeadline: string
    description: string
    shortDescription: string
  }) => void
}

export function AddCompetitionModal({ open, onClose, onSubmit }: AddCompetitionModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('hackathon')
  const [organizer, setOrganizer] = useState('')
  const [mode, setMode] = useState('offline')
  const [scope, setScope] = useState('college')
  const [prizePool, setPrizePool] = useState('')
  const [deadline, setDeadline] = useState('')
  const [description, setDescription] = useState('')
  const [shortDesc, setShortDesc] = useState('')

  const handleSubmit = () => {
    if (!title || !organizer || !deadline) return
    onSubmit({ title, category, organizer, mode, scope, prizePool, registrationDeadline: deadline, description, shortDescription: shortDesc })
    setTitle(''); setCategory('hackathon'); setOrganizer(''); setMode('offline')
    setScope('college'); setPrizePool(''); setDeadline(''); setDescription(''); setShortDesc('')
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Add Competition"
      actions={[
        { label: 'Cancel', onClick: onClose, variant: 'secondary' },
        { label: 'Add Competition', onClick: handleSubmit, variant: 'primary' },
      ]}
    >
      <div className="space-y-4">
        <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter competition title" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent">
            <option value="hackathon">Hackathon</option>
            <option value="workshop">Workshop</option>
            <option value="internship">Internship</option>
            <option value="paper_presentation">Paper Presentation</option>
            <option value="project">Project</option>
            <option value="sports">Sports</option>
            <option value="cultural">Cultural</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Input label="Organizer" value={organizer} onChange={e => setOrganizer(e.target.value)} placeholder="Organizing body" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mode</label>
            <select value={mode} onChange={e => setMode(e.target.value)} className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent">
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Scope</label>
            <select value={scope} onChange={e => setScope(e.target.value)} className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent">
              <option value="college">College</option>
              <option value="state">State</option>
              <option value="national">National</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Prize Pool" value={prizePool} onChange={e => setPrizePool(e.target.value)} placeholder="e.g. ₹50,000" />
          <Input label="Registration Deadline" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
        </div>
        <Input label="Short Description" value={shortDesc} onChange={e => setShortDesc(e.target.value)} placeholder="Brief description" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Full description" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y" />
        </div>
      </div>
    </Dialog>
  )
}

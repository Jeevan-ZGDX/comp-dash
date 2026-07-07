'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Card, CardHeader, CardTitle, Button, Dialog, Input } from '@comp-dash/design-system'
import { ArrowLeft, Plus, Users, GraduationCap } from 'lucide-react'
import { mockStore } from '@/lib/mockData'

export default function DepartmentDetailPage() {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const dept = mockStore.getDepartment(params.id as string)
  const [addOpen, setAddOpen] = useState(false)
  const [newSection, setNewSection] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  if (!dept) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">Department not found</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push('/departments')}>
          Back to Departments
        </Button>
      </div>
    )
  }

  const sections = mockStore.getDepartmentSections(dept.name)
  const deptStudents = mockStore.getStudentsByDepartment(dept.name)

  const handleAddSection = () => {
    const label = newSection.trim().toUpperCase()
    if (!label || !/^[1-4][A-Z]$/.test(label)) return
    const added = mockStore.addSection(dept.name, label)
    if (added) {
      setRefreshKey(k => k + 1)
      setNewSection('')
      setAddOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push('/departments')} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{dept.name}</h1>
          <p className="text-sm text-gray-500">{dept.fullName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card padding="md">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-accent" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{deptStudents.length}</p>
              <p className="text-sm text-gray-500">Students</p>
            </div>
          </div>
        </Card>
        <Card padding="md">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-accent" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{sections.length}</p>
              <p className="text-sm text-gray-500">Sections</p>
            </div>
          </div>
        </Card>
        <Card padding="md">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-accent" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{dept.competitionCount}</p>
              <p className="text-sm text-gray-500">Competitions</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Sections</h2>
        <Button variant="primary" size="sm" onClick={() => setAddOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Section
        </Button>
      </div>

      {sections.length === 0 ? (
        <Card padding="lg">
          <div className="text-center py-8 text-gray-500">
            <p>No sections yet. Add a section to get started.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sections.map((section) => {
            const sectionStudents = mockStore.getStudentsBySection(dept.name, section)
            return (
              <Link key={section} href={`/departments/${params.id}/sections/${section}`}>
                <Card variant="interactive" padding="lg">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-accent">{section}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Class {section}</p>
                    <p className="text-xs text-gray-500 mt-1">{sectionStudents.length} Students</p>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}

      <Dialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Section"
        description={`Add a new section to ${dept.name} department`}
        actions={[
          { label: 'Cancel', onClick: () => setAddOpen(false), variant: 'secondary' },
          { label: 'Add Section', onClick: handleAddSection, variant: 'primary' },
        ]}
      >
        <Input
          label="Section Code"
          value={newSection}
          onChange={e => setNewSection(e.target.value)}
          placeholder="e.g. 2A, 3B, 4C"
          helperText="Format: year digit + letter (e.g. 2A for 2nd Year Section A)"
        />
      </Dialog>
    </div>
  )
}

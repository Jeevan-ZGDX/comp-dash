'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button, SearchBar, Avatar, Badge } from '@comp-dash/design-system'
import { Plus, Download } from 'lucide-react'
import { mockStore } from '@/lib/mockData'
import { exportToCSV } from '@/lib/export'
import { AddStudentModal } from '@/components/modals/AddStudentModal'

export default function StudentsPage() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const students = mockStore.getStudents()
  const filtered = search
    ? students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase()))
    : students

  const handleAdd = (data: Parameters<typeof mockStore.addStudent>[0]) => {
    mockStore.addStudent(data)
    setRefreshKey(k => k + 1)
    setAddOpen(false)
  }

  const handleExport = () => {
    exportToCSV(
      filtered.map(s => ({ ...s })),
      'students',
      [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'department', label: 'Department' },
        { key: 'year', label: 'Year' },
        { key: 'section', label: 'Section' },
        { key: 'registered', label: 'Registered' },
        { key: 'verified', label: 'Verified' },
      ]
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('sidebar.students')}</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="primary" size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <Card padding="md">
        <SearchBar
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Student</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Department</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Year / Section</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Registered</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Verified</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={student.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><Badge variant="primary" size="sm">{student.department}</Badge></td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.year} - {student.section}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.registered}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.verified}</td>
                  <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm">View</Button></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <AddStudentModal open={addOpen} onClose={() => setAddOpen(false)} onSubmit={handleAdd} />
    </div>
  )
}

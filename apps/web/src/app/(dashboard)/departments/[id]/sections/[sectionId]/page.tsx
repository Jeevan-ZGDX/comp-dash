'use client'

import { useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Card, CardHeader, CardTitle, Button, Avatar, Badge } from '@comp-dash/design-system'
import { ArrowLeft, Users } from 'lucide-react'
import { mockStore } from '@/lib/mockData'
import { exportToCSV } from '@/lib/export'

export default function SectionStudentsPage() {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const dept = mockStore.getDepartment(params.id as string)
  const sectionLabel = params.sectionId as string

  const students = dept ? mockStore.getStudentsBySection(dept.name, sectionLabel) : []
  const deptName = dept?.name || 'Unknown'

  const handleExport = () => {
    exportToCSV(
      students.map(s => ({ name: s.name, email: s.email, department: s.department, year: s.year, section: s.section, registered: s.registered, verified: s.verified })),
      `section-${sectionLabel}-students`,
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
      <div className="flex items-center gap-4">
        <button onClick={() => router.push(`/departments/${params.id}`)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class {sectionLabel}</h1>
          <p className="text-sm text-gray-500">{deptName} Department — {students.length} Students</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{students.length} students enrolled</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
          Export
        </Button>
      </div>

      {students.length === 0 ? (
        <Card padding="lg">
          <div className="text-center py-12 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium text-gray-400">No students in this section</p>
            <p className="text-sm mt-1">Add students from the Students page</p>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Student</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Year</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Section</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Registered</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Verified</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
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
                    <td className="px-6 py-4 text-sm text-gray-600">{student.year}</td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" size="sm">{student.section}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.registered}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.verified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

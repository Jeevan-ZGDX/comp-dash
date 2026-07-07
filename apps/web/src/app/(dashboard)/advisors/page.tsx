'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button, SearchBar, Avatar, Badge } from '@comp-dash/design-system'
import { Plus, Download } from 'lucide-react'
import { mockStore } from '@/lib/mockData'
import { exportToCSV } from '@/lib/export'
import { AddAdvisorModal } from '@/components/modals/AddAdvisorModal'

export default function AdvisorsPage() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const advisors = mockStore.getAdvisors()
  const filtered = search
    ? advisors.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()) || a.department.toLowerCase().includes(search.toLowerCase()))
    : advisors

  const handleAdd = (data: Parameters<typeof mockStore.addAdvisor>[0]) => {
    mockStore.addAdvisor(data)
    setRefreshKey(k => k + 1)
    setAddOpen(false)
  }

  const handleExport = () => {
    exportToCSV(
      filtered.map(a => ({ ...a, assignedSections: a.assignedSections.join(' ') })),
      'advisors',
      [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'department', label: 'Department' },
        { key: 'assignedSections', label: 'Assigned Sections' },
        { key: 'pendingVerifications', label: 'Pending Verifications' },
      ]
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('sidebar.advisors')}</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="primary" size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Advisor
          </Button>
        </div>
      </div>

      <Card padding="md">
        <SearchBar
          placeholder="Search advisors..."
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
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Advisor</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Department</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Assigned Sections</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Pending Verifications</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((advisor) => (
                <tr key={advisor.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={advisor.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{advisor.name}</p>
                        <p className="text-xs text-gray-500">{advisor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="primary" size="sm">{advisor.department}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {advisor.assignedSections.map((section) => (
                        <Badge key={section} variant="secondary" size="sm">{section}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{advisor.pendingVerifications}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">No advisors found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <AddAdvisorModal open={addOpen} onClose={() => setAddOpen(false)} onSubmit={handleAdd} />
    </div>
  )
}

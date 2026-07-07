'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button, SearchBar, StatusBadge } from '@comp-dash/design-system'
import { Download } from 'lucide-react'
import type { RegistrationStatus } from '@comp-dash/types'
import { mockStore } from '@/lib/mockData'
import { exportToCSV } from '@/lib/export'

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending_verification' },
  { label: 'Verified', value: 'verified' },
  { label: 'Completed', value: 'completed' },
  { label: 'Rejected', value: 'rejected' },
]

export default function RegistrationsPage() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [page, setPage] = useState(1)

  const result = mockStore.getRegistrations({
    status: selectedStatus === 'all' ? undefined : selectedStatus,
    search: search || undefined,
    page,
    limit: 10,
  })

  const handleExport = () => {
    exportToCSV(
      result.data.map(r => ({ student: r.userId, competition: r.competition.title, status: r.status, registeredOn: r.registeredAt, verifiedOn: r.verifiedAt || '-' })),
      'registrations',
      [
        { key: 'student', label: 'Student' },
        { key: 'competition', label: 'Competition' },
        { key: 'status', label: 'Status' },
        { key: 'registeredOn', label: 'Registered On' },
        { key: 'verifiedOn', label: 'Verified On' },
      ]
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('sidebar.registrations')}</h1>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <Card padding="md">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search registrations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
            />
          </div>
          <div className="flex gap-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => { setSelectedStatus(status.value); setPage(1) }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedStatus === status.value
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Student</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Competition</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Registered On</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Verified On</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {result.data.map((reg) => (
                <tr key={reg.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{reg.userId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{reg.competition.title}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={reg.status as 'pending' | 'verified' | 'completed' | 'rejected'} size="sm" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(reg.registeredAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {reg.verifiedAt ? new Date(reg.verifiedAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
              {result.data.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">No registrations found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {result.total > 10 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, result.total)} of {result.total}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(result.total / 10)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

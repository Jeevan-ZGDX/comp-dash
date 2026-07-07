'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button, Avatar, Badge } from '@comp-dash/design-system'
import { Trophy, Download, Plus } from 'lucide-react'
import { mockStore } from '@/lib/mockData'
import { exportToCSV } from '@/lib/export'
import { AddWinnerModal } from '@/components/modals/AddWinnerModal'

const positionColors: Record<string, 'warning' | 'secondary' | 'primary'> = {
  '1st': 'warning',
  '2nd': 'secondary',
  '3rd': 'primary',
}

export default function WinnersPage() {
  const { t } = useTranslation()
  const [addOpen, setAddOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const winners = mockStore.getWinners()

  const handleAdd = (data: Parameters<typeof mockStore.addWinner>[0]) => {
    mockStore.addWinner(data)
    setRefreshKey(k => k + 1)
    setAddOpen(false)
  }

  const handleExport = () => {
    exportToCSV(
      winners.map(w => ({ ...w })),
      'winners',
      [
        { key: 'studentName', label: 'Student Name' },
        { key: 'email', label: 'Email' },
        { key: 'competition', label: 'Competition' },
        { key: 'department', label: 'Department' },
        { key: 'position', label: 'Position' },
        { key: 'prize', label: 'Prize' },
        { key: 'date', label: 'Date' },
      ]
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('sidebar.winners')}</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="primary" size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Winner
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Student</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Competition</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Department</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Position</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Prize</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner) => (
                <tr key={winner.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={winner.studentName} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{winner.studentName}</p>
                        <p className="text-xs text-gray-500">{winner.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-900">{winner.competition}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="primary" size="sm">{winner.department}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={positionColors[winner.position] || 'primary'} size="sm">{winner.position}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{winner.prize}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(winner.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {winners.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">No winners recorded</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <AddWinnerModal open={addOpen} onClose={() => setAddOpen(false)} onSubmit={handleAdd} />
    </div>
  )
}

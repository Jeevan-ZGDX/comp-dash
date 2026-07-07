'use client'

import { useTranslation } from 'react-i18next'
import { Card, Button, Badge } from '@comp-dash/design-system'
import { Download, FileText } from 'lucide-react'
import { exportToCSV } from '@/lib/export'

const mockAuditLogs = [
  { id: '1', timestamp: '2025-07-03 14:32:10', user: 'Dr. Priya Sharma', action: 'Verified', resource: 'Registration #1247', details: 'Verified registration for HackFusion 2025' },
  { id: '2', timestamp: '2025-07-03 13:15:45', user: 'Admin', action: 'Created', resource: 'Competition #89', details: 'Created new competition: AI Innovation Challenge' },
  { id: '3', timestamp: '2025-07-03 11:20:30', user: 'Mr. Arun Kumar', action: 'Rejected', resource: 'Registration #1239', details: 'Rejected registration - incomplete documents' },
  { id: '4', timestamp: '2025-07-02 16:45:00', user: 'Admin', action: 'Updated', resource: 'Department CSE', details: 'Updated department advisor assignment' },
  { id: '5', timestamp: '2025-07-02 10:30:15', user: 'Dr. Meena Raj', action: 'Verified', resource: 'Registration #1235', details: 'Verified registration for Code Blitz' },
  { id: '6', timestamp: '2025-07-01 15:10:22', user: 'Admin', action: 'Deleted', resource: 'Competition #85', details: 'Removed cancelled workshop competition' },
  { id: '7', timestamp: '2025-07-01 09:05:40', user: 'Mr. Arun Kumar', action: 'Verified', resource: 'Registration #1228', details: 'Verified registration for Tech Summit' },
  { id: '8', timestamp: '2025-06-30 14:20:18', user: 'Admin', action: 'Created', resource: 'Advisor #12', details: 'Added new advisor: Dr. Meena Raj' },
]

const actionColors: Record<string, 'success' | 'primary' | 'danger' | 'secondary'> = {
  Verified: 'success',
  Created: 'primary',
  Rejected: 'danger',
  Updated: 'secondary',
  Deleted: 'danger',
}

export default function AuditPage() {
  const { t } = useTranslation()

  const handleExport = () => {
    exportToCSV(
      mockAuditLogs.map(l => ({ ...l })),
      'audit-logs',
      [
        { key: 'timestamp', label: 'Timestamp' },
        { key: 'user', label: 'User' },
        { key: 'action', label: 'Action' },
        { key: 'resource', label: 'Resource' },
        { key: 'details', label: 'Details' },
      ]
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('sidebar.auditLogs')}</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Timestamp</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">User</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Action</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Resource</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {mockAuditLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{log.timestamp}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.user}</td>
                  <td className="px-6 py-4">
                    <Badge variant={actionColors[log.action] || 'primary'} size="sm">{log.action}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{log.resource}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StatCard, Card, CardHeader, CardTitle, Skeleton } from '@comp-dash/design-system'
import { StatCardSkeleton } from '@comp-dash/design-system'
import { RegistrationsChart } from '@/components/dashboard/RegistrationsChart'
import { TopDepartments } from '@/components/dashboard/TopDepartments'
import { RecentVerifiedTable } from '@/components/dashboard/RecentVerifiedTable'
import { PendingVerificationsTable } from '@/components/dashboard/PendingVerificationsTable'
import { Trophy, Users, CheckCircle, TrendingUp, Download, Calendar } from 'lucide-react'
import { mockStore } from '@/lib/mockData'
import { exportToCSV } from '@/lib/export'

export default function DashboardPage() {
  const { t } = useTranslation()
  const [dateRange] = useState({
    start: '2025-05-12',
    end: '2025-05-18',
  })

  const stats = mockStore.getDashboardStats()

  const handleExport = () => {
    exportToCSV(
      stats.registrationsOverTime.map(r => ({ ...r })),
      'dashboard-registrations',
      [
        { key: 'date', label: 'Date' },
        { key: 'count', label: 'Registrations' },
      ]
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {t('dashboard.dateRange', { start: dateRange.start, end: dateRange.end })}
            </span>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{t('dashboard.export')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('dashboard.totalCompetitions')}
          value={stats.totalCompetitions}
          change={12}
          changeLabel={t('dashboard.fromLastWeek')}
          icon={<Trophy className="w-5 h-5" />}
        />
        <StatCard
          title={t('dashboard.totalRegistrations')}
          value={stats.totalRegistrations}
          change={18}
          changeLabel={t('dashboard.fromLastWeek')}
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          title={t('dashboard.verifiedRegistrations')}
          value={stats.verifiedRegistrations}
          change={15}
          changeLabel={t('dashboard.fromLastWeek')}
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <StatCard
          title={t('dashboard.verificationRate')}
          value={`${stats.verificationRate}%`}
          change={5}
          changeLabel={t('dashboard.fromLastWeek')}
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.registrationsOverTime')}</CardTitle>
          </CardHeader>
          <div className="mt-4">
            <RegistrationsChart data={stats.registrationsOverTime} />
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.topDepartments')}</CardTitle>
          </CardHeader>
          <div className="mt-4">
            <TopDepartments data={stats.topDepartments} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentVerifiedTable data={stats.recentVerified} />
        <PendingVerificationsTable data={stats.pendingVerifications} />
      </div>
    </div>
  )
}

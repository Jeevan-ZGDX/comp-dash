'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Card, CardHeader, CardTitle } from '@comp-dash/design-system'
import { Users, Trophy } from 'lucide-react'
import { mockStore } from '@/lib/mockData'

export default function DepartmentsPage() {
  const { t } = useTranslation()
  const departments = mockStore.getDepartments()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('sidebar.departments')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <Link key={dept.id} href={`/departments/${dept.id}`}>
            <Card variant="interactive" padding="lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{dept.name}</CardTitle>
                  <span className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 font-bold text-sm">
                    {dept.name.slice(0, 2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{dept.fullName}</p>
              </CardHeader>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{dept.studentCount} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{dept.competitionCount} Competitions</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

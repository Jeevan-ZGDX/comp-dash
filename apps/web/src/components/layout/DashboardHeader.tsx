'use client'

import { Menu, Bell, Search, LogOut } from 'lucide-react'
import { useUser, useClerk } from '@clerk/nextjs'
import { Avatar } from '@comp-dash/design-system'

interface DashboardHeaderProps {
  onMenuToggle: () => void
}

export function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 h-10 pl-10 pr-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
          </button>
          <button
            onClick={() => signOut({ redirectUrl: '/sign-in' })}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
          <Avatar name={user?.fullName || 'Admin'} size="sm" />
        </div>
      </div>
    </header>
  )
}

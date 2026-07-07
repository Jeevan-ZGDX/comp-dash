'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUser, useClerk } from '@clerk/nextjs'
import { cn } from '@comp-dash/design-system'
import { Avatar } from '@comp-dash/design-system'
import {
  LayoutDashboard,
  Trophy,
  ClipboardList,
  Users,
  GraduationCap,
  Building2,
  Medal,
  BarChart3,
  Bell,
  Settings,
  FileText,
  LogOut,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Competitions', icon: Trophy, href: '/competitions' },
  { label: 'Registrations', icon: ClipboardList, href: '/registrations' },
  { label: 'Students', icon: Users, href: '/students' },
  { label: 'Advisors', icon: GraduationCap, href: '/advisors' },
  { label: 'Departments', icon: Building2, href: '/departments' },
  { label: 'Winners', icon: Medal, href: '/winners' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { label: 'Notifications', icon: Bell, href: '/notifications' },
  { label: 'Settings', icon: Settings, href: '/settings' },
  { label: 'Audit Logs', icon: FileText, href: '/audit' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <span className="text-lg font-bold text-accent">C</span>
          </div>
          <span className="text-lg font-bold text-gray-900">Comp-Dash</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn('w-5 h-5', isActive ? 'text-accent' : 'text-gray-400')}
                />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User Card */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2">
            <Avatar name={user?.fullName || 'Admin'} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.fullName || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.primaryEmailAddress?.emailAddress || ''}
              </p>
            </div>
            <button
              onClick={() => signOut({ redirectUrl: '/sign-in' })}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

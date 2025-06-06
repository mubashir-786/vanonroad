'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { signOutAdmin } from '@/lib/auth';
import { useAuth } from '@/contexts/auth-context';
import { 
  LogOut, 
  User, 
  MessageSquare, 
  Package, 
  Menu, 
  X,
  Home,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function AdminSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutAdmin();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: pathname === '/admin'
    },
    {
      name: 'Inventory',
      href: '/admin/inventory',
      icon: Package,
      current: pathname === '/admin/inventory' || pathname.startsWith('/admin/add') || pathname.startsWith('/admin/edit')
    },
    {
      name: 'Messages',
      href: '/admin/messages',
      icon: MessageSquare,
      current: pathname === '/admin/messages'
    },
    {
      name: 'Vehicle Makes',
      href: '/admin/makes',
      icon: Settings,
      current: pathname === '/admin/makes'
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b">
        <div className="w-28 h-10 relative">
          <Image
            src="/van_on_road_logo.svg"
            alt="Van On Road"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
              item.current
                ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/20 dark:text-amber-100'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}

        {/* Landing Page Link */}
        <Link
          href="/"
          onClick={() => setIsMobileOpen(false)}
          className="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Home className="mr-3 h-5 w-5" />
          Landing Page
        </Link>
      </nav>

      {/* User Info & Sign Out */}
      <div className="border-t px-4 py-4 space-y-4">
        <div className="flex items-center px-4 py-2">
          <User className="h-4 w-4 mr-2 text-slate-500" />
          <span className="text-sm text-slate-600 dark:text-slate-400 truncate">
            {user?.email}
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white dark:bg-slate-800"
        >
          {isMobileOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r transform transition-transform duration-200 ease-in-out",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-slate-900 border-r">
        <SidebarContent />
      </div>
    </>
  );
}
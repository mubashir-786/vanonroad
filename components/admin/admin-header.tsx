'use client';

import { Button } from '@/components/ui/button';
import { signOutAdmin } from '@/lib/auth';
import { useAuth } from '@/contexts/auth-context';
import { LogOut, User, MessageSquare, Package } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminHeader() {
  const { user } = useAuth();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOutAdmin();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="border-b bg-white dark:bg-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-playfair">Admin Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your inventory and settings
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2">
            <Link href="/admin">
              <Button 
                variant={pathname === '/admin' ? 'default' : 'ghost'} 
                size="sm"
              >
                <Package className="mr-2 h-4 w-4" />
                Inventory
              </Button>
            </Link>
            <Link href="/admin/messages">
              <Button 
                variant={pathname === '/admin/messages' ? 'default' : 'ghost'} 
                size="sm"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
          </nav>
          
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            <span>{user?.email}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
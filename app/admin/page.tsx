import { AuthGuard } from '@/components/admin/auth-guard';
import { AdminLayout } from '@/components/admin/admin-layout';
import { InventoryList } from '@/components/admin/inventory-list';
import { Button } from '@/components/ui/button';
import { Plus, BarChart3, Package, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-8">
          {/* Dashboard Header */}
          <div className="text-center lg:text-left mt-12 lg:mt-0">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Admin <span className="text-amber-500">Dashboard</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl text-lg">
              Manage your motorhome inventory and customer messages
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-amber-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Total Inventory
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    -
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Unread Messages
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    -
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Available Units
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/admin/add">
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Vehicle
                </Button>
              </Link>
              <Link href="/admin/messages">
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Messages
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  View Landing Page
                </Button>
              </Link>
            </div>
          </div>

          {/* Inventory List */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">Recent Inventory</h2>
            <InventoryList />
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { AuthGuard } from '@/components/admin/auth-guard';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Plus, BarChart3, Package, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { getInventoryItems } from '@/lib/api/inventory';
import { getContactMessages } from '@/lib/api/contact';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalInventory: 0,
    unreadMessages: 0,
    availableUnits: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      
      // Load inventory stats
      const { items } = await getInventoryItems();
      const availableItems = items.filter(item => item.status === 'available');
      
      // Load message stats
      const messages = await getContactMessages();
      const unreadMessages = messages.filter(msg => msg.status === 'unread');
      
      setStats({
        totalInventory: items.length,
        unreadMessages: unreadMessages.length,
        availableUnits: availableItems.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

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
                    {loading ? '-' : stats.totalInventory}
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
                    {loading ? '-' : stats.unreadMessages}
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
                    {loading ? '-' : stats.availableUnits}
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
              <Link href="/admin/inventory">
                <Button variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Manage Inventory
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

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Inventory Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Available:</span>
                    <span className="font-medium text-green-600">{loading ? '-' : stats.availableUnits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Units:</span>
                    <span className="font-medium">{loading ? '-' : stats.totalInventory}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Messages</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Unread:</span>
                    <span className="font-medium text-red-600">{loading ? '-' : stats.unreadMessages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Needs Attention:</span>
                    <span className="font-medium">{loading ? '-' : (stats.unreadMessages > 0 ? 'Yes' : 'No')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
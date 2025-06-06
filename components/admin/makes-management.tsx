'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { 
  getMakes, 
  createMake, 
  updateMake, 
  deleteMake, 
  Make 
} from '@/lib/api/makes';

export function MakesManagement() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMake, setEditingMake] = useState<Make | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    displayName: ''
  });

  useEffect(() => {
    loadMakes();
  }, []);

  const loadMakes = async () => {
    try {
      setLoading(true);
      setError('');
      const makesList = await getMakes();
      setMakes(makesList);
    } catch (error: any) {
      setError(error.message || 'Failed to load makes');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setActionLoading('add');
      await createMake({
        name: formData.name.toLowerCase(),
        displayName: formData.displayName
      });
      setFormData({ name: '', displayName: '' });
      setIsAddDialogOpen(false);
      await loadMakes();
    } catch (error: any) {
      setError(error.message || 'Failed to add make');
    } finally {
      setActionLoading(null);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMake) return;

    try {
      setActionLoading('edit');
      await updateMake(editingMake.id!, {
        name: formData.name.toLowerCase(),
        displayName: formData.displayName
      });
      setFormData({ name: '', displayName: '' });
      setIsEditDialogOpen(false);
      setEditingMake(null);
      await loadMakes();
    } catch (error: any) {
      setError(error.message || 'Failed to update make');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setActionLoading(id);
      await deleteMake(id);
      await loadMakes();
    } catch (error: any) {
      setError(error.message || 'Failed to delete make');
    } finally {
      setActionLoading(null);
    }
  };

  const openEditDialog = (make: Make) => {
    setEditingMake(make);
    setFormData({
      name: make.name,
      displayName: make.displayName
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', displayName: '' });
    setEditingMake(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Vehicle Makes</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Manage vehicle makes for inventory
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-500 hover:bg-amber-600" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Make
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Make</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="add-name">Internal Name</Label>
                <Input
                  id="add-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. mercedes"
                  required
                />
                <p className="text-xs text-slate-500">
                  Used internally (lowercase, no spaces)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="add-display-name">Display Name</Label>
                <Input
                  id="add-display-name"
                  value={formData.displayName}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                  placeholder="e.g. Mercedes-Benz"
                  required
                />
                <p className="text-xs text-slate-500">
                  Shown to users in forms and listings
                </p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-amber-500 hover:bg-amber-600"
                  disabled={actionLoading === 'add'}
                >
                  {actionLoading === 'add' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Make'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Display Name</TableHead>
              <TableHead>Internal Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {makes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No makes found. Add your first make to get started.
                </TableCell>
              </TableRow>
            ) : (
              makes.map((make) => (
                <TableRow key={make.id}>
                  <TableCell className="font-medium">{make.displayName}</TableCell>
                  <TableCell className="font-mono text-sm">{make.name}</TableCell>
                  <TableCell>
                    {make.createdAt ? new Intl.DateTimeFormat('en-GB').format(make.createdAt) : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(make)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-600"
                            disabled={actionLoading === make.id}
                          >
                            {actionLoading === make.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the
                              make "{make.displayName}". Note: You cannot delete a make that is
                              being used by inventory items.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(make.id!)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Make</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Internal Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. mercedes"
                required
              />
              <p className="text-xs text-slate-500">
                Used internally (lowercase, no spaces)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-display-name">Display Name</Label>
              <Input
                id="edit-display-name"
                value={formData.displayName}
                onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                placeholder="e.g. Mercedes-Benz"
                required
              />
              <p className="text-xs text-slate-500">
                Shown to users in forms and listings
              </p>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-amber-500 hover:bg-amber-600"
                disabled={actionLoading === 'edit'}
              >
                {actionLoading === 'edit' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Make'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
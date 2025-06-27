import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { menuItemSchema } from '../../types/menu';
import type { MenuItem } from '../../types/menu';
import { useGetMenuItems, useAddMenuItem, useEditMenuItem, useDeleteMenuItem, useAddMenuItemIngredients } from '../../hooks/useMenuItems';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Modal } from '../../components/Modal';
import { FormField } from '../../components/FormField';
import { toast } from '../../components/ui/useToast';
import { AnimatePresence, motion } from 'framer-motion';

// This is a fully refactored Menu Management page
export default function MenuManagement() {
  const { data: menuItems, isLoading, isError } = useGetMenuItems();
  const addMenuItem = useAddMenuItem();
  const editMenuItem = useEditMenuItem();
  const deleteMenuItem = useDeleteMenuItem();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);

  const form = useForm<Omit<MenuItem, 'id' | 'StoreItems'>>({
    resolver: zodResolver(menuItemSchema.omit({ id: true, StoreItems: true })),
    defaultValues: { name: '', category: '', price: 0 },
  });

  const onSubmit = (values: Omit<MenuItem, 'id' | 'StoreItems'>) => {
    if (editing) {
      editMenuItem.mutate(
        { ...editing, ...values },
        {
          onSuccess: () => {
            toast({ title: 'Menu item updated', variant: 'success' });
            setModalOpen(false);
            setEditing(null);
            form.reset();
          },
          onError: () => toast({ title: 'Failed to update menu item', variant: 'destructive' }),
        }
      );
    } else {
      addMenuItem.mutate(values, {
        onSuccess: () => {
          toast({ title: 'Menu item added', variant: 'success' });
          setModalOpen(false);
          form.reset();
        },
        onError: () => toast({ title: 'Failed to add menu item', variant: 'destructive' }),
      });
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditing(item);
    setModalOpen(true);
    form.reset({ name: item.name, category: item.category, price: item.price });
  };

  const handleDelete = (item: MenuItem) => {
    if (window.confirm(`Delete menu item "${item.name}"?`)) {
      deleteMenuItem.mutate(item.id!, {
        onSuccess: () => toast({ title: 'Menu item deleted', variant: 'success' }),
        onError: () => toast({ title: 'Failed to delete menu item', variant: 'destructive' }),
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>Add Menu Item</Button>
      </div>
      {isError && <div className="text-red-500">Failed to load menu items.</div>}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <AnimatePresence>
            {menuItems?.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <div className="text-sm text-muted-foreground mb-1">Category: {item.category}</div>
                    <div className="text-sm font-medium">Price: ${item.price}</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item)}>Delete</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <Modal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) {
            setEditing(null);
            form.reset();
          }
        }}
        title={editing ? 'Edit Menu Item' : 'Add Menu Item'}
        footer={
          <div className="flex gap-2">
            <Button type="submit" form="menu-form" loading={addMenuItem.isLoading || editMenuItem.isLoading}>
              {editing ? 'Update' : 'Create'}
            </Button>
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        }
      >
        <form id="menu-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Name"
            error={form.formState.errors.name?.message}
            {...form.register('name')}
            placeholder="e.g. Margherita Pizza"
            autoFocus
          />
          <FormField
            label="Category"
            error={form.formState.errors.category?.message}
            {...form.register('category')}
            placeholder="e.g. Pizza"
          />
          <FormField
            label="Price"
            type="number"
            step="0.01"
            error={form.formState.errors.price?.message}
            {...form.register('price', { valueAsNumber: true })}
            placeholder="e.g. 9.99"
          />
        </form>
      </Modal>
    </div>
  );
}

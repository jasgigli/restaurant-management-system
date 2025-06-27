import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useToast } from "../../components/ui/useToast";
import {
  useAddMenuItem,
  useAddMenuItemIngredients,
  useGetMenuItems,
} from "../../hooks/useMenuItems";
import { useGetStoreItems } from "../../hooks/useStoreItems";

const Menu = () => {
  const { data: menuItems, isLoading, isError } = useGetMenuItems();
  const { data: storeItems } = useGetStoreItems();
  const addMenuItem = useAddMenuItem();
  const addIngredients = useAddMenuItemIngredients();
  const toast = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", price: 0 });
  const [showIngredients, setShowIngredients] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);

  const handleMenuItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMenuItem.mutate(form, {
      onSuccess: () => {
        setShowForm(false);
        setForm({ name: "", category: "", price: 0 });
        toast("Menu item added", "success");
      },
      onError: () => toast("Failed to add menu item", "error"),
    });
  };

  const handleAddIngredients = (e: React.FormEvent) => {
    e.preventDefault();
    addIngredients.mutate(
      { id: selectedMenuItem.id, ingredients },
      {
        onSuccess: () => {
          setShowIngredients(false);
          setIngredients([]);
          setSelectedMenuItem(null);
          toast("Ingredients updated", "success");
        },
        onError: () => toast("Failed to update ingredients", "error"),
      }
    );
  };

  if (isError) toast("Failed to load menu items", "error");
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menu</h1>
        <Button onClick={() => setShowForm(true)}>Add Menu Item</Button>
      </div>
      {showForm && (
        <Card className="mb-6 p-6 max-w-xl">
          <form onSubmit={handleMenuItemSubmit} className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Input
                name="name"
                label="Name"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="flex-1"
              />
              <Input
                name="category"
                label="Category"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                className="flex-1"
              />
              <Input
                name="price"
                label="Price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                required
                className="flex-1"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
      <div className="flex flex-wrap gap-6">
        {menuItems?.map((item: any) => (
          <Card
            key={item.id}
            className="min-w-[220px] max-w-xs p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              <div className="text-sm text-muted-foreground mb-1">
                Category: {item.category}
              </div>
              <div className="text-sm font-medium">Price: {item.price}</div>
            </div>
            <Button
              className="mt-4"
              variant="ghost"
              onClick={() => {
                setSelectedMenuItem(item);
                setShowIngredients(true);
                setIngredients(
                  item.StoreItems?.map((si: any) => ({
                    storeItemId: si.id,
                    quantity_used: si.MenuItemIngredient.quantity_used,
                  })) || []
                );
              }}
            >
              Manage Ingredients
            </Button>
          </Card>
        ))}
      </div>
      {showIngredients && selectedMenuItem && (
        <Card className="mt-6 p-6 max-w-xl">
          <form onSubmit={handleAddIngredients} className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">
              Ingredients for {selectedMenuItem.name}
            </h3>
            {storeItems?.map((si: any) => (
              <div key={si.id} className="flex items-center gap-2 mb-2">
                <label className="w-32">{si.name}</label>
                <Input
                  type="number"
                  min={0}
                  value={
                    ingredients.find((ing) => ing.storeItemId === si.id)
                      ?.quantity_used || 0
                  }
                  onChange={(e) => {
                    const qty = Number(e.target.value);
                    setIngredients((prev) => {
                      const exists = prev.find(
                        (ing) => ing.storeItemId === si.id
                      );
                      if (exists) {
                        return prev.map((ing) =>
                          ing.storeItemId === si.id
                            ? { ...ing, quantity_used: qty }
                            : ing
                        );
                      } else {
                        return [
                          ...prev,
                          { storeItemId: si.id, quantity_used: qty },
                        ];
                      }
                    });
                  }}
                  className="w-24"
                />
              </div>
            ))}
            <div className="flex gap-2">
              <Button type="submit">Save Ingredients</Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowIngredients(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default Menu;

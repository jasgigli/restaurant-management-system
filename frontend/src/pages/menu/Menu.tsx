import React, { useState } from "react";
import {
  useAddMenuItem,
  useAddMenuItemIngredients,
  useGetMenuItems,
} from "../../hooks/useMenuItems";
import { useGetStoreItems } from "../../hooks/useStoreItems";

const Menu = () => {
  const { data: menuItems, isLoading } = useGetMenuItems();
  const { data: storeItems } = useGetStoreItems();
  const addMenuItem = useAddMenuItem();
  const addIngredients = useAddMenuItemIngredients();
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
      },
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
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Menu</h1>
      <button onClick={() => setShowForm(true)} style={{ marginBottom: 16 }}>
        Add Menu Item
      </button>
      {showForm && (
        <form
          onSubmit={handleMenuItemSubmit}
          style={{
            marginBottom: 24,
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ marginRight: 8 }}
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            style={{ marginRight: 8 }}
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            required
            style={{ marginRight: 8 }}
          />
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </button>
        </form>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {menuItems?.map((item: any) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 8,
              padding: 16,
              minWidth: 220,
              background: "#fff",
            }}
          >
            <h3>{item.name}</h3>
            <div>Category: {item.category}</div>
            <div>Price: {item.price}</div>
            <button
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
              style={{ marginTop: 8 }}
            >
              Manage Ingredients
            </button>
          </div>
        ))}
      </div>
      {showIngredients && selectedMenuItem && (
        <form
          onSubmit={handleAddIngredients}
          style={{
            marginTop: 24,
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <h3>Ingredients for {selectedMenuItem.name}</h3>
          {storeItems?.map((si: any) => (
            <div key={si.id} style={{ marginBottom: 8 }}>
              <label>{si.name}</label>
              <input
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
                style={{ marginLeft: 8 }}
              />
            </div>
          ))}
          <button type="submit">Save Ingredients</button>
          <button
            type="button"
            onClick={() => setShowIngredients(false)}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Menu;

import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { useToast } from "../../components/ui/useToast";
import { useAddStoreItem, useGetStoreItems } from "../../hooks/useStoreItems";

const Warehouse = () => {
  const { data: items, isLoading, isError } = useGetStoreItems();
  const addStoreItem = useAddStoreItem();
  const toast = useToast();
  const [form, setForm] = useState({
    name: "",
    category: "",
    unit: "",
    quantity: 0,
    cost_per_unit: 0,
    low_stock_threshold: 0,
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStoreItem.mutate(form, {
      onSuccess: () => {
        setShowForm(false);
        setForm({
          name: "",
          category: "",
          unit: "",
          quantity: 0,
          cost_per_unit: 0,
          low_stock_threshold: 0,
        });
        toast("Item added successfully", "success");
      },
      onError: () => {
        toast("Failed to add item", "error");
      },
    });
  };

  if (isError) toast("Failed to load warehouse items", "error");
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Warehouse</h1>
        <Button onClick={() => setShowForm(true)}>Add Item</Button>
      </div>
      {showForm && (
        <Card className="mb-6 p-6 max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                name="unit"
                placeholder="Unit"
                value={form.unit}
                onChange={handleChange}
                required
                className="border rounded px-2 py-1 flex-1"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                required
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                name="cost_per_unit"
                type="number"
                placeholder="Cost/Unit"
                value={form.cost_per_unit}
                onChange={handleChange}
                required
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                name="low_stock_threshold"
                type="number"
                placeholder="Low Stock Threshold"
                value={form.low_stock_threshold}
                onChange={handleChange}
                required
                className="border rounded px-2 py-1 flex-1"
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
      <Card className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Unit</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Cost/Unit</th>
              <th className="p-2 text-left">Low Stock Threshold</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item: any) => (
              <tr
                key={item.id}
                className={
                  item.quantity <= item.low_stock_threshold ? "bg-red-100" : ""
                }
              >
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.unit}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.cost_per_unit}</td>
                <td className="p-2">{item.low_stock_threshold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Warehouse;

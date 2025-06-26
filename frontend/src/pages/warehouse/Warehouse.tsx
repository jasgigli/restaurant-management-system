import React, { useState } from "react";
import { useAddStoreItem, useGetStoreItems } from "../../hooks/useStoreItems";

const Warehouse = () => {
  const { data: items, isLoading } = useGetStoreItems();
  const addStoreItem = useAddStoreItem();
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
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Warehouse</h1>
      <button onClick={() => setShowForm(true)} style={{ marginBottom: 16 }}>
        Add Item
      </button>
      {showForm && (
        <form
          onSubmit={handleSubmit}
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
            onChange={handleChange}
            required
            style={{ marginRight: 8 }}
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            style={{ marginRight: 8 }}
          />
          <input
            name="unit"
            placeholder="Unit"
            value={form.unit}
            onChange={handleChange}
            required
            style={{ marginRight: 8 }}
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            style={{ marginRight: 8 }}
          />
          <input
            name="cost_per_unit"
            type="number"
            placeholder="Cost/Unit"
            value={form.cost_per_unit}
            onChange={handleChange}
            required
            style={{ marginRight: 8 }}
          />
          <input
            name="low_stock_threshold"
            type="number"
            placeholder="Low Stock Threshold"
            value={form.low_stock_threshold}
            onChange={handleChange}
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
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Cost/Unit</th>
            <th>Low Stock Threshold</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item: any) => (
            <tr
              key={item.id}
              style={
                item.quantity <= item.low_stock_threshold
                  ? { background: "#f8d7da" }
                  : {}
              }
            >
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.unit}</td>
              <td>{item.quantity}</td>
              <td>{item.cost_per_unit}</td>
              <td>{item.low_stock_threshold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Warehouse;

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { useToast } from "../../components/ui/useToast";
import { useGetMenuItems } from "../../hooks/useMenuItems";

const POS = () => {
  const { data: menuItems, isLoading, isError } = useGetMenuItems();
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const filteredMenu = menuItems?.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item: any) => {
    setCart((prev) => {
      const exists = prev.find((ci) => ci.id === item.id);
      if (exists) {
        return prev.map((ci) =>
          ci.id === item.id ? { ...ci, qty: ci.qty + 1 } : ci
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) =>
          ci.id === id ? { ...ci, qty: Math.max(1, ci.qty + delta) } : ci
        )
        .filter((ci) => ci.qty > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (isError) toast("Failed to load menu items", "error");
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left: Menu Items */}
      <div className="flex-1 bg-card p-4 rounded-md shadow">
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-2 py-1 w-full md:w-64"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMenu?.map((item: any) => (
            <Card
              key={item.id}
              className="p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
              onClick={() => addToCart(item)}
            >
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                <div className="text-sm text-muted-foreground mb-1">
                  {item.category}
                </div>
                <div className="text-sm font-medium">${item.price}</div>
              </div>
              <Button className="mt-4 w-full" variant="ghost">
                Add to Order
              </Button>
            </Card>
          ))}
        </div>
      </div>
      {/* Right: Cart */}
      <div className="w-full md:w-96 bg-card p-4 rounded-md shadow flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Current Order</h2>
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-muted-foreground">No items in cart.</div>
          ) : (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-2"
                >
                  <span>{item.name}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateQty(item.id, -1)}
                    >
                      -
                    </Button>
                    <span className="px-2">{item.qty}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateQty(item.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                  <span className="font-medium">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button
            className="w-full mt-4"
            disabled={cart.length === 0}
            onClick={() => setShowConfirm(true)}
          >
            Confirm Sale
          </Button>
        </div>
        {/* Confirm Sale Dialog Placeholder */}
        {showConfirm && (
          <Card className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Confirm Sale</h3>
              <div className="mb-4">Proceed with this sale?</div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setShowConfirm(false);
                    setCart([]);
                    toast(
                      "Sale confirmed! (API integration pending)",
                      "success"
                    );
                  }}
                >
                  Confirm
                </Button>
                <Button variant="ghost" onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default POS;

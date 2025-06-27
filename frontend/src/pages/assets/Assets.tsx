import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useToast } from "../../components/ui/useToast";
import {
  useAddAsset,
  useAddAssignedItem,
  useGetAssets,
  useGetAssignedItems,
} from "../../hooks/useAssets";

const Assets = () => {
  const toast = useToast();
  // Restaurant Assets
  const {
    data: assets,
    isLoading: loadingAssets,
    isError: errorAssets,
  } = useGetAssets();
  const addAsset = useAddAsset();
  const [assetForm, setAssetForm] = useState({ name: "", value: 0 });
  const [showAssetForm, setShowAssetForm] = useState(false);
  // Staff Assigned Items
  const {
    data: assignedItems,
    isLoading: loadingAssigned,
    isError: errorAssigned,
  } = useGetAssignedItems();
  const addAssignedItem = useAddAssignedItem();
  const [assignedForm, setAssignedForm] = useState({
    staffName: "",
    item: "",
    date: "",
  });
  const [showAssignedForm, setShowAssignedForm] = useState(false);

  // Handlers for forms
  const handleAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAsset.mutate(assetForm, {
      onSuccess: () => {
        setShowAssetForm(false);
        setAssetForm({ name: "", value: 0 });
        toast("Asset added", "success");
      },
      onError: () => toast("Failed to add asset", "error"),
    });
  };
  const handleAssignedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAssignedItem.mutate(assignedForm, {
      onSuccess: () => {
        setShowAssignedForm(false);
        setAssignedForm({ staffName: "", item: "", date: "" });
        toast("Assigned item added", "success");
      },
      onError: () => toast("Failed to add assigned item", "error"),
    });
  };

  return (
    <Tabs defaultValue="assets" className="w-full">
      <TabsList>
        <TabsTrigger value="assets">Restaurant Assets</TabsTrigger>
        <TabsTrigger value="assigned">Staff Assigned Items</TabsTrigger>
      </TabsList>
      {/* Restaurant Assets Tab */}
      <TabsContent value="assets">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Restaurant Assets</h2>
          <Button onClick={() => setShowAssetForm(true)}>Add Asset</Button>
        </div>
        {showAssetForm && (
          <Card className="mb-6 p-6 max-w-xl">
            <form onSubmit={handleAssetSubmit} className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <Input
                  name="name"
                  label="Name"
                  placeholder="Name"
                  value={assetForm.name}
                  onChange={(e) =>
                    setAssetForm({ ...assetForm, name: e.target.value })
                  }
                  required
                  className="flex-1"
                />
                <Input
                  name="value"
                  label="Value"
                  type="number"
                  placeholder="Value"
                  value={assetForm.value}
                  onChange={(e) =>
                    setAssetForm({
                      ...assetForm,
                      value: Number(e.target.value),
                    })
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
                  onClick={() => setShowAssetForm(false)}
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
                <th className="p-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {assets?.map((asset: any) => (
                <tr key={asset.id}>
                  <td className="p-2">{asset.name}</td>
                  <td className="p-2">{asset.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </TabsContent>
      {/* Staff Assigned Items Tab */}
      <TabsContent value="assigned">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Staff Assigned Items</h2>
          <Button onClick={() => setShowAssignedForm(true)}>
            Add Assigned Item
          </Button>
        </div>
        {showAssignedForm && (
          <Card className="mb-6 p-6 max-w-xl">
            <form onSubmit={handleAssignedSubmit} className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <Input
                  name="staffName"
                  label="Staff Name"
                  placeholder="Staff Name"
                  value={assignedForm.staffName}
                  onChange={(e) =>
                    setAssignedForm({
                      ...assignedForm,
                      staffName: e.target.value,
                    })
                  }
                  required
                  className="flex-1"
                />
                <Input
                  name="item"
                  label="Item"
                  placeholder="Item"
                  value={assignedForm.item}
                  onChange={(e) =>
                    setAssignedForm({ ...assignedForm, item: e.target.value })
                  }
                  required
                  className="flex-1"
                />
                <Input
                  name="date"
                  label="Date"
                  type="date"
                  value={assignedForm.date}
                  onChange={(e) =>
                    setAssignedForm({ ...assignedForm, date: e.target.value })
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
                  onClick={() => setShowAssignedForm(false)}
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
                <th className="p-2 text-left">Staff Name</th>
                <th className="p-2 text-left">Item</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {assignedItems?.map((ai: any) => (
                <tr key={ai.id}>
                  <td className="p-2">{ai.staffName}</td>
                  <td className="p-2">{ai.item}</td>
                  <td className="p-2">{ai.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Assets;

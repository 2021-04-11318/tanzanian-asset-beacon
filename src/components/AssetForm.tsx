
import React, { useState } from 'react';
import { Asset, AssetType } from '@/types';
import { Button } from '@/components/ui/button'; // Using shadcn button
import { Input } from '@/components/ui/input'; // Using shadcn input
import { Label } from '@/components/ui/label'; // Using shadcn label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Using shadcn select

interface AssetFormProps {
  onAddAsset: (asset: Asset) => void;
}

const AssetForm: React.FC<AssetFormProps> = ({ onAddAsset }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<AssetType>('Share');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !purchasePrice || !currentPrice || !quantity) {
      // Basic validation, can be enhanced
      alert("Please fill in all fields.");
      return;
    }
    const newAsset: Asset = {
      id: new Date().toISOString(), // Simple ID generation
      name,
      type,
      purchasePrice: parseFloat(purchasePrice),
      currentPrice: parseFloat(currentPrice),
      quantity: parseInt(quantity, 10),
    };
    onAddAsset(newAsset);
    // Reset form
    setName('');
    setType('Share');
    setPurchasePrice('');
    setCurrentPrice('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit} className="neo-card space-y-6 p-6 mb-8">
      <h2 className="text-2xl font-bold text-neo-text mb-6">Add New Asset</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="assetName" className="block text-sm font-medium text-neo-text mb-1">Asset Name</Label>
          <Input
            id="assetName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Vodacom Tanzania PLC"
            className="neo-input w-full"
            required
          />
        </div>

        <div>
          <Label htmlFor="assetType" className="block text-sm font-medium text-neo-text mb-1">Asset Type</Label>
          <Select value={type} onValueChange={(value) => setType(value as AssetType)}>
            <SelectTrigger className="neo-input w-full data-[placeholder]:text-gray-400">
              <SelectValue placeholder="Select asset type" />
            </SelectTrigger>
            <SelectContent className="border-2 border-neo-border bg-white rounded-none shadow-neo-hard">
              <SelectItem value="Share" className="hover:bg-neo-accent focus:bg-neo-accent rounded-none">Share</SelectItem>
              <SelectItem value="Bond" className="hover:bg-neo-accent focus:bg-neo-accent rounded-none">Bond</SelectItem>
              <SelectItem value="Unit" className="hover:bg-neo-accent focus:bg-neo-accent rounded-none">Unit Trust</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="purchasePrice" className="block text-sm font-medium text-neo-text mb-1">Purchase Price (per unit)</Label>
          <Input
            id="purchasePrice"
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            placeholder="e.g. 700"
            className="neo-input w-full"
            required
            min="0"
            step="any"
          />
        </div>

        <div>
          <Label htmlFor="currentPrice" className="block text-sm font-medium text-neo-text mb-1">Current Price (per unit)</Label>
          <Input
            id="currentPrice"
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            placeholder="e.g. 750"
            className="neo-input w-full"
            required
            min="0"
            step="any"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="quantity" className="block text-sm font-medium text-neo-text mb-1">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 100"
            className="neo-input w-full"
            required
            min="1"
            step="1"
          />
        </div>
      </div>

      <Button type="submit" className="neo-button w-full md:w-auto">
        Add Asset
      </Button>
    </form>
  );
};

export default AssetForm;


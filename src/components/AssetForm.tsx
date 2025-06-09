
import React, { useState } from 'react';
import { Asset, AssetType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssetFormProps {
  onAddAsset: (asset: Asset) => void;
}

const AssetForm: React.FC<AssetFormProps> = ({ onAddAsset }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<AssetType>('Share');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'quantity':
        if (value && (isNaN(Number(value)) || Number(value) <= 0)) {
          newErrors.quantity = 'Quantity must be a positive number';
        } else {
          delete newErrors.quantity;
        }
        break;
      case 'purchasePrice':
        if (value && isNaN(Number(value))) {
          newErrors.purchasePrice = 'Purchase price must be a valid number';
        } else {
          delete newErrors.purchasePrice;
        }
        break;
      case 'currentPrice':
        if (value && isNaN(Number(value))) {
          newErrors.currentPrice = 'Current price must be a valid number';
        } else if (value && purchasePrice && Number(value) < Number(purchasePrice) * 0.7) {
          newErrors.currentPrice = 'Warning: Current price is significantly lower than purchase price';
        } else {
          delete newErrors.currentPrice;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const fillExampleData = () => {
    setName('Vodacom Tanzania PLC');
    setType('Share');
    setPurchasePrice('700');
    setCurrentPrice('750');
    setQuantity('100');
    setErrors({});
    
    toast({
      title: "Example data loaded",
      description: "You can modify these values or add the asset as is.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    validateField('quantity', quantity);
    validateField('purchasePrice', purchasePrice);
    validateField('currentPrice', currentPrice);
    
    if (!name || !purchasePrice || !currentPrice || !quantity) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Please fix errors",
        description: "There are validation errors that need to be resolved.",
        variant: "destructive",
      });
      return;
    }

    const newAsset: Asset = {
      id: new Date().toISOString(),
      name,
      type,
      purchasePrice: parseFloat(purchasePrice),
      currentPrice: parseFloat(currentPrice),
      quantity: parseInt(quantity, 10),
      purchaseDate: new Date().toISOString().split('T')[0],
    };
    
    onAddAsset(newAsset);
    
    // Reset form
    setName('');
    setType('Share');
    setPurchasePrice('');
    setCurrentPrice('');
    setQuantity('');
    setErrors({});
  };

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="elegant-card space-y-6 p-6 mb-8 border-2 border-purple-100">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Add New Asset</h2>
          <Button 
            type="button" 
            variant="outline" 
            onClick={fillExampleData}
            className="text-sm"
          >
            <TrendingUp size={16} className="mr-2" />
            Try Example
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="assetName" className="block text-sm font-medium text-gray-900 mb-1">
              Asset Name *
            </Label>
            <Input
              id="assetName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vodacom Tanzania PLC, CRDB Bank"
              className="elegant-input w-full"
              required
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label htmlFor="assetType" className="text-sm font-medium text-gray-900">
                Asset Type *
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle size={14} className="text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
                    <p><strong>Share:</strong> Company stock/equity</p>
                    <p><strong>Bond:</strong> Government/corporate debt</p>
                    <p><strong>Unit Trust:</strong> Mutual fund units</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select value={type} onValueChange={(value) => setType(value as AssetType)}>
              <SelectTrigger className="elegant-input w-full">
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Share">Share</SelectItem>
                <SelectItem value="Bond">Bond</SelectItem>
                <SelectItem value="Unit">Unit Trust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-900 mb-1">
              Purchase Price (TZS per unit) *
            </Label>
            <Input
              id="purchasePrice"
              type="number"
              value={purchasePrice}
              onChange={(e) => {
                setPurchasePrice(e.target.value);
                validateField('purchasePrice', e.target.value);
              }}
              placeholder="e.g. 700"
              className={`elegant-input w-full ${errors.purchasePrice ? 'border-red-500' : ''}`}
              required
              min="0"
              step="any"
            />
            {errors.purchasePrice && (
              <p className="text-red-500 text-xs mt-1">{errors.purchasePrice}</p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label htmlFor="currentPrice" className="text-sm font-medium text-gray-900">
                Current Price (TZS per unit) *
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle size={14} className="text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Enter the current market price or your estimated value</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="currentPrice"
              type="number"
              value={currentPrice}
              onChange={(e) => {
                setCurrentPrice(e.target.value);
                validateField('currentPrice', e.target.value);
              }}
              placeholder="e.g. 750"
              className={`elegant-input w-full ${errors.currentPrice ? 'border-red-500' : ''}`}
              required
              min="0"
              step="any"
            />
            {errors.currentPrice && (
              <p className={`text-xs mt-1 ${errors.currentPrice.includes('Warning') ? 'text-orange-500' : 'text-red-500'}`}>
                {errors.currentPrice}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="quantity" className="block text-sm font-medium text-gray-900 mb-1">
              Quantity *
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                validateField('quantity', e.target.value);
              }}
              placeholder="e.g. 100"
              className={`elegant-input w-full ${errors.quantity ? 'border-red-500' : ''}`}
              required
              min="1"
              step="1"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
            )}
          </div>
        </div>

        <Button type="submit" className="elegant-button-primary w-full md:w-auto">
          Add Asset to Portfolio
        </Button>
      </form>
    </TooltipProvider>
  );
};

export default AssetForm;

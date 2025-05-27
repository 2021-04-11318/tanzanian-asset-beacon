
import React from 'react';
import { Asset } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AssetDetailModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

// Placeholder data for the chart
const placeholderChartData = [
  { name: 'Jan', price: 100 },
  { name: 'Feb', price: 110 },
  { name: 'Mar', price: 105 },
  { name: 'Apr', price: 120 },
  { name: 'May', price: 115 },
];

const AssetDetailModal: React.FC<AssetDetailModalProps> = ({ asset, isOpen, onOpenChange }) => {
  if (!asset) return null;

  const totalValue = asset.currentPrice * asset.quantity;
  const totalCost = asset.purchasePrice * asset.quantity;
  const gainLoss = totalValue - totalCost;
  const returnPercentage = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="neo-card sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-neo-text">{asset.name} ({asset.type})</DialogTitle>
          <DialogDescription className="text-gray-600">
            Detailed view of your asset.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p><strong>Quantity:</strong> {asset.quantity.toLocaleString()}</p>
            <p><strong>Purchase Price:</strong> TZS {asset.purchasePrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            <p><strong>Current Price:</strong> TZS {asset.currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            {asset.purchaseDate && <p><strong>Purchase Date:</strong> {asset.purchaseDate}</p>}
          </div>
          <div className="text-left md:text-right">
            <p><strong>Total Cost:</strong> TZS {totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            <p><strong>Total Value:</strong> TZS {totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            <p className={`font-bold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <strong>Gain/Loss:</strong> {gainLoss >= 0 ? '+' : ''}TZS {gainLoss.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({returnPercentage.toFixed(2)}%)
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-neo-text mb-2">Price Development (Placeholder)</h4>
          <div className="h-[200px] border-2 border-neo-border p-2 bg-gray-50">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={placeholderChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#1A1A1A" />
                <YAxis stroke="#1A1A1A" />
                <Tooltip wrapperClassName="neo-card !bg-white !border-neo-border" />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#00FFFF" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-1 text-center">Note: Chart data is currently placeholder.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssetDetailModal;


import React from 'react';
import { Asset } from '@/types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Using shadcn card for structure

interface PortfolioSummaryProps {
  assets: Asset[];
}

const COLORS = ['#00FFFF', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF']; // Neo-accent, and some contrasting colors

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ assets }) => {
  if (assets.length === 0) {
    return null; // Don't show summary if no assets
  }

  const totalPortfolioValue = assets.reduce((sum, asset) => sum + asset.currentPrice * asset.quantity, 0);
  const totalPortfolioCost = assets.reduce((sum, asset) => sum + asset.purchasePrice * asset.quantity, 0);
  const totalPortfolioGainLoss = totalPortfolioValue - totalPortfolioCost;
  const overallReturnPercentage = totalPortfolioCost > 0 ? (totalPortfolioGainLoss / totalPortfolioCost) * 100 : 0;

  const assetAllocationData = assets.reduce((acc, asset) => {
    const existingType = acc.find(item => item.name === asset.type);
    if (existingType) {
      existingType.value += asset.currentPrice * asset.quantity;
    } else {
      acc.push({ name: asset.type, value: asset.currentPrice * asset.quantity });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <Card className="neo-card mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-neo-text">Portfolio Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="neo-card p-4 bg-white !shadow-none border-2 border-dashed border-neo-border">
            <h3 className="text-lg font-semibold text-neo-text">Total Value</h3>
            <p className="text-2xl font-bold text-neo-accent">
              TZS {totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="neo-card p-4 bg-white !shadow-none border-2 border-dashed border-neo-border">
            <h3 className="text-lg font-semibold text-neo-text">Overall Gain/Loss</h3>
            <p className={`text-2xl font-bold ${totalPortfolioGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPortfolioGainLoss >= 0 ? '+' : ''}TZS {totalPortfolioGainLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className={`text-sm ${totalPortfolioGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ({overallReturnPercentage.toFixed(2)}%)
            </p>
          </div>
          <div className="lg:col-span-2 neo-card p-4 bg-white !shadow-none border-2 border-dashed border-neo-border">
            <h3 className="text-lg font-semibold text-neo-text mb-3 text-center">Asset Allocation</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetAllocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {assetAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    wrapperClassName="neo-card !bg-white !border-neo-border" 
                    formatter={(value: number) => `TZS ${value.toLocaleString()}`} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;

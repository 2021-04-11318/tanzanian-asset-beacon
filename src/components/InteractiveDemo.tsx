
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Eye, Plus, BarChart3, DollarSign, Wallet, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const InteractiveDemo = () => {
  const [currentView, setCurrentView] = useState('portfolio');
  const [animationStep, setAnimationStep] = useState(0);

  // Sample portfolio data for demo
  const portfolioData = [
    { id: 1, name: 'CRDB Bank', type: 'Shares', quantity: 100, purchasePrice: 150, currentPrice: 165, date: '2024-01-15' },
    { id: 2, name: 'NMB Bank', type: 'Shares', quantity: 200, purchasePrice: 2800, currentPrice: 3200, date: '2024-02-20' },
    { id: 3, name: 'Government Bond', type: 'Bonds', quantity: 50, purchasePrice: 1000, currentPrice: 1050, date: '2024-03-10' },
    { id: 4, name: 'TWIGA Cement', type: 'Shares', quantity: 75, purchasePrice: 2500, currentPrice: 2350, date: '2024-01-25' }
  ];

  const allocationData = [
    { name: 'Shares', value: 75, color: '#8B5CF6' },
    { name: 'Bonds', value: 25, color: '#06B6D4' }
  ];

  const performanceData = [
    { month: 'Jan', value: 850000 },
    { month: 'Feb', value: 920000 },
    { month: 'Mar', value: 880000 },
    { month: 'Apr', value: 950000 },
    { month: 'May', value: 1020000 },
    { month: 'Jun', value: 1085000 }
  ];

  const totalValue = portfolioData.reduce((sum, asset) => sum + (asset.currentPrice * asset.quantity), 0);
  const totalCost = portfolioData.reduce((sum, asset) => sum + (asset.purchasePrice * asset.quantity), 0);
  const totalGain = totalValue - totalCost;
  const gainPercentage = ((totalGain / totalCost) * 100).toFixed(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const DemoPortfolioView = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Wallet size={20} className="text-purple-600" />
              <h3 className="text-sm font-medium text-gray-600">Total Value</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              TZS {totalValue.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp size={20} className="text-green-600" />
              <h3 className="text-sm font-medium text-gray-600">Total Gain</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">
              +TZS {totalGain.toLocaleString()}
            </p>
            <p className="text-sm text-green-600">+{gainPercentage}%</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 size={20} className="text-blue-600" />
              <h3 className="text-sm font-medium text-gray-600">Assets</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{portfolioData.length}</p>
            <p className="text-sm text-gray-600">Active holdings</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar size={20} className="text-orange-600" />
              <h3 className="text-sm font-medium text-gray-600">Best Performer</h3>
            </div>
            <p className="text-lg font-bold text-gray-900">NMB Bank</p>
            <p className="text-sm text-green-600">+14.3%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={20} className="text-purple-600" />
              Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} className="text-purple-600" />
              Portfolio Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`TZS ${Number(value).toLocaleString()}`, 'Portfolio Value']} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card className="border-2 border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign size={20} className="text-purple-600" />
            Current Holdings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {portfolioData.map((asset, index) => {
              const gain = (asset.currentPrice - asset.purchasePrice) * asset.quantity;
              const gainPercent = ((gain / (asset.purchasePrice * asset.quantity)) * 100).toFixed(2);
              const isPositive = gain >= 0;
              
              return (
                <div 
                  key={asset.id} 
                  className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                    animationStep === index ? 'bg-purple-50 border-purple-200 scale-105' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{asset.name}</h4>
                      <p className="text-sm text-gray-600">{asset.type} • {asset.quantity} units</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        TZS {(asset.currentPrice * asset.quantity).toLocaleString()}
                      </p>
                      <p className={`text-sm flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {isPositive ? '+' : ''}TZS {gain.toLocaleString()} ({gainPercent}%)
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border-2 border-purple-100 overflow-hidden">
      {/* Demo Navigation */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Wallet size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold">TZ Portfolio Tracker Demo</h3>
              <p className="text-sm text-purple-100">Live dashboard preview</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={currentView === 'portfolio' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('portfolio')}
              className="text-white hover:bg-white/20"
            >
              <Eye size={16} className="mr-2" />
              Portfolio
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              disabled
            >
              <Plus size={16} className="mr-2" />
              Add Asset
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-6">
        {currentView === 'portfolio' && <DemoPortfolioView />}
      </div>

      {/* Live Updates Indicator */}
      <div className="bg-green-50 border-t border-green-200 p-3">
        <div className="flex items-center justify-center space-x-2 text-green-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live updates • Real-time data sync</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;

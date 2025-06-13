import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import AssetForm from '@/components/AssetForm';
import AssetList from '@/components/AssetList';
import AssetDetailModal from '@/components/AssetDetailModal';
import PortfolioSummary from '@/components/PortfolioSummary';
import MarketInsights from '@/components/MarketInsights';
import PortfolioMetrics from '@/components/PortfolioMetrics';
import { Asset, AssetType, SortConfig, SortKey } from '@/types';
import { Wallet, TrendingUp, ArrowLeft, LogOut, User, Shield, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { secureSignOut, isRateLimited } from '@/utils/authSecurity';

const Index = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAssetForDetail, setSelectedAssetForDetail] = useState<Asset | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
  const [filterType, setFilterType] = useState<AssetType | 'All'>('All');

  // Load assets from Supabase with error handling
  useEffect(() => {
    if (user) {
      loadAssets();
    }
  }, [user]);

  const loadAssets = async () => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to view your portfolio.",
          variant: "destructive",
        });
        return;
      }

      // Check rate limiting for data fetching
      if (isRateLimited(`data_fetch_${user.id}`, 30, 60000)) {
        toast({
          title: "Too many requests",
          description: "Please wait before refreshing your data.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('user_id', user.id) // Explicit user filtering for security
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading assets:', error);
        throw error;
      }

      const formattedAssets = data.map(asset => ({
        id: asset.id,
        name: asset.name,
        type: asset.type as AssetType,
        purchasePrice: Number(asset.purchase_price),
        currentPrice: Number(asset.current_price),
        quantity: asset.quantity,
        purchaseDate: asset.purchase_date,
      }));

      setAssets(formattedAssets);
    } catch (error: any) {
      console.error('Error loading assets:', error);
      toast({
        title: "Error loading assets",
        description: "Unable to load your portfolio. Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddAsset = async (asset: Asset) => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add assets.",
          variant: "destructive",
        });
        return;
      }

      // Check rate limiting
      if (isRateLimited(`asset_creation_${user.id}`, 5, 60000)) {
        toast({
          title: "Too many requests",
          description: "Please wait before adding another asset.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('assets')
        .insert({
          name: asset.name,
          type: asset.type,
          purchase_price: asset.purchasePrice,
          current_price: asset.currentPrice,
          quantity: asset.quantity,
          purchase_date: asset.purchaseDate,
          user_id: user.id, // Explicitly set user_id for security
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding asset:', error);
        throw error;
      }

      const newAsset = {
        id: data.id,
        name: data.name,
        type: data.type as AssetType,
        purchasePrice: Number(data.purchase_price),
        currentPrice: Number(data.current_price),
        quantity: data.quantity,
        purchaseDate: data.purchase_date,
      };

      setAssets(prev => [newAsset, ...prev]);
      
      toast({
        title: "Asset added successfully",
        description: `${asset.name} has been added to your portfolio.`,
      });
    } catch (error: any) {
      console.error('Error adding asset:', error);
      toast({
        title: "Error adding asset",
        description: "Unable to add asset. Please check your input and try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (assetId: string) => {
    const assetToShow = assets.find(asset => asset.id === assetId);
    if (assetToShow) {
      setSelectedAssetForDetail(assetToShow);
      setIsDetailModalOpen(true);
    }
  };

  const handleSortChange = (key: SortKey) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (type: AssetType | 'All') => {
    setFilterType(type);
  };

  const handleSignOut = async () => {
    try {
      await secureSignOut();
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "There was an issue signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportData = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to export data.",
        variant: "destructive",
      });
      return;
    }

    if (assets.length === 0) {
      toast({
        title: "No data to export",
        description: "Add some assets to your portfolio first.",
        variant: "destructive",
      });
      return;
    }

    // Check rate limiting for exports
    if (isRateLimited(`export_${user.id}`, 3, 300000)) { // 3 exports per 5 minutes
      toast({
        title: "Export limit reached",
        description: "Please wait 5 minutes before exporting again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const csvContent = [
        ['Asset Name', 'Type', 'Quantity', 'Purchase Price', 'Current Price', 'Purchase Date'].join(','),
        ...assets.map(asset => [
          `"${asset.name.replace(/"/g, '""')}"`, // Escape quotes in CSV
          asset.type,
          asset.quantity,
          asset.purchasePrice,
          asset.currentPrice,
          asset.purchaseDate || ''
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Portfolio exported",
        description: "Your portfolio data has been downloaded as a CSV file.",
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export failed",
        description: "Unable to export portfolio data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const assetTypes: AssetType[] = useMemo(() => {
    const types = new Set(assets.map(asset => asset.type));
    return Array.from(types);
  }, [assets]);

  const processedAssets = useMemo(() => {
    let sortedAssets = [...assets];

    if (filterType !== 'All') {
      sortedAssets = sortedAssets.filter(asset => asset.type === filterType);
    }

    sortedAssets.sort((a, b) => {
      let valA: any;
      let valB: any;

      if (sortConfig.key === 'totalValue') {
        valA = a.currentPrice * a.quantity;
        valB = b.currentPrice * b.quantity;
      } else if (sortConfig.key === 'returnPercentage') {
        const totalCostA = a.purchasePrice * a.quantity;
        const totalValueA = a.currentPrice * a.quantity;
        valA = totalCostA > 0 ? ((totalValueA - totalCostA) / totalCostA) * 100 : -Infinity;
        
        const totalCostB = b.purchasePrice * b.quantity;
        const totalValueB = b.currentPrice * b.quantity;
        valB = totalCostB > 0 ? ((totalValueB - totalCostB) / totalCostB) * 100 : -Infinity;
      } else if (sortConfig.key === 'purchaseDate') {
        valA = a.purchaseDate ? new Date(a.purchaseDate).getTime() : (sortConfig.direction === 'asc' ? Infinity : -Infinity);
        valB = b.purchaseDate ? new Date(b.purchaseDate).getTime() : (sortConfig.direction === 'asc' ? Infinity : -Infinity);
      } else {
        valA = a[sortConfig.key];
        valB = b[sortConfig.key];
      }
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortConfig.direction === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

    return sortedAssets;
  }, [assets, sortConfig, filterType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="elegant-card p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors font-medium">
            <ArrowLeft size={20} className="mr-2" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex items-center text-gray-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              <Shield size={16} className="mr-2 text-green-600" />
              <span className="text-sm">Securely signed in as {user?.email}</span>
            </div>
            {assets.length > 0 && (
              <Button
                onClick={handleExportData}
                variant="outline"
                size="sm"
                className="hidden md:flex items-center"
                aria-label="Export portfolio data as CSV"
              >
                <Download size={16} className="mr-2" />
                Export CSV
              </Button>
            )}
            <button
              onClick={handleSignOut}
              className="elegant-button-secondary flex items-center text-sm"
              aria-label="Sign out of account"
            >
              <LogOut size={16} className="mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero Header */}
      <div className="py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="elegant-card inline-block p-6 md:p-8 border-2 border-purple-100">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 flex items-center justify-center mb-4 flex-wrap gap-2">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
                <Wallet size={32} className="text-white" strokeWidth={2.5}/>
              </div>
              <span className="mx-2">My Asset Portfolio</span>
              <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
                <TrendingUp size={32} className="text-white" strokeWidth={2.5}/>
              </div>
            </h1>
            <p className="text-lg text-gray-600">Track your shares, bonds, and units with elegance and precision.</p>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <MarketInsights />
        <PortfolioMetrics assets={assets} />
        <PortfolioSummary assets={assets} />
        <AssetForm onAddAsset={handleAddAsset} />
        <AssetList 
          assets={processedAssets} 
          onViewDetails={handleViewDetails}
          sortConfig={sortConfig}
          filterType={filterType}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          availableAssetTypes={assetTypes}
        />
      </main>

      <AssetDetailModal
        asset={selectedAssetForDetail}
        isOpen={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      <footer className="text-center py-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} TZ Portfolio Tracker. Crafted with excellence.</p>
      </footer>
    </div>
  );
};

export default Index;

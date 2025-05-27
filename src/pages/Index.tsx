
import React, { useState } from 'react';
import AssetForm from '@/components/AssetForm';
import AssetList from '@/components/AssetList';
import { Asset } from '@/types';
import { Wallet, TrendingUp } from 'lucide-react'; // Example icons

const Index = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null); // For future detail view

  const handleAddAsset = (asset: Asset) => {
    setAssets((prevAssets) => [...prevAssets, asset]);
  };

  const handleViewDetails = (assetId: string) => {
    setSelectedAssetId(assetId);
    // For now, just log. Detail view modal/page will be implemented later.
    console.log("View details for asset ID:", assetId);
    alert(`Placeholder: View details for asset ID: ${assetId}. This will be implemented next!`);
  };

  return (
    <div className="min-h-screen bg-neo-bg text-neo-text p-4 md:p-8 selection:bg-neo-accent selection:text-neo-bg">
      <header className="mb-12 text-center">
        <div className="inline-block border-2 border-neo-border p-4 shadow-neo-hard bg-white">
            <h1 className="text-4xl md:text-5xl font-extrabold text-neo-text flex items-center justify-center">
                <Wallet size={48} className="mr-3 text-neo-accent" strokeWidth={2.5}/> My Asset Portfolio <TrendingUp size={48} className="ml-3 text-neo-accent" strokeWidth={2.5}/>
            </h1>
        </div>
        <p className="mt-4 text-lg text-gray-700">Track your shares, bonds, and units in Tanzania.</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <AssetForm onAddAsset={handleAddAsset} />
        <AssetList assets={assets} onViewDetails={handleViewDetails} />
      </main>

      <footer className="text-center mt-12 py-6 border-t-2 border-neo-border">
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} TZ Portfolio Tracker. Brutally Yours.</p>
      </footer>
    </div>
  );
};

export default Index;


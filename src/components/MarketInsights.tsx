
import React, { useState } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const MarketInsights = () => {
  const [query, setQuery] = useState('');
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !session) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('market-insights', {
        body: { query },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      setInsights(data.insights);
    } catch (error: any) {
      toast({
        title: "Error getting insights",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="elegant-card p-6 border-2 border-purple-100 mb-8">
      <div className="flex items-center mb-4">
        <Bot size={24} className="text-purple-600 mr-3" />
        <h3 className="text-xl font-bold text-gray-900">AI Market Insights</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about market trends, top performers, or investment recommendations..."
            className="elegant-input flex-1"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="elegant-button-primary flex items-center"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </form>

      {insights && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <pre className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed font-medium">
            {insights}
          </pre>
        </div>
      )}
    </div>
  );
};

export default MarketInsights;

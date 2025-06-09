
import React, { useState } from 'react';
import { Bot, Send, Loader2, TrendingUp, BarChart3, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const MarketInsights = () => {
  const [query, setQuery] = useState('');
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
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

  const getInsightIcon = (text: string) => {
    if (text.includes('Market Overview') || text.includes('market cap')) {
      return <BarChart3 size={16} className="text-blue-600" />;
    }
    if (text.includes('Top Performer') || text.includes('up ')) {
      return <TrendingUp size={16} className="text-green-600" />;
    }
    if (text.includes('sentiment')) {
      return <BarChart3 size={16} className="text-purple-600" />;
    }
    return null;
  };

  const formatInsights = (text: string) => {
    return text.split('\n').map((line, index) => {
      const icon = getInsightIcon(line);
      return (
        <div key={index} className="flex items-start gap-2">
          {icon && <div className="mt-1">{icon}</div>}
          <span className={icon ? '' : 'ml-6'}>{line}</span>
        </div>
      );
    });
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
            placeholder="Ask about market trends, sectors, or stocks in Tanzania..."
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
          <div className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed font-medium space-y-2">
            {formatInsights(insights)}
          </div>
          
          <Collapsible open={isDisclaimerOpen} onOpenChange={setIsDisclaimerOpen} className="mt-4">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs text-gray-600 p-0 h-auto font-normal">
                <AlertCircle size={12} className="mr-1" />
                Disclaimer
                {isDisclaimerOpen ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
              This analysis is for educational purposes only. Always consult with a qualified financial advisor before making investment decisions.
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
  );
};

export default MarketInsights;


import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Verify user is authenticated
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { query } = await req.json()

    // Get market data from database
    const { data: marketData, error } = await supabaseClient
      .from('market_data')
      .select('*')
      .order('current_price', { ascending: false })
      .limit(10)

    if (error) throw error

    // Simple AI-like analysis based on market data
    const insights = generateMarketInsights(marketData, query)

    return new Response(
      JSON.stringify({ insights }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function generateMarketInsights(marketData: any[], query: string) {
  const totalMarketCap = marketData.reduce((sum, stock) => sum + (stock.market_cap || 0), 0)
  const avgChange = marketData.reduce((sum, stock) => sum + (stock.change_percentage_24h || 0), 0) / marketData.length
  
  let insights = `Based on current DSE market data analysis:\n\n`
  
  if (query.toLowerCase().includes('best') || query.toLowerCase().includes('top')) {
    const topPerformer = marketData.reduce((best, current) => 
      (current.change_percentage_24h || 0) > (best.change_percentage_24h || 0) ? current : best
    )
    insights += `🏆 Top Performer: ${topPerformer.name} (${topPerformer.symbol}) is up ${topPerformer.change_percentage_24h?.toFixed(2)}%\n\n`
  }
  
  if (query.toLowerCase().includes('market') || query.toLowerCase().includes('overall')) {
    insights += `📊 Market Overview:\n`
    insights += `• Total tracked market cap: TZS ${(totalMarketCap / 1000000000).toFixed(1)}B\n`
    insights += `• Average 24h change: ${avgChange.toFixed(2)}%\n`
    insights += `• Market sentiment: ${avgChange > 0 ? 'Positive' : avgChange < -1 ? 'Bearish' : 'Neutral'}\n\n`
  }
  
  if (query.toLowerCase().includes('recommendation') || query.toLowerCase().includes('invest')) {
    const stableStocks = marketData.filter(stock => 
      Math.abs(stock.change_percentage_24h || 0) < 2 && (stock.market_cap || 0) > 100000000000
    )
    if (stableStocks.length > 0) {
      insights += `💡 Investment Considerations:\n`
      insights += `• Stable large-cap options: ${stableStocks.slice(0, 3).map(s => s.name).join(', ')}\n`
      insights += `• Consider diversification across banking and industrial sectors\n`
      insights += `• Monitor volume trends for liquidity assessment\n\n`
    }
  }
  
  insights += `⚠️ Disclaimer: This analysis is for educational purposes only. Always consult with a qualified financial advisor before making investment decisions.`
  
  return insights
}

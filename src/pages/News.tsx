
import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowLeft, Clock, TrendingUp } from 'lucide-react';

const News = () => {
  const articles = [
    {
      title: "Dar es Salaam Stock Exchange Shows Strong Growth",
      summary: "The DSE has seen a 15% increase in trading volume this quarter, driven by increased investor confidence and new listings...",
      date: "2024-05-27",
      category: "Market News",
      readTime: "3 min read"
    },
    {
      title: "New IPO Launches: Opportunities for Investors",
      summary: "Three companies are going public this month, offering new investment opportunities across different sectors...",
      date: "2024-05-26",
      category: "IPO News",
      readTime: "5 min read"
    },
    {
      title: "Government Bonds Yield Analysis",
      summary: "Recent changes in government bond yields affect investment strategies and portfolio allocation decisions...",
      date: "2024-05-25",
      category: "Bonds",
      readTime: "4 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors font-medium">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="elegant-card inline-block p-12 border-2 border-purple-100">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full">
                <Newspaper size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Market News & Analysis</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Stay informed with the latest developments, trends, and expert analysis from Tanzania's financial markets.
            </p>
          </div>
        </div>

        {/* Featured Article */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Story</h2>
          <div className="elegant-card border-2 border-purple-100 p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold mb-2 md:mb-0 inline-block w-fit">
                Featured
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock size={16} className="mr-1" />
                <span>{articles[0].date} • {articles[0].readTime}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{articles[0].title}</h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">{articles[0].summary}</p>
            <button className="elegant-button-primary">
              Read Full Article
            </button>
          </div>
        </div>

        {/* Latest News */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Latest News</h2>
          <div className="space-y-6">
            {articles.slice(1).map((article, index) => (
              <div key={index} className="elegant-card hover:scale-[1.02] transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold mb-2 md:mb-0 inline-block w-fit">
                    {article.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={16} className="mr-1" />
                    <span>{article.date} • {article.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{article.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{article.summary}</p>
                <button className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                  Read more →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20">
          <div className="elegant-card text-center p-12 border-2 border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Stay Updated</h3>
            <p className="text-gray-600 mb-6">
              Get the latest market news and analysis delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="elegant-input flex-1"
              />
              <button className="elegant-button-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;


import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowLeft, Clock, TrendingUp } from 'lucide-react';

const News = () => {
  const articles = [
    {
      title: "Dar es Salaam Stock Exchange Shows Strong Growth",
      summary: "The DSE has seen a 15% increase in trading volume this quarter...",
      date: "2024-05-27",
      category: "Market News"
    },
    {
      title: "New IPO Launches: Opportunities for Investors",
      summary: "Three companies are going public this month, offering new investment opportunities...",
      date: "2024-05-26",
      category: "IPO News"
    },
    {
      title: "Government Bonds Yield Analysis",
      summary: "Recent changes in government bond yields affect investment strategies...",
      date: "2024-05-25",
      category: "Bonds"
    }
  ];

  return (
    <div className="min-h-screen bg-neo-bg text-neo-text p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-neo-accent hover:underline mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <div className="neo-card p-8 text-center">
            <Newspaper size={64} className="text-neo-accent mx-auto mb-4" />
            <h1 className="text-4xl font-extrabold mb-4">Market News & Analysis</h1>
            <p className="text-xl text-gray-700">Stay updated with the latest developments in Tanzania's financial markets</p>
          </div>
        </div>

        <div className="space-y-6">
          {articles.map((article, index) => (
            <div key={index} className="neo-card p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <span className="text-sm bg-neo-accent text-neo-text px-2 py-1 rounded-none font-bold mb-2 md:mb-0 inline-block">
                  {article.category}
                </span>
                <div className="flex items-center text-gray-500">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">{article.date}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <Link to="#" className="text-neo-accent hover:underline font-medium">
                Read full article →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

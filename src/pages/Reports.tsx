
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, Download, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reports = () => {
  const reports = [
    {
      title: "Q1 2024 Market Performance Report",
      description: "Comprehensive analysis of market performance for the first quarter, including sector breakdowns and growth projections.",
      date: "2024-04-15",
      type: "Quarterly Report",
      pages: 24,
      featured: true
    },
    {
      title: "Annual Investment Outlook 2024",
      description: "Our expert predictions and strategic recommendations for the year ahead, covering all major asset classes.",
      date: "2024-01-10",
      type: "Annual Report",
      pages: 48,
      featured: false
    },
    {
      title: "Sector Analysis: Banking & Finance",
      description: "Deep dive into Tanzania's banking and financial services sector, with performance metrics and future outlook.",
      date: "2024-03-20",
      type: "Sector Report",
      pages: 32,
      featured: false
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
                <FileText size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Investment Reports</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Access detailed market analysis, investment research, and comprehensive reports crafted by our expert team.
            </p>
          </div>
        </div>

        {/* Featured Report */}
        {reports.filter(report => report.featured).map((report, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Report</h2>
            <div className="elegant-card border-2 border-purple-100 p-8 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full text-sm font-semibold mb-2 md:mb-0 inline-block w-fit">
                  Featured • {report.type}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={16} className="mr-1" />
                  <span>{report.date} • {report.pages} pages</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{report.title}</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{report.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="elegant-button-primary flex items-center justify-center">
                  <Download size={16} className="mr-2" />
                  Download PDF
                </button>
                <button className="elegant-button-secondary flex items-center justify-center">
                  <Eye size={16} className="mr-2" />
                  Preview Report
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* All Reports */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">All Reports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.filter(report => !report.featured).map((report, index) => (
              <div key={index} className="elegant-card hover:scale-105 transition-transform duration-300">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold">
                    {report.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{report.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{report.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {report.date}
                  </div>
                  <span>{report.pages} pages</span>
                </div>
                <div className="space-y-2">
                  <button className="elegant-button-primary w-full flex items-center justify-center">
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </button>
                  <button className="elegant-button-secondary w-full flex items-center justify-center">
                    <Eye size={16} className="mr-2" />
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Report Request */}
        <div className="mt-20">
          <div className="elegant-card text-center p-12 border-2 border-purple-100">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Need a Custom Report?</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our research team can create tailored analysis and reports based on your specific investment needs and interests.
            </p>
            <button className="elegant-button-primary">
              Request Custom Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

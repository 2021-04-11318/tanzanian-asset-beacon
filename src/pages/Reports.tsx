
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reports = () => {
  const reports = [
    {
      title: "Q1 2024 Market Performance Report",
      description: "Comprehensive analysis of market performance for the first quarter",
      date: "2024-04-15",
      type: "Quarterly Report",
      pages: 24
    },
    {
      title: "Annual Investment Outlook 2024",
      description: "Our expert predictions and recommendations for the year ahead",
      date: "2024-01-10",
      type: "Annual Report",
      pages: 48
    },
    {
      title: "Sector Analysis: Banking & Finance",
      description: "Deep dive into Tanzania's banking and financial services sector",
      date: "2024-03-20",
      type: "Sector Report",
      pages: 32
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
            <FileText size={64} className="text-neo-accent mx-auto mb-4" />
            <h1 className="text-4xl font-extrabold mb-4">Investment Reports</h1>
            <p className="text-xl text-gray-700">Access detailed market analysis and investment research reports</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <div key={index} className="neo-card p-6">
              <div className="mb-4">
                <span className="text-sm bg-neo-accent text-neo-text px-2 py-1 rounded-none font-bold">
                  {report.type}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{report.title}</h3>
              <p className="text-gray-600 mb-4">{report.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {report.date}
                </div>
                <span>{report.pages} pages</span>
              </div>
              <Button className="neo-button w-full flex items-center justify-center">
                <Download size={16} className="mr-2" />
                Download PDF
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;

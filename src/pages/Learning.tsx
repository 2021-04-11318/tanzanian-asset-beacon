
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Play, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Learning = () => {
  const courses = [
    {
      title: "Investment Basics",
      description: "Learn the fundamentals of investing in the Tanzanian market with expert guidance and practical examples.",
      duration: "2 hours",
      level: "Beginner",
      icon: <BookOpen size={32} className="text-purple-600" />
    },
    {
      title: "Stock Analysis",
      description: "Master the art of analyzing companies and their stocks using proven methodologies and tools.",
      duration: "3 hours",
      level: "Intermediate",
      icon: <TrendingUp size={32} className="text-purple-600" />
    },
    {
      title: "Portfolio Management",
      description: "Build and manage a diversified investment portfolio that aligns with your financial goals.",
      duration: "2.5 hours",
      level: "Advanced",
      icon: <FileText size={32} className="text-purple-600" />
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
          <div className="elegant-card inline-block p-12 border-2 border-purple-100 mb-8">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full">
                <BookOpen size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Investment Learning Center</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Master the art of investing with our comprehensive courses and expert-curated resources designed for the Tanzanian market.
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="elegant-card group hover:scale-105 transition-all duration-300 border-2 border-purple-50">
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{course.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{course.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold">
                  {course.level}
                </span>
                <span className="text-sm text-gray-500 font-medium">{course.duration}</span>
              </div>
              <button className="elegant-button-primary w-full flex items-center justify-center">
                <Play size={16} className="mr-2" />
                Start Course
              </button>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Additional <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Resources</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="elegant-card border-2 border-purple-50">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Investment Glossary</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive dictionary of investment terms and concepts specific to the Tanzanian market.
              </p>
              <button className="elegant-button-secondary">
                Explore Glossary
              </button>
            </div>
            <div className="elegant-card border-2 border-purple-50">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Market Insights</h3>
              <p className="text-gray-600 mb-4">
                Weekly market analysis and expert commentary on trends affecting Tanzanian investments.
              </p>
              <button className="elegant-button-secondary">
                Read Insights
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;

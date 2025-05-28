
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Play, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Learning = () => {
  const courses = [
    {
      title: "Investment Basics",
      description: "Learn the fundamentals of investing in the Tanzanian market",
      duration: "2 hours",
      level: "Beginner",
      icon: <BookOpen size={24} className="text-neo-accent" />
    },
    {
      title: "Stock Analysis",
      description: "Master the art of analyzing companies and their stocks",
      duration: "3 hours",
      level: "Intermediate",
      icon: <TrendingUp size={24} className="text-neo-accent" />
    },
    {
      title: "Portfolio Management",
      description: "Build and manage a diversified investment portfolio",
      duration: "2.5 hours",
      level: "Advanced",
      icon: <FileText size={24} className="text-neo-accent" />
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
            <BookOpen size={64} className="text-neo-accent mx-auto mb-4" />
            <h1 className="text-4xl font-extrabold mb-4">Investment Learning Center</h1>
            <p className="text-xl text-gray-700">Master the art of investing with our comprehensive courses and resources</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="neo-card p-6">
              <div className="mb-4">{course.icon}</div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm bg-neo-accent text-neo-text px-2 py-1 rounded-none font-bold">{course.level}</span>
                <span className="text-sm text-gray-500">{course.duration}</span>
              </div>
              <Button className="neo-button w-full flex items-center justify-center">
                <Play size={16} className="mr-2" />
                Start Course
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learning;

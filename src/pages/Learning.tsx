import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Play, FileText, TrendingUp, CheckCircle, Clock, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FinanceChatbot from '@/components/FinanceChatbot';
import CourseContent from '@/components/CourseContent';

const Learning = () => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [activeCourse, setActiveCourse] = useState<number | null>(null);

  const courses = [
    {
      id: 1,
      title: "Investment Basics",
      description: "Learn the fundamentals of investing in the Tanzanian market with expert guidance and practical examples.",
      duration: "2 hours",
      level: "Beginner",
      icon: <BookOpen size={32} className="text-purple-600" />,
      lessons: 8,
      students: 1234,
      content: {
        overview: "Master the fundamentals of investing in Tanzania's growing economy. This comprehensive course covers everything from basic investment principles to practical strategies for building wealth in the Tanzanian market.",
        modules: [
          {
            title: "Understanding Investment Fundamentals",
            duration: "15 mins",
            topics: ["What is investing?", "Risk vs Return", "Time value of money", "Compound interest power"]
          },
          {
            title: "Tanzanian Investment Landscape",
            duration: "20 mins", 
            topics: ["Dar es Salaam Stock Exchange (DSE)", "Government bonds", "Unit trusts", "Real estate opportunities"]
          },
          {
            title: "Setting Investment Goals",
            duration: "15 mins",
            topics: ["SMART financial goals", "Emergency fund building", "Short vs long-term objectives"]
          },
          {
            title: "Risk Assessment & Management",
            duration: "20 mins",
            topics: ["Personal risk tolerance", "Diversification strategies", "Common investment mistakes"]
          }
        ],
        keyTakeaways: [
          "Understanding the relationship between risk and potential returns",
          "How to evaluate your personal financial situation before investing",
          "Knowledge of Tanzanian investment options and regulations",
          "Practical steps to start your investment journey safely"
        ]
      }
    },
    {
      id: 2,
      title: "Stock Analysis",
      description: "Master the art of analyzing companies and their stocks using proven methodologies and tools.",
      duration: "3 hours",
      level: "Intermediate",
      icon: <TrendingUp size={32} className="text-purple-600" />,
      lessons: 12,
      students: 856,
      content: {
        overview: "Develop professional-level skills in analyzing stocks listed on the Dar es Salaam Stock Exchange. Learn to read financial statements, calculate key ratios, and make informed investment decisions.",
        modules: [
          {
            title: "Financial Statement Analysis",
            duration: "25 mins",
            topics: ["Income statement deep dive", "Balance sheet analysis", "Cash flow statements", "Key financial ratios"]
          },
          {
            title: "Company Valuation Methods",
            duration: "30 mins",
            topics: ["Price-to-earnings ratio", "Book value analysis", "Dividend yield calculations", "Growth rate assessment"]
          },
          {
            title: "DSE Market Dynamics",
            duration: "20 mins",
            topics: ["Market timing strategies", "Sector analysis", "Economic indicators impact", "Regulatory environment"]
          },
          {
            title: "Practical Stock Selection",
            duration: "25 mins",
            topics: ["Screening criteria", "Red flags to avoid", "Building a watchlist", "Entry and exit strategies"]
          }
        ],
        keyTakeaways: [
          "Ability to read and interpret financial statements confidently",
          "Skills to calculate and understand key valuation metrics",
          "Knowledge of DSE-specific factors affecting stock prices",
          "Practical framework for selecting quality stocks"
        ]
      }
    },
    {
      id: 3,
      title: "Portfolio Management",
      description: "Build and manage a diversified investment portfolio that aligns with your financial goals.",
      duration: "2.5 hours",
      level: "Advanced",
      icon: <FileText size={32} className="text-purple-600" />,
      lessons: 10,
      students: 543,
      content: {
        overview: "Learn advanced portfolio construction and management techniques. Understand asset allocation, rebalancing strategies, and performance measurement to optimize your investment returns while managing risk.",
        modules: [
          {
            title: "Asset Allocation Strategies", 
            duration: "20 mins",
            topics: ["Strategic vs tactical allocation", "Age-based allocation", "Risk-based allocation", "Tanzanian market considerations"]
          },
          {
            title: "Diversification Techniques",
            duration: "25 mins",
            topics: ["Sector diversification", "Geographic diversification", "Asset class mixing", "Correlation analysis"]
          },
          {
            title: "Portfolio Rebalancing",
            duration: "15 mins",
            topics: ["When to rebalance", "Rebalancing methods", "Tax implications", "Cost considerations"]
          },
          {
            title: "Performance Measurement",
            duration: "20 mins",
            topics: ["Benchmark selection", "Risk-adjusted returns", "Performance attribution", "Regular review process"]
          }
        ],
        keyTakeaways: [
          "Skills to construct well-diversified portfolios",
          "Understanding of when and how to rebalance investments",
          "Ability to measure and evaluate portfolio performance",
          "Knowledge of advanced risk management techniques"
        ]
      }
    }
  ];

  const CourseDetailModal = ({ course, onClose }: { course: any, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              {course.icon}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center"><Clock size={16} className="mr-1" />{course.duration}</span>
                  <span className="flex items-center"><BookOpen size={16} className="mr-1" />{course.lessons} lessons</span>
                  <span className="flex items-center"><Users size={16} className="mr-1" />{course.students} students</span>
                </div>
              </div>
            </div>
            <Button onClick={onClose} variant="ghost" className="text-gray-500 hover:text-gray-700">×</Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Course Overview</h3>
            <p className="text-gray-600 leading-relaxed">{course.content.overview}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Course Modules</h3>
            <div className="space-y-4">
              {course.content.modules.map((module: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-900">{module.title}</h4>
                    <span className="text-sm text-gray-500">{module.duration}</span>
                  </div>
                  <ul className="space-y-1">
                    {module.topics.map((topic: string, topicIndex: number) => (
                      <li key={topicIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle size={16} className="mr-2 text-green-500" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Learning Outcomes</h3>
            <ul className="space-y-2">
              {course.content.keyTakeaways.map((takeaway: string, index: number) => (
                <li key={index} className="flex items-start text-gray-600">
                  <BarChart3 size={16} className="mr-2 text-purple-600 mt-1 flex-shrink-0" />
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-4">
            <Button 
              className="elegant-button-primary flex-1"
              onClick={() => {
                setActiveCourse(course.id);
                onClose();
              }}
            >
              <Play size={16} className="mr-2" />
              Start Course
            </Button>
            <Button variant="outline" className="px-6">
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

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
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                💡 <strong>New!</strong> Try our AI Finance Assistant - click the chat button in the bottom right to get instant answers to your investment questions!
              </p>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="elegant-card group hover:scale-105 transition-all duration-300 border-2 border-purple-50 cursor-pointer" onClick={() => setSelectedCourse(course.id)}>
              <CardHeader className="pb-4">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{course.icon}</div>
                <CardTitle className="text-xl font-bold text-gray-900">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold">
                      {course.level}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center"><BookOpen size={14} className="mr-1" />{course.lessons} lessons</span>
                    <span className="flex items-center"><Users size={14} className="mr-1" />{course.students} students</span>
                  </div>
                </div>
                <Button className="elegant-button-primary w-full flex items-center justify-center" onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCourse(course.id);
                }}>
                  <Play size={16} className="mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Additional <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Resources</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="elegant-card border-2 border-purple-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Investment Glossary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comprehensive dictionary of investment terms and concepts specific to the Tanzanian market.
                </p>
                <Button className="elegant-button-secondary">
                  Explore Glossary
                </Button>
              </CardContent>
            </Card>
            <Card className="elegant-card border-2 border-purple-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Weekly market analysis and expert commentary on trends affecting Tanzanian investments.
                </p>
                <Button className="elegant-button-secondary">
                  Read Insights
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetailModal 
          course={courses.find(c => c.id === selectedCourse)} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}

      {/* Active Course Content */}
      {activeCourse && (
        <CourseContent
          courseId={activeCourse}
          onClose={() => setActiveCourse(null)}
        />
      )}

      {/* AI Chatbot */}
      <FinanceChatbot />
    </div>
  );
};

export default Learning;

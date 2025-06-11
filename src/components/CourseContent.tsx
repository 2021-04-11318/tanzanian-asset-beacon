
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, BookOpen, TrendingUp, Target, Shield, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Module {
  id: number;
  title: string;
  duration: string;
  topics: string[];
  content: {
    overview: string;
    keyPoints: string[];
    infographic: {
      title: string;
      sections: Array<{
        title: string;
        value: string;
        description: string;
        icon: React.ReactNode;
      }>;
    };
    practicalTips: string[];
    quiz?: Array<{
      question: string;
      options: string[];
      correct: number;
    }>;
  };
}

interface CourseContentProps {
  courseId: number;
  onClose: () => void;
}

const CourseContent: React.FC<CourseContentProps> = ({ courseId, onClose }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const investmentBasicsModules: Module[] = [
    {
      id: 1,
      title: "Understanding Investment Fundamentals",
      duration: "15 mins",
      topics: ["What is investing?", "Risk vs Return", "Time value of money", "Compound interest power"],
      content: {
        overview: "Investment is the act of allocating money or resources with the expectation of generating income or profit over time. It's fundamentally about putting your money to work for you, rather than letting it sit idle.",
        keyPoints: [
          "Investment involves purchasing assets that may increase in value over time",
          "All investments carry some level of risk - higher potential returns typically come with higher risk",
          "Time is your greatest ally in investing - the earlier you start, the more you can benefit from compound growth",
          "Diversification helps spread risk across different types of investments"
        ],
        infographic: {
          title: "Investment Growth Over Time",
          sections: [
            {
              title: "1 Year",
              value: "TSh 1,100,000",
              description: "10% annual return",
              icon: <TrendingUp className="text-green-500" size={24} />
            },
            {
              title: "5 Years", 
              value: "TSh 1,610,000",
              description: "Compound growth",
              icon: <Target className="text-blue-500" size={24} />
            },
            {
              title: "10 Years",
              value: "TSh 2,590,000",
              description: "Power of compounding",
              icon: <TrendingUp className="text-purple-500" size={24} />
            },
            {
              title: "20 Years",
              value: "TSh 6,730,000",
              description: "Long-term wealth",
              icon: <Target className="text-gold-500" size={24} />
            }
          ]
        },
        practicalTips: [
          "Start with small amounts - even TSh 10,000 per month can grow significantly over time",
          "Set up automatic transfers to make investing a habit",
          "Don't try to time the market - consistent investing often beats perfect timing",
          "Educate yourself continuously about different investment options available in Tanzania"
        ]
      }
    },
    {
      id: 2,
      title: "Tanzanian Investment Landscape", 
      duration: "20 mins",
      topics: ["Dar es Salaam Stock Exchange (DSE)", "Government bonds", "Unit trusts", "Real estate opportunities"],
      content: {
        overview: "Tanzania offers various investment opportunities for both local and international investors. Understanding the local market structure and available instruments is crucial for making informed investment decisions.",
        keyPoints: [
          "The Dar es Salaam Stock Exchange (DSE) is the primary securities exchange in Tanzania",
          "Government bonds offer lower-risk investment options backed by the Tanzanian government",
          "Unit trusts provide diversified exposure to multiple securities with professional management",
          "Real estate remains a popular investment choice with potential for capital appreciation and rental income"
        ],
        infographic: {
          title: "Tanzania Investment Options",
          sections: [
            {
              title: "DSE Stocks",
              value: "20+ Companies",
              description: "Listed on exchange",
              icon: <TrendingUp className="text-blue-600" size={24} />
            },
            {
              title: "Government Bonds",
              value: "5-15% Returns",
              description: "Annual yield range",
              icon: <Shield className="text-green-600" size={24} />
            },
            {
              title: "Unit Trusts",
              value: "8+ Funds",
              description: "Available options",
              icon: <Target className="text-purple-600" size={24} />
            },
            {
              title: "Real Estate",
              value: "12-20% ROI",
              description: "Potential returns",
              icon: <BookOpen className="text-orange-600" size={24} />
            }
          ]
        },
        practicalTips: [
          "Open a Central Depository System (CDS) account to trade on the DSE",
          "Consider starting with government bonds for lower-risk exposure",
          "Research unit trust performance and fees before investing",
          "Location is crucial for real estate investments - focus on growing areas like Dodoma and Dar es Salaam suburbs"
        ]
      }
    },
    {
      id: 3,
      title: "Setting Investment Goals",
      duration: "15 mins", 
      topics: ["SMART financial goals", "Emergency fund building", "Short vs long-term objectives"],
      content: {
        overview: "Successful investing starts with clear, well-defined goals. Whether you're saving for retirement, a house, or your children's education, having specific targets helps guide your investment strategy and keep you motivated.",
        keyPoints: [
          "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound",
          "Emergency funds should cover 3-6 months of living expenses before major investing",
          "Short-term goals (1-3 years) require different strategies than long-term goals (10+ years)",
          "Regular review and adjustment of goals ensures they remain relevant to your situation"
        ],
        infographic: {
          title: "Investment Goal Timeline",
          sections: [
            {
              title: "Emergency Fund",
              value: "3-6 Months",
              description: "Living expenses",
              icon: <Shield className="text-red-500" size={24} />
            },
            {
              title: "Short-term",
              value: "1-3 Years", 
              description: "Car, vacation, wedding",
              icon: <Target className="text-blue-500" size={24} />
            },
            {
              title: "Medium-term",
              value: "3-10 Years",
              description: "House deposit, business",
              icon: <TrendingUp className="text-green-500" size={24} />
            },
            {
              title: "Long-term",
              value: "10+ Years",
              description: "Retirement, education",
              icon: <BookOpen className="text-purple-500" size={24} />
            }
          ]
        },
        practicalTips: [
          "Write down your goals and review them monthly",
          "Start with one major goal to avoid spreading resources too thin",
          "Use separate accounts for different goals to track progress easily",
          "Adjust contributions based on income changes and goal priority"
        ]
      }
    },
    {
      id: 4,
      title: "Risk Assessment & Management",
      duration: "20 mins",
      topics: ["Personal risk tolerance", "Diversification strategies", "Common investment mistakes"],
      content: {
        overview: "Understanding and managing investment risk is crucial for long-term success. Risk tolerance varies by individual and should align with your goals, timeline, and financial situation.",
        keyPoints: [
          "Risk tolerance depends on your age, income stability, and emotional comfort with volatility",
          "Diversification across asset classes, sectors, and geographies reduces overall portfolio risk",
          "Common mistakes include emotional investing, lack of diversification, and trying to time the market",
          "Regular portfolio review and rebalancing helps maintain desired risk levels"
        ],
        infographic: {
          title: "Risk vs Return Profile",
          sections: [
            {
              title: "Conservative",
              value: "3-6% Return",
              description: "Low risk, stable",
              icon: <Shield className="text-green-600" size={24} />
            },
            {
              title: "Moderate",
              value: "6-10% Return", 
              description: "Balanced approach",
              icon: <Target className="text-blue-600" size={24} />
            },
            {
              title: "Aggressive",
              value: "10-15% Return",
              description: "Higher risk/reward",
              icon: <TrendingUp className="text-orange-600" size={24} />
            },
            {
              title: "Speculative",
              value: "15%+ Return",
              description: "Very high risk",
              icon: <BookOpen className="text-red-600" size={24} />
            }
          ]
        },
        practicalTips: [
          "Never invest money you can't afford to lose in high-risk investments",
          "Don't put all your money in one stock or sector",
          "Avoid making investment decisions based on emotions or market hype",
          "Regular small investments often outperform trying to time large purchases"
        ]
      }
    }
  ];

  const currentModuleData = investmentBasicsModules[currentModule];
  const progress = ((currentModule + 1) / investmentBasicsModules.length) * 100;

  const handleCompleteModule = () => {
    setCompletedModules(prev => new Set([...prev, currentModule]));
    if (currentModule < investmentBasicsModules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  const handlePrevious = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
    }
  };

  const handleNext = () => {
    if (currentModule < investmentBasicsModules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex justify-between items-center mb-4">
            <Button onClick={onClose} variant="ghost" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft size={16} className="mr-2" />
              Back to Courses
            </Button>
            <div className="text-sm text-gray-600">
              Module {currentModule + 1} of {investmentBasicsModules.length}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Basics</h1>
          <Progress value={progress} className="w-full h-2" />
        </div>

        {/* Module Navigation */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex space-x-2 overflow-x-auto">
            {investmentBasicsModules.map((module, index) => (
              <Button
                key={index}
                onClick={() => setCurrentModule(index)}
                variant={index === currentModule ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  completedModules.has(index) ? 'bg-green-100 border-green-300' : ''
                }`}
              >
                {completedModules.has(index) && <CheckCircle size={14} className="mr-1" />}
                {module.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Module Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{currentModuleData.title}</h2>
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-1" />
                  {currentModuleData.duration}
                </span>
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  variant="outline"
                  size="sm"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              {currentModuleData.content.overview}
            </p>
          </div>

          {/* Key Points */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Key Learning Points</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentModuleData.content.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={16} className="mr-3 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Interactive Infographic */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{currentModuleData.content.infographic.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentModuleData.content.infographic.sections.map((section, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="mb-3 flex justify-center">
                      {section.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {section.value}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      {section.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {section.description}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Practical Tips */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Practical Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {currentModuleData.content.practicalTips.map((tip, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentModule === 0}
              variant="outline"
            >
              <ArrowLeft size={16} className="mr-2" />
              Previous Module
            </Button>
            
            <div className="flex space-x-3">
              {!completedModules.has(currentModule) && (
                <Button onClick={handleCompleteModule} className="elegant-button-primary">
                  <CheckCircle size={16} className="mr-2" />
                  Complete Module
                </Button>
              )}
              
              {currentModule < investmentBasicsModules.length - 1 ? (
                <Button onClick={handleNext} className="elegant-button-secondary">
                  Next Module
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button onClick={onClose} className="elegant-button-primary">
                  Finish Course
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;

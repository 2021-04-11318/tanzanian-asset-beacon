
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BookOpen, Newspaper, FileText, Wallet, ArrowRight, BarChart3, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSectionDemo } from '@/components/HeroSectionDemo';

const Landing = () => {
  const features = [
    {
      icon: <BarChart3 size={48} className="text-purple-600" />,
      title: "Track Your Portfolio",
      description: "Monitor your shares, bonds, and units with real-time updates and comprehensive analytics."
    },
    {
      icon: <BookOpen size={48} className="text-purple-600" />,
      title: "Learn & Grow",
      description: "Access educational content, investment guides, and expert insights to improve your investment knowledge."
    },
    {
      icon: <Newspaper size={48} className="text-purple-600" />,
      title: "Market News",
      description: "Stay updated with the latest market trends, news, and analysis from Tanzania's financial markets."
    },
    {
      icon: <Shield size={48} className="text-purple-600" />,
      title: "Secure & Reliable",
      description: "Your investment data is protected with bank-level security and reliable performance."
    }
  ];

  const stats = [
    { number: "1000+", label: "Active Users" },
    { number: "TZS 2B+", label: "Assets Tracked" },
    { number: "50+", label: "Listed Companies" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
              <Wallet size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              TZ Portfolio Tracker
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/portfolio" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Portfolio</Link>
            <Link to="/learning" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Learning</Link>
            <Link to="/news" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">News</Link>
            <Link to="/reports" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Reports</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSectionDemo />

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and insights for modern investors in Tanzania's growing financial markets.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="elegant-card text-center group hover:scale-105 transition-transform duration-300">
                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="elegant-card p-12 border-2 border-purple-100">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full">
                <Users size={48} className="text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Join Thousands of Smart Investors
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Start your investment journey today with Tanzania's most trusted portfolio tracking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portfolio">
                <button className="elegant-button-primary flex items-center text-lg px-8 py-4">
                  <Wallet size={20} className="mr-2" />
                  Access Portfolio
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </Link>
              <Link to="/learning">
                <button className="elegant-button-secondary flex items-center text-lg px-8 py-4">
                  <BookOpen size={20} className="mr-2" />
                  Start Learning
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
                  <Wallet size={20} className="text-white" />
                </div>
                <span className="font-bold text-lg text-gray-900">TZ Portfolio</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Empowering Tanzanian investors with world-class portfolio management tools and insights.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Platform</h4>
              <div className="space-y-3">
                <Link to="/portfolio" className="block text-gray-600 hover:text-purple-600 transition-colors">Portfolio</Link>
                <Link to="/learning" className="block text-gray-600 hover:text-purple-600 transition-colors">Learning</Link>
                <Link to="/news" className="block text-gray-600 hover:text-purple-600 transition-colors">News</Link>
                <Link to="/reports" className="block text-gray-600 hover:text-purple-600 transition-colors">Reports</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Resources</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Investment Guide</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Market Analysis</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">API Documentation</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Support</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Connect</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Twitter</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">LinkedIn</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Facebook</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-500">&copy; {new Date().getFullYear()} TZ Portfolio Tracker. Crafted with excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

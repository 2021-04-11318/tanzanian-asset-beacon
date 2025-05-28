
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BookOpen, Newspaper, FileText, Wallet, ArrowRight, BarChart3, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const features = [
    {
      icon: <BarChart3 size={48} className="text-neo-accent" />,
      title: "Track Your Portfolio",
      description: "Monitor your shares, bonds, and units with real-time updates and comprehensive analytics."
    },
    {
      icon: <BookOpen size={48} className="text-neo-accent" />,
      title: "Learn & Grow",
      description: "Access educational content, investment guides, and expert insights to improve your investment knowledge."
    },
    {
      icon: <Newspaper size={48} className="text-neo-accent" />,
      title: "Market News",
      description: "Stay updated with the latest market trends, news, and analysis from Tanzania's financial markets."
    },
    {
      icon: <Shield size={48} className="text-neo-accent" />,
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
    <div className="min-h-screen bg-neo-bg text-neo-text">
      {/* Header */}
      <header className="border-b-2 border-neo-border bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet size={32} className="text-neo-accent" strokeWidth={2.5} />
            <h1 className="text-2xl font-extrabold">TZ Portfolio Tracker</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/portfolio" className="font-medium hover:text-neo-accent transition-colors">Portfolio</Link>
            <Link to="/learning" className="font-medium hover:text-neo-accent transition-colors">Learning</Link>
            <Link to="/news" className="font-medium hover:text-neo-accent transition-colors">News</Link>
            <Link to="/reports" className="font-medium hover:text-neo-accent transition-colors">Reports</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block border-2 border-neo-border p-8 shadow-neo-hard bg-white mb-8">
            <h1 className="text-4xl md:text-6xl font-extrabold text-neo-text mb-6">
              Master Your <span className="text-neo-accent">Investment</span> Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Track your portfolio, learn from experts, and stay informed with Tanzania's most comprehensive investment platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portfolio">
                <Button className="neo-button text-lg px-8 py-4 flex items-center">
                  Start Tracking <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/learning">
                <Button className="neo-button-secondary text-lg px-8 py-4 flex items-center">
                  Learn More <BookOpen size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white border-y-2 border-neo-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-neo-accent mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16">
            Everything You Need to <span className="text-neo-accent">Succeed</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="neo-card text-center p-6">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white border-t-2 border-neo-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="neo-card p-12">
            <Users size={64} className="text-neo-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Join Thousands of Smart Investors
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Start your investment journey today with Tanzania's most trusted portfolio tracking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portfolio">
                <Button className="neo-button text-lg px-8 py-4 flex items-center">
                  <Wallet size={20} className="mr-2" />
                  Access Portfolio
                </Button>
              </Link>
              <Link to="/learning">
                <Button className="neo-button-secondary text-lg px-8 py-4 flex items-center">
                  <BookOpen size={20} className="mr-2" />
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t-2 border-neo-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wallet size={24} className="text-neo-accent" />
                <span className="font-extrabold text-lg">TZ Portfolio</span>
              </div>
              <p className="text-gray-600">Empowering Tanzanian investors with world-class portfolio management tools.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <div className="space-y-2">
                <Link to="/portfolio" className="block text-gray-600 hover:text-neo-accent transition-colors">Portfolio</Link>
                <Link to="/learning" className="block text-gray-600 hover:text-neo-accent transition-colors">Learning</Link>
                <Link to="/news" className="block text-gray-600 hover:text-neo-accent transition-colors">News</Link>
                <Link to="/reports" className="block text-gray-600 hover:text-neo-accent transition-colors">Reports</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-neo-accent transition-colors">Investment Guide</a>
                <a href="#" className="block text-gray-600 hover:text-neo-accent transition-colors">Market Analysis</a>
                <a href="#" className="block text-gray-600 hover:text-neo-accent transition-colors">API Documentation</a>
                <a href="#" className="block text-gray-600 hover:text-neo-accent transition-colors">Support</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-neo-accent transition-colors">Twitter</a>
                <a href="#" className="block text-gray-600 hover:text-neo-accent transition-colors">LinkedIn</a>
                <a href="#" className="block text-gray-600 hover:text-neo-accent transition-colors">Facebook</a>
                <a href="#" className="block text-gray-600 hover:text-neo-accent transition-colors">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t-2 border-neo-border">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} TZ Portfolio Tracker. Brutally Yours.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

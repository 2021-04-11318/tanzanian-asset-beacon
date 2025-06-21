
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BookOpen, Newspaper, FileText, Wallet, ArrowRight, BarChart3, Shield, Users, LogIn, Star, Mail, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSectionDemo } from '@/components/HeroSectionDemo';
import InteractiveDemo from '@/components/InteractiveDemo';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Landing = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: <BarChart3 size={48} className="text-purple-600" />,
      title: "Track Your Portfolio",
      description: "Keep a close eye on your DSE shares, T-bills, and bonds with real-time updates that help you make smart decisions for your financial future."
    },
    {
      icon: <BookOpen size={48} className="text-purple-600" />,
      title: "Learn & Grow",
      description: "Build your investment knowledge with guides tailored for Tanzanians, from basics to advanced strategies that work in our markets."
    },
    {
      icon: <Newspaper size={48} className="text-purple-600" />,
      title: "Stay Informed",
      description: "Get the latest news from DSE, economic updates, and market insights that matter to your investment journey in Tanzania."
    },
    {
      icon: <Shield size={48} className="text-purple-600" />,
      title: "Safe & Trusted",
      description: "Your financial information is protected with the highest security standards, giving you peace of mind as you build wealth."
    }
  ];

  const stats = [
    { number: "1000+", label: "Tanzanian Investors", context: "Trust our platform" },
    { number: "TZS 2B+", label: "Wealth Tracked", context: "Growing every day" },
    { number: "50+", label: "Companies Listed", context: "Complete DSE coverage" },
    { number: "99.9%", label: "Always Available", context: "When you need us" }
  ];

  const testimonials = [
    {
      name: "Amina Hassan",
      role: "Small Business Owner",
      company: "Dar es Salaam",
      quote: "This platform helped me understand my CRDB shares better. Now I feel confident about my investments and can plan for my children's future.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "John Mwalimu",
      role: "Teacher & Investor",
      company: "Arusha",
      quote: "As a teacher, I needed something simple to track my government bonds. This tool makes it easy to see how my savings are growing for retirement.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Grace Makena",
      role: "Financial Advisor",
      company: "Mwanza",
      quote: "I recommend this to all my clients who want to take control of their financial future. It's made investing accessible for everyday Tanzanians.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Here you would integrate with your email service
    toast({
      title: "Asante sana! Thanks for joining us!",
      description: "You'll receive weekly market updates and investment tips in Swahili and English.",
    });
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Sticky CTA Header */}
      {!user && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-4 text-center">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-sm font-medium">Anza safari yako ya uwekezaji leo! Start your investment journey today!</span>
            <Link to="/auth">
              <button className="bg-white text-purple-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Jiunge Bure | Join Free
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`relative z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50 ${!user ? 'mt-10' : ''}`}>
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
            {user ? (
              <>
                <Link to="/portfolio" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Portfolio</Link>
                <Link to="/learning" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Learning</Link>
                <Link to="/news" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">News</Link>
                <Link to="/reports" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Reports</Link>
              </>
            ) : (
              <>
                <Link to="/learning" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Learning</Link>
                <Link to="/news" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">News</Link>
                <Link to="/reports" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Reports</Link>
                <Link to="#demo" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Demo</Link>
                <Link to="/auth">
                  <button className="elegant-button-primary flex items-center hover:scale-105 transition-transform">
                    <LogIn size={16} className="mr-2" />
                    Sign In
                  </button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSectionDemo />

      {/* Stats Section with Context - Increased padding */}
      <section className="py-24 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tunaaminika na Wawekezi wa Kitanzania</h2>
            <p className="text-lg text-gray-600">Trusted by Tanzanian Investors Nationwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-900 font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.context}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Increased padding */}
      <section className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Kila Kitu Unachohitaji Kufanikiwa <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Everything You Need to Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for Tanzanian investors to grow their wealth with confidence.
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

      {/* Testimonials Section - Increased padding */}
      <section className="py-28 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Wanavyosema Wawekezi Wenzetu <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">What Our Fellow Investors Say</span>
            </h2>
            <p className="text-xl text-gray-600">Real stories from Tanzanians building their financial future</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="elegant-card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section - Increased padding */}
      <section id="demo" className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ona Jinsi TZ Portfolio Tracker Inavyofanya Kazi <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">See How It Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a guided tour of our platform and discover how easy it is to manage your investments like a pro.
            </p>
          </div>
          
          <InteractiveDemo />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link to="/auth">
              <button className="elegant-button-primary flex items-center text-lg px-8 py-4 hover:scale-105 transition-transform">
                <Wallet size={20} className="mr-2" />
                Anza Bure | Start Free
                <ArrowRight size={16} className="ml-2" />
              </button>
            </Link>
            <Link to="/learning">
              <button className="elegant-button-secondary flex items-center text-lg px-8 py-4">
                <BookOpen size={20} className="mr-2" />
                Jifunze Zaidi | Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Increased padding */}
      <section className="py-28 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="elegant-card p-16 border-2 border-purple-100">
            <div className="mb-8 flex justify-center">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse">
                <Users size={48} className="text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Jiunge na Familia ya Wawekezi Werevu
            </h2>
            <p className="text-lg text-gray-600 mb-4 font-medium">Join Our Community of Smart Investors</p>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Start building your wealth today with Tanzania's most trusted and user-friendly investment platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Link to="/portfolio">
                    <button className="elegant-button-primary flex items-center text-lg px-8 py-4 hover:scale-105 transition-transform">
                      <Wallet size={20} className="mr-2" />
                      Fungua Portfolio | Access Portfolio
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </Link>
                  <Link to="/learning">
                    <button className="elegant-button-secondary flex items-center text-lg px-8 py-4">
                      <BookOpen size={20} className="mr-2" />
                      Anza Kujifunza | Start Learning
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <button className="elegant-button-primary flex items-center text-lg px-8 py-4 hover:scale-105 transition-transform animate-pulse">
                      <LogIn size={20} className="mr-2" />
                      Jiunge Bure | Get Started Free
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </Link>
                  <Link to="/learning">
                    <button className="elegant-button-secondary flex items-center text-lg px-8 py-4">
                      <BookOpen size={20} className="mr-2" />
                      Jifunze Zaidi | Learn More
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Increased padding */}
      <section className="py-20 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="elegant-card p-10 border-2 border-purple-100">
            <Mail size={48} className="text-purple-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Baki Umejulikana | Stay Updated</h3>
            <p className="text-gray-600 mb-8">Get weekly market insights and investment tips delivered in both Swahili and English</p>
            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Weka barua pepe yako | Enter your email"
                className="elegant-input flex-1"
                required
              />
              <button
                type="submit"
                className="elegant-button-primary flex items-center justify-center px-6"
              >
                <Mail size={16} className="mr-2" />
                Jiunge | Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer - Increased padding */}
      <footer className="py-20 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
                  <Wallet size={20} className="text-white" />
                </div>
                <span className="font-bold text-lg text-gray-900">TZ Portfolio</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tunawasaidia Watanzania kuongoza mazingira yao ya kifedha kwa kutumia zana za kisasa na maarifa ya kina.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Empowering Tanzanians with world-class portfolio management tools and insights.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                  <MessageCircle size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
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
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">DSE Market Data</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">API Documentation</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Support Center</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Connect</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">WhatsApp Support</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">LinkedIn</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Instagram</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-500">&copy; {new Date().getFullYear()} TZ Portfolio Tracker. Tengenezwa kwa upendo kwa ajili ya Wawekezi wa Kitanzania. Crafted with love for Tanzanian investors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

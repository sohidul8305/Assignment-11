import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaTag, 
  FaArrowRight, 
  FaEye, 
  FaShareAlt,
  FaBookmark,
  FaComment,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('blogs-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    // Set featured post
    setFeaturedPost(blogPosts[0]);
  }, []);

  const categories = [
    { id: 'all', name: 'All Topics', count: 12 },
    { id: 'loan-guide', name: 'Loan Guides', count: 4 },
    { id: 'financial-tips', name: 'Financial Tips', count: 3 },
    { id: 'investment', name: 'Investment', count: 2 },
    { id: 'credit-score', name: 'Credit Score', count: 2 },
    { id: 'tax-saving', name: 'Tax Saving', count: 1 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "How to Get Your First Business Loan Approved in 2024",
      excerpt: "Learn the step-by-step process to secure your first business loan with minimal documentation and maximum approval chances.",
      author: "Rajesh Mehta",
      date: "Mar 15, 2024",
      readTime: "8 min read",
      category: "loan-guide",
      tags: ["Business Loan", "Startup", "Funding"],
      image: "📈",
      color: "from-blue-500 to-cyan-500",
      views: 2450,
      comments: 42,
      featured: true,
      content: "Complete guide for entrepreneurs looking to secure their first business loan..."
    },
    {
      id: 2,
      title: "5 Smart Ways to Improve Your Credit Score in 30 Days",
      excerpt: "Discover proven strategies to boost your credit score quickly and unlock better loan opportunities.",
      author: "Priya Sharma",
      date: "Mar 10, 2024",
      readTime: "6 min read",
      category: "credit-score",
      tags: ["Credit Score", "Personal Finance", "Tips"],
      image: "📊",
      color: "from-green-500 to-emerald-500",
      views: 3210,
      comments: 89,
      featured: false,
      content: "Essential tips to improve your creditworthiness..."
    },
    {
      id: 3,
      title: "Home Loan vs. Personal Loan: Which is Better for Renovation?",
      excerpt: "Compare the pros and cons of using home loan top-up vs personal loan for your home renovation project.",
      author: "Amit Kumar",
      date: "Mar 5, 2024",
      readTime: "10 min read",
      category: "loan-guide",
      tags: ["Home Loan", "Personal Loan", "Comparison"],
      image: "🏠",
      color: "from-purple-500 to-pink-500",
      views: 1890,
      comments: 31,
      featured: false,
      content: "Detailed comparison between two popular loan options..."
    },
    {
      id: 4,
      title: "Tax Saving Investments for Salaried Professionals in 2024",
      excerpt: "Maximize your tax savings with these smart investment options under Section 80C and beyond.",
      author: "Neha Gupta",
      date: "Feb 28, 2024",
      readTime: "12 min read",
      category: "tax-saving",
      tags: ["Tax Saving", "Investment", "Section 80C"],
      image: "💰",
      color: "from-amber-500 to-orange-500",
      views: 4320,
      comments: 67,
      featured: false,
      content: "Complete tax planning guide for salaried individuals..."
    },
    {
      id: 5,
      title: "The Rise of Digital Lending: How Technology is Changing Loans",
      excerpt: "Explore how AI and blockchain are revolutionizing the lending industry with faster approvals and better rates.",
      author: "Tech Finance Team",
      date: "Feb 20, 2024",
      readTime: "15 min read",
      category: "financial-tips",
      tags: ["Digital Lending", "Technology", "AI"],
      image: "🤖",
      color: "from-indigo-500 to-violet-500",
      views: 2980,
      comments: 54,
      featured: false,
      content: "Future of lending with emerging technologies..."
    },
    {
      id: 6,
      title: "Emergency Fund vs. Personal Loan: Which Should You Choose?",
      excerpt: "Learn when to dip into your emergency fund and when to consider a personal loan during financial crises.",
      author: "Financial Advisors",
      date: "Feb 15, 2024",
      readTime: "7 min read",
      category: "financial-tips",
      tags: ["Emergency Fund", "Personal Finance", "Planning"],
      image: "🆘",
      color: "from-red-500 to-rose-500",
      views: 1760,
      comments: 28,
      featured: false,
      content: "Making the right choice during financial emergencies..."
    },
    {
      id: 7,
      title: "Education Loan Abroad: Complete Guide for Indian Students",
      excerpt: "Everything you need to know about securing education loans for studying in foreign universities.",
      author: "Study Abroad Experts",
      date: "Feb 10, 2024",
      readTime: "14 min read",
      category: "loan-guide",
      tags: ["Education Loan", "Study Abroad", "Students"],
      image: "🎓",
      color: "from-teal-500 to-cyan-500",
      views: 3980,
      comments: 73,
      featured: false,
      content: "Comprehensive guide for students planning to study overseas..."
    },
    {
      id: 8,
      title: "How to Negotiate Better Interest Rates on Your Car Loan",
      excerpt: "Proven negotiation tactics to get the best interest rates for your next car purchase.",
      author: "Auto Finance Experts",
      date: "Feb 5, 2024",
      readTime: "5 min read",
      category: "loan-guide",
      tags: ["Car Loan", "Negotiation", "Interest Rates"],
      image: "🚗",
      color: "from-yellow-500 to-amber-500",
      views: 1540,
      comments: 19,
      featured: false,
      content: "Tips for negotiating the best car loan deals..."
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const trendingPosts = blogPosts
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  const popularTags = [
    "Business Loan", "Credit Score", "Personal Finance", 
    "Investment", "Tax Saving", "Home Loan", "Education Loan", "Digital Lending"
  ];

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <section 
      id="blogs-section" 
      className="py-16 md:py-24 bg-base-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-semibold">FINANCE BLOG</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
            Latest <span className="text-primary">Finance Insights</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Expert advice, tips, and guides to help you make informed financial decisions
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-base-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <button className="btn btn-outline gap-2">
                <FaFilter />
                Filter
              </button>
              <button className="btn btn-primary gap-2">
                Subscribe
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-base-200 hover:bg-base-300 text-base-content'
                }`}
              >
                <span className="font-medium">{category.name}</span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-base-300'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-base-content/60 flex items-center gap-2">
              <FaTag /> Popular Tags:
            </span>
            {popularTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 bg-base-200 hover:bg-base-300 rounded-full text-sm transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Blog Post */}
        {featuredPost && (
          <div className={`mb-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-base-200 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Featured Image/Icon */}
                <div className={`p-12 bg-gradient-to-br ${featuredPost.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-20">
                      {featuredPost.image}
                    </div>
                  </div>
                  <div className="relative z-10">
                    {/* Featured Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold">FEATURED ARTICLE</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-white/80 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-white/80">
                        <FaUser />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <FaCalendarAlt />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <FaEye />
                        <span>{formatNumber(featuredPost.views)} views</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Content */}
                <div className="p-8 md:p-12">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        {featuredPost.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-base-300 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-base-content/70 mb-6 leading-relaxed">
                        {featuredPost.content}
                      </p>

                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors">
                            <FaBookmark />
                            <span>Save</span>
                          </button>
                          <button className="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors">
                            <FaShareAlt />
                            <span>Share</span>
                          </button>
                          <button className="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors">
                            <FaComment />
                            <span>{featuredPost.comments} Comments</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <Link to={`/blog/${featuredPost.id}`}>
                      <button className="btn btn-primary btn-lg rounded-full w-full group">
                        <span className="flex items-center justify-center gap-2">
                          Read Full Article
                          <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.slice(0, 4).map((post, index) => (
                <div
                  key={post.id}
                  className={`transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 h-full group">
                    <div className="card-body p-6">
                      {/* Category and Date */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${post.color} text-white`}>
                          {categories.find(c => c.id === post.category)?.name}
                        </div>
                        <div className="flex items-center gap-2 text-base-content/60 text-sm">
                          <FaCalendarAlt />
                          <span>{post.date}</span>
                        </div>
                      </div>

                      {/* Post Icon/Image */}
                      <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-br ${post.color} text-white text-3xl`}>
                        {post.image}
                      </div>

                      {/* Title */}
                      <h3 className="card-title text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-base-content/70 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-base-200 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-base-300">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-base-content/60">
                            <FaUser />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-base-content/60">
                            <FaEye />
                            <span>{formatNumber(post.views)}</span>
                          </div>
                        </div>
                        
                        <Link to={`/blog/${post.id}`}>
                          <button className="btn btn-ghost btn-sm gap-2 group">
                            Read More
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Posts */}
            <div className={`card bg-base-200 shadow-lg transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="card-body">
                <h4 className="card-title text-xl font-bold mb-4">
                  <span className="text-primary">Trending</span> Now
                </h4>
                <div className="space-y-4">
                  {trendingPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="block group"
                    >
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-base-300 transition-colors">
                        <div className="text-2xl font-bold text-base-content/30">
                          0{index + 1}
                        </div>
                        <div>
                          <h5 className="font-medium group-hover:text-primary transition-colors">
                            {post.title}
                          </h5>
                          <div className="flex items-center gap-2 text-sm text-base-content/60 mt-1">
                            <FaEye />
                            <span>{formatNumber(post.views)} views</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className={`card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="card-body">
                <h4 className="card-title text-xl font-bold mb-4">
                  Stay Updated
                </h4>
                <p className="text-base-content/70 mb-4">
                  Get the latest finance tips and loan guides directly in your inbox
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-base-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="btn btn-primary w-full rounded-2xl">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Stats */}
            <div className={`card bg-base-200 shadow-lg transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="card-body">
                <h4 className="card-title text-xl font-bold mb-4">
                  Blog <span className="text-primary">Stats</span>
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Articles", value: blogPosts.length },
                    { label: "Monthly Views", value: "45K+" },
                    { label: "Expert Authors", value: "12" },
                    { label: "Categories", value: categories.length - 1 }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-base-100 rounded-2xl">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-base-content/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Load More & CTA */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-base-200 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-base-content mb-6">
              Want to <span className="text-primary">Contribute</span> to Our Blog?
            </h3>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
              Are you a finance expert? Share your knowledge with our community of readers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg rounded-full px-8">
                Write for Us
              </button>
              <Link to="/blogs">
                <button className="btn btn-outline btn-lg rounded-full px-8">
                  View All Articles
                </button>
              </Link>
            </div>

            {/* Social Sharing */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <span className="text-base-content/60">Share this blog:</span>
              {["Twitter", "Facebook", "LinkedIn", "WhatsApp"].map((platform, idx) => (
                <button
                  key={idx}
                  className="px-4 py-2 bg-base-300 hover:bg-base-400 rounded-full transition-colors"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
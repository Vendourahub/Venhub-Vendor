import { useState } from 'react';
import { Search, ShoppingCart, Bell, ChevronDown, Store, Calendar, GraduationCap, Users, Activity, Handshake, TrendingUp, Sparkles, Award, Star, Heart, X, Filter, Tag, Truck, Shield } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useAuth } from './contexts/AuthContext';
import { toast } from 'sonner';

import { AuthModal } from './components/AuthModal';

type PageView = 'home' | 'product-detail' | 'vendor-shop' | 'category' | 'workshops' | 'search-results' | 'checkout';

export default function Marketplace() {
  const { user, role, switchRole, logout, isAuthenticated } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [notificationCount] = useState(3);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('trending');
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleGoToDashboard = () => {
    // Authentication disabled - direct access
    switchRole('vendor');
    setShowProfileMenu(false);
  };

  const handleGoToProfile = () => {
    // Authentication disabled - direct access
    // TODO: Navigate to profile page
    setShowProfileMenu(false);
  };

  const handleGoToSettings = () => {
    // TODO: Navigate to settings page
    setShowProfileMenu(false);
  };

  const handleGoToTimeline = () => {
    // TODO: Navigate to timeline page
    setShowProfileMenu(false);
  };

  const handleLogout = async () => {
    await logout();
    setShowProfileMenu(false);
  };

  const handleLogin = () => {
    setShowAuthModal(true);
    setShowProfileMenu(false);
  };

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.success(`Increased quantity of ${product.name}`);
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    const item = cartItems.find(i => i.id === productId);
    if (item) {
      toast.info(`${item.name} removed from cart`);
    }
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const toggleWishlist = (productIndex: number) => {
    setWishlistItems(prev => 
      prev.includes(productIndex) 
        ? prev.filter(id => id !== productIndex)
        : [...prev, productIndex]
    );
  };

  const navigateToProduct = (product: any) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo(0, 0);
  };

  const navigateToVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setCurrentPage('vendor-shop');
    window.scrollTo(0, 0);
  };

  const navigateToCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('category');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedProduct(null);
    setSelectedVendor(null);
    window.scrollTo(0, 0);
  };

  const navigateToWorkshops = () => {
    setCurrentPage('workshops');
    window.scrollTo(0, 0);
  };

  const navigateToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setCurrentPage('checkout');
    setShowCart(false);
    window.scrollTo(0, 0);
  };

  const categories = ['All', 'Fashion', 'Home', 'Beauty', 'Jewelry', 'Music', 'Art', 'Food'];

  const quickActions = [
    { icon: Store, label: 'Explore Shops', description: 'Browse all vendor stores & products', color: '#4A90E2' },
    { icon: Calendar, label: 'Join Workshops', description: 'View events & sign up', color: '#56A45E' },
    { icon: GraduationCap, label: 'Hire a Teacher', description: 'For educators with courses', color: '#F2994A' },
    { icon: Users, label: 'Discover Vendors', description: 'Vendor list + profiles', color: '#F5C33C' },
    { icon: Activity, label: 'Community Feed', description: 'Reels, posts, for you & following', color: '#4A90E2' }
  ];

  const aiCollections = [
    { 
      title: 'Gifts for Him', 
      badge: 'Trending', 
      description: 'Handpicked leather & accessories', 
      image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=300&fit=crop',
      items: 24
    },
    { 
      title: 'Home Decor Under ₦30k', 
      badge: 'Value Buys', 
      description: 'Affordable luxury for your space', 
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop',
      items: 36
    },
    { 
      title: 'Sustainable Fashion', 
      badge: 'Eco-Conscious', 
      description: 'Eco-friendly styles taking over Lagos', 
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop',
      items: 18
    }
  ];

  const featuredArtisans = [
    { 
      name: 'Essence of Africa', 
      category: 'Beauty & Skincare', 
      rating: 4.9, 
      followers: 1200, 
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
      products: 45
    },
    { 
      name: 'Lagos Leather Works', 
      category: 'Fashion', 
      rating: 4.7, 
      followers: 850, 
      image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=400&h=300&fit=crop',
      products: 32
    },
    { 
      name: 'Clay & Fire', 
      category: 'Home Decor', 
      rating: 4.8, 
      followers: 2100, 
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop',
      products: 67
    },
    { 
      name: 'Afro Couture', 
      category: 'Fashion Design', 
      rating: 4.9, 
      followers: 3500, 
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c8347?w=400&h=300&fit=crop',
      products: 89
    }
  ];

  const trendingProducts = [
    { 
      id: 1,
      name: 'Handwoven Raffia Bag', 
      category: 'Fashion', 
      rating: 4.8, 
      price: 15000, 
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
      vendor: 'Lagos Crafts', 
      reviews: 124, 
      inStock: true,
      description: 'Authentic handwoven raffia bag made by local artisans'
    },
    { 
      id: 2,
      name: 'Ceramic Clay Pot', 
      category: 'Home', 
      rating: 4.5, 
      price: 8500, 
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop',
      vendor: 'Clay & Fire', 
      reviews: 89, 
      inStock: true,
      description: 'Traditional handmade ceramic pot for home decor'
    },
    { 
      id: 3,
      name: 'Adire Silk Scarf', 
      category: 'Fashion', 
      rating: 4.9, 
      price: 22000, 
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
      vendor: 'Adire Kingdom', 
      reviews: 203, 
      inStock: true,
      description: 'Premium silk scarf with traditional Adire patterns'
    },
    { 
      id: 4,
      name: 'Organic Shea Butter', 
      category: 'Beauty', 
      rating: 4.7, 
      price: 3000, 
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
      vendor: 'Essence of Africa', 
      reviews: 456, 
      inStock: true,
      description: 'Pure unrefined shea butter from northern Nigeria'
    },
    { 
      id: 5,
      name: 'Beaded Necklace', 
      category: 'Jewelry', 
      rating: 4.6, 
      price: 5000, 
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
      vendor: 'Bead Creations', 
      reviews: 78, 
      inStock: true,
      description: 'Handcrafted traditional beaded necklace'
    },
    { 
      id: 6,
      name: 'Talking Drum', 
      category: 'Music', 
      rating: 5.0, 
      price: 12000, 
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=400&fit=crop',
      vendor: 'Heritage Sounds', 
      reviews: 34, 
      inStock: true,
      description: 'Authentic African talking drum, handmade'
    },
    { 
      id: 7,
      name: 'Ankara Print Dress', 
      category: 'Fashion', 
      rating: 4.9, 
      price: 28000, 
      image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=400&fit=crop',
      vendor: 'Afro Couture', 
      reviews: 167, 
      inStock: true,
      description: 'Stylish Ankara print dress, perfect for any occasion'
    },
    { 
      id: 8,
      name: 'Wooden Wall Art', 
      category: 'Art', 
      rating: 4.8, 
      price: 35000, 
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=400&fit=crop',
      vendor: 'Wood Masters', 
      reviews: 92, 
      inStock: true,
      description: 'Hand-carved wooden wall art with African motifs'
    },
    { 
      id: 9,
      name: 'Natural Soap Set', 
      category: 'Beauty', 
      rating: 4.6, 
      price: 4500, 
      image: 'https://images.unsplash.com/photo-1588945185150-23e0f332d88c?w=400&h=400&fit=crop',
      vendor: 'Pure Glow', 
      reviews: 201, 
      inStock: true,
      description: 'Set of 3 natural handmade soaps with essential oils'
    },
    { 
      id: 10,
      name: 'Leather Sandals', 
      category: 'Fashion', 
      rating: 4.7, 
      price: 18000, 
      image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop',
      vendor: 'Lagos Leather Works', 
      reviews: 156, 
      inStock: true,
      description: 'Premium leather sandals, handcrafted for comfort'
    },
    { 
      id: 11,
      name: 'Woven Table Mat Set', 
      category: 'Home', 
      rating: 4.5, 
      price: 6000, 
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop',
      vendor: 'Home Weavers', 
      reviews: 67, 
      inStock: true,
      description: 'Set of 4 handwoven table mats'
    },
    { 
      id: 12,
      name: 'Coconut Oil', 
      category: 'Beauty', 
      rating: 4.8, 
      price: 2500, 
      image: 'https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?w=400&h=400&fit=crop',
      vendor: 'Natural Oils Co', 
      reviews: 312, 
      inStock: true,
      description: '100% pure organic coconut oil, cold-pressed'
    },
    { 
      id: 13,
      name: 'African Print Cushions', 
      category: 'Home', 
      rating: 4.7, 
      price: 7500, 
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
      vendor: 'Home Essence', 
      reviews: 143, 
      inStock: true,
      description: 'Set of 2 decorative cushions with African prints'
    },
    { 
      id: 14,
      name: 'Traditional Earrings', 
      category: 'Jewelry', 
      rating: 4.9, 
      price: 3500, 
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
      vendor: 'Bead Creations', 
      reviews: 98, 
      inStock: true,
      description: 'Handmade traditional earrings with brass accents'
    },
    { 
      id: 15,
      name: 'Batik Fabric', 
      category: 'Fashion', 
      rating: 4.6, 
      price: 5500, 
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
      vendor: 'Textile Arts', 
      reviews: 76, 
      inStock: true,
      description: '5 yards of authentic batik fabric'
    },
    { 
      id: 16,
      name: 'African Mask Art', 
      category: 'Art', 
      rating: 5.0, 
      price: 45000, 
      image: 'https://images.unsplash.com/photo-1582314001940-159c4750f071?w=400&h=400&fit=crop',
      vendor: 'Heritage Art', 
      reviews: 45, 
      inStock: true,
      description: 'Hand-carved traditional African mask'
    },
    { 
      id: 17,
      name: 'Herbal Tea Blend', 
      category: 'Food', 
      rating: 4.8, 
      price: 2000, 
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
      vendor: 'Organic Teas', 
      reviews: 267, 
      inStock: true,
      description: 'Organic herbal tea blend with local herbs'
    },
    { 
      id: 18,
      name: 'Hand-Painted Vase', 
      category: 'Home', 
      rating: 4.7, 
      price: 12000, 
      image: 'https://images.unsplash.com/photo-1493417945110-e9bebfbae8cf?w=400&h=400&fit=crop',
      vendor: 'Clay & Fire', 
      reviews: 54, 
      inStock: true,
      description: 'Ceramic vase with hand-painted African designs'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Clickable */}
            <button onClick={navigateToHome} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#56A45E] rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900 font-semibold">Vendoura</h1>
                <p className="text-xs text-gray-500">Marketplace</p>
              </div>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search vendors, products, courses, events..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#F2994A] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-700" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#4A90E2] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#4A90E2] to-[#56A45E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">AO</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-700" />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm text-gray-900">{user?.name || 'Guest User'}</p>
                        <p className="text-xs text-gray-500">{user?.email || 'Not signed in'}</p>
                      </div>
                      <button onClick={handleGoToProfile} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Profile</span>
                      </button>
                      <button onClick={handleGoToDashboard} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors">
                        <Store className="w-4 h-4" />
                        <span className="text-sm">Dashboard</span>
                      </button>
                      <button onClick={handleGoToSettings} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">Settings</span>
                      </button>
                      <button onClick={handleGoToTimeline} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors">
                        <Activity className="w-4 h-4" />
                        <span className="text-sm">Timeline</span>
                      </button>
                      {/* Authentication disabled - login/logout hidden */}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />

      {/* Main Content */}
      <main>
        {/* Product Detail View */}
        {currentPage === 'product-detail' && selectedProduct && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button 
              onClick={navigateToHome}
              className="flex items-center gap-2 text-gray-600 hover:text-[#4A90E2] mb-6 transition-all hover:gap-3 hover:pl-1 font-medium"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-white rounded-xl overflow-hidden border border-gray-200 group">
                  <ImageWithFallback
                    src={(() => {
                      const baseUrl = selectedProduct.image.split('?')[0];
                      const images = [
                        selectedProduct.image,
                        `${baseUrl}?w=600&h=600&fit=crop&auto=format`,
                        `${baseUrl}?w=600&h=600&fit=crop&auto=format&q=80`,
                        `${baseUrl}?w=600&h=600&fit=crop&auto=format&brightness=10`
                      ];
                      return images[currentImageIndex];
                    })()}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Previous Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex((prev) => (prev === 0 ? 3 : prev - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-lg z-10"
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Next Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex((prev) => (prev === 3 ? 0 : prev + 1));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-lg z-10"
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-4 gap-3">
                  {[0, 1, 2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }}
                      className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-[#56A45E]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ImageWithFallback
                        src={(() => {
                          const baseUrl = selectedProduct.image.split('?')[0];
                          const images = [
                            selectedProduct.image,
                            `${baseUrl}?w=150&h=150&fit=crop&auto=format`,
                            `${baseUrl}?w=150&h=150&fit=crop&auto=format&q=80`,
                            `${baseUrl}?w=150&h=150&fit=crop&auto=format&brightness=10`
                          ];
                          return images[index];
                        })()}
                        alt={`${selectedProduct.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-5">
                <div>
                  <p className="text-[#56A45E] text-sm font-medium mb-2">{selectedProduct.category}</p>
                  <div className="flex items-start justify-between mb-3">
                    <h1 className="text-3xl text-gray-900 font-bold leading-tight flex-1 pr-4">{selectedProduct.name}</h1>
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold whitespace-nowrap">
                      {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-[#FFA500] text-[#FFA500]' : 'fill-gray-200 text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-900 font-semibold text-sm">{selectedProduct.rating}</span>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="text-gray-500 text-sm hover:text-[#4A90E2] transition-colors"
                  >
                    ({selectedProduct.reviews} Review)
                  </button>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl text-gray-900 font-bold">₦{selectedProduct.price.toLocaleString()}</span>
                  <span className="text-xl text-gray-400 line-through">₦{(selectedProduct.price * 1.25).toLocaleString()}</span>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.'}
                </p>

                {/* Weight Selection */}
                <div className="space-y-3">
                  <label className="text-gray-900 font-semibold block">Weight</label>
                  <div className="flex flex-wrap gap-3">
                    {['500 g', '1 Kg', '2 Kg', '5 Kg'].map((weight) => (
                      <button
                        key={weight}
                        onClick={() => setSelectedSize(weight)}
                        className={`px-5 py-2.5 rounded-lg transition-all font-medium ${
                          selectedSize === weight
                            ? 'bg-[#56A45E] text-white shadow-md'
                            : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setProductQuantity(Math.max(1, productQuantity - 1))}
                      className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-30"
                      disabled={productQuantity <= 1}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 h-12 flex items-center justify-center text-base font-semibold text-gray-900 border-x border-gray-300">
                      {productQuantity}
                    </span>
                    <button
                      onClick={() => setProductQuantity(productQuantity + 1)}
                      className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      for (let i = 0; i < productQuantity; i++) {
                        addToCart(selectedProduct);
                      }
                      toast.success(`Added ${productQuantity} item${productQuantity > 1 ? 's' : ''} to cart`);
                      setShowCart(true);
                    }}
                    className="flex-1 h-12 bg-[#56A45E] text-white rounded-lg hover:bg-[#4A8A50] transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add To Cart
                  </button>
                  <button 
                    onClick={() => {
                      for (let i = 0; i < productQuantity; i++) {
                        addToCart(selectedProduct);
                      }
                      toast.success('Proceeding to checkout...');
                      navigateToCheckout();
                    }}
                    className="h-12 px-6 bg-[#FFA500] text-white rounded-lg hover:bg-[#FF8C00] transition-all font-semibold"
                  >
                    Buy Now
                  </button>
                  <button 
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <Heart 
                      className={`w-5 h-5 ${wishlistItems.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                  </button>
                </div>

                {/* Product Meta */}
                <div className="pt-5 mt-5 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-700 font-semibold">SKU :</span>
                    <span className="text-gray-600">GRFR85648HGJ</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-700 font-semibold">Tags :</span>
                    <button 
                      onClick={() => navigateToVendor({ name: selectedProduct.vendor, category: selectedProduct.category })}
                      className="text-gray-600 hover:text-[#56A45E] transition-colors"
                    >
                      {selectedProduct.vendor}, {selectedProduct.category}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-700 font-semibold">Share :</span>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </button>
                      <button className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      </button>
                      <button className="w-8 h-8 bg-[#E60023] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                      </button>
                      <button className="w-8 h-8 bg-[#56A45E] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hidden grid-cols-3 gap-3 pt-6 mt-6 border-t border-gray-200">
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-all cursor-default">
                    <Truck className="w-5 h-5 text-[#4A90E2] mx-auto mb-1.5" />
                    <p className="text-xs text-gray-900 font-semibold mb-0.5">Fast Delivery</p>
                    <p className="text-xs text-gray-500">2-3 days</p>
                  </div>
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-all cursor-default">
                    <Shield className="w-5 h-5 text-[#56A45E] mx-auto mb-1.5" />
                    <p className="text-xs text-gray-900 font-semibold mb-0.5">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% Protected</p>
                  </div>
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-all cursor-default">
                    <Award className="w-5 h-5 text-[#F2994A] mx-auto mb-1.5" />
                    <p className="text-xs text-gray-900 font-semibold mb-0.5">Quality Verified</p>
                    <p className="text-xs text-gray-500">Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-12 border-t border-gray-200">
              <div className="flex gap-8 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-2 font-semibold transition-all relative hover:scale-105 ${
                    activeTab === 'description' ? 'text-[#4A90E2]' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Description
                  {activeTab === 'description' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A90E2]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-2 font-semibold transition-all relative hover:scale-105 ${
                    activeTab === 'reviews' ? 'text-[#4A90E2]' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Reviews ({selectedProduct.reviews})
                  {activeTab === 'reviews' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A90E2]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`py-4 px-2 font-semibold transition-all relative hover:scale-105 ${
                    activeTab === 'shipping' ? 'text-[#4A90E2]' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Shipping & Returns
                  {activeTab === 'shipping' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A90E2]" />
                  )}
                </button>
              </div>

              <div className="py-8">
                {activeTab === 'description' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {selectedProduct.description}
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 mb-2">Specifications</h4>
                        <p className="text-sm text-gray-600">• Category: <span className="font-semibold text-gray-900">{selectedProduct.category}</span></p>
                        <p className="text-sm text-gray-600">• Material: <span className="font-semibold text-gray-900">Premium Quality</span></p>
                        <p className="text-sm text-gray-600">• Weight: <span className="font-semibold text-gray-900">500g</span></p>
                        <p className="text-sm text-gray-600">• Dimensions: <span className="font-semibold text-gray-900">20 x 15 x 10 cm</span></p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                        <p className="text-sm text-gray-600">• Handcrafted with care</p>
                        <p className="text-sm text-gray-600">• Eco-friendly materials</p>
                        <p className="text-sm text-gray-600">• Durable & long-lasting</p>
                        <p className="text-sm text-gray-600">• Unique design</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-200">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 mb-2">{selectedProduct.rating}</div>
                        <div className="flex items-center gap-1 justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-[#F5C33C] text-[#F5C33C]" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{selectedProduct.reviews} reviews</p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 w-12">{stars} star</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#F5C33C]" 
                                style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-12">{stars === 5 ? '70%' : stars === 4 ? '20%' : '5%'}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[
                        { name: 'Sarah Johnson', rating: 5, date: 'Nov 28, 2025', comment: 'Absolutely love this product! The quality exceeded my expectations. Fast shipping too!', verified: true },
                        { name: 'Michael Chen', rating: 5, date: 'Nov 25, 2025', comment: 'Great value for money. The craftsmanship is impressive and it looks even better in person.', verified: true },
                        { name: 'Amina Bello', rating: 4, date: 'Nov 20, 2025', comment: 'Good product overall. Shipping took a bit longer than expected but quality is solid.', verified: false },
                        { name: 'David Okafor', rating: 5, date: 'Nov 15, 2025', comment: 'This is my third purchase from this vendor. Never disappoints! Highly recommend.', verified: true },
                      ].map((review, index) => (
                        <div key={index} className="pb-6 border-b border-gray-200 last:border-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-900">{review.name}</span>
                                {review.verified && (
                                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-4 h-4 ${i < review.rating ? 'fill-[#F5C33C] text-[#F5C33C]' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => toast.info('Review form would open here')}
                      className="mt-8 px-6 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7AC2] transition-all font-semibold hover:shadow-lg transform hover:scale-105"
                    >
                      Write a Review
                    </button>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Shipping Information</h3>
                      <div className="space-y-2 text-gray-600">
                        <p>• <span className="font-semibold">Standard Delivery:</span> 3-5 business days (₦2,000)</p>
                        <p>• <span className="font-semibold">Express Delivery:</span> 1-2 business days (₦5,000)</p>
                        <p>• <span className="font-semibold">Free Shipping:</span> On orders above ₦50,000</p>
                        <p>• All orders are processed within 24 hours</p>
                        <p>• Track your order in real-time after shipping</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Returns & Refunds</h3>
                      <div className="space-y-2 text-gray-600">
                        <p>• <span className="font-semibold">30-Day Return Policy:</span> Return within 30 days for a full refund</p>
                        <p>• Items must be unused and in original packaging</p>
                        <p>• Free return shipping for defective items</p>
                        <p>• Refunds processed within 5-7 business days</p>
                        <p>• Contact support@vendoura.com for returns</p>
                      </div>
                    </div>
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h4>
                      <p className="text-sm text-gray-600">We stand behind every product we sell. If you're not completely satisfied, we'll make it right.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
              <h2 className="text-3xl text-gray-900 mb-8 font-bold">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {trendingProducts
                  .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
                  .slice(0, 4)
                  .map((product) => (
                    <div 
                      key={product.id}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-2 hover:border-2 hover:border-[#4A90E2] group"
                    >
                      <div className="aspect-square bg-gray-200 relative overflow-hidden cursor-pointer">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        
                        {/* Previous/Next Navigation */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const relatedProducts = trendingProducts.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id);
                            const currentIndex = relatedProducts.findIndex(p => p.id === product.id);
                            const prevProduct = relatedProducts[(currentIndex - 1 + relatedProducts.length) % relatedProducts.length];
                            navigateToProduct(prevProduct);
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/95 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                        >
                          <svg className="w-3.5 h-3.5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const relatedProducts = trendingProducts.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id);
                            const currentIndex = relatedProducts.findIndex(p => p.id === product.id);
                            const nextProduct = relatedProducts[(currentIndex + 1) % relatedProducts.length];
                            navigateToProduct(nextProduct);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/95 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                        >
                          <svg className="w-3.5 h-3.5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        
                        <div 
                          onClick={() => navigateToProduct(product)}
                          className="absolute inset-0"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-gray-900 mb-1 line-clamp-2 font-semibold">{product.name}</h4>
                        <p className="text-[#4A90E2] font-bold">₦{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Workshops Page */}
        {currentPage === 'workshops' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button 
              onClick={navigateToHome}
              className="flex items-center gap-2 text-gray-600 hover:text-[#4A90E2] mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>

            <div className="mb-12">
              <h1 className="text-4xl text-gray-900 mb-4 font-bold">Workshops & Events</h1>
              <p className="text-xl text-gray-600">Learn new skills and grow your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Social Media Marketing for Vendors',
                  date: 'Dec 10, 2025',
                  time: '2:00 PM - 4:00 PM',
                  instructor: 'Sarah Johnson',
                  attendees: 45,
                  price: 5000,
                  image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop'
                },
                {
                  title: 'Product Photography Masterclass',
                  date: 'Dec 12, 2025',
                  time: '10:00 AM - 1:00 PM',
                  instructor: 'Michael Chen',
                  attendees: 32,
                  price: 8000,
                  image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop'
                },
                {
                  title: 'Pricing Strategies & Profit Margins',
                  date: 'Dec 15, 2025',
                  time: '3:00 PM - 5:00 PM',
                  instructor: 'Adebayo Ogunlesi',
                  attendees: 67,
                  price: 3000,
                  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop'
                },
                {
                  title: 'Inventory Management Basics',
                  date: 'Dec 18, 2025',
                  time: '1:00 PM - 3:00 PM',
                  instructor: 'Chioma Nwankwo',
                  attendees: 54,
                  price: 4000,
                  image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=300&fit=crop'
                },
                {
                  title: 'Customer Service Excellence',
                  date: 'Dec 20, 2025',
                  time: '11:00 AM - 1:00 PM',
                  instructor: 'David Okafor',
                  attendees: 89,
                  price: 2500,
                  image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop'
                },
                {
                  title: 'Building Your Brand Identity',
                  date: 'Dec 22, 2025',
                  time: '4:00 PM - 6:00 PM',
                  instructor: 'Fatima Abdullah',
                  attendees: 41,
                  price: 6000,
                  image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop'
                }
              ].map((workshop, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <ImageWithFallback
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-[#4A90E2]" />
                      <span className="text-sm text-gray-600">{workshop.date}</span>
                    </div>
                    <h3 className="text-xl text-gray-900 mb-2 font-semibold">{workshop.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{workshop.time}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">by {workshop.instructor}</span>
                      <span className="text-sm text-gray-600">{workshop.attendees} attending</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl text-[#4A90E2] font-bold">₦{workshop.price.toLocaleString()}</span>
                      <button 
                        onClick={() => toast.success('Registration opened!')}
                        className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7AC2] transition-all text-sm font-semibold hover:shadow-lg transform hover:scale-105"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Checkout Page */}
        {currentPage === 'checkout' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button 
              onClick={navigateToHome}
              className="flex items-center gap-2 text-gray-600 hover:text-[#4A90E2] mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Shopping
            </button>

            <h1 className="text-3xl text-gray-900 mb-8 font-bold">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all" 
                        placeholder="John"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all" 
                        placeholder="Doe"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all" 
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all" 
                        placeholder="+234 800 000 0000"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all" 
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all" 
                        placeholder="Lagos"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all bg-white">
                        <option>Lagos</option>
                        <option>Abuja</option>
                        <option>Port Harcourt</option>
                        <option>Kano</option>
                        <option>Ibadan</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all" 
                        placeholder="100001"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Payment Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-4 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#4A90E2] hover:bg-gray-50 transition-all">
                      <input type="radio" name="payment" className="w-4 h-4 text-[#4A90E2]" defaultChecked />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Card Payment</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, Verve</div>
                      </div>
                      <div className="flex gap-2">
                        <svg className="w-8 h-8" viewBox="0 0 48 48"><rect fill="#1565C0" width="48" height="48" rx="6"/><text x="24" y="28" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">VISA</text></svg>
                      </div>
                    </label>
                    <label className="flex items-center gap-4 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#4A90E2] transition-colors">
                      <input type="radio" name="payment" className="w-5 h-5 text-[#4A90E2]" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Bank Transfer</div>
                        <div className="text-sm text-gray-600">Direct bank deposit</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-4 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#4A90E2] transition-colors">
                      <input type="radio" name="payment" className="w-5 h-5 text-[#4A90E2]" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Pay on Delivery</div>
                        <div className="text-sm text-gray-600">Cash or POS on delivery</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Order Summary</h2>
                  
                  <div className="space-y-3 mb-5 pb-5 border-b border-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-14 h-14 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm text-gray-900 line-clamp-2 mb-1">{item.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                            <span className="text-sm font-semibold text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2.5 mb-5">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span>₦{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium">₦2,000</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Tax</span>
                      <span className="font-medium">₦{Math.round(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.075).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mb-5">
                    <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>₦{(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 2000 + Math.round(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.075)).toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      toast.success('Order placed successfully! 🎉');
                      setCartItems([]);
                      setTimeout(() => navigateToHome(), 2000);
                    }}
                    className="w-full mt-6 py-4 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7AC2] transition-all font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    Place Order
                  </button>

                  <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
                    <Shield className="w-5 h-5" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Vendor Shop Page */}
        {currentPage === 'vendor-shop' && selectedVendor && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button 
              onClick={navigateToHome}
              className="flex items-center gap-2 text-gray-600 hover:text-[#4A90E2] mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>

            {/* Vendor Header */}
            <div className="bg-gradient-to-r from-[#4A90E2] to-[#56A45E] rounded-2xl p-12 text-white mb-12">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#4A90E2] text-3xl font-bold">
                  {selectedVendor.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{selectedVendor.name}</h1>
                  <p className="text-xl text-white/90 mb-4">{selectedVendor.category}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-white" />
                      <span>4.8 Rating</span>
                    </div>
                    <span>•</span>
                    <span>1,234 Followers</span>
                    <span>•</span>
                    <span>89 Products</span>
                  </div>
                </div>
              </div>
              <button className="mt-6 px-6 py-3 bg-white text-[#4A90E2] rounded-lg hover:bg-gray-100 transition-all font-semibold hover:shadow-lg transform hover:scale-105">
                Follow Store
              </button>
            </div>

            {/* Vendor Products */}
            <h2 className="text-3xl text-gray-900 mb-8 font-bold">Products from {selectedVendor.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts
                .filter(p => p.vendor === selectedVendor.name)
                .map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group"
                  >
                    <div className="aspect-square bg-gray-200 relative overflow-hidden cursor-pointer">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Navigation Arrows */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const vendorProducts = trendingProducts.filter(p => p.vendor === selectedVendor.name);
                          const currentIndex = vendorProducts.findIndex(p => p.id === product.id);
                          const prevProduct = vendorProducts[(currentIndex - 1 + vendorProducts.length) % vendorProducts.length];
                          navigateToProduct(prevProduct);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                      >
                        <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const vendorProducts = trendingProducts.filter(p => p.vendor === selectedVendor.name);
                          const currentIndex = vendorProducts.findIndex(p => p.id === product.id);
                          const nextProduct = vendorProducts[(currentIndex + 1) % vendorProducts.length];
                          navigateToProduct(nextProduct);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                      >
                        <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      <div 
                        onClick={() => navigateToProduct(product)}
                        className="absolute inset-0"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-gray-900 mb-1 line-clamp-2 font-semibold">{product.name}</h4>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-[#F5C33C] fill-[#F5C33C]" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      <p className="text-[#4A90E2] font-bold text-lg">₦{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Home View */}
        {currentPage === 'home' && (
          <>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#4A90E2] via-[#56A45E] to-[#F2994A] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-6xl mb-4">Artisan Market</h1>
              <p className="text-2xl mb-3 text-white/90">The Future of African Commerce</p>
              <p className="text-4xl mb-3">Sell. Learn. Grow.</p>
              <p className="text-xl mb-8 text-white/90">Powered by AI.</p>
              <p className="text-lg mb-10 text-white/80 max-w-2xl mx-auto">
                Join Africa's fastest-growing creative marketplace. Discover unique treasures, master your craft, and connect with a thriving community.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    const element = document.getElementById('products-section');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-white text-[#4A90E2] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Explore Marketplace
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('artisans-section');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Top Vendors
                </button>
                <button 
                  onClick={navigateToWorkshops}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Upcoming Events
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Action Buttons */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const handleClick = () => {
                if (action.label === 'Join Workshops') {
                  navigateToWorkshops();
                } else if (action.label === 'Explore Shops') {
                  setSelectedCategory('All');
                  navigateToCategory('All');
                } else {
                  toast.info(`${action.label} coming soon!`);
                }
              };
              return (
                <button
                  key={index}
                  onClick={handleClick}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left group"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: action.color + '20' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: action.color }} />
                  </div>
                  <h3 className="text-gray-900 mb-1 font-semibold">{action.label}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* AI Suggested Collections */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-8 h-8 text-[#F2994A]" />
            <div>
              <h2 className="text-3xl text-gray-900">Curated For You by AI</h2>
              <p className="text-gray-600">Personalized product collections just for you</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiCollections.map((collection, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <ImageWithFallback
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm text-gray-900 font-semibold shadow-md">
                    {collection.badge}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {collection.items} items
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-gray-900 mb-2 font-semibold">{collection.title}</h3>
                  <p className="text-sm text-gray-600">{collection.description}</p>
                  <button className="mt-4 text-[#4A90E2] text-sm font-semibold hover:underline">
                    Explore Collection →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Artisans */}
        <section id="artisans-section" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl text-gray-900 mb-2">Featured Artisans</h2>
                <p className="text-gray-600">Discover top-rated creators in our community</p>
              </div>
              <button className="px-4 py-2 text-[#4A90E2] hover:bg-blue-50 rounded-lg transition-colors">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredArtisans.map((artisan, index) => (
                <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    <ImageWithFallback
                      src={artisan.image}
                      alt={artisan.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-semibold">
                      {artisan.products} Products
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-gray-900 mb-1 font-semibold">{artisan.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{artisan.category}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#F5C33C] fill-[#F5C33C]" />
                        <span className="text-gray-900 font-semibold">{artisan.rating}</span>
                      </div>
                      <span className="text-gray-600">{artisan.followers.toLocaleString()} followers</span>
                    </div>
                    <button 
                      onClick={() => navigateToVendor(artisan)}
                      className="mt-4 w-full py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7AC2] transition-colors text-sm font-semibold"
                    >
                      Visit Store
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories & Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? 'bg-[#4A90E2] text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              >
                <option value="trending">Trending</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </section>

        {/* Trending This Week */}
        <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl text-gray-900 mb-2">
                {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Products`}
              </h2>
              <p className="text-gray-600">
                {trendingProducts.filter(p => selectedCategory === 'All' || p.category === selectedCategory).length} products found
              </p>
            </div>
            <button className="px-4 py-2 text-[#4A90E2] hover:bg-blue-50 rounded-lg transition-colors">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingProducts
              .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
              .filter(product => 
                searchQuery === '' || 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .sort((a, b) => {
                switch (sortBy) {
                  case 'price-low':
                    return a.price - b.price;
                  case 'price-high':
                    return b.price - a.price;
                  case 'rating':
                    return b.rating - a.rating;
                  case 'newest':
                    return b.id - a.id;
                  default:
                    return b.reviews - a.reviews; // trending
                }
              })
              .map((product, index) => {
                const isInWishlist = wishlistItems.includes(index);
                return (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group">
                    <div className="h-56 bg-gray-200 relative overflow-hidden cursor-pointer">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Previous Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newIndex = (index - 1 + trendingProducts.length) % trendingProducts.length;
                          navigateToProduct(trendingProducts[newIndex]);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg z-10"
                      >
                        <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      {/* Next Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newIndex = (index + 1) % trendingProducts.length;
                          navigateToProduct(trendingProducts[newIndex]);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg z-10"
                      >
                        <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      <div 
                        onClick={() => navigateToProduct(product)}
                        className="absolute inset-0"
                      />
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(index);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 hover:scale-110 transition-all shadow-md z-10"
                      >
                        <Heart 
                          className={`w-5 h-5 transition-colors ${
                            isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-700'
                          }`} 
                        />
                      </button>
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {product.category}
                      </div>
                      {product.inStock && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs">
                          In Stock
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-[#F5C33C] fill-[#F5C33C]" />
                          <span className="text-sm text-gray-900">{product.rating}</span>
                          <span className="text-xs text-gray-500">({product.reviews})</span>
                        </div>
                      </div>
                      <h3 
                        onClick={() => navigateToProduct(product)}
                        className="text-lg text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-[#4A90E2] transition-colors"
                      >
                        {product.name}
                      </h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToVendor({ name: product.vendor, category: product.category });
                        }}
                        className="text-sm text-gray-500 hover:text-[#4A90E2] mb-3 transition-colors text-left"
                      >
                        {product.vendor}
                      </button>
                      <div className="flex items-center justify-between">
                        <span className="text-xl text-[#4A90E2] font-semibold">₦{product.price.toLocaleString()}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7AC2] transition-colors text-sm flex items-center gap-1"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          
          {trendingProducts.filter(product => selectedCategory === 'All' || product.category === selectedCategory).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category</p>
            </div>
          )}
        </section>

        {/* Hot Deals & Flash Sales */}
        <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Tag className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-bold">Flash Sale - 30% Off</h3>
                  <p className="text-white/90">Ends in 2 hours • Limited stock available</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* Why Shop With Us */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-gray-900 text-center mb-12">Why Shop With Vendoura?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#4A90E2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-[#4A90E2]" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">Quick shipping across Nigeria</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#56A45E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#56A45E]" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">Secure Payment</h3>
                <p className="text-gray-600 text-sm">Safe and encrypted transactions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F2994A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#F2994A]" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">Quality Products</h3>
                <p className="text-gray-600 text-sm">Verified artisan-made goods</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F5C33C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#F5C33C]" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">Community Support</h3>
                <p className="text-gray-600 text-sm">Join 10,000+ happy customers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl text-gray-900 mb-4">Stay in the Loop</h2>
            <p className="text-gray-600 mb-8">
              Get exclusive deals, new product alerts, and artisan stories delivered to your inbox
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              />
              <button className="px-6 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7AC2] transition-colors font-semibold">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </section>

        {/* Collaboration & Partnerships CTA */}
        <section className="bg-gradient-to-br from-[#4A90E2] to-[#56A45E] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Handshake className="w-10 h-10" />
                  <h2 className="text-3xl">Partner & Collaborate</h2>
                </div>
                <p className="text-xl text-white/90 mb-4">
                  Connect with other vendors for collaborations, bundle products, or bulk supply requests
                </p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Request collaborations with other vendors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Create bundle products with shared commission
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Source materials from fellow artisans
                  </li>
                </ul>
              </div>
              <div>
                <button className="px-8 py-4 bg-white text-[#4A90E2] rounded-lg hover:bg-gray-100 transition-colors">
                  Find Partners →
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
      )}
      {/* End of Home View */}

      </main>

      {/* Shopping Cart Drawer */}
      {showCart && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setShowCart(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl text-gray-900">Shopping Cart</h2>
                <p className="text-sm text-gray-500">{cartItems.length} items</p>
              </div>
              <button 
                onClick={() => setShowCart(false)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mb-6">Add some products to get started</p>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="px-6 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7AC2] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.vendor}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#4A90E2] font-semibold">₦{item.price.toLocaleString()}</span>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100 transition-all hover:scale-110"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 transition-all hover:scale-110"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-900">Subtotal</span>
                  <span className="text-gray-900 font-semibold">
                    ₦{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Shipping calculated at checkout</p>
                <button 
                  onClick={navigateToCheckout}
                  className="w-full py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7AC2] transition-all font-semibold hover:shadow-lg transform hover:scale-[1.02]"
                >
                  Proceed to Checkout
                </button>
                <button 
                  onClick={() => setShowCart(false)}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all hover:shadow-md transform hover:scale-[1.02]"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#56A45E] rounded-lg flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl">Vendoura</span>
              </div>
              <p className="text-gray-400 text-sm">Africa's fastest-growing creative marketplace</p>
            </div>
            <div>
              <h4 className="mb-4">Marketplace</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Explore Shops</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Featured Vendors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Events & Workshops</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Learning Hub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vendor Directory</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 Vendoura. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
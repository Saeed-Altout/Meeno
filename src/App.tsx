import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Badge } from './components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from './components/ui/dialog';
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Menu as MenuIcon,
  X,
  ChefHat,
  Calendar,
} from 'lucide-react';

// Types
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
}

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'food' | 'ambience';
}

function App() {
  const [activeMenuCategory, setActiveMenuCategory] =
    useState<string>('starters');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    requests: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sample data
  const menuItems: MenuItem[] = [
    // Starters
    {
      id: '1',
      name: 'Bruschetta Classica',
      description: 'Toasted bread with fresh tomatoes, basil, and garlic',
      price: 12,
      image:
        'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
      category: 'starters',
    },
    {
      id: '2',
      name: 'Antipasto Platter',
      description:
        'Selection of cured meats, cheeses, and marinated vegetables',
      price: 18,
      image:
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
      category: 'starters',
    },
    {
      id: '3',
      name: 'Arancini Siciliani',
      description: 'Crispy risotto balls filled with mozzarella and peas',
      price: 14,
      image:
        'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=400',
      category: 'starters',
    },
    // Mains
    {
      id: '4',
      name: 'Osso Buco alla Milanese',
      description: 'Slow-braised veal shank with saffron risotto',
      price: 35,
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      category: 'mains',
    },
    {
      id: '5',
      name: 'Linguine alle Vongole',
      description: 'Fresh linguine with clams in white wine sauce',
      price: 28,
      image:
        'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400',
      category: 'mains',
    },
    {
      id: '6',
      name: 'Branzino in Crosta',
      description: 'Sea bass baked in salt crust with herbs',
      price: 32,
      image:
        'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400',
      category: 'mains',
    },
    // Desserts
    {
      id: '7',
      name: 'Tiramisu della Casa',
      description: 'Classic tiramisu with mascarpone and espresso',
      price: 9,
      image:
        'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
      category: 'desserts',
    },
    {
      id: '8',
      name: 'Panna Cotta ai Frutti',
      description: 'Vanilla panna cotta with seasonal berry compote',
      price: 8,
      image:
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
      category: 'desserts',
    },
    // Drinks
    {
      id: '9',
      name: 'Chianti Classico DOCG',
      description: 'Full-bodied red wine from Tuscany',
      price: 45,
      image:
        'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400',
      category: 'drinks',
    },
    {
      id: '10',
      name: 'Limoncello della Casa',
      description: 'Homemade lemon liqueur from Amalfi lemons',
      price: 8,
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
      category: 'drinks',
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      rating: 5,
      comment:
        'Absolutely incredible experience! The osso buco was perfection and the service was impeccable.',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=100',
    },
    {
      id: '2',
      name: 'Marco Rodriguez',
      rating: 5,
      comment:
        'Authentic Italian flavors that transported me back to Rome. Chef Giuseppe is a true artist!',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    {
      id: '3',
      name: 'Emily Chen',
      rating: 5,
      comment:
        'The ambiance is romantic and the food is divine. Perfect for our anniversary dinner!',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    {
      id: '4',
      name: 'David Thompson',
      rating: 5,
      comment:
        'Best Italian restaurant in the city. The wine selection is outstanding and the pasta is made fresh daily.',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    },
  ];

  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      alt: 'Antipasto platter with cured meats and cheeses',
      category: 'food',
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      alt: 'Elegant restaurant interior',
      category: 'ambience',
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
      alt: 'Perfectly plated pasta dish',
      category: 'food',
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adad?w=800',
      alt: 'Cozy dining area with warm lighting',
      category: 'ambience',
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
      alt: 'Delicious tiramisu dessert',
      category: 'food',
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
      alt: 'Chef preparing fresh pasta',
      category: 'food',
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.date ||
      !formData.time ||
      !formData.guests
    ) {
      alert('Please fill in all required fields');
      return;
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        requests: '',
      });
    }, 3000);
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation */}
      <nav className='fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <div className='flex-shrink-0'>
              <h1 className='text-2xl font-bold text-amber-600 flex items-center gap-2'>
                <ChefHat className='h-8 w-8' />
                La Tavola
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <button
                  onClick={() => scrollToSection('home')}
                  className='text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors'
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('menu')}
                  className='text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors'
                >
                  Menu
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className='text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors'
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection('reservations')}
                  className='text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors'
                >
                  Reservations
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className='text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors'
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className='text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors'
                >
                  Contact
                </button>
                <Button
                  onClick={() => scrollToSection('reservations')}
                  className='bg-amber-600 hover:bg-amber-700 text-white ml-4'
                >
                  Book a Table
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className='md:hidden'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label='Toggle menu'
              >
                {mobileMenuOpen ? (
                  <X className='h-6 w-6' />
                ) : (
                  <MenuIcon className='h-6 w-6' />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className='md:hidden bg-white border-t'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              <button
                onClick={() => scrollToSection('home')}
                className='block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 w-full text-left'
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className='block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 w-full text-left'
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className='block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 w-full text-left'
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('reservations')}
                className='block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 w-full text-left'
              >
                Reservations
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className='block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 w-full text-left'
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className='block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 w-full text-left'
              >
                Contact
              </button>
              <div className='px-3 py-2'>
                <Button
                  onClick={() => scrollToSection('reservations')}
                  className='bg-amber-600 hover:bg-amber-700 text-white w-full'
                >
                  Book a Table
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id='home'
        className='relative h-screen flex items-center justify-center bg-cover bg-center'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600)',
        }}
      >
        <div className='absolute inset-0 bg-black/50'></div>
        <div className='relative z-10 text-center text-white max-w-4xl mx-auto px-4'>
          <h1 className='text-5xl md:text-7xl font-bold mb-6 leading-tight'>
            Welcome to La Tavola
          </h1>
          <p className='text-xl md:text-2xl mb-8 font-light'>
            Authentic Italian Flavors in the Heart of the City
          </p>
          <Button
            size='lg'
            onClick={() => scrollToSection('reservations')}
            className='bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-3'
          >
            Reserve Your Table
          </Button>
        </div>
      </section>

      {/* About Us Section */}
      <section id='about' className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6'>
              <h2 className='text-4xl font-bold text-gray-900'>Our Story</h2>
              <p className='text-lg text-gray-600 leading-relaxed'>
                Founded in 1985 by Chef Giuseppe Rossi, La Tavola has been
                bringing authentic Italian cuisine to food lovers for over three
                decades. Our passion for traditional recipes, combined with the
                finest imported ingredients, creates an unforgettable dining
                experience.
              </p>
              <p className='text-lg text-gray-600 leading-relaxed'>
                Every dish is crafted with love, using recipes passed down
                through generations. From our handmade pasta to our wood-fired
                pizzas, we maintain the authentic flavors that make Italian
                cuisine truly special.
              </p>
              <div className='flex items-center space-x-4'>
                <ChefHat className='h-8 w-8 text-amber-600' />
                <div>
                  <p className='font-semibold text-gray-900'>
                    Chef Giuseppe Rossi
                  </p>
                  <p className='text-gray-600'>Head Chef & Owner</p>
                </div>
              </div>
            </div>
            <div className='relative'>
              <img
                src='https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600'
                alt='Chef Giuseppe in the kitchen'
                className='rounded-lg shadow-xl w-full h-96 object-cover'
              />
              <div className='absolute -bottom-6 -left-6 bg-amber-600 text-white p-4 rounded-lg shadow-lg'>
                <p className='font-bold text-2xl'>35+</p>
                <p className='text-sm'>Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id='menu' className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>Our Menu</h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Discover our carefully curated selection of traditional Italian
              dishes, made with the finest ingredients and time-honored
              techniques.
            </p>
          </div>

          {/* Menu Categories */}
          <div className='flex justify-center mb-8'>
            <div className='flex flex-wrap gap-4'>
              {['starters', 'mains', 'desserts', 'drinks'].map(category => (
                <Button
                  key={category}
                  variant={
                    activeMenuCategory === category ? 'default' : 'outline'
                  }
                  onClick={() => setActiveMenuCategory(category)}
                  className={
                    activeMenuCategory === category
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : ''
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {menuItems
              .filter(item => item.category === activeMenuCategory)
              .map(item => (
                <Card
                  key={item.id}
                  className='overflow-hidden hover:shadow-lg transition-shadow'
                >
                  <div className='relative h-48'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <CardHeader>
                    <div className='flex justify-between items-start'>
                      <CardTitle className='text-lg'>{item.name}</CardTitle>
                      <Badge
                        variant='secondary'
                        className='text-amber-600 bg-amber-50'
                      >
                        ${item.price}
                      </Badge>
                    </div>
                    <CardDescription className='text-sm text-gray-600'>
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Chef's Special Section */}
      <section className='py-20 bg-amber-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='relative'>
              <img
                src='https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600'
                alt="Chef's Special - Osso Buco"
                className='rounded-lg shadow-xl w-full h-96 object-cover'
              />
              <div className='absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                Chef's Special
              </div>
            </div>
            <div className='space-y-6'>
              <h2 className='text-4xl font-bold text-gray-900'>
                Osso Buco alla Milanese
              </h2>
              <p className='text-lg text-gray-600 leading-relaxed'>
                Our signature dish features tender, slow-braised veal shank that
                falls off the bone, served with creamy saffron risotto. This
                traditional Milanese recipe has been perfected by Chef Giuseppe
                over 20 years.
              </p>
              <p className='text-lg text-gray-600 leading-relaxed'>
                The meat is braised for hours in a rich wine sauce with
                vegetables and herbs, creating a depth of flavor that's truly
                extraordinary. Served with gremolata and our house-made risotto.
              </p>
              <div className='flex items-center space-x-4'>
                <div className='text-3xl font-bold text-amber-600'>$35</div>
                <Button
                  size='lg'
                  onClick={() => scrollToSection('reservations')}
                  className='bg-amber-600 hover:bg-amber-700 text-white'
                >
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              What Our Guests Say
            </h2>
            <p className='text-lg text-gray-600'>
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className='max-w-4xl mx-auto'>
            <Card className='p-8 text-center'>
              <CardContent className='space-y-6'>
                <div className='flex justify-center space-x-1 mb-4'>
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className='h-5 w-5 fill-amber-400 text-amber-400'
                      />
                    )
                  )}
                </div>
                <blockquote className='text-xl text-gray-700 italic leading-relaxed'>
                  "{testimonials[currentTestimonial].comment}"
                </blockquote>
                <div className='flex items-center justify-center space-x-4'>
                  <Avatar>
                    <AvatarImage
                      src={testimonials[currentTestimonial].avatar}
                    />
                    <AvatarFallback>
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-semibold text-gray-900'>
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className='text-sm text-gray-600'>Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial indicators */}
            <div className='flex justify-center space-x-2 mt-6'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? 'bg-amber-600'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id='gallery' className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>Gallery</h2>
            <p className='text-lg text-gray-600'>
              A visual feast of our culinary creations and warm atmosphere
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {galleryImages.map(image => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <div className='relative group cursor-pointer overflow-hidden rounded-lg'>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className='w-full h-64 object-cover transition-transform group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center'>
                      <div className='opacity-0 group-hover:opacity-100 transition-opacity text-white text-center'>
                        <p className='font-semibold'>Click to view</p>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className='max-w-4xl p-0'>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className='w-full h-auto rounded-lg'
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Reservations Section */}
      <section id='reservations' className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Make a Reservation
            </h2>
            <p className='text-lg text-gray-600'>
              Book your table for an unforgettable dining experience
            </p>
          </div>

          <div className='max-w-2xl mx-auto'>
            {formSubmitted ? (
              <Card className='p-8 text-center'>
                <CardContent className='space-y-4'>
                  <div className='text-green-600 text-6xl mb-4'>✓</div>
                  <h3 className='text-2xl font-bold text-gray-900'>
                    Reservation Confirmed!
                  </h3>
                  <p className='text-gray-600'>
                    Thank you for your reservation. We've sent a confirmation
                    email with all the details.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className='p-8'>
                <form onSubmit={handleFormSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='name'>Full Name *</Label>
                      <Input
                        id='name'
                        type='text'
                        value={formData.name}
                        onChange={e =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className='w-full'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email *</Label>
                      <Input
                        id='email'
                        type='email'
                        value={formData.email}
                        onChange={e =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className='w-full'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='phone'>Phone Number</Label>
                      <Input
                        id='phone'
                        type='tel'
                        value={formData.phone}
                        onChange={e =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className='w-full'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='guests'>Number of Guests *</Label>
                      <Input
                        id='guests'
                        type='number'
                        min='1'
                        max='12'
                        value={formData.guests}
                        onChange={e =>
                          setFormData({ ...formData, guests: e.target.value })
                        }
                        required
                        className='w-full'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='date'>Preferred Date *</Label>
                      <Input
                        id='date'
                        type='date'
                        value={formData.date}
                        onChange={e =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        min={new Date().toISOString().split('T')[0]}
                        required
                        className='w-full'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='time'>Preferred Time *</Label>
                      <Input
                        id='time'
                        type='time'
                        value={formData.time}
                        onChange={e =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        required
                        className='w-full'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='requests'>Special Requests</Label>
                    <textarea
                      id='requests'
                      value={formData.requests}
                      onChange={e =>
                        setFormData({ ...formData, requests: e.target.value })
                      }
                      rows={4}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                      placeholder='Dietary restrictions, special occasions, seating preferences...'
                    />
                  </div>

                  <Button
                    type='submit'
                    size='lg'
                    className='w-full bg-amber-600 hover:bg-amber-700 text-white'
                  >
                    <Calendar className='h-5 w-5 mr-2' />
                    Confirm Reservation
                  </Button>
                </form>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Contact Us
            </h2>
            <p className='text-lg text-gray-600'>
              Get in touch with us for reservations, events, or any questions
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Information */}
            <div className='space-y-8'>
              <div className='flex items-start space-x-4'>
                <MapPin className='h-6 w-6 text-amber-600 mt-1' />
                <div>
                  <h3 className='font-semibold text-gray-900 mb-1'>Address</h3>
                  <p className='text-gray-600'>
                    123 Italian Way
                    <br />
                    Little Italy, NY 10013
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <Phone className='h-6 w-6 text-amber-600 mt-1' />
                <div>
                  <h3 className='font-semibold text-gray-900 mb-1'>Phone</h3>
                  <p className='text-gray-600'>(212) 555-0123</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <Mail className='h-6 w-6 text-amber-600 mt-1' />
                <div>
                  <h3 className='font-semibold text-gray-900 mb-1'>Email</h3>
                  <p className='text-gray-600'>info@latavolarestaurant.com</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <Clock className='h-6 w-6 text-amber-600 mt-1' />
                <div>
                  <h3 className='font-semibold text-gray-900 mb-1'>
                    Opening Hours
                  </h3>
                  <div className='text-gray-600 space-y-1'>
                    <p>Monday - Thursday: 5:00 PM - 10:00 PM</p>
                    <p>Friday - Saturday: 5:00 PM - 11:00 PM</p>
                    <p>Sunday: 4:00 PM - 9:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className='font-semibold text-gray-900 mb-4'>Follow Us</h3>
                <div className='flex space-x-4'>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-amber-600 transition-colors'
                    aria-label='Facebook'
                  >
                    <Facebook className='h-6 w-6' />
                  </a>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-amber-600 transition-colors'
                    aria-label='Instagram'
                  >
                    <Instagram className='h-6 w-6' />
                  </a>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-amber-600 transition-colors'
                    aria-label='Twitter'
                  >
                    <Twitter className='h-6 w-6' />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className='rounded-lg overflow-hidden shadow-lg h-96'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-73.9987384!3d40.7507493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAyLjciTiA3M8KwNTknNTUuNSJX!5e0!3m2!1sen!2sus!4v1234567890123'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='La Tavola Restaurant Location'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Quick Links */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
              <div className='space-y-2'>
                <button
                  onClick={() => scrollToSection('home')}
                  className='block text-gray-300 hover:text-white transition-colors'
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('menu')}
                  className='block text-gray-300 hover:text-white transition-colors'
                >
                  Menu
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className='block text-gray-300 hover:text-white transition-colors'
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection('reservations')}
                  className='block text-gray-300 hover:text-white transition-colors'
                >
                  Reservations
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className='block text-gray-300 hover:text-white transition-colors'
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className='block text-gray-300 hover:text-white transition-colors'
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>Contact Info</h3>
              <div className='space-y-2 text-gray-300'>
                <p>123 Italian Way</p>
                <p>Little Italy, NY 10013</p>
                <p>(212) 555-0123</p>
                <p>info@latavolarestaurant.com</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>Opening Hours</h3>
              <div className='space-y-2 text-gray-300 text-sm'>
                <p>Mon - Thu: 5:00 PM - 10:00 PM</p>
                <p>Fri - Sat: 5:00 PM - 11:00 PM</p>
                <p>Sunday: 4:00 PM - 9:00 PM</p>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>Newsletter</h3>
              <p className='text-gray-300 text-sm mb-4'>
                Subscribe to receive special offers and updates
              </p>
              <div className='space-y-2'>
                <Input
                  type='email'
                  placeholder='Your email address'
                  className='bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                />
                <Button className='w-full bg-amber-600 hover:bg-amber-700 text-white'>
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className='border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center'>
            <div className='flex items-center space-x-2 mb-4 md:mb-0'>
              <ChefHat className='h-6 w-6 text-amber-600' />
              <span className='text-lg font-bold'>La Tavola</span>
            </div>
            <p className='text-gray-400 text-sm text-center md:text-left'>
              © {new Date().getFullYear()} La Tavola Restaurant. All rights
              reserved.
            </p>
            <div className='flex space-x-4 mt-4 md:mt-0'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Facebook'
              >
                <Facebook className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Instagram'
              >
                <Instagram className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Twitter'
              >
                <Twitter className='h-5 w-5' />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

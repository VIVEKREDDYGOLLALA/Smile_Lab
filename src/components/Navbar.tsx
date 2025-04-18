import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Cpu, Users, FlaskConical, BookOpen, Building2, GraduationCap, Mail, ChevronDown, LogIn, Image } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Navigation items with dropdown options
const navItems = [
  {
    id: 'member',
    text: 'MEMBER',
    icon: <Users className="h-4 w-4" />,
    path: '/members',
    dropdown: [
      { text: 'Faculty', path: '/members/faculty' },
      { text: 'Researchers', path: '/members/researchers' },
      { text: 'Graduate Students', path: '/members/graduate-students' },
      { text: 'Alumni', path: '/members/alumni' }
    ]
  },
  {
    id: 'research',
    text: 'RESEARCH',
    icon: <FlaskConical className="h-4 w-4" />,
    path: '/research',
    dropdown: [
      { text: 'Neuromorphic Computing', path: '/research/neuromorphic-computing' },
      { text: 'Nano-electronics', path: '/research/nano-electronics' },
      { text: 'Future Logic Devices', path: '/research/future-logic-devices' },
      { text: 'Memory Technologies', path: '/research/memory-technologies' }
    ]
  },
  {
    id: 'publication',
    text: 'PUBLICATION',
    icon: <BookOpen className="h-4 w-4" />,
    path: '/publications',
    dropdown: [
      { text: 'Journal Papers', path: '/publications/journal-papers' },
      { text: 'Conference Papers', path: '/publications/conference-papers' },
      { text: 'Patents', path: '/publications/patents' },
      { text: 'Books & Book Chapters', path: '/publications/books' }
    ]
  },
  {
    id: 'gallery',
    text: 'GALLERY',
    icon: <Image className="h-4 w-4" />,
    path: '/gallery',
    dropdown: [
      { text: 'Lab Events', path: '/gallery/lab-events' },
      { text: 'Conferences', path: '/gallery/conferences' },
      { text: 'Research Highlights', path: '/gallery/research-highlights' },
      { text: 'Workshops & Seminars', path: '/gallery/workshops-seminars' }
    ]
  },
  {
    id: 'facility',
    text: 'FACILITY',
    icon: <Building2 className="h-4 w-4" />,
    path: '/facility',
    dropdown: [
      { text: 'Lab Equipment', path: '/facility/lab-equipment' },
      { text: 'Cleanroom', path: '/facility/cleanroom' },
      { text: 'Computation Resources', path: '/facility/computation-resources' },
      { text: 'Virtual Tour', path: '/facility/virtual-tour' }
    ]
  },
  {
    id: 'lecture',
    text: 'LECTURE',
    icon: <GraduationCap className="h-4 w-4" />,
    path: '/lecture',
    dropdown: [
      { text: 'Undergraduate Courses', path: '/lecture/undergraduate' },
      { text: 'Graduate Courses', path: '/lecture/graduate' },
      { text: 'Workshops', path: '/lecture/workshops' },
      { text: 'Tutorial Videos', path: '/lecture/tutorials' }
    ]
  },
  {
    id: 'contact',
    text: 'CONTACT',
    icon: <Mail className="h-4 w-4" />,
    path: '/contact',
    dropdown: [
      { text: 'Location', path: '/contact/location' },
      { text: 'Email', path: '/contact/email' },
      { text: 'Join Us', path: '/contact/join-us' },
      { text: 'Collaboration Inquiries', path: '/contact/collaboration' }
    ]
  }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loadingNavItem, setLoadingNavItem] = useState(null);
  const navigate = useNavigate();
  const dropdownRefs = useRef({});
  const timeoutRef = useRef(null);
  
  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setNavVisible(false);
      } else {
        // Scrolling up
        setNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Modified hover handlers for better dropdown behavior
  const handleDropdownEnter = (id) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleDropdownLeave = () => {
    // Set timeout to close dropdown with a slight delay
    // This gives users time to move their mouse to the dropdown
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay before closing
  };

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown !== null) {
        const dropdownRef = dropdownRefs.current[activeDropdown];
        if (dropdownRef && !dropdownRef.contains(event.target)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // Modified navigation handler to show icon animation and trigger global loading state
  const handleNavigation = (path, itemId) => {
    // Don't show loading for login page
    if (path === '/login') {
      navigate(path);
      return;
    }
    
    // Set which icon is animating
    setLoadingNavItem(itemId);
    
    // Trigger a custom event for App.tsx to show loading state
    const loadingEvent = new CustomEvent('pageLoadingStart', { 
      detail: { path, navItemId: itemId } 
    });
    window.dispatchEvent(loadingEvent);
    
    // Navigate after a delay (3 seconds)
    setTimeout(() => {
      setLoadingNavItem(null);
      navigate(path);
      
      // Trigger event to stop loading
      const loadingEndEvent = new CustomEvent('pageLoadingEnd');
      window.dispatchEvent(loadingEndEvent);
    }, 3000);
  };

  // Get animated icon class
  const getIconClass = (itemId) => {
    if (loadingNavItem === itemId) {
      return "animate-bounce";
    }
    return "";
  };

  return (
    <nav className={`fixed w-full z-50 bg-blue-900 backdrop-blur-sm bg-opacity transition-transform duration-300 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div 
              onClick={() => handleNavigation('/', 'home')}
              className="flex items-center cursor-pointer"
            >
              <Cpu className={`h-8 w-8 text-white ${getIconClass('home')}`} />
              <span className="ml-2 text-xl font-semibold text-white">SMILE Lab</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <div 
                key={item.id} 
                className="relative"
                ref={el => dropdownRefs.current[item.id] = el}
                onMouseEnter={() => handleDropdownEnter(item.id)}
                onMouseLeave={() => handleDropdownLeave()}
              >
                <div 
                  className="text-white hover:text-gray-200 px-2 py-2 mx-1 rounded-md text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
                  onClick={() => handleNavigation(item.path, item.id)}
                >
                  <span className={getIconClass(item.id)}>
                    {item.icon}
                  </span>
                  {item.text}
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                </div>
                
                {/* Desktop Dropdown with improved visibility and hover behavior */}
                <div 
                  className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-all duration-150 ${
                    activeDropdown === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                  onMouseEnter={() => {
                    // Clear timeout when mouse enters dropdown
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current);
                      timeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={() => {
                    // Close dropdown after a slight delay when mouse leaves
                    timeoutRef.current = setTimeout(() => {
                      setActiveDropdown(null);
                    }, 300);
                  }}
                >
                  <div className="py-1">
                    {item.dropdown.map((dropdownItem, index) => (
                      <div 
                        key={index} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleNavigation(dropdownItem.path, `${item.id}-sub-${index}`)}
                      >
                        {dropdownItem.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Login Link - Desktop */}
            <div 
              className="text-white hover:text-gray-200 px-3 py-2 mx-1 rounded-md text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavigation('/login', 'login')}
            >
              <LogIn className={`h-4 w-4 ${getIconClass('login')}`} />
              LOGIN
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div 
              className="mr-4 text-white hover:text-gray-200 flex items-center gap-1 cursor-pointer"
              onClick={() => handleNavigation('/login', 'login')}
            >
              <LogIn className={`h-4 w-4 ${getIconClass('login')}`} />
              LOGIN
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-900 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.id} className="block">
                <div
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between cursor-pointer"
                  onClick={() => toggleDropdown(item.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className={getIconClass(item.id)}>
                      {item.icon}
                    </span>
                    {item.text}
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                </div>
                
                {/* Mobile Dropdown - Improved with smooth transitions */}
                <div 
                  className={`pl-6 mt-1 space-y-1 transition-all duration-300 overflow-hidden ${
                    activeDropdown === item.id 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.dropdown.map((dropdownItem, index) => (
                    <div 
                      key={index} 
                      className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white cursor-pointer"
                      onClick={() => {
                        closeMenu();
                        handleNavigation(dropdownItem.path, `${item.id}-sub-${index}`);
                      }}
                    >
                      {dropdownItem.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
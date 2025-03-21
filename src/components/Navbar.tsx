import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Cpu, Users, FlaskConical, BookOpen, Building2, GraduationCap, Mail, ChevronDown, LogIn, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

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
  },
];

const Navbar: React.FC = () => {
  const s='log';
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Accessing the isLoggedIn state from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleDropdownEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null
    }
    setActiveDropdown(id);
  };

  const handleDropdownLeave = (id: string) => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown !== null) {
        const dropdownRef = dropdownRefs.current[activeDropdown];
        if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set logged-in state to false
    localStorage.removeItem('token'); // Remove the JWT token
  };

  return (
    <nav className={`fixed w-full z-50 bg-blue-900 backdrop-blur-sm bg-opacity transition-transform duration-300 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu}>
              <div className="flex items-center">
                <Cpu className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-semibold text-white">SMILE Lab</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                ref={(el) => (dropdownRefs.current[item.id] = el)}
                onMouseEnter={() => handleDropdownEnter(item.id)}
                onMouseLeave={() => handleDropdownLeave(item.id)}
              >
                <Link
                  to={item.path}
                  className="text-white hover:text-gray-200 px-3 py-2 mx-1 rounded-md text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
                  onClick={() => setActiveDropdown(null)}
                >
                  {item.icon}
                  {item.text}
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                </Link>

                <div
                  className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-all duration-150 ${
                    activeDropdown === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="py-1">
                    {item.dropdown.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        to={dropdownItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {dropdownItem.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Conditional Rendering for Login/User */}
            {isLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('log')}
              onMouseLeave={() => handleDropdownLeave('log')}
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-white flex items-center gap-2"
              >
                <User className="h-6 w-6" />
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {activeDropdown === 'log' && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>

            ) : (
              <Link
                to="/login"
                className="text-white hover:text-gray-200 px-3 py-2 mx-1 rounded-md text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                LOGIN
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className="mr-2">
                {isLoggedIn ? (
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                )}
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
        <div className="md:hidden bg-blue-700 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.id} className="block">
                <div
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between cursor-pointer"
                  onClick={() => toggleDropdown(item.id)}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {item.text}
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                </div>

                <div
                  className={`pl-6 mt-1 space-y-1 transition-all duration-300 overflow-hidden ${
                    activeDropdown === item.id
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.dropdown.map((dropdownItem, index) => (
                    <Link
                      key={index}
                      to={dropdownItem.path}
                      className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white"
                      onClick={closeMenu}
                    >
                      {dropdownItem.text}
                    </Link>
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

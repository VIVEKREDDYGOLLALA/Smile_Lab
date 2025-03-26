import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Camera, Users, FlaskConical, GraduationCap } from 'lucide-react';

// Category interface
interface GalleryCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  count: number;
}

// Gallery categories
const categories: GalleryCategory[] = [
  {
    id: 'lab-events',
    title: 'Lab Events',
    description: 'Photos from lab celebrations, meetings, social gatherings, and special events.',
    icon: <Users className="h-8 w-8" />,
    path: '/gallery/lab-events',
    count: 12
  },
  {
    id: 'conferences',
    title: 'Conferences',
    description: 'Our team presenting research at national and international conferences.',
    icon: <Camera className="h-8 w-8" />,
    path: '/gallery/conferences',
    count: 8
  },
  {
    id: 'research-highlights',
    title: 'Research Highlights',
    description: 'Visual documentation of our key research achievements and breakthroughs.',
    icon: <FlaskConical className="h-8 w-8" />,
    path: '/gallery/research-highlights',
    count: 15
  },
  {
    id: 'workshops-seminars',
    title: 'Workshops & Seminars',
    description: 'Educational events, guest lectures, and training sessions hosted by our lab.',
    icon: <GraduationCap className="h-8 w-8" />,
    path: '/gallery/workshops-seminars',
    count: 6
  }
];

const GalleryMain: React.FC = () => {
  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">SMILE Lab Gallery</h1>
        <p className="mt-4 text-lg text-gray-600">
          Browse photos and images from our research activities, events, and achievements
        </p>
      </div>

      {/* Featured gallery section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Featured Galleries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.path}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-blue-100 rounded-full mb-4 text-blue-800">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{category.count} albums</p>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent additions */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Additions</h2>
          <Link to="/gallery/all" className="text-blue-600 hover:text-blue-800 font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* These would be dynamically generated from your recent photos */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
              <img 
                src="/api/placeholder/400/320" 
                alt="Latest Research Presentation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">Latest Research Presentation</h3>
              <p className="text-sm text-gray-500 mb-2">March 15, 2025</p>
              <p className="text-gray-600 text-sm">Presenting our latest findings at the IEEE International Conference.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
              <img 
                src="/api/placeholder/400/320" 
                alt="Lab Welcome Event" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">Lab Welcome Event</h3>
              <p className="text-sm text-gray-500 mb-2">February 28, 2025</p>
              <p className="text-gray-600 text-sm">Welcoming new graduate students and researchers to our lab.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
              <img 
                src="/api/placeholder/400/320" 
                alt="New Equipment Installation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">New Equipment Installation</h3>
              <p className="text-sm text-gray-500 mb-2">January 20, 2025</p>
              <p className="text-gray-600 text-sm">Setting up our new advanced characterization equipment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryMain;
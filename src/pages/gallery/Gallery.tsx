import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Interface for gallery item
interface GalleryItem {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category: string;
}

// Sample gallery data - replace with your actual data source
const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Annual Lab Symposium 2024',
    date: 'March 15, 2024',
    description: 'Highlights from our annual research symposium featuring guest speakers from leading universities.',
    imageUrl: '/images/gallery/symposium-2024.jpg',
    category: 'lab-events'
  },
  {
    id: '2',
    title: 'International Conference on Neuromorphic Systems',
    date: 'January 28, 2024',
    description: 'Our team presenting the latest research on neuromorphic computing architectures.',
    imageUrl: '/images/gallery/conference-neuro-2024.jpg',
    category: 'conferences'
  },
  {
    id: '3',
    title: 'New Nanofabrication Equipment',
    date: 'December 10, 2023',
    description: 'Installation of our new state-of-the-art nanofabrication system.',
    imageUrl: '/images/gallery/nano-equipment-2023.jpg',
    category: 'research-highlights'
  },
  {
    id: '4',
    title: 'Graduate Student Workshop',
    date: 'November 5, 2023',
    description: 'Workshop on advanced semiconductor characterization techniques led by Dr. Zhang.',
    imageUrl: '/images/gallery/workshop-2023.jpg',
    category: 'workshops-seminars'
  },
  {
    id: '5',
    title: 'Lab Open House',
    date: 'October 12, 2023',
    description: 'Annual open house showcasing our research to undergraduate students and faculty.',
    imageUrl: '/images/gallery/open-house-2023.jpg',
    category: 'lab-events'
  },
  {
    id: '6',
    title: 'IEEE Device Research Conference',
    date: 'September 18, 2023',
    description: 'Presenting our latest paper on novel memory device structures.',
    imageUrl: '/images/gallery/ieee-conference-2023.jpg',
    category: 'conferences'
  }
];

const Gallery: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Filter gallery items based on category from URL params
    if (category) {
      setItems(galleryData.filter(item => item.category === category));
    } else {
      // Show all items if no category specified
      setItems(galleryData);
    }
  }, [category]);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  // Get title based on category
  const getCategoryTitle = () => {
    switch (category) {
      case 'lab-events':
        return 'Lab Events';
      case 'conferences':
        return 'Conferences';
      case 'research-highlights':
        return 'Research Highlights';
      case 'workshops-seminars':
        return 'Workshops & Seminars';
      default:
        return 'All Galleries';
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">{getCategoryTitle()}</h1>
        <p className="mt-4 text-lg text-gray-600">
          Browse photos from our research lab activities, conferences, and events
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => openModal(item)}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback image if the original fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "/api/placeholder/400/320";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.date}</p>
              <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No gallery items found for this category.</p>
        </div>
      )}

      {/* Image Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            >
              ✕
            </button>
            
            <div className="h-96 overflow-hidden">
              <img 
                src={selectedItem.imageUrl} 
                alt={selectedItem.title} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback image if the original fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "/api/placeholder/800/600";
                }}
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
              <p className="text-gray-500 mb-4">{selectedItem.date}</p>
              <p className="text-gray-700">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
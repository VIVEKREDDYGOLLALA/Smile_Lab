import React, { useState } from 'react';
import FacilityLayout from '../../components/facility/FacilityLayout';
import { Microscope, Calendar, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Access the AuthContext

const LabEquipmentPage: React.FC = () => {
  const { isLoggedIn } = useAuth(); // Access the login state
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const navigate = useNavigate();

  const equipment = [
    {
      name: "Atomic Force Microscope",
      description: "High-resolution scanning probe microscopy for surface characterization",
      specs: ["Resolution: 0.1nm", "Scan size: 100µm × 100µm", "Multiple scanning modes"],
      bookingId: "atomic-force-microscope"
    },
    {
      name: "Semiconductor Parameter Analyzer",
      description: "Precise electrical characterization of semiconductor devices",
      specs: ["DC/AC analysis", "Pulse measurements", "Temperature control"],
      bookingId: "semiconductor-parameter-analyzer"
    },
    // Add more equipment as needed
  ];

  // Handle "Book Now" click
  const handleBookClick = (bookingId: string) => {
    if (!isLoggedIn) {
      // Show login prompt popup
      setSelectedEquipment(bookingId);
      setIsPopupVisible(true);
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login', { state: { redirectUrl: `/equipment-booking/${bookingId}` } });
      }, 3000);
    } else {
      // If logged in, directly navigate to the booking page for that equipment
      window.location.href = `https://www.iiitdm.ac.in/`; // This will be dynamic in production
    }
  };

  // Handle closing the login prompt
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <FacilityLayout
      title="Laboratory Equipment"
      description="State-of-the-art equipment for semiconductor research and characterization"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {equipment.map((item, index) => (
          <div key={index} className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition-all duration-300 flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-blue-900" />
              {item.name}
            </h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {item.specs.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
            <div className="mt-auto pt-4 border-t border-gray-100">
              <button 
                onClick={() => handleBookClick(item.bookingId)} // Trigger booking click
                className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Equipment
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up for Login Prompt */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-md w-full">
            <p className="text-lg font-semibold text-gray-700">You must log in first!</p>
            <p className="text-sm text-gray-500 mt-2">You will be redirected to the login page.</p>
            <div className="mt-4">
              <button onClick={closePopup} className="text-blue-900 hover:text-blue-500">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </FacilityLayout>
  );
};

export default LabEquipmentPage;

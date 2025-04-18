import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import LoginPage from './pages/LoginPage';
// Page Components
import HomePage from './pages/HomePage'; 
import MembersPage from './pages/MembersPage'; 
import ResearchPage from './pages/ResearchPage'; 
import PublicationsPage from './pages/PublicationsPage'; 
import PublicationDetailPage from './pages/PublicationDetailPage'; 
import FacilityPage from './pages/FacilityPage'; 
import LabEquipmentPage from './pages/facility/LabEquipmentPage'; 
import CleanroomPage from './pages/facility/CleanroomPage'; 
import ComputationResourcesPage from './pages/facility/ComputationResourcesPage'; 
import VirtualTourPage from './pages/facility/VirtualTourPage'; 
import LecturePage from './pages/LecturePage'; 
import UndergraduateCoursesPage from './pages/lecture/UndergraduateCoursesPage'; 
import GraduateCoursesPage from './pages/lecture/GraduateCoursesPage'; 
import WorkshopsPage from './pages/lecture/WorkshopsPage'; 
import EmailPage from './pages/contact/EmailPage'; 
import ContactPage from './pages/ContactPage'; 
import TutorialsPage from './pages/lecture/TutorialsPage'; 
import LocationPage from './pages/contact/LocationPage'; 
import JoinUsPage from './pages/contact/JoinUsPage'; 
import CollaborationPage from './pages/contact/CollaborationPage';

// Gallery Components
import GalleryMain from './pages/gallery/GalleryMain';
import Gallery from './pages/gallery/Gallery';
import { useState, useEffect } from 'react';

// Icons from Lucide for loading animation
import { Users, FlaskConical, BookOpen, Building2, GraduationCap, Mail, Image, Cpu } from 'lucide-react';

function App() {   
  const [isLoading, setIsLoading] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState<React.ReactNode>(null);
  const [targetPath, setTargetPath] = useState('');

  // Map navigation item IDs to their corresponding icons
  const iconMap: Record<string, React.ReactNode> = {
    'home': <Cpu size={32} />,
    'member': <Users size={32} />,
    'research': <FlaskConical size={32} />,
    'publication': <BookOpen size={32} />,
    'gallery': <Image size={32} />,
    'facility': <Building2 size={32} />,
    'lecture': <GraduationCap size={32} />,
    'contact': <Mail size={32} />
  };

  // Listen for page loading events
  useEffect(() => {
    const handleLoadingStart = (event: CustomEvent<{path: string, navItemId: string}>) => {
      setIsLoading(true);
      setTargetPath(event.detail.path);
      
      // Get the main category from the event
      const navItemId = event.detail.navItemId;
      const mainCategory = navItemId.split('-')[0]; // Extract main category for sub-items
      
      // Set the icon based on the navigation item
      if (iconMap[mainCategory]) {
        setLoadingIcon(iconMap[mainCategory]);
      } else {
        // Default icon if not found
        setLoadingIcon(iconMap.home);
      }
    };

    const handleLoadingEnd = () => {
      setIsLoading(false);
      setLoadingIcon(null);
    };

    window.addEventListener('pageLoadingStart', handleLoadingStart as EventListener);
    window.addEventListener('pageLoadingEnd', handleLoadingEnd);

    return () => {
      window.removeEventListener('pageLoadingStart', handleLoadingStart as EventListener);
      window.removeEventListener('pageLoadingEnd', handleLoadingEnd);
    };
  }, []);

  return (     
    <Router>       
      <div className="min-h-screen bg-white flex flex-col">     
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
            <div className="animate-bounce mb-4 text-white">
              {loadingIcon}
            </div>
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 animate-pulse rounded-full"></div>
            </div>
            <div className="mt-4 text-white font-medium">
              Navigating to {targetPath.substring(1) || 'Home'}...
            </div>
          </div>
        )}    
        <Navbar />       
        <div className="flex-grow">           
          <Routes>             
            <Route path="/" element={<HomePage />} />             
            <Route path="/members" element={<MembersPage />} />             
            <Route path="/members/:subpage" element={<MembersPage />} />             
            <Route path="/research" element={<ResearchPage />} />             
            <Route path="/research/:subpage" element={<ResearchPage />} />             
            <Route path="/publications" element={<PublicationsPage />} />             
            <Route path="/publications/:subpage" element={<PublicationsPage />} />  
            {/* Add the new route for publication detail page */}           
            <Route path="/publications/:pubType/view/:pubId" element={<PublicationDetailPage />} />
            
            {/* Gallery Routes */}
            <Route path="/gallery" element={<GalleryMain />} />
            <Route path="/gallery/:category" element={<Gallery />} />
            
            <Route path="/facility" element={<FacilityPage />} />             
            <Route path="/facility/:subpage" element={<FacilityPage />} />             
            <Route path="/facility/lab-equipment" element={<LabEquipmentPage />} />             
            <Route path="/facility/cleanroom" element={<CleanroomPage />} />             
            <Route path="/facility/computation-resources" element={<ComputationResourcesPage />} />             
            <Route path="/facility/virtual-tour" element={<VirtualTourPage />} />             
            <Route path="/lecture" element={<LecturePage />} />             
            <Route path="/lecture/undergraduate" element={<UndergraduateCoursesPage />} />             
            <Route path="/lecture/graduate" element={<GraduateCoursesPage />} />             
            <Route path="/lecture/workshops" element={<WorkshopsPage />} />             
            <Route path="/lecture/tutorials" element={<TutorialsPage />} />             
            <Route path="/contact" element={<ContactPage />} />             
            <Route path="/contact/email" element={<EmailPage />} />             
            <Route path="/lecture/graduate" element={<GraduateCoursesPage />} />             
            <Route path="/lecture/workshops" element={<WorkshopsPage />} />             
            <Route path="/contact/location" element={<LocationPage />} />             
            <Route path="/contact/join-us" element={<JoinUsPage />} />             
            <Route path="/contact/collaboration" element={<CollaborationPage />} />  
            <Route path="/login" element={<LoginPage />} />
          </Routes>         
        </div>         
        <Footer />       
      </div>     
    </Router>   
  ); 
} 

export default App;
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import LoginPage from './pages/LoginPage';
// Page Components
import HomePage from './pages/HomePage'; 
import MembersPage from './pages/MembersPage'; 
import ResearchPage from './pages/ResearchPage'; 
import PublicationsPage from './pages/PublicationsPage'; 
import PublicationDetailPage from './pages/PublicationDetailPage.tsx'; // Import the new component
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

function App() {   
  return (     
    <Router>       
      <div className="min-h-screen bg-white flex flex-col">         
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
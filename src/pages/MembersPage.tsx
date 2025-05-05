import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Define TypeScript interfaces for members
interface Member {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  research: string;
}

interface Members {
  faculty: Member[];
  researchers: Member[];
  "graduate-students": Member[];
  alumni: Member[];
}

const MembersPage = () => {
  const { subpage } = useParams<{ subpage?: keyof Members }>();
  const [activeTab, setActiveTab] = useState<keyof Members>(subpage || 'faculty');

  useEffect(() => {
    if (subpage) {
      setActiveTab(subpage);
    }
  }, [subpage]);

  // Sample data
  const members: Members = {
    faculty: [
      { id: 1, name: 'Dr. pandiarasan ', title: 'Professor & Lab Director', image: '/api/placeholder/400/400', bio: 'Ph.D. in Electrical Engineering from MIT. 15+ years of experience in nanoelectronics research.', research: 'Neuromorphic computing, Quantum devices' },
      { id: 2, name: 'Dr. M', title: 'Associate Professor', image: '/api/placeholder/400/400', bio: 'Ph.D. in Physics from Stanford. Expert in semiconductor device physics.', research: 'Spintronics, 2D materials' },
      { id: 3, name: 'Dr. Sarah Williams', title: 'Assistant Professor', image: '/api/placeholder/400/400', bio: 'Ph.D. in Materials Science from Berkeley. Specializes in novel materials for electronics.', research: 'Advanced memory materials, Ferroelectric devices' }
    ],
    researchers: [
      { id: 1, name: 'Dr. Robert Chen', title: 'Senior Research Scientist', image: '/api/placeholder/400/400', bio: 'Ph.D. in Electrical Engineering from Cornell. 8 years of industry experience.', research: 'Non-volatile memory, Neural network accelerators' },
      { id: 2, name: 'Dr. Emily Davis', title: 'Postdoctoral Researcher', image: '/api/placeholder/400/400', bio: 'Ph.D. in Computer Engineering from Georgia Tech. Focus on hardware-software co-design.', research: 'Neuromorphic algorithms, Edge AI' },
      { id: 3, name: 'Dr. James Wilson', title: 'Research Scientist', image: '/api/placeholder/400/400', bio: 'Ph.D. in Physics from Caltech. Expert in quantum computing.', research: 'Quantum dots, Cryogenic electronics' }
    ],
    "graduate-students": [
      { id: 1, name: 'Alex Rodriguez', title: 'Ph.D. Candidate (4th year)', image: '/api/placeholder/400/400', bio: 'M.S. in Electrical Engineering. Working on neuromorphic computing architectures.', research: 'Memristive neural networks, Spike-timing-dependent plasticity' },
      { id: 2, name: 'Priya Patel', title: 'Ph.D. Candidate (3rd year)', image: '/api/placeholder/400/400', bio: 'B.S. in Computer Engineering. Researching novel memory technologies.', research: 'Phase-change memory, In-memory computing' },
      { id: 3, name: 'David Kim', title: 'Ph.D. Student (2nd year)', image: '/api/placeholder/400/400', bio: 'M.S. in Materials Science. Focus on 2D materials for electronics.', research: 'TMD-based devices, Heterostructures' },
      { id: 4, name: 'Sophia Lee', title: 'M.S. Student', image: '/api/placeholder/400/400', bio: 'B.S. in Electrical Engineering. Working on device modeling.', research: 'TCAD simulation, Compact modeling' }
    ],
    alumni: [
      { id: 1, name: 'Dr. Thomas Wang', title: 'Former Ph.D. Student (2018-2023)', image: '/api/placeholder/400/400', bio: 'Currently a Research Scientist at Intel.', research: 'Advanced logic devices, FinFET technology' },
      { id: 2, name: 'Dr. Lisa Garcia', title: 'Former Postdoc (2020-2022)', image: '/api/placeholder/400/400', bio: 'Currently an Assistant Professor at University of Michigan.', research: 'Quantum computing, Superconducting qubits' },
      { id: 3, name: 'Dr. Kevin Brown', title: 'Former Ph.D. Student (2017-2022)', image: '/api/placeholder/400/400', bio: 'Currently a Design Engineer at Samsung.', research: 'Memory cell design, ReRAM technology' }
    ]
  };

  const tabItems = [
    { id: 'faculty', label: 'Faculty' },
    { id: 'researchers', label: 'Researchers' },
    { id: 'graduate-students', label: 'Graduate Students' },
    { id: 'alumni', label: 'Alumni' }
  ];

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Our Team</h1>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center space-x-1 md:space-x-4 mb-8 border-b">
          {tabItems.map(tab => (
            <Link 
              key={tab.id}
              to={`/members/${tab.id}`}
              className={`px-4 py-2 font-medium text-sm md:text-base mb-1 ${activeTab === tab.id ? 'border-b-2 border-blue-900 text-blue-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        
        {/* Members List */}
        <div className="mt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members[activeTab]?.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-blue-900 mb-4">{member.title}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div>
                    <span className="font-semibold">Research Focus:</span>
                    <p className="text-gray-700">{member.research}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MembersPage;

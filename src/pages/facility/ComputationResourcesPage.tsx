import React from 'react';
import FacilityLayout from '../../components/facility/FacilityLayout';
import { Server, Cpu, Database, Monitor, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComputationResourcesPage: React.FC = () => {
  const resources = [
    {
      name: "HPC Cluster",
      description: "High-performance computing cluster for complex simulations",
      specs: ["Multiple GPU nodes", "InfiniBand interconnect", "24/7 availability"],
      icon: <Server className="w-5 h-5 text-purple-400" />,
      bookingId: "hpc-cluster"
    },
    {
      name: "Software Tools",
      description: "Industry-standard simulation and analysis software",
      specs: ["TCAD tools", "Machine learning frameworks", "Data analysis suites"],
      icon: <Monitor className="w-5 h-5 text-purple-400" />,
      bookingId: "software-tools"
    },
    {
      name: "Storage Systems",
      description: "Large-scale storage for research data",
      specs: ["Petabyte capacity", "Backup systems", "Fast access speeds"],
      icon: <Database className="w-5 h-5 text-purple-400" />,
      bookingId: "storage-systems"
    }
  ];

  return (
    <FacilityLayout
      title="Computation Resources"
      description="Advanced computing infrastructure for research and simulation"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-800">
                {item.icon}
                {item.name}
              </h3>
              <p className="text-black-600 mb-4">{item.description}</p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {item.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <Link 
                  to={`/equipment-booking/${item.bookingId}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Equipment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FacilityLayout>
  );
};

export default ComputationResourcesPage;
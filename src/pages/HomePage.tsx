import React from 'react';
import { Link } from 'react-router-dom';
import NewsCarousel from '../components/NewsCarousel';
import EventCard from '../components/EventCard';
import ResearchTopicCard from '../components/ResearchTopicCard';

// Sample data - you can replace this with real data later
const newsItems = [
  {
    id: 1,
    title: "Lab Receives $2M Grant for Neuromorphic Research",
    date: "Feb 20, 2025",
    summary: "SMILE Lab has been awarded a $2 million grant to advance research in neuromorphic computing for AI applications.",
    imageUrl: "/api/placeholder/400/320",
    link: "/news/grant-award"
  },
  {
    id: 2,
    title: "New Publication in Nature Electronics",
    date: "Feb 15, 2025",
    summary: "Our team's research on novel memory devices has been published in Nature Electronics.",
    imageUrl: "/api/placeholder/400/320",
    link: "/news/nature-publication"
  },
  {
    id: 3,
    title: "Collaboration with Leading Tech Company",
    date: "Feb 10, 2025",
    summary: "SMILE Lab announces new collaboration with a leading tech company to develop next-generation computing solutions.",
    imageUrl: "/api/placeholder/400/320",
    link: "/news/industry-collaboration"
  },
  {
    id: 4,
    title: "Graduate Student Wins Best Paper Award",
    date: "Feb 5, 2025",
    summary: "Congratulations to our graduate student for winning the Best Paper Award at the International Conference on Emerging Technologies.",
    imageUrl: "/api/placeholder/400/320",
    link: "/news/student-award"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Annual SMILE Lab Symposium",
    date: "2025-03-15",
    time: "9:00 AM - 5:00 PM",
    location: "Main Campus, Building A, Room 101",
    description: "Join us for our annual symposium featuring presentations from lab members and guest speakers on the latest advances in semiconductor and memory research.",
    imageUrl: "/api/placeholder/800/400",
    agenda: [
      "9:00 AM - Opening Remarks",
      "9:30 AM - Keynote Speaker",
      "11:00 AM - Research Presentations",
      "12:30 PM - Lunch Break",
      "1:30 PM - Panel Discussion",
      "3:00 PM - Poster Session",
      "5:00 PM - Closing Remarks"
    ],
    speakers: [
      {
        name: "Dr. Jane Smith",
        title: "Professor, MIT",
        imageUrl: "/api/placeholder/100/100"
      },
      {
        name: "Dr. John Doe",
        title: "Principal Scientist, Tech Labs",
        imageUrl: "/api/placeholder/100/100"
      }
    ],
    registrationUrl: "https://example.com/register"
  },
  {
    id: 2,
    title: "Workshop on Neuromorphic Computing ( limited slots available )",
    date: "2025-03-25",
    time: "1:00 PM - 4:00 PM",
    location: "Engineering Building, Room E220",
    description: "A hands-on workshop exploring the principles and applications of neuromorphic computing for AI acceleration.",
    imageUrl: "/api/placeholder/800/400",
    registrationUrl: "https://example.com/register"
  },
  {
    id: 3,
    title: "Guest Lecture: Future of Memory Technologies",
    date: "2025-04-05",
    time: "3:00 PM - 4:30 PM",
    location: "Virtual (Zoom)",
    description: "Distinguished lecture on emerging memory technologies and their impact on computing architectures.",
    imageUrl: "/api/placeholder/800/400"
  }
];

const researchTopics = [
  {
    id: 1,
    title: "Neuromorphic Computing",
    description: "Developing brain-inspired computing architectures to enable more efficient AI processing and learning capabilities at the edge.",
    imageUrl: "/api/placeholder/400/320",
    path: "/research/neuromorphic-computing"
  },
  {
    id: 2,
    title: "Nano-electronics",
    description: "Exploring electronic properties and applications at nanoscale dimensions for next-generation devices.",
    imageUrl: "/api/placeholder/400/320",
    path: "/research/nano-electronics"
  },
  {
    id: 3,
    title: "Future Logic Devices",
    description: "Investigating novel materials and device concepts to overcome limitations of traditional CMOS technology.",
    imageUrl: "/api/placeholder/400/320",
    path: "/research/future-logic-devices"
  },
  {
    id: 4,
    title: "Memory Technologies",
    description: "Developing non-volatile memory solutions with higher density, lower power, and better reliability.",
    imageUrl: "/api/placeholder/400/320",
    path: "/research/memory-technologies"
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section / Banner */}
      <div className="relative h-screen bg-gradient-to-r from-blue-900 to-blue-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
          {/* Background pattern/image would go here */}
        </div>
        <div className="relative z-10 flex items-center justify-center h-full px-4 mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Semiconductor and Memory Innovation Lab
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-xl">
              Pioneering next-generation technologies for computing systems of the future
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link
                to="/research"
                className="px-6 py-3 text-lg font-medium text-blue-900 bg-white rounded-md transition-colors duration-300 hover:bg-blue-700 hover:text-white
"
              >
                Explore Research
              </Link>
              <Link
                to="/contact/join-us"
                className="px-6 py-3 text-lg font-medium text-white border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300"
              >
                Join Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Research Areas Section */}
      <div className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Research Areas
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600">
              Explore our innovative research programs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {researchTopics.map((topic) => (
              <ResearchTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl">
          <NewsCarousel newsItems={newsItems} />
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 bg-blue-900 text-white">
        <div className="px-4 mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Interested in Collaboration?</h2>
          <p className="text-xl mb-8">
            We welcome collaboration opportunities with academic institutions, industry partners, and government organizations.
          </p>
          <Link
            to="/contact/collaboration"
            className="inline-block px-8 py-3 text-lg font-medium bg-white text-blue-900 rounded-md hover:bg-blue-700 hover:text-white transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
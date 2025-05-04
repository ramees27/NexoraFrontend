import React, { useState } from 'react'
import Bookinrequest from './Bookingrequest';
import Rejected from './Rejected';
import Upcoming from './Upcoming';
import Completed from './Completed';

const  MainTabe = () => {
  const [activeTab, setActiveTab] = useState('Booking Request');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Booking Request':
        return <Bookinrequest />;
      case 'Rejected':
        return <Rejected />;
      case 'Upcoming':
        return <Upcoming />;
      case 'Completed':
        return <Completed />;
      default:
        return null;
    }
  };

  const tabs = ['Booking Request', 'Rejected', 'Upcoming', 'Completed'];
  return (
    <div className="p-4 mt-16">
    {/* Tab Header */}
    <div className="flex border rounded overflow-hidden mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 px-4 py-2 text-center ${
            activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Tab Content */}
    {renderTabContent()}
  </div>
  )
}

export default  MainTabe
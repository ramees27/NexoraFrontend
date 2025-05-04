import React, { useState } from 'react'
import PendingTab from './PendingTab';
import ScheduledTab from './ScheduledTab';
import CancelledTab from './CancelledTab';
import HistoryTab from './HistoryTab';

const Myactivity = () => {
    const renderTabContent = () => {
        switch (activeTab) {
          case 'Pending':
            return <PendingTab />;
          case 'Scheduled':
            return <ScheduledTab />;
          case 'Cancelled':
            return <CancelledTab />;
          case 'History':
            return <HistoryTab />;
          default:
            return null;
        }
      };
    const tabs = ['Pending', 'Scheduled', 'Cancelled', 'History'];
    const [activeTab, setActiveTab] = useState('Pending');

  return (
    <div className="p-6">
      <div className="flex justify-start mb-4">
    <button className="bg-black text-white px-4 py-2 rounded">
      ← Back to Home
    </button>
  </div>

      <h1 className="text-4xl font-bold text-center mb-2  text-blue-900">My Activity</h1>
      <p className="text-center text-blue-900 mb-6">
        Manage your counseling sessions and book new appointments.
      </p>

      <div className="flex justify-center gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="border p-4 rounded shadow">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default Myactivity
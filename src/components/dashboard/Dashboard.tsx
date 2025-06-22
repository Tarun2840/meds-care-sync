
import { useState } from 'react';
import Header from './Header';
import PatientDashboard from './PatientDashboard';
import CaretakerDashboard from './CaretakerDashboard';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      <main className="container mx-auto px-4 py-6">
        {user.role === 'patient' ? (
          <PatientDashboard user={user} />
        ) : (
          <CaretakerDashboard user={user} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;

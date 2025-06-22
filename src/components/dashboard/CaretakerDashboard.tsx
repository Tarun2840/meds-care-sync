
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const CaretakerDashboard = ({ user }) => {
  const [patients] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      adherence: 85,
      lastActivity: '2 hours ago',
      medicationsCount: 3,
      status: 'good'
    },
    {
      id: 2,
      name: 'Mary Johnson',
      email: 'mary@example.com',
      adherence: 92,
      lastActivity: '1 hour ago',
      medicationsCount: 2,
      status: 'excellent'
    },
    {
      id: 3,
      name: 'Robert Brown',
      email: 'robert@example.com',
      adherence: 65,
      lastActivity: '4 hours ago',
      medicationsCount: 5,
      status: 'needs_attention'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'needs_attention': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'needs_attention': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const averageAdherence = Math.round(patients.reduce((sum, p) => sum + p.adherence, 0) / patients.length);
  const needsAttention = patients.filter(p => p.status === 'needs_attention').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Caretaker Dashboard</h2>
        <p className="text-gray-600">Monitor and manage your patients' medication adherence</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Patients</CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{patients.length}</div>
            <p className="text-sm text-blue-700 mt-1">Under your care</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Average Adherence</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{averageAdherence}%</div>
            <p className="text-sm text-green-700 mt-1">Across all patients</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Needs Attention</CardTitle>
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{needsAttention}</div>
            <p className="text-sm text-orange-700 mt-1">Patients requiring follow-up</p>
          </CardContent>
        </Card>
      </div>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Your Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-500">{patient.email}</p>
                    <p className="text-xs text-gray-400">Last active: {patient.lastActivity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{patient.adherence}% adherence</p>
                    <p className="text-xs text-gray-500">{patient.medicationsCount} medications</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {getStatusIcon(patient.status)}
                    {patient.status === 'excellent' ? 'Excellent' : 
                     patient.status === 'good' ? 'Good' : 
                     'Needs Attention'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaretakerDashboard;

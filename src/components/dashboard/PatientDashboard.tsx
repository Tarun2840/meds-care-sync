
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Pill, TrendingUp, Plus, Check } from 'lucide-react';
import MedicationForm from '../medications/MedicationForm';
import MedicationList from '../medications/MedicationList';

const PatientDashboard = ({ user }) => {
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      timesTaken: 5,
      totalDoses: 7,
      lastTaken: '2024-06-21'
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      timesTaken: 12,
      totalDoses: 14,
      lastTaken: '2024-06-22'
    }
  ]);

  const addMedication = (medicationData) => {
    const newMedication = {
      id: Date.now(),
      ...medicationData,
      timesTaken: 0,
      totalDoses: 7, // Default week calculation
      lastTaken: null
    };
    setMedications([...medications, newMedication]);
    setShowAddMedication(false);
  };

  const markAsTaken = (medicationId) => {
    setMedications(meds => 
      meds.map(med => 
        med.id === medicationId 
          ? { ...med, timesTaken: med.timesTaken + 1, lastTaken: new Date().toISOString().split('T')[0] }
          : med
      )
    );
  };

  const overallAdherence = medications.length > 0 
    ? Math.round((medications.reduce((sum, med) => sum + (med.timesTaken / med.totalDoses), 0) / medications.length) * 100)
    : 0;

  const todaysMedications = medications.filter(med => med.lastTaken !== new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h2>
          <p className="text-gray-600">Here's your medication overview for today</p>
        </div>
        <Button onClick={() => setShowAddMedication(true)} className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Medication
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Overall Adherence</CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{overallAdherence}%</div>
            <Progress value={overallAdherence} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Today's Medications</CardTitle>
            <Calendar className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{todaysMedications.length}</div>
            <p className="text-sm text-green-700 mt-1">Remaining to take</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Total Medications</CardTitle>
            <Pill className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{medications.length}</div>
            <p className="text-sm text-purple-700 mt-1">Active prescriptions</p>
          </CardContent>
        </Card>
      </div>

      {/* Medication List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-600" />
            Your Medications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MedicationList medications={medications} onMarkAsTaken={markAsTaken} />
        </CardContent>
      </Card>

      {/* Add Medication Modal */}
      {showAddMedication && (
        <MedicationForm 
          onSubmit={addMedication}
          onCancel={() => setShowAddMedication(false)}
        />
      )}
    </div>
  );
};

export default PatientDashboard;


import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Clock, Pill } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const MedicationList = ({ medications, onMarkAsTaken }) => {
  const handleMarkAsTaken = (medication) => {
    onMarkAsTaken(medication.id);
    toast({
      title: "Medication taken!",
      description: `Marked ${medication.name} as taken for today.`
    });
  };

  const isAlreadyTakenToday = (medication) => {
    const today = new Date().toISOString().split('T')[0];
    return medication.lastTaken === today;
  };

  if (medications.length === 0) {
    return (
      <div className="text-center py-8">
        <Pill className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">No medications added yet</p>
        <p className="text-sm text-gray-400">Add your first medication to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {medications.map((medication) => {
        const adherencePercent = Math.round((medication.timesTaken / medication.totalDoses) * 100);
        const takenToday = isAlreadyTakenToday(medication);
        
        return (
          <div key={medication.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{medication.name}</h3>
                <p className="text-sm text-gray-600">{medication.dosage} • {medication.frequency}</p>
              </div>
              <div className="flex items-center gap-2">
                {takenToday ? (
                  <Badge variant="secondary" className="gap-1 bg-green-100 text-green-700">
                    <Check className="w-3 h-3" />
                    Taken today
                  </Badge>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => handleMarkAsTaken(medication)}
                    className="gap-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Check className="w-3 h-3" />
                    Mark as taken
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Adherence rate</span>
                <span className="font-medium">{adherencePercent}%</span>
              </div>
              <Progress value={adherencePercent} className="h-2" />
              <p className="text-xs text-gray-500">
                {medication.timesTaken} of {medication.totalDoses} doses taken this week
              </p>
            </div>
            
            {medication.lastTaken && (
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                Last taken: {new Date(medication.lastTaken).toLocaleDateString()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MedicationList;

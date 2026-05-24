import { Card, CardContent } from '../components/ui/Card';
import { FileUp, CheckCircle, Clock, FileText, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: 1, title: 'Meeting Created', description: 'Admin sets up the meeting shell.', icon: FileText, status: 'completed' },
  { id: 2, title: 'Agenda Uploaded', description: 'Departments submit their topics.', icon: FileUp, status: 'completed' },
  { id: 3, title: 'Evaluation & Approval', description: 'Para Head reviews agendas.', icon: CheckCircle, status: 'current' },
  { id: 4, title: 'Meeting Conducted', description: 'Live session held at venue.', icon: Clock, status: 'pending' },
  { id: 5, title: 'Report Generated', description: 'Final decisions officially documented.', icon: CheckCircle2, status: 'pending' }
];

const Timeline = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-main)]">Meeting Workflow Timeline</h1>
        <p className="text-[var(--text-muted)]">Track the progression lifecycle of MAC Meetings.</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="max-w-2xl mx-auto py-8">
            <h3 className="text-lg font-semibold text-[var(--text-main)] mb-8 text-center bg-[var(--bg-main)] p-4 rounded-lg border border-[var(--border-color)]">
              Current Focus: MAC-203 Phase Review
            </h3>

            <div className="relative border-l-2 border-[var(--border-color)] ml-6 md:ml-12 space-y-12">
              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = step.status === 'completed';
                const isCurrent = step.status === 'current';
                
                let iconColor = 'bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-color)]';
                if (isCompleted) iconColor = 'bg-green-500 text-white border-green-500';
                if (isCurrent) iconColor = 'bg-[var(--color-primary-light)] text-white border-[var(--color-primary-light)] ring-4 ring-blue-100 dark:ring-blue-900/40';

                return (
                  <div key={step.id} className="relative pl-10 md:pl-16 group">
                    <div className={`absolute -left-[17px] top-0.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors shadow-sm ${iconColor}`}>
                      <Icon size={14} strokeWidth={isCompleted || isCurrent ? 3 : 2} />
                    </div>
                    
                    <div className={`bg-[var(--bg-card)] border ${isCurrent ? 'border-[var(--color-primary-light)] shadow-md' : 'border-[var(--border-color)]'} rounded-lg p-5 hover:border-[var(--color-primary-light)] transition-all`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold text-lg ${isCurrent ? 'text-[var(--color-primary-light)]' : 'text-[var(--text-main)]'}`}>
                          {step.title}
                        </h4>
                        {isCompleted && <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded font-medium">Done</span>}
                        {isCurrent && <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded font-medium animate-pulse">In Progress</span>}
                      </div>
                      <p className="text-[var(--text-muted)]">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline;

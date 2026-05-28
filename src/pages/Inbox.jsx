import { Card, CardContent } from '../components/ui/Card';
import { Mail } from 'lucide-react';

const Inbox = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-main)]">Internal Inbox</h1>
        <p className="text-[var(--text-muted)]">Secure traditional email thread system.</p>
      </div>

      <Card>
        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-[var(--color-primary)] rounded-full flex items-center justify-center mb-4">
            <Mail size={32} />
          </div>
          <h2 className="text-lg font-semibold text-[var(--text-main)]">Inbox is Empty</h2>
          <p className="text-[var(--text-muted)] mt-2 max-w-md">
            You have no new messages at this time. The inbox module will sync with Socket.IO for realtime team communication.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inbox;

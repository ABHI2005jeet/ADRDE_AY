import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { mockMeetings } from '../mockData/meetings';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2026-06-01'));
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Format YYYY-MM-DD
  const formatDateString = (day) => {
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${currentDate.getFullYear()}-${mm}-${dd}`;
  };

  const getMeetingsForDay = (day) => {
    const dateStr = formatDateString(day);
    return mockMeetings.filter(m => m.date === dateStr);
  };

  const selectedDateMeetings = selectedDate 
    ? getMeetingsForDay(selectedDate)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">Calendar Schedule</h1>
          <p className="text-[var(--text-muted)]">Monthly view of all upcoming activities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <h2 className="text-lg font-bold text-[var(--text-main)]">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b border-[var(--border-color)] bg-[var(--bg-main)] text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-2 text-sm font-semibold text-[var(--text-muted)]">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 auto-rows-fr">
              {blanks.map(blank => (
                <div key={`blank-${blank}`} className="min-h-[100px] border-b border-r border-[var(--border-color)]/50 bg-[var(--bg-main)]/50 p-2"></div>
              ))}
              {days.map(day => {
                const dayMeetings = getMeetingsForDay(day);
                const hasMeetings = dayMeetings.length > 0;
                const isSelected = selectedDate === day;

                return (
                  <div 
                    key={day} 
                    onClick={() => setSelectedDate(day)}
                    className={`min-h-[100px] border-b border-r border-[var(--border-color)] p-2 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20 shadow-inner' : 'hover:bg-[var(--bg-main)]'}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${hasMeetings ? 'bg-[var(--color-primary-light)] text-white' : 'text-[var(--text-main)]'}`}>
                        {day}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1">
                      {dayMeetings.slice(0, 2).map((m, i) => (
                        <div key={i} className="text-xs truncate px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 border border-blue-200 dark:border-blue-700">
                          {m.title}
                        </div>
                      ))}
                      {dayMeetings.length > 2 && (
                        <div className="text-xs text-[var(--text-muted)] text-center">+ {dayMeetings.length - 2} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border-color)]">
          <CardHeader>
            <CardTitle>Schedule for {selectedDate ? `${selectedDate} ${monthNames[currentDate.getMonth()]}` : 'Selected Date'}</CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <div className="text-center py-10 text-[var(--text-muted)]">
                Select a date on the calendar to view scheduled meetings.
              </div>
            ) : selectedDateMeetings.length === 0 ? (
              <div className="text-center py-10 text-[var(--text-muted)]">
                No meetings scheduled for this date.
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateMeetings.map(meeting => (
                  <div key={meeting.id} className="border-l-4 border-[var(--color-primary-light)] bg-[var(--bg-main)] p-4 rounded-r-lg shadow-sm">
                    <h4 className="font-semibold text-[var(--text-main)]">{meeting.title}</h4>
                    <span className="text-xs font-semibold text-[var(--color-primary-light)] bg-[var(--bg-card)] border border-[var(--border-color)] px-2 py-0.5 mt-1 inline-block rounded">
                      {meeting.id}
                    </span>
                    <div className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{meeting.venue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarView;

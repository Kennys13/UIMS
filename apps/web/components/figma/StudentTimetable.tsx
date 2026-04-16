import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { mockTimetable } from '../../lib/mockData';
import { Clock, MapPin, User } from 'lucide-react';

export function StudentTimetable() {
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Class Timetable</h2>
        <p className="text-gray-600">Your weekly schedule - Class 10-A</p>
      </div>

      {/* Today's Schedule Highlight */}
      <Card className="border-blue-500 bg-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-blue-900">Today's Schedule</CardTitle>
              <CardDescription className="text-blue-700">{currentDay}</CardDescription>
            </div>
            <Badge className="bg-blue-600">Current Day</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {mockTimetable
              .find(t => t.day === currentDay)
              ?.periods.map((period, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg ${period.subject === 'Break' ? 'bg-gray-100' : 'bg-white border-l-4 border-blue-500'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-semibold text-gray-700 min-w-[100px]">
                        {period.time}
                      </div>
                      <div>
                        <p className="font-semibold">{period.subject}</p>
                        {period.subject !== 'Break' && (
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {period.teacher}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {period.room}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Timetable */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Timetable</CardTitle>
          <CardDescription>Complete schedule for all weekdays</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockTimetable.map((daySchedule) => (
              <div key={daySchedule.day}>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-lg font-semibold">{daySchedule.day}</h3>
                  {daySchedule.day === currentDay && (
                    <Badge variant="secondary">Today</Badge>
                  )}
                </div>
                <div className="grid gap-2">
                  {daySchedule.periods.map((period, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border ${
                        period.subject === 'Break' 
                          ? 'bg-gray-50 border-gray-200' 
                          : 'bg-white hover:shadow-md transition-shadow'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 min-w-[110px]">
                            <Clock className="w-4 h-4" />
                            {period.time}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{period.subject}</p>
                            {period.subject !== 'Break' && (
                              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {period.teacher}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  Room {period.room}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        {period.subject !== 'Break' && (
                          <Badge variant="outline" className="self-start md:self-center">
                            {period.subject}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Class Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Class Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Class</span>
                <span className="font-semibold">10-A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Periods</span>
                <span className="font-semibold">7 per day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class Teacher</span>
                <span className="font-semibold">Dr. Priya Mehta</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Timing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">School Start</span>
                <span className="font-semibold">8:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">School End</span>
                <span className="font-semibold">12:45 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Break Time</span>
                <span className="font-semibold">10:15 - 10:30 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Period Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Regular Period</span>
                <span className="font-semibold">45 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Break</span>
                <span className="font-semibold">15 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Working Days</span>
                <span className="font-semibold">Mon - Fri</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

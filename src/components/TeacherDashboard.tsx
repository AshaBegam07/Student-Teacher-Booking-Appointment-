
import { useState } from "react";
import { ArrowLeft, Calendar, Users, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentCard from "./AppointmentCard";
import { Appointment } from "@/types";

interface TeacherDashboardProps {
  onBack: () => void;
}

const TeacherDashboard = ({ onBack }: TeacherDashboardProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      studentId: 'student1',
      teacherId: 'teacher1',
      studentName: 'John Doe',
      teacherName: 'Dr. Sarah Johnson',
      date: '2024-06-15',
      time: '10:00 AM',
      message: 'Need help with binary tree implementation',
      status: 'pending',
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      studentId: 'student2',
      teacherId: 'teacher1',
      studentName: 'Jane Smith',
      teacherName: 'Dr. Sarah Johnson',
      date: '2024-06-16',
      time: '2:00 PM',
      message: 'Questions about algorithm complexity',
      status: 'pending',
      createdAt: '4 hours ago'
    },
    {
      id: '3',
      studentId: 'student3',
      teacherId: 'teacher1',
      studentName: 'Mike Johnson',
      teacherName: 'Dr. Sarah Johnson',
      date: '2024-06-12',
      time: '1:00 PM',
      message: 'Discussion about final project requirements',
      status: 'approved',
      createdAt: '2 days ago'
    },
    {
      id: '4',
      studentId: 'student4',
      teacherId: 'teacher1',
      studentName: 'Lisa Brown',
      teacherName: 'Dr. Sarah Johnson',
      date: '2024-06-10',
      time: '11:00 AM',
      message: 'Review for upcoming exam',
      status: 'completed',
      createdAt: '4 days ago'
    }
  ]);

  const handleStatusChange = (appointmentId: string, status: 'approved' | 'rejected') => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status }
          : appointment
      )
    );
  };

  const getFilteredAppointments = (status?: string) => {
    if (!status) return appointments;
    return appointments.filter(appointment => appointment.status === status);
  };

  const stats = {
    pending: getFilteredAppointments('pending').length,
    approved: getFilteredAppointments('approved').length,
    completed: getFilteredAppointments('completed').length,
    total: appointments.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-gray-600">
                <ArrowLeft size={20} className="mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
                <p className="text-gray-600">Welcome back, Dr. Sarah Johnson</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Users size={16} className="mr-1" />
                Teacher
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <XCircle className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                  <p className="text-sm text-gray-600">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                  <p className="text-sm text-gray-600">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Management */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar size={20} className="mr-2" />
              Appointment Management
            </CardTitle>
            <CardDescription>
              Review and manage student appointment requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {appointments.map(appointment => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    userRole="teacher"
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4 mt-6">
                {getFilteredAppointments('pending').map(appointment => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    userRole="teacher"
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </TabsContent>

              <TabsContent value="approved" className="space-y-4 mt-6">
                {getFilteredAppointments('approved').map(appointment => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    userRole="teacher"
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                {getFilteredAppointments('completed').map(appointment => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    userRole="teacher"
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;

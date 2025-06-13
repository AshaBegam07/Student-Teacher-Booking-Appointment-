
import { useState } from "react";
import { Search, Filter, ArrowLeft, Calendar, User, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TeacherCard from "./TeacherCard";
import AppointmentCard from "./AppointmentCard";
import { Teacher, Appointment } from "@/types";

interface StudentDashboardProps {
  onBack: () => void;
}

const StudentDashboard = ({ onBack }: StudentDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [activeTab, setActiveTab] = useState<'browse' | 'appointments' | 'book'>('browse');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [appointmentForm, setAppointmentForm] = useState({
    date: '',
    time: '',
    message: ''
  });

  // Mock data
  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      subject: 'Data Structures & Algorithms',
      email: 'sarah.johnson@edu.edu',
      availability: ['Mon 9-11 AM', 'Wed 2-4 PM', 'Fri 10-12 PM'],
      isOnline: true
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      department: 'Mathematics',
      subject: 'Calculus & Linear Algebra',
      email: 'michael.chen@edu.edu',
      availability: ['Tue 1-3 PM', 'Thu 9-11 AM'],
      isOnline: false
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      department: 'Physics',
      subject: 'Quantum Physics & Mechanics',
      email: 'emily.rodriguez@edu.edu',
      availability: ['Mon 2-4 PM', 'Wed 10-12 PM', 'Fri 1-3 PM'],
      isOnline: true
    }
  ];

  const appointments: Appointment[] = [
    {
      id: '1',
      studentId: 'student1',
      teacherId: '1',
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
      studentId: 'student1',
      teacherId: '2',
      studentName: 'John Doe',
      teacherName: 'Prof. Michael Chen',
      date: '2024-06-12',
      time: '2:00 PM',
      message: 'Questions about matrix operations',
      status: 'approved',
      createdAt: '1 day ago'
    }
  ];

  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleBookAppointment = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setActiveTab('book');
  };

  const handleSubmitAppointment = () => {
    console.log('Booking appointment:', { teacher: selectedTeacher, ...appointmentForm });
    // Here you would typically send the data to your backend
    setActiveTab('appointments');
    setSelectedTeacher(null);
    setAppointmentForm({ date: '', time: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-600">Welcome back, John Doe</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <User size={16} className="mr-1" />
                Student
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-2 mb-6">
          <Button 
            variant={activeTab === 'browse' ? 'default' : 'outline'}
            onClick={() => setActiveTab('browse')}
            className="px-6"
          >
            Browse Teachers
          </Button>
          <Button 
            variant={activeTab === 'appointments' ? 'default' : 'outline'}
            onClick={() => setActiveTab('appointments')}
            className="px-6"
          >
            My Appointments
          </Button>
        </div>

        {/* Browse Teachers Tab */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search size={20} className="mr-2" />
                  Find Teachers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Search by teacher name or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white"
                  />
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Teachers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map(teacher => (
                <TeacherCard 
                  key={teacher.id} 
                  teacher={teacher} 
                  onBookAppointment={handleBookAppointment}
                />
              ))}
            </div>
          </div>
        )}

        {/* Book Appointment Tab */}
        {activeTab === 'book' && selectedTeacher && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar size={20} className="mr-2" />
                  Book Appointment with {selectedTeacher.name}
                </CardTitle>
                <CardDescription>{selectedTeacher.subject} - {selectedTeacher.department}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <Input
                      type="date"
                      value={appointmentForm.date}
                      onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <Select value={appointmentForm.time} onValueChange={(value) => setAppointmentForm({...appointmentForm, time: value})}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedTeacher.availability.map(slot => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Reason for appointment)
                  </label>
                  <Textarea
                    placeholder="Please describe what you'd like to discuss..."
                    value={appointmentForm.message}
                    onChange={(e) => setAppointmentForm({...appointmentForm, message: e.target.value})}
                    className="bg-white min-h-[100px]"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button 
                    onClick={handleSubmitAppointment}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={!appointmentForm.date || !appointmentForm.time || !appointmentForm.message}
                  >
                    Book Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('browse')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* My Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare size={20} className="mr-2" />
                  My Appointments
                </CardTitle>
                <CardDescription>Track your appointment requests and their status</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-4">
              {appointments.map(appointment => (
                <AppointmentCard 
                  key={appointment.id} 
                  appointment={appointment} 
                  userRole="student"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;


import { Clock, User, MessageSquare, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "@/types";

interface AppointmentCardProps {
  appointment: Appointment;
  userRole: 'student' | 'teacher';
  onStatusChange?: (appointmentId: string, status: 'approved' | 'rejected') => void;
}

const AppointmentCard = ({ appointment, userRole, onStatusChange }: AppointmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-yellow-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-gray-900">
              {userRole === 'student' ? appointment.teacherName : appointment.studentName}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {appointment.date} at {appointment.time}
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor(appointment.status)} text-white`}>
            <span className="flex items-center space-x-1">
              {getStatusIcon(appointment.status)}
              <span className="capitalize">{appointment.status}</span>
            </span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-2 text-gray-600 text-sm">
          <MessageSquare size={16} className="mt-0.5 shrink-0" />
          <p className="flex-1">{appointment.message}</p>
        </div>
        
        <div className="flex items-center text-gray-500 text-xs">
          <Clock size={14} className="mr-1" />
          <span>Created {appointment.createdAt}</span>
        </div>
        
        {userRole === 'teacher' && appointment.status === 'pending' && onStatusChange && (
          <div className="flex space-x-2 pt-2">
            <Button 
              onClick={() => onStatusChange(appointment.id, 'approved')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              Approve
            </Button>
            <Button 
              onClick={() => onStatusChange(appointment.id, 'rejected')}
              variant="destructive"
              className="flex-1"
              size="sm"
            >
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;

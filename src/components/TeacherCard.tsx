
import { Clock, MapPin, MessageSquare, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Teacher } from "@/types";

interface TeacherCardProps {
  teacher: Teacher;
  onBookAppointment: (teacher: Teacher) => void;
}

const TeacherCard = ({ teacher, onBookAppointment }: TeacherCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {teacher.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900">{teacher.name}</CardTitle>
              <CardDescription className="text-gray-600">{teacher.subject}</CardDescription>
            </div>
          </div>
          <Badge variant={teacher.isOnline ? "default" : "secondary"} className={teacher.isOnline ? "bg-green-500" : ""}>
            {teacher.isOnline ? "Online" : "Offline"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin size={16} className="mr-2" />
          <span>{teacher.department}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <Clock size={16} className="mr-2" />
          <span>Available: {teacher.availability.join(', ')}</span>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button 
            onClick={() => onBookAppointment(teacher)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Calendar size={16} className="mr-2" />
            Book Appointment
          </Button>
          <Button variant="outline" size="icon" className="shrink-0 border-gray-300">
            <MessageSquare size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;

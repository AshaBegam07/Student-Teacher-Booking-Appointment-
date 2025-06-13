
import { GraduationCap, UserCheck, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RoleSelectionProps {
  onRoleSelect: (role: 'student' | 'teacher' | 'admin') => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Book appointments with teachers and manage your schedule',
      icon: GraduationCap,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Manage appointment requests and student interactions',
      icon: UserCheck,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Oversee the system and manage users',
      icon: Settings,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Edu<span className="text-blue-600">Connect</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline appointment scheduling between students and teachers with our modern booking system
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full ${role.color} text-white flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110`}>
                    <IconComponent size={32} />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{role.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => onRoleSelect(role.id as 'student' | 'teacher' | 'admin')}
                    className={`w-full ${role.color} text-white border-0 py-3 text-lg font-medium transition-all duration-200`}
                  >
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            New to the platform? 
            <Button variant="link" className="text-blue-600 p-0 ml-1 text-base">
              Learn more about EduConnect
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;


import { useState } from "react";
import RoleSelection from "@/components/RoleSelection";
import StudentDashboard from "@/components/StudentDashboard";
import TeacherDashboard from "@/components/TeacherDashboard";
import { UserRole } from "@/types";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleRoleSelect = (role: 'student' | 'teacher' | 'admin') => {
    setSelectedRole(role);
    console.log(`User selected role: ${role}`);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  // Admin dashboard placeholder
  const AdminDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-xl text-gray-600 mb-8">Coming Soon...</p>
        <button 
          onClick={handleBack}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Back to Role Selection
        </button>
      </div>
    </div>
  );

  if (selectedRole === 'student') {
    return <StudentDashboard onBack={handleBack} />;
  }

  if (selectedRole === 'teacher') {
    return <TeacherDashboard onBack={handleBack} />;
  }

  if (selectedRole === 'admin') {
    return <AdminDashboard />;
  }

  return <RoleSelection onRoleSelect={handleRoleSelect} />;
};

export default Index;

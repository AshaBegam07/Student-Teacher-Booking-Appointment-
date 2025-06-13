
export interface Teacher {
  id: string;
  name: string;
  department: string;
  subject: string;
  email: string;
  availability: string[];
  isOnline: boolean;
}

export interface Appointment {
  id: string;
  studentId: string;
  teacherId: string;
  studentName: string;
  teacherName: string;
  date: string;
  time: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
}

export type UserRole = 'student' | 'teacher' | 'admin' | null;

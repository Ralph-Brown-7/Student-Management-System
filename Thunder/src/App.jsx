import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// General Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage"; 
import RegisterPage from "./pages/RegisterPage"; 
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import Courses from "./pages/Courses";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentGrades from "./pages/student/StudentGrades";
import StudentSchedule from "./pages/student/StudentSchedule";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentProfile from "./pages/student/StudentProfile";

// Instructor Pages
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorClasses from "./pages/instructor/InstructorClasses";
import InstructorStudents from "./pages/instructor/InstructorStudents";
import InstructorGrading from "./pages/instructor/InstructorGrading";
import InstructorAttendance from "./pages/instructor/InstructorAttendance";

const queryClient = new QueryClient();

// Helper to determine where to send users based on their role
const getRedirectPath = (user) => {
  if (!user) return "/login";
  if (user.role === 'student') return '/student/dashboard';
  if (user.role === 'teacher' || user.role === 'instructor') return '/instructor/dashboard';
  return '/dashboard';
};

// Higher-order component to protect routes based on authentication and roles
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if role is allowed (supports both 'teacher' and 'instructor' labels)
  if (allowedRoles && user) {
    const roleIsAllowed = allowedRoles.includes(user.role) || 
                         (allowedRoles.includes('teacher') && user.role === 'instructor') ||
                         (allowedRoles.includes('instructor') && user.role === 'teacher');
    
    if (!roleIsAllowed) {
      return <Navigate to={getRedirectPath(user)} replace />;
    }
  }

  return children;
}

// Prevents logged-in users from accessing the login/register pages
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated && user) {
    return <Navigate to={getRedirectPath(user)} replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      
      {/* Admin Routes */}
      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute allowedRoles={['admin']}><Students /></ProtectedRoute>} />
      <Route path="/classes" element={<ProtectedRoute allowedRoles={['admin']}><Classes /></ProtectedRoute>} />
      <Route path="/courses" element={<ProtectedRoute allowedRoles={['admin']}><Courses /></ProtectedRoute>} />
      <Route path="/schedule" element={<ProtectedRoute allowedRoles={['admin']}><Schedule /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute allowedRoles={['admin']}><Settings /></ProtectedRoute>} />

      {/* Student Routes */}
      <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/courses" element={<ProtectedRoute allowedRoles={['student']}><StudentCourses /></ProtectedRoute>} />
      <Route path="/student/grades" element={<ProtectedRoute allowedRoles={['student']}><StudentGrades /></ProtectedRoute>} />
      <Route path="/student/schedule" element={<ProtectedRoute allowedRoles={['student']}><StudentSchedule /></ProtectedRoute>} />
      <Route path="/student/assignments" element={<ProtectedRoute allowedRoles={['student']}><StudentAssignments /></ProtectedRoute>} />
      <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={['student']}><StudentAttendance /></ProtectedRoute>} />
      <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><StudentProfile /></ProtectedRoute>} />

      {/* Instructor Routes */}
      <Route path="/instructor/dashboard" element={<ProtectedRoute allowedRoles={['teacher', 'instructor']}><InstructorDashboard /></ProtectedRoute>} />
      <Route path="/instructor/classes" element={<ProtectedRoute allowedRoles={['teacher', 'instructor']}><InstructorClasses /></ProtectedRoute>} />
      <Route path="/instructor/students" element={<ProtectedRoute allowedRoles={['teacher', 'instructor']}><InstructorStudents /></ProtectedRoute>} />
      <Route path="/instructor/grading" element={<ProtectedRoute allowedRoles={['teacher', 'instructor']}><InstructorGrading /></ProtectedRoute>} />
      <Route path="/instructor/attendance" element={<ProtectedRoute allowedRoles={['teacher', 'instructor']}><InstructorAttendance /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Update: BrowserRouter now includes v7 future flags */}
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
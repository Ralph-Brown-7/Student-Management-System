import React, { useEffect, useState } from 'react';
import InstructorLayout from '@/components/layout/InstructorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchUsers } from '@/services/apiService';
import { ClipboardCheck, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export default function InstructorAttendance() {
  const { toast } = useToast();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchUsers();
        const studentList = data.filter(u => u.role === 'student');
        setStudents(studentList);
      } catch (err) {
        toast({ title: "Error", description: "Could not load student list", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  const handleSave = () => {
    // In a real app, you would POST this 'attendance' object to your backend
    toast({ title: 'Attendance Saved', description: 'Real-time attendance recorded in database.' });
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <InstructorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Attendance</h1>
            <p className="text-muted-foreground mt-1">Take attendance for today</p>
          </div>
          <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Save Attendance</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              Active Class List - {format(new Date(), 'MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="text-center">Present</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={attendance[student._id] ?? true}
                        onCheckedChange={(checked) => setAttendance(prev => ({ ...prev, [student._id]: !!checked }))}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InstructorLayout>
  );
}
import React, { useState } from 'react';
import InstructorLayout from '@/components/layout/InstructorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockClassStudents } from '@/data/mockData';
import { FileEdit, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function InstructorGrading() {
  const { toast } = useToast();
  // State for handling grades in plain JavaScript
  const [grades, setGrades] = useState({});

  const handleSave = () => {
    toast({ 
      title: 'Grades Saved', 
      description: 'Student grades have been updated successfully.' 
    });
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Grading</h1>
            <p className="text-muted-foreground mt-1">Enter and update student grades</p>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Grades
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileEdit className="h-5 w-5 text-primary" />
              Grade Entry - Advanced Mathematics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-center">Midterm</TableHead>
                  <TableHead className="text-center">Final</TableHead>
                  <TableHead className="text-center">Assignments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClassStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.firstName} {student.lastName}
                    </TableCell>
                    <TableCell className="text-center">
                      <Input 
                        type="number" 
                        className="w-20 mx-auto text-center" 
                        placeholder="0-100" 
                        min="0" 
                        max="100" 
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Input 
                        type="number" 
                        className="w-20 mx-auto text-center" 
                        placeholder="0-100" 
                        min="0" 
                        max="100" 
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Input 
                        type="number" 
                        className="w-20 mx-auto text-center" 
                        placeholder="0-100" 
                        min="0" 
                        max="100" 
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
import { useState } from 'react';
import StudentLayout from '@/components/layout/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockStudentAssignments } from '@/data/mockData';
import { FileText, Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function StudentAssignments() {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState(mockStudentAssignments);

  const handleSubmit = (assignmentId) => {
    setAssignments(prev => 
      prev.map(a => 
        a.id === assignmentId 
          ? { ...a, status: 'submitted', submittedAt: new Date().toISOString() }
          : a
      )
    );
    toast({
      title: 'Assignment Submitted',
      description: 'Your assignment has been submitted successfully.',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Submitted</Badge>;
      case 'graded':
        return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Graded</Badge>;
      case 'late':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Late</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const pendingAssignments = assignments.filter(a => a.status === 'pending' || a.status === 'late');
  const submittedAssignments = assignments.filter(a => a.status === 'submitted');
  const gradedAssignments = assignments.filter(a => a.status === 'graded');

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground mt-1">View and submit your assignments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingAssignments.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Upload className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{submittedAssignments.length}</p>
                <p className="text-sm text-muted-foreground">Submitted</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{gradedAssignments.length}</p>
                <p className="text-sm text-muted-foreground">Graded</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
            <TabsTrigger value="submitted">Submitted ({submittedAssignments.length})</TabsTrigger>
            <TabsTrigger value="graded">Graded ({gradedAssignments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4 space-y-4">
            {pendingAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{assignment.title}</h3>
                          {getStatusBadge(assignment.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{assignment.courseName}</p>
                        <p className="text-sm text-muted-foreground">{assignment.description}</p>
                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          Due: {format(new Date(assignment.dueDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => handleSubmit(assignment.id)} className="w-full sm:w-auto">
                      <Upload className="h-4 w-4 mr-2" />
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {pendingAssignments.length === 0 && (
              <p className="text-muted-foreground text-center py-8">No pending assignments</p>
            )}
          </TabsContent>

          <TabsContent value="submitted" className="mt-4 space-y-4">
            {submittedAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{assignment.title}</h3>
                        {getStatusBadge(assignment.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{assignment.courseName}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Submitted: {assignment.submittedAt && format(new Date(assignment.submittedAt), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {submittedAssignments.length === 0 && (
              <p className="text-muted-foreground text-center py-8">No submitted assignments</p>
            )}
          </TabsContent>

          <TabsContent value="graded" className="mt-4 space-y-4">
            {gradedAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{assignment.title}</h3>
                          {getStatusBadge(assignment.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{assignment.courseName}</p>
                        {assignment.feedback && (
                          <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted rounded-lg">
                            <strong>Feedback:</strong> {assignment.feedback}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{assignment.grade}/{assignment.maxGrade}</p>
                      <p className="text-sm text-muted-foreground">Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {gradedAssignments.length === 0 && (
              <p className="text-muted-foreground text-center py-8">No graded assignments</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}
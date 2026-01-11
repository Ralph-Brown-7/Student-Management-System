import React from 'react';
import { mockClasses } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  BookOpen,
} from 'lucide-react';

const statusStyles = {
  active: 'bg-success/10 text-success border-success/20',
  inactive: 'bg-muted text-muted-foreground border-muted',
  graduated: 'bg-primary/10 text-primary border-primary/20',
  suspended: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function StudentViewModal({ open, onClose, student }) {
  if (!student) return null;

  const studentClass = mockClasses.find(c => c.id === student.classId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Student Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
              {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">
                {student.firstName} {student.lastName}
              </h2>
              <p className="text-muted-foreground">{student.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">Grade {student.grade}</Badge>
                <Badge
                  variant="outline"
                  className={cn('capitalize', statusStyles[student.status])}
                >
                  {student.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <InfoItem icon={Phone} label="Phone" value={student.phone} />
            <InfoItem icon={Calendar} label="Date of Birth" value={student.dateOfBirth} />
            <InfoItem icon={User} label="Gender" value={student.gender} className="capitalize" />
            <InfoItem icon={GraduationCap} label="GPA" value={student.gpa?.toFixed(2) || 'N/A'} />
            <InfoItem icon={BookOpen} label="Class" value={studentClass?.name || 'N/A'} />
            <InfoItem icon={Calendar} label="Enrolled" value={student.enrollmentDate} />
          </div>

          {/* Address */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium text-foreground">{student.address}</p>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          {(student.parentName || student.parentPhone) && (
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">Parent/Guardian</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {student.parentName && (
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{student.parentName}</p>
                  </div>
                )}
                {student.parentPhone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{student.parentPhone}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Sub-component for individual info pieces
function InfoItem({ icon: Icon, label, value, className }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={cn('font-medium text-sm', className)}>{value}</p>
      </div>
    </div>
  );
}
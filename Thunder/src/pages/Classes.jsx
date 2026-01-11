import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockClasses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Plus, Search, Users, MapPin, Clock, User } from 'lucide-react';

export default function Classes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [classes] = useState(mockClasses);

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Classes</h1>
            <p className="text-muted-foreground mt-1">
              Manage class sections and assignments
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Class
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls, index) => {
            const capacityPercentage = (cls.currentStrength / cls.capacity) * 100;
            const isNearCapacity = capacityPercentage >= 90;

            return (
              <Card
                key={cls.id}
                className="group hover:shadow-lg transition-all duration-300 animate-fade-in border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {cls.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Section {cls.section}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary"
                    >
                      Grade {cls.grade}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Teacher Information */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{cls.teacherName}</p>
                      <p className="text-xs text-muted-foreground">Class Teacher</p>
                    </div>
                  </div>

                  {/* Location and Timing */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {cls.room}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      8:00-3:00
                    </div>
                  </div>

                  {/* Enrollment Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        Capacity
                      </span>
                      <span
                        className={
                          isNearCapacity ? 'text-warning font-medium' : 'text-foreground'
                        }
                      >
                        {cls.currentStrength}/{cls.capacity}
                      </span>
                    </div>
                    <Progress
                      value={capacityPercentage}
                      className="h-2"
                    />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No classes found matching your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
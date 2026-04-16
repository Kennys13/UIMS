"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { mockAnnouncements, Announcement } from '../../lib/mockData';
import { Megaphone, Plus, Edit, Trash2, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';

export function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newAnnouncement: Announcement = {
      id: `AN${String(announcements.length + 1).padStart(3, '0')}`,
      title: formData.get('title') as string,
      message: formData.get('message') as string,
      type: formData.get('type') as 'general' | 'urgent' | 'event',
      date: new Date().toISOString().split('T')[0] ?? '',
      author: 'Admin User',
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    toast.success('Announcement created successfully!');
    setIsAddDialogOpen(false);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    toast.success('Announcement deleted successfully!');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'destructive';
      case 'event':
        return 'default';
      case 'general':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Announcements</h2>
        <p className="text-gray-600">Create and manage school-wide announcements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{announcements.length}</div>
            <p className="text-xs text-gray-600 mt-1">All time</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-700">Urgent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">
              {announcements.filter(a => a.type === 'urgent').length}
            </div>
            <p className="text-xs text-red-700 mt-1">Active alerts</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700">Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">
              {announcements.filter(a => a.type === 'event').length}
            </div>
            <p className="text-xs text-blue-700 mt-1">Upcoming events</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 bg-gray-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-700">
              {announcements.filter(a => a.type === 'general').length}
            </div>
            <p className="text-xs text-gray-700 mt-1">General updates</p>
          </CardContent>
        </Card>
      </div>

      {/* Create New Announcement */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create New Announcement</CardTitle>
              <CardDescription>Post updates to students, teachers, and parents</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Announcement</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new school announcement
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" required placeholder="Enter announcement title" />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select name="type" defaultValue="general" required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      required 
                      placeholder="Enter your announcement message"
                      rows={6}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                      Post Announcement
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Announcements List */}
      <Card>
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
          <CardDescription>View and manage all posted announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div 
                key={announcement.id} 
                className={`border rounded-lg p-4 ${
                  announcement.type === 'urgent' ? 'border-red-300 bg-red-50' :
                  announcement.type === 'event' ? 'border-blue-300 bg-blue-50' :
                  'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Megaphone className={`w-5 h-5 ${
                        announcement.type === 'urgent' ? 'text-red-600' :
                        announcement.type === 'event' ? 'text-blue-600' :
                        'text-gray-600'
                      }`} />
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      <Badge variant={getTypeColor(announcement.type) as any}>
                        {announcement.type}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3">{announcement.message}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {announcement.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {announcement.author}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        ID: {announcement.id}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Templates</CardTitle>
          <CardDescription>Common announcement templates for quick posting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left">
              <Badge className="mb-2">Event</Badge>
              <h4 className="font-semibold mb-1">Event Announcement</h4>
              <p className="text-sm text-gray-600">Template for school events and activities</p>
            </button>
            <button className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left">
              <Badge variant="destructive" className="mb-2">Urgent</Badge>
              <h4 className="font-semibold mb-1">Urgent Notice</h4>
              <p className="text-sm text-gray-600">Template for urgent communications</p>
            </button>
            <button className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left">
              <Badge variant="secondary" className="mb-2">General</Badge>
              <h4 className="font-semibold mb-1">General Update</h4>
              <p className="text-sm text-gray-600">Template for routine updates</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

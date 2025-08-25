import { useState } from 'react';
import { useDemo } from '@/contexts/DemoContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Globe, 
  Clock, 
  Palette, 
  Bell, 
  Shield, 
  Settings,
  Upload,
  Calendar
} from 'lucide-react';

export default function Profile() {
  const { user, profile, subscription, updateProfile } = useDemo();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    timezone: profile?.timezone || 'UTC',
    language: profile?.language || 'en',
    theme: profile?.theme || 'light',
    ui_density: profile?.ui_density || 'normal',
    email_notifications: profile?.email_notifications ?? true,
    push_notifications: profile?.push_notifications ?? true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: profile?.username || '',
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
      timezone: profile?.timezone || 'UTC',
      language: profile?.language || 'en',
      theme: profile?.theme || 'light',
      ui_density: profile?.ui_density || 'normal',
      email_notifications: profile?.email_notifications ?? true,
      push_notifications: profile?.push_notifications ?? true,
    });
    setIsEditing(false);
  };

  const timezones = [
    'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 
    'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney'
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
    { value: 'zh', label: '中文' },
    { value: 'ja', label: '日本語' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={subscription?.plan_tier === 'free' ? 'secondary' : 'default'}>
            {subscription?.plan_tier?.toUpperCase() || 'FREE'} Plan
          </Badge>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Overview */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                <AvatarFallback className="text-lg">
                  {profile?.full_name?.split(' ').map(n => n[0]).join('') || 
                   user?.email?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              )}
            </div>

            {/* Basic Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{profile?.full_name || 'No name set'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(profile?.created_at || '').toLocaleDateString()}</span>
              </div>
            </div>

            <Separator />

            {/* Quick Stats */}
            <div className="space-y-2">
              <h4 className="font-medium">Account Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Plan</span>
                  <Badge variant="outline">
                    {subscription?.plan_tier?.toUpperCase() || 'FREE'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <Badge variant={subscription?.status === 'active' ? 'default' : 'secondary'}>
                    {subscription?.status?.toUpperCase() || 'ACTIVE'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Preferences
              </CardTitle>
              <CardDescription>
                Customize your DevTools experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={formData.timezone}
                    onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={formData.theme}
                    onValueChange={(value) => setFormData({ ...formData, theme: value as any })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ui_density">UI Density</Label>
                  <Select
                    value={formData.ui_density}
                    onValueChange={(value) => setFormData({ ...formData, ui_density: value as any })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select UI density" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email_notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your account and projects
                  </p>
                </div>
                <Switch
                  id="email_notifications"
                  checked={formData.email_notifications}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, email_notifications: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="push_notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about important events in real-time
                  </p>
                </div>
                <Switch
                  id="push_notifications"
                  checked={formData.push_notifications}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, push_notifications: checked })
                  }
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
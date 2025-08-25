import { useState } from 'react';
import { useDemo } from '@/contexts/DemoContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Palette, 
  Users, 
  Download, 
  Upload,
  Trash2,
  Key,
  Smartphone,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function Settings() {
  const { user, profile, updateProfile } = useDemo();
  const [isLoading, setIsLoading] = useState(false);

  // Security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(profile?.email_notifications ?? true);
  const [pushNotifications, setPushNotifications] = useState(profile?.push_notifications ?? true);

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    await updateProfile({
      email_notifications: emailNotifications,
      push_notifications: pushNotifications,
    });
    setIsLoading(false);
  };

  const handleExportData = () => {
    // TODO: Implement data export
    console.log('Exporting user data...');
  };

  const handleImportData = () => {
    // TODO: Implement data import
    console.log('Importing user data...');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how DevTools looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Current: {profile?.theme?.charAt(0).toUpperCase() + profile?.theme?.slice(1) || 'Light'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Light</Button>
                    <Button variant="outline" size="sm">Dark</Button>
                    <Button variant="outline" size="sm">Developer</Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>UI Density</Label>
                    <p className="text-sm text-muted-foreground">
                      Current: {profile?.ui_density?.charAt(0).toUpperCase() + profile?.ui_density?.slice(1) || 'Normal'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Compact</Button>
                    <Button variant="outline" size="sm">Normal</Button>
                    <Button variant="outline" size="sm">Comfortable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keyboard Shortcuts</CardTitle>
                <CardDescription>
                  Customize keyboard shortcuts for faster workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Open Command Palette</span>
                    <Badge variant="outline">Cmd+K</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Toggle Sidebar</span>
                    <Badge variant="outline">Cmd+B</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>New Prompt</span>
                    <Badge variant="outline">Cmd+N</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Search</span>
                    <Badge variant="outline">Cmd+F</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Authentication
                </CardTitle>
                <CardDescription>
                  Manage your login and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                    <Badge variant={twoFactorEnabled ? 'default' : 'secondary'}>
                      {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Connected Devices</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Current Device</p>
                          <p className="text-sm text-muted-foreground">Last active: Now</p>
                        </div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full">
                    Revoke All Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Account Security Status</AlertTitle>
              <AlertDescription>
                Your account is secure. Consider enabling two-factor authentication for additional security.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Choose what email notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Account Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Security alerts, billing updates, and account changes
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Product Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      New features, tips, and DevTools updates
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Summary of your activity and productivity stats
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <Button onClick={handleSaveNotifications} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Notification Preferences'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>
                  Manage browser and desktop notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Desktop Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about important events
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Pomodoro Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when work sessions end
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  OAuth Connections
                </CardTitle>
                <CardDescription>
                  Manage your connected accounts and integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-black rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">GH</span>
                      </div>
                      <div>
                        <p className="font-medium">GitHub</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">G</span>
                      </div>
                      <div>
                        <p className="font-medium">Google</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-indigo-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">D</span>
                      </div>
                      <div>
                        <p className="font-medium">Discord</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Manage API keys and external integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Personal Access Token</Label>
                      <p className="text-sm text-muted-foreground">
                        Use this token to access the DevTools API
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Generate Token
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Data Export & Import
                </CardTitle>
                <CardDescription>
                  Backup and restore your DevTools data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button onClick={handleExportData} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button onClick={handleImportData} variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Export Options</Label>
                  <div className="space-y-2 text-sm">
                    <p>• Prompts and templates</p>
                    <p>• Bookmarked resources</p>
                    <p>• Todo lists and projects</p>
                    <p>• Pomodoro session history</p>
                    <p>• Account preferences</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions that will permanently affect your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Delete All Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete all your prompts, todos, and preferences
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Data
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Delete Account</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
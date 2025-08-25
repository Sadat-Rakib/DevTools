import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, CheckCircle, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useDemo } from '@/contexts/DemoContext';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface PomodoroSession {
  id: string;
  type: 'work' | 'short_break' | 'long_break';
  duration_minutes: number;
  completed: boolean;
  task_description?: string;
  started_at: string;
  ended_at?: string;
  created_at: string;
}

interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEnabled: boolean;
}

const defaultSettings: PomodoroSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true,
};

type TimerType = 'work' | 'short_break' | 'long_break';

export function PomodoroTimer() {
  const { user } = useDemo();
  const [settings, setSettings] = useState<PomodoroSettings>(defaultSettings);
  const [timerType, setTimerType] = useState<TimerType>('work');
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [currentTask, setCurrentTask] = useState('');
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      setTimeLeft(parsed.workDuration * 60);
    }

    if (user) {
      loadTodaySessions();
    }
  }, [user]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const loadTodaySessions = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from('pomodoro_sessions')
        .select('*')
        .gte('created_at', today.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setSessions((data || []) as PomodoroSession[]);
      setCompletedPomodoros(data?.filter(s => s.type === 'work' && s.completed).length || 0);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const saveSession = async (type: TimerType, completed: boolean, taskDescription?: string) => {
    if (!user) return;

    try {
      const session = {
        type,
        duration_minutes: getDurationForType(type),
        completed,
        task_description: taskDescription || null,
        user_id: user.id,
        started_at: new Date().toISOString(),
        ended_at: completed ? new Date().toISOString() : null,
      };

      const { data, error } = await supabase
        .from('pomodoro_sessions')
        .insert(session)
        .select()
        .single();

      if (error) throw error;

      setSessions(prev => [data as PomodoroSession, ...prev]);
      
      if (type === 'work' && completed) {
        setCompletedPomodoros(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error saving session:', error);
      toast.error('Failed to save session');
    }
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (settings.soundEnabled) {
      playNotificationSound();
    }

    // Save completed session
    saveSession(timerType, true, timerType === 'work' ? currentTask : undefined);

    if (timerType === 'work') {
      toast.success('Pomodoro completed! Time for a break.');
      
      // Determine next break type
      const nextBreakType = (completedPomodoros + 1) % settings.longBreakInterval === 0 
        ? 'long_break' 
        : 'short_break';
      
      setTimerType(nextBreakType);
      setTimeLeft(getDurationForType(nextBreakType) * 60);
      
      if (settings.autoStartBreaks) {
        setIsRunning(true);
      }
    } else {
      toast.success('Break completed! Ready for another pomodoro?');
      setTimerType('work');
      setTimeLeft(settings.workDuration * 60);
      setCurrentTask('');
      
      if (settings.autoStartPomodoros) {
        setIsRunning(true);
      }
    }

    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: timerType === 'work' ? 'Work session completed!' : 'Break completed!',
        icon: '/favicon.ico'
      });
    }
  };

  const getDurationForType = (type: TimerType): number => {
    switch (type) {
      case 'work': return settings.workDuration;
      case 'short_break': return settings.shortBreakDuration;
      case 'long_break': return settings.longBreakDuration;
    }
  };

  const playNotificationSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleTimer = () => {
    if (isRunning) {
      // Save incomplete session when pausing
      saveSession(timerType, false, timerType === 'work' ? currentTask : undefined);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getDurationForType(timerType) * 60);
  };

  const switchTimerType = (type: TimerType) => {
    setIsRunning(false);
    setTimerType(type);
    setTimeLeft(getDurationForType(type) * 60);
  };

  const saveSettings = (newSettings: PomodoroSettings) => {
    setSettings(newSettings);
    localStorage.setItem('pomodoroSettings', JSON.stringify(newSettings));
    
    // Update timer if not running
    if (!isRunning) {
      setTimeLeft(getDurationForType(timerType) * 60);
    }
    
    setIsSettingsOpen(false);
    toast.success('Settings saved!');
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    const totalDuration = getDurationForType(timerType) * 60;
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  const timerTypeLabels = {
    work: 'Focus Time',
    short_break: 'Short Break',
    long_break: 'Long Break'
  };

  const timerTypeIcons = {
    work: CheckCircle,
    short_break: Coffee,
    long_break: Coffee
  };

  const TimerIcon = timerTypeIcons[timerType];

  if (!user) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">Please sign in to use the Pomodoro Timer.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Timer Card */}
      <Card className="text-center">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TimerIcon className="h-6 w-6" />
              {timerTypeLabels[timerType]}
            </CardTitle>
            
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Pomodoro Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="work-duration">Work Duration (minutes)</Label>
                      <Input
                        id="work-duration"
                        type="number"
                        min="1"
                        max="60"
                        value={settings.workDuration}
                        onChange={(e) => setSettings({ ...settings, workDuration: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="short-break">Short Break (minutes)</Label>
                      <Input
                        id="short-break"
                        type="number"
                        min="1"
                        max="30"
                        value={settings.shortBreakDuration}
                        onChange={(e) => setSettings({ ...settings, shortBreakDuration: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="long-break">Long Break (minutes)</Label>
                      <Input
                        id="long-break"
                        type="number"
                        min="5"
                        max="60"
                        value={settings.longBreakDuration}
                        onChange={(e) => setSettings({ ...settings, longBreakDuration: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="long-break-interval">Long Break Interval</Label>
                      <Input
                        id="long-break-interval"
                        type="number"
                        min="2"
                        max="10"
                        value={settings.longBreakInterval}
                        onChange={(e) => setSettings({ ...settings, longBreakInterval: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-start-breaks">Auto-start breaks</Label>
                      <Switch
                        id="auto-start-breaks"
                        checked={settings.autoStartBreaks}
                        onCheckedChange={(checked) => setSettings({ ...settings, autoStartBreaks: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-start-pomodoros">Auto-start work sessions</Label>
                      <Switch
                        id="auto-start-pomodoros"
                        checked={settings.autoStartPomodoros}
                        onCheckedChange={(checked) => setSettings({ ...settings, autoStartPomodoros: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sound-enabled">Sound notifications</Label>
                      <Switch
                        id="sound-enabled"
                        checked={settings.soundEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
                      />
                    </div>
                  </div>

                  <div>
                    <Button onClick={requestNotificationPermission} variant="outline" className="w-full">
                      Enable Browser Notifications
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => saveSettings(settings)}>
                    Save Settings
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="space-y-4">
            <div className="text-6xl font-mono font-bold">
              {formatTime(timeLeft)}
            </div>
            
            <Progress value={getProgressPercentage()} className="h-2" />
            
            <div className="flex justify-center gap-2">
              <Badge variant={timerType === 'work' ? 'default' : 'outline'}>
                Work
              </Badge>
              <Badge variant={timerType === 'short_break' ? 'default' : 'outline'}>
                Short Break
              </Badge>
              <Badge variant={timerType === 'long_break' ? 'default' : 'outline'}>
                Long Break
              </Badge>
            </div>
          </div>

          {/* Task Input for Work Sessions */}
          {timerType === 'work' && (
            <div>
              <Input
                placeholder="What are you working on? (optional)"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                className="text-center"
              />
            </div>
          )}

          {/* Timer Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleTimer}
              size="lg"
              className="px-8"
            >
              {isRunning ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <Button
              onClick={resetTimer}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Timer Type Selector */}
          <div className="flex justify-center gap-2">
            <Button
              variant={timerType === 'work' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchTimerType('work')}
              disabled={isRunning}
            >
              Work
            </Button>
            <Button
              variant={timerType === 'short_break' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchTimerType('short_break')}
              disabled={isRunning}
            >
              Short Break
            </Button>
            <Button
              variant={timerType === 'long_break' ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchTimerType('long_break')}
              disabled={isRunning}
            >
              Long Break
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats and History */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{completedPomodoros}</div>
                <div className="text-sm text-muted-foreground">Completed Pomodoros</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">
                    {sessions.filter(s => s.type === 'work').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Work Sessions</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">
                    {sessions.filter(s => s.type === 'short_break').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Short Breaks</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">
                    {sessions.filter(s => s.type === 'long_break').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Long Breaks</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {sessions.slice(0, 10).map((session) => {
                const SessionIcon = timerTypeIcons[session.type];
                return (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center gap-2">
                      <SessionIcon className="h-4 w-4" />
                      <div>
                        <div className="text-sm font-medium">
                          {timerTypeLabels[session.type]}
                        </div>
                        {session.task_description && (
                          <div className="text-xs text-muted-foreground">
                            {session.task_description}
                          </div>
                        )}
                      </div>
                     </div>
                     
                     <div className="text-right">
                       <div className="text-xs text-muted-foreground">
                         {format(new Date(session.started_at), 'HH:mm')}
                       </div>
                       <div className="flex items-center gap-1">
                         <Badge
                           variant={session.completed ? 'default' : 'secondary'}
                           className="text-xs"
                         >
                           {session.completed ? 'Completed' : 'Paused'}
                         </Badge>
                       </div>
                     </div>
                   </div>
                 );
               })}
              
              {sessions.length === 0 && (
                <div className="text-center text-muted-foreground py-4">
                  No sessions today yet. Start your first Pomodoro!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // Replace useDemo with useAuth
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Code2,
  Hash,
  FileText,
  Clock,
  BookOpen,
  CheckSquare,
  Timer,
  Quote,
  TrendingUp,
  Users,
  Zap,
  Activity,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase'; // Add supabase import

interface QuickStats {
  totalPrompts: number;
  totalTodos: number;
  completedTodos: number;
  pomodoroSessions: number;
}

export default function Dashboard() {
  const { session } = useAuth(); // Replace user with session
  const [stats, setStats] = useState<QuickStats>({
    totalPrompts: 0,
    totalTodos: 0,
    completedTodos: 0,
    pomodoroSessions: 0,
  });
  const [dailyQuote, setDailyQuote] = useState<{ text: string; author: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [session]);

  const fetchDashboardData = async () => {
    if (!session?.user) return;

    try {
      // Fetch user statistics
      const [promptsResult, todosResult, pomodoroResult, quoteResult] = await Promise.all([
        supabase.from('prompts').select('id').eq('user_id', session.user.id),
        supabase.from('todos').select('id, status').eq('user_id', session.user.id),
        supabase.from('pomodoro_sessions').select('id').eq('user_id', session.user.id).eq('completed', true),
        supabase.from('quotes').select('text, author').limit(1).order('created_at', { ascending: false }),
      ]);

      const totalPrompts = promptsResult.data?.length || 0;
      const todos = todosResult.data || [];
      const totalTodos = todos.length;
      const completedTodos = todos.filter(t => t.status === 'done').length;
      const pomodoroSessions = pomodoroResult.data?.length || 0;

      setStats({
        totalPrompts,
        totalTodos,
        completedTodos,
        pomodoroSessions,
      });

      // Set daily quote
      if (quoteResult.data && quoteResult.data.length > 0) {
        setDailyQuote(quoteResult.data[0]);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickStartTools = [
    {
      title: 'JSON Viewer',
      description: 'Format and validate JSON',
      icon: Code2,
      href: '/tools/json-viewer',
      color: 'text-blue-600',
    },
    {
      title: 'Hash Generator',
      description: 'Generate MD5, SHA hashes',
      icon: Hash,
      href: '/tools/hash',
      color: 'text-green-600',
    },
    {
      title: 'Base64 Converter',
      description: 'Encode/decode Base64',
      icon: FileText,
      href: '/tools/base64',
      color: 'text-purple-600',
    },
    {
      title: 'UUID Generator',
      description: 'Generate unique identifiers',
      icon: Clock,
      href: '/tools/uuid',
      color: 'text-orange-600',
    },
  ];

  const productivityTools = [
    {
      title: 'To-Do System',
      description: 'Manage tasks and projects',
      icon: CheckSquare,
      href: '/tools/todo',
      color: 'text-indigo-600',
      count: stats.totalTodos,
    },
    {
      title: 'Pomodoro Timer',
      description: 'Focus with time blocks',
      icon: Timer,
      href: '/tools/pomodoro',
      color: 'text-red-600',
      count: stats.pomodoroSessions,
    },
    {
      title: 'Prompt Vault',
      description: 'Save AI prompts',
      icon: BookOpen,
      href: '/prompts',
      color: 'text-teal-600',
      count: stats.totalPrompts,
    },
  ];

  const completionPercentage = stats.totalTodos > 0 ? (stats.completedTodos / stats.totalTodos) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {session?.user.user_metadata?.name || session?.user.email?.split('@')[0] || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your development toolkit today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {session?.user.user_metadata?.plan || 'FREE'} Plan
          </Badge>
        </div>
      </div>

      {/* Daily Quote */}
      {dailyQuote && (
        <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Quote className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <blockquote className="text-lg italic font-medium">
                  "{dailyQuote.text}"
                </blockquote>
                <cite className="text-sm text-muted-foreground mt-2 block">
                  — {dailyQuote.author}
                </cite>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTodos}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedTodos} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionPercentage.toFixed(0)}%</div>
            <Progress value={completionPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Prompts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPrompts}</div>
            <p className="text-xs text-muted-foreground">
              In your vault
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Focus Sessions</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pomodoroSessions}</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Tools */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Start Tools
            </CardTitle>
            <CardDescription>
              Jump right into your most-used development tools
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickStartTools.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <tool.icon className={`h-5 w-5 ${tool.color}`} />
                <div className="flex-1">
                  <h3 className="font-medium">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Productivity Hub
            </CardTitle>
            <CardDescription>
              Manage your workflow and stay organized
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {productivityTools.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <tool.icon className={`h-5 w-5 ${tool.color}`} />
                <div className="flex-1">
                  <h3 className="font-medium">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
                {tool.count !== undefined && (
                  <Badge variant="secondary">{tool.count}</Badge>
                )}
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            What's New
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">New AI Assistant Integration</p>
                <p className="text-sm text-muted-foreground">
                  Get help with code explanations and workflow guidance
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Enhanced Resources Hub</p>
                <p className="text-sm text-muted-foreground">
                  Bookmark and organize your favorite development resources
                </p>
                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Pomodoro Timer Added</p>
                <p className="text-sm text-muted-foreground">
                  Stay focused with customizable work sessions
                </p>
                <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
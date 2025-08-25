import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import {
  FileText,
  Hash,
  Key,
  Clock,
  CheckSquare,
  Timer,
  Bot,
  Database,
  Zap,
  Star,
  ArrowRight,
  User,
} from "lucide-react";

const demoTools = [
  {
    title: "JSON Viewer",
    description: "Format and validate JSON with syntax highlighting",
    href: "/tools/json-viewer",
    icon: FileText,
    category: "Text & Data",
  },
  {
    title: "SQL Formatter",
    description: "Format and beautify your SQL queries",
    href: "/tools/sql-formatter",
    icon: Database,
    category: "Text & Data",
  },
  {
    title: "Base64 Converter",
    description: "Encode and decode Base64 strings effortlessly",
    href: "/tools/base64",
    icon: Key,
    category: "Text & Data",
  },
  {
    title: "Hash Generator",
    description: "Generate secure hashes with multiple algorithms",
    href: "/tools/hash",
    icon: Hash,
    category: "Security",
  },
  {
    title: "UUID Generator",
    description: "Create unique identifiers for your applications",
    href: "/tools/uuid",
    icon: Key,
    category: "Utilities",
  },
  {
    title: "Timestamp Converter",
    description: "Convert between different timestamp formats",
    href: "/tools/timestamp",
    icon: Clock,
    category: "Utilities",
  },
];

const productivityTools = [
  {
    title: "Todo Manager",
    description: "Organize your tasks and stay productive",
    href: "/tools/todo",
    icon: CheckSquare,
    category: "Productivity",
  },
  {
    title: "Pomodoro Timer",
    description: "Focus sessions with the Pomodoro Technique",
    href: "/tools/pomodoro",
    icon: Timer,
    category: "Productivity",
  },
  {
    title: "AI Assistant",
    description: "Get help with coding and development tasks",
    href: "/ai-assistant",
    icon: Bot,
    category: "AI Tools",
  },
];

export default function DemoDashboard() {
  const { user } = useDemo();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-muted/30 text-sm">
          <Star className="h-4 w-4 text-primary" />
          Demo Mode Active
        </div>

        <h1 className="text-4xl font-bold">
          Welcome, {user?.name || "Demo User"}! 🎉
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore all the developer tools and productivity features. Everything
          you try here is just for demonstration.
        </p>
      </div>

      {/* Demo Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tools Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15+</div>
            <p className="text-xs text-muted-foreground">Developer utilities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Demo Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Active</div>
            <p className="text-xs text-muted-foreground">Full access</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              User Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Demo</div>
            <p className="text-xs text-muted-foreground">Test account</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Live</div>
            <p className="text-xs text-muted-foreground">Active session</p>
          </CardContent>
        </Card>
      </div>

      {/* Developer Tools */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Developer Tools</h2>
            <p className="text-muted-foreground">
              Essential utilities for coding and development
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <NavLink key={tool.href} to={tool.href} className="group">
                <Card className="tool-card cursor-pointer h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              </NavLink>
            );
          })}
        </div>
      </section>

      {/* Productivity Hub */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Productivity Hub</h2>
            <p className="text-muted-foreground">
              Stay organized and boost your productivity
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productivityTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <NavLink key={tool.href} to={tool.href} className="group">
                <Card className="tool-card cursor-pointer h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              </NavLink>
            );
          })}
        </div>
      </section>

      {/* Demo Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold">Demo Mode Information</h3>
              <p className="text-sm text-muted-foreground">
                You're currently using DevTools in demo mode. All features are
                available for testing, but data won't be permanently saved.
                Ready to get the full experience?
              </p>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" asChild>
                  <NavLink to="/pricing">
                    View Plans <ArrowRight className="ml-2 h-4 w-4" />
                  </NavLink>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

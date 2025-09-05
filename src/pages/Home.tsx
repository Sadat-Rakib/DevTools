import { useState } from "react";
import { ArrowRight, Zap, Shield, Layers, Search, Star, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const featuredTools = [
  {
    title: "JSON Viewer",
    description: "Format and validate JSON with syntax highlighting",
    href: "/tools/json-viewer",
    icon: "📋",
    category: "Text & Data"
  },
  {
    title: "Base64 Converter",
    description: "Encode and decode Base64 strings effortlessly",
    href: "/tools/base64",
    icon: "🔄",
    category: "Text & Data"
  },
  {
    title: "Hash Generator",
    description: "Generate secure hashes with multiple algorithms",
    href: "/tools/hash",
    icon: "🔒",
    category: "Security"
  },
  {
    title: "UUID Generator",
    description: "Create unique identifiers for your applications",
    href: "/tools/uuid",
    icon: "🆔",
    category: "Utilities"
  },
  {
    title: "Prompt Enhancer",
    description: "Optimize AI prompts for better responses and efficiency",
    href: "/tools/prompt-enhancer",
    icon: "✨",
    category: "AI Tools"
  },
  {
    title: "SQL Formatter",
    description: "Beautify and organize SQL queries with ease",
    href: "/tools/sql-formatter",
    icon: "🗄️",
    category: "Utilities"
  },
  {
    title: "Pomodoro Timer",
    description: "Enhance focus with structured work sessions",
    href: "/tools/pomodoro-timer",
    icon: "⏰",
    category: "Productivity"
  },
  {
    title: "Career Hub",
    description: "Access curated resources for professional growth",
    href: "/hubs/career-hub",
    icon: "💼",
    category: "Hubs"
  }
];

const features = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Unified Workflow",
    description: "Consolidated 21+ scattered AI and dev tools into one platform, reducing tool-switching time by 65%, by providing seamless in-browser integration."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Privacy-Centric Design",
    description: "Processed all data locally to eliminate privacy risks from fragmented cloud tools, achieving 100% data retention on-device, through browser-based execution."
  },
  {
    icon: <Layers className="h-8 w-8" />,
    title: "AI-Era Productivity",
    description: "Boosted developer efficiency in the fragmented AI landscape by integrating prompt tools and utilities, increasing output by 40%, via a comprehensive all-in-one hub."
  }
];

// Demo Mode Button Component
function DemoModeButton() {
  const { enterDemoMode } = useDemo();
  const navigate = useNavigate();

  const handleDemoMode = () => {
    enterDemoMode();
    navigate('/demo-dashboard');
  };

  return (
    <Button size="lg" className="text-base px-8" onClick={handleDemoMode}>
      <UserCheck className="mr-2 h-5 w-5" />
      Enter Demo Mode
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
}

// Guest Mode Button Component  
function GuestModeButton() {
  const { continueAsGuest } = useDemo();
  const navigate = useNavigate();

  const handleGuestMode = () => {
    continueAsGuest();
    navigate('/tools/json-viewer');
  };

  return (
    <Button size="lg" variant="outline" className="text-base px-8" onClick={handleGuestMode}>
      <User className="mr-2 h-5 w-5" />
      Continue as Guest
    </Button>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = featuredTools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-muted/30 text-sm">
            <Star className="h-4 w-4 text-primary" />
            Ultimate Developer Productivity Toolkit
          </div>
          
          <h1 className="hero-text">
            DevTools for
            <br />
            Modern Developers
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            21+ essential developer tools, prompt vault, and productivity hubs. 
            Everything you need to code faster and smarter.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <DemoModeButton />
          <GuestModeButton />
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
      </section>

      {/* Featured Tools */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Featured Tools</h2>
          <p className="text-muted-foreground">
            Most popular developer tools to boost your productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <NavLink key={tool.href} to={tool.href} className="group">
              <Card className="tool-card cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{tool.icon}</div>
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
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found matching your search.</p>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Solving Developer Challenges in the AI Era</h2>
          <p className="text-muted-foreground">
            In a rapidly growing AI landscape with tools scattered across platforms, DevTools unifies everything to streamline workflows and boost efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-8 border-0 bg-muted/30">
              <CardContent className="space-y-4 p-0">
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12 rounded-2xl bg-gradient-primary text-white">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Ready to boost your productivity?</h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Join thousands of developers who trust DevTools for their daily workflow.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-base px-8" asChild>
            <NavLink to="/tools/json-viewer">
              Try Tools Free
            </NavLink>
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8 bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
            <NavLink to="/pricing">
              View Pricing
            </NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
}
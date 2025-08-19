import { useState } from "react";
import { ArrowRight, Zap, Shield, Layers, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";

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
  }
];

const features = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Instant processing with real-time results and no server round-trips required."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Privacy First",
    description: "All processing happens locally in your browser. Your data never leaves your device."
  },
  {
    icon: <Layers className="h-8 w-8" />,
    title: "21+ Tools",
    description: "Comprehensive toolkit covering JSON, encoding, hashing, formatting, and more."
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = featuredTools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
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
          <Button size="lg" className="text-base px-8" asChild>
            <NavLink to="/tools/json-viewer">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </NavLink>
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8" asChild>
            <NavLink to="/pricing">
              View Pricing
            </NavLink>
          </Button>
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
          <h2 className="text-3xl font-bold">Why DevTools?</h2>
          <p className="text-muted-foreground">
            Built for developers who demand speed, privacy, and reliability
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
              Upgrade to Pro
            </NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
}
import { Rocket, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router-dom";

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: string;
}

export function ComingSoon({ title, description, icon = "🚀" }: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="max-w-md w-full text-center p-8">
        <CardContent className="space-y-6 p-0">
          <div className="text-6xl">{icon}</div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-primary">
              <Rocket className="h-4 w-4" />
              Coming Soon
            </div>
            
            <Button variant="outline" asChild>
              <NavLink to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </NavLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Individual page components
export function PromptsPage() {
  return (
    <ComingSoon
      title="Prompt Vault"
      description="Curated collection of AI prompts with categorization, search, and sharing features."
      icon="💡"
    />
  );
}

export function ResourcesPage() {
  return (
    <ComingSoon
      title="Resources Hub"
      description="Comprehensive collection of frontend, backend, and DevOps resources for developers."
      icon="📚"
    />
  );
}

export function WorkflowsPage() {
  return (
    <ComingSoon
      title="Workflow Templates"
      description="Ready-to-use templates for CI/CD, automation, and development workflows."
      icon="⚡"
    />
  );
}

export function MediaPage() {
  return (
    <ComingSoon
      title="Media Hub"
      description="Image generation, video tools, audio processing, and design resources."
      icon="🎨"
    />
  );
}

export function MarketingPage() {
  return (
    <ComingSoon
      title="Marketing Hub"
      description="SEO tools, social media automation, growth hacking, and content creation."
      icon="📈"
    />
  );
}

export function CareerPage() {
  return (
    <ComingSoon
      title="Career Hub"
      description="Resume templates, job boards, interview prep, and skill assessments."
      icon="💼"
    />
  );
}
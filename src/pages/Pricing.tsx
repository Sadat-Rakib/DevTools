import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period: "forever",
    features: [
      "5 essential tools",
      "50 prompts in vault",
      "Basic export options",
      "Community support",
      "Web app access"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Pro",
    description: "For serious developers",
    price: "$9.99",
    period: "month",
    features: [
      "All 21+ tools",
      "Unlimited prompts",
      "Advanced export options",
      "Workflow templates",
      "Priority support",
      "Dark & developer themes",
      "Bulk operations",
      "History & favorites"
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Enterprise",
    description: "For teams and organizations",
    price: "$29.99",
    period: "month",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "White-label options",
      "API access",
      "Custom integrations",
      "Advanced analytics",
      "Dedicated support",
      "SSO integration",
      "Custom branding"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false
  }
];

const faqs = [
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer: "Yes, you can change your plan at any time. Changes take effect immediately and billing is prorated."
  },
  {
    question: "Is there a free trial for Pro features?",
    answer: "Yes, all new users get a 14-day free trial of Pro features. No credit card required."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. No questions asked."
  },
  {
    question: "How does team collaboration work?",
    answer: "Enterprise plans include shared workspaces, team prompt libraries, and collaborative editing features."
  }
];

export default function Pricing() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your needs. Upgrade or downgrade at any time.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.buttonVariant}
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      {/* Features Comparison */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Everything you need to be productive</h2>
          <p className="text-muted-foreground">
            Comprehensive tools and features for modern development workflows
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl mb-4">🛠️</div>
            <h3 className="font-semibold mb-2">21+ Core Tools</h3>
            <p className="text-sm text-muted-foreground">
              JSON, Base64, hashing, UUID generation, and more
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="font-semibold mb-2">Prompt Vault</h3>
            <p className="text-sm text-muted-foreground">
              Curated prompts with categorization and search
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="font-semibold mb-2">Multiple Themes</h3>
            <p className="text-sm text-muted-foreground">
              Light, dark, and developer matrix themes
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Instant processing with local computation
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-8 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Everything you need to know about DevTools pricing
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="p-6">
              <h3 className="font-semibold mb-3">{faq.question}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 py-12 rounded-2xl bg-gradient-primary text-white">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-lg opacity-90">
            Join thousands of developers who trust DevTools for their daily workflow.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-base px-8">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8 bg-transparent border-white text-white hover:bg-white hover:text-primary">
            Contact Sales
          </Button>
        </div>
      </section>
    </div>
  );
}
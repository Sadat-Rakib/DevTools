import { useState } from 'react';
import { useDemo } from '@/contexts/DemoContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  CreditCard, 
  Check, 
  Star, 
  Calendar, 
  Download, 
  AlertCircle,
  Crown,
  Zap,
  Users,
  Infinity
} from 'lucide-react';

export default function Billing() {
  const { user } = useDemo();
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      current: user?.isDemo ? false : false, // Demo users get free plan
      features: [
        '5 saved prompts',
        '10 todos per project',
        'Basic tools access',
        'Community support',
      ],
      limitations: [
        'Limited prompt storage',
        'Basic support only',
      ]
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'For serious developers',
      current: false,
      popular: true,
      features: [
        'Unlimited prompts',
        'Unlimited todos',
        'AI assistant access',
        'Priority support',
        'Advanced analytics',
        'Export/import data',
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      price: '$29.99',
      period: 'per month',
      description: 'For teams and organizations',
      current: false,
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'Custom branding',
      ],
      limitations: []
    }
  ];

  const handleUpgrade = async (planName: string) => {
    setIsLoading(true);
    // TODO: Implement Stripe checkout
    console.log(`Upgrading to ${planName}`);
    setIsLoading(false);
  };

  const handleManageSubscription = async () => {
    setIsLoading(true);
    // TODO: Implement Stripe customer portal
    console.log('Opening customer portal');
    setIsLoading(false);
  };

  const currentPlan = plans.find(plan => plan.current) || plans[0];
  const usagePercentage = 60; // Mock usage data

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing information
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">
            {user?.isDemo ? 'DEMO' : 'FREE'}
          </Badge>
          <Button onClick={handleManageSubscription} disabled={isLoading}>
            <CreditCard className="h-4 w-4 mr-2" />
            Manage Subscription
          </Button>
        </div>
      </div>

      {/* Current Plan Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                <p className="text-muted-foreground">{currentPlan.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{currentPlan.price}</p>
                <p className="text-sm text-muted-foreground">{currentPlan.period}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Billing cycle</span>
                <span className="text-sm text-muted-foreground">
                  Demo mode - No billing
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Usage This Month
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Prompts Saved</span>
                <span>15 / {currentPlan.name === 'Free' ? '5' : '∞'}</span>
              </div>
              <Progress value={currentPlan.name === 'Free' ? 100 : usagePercentage} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Assistant Queries</span>
                <span>{currentPlan.name === 'Free' ? '0 / 0' : '45 / ∞'}</span>
              </div>
              <Progress value={currentPlan.name === 'Free' ? 0 : 30} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage Used</span>
                <span>2.4 GB / {currentPlan.name === 'Enterprise' ? '1 TB' : '100 GB'}</span>
              </div>
              <Progress value={2.4} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Notice */}
      {currentPlan.name === 'Free' && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>You're close to your limit</AlertTitle>
          <AlertDescription>
            You've used most of your free plan features. Upgrade to Pro to unlock unlimited access.
          </AlertDescription>
        </Alert>
      )}

      {/* Pricing Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''} ${plan.current ? 'border-primary' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {plan.name}
                  {plan.current && <Badge variant="outline">Current</Badge>}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <Button
                  className="w-full"
                  variant={plan.current ? 'outline' : 'default'}
                  onClick={() => handleUpgrade(plan.name)}
                  disabled={plan.current || isLoading}
                >
                  {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>
            Demo mode - No billing history available
          </CardDescription>
        </CardHeader>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Can I change my plan anytime?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, 
              and billing is prorated.
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">What happens if I cancel?</h4>
            <p className="text-sm text-muted-foreground">
              You can continue using Pro features until the end of your billing period. 
              After that, your account will revert to the Free plan.
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Do you offer refunds?</h4>
            <p className="text-sm text-muted-foreground">
              We offer a 14-day money-back guarantee for new subscribers. 
              Contact support if you're not satisfied with your purchase.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
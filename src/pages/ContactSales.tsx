import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Mail, 
  Phone, 
  User, 
  Building, 
  MessageSquare, 
  Send,
  Clock,
  CheckCircle,
  Star,
  Users,
  Zap,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function ContactSales() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    company_size: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          message: `Company Size: ${formData.company_size || 'Not specified'}\n\n${formData.message}`,
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success('Thank you! We\'ll get back to you within 24 hours.');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const enterpriseFeatures = [
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share prompts, resources, and workflows across your team'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SSO, audit logs, and advanced permission controls'
    },
    {
      icon: Zap,
      title: 'Custom Integrations',
      description: 'Connect with your existing tools and workflows'
    },
    {
      icon: Star,
      title: 'Priority Support',
      description: 'Dedicated account manager and 24/7 premium support'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-tech flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Thank You!</h2>
              <p className="text-muted-foreground">
                We've received your inquiry and will get back to you within 24 hours.
              </p>
            </div>
            <div className="space-y-2">
              <Link to="/dashboard">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full">Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Ready to Scale Your Development Workflow?
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Let's discuss how DevTools Enterprise can transform your team's productivity.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>24-hour response time</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Dedicated support</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Get in Touch
              </CardTitle>
              <CardDescription>
                Fill out the form below and our sales team will contact you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="company"
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_size">Company Size</Label>
                  <Select
                    value={formData.company_size}
                    onValueChange={(value) => setFormData({ ...formData, company_size: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your team's needs and how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Inquiry
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & Features */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Prefer to reach out directly? Here's how you can contact us.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">mirsadatbinrakib01@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 263 881 0363</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Features */}
            <Card>
              <CardHeader>
                <CardTitle>Enterprise Features</CardTitle>
                <CardDescription>
                  Powerful features designed for growing teams
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {enterpriseFeatures.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pricing Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Enterprise Pricing
                  <Badge>Custom</Badge>
                </CardTitle>
                <CardDescription>
                  Starting at $29.99/month per user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Volume discounts available</p>
                  <p>• Annual billing options</p>
                  <p>• 30-day free trial</p>
                  <p>• No setup fees</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <Alert className="max-w-2xl mx-auto">
            <Shield className="h-4 w-4" />
            <AlertTitle>Trusted by 500+ Development Teams</AlertTitle>
            <AlertDescription>
              Join companies like TechCorp, DevStudio, and InnovateLabs who use DevTools to accelerate their development workflows.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
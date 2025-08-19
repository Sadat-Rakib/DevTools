import { useState } from "react";
import { Search, TrendingUp, Target, Share2, BarChart, ExternalLink, Star, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MarketingTool {
  id: string;
  title: string;
  description: string;
  category: 'SEO' | 'Social Media' | 'Analytics' | 'Content' | 'Email' | 'Growth';
  subcategory: string;
  type: 'Tool' | 'Platform' | 'Service' | 'Software';
  rating: number;
  isPremium: boolean;
  url: string;
  tags: string[];
  features: string[];
  pricing: string;
}

const marketingTools: MarketingTool[] = [
  // SEO Tools
  {
    id: "1",
    title: "Ahrefs",
    description: "Comprehensive SEO toolset for keyword research, backlink analysis, and competitor research",
    category: "SEO",
    subcategory: "SEO Suite",
    type: "Platform",
    rating: 4.8,
    isPremium: true,
    url: "https://ahrefs.com",
    tags: ["SEO", "Keywords", "Backlinks", "Research"],
    features: ["Keyword research", "Backlink analysis", "Site audit", "Rank tracking"],
    pricing: "$99/month"
  },
  {
    id: "2",
    title: "Google Search Console",
    description: "Free tool to monitor and maintain your site's presence in Google Search results",
    category: "SEO",
    subcategory: "Search Analytics",
    type: "Tool",
    rating: 4.6,
    isPremium: false,
    url: "https://search.google.com/search-console",
    tags: ["Google", "Search", "Analytics", "Free"],
    features: ["Search performance", "Coverage reports", "Core Web Vitals", "URL inspection"],
    pricing: "Free"
  },
  {
    id: "3",
    title: "Screaming Frog",
    description: "Website crawler for technical SEO analysis and site audits",
    category: "SEO",
    subcategory: "Technical SEO",
    type: "Software",
    rating: 4.7,
    isPremium: true,
    url: "https://screamingfrog.co.uk",
    tags: ["Crawler", "Technical SEO", "Site Audit"],
    features: ["Website crawling", "Technical analysis", "XML sitemaps", "Page speed insights"],
    pricing: "$259/year"
  },

  // Social Media Tools
  {
    id: "4",
    title: "Hootsuite",
    description: "Social media management platform for scheduling, publishing, and analytics",
    category: "Social Media",
    subcategory: "Management",
    type: "Platform",
    rating: 4.5,
    isPremium: true,
    url: "https://hootsuite.com",
    tags: ["Social Media", "Scheduling", "Analytics"],
    features: ["Post scheduling", "Multi-platform", "Team collaboration", "Analytics"],
    pricing: "$49/month"
  },
  {
    id: "5",
    title: "Buffer",
    description: "Simple social media management with scheduling and basic analytics",
    category: "Social Media",
    subcategory: "Scheduling",
    type: "Platform",
    rating: 4.4,
    isPremium: true,
    url: "https://buffer.com",
    tags: ["Scheduling", "Simple", "Analytics"],
    features: ["Easy scheduling", "Basic analytics", "Team features", "Browser extension"],
    pricing: "$15/month"
  },
  {
    id: "6",
    title: "Canva",
    description: "Design platform for creating social media graphics and marketing materials",
    category: "Social Media",
    subcategory: "Content Creation",
    type: "Platform",
    rating: 4.6,
    isPremium: true,
    url: "https://canva.com",
    tags: ["Design", "Graphics", "Templates"],
    features: ["Drag-and-drop design", "Templates", "Brand consistency", "Team collaboration"],
    pricing: "$12.99/month"
  },

  // Analytics Tools
  {
    id: "7",
    title: "Google Analytics",
    description: "Web analytics service that tracks and reports website traffic",
    category: "Analytics",
    subcategory: "Web Analytics",
    type: "Platform",
    rating: 4.5,
    isPremium: false,
    url: "https://analytics.google.com",
    tags: ["Analytics", "Google", "Traffic", "Free"],
    features: ["Traffic analysis", "Conversion tracking", "Audience insights", "Real-time data"],
    pricing: "Free"
  },
  {
    id: "8",
    title: "Hotjar",
    description: "Behavior analytics and user feedback platform with heatmaps and recordings",
    category: "Analytics",
    subcategory: "User Behavior",
    type: "Platform",
    rating: 4.6,
    isPremium: true,
    url: "https://hotjar.com",
    tags: ["Heatmaps", "User Behavior", "Feedback"],
    features: ["Heatmaps", "Session recordings", "Surveys", "Feedback polls"],
    pricing: "$32/month"
  },
  {
    id: "9",
    title: "Mixpanel",
    description: "Product analytics platform for tracking user interactions and events",
    category: "Analytics",
    subcategory: "Product Analytics",
    type: "Platform",
    rating: 4.4,
    isPremium: true,
    url: "https://mixpanel.com",
    tags: ["Product Analytics", "Events", "Cohorts"],
    features: ["Event tracking", "Funnel analysis", "Cohort analysis", "A/B testing"],
    pricing: "$25/month"
  },

  // Content Tools
  {
    id: "10",
    title: "Grammarly",
    description: "AI-powered writing assistant for grammar, spelling, and style improvements",
    category: "Content",
    subcategory: "Writing",
    type: "Tool",
    rating: 4.7,
    isPremium: true,
    url: "https://grammarly.com",
    tags: ["Writing", "Grammar", "AI"],
    features: ["Grammar checking", "Style suggestions", "Plagiarism detection", "Browser extension"],
    pricing: "$12/month"
  },
  {
    id: "11",
    title: "BuzzSumo",
    description: "Content research and influencer discovery platform",
    category: "Content",
    subcategory: "Research",
    type: "Platform",
    rating: 4.5,
    isPremium: true,
    url: "https://buzzsumo.com",
    tags: ["Content Research", "Influencers", "Trends"],
    features: ["Content analysis", "Influencer discovery", "Trending topics", "Competitor research"],
    pricing: "$99/month"
  },

  // Email Marketing
  {
    id: "12",
    title: "Mailchimp",
    description: "Email marketing platform with automation and audience management",
    category: "Email",
    subcategory: "Email Marketing",
    type: "Platform",
    rating: 4.4,
    isPremium: true,
    url: "https://mailchimp.com",
    tags: ["Email Marketing", "Automation", "Templates"],
    features: ["Email campaigns", "Automation", "A/B testing", "Analytics"],
    pricing: "$10/month"
  },
  {
    id: "13",
    title: "ConvertKit",
    description: "Email marketing platform designed for creators and small businesses",
    category: "Email",
    subcategory: "Creator Focus",
    type: "Platform",
    rating: 4.6,
    isPremium: true,
    url: "https://convertkit.com",
    tags: ["Creator Focus", "Automation", "Tagging"],
    features: ["Visual automation", "Subscriber tagging", "Landing pages", "Integrations"],
    pricing: "$29/month"
  },

  // Growth Hacking
  {
    id: "14",
    title: "Typeform",
    description: "Interactive form and survey builder for lead generation and feedback",
    category: "Growth",
    subcategory: "Lead Generation",
    type: "Platform",
    rating: 4.5,
    isPremium: true,
    url: "https://typeform.com",
    tags: ["Forms", "Surveys", "Lead Generation"],
    features: ["Interactive forms", "Logic jumps", "Integrations", "Analytics"],
    pricing: "$25/month"
  },
  {
    id: "15",
    title: "Sumo",
    description: "Website optimization tools for growing email lists and increasing conversions",
    category: "Growth",
    subcategory: "Conversion",
    type: "Platform",
    rating: 4.3,
    isPremium: true,
    url: "https://sumo.com",
    tags: ["Conversion", "Email Growth", "Popups"],
    features: ["Email capture", "Pop-ups", "Heat maps", "A/B testing"],
    pricing: "$39/month"
  }
];

const categories = [
  { id: "SEO", label: "SEO Tools", icon: TrendingUp, count: marketingTools.filter(t => t.category === "SEO").length },
  { id: "Social Media", label: "Social Media", icon: Share2, count: marketingTools.filter(t => t.category === "Social Media").length },
  { id: "Analytics", label: "Analytics", icon: BarChart, count: marketingTools.filter(t => t.category === "Analytics").length },
  { id: "Content", label: "Content", icon: Target, count: marketingTools.filter(t => t.category === "Content").length },
  { id: "Email", label: "Email Marketing", icon: Target, count: marketingTools.filter(t => t.category === "Email").length },
  { id: "Growth", label: "Growth Hacking", icon: TrendingUp, count: marketingTools.filter(t => t.category === "Growth").length }
];

export default function MarketingHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("SEO");
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredTools = marketingTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = tool.category === selectedCategory;
    const matchesPricing = !showFreeOnly || !tool.isPremium;
    return matchesSearch && matchesCategory && matchesPricing;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Tool': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Platform': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Service': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Software': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Marketing Hub</h1>
            <p className="text-muted-foreground">SEO tools, social media automation, growth hacking, and content creation</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFreeOnly(!showFreeOnly)}>
              <Filter className="h-4 w-4" />
              {showFreeOnly ? "All Tools" : "Free Only"}
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search marketing tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  <IconComponent className="h-3 w-3" />
                  <span className="text-xs hidden sm:inline">{category.label.split(' ')[0]}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                          {tool.title}
                          {!tool.isPremium && (
                            <Badge variant="secondary" className="text-xs">
                              Free
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Type and Subcategory */}
                    <div className="flex gap-2">
                      <Badge className={getTypeColor(tool.type)}>
                        {tool.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {tool.subcategory}
                      </Badge>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Key Features:</div>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {tool.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center gap-1 text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Rating and Pricing */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{tool.rating}</span>
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {tool.pricing}
                      </div>
                    </div>

                    {/* Action */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.open(tool.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Tool
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">No marketing tools found matching your search.</div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{marketingTools.length}</div>
            <div className="text-sm text-muted-foreground">Total Tools</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{marketingTools.filter(t => !t.isPremium).length}</div>
            <div className="text-sm text-muted-foreground">Free Tools</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{categories.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{(marketingTools.reduce((sum, t) => sum + t.rating, 0) / marketingTools.length).toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
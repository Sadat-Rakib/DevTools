import { useState } from "react";
import { Search, Briefcase, FileText, Users, Trophy, ExternalLink, Star, Filter, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CareerResource {
  id: string;
  title: string;
  description: string;
  category: 'Resume' | 'Jobs' | 'Interview' | 'Skills' | 'Portfolio' | 'Networking';
  subcategory: string;
  type: 'Template' | 'Platform' | 'Course' | 'Tool' | 'Guide';
  rating: number;
  isPremium: boolean;
  url: string;
  tags: string[];
  features: string[];
  pricing: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const careerResources: CareerResource[] = [
  // Resume Templates & Tools
  {
    id: "1",
    title: "Canva Resume Templates",
    description: "Professional resume templates with modern designs and easy customization",
    category: "Resume",
    subcategory: "Templates",
    type: "Template",
    rating: 4.6,
    isPremium: true,
    url: "https://canva.com/resumes",
    tags: ["Templates", "Design", "Professional"],
    features: ["Multiple designs", "Easy editing", "ATS-friendly", "Download formats"],
    pricing: "$12.99/month",
    difficulty: "Beginner"
  },
  {
    id: "2",
    title: "Resume.io",
    description: "Professional resume builder with expert-written examples and templates",
    category: "Resume",
    subcategory: "Builder",
    type: "Platform",
    rating: 4.5,
    isPremium: true,
    url: "https://resume.io",
    tags: ["Builder", "Templates", "ATS"],
    features: ["Resume builder", "Cover letters", "ATS optimization", "Expert tips"],
    pricing: "$5.95/month",
    difficulty: "Beginner"
  },
  {
    id: "3",
    title: "LaTeX Resume Templates",
    description: "High-quality LaTeX resume templates for technical professionals",
    category: "Resume",
    subcategory: "Technical",
    type: "Template",
    rating: 4.8,
    isPremium: false,
    url: "https://github.com/posquit0/Awesome-CV",
    tags: ["LaTeX", "Technical", "Open Source"],
    features: ["Clean typography", "Version control", "Customizable", "Professional look"],
    pricing: "Free",
    difficulty: "Advanced"
  },

  // Job Boards & Platforms
  {
    id: "4",
    title: "LinkedIn Jobs",
    description: "Professional networking platform with extensive job listings and career insights",
    category: "Jobs",
    subcategory: "Networking",
    type: "Platform",
    rating: 4.4,
    isPremium: true,
    url: "https://linkedin.com/jobs",
    tags: ["Networking", "Professional", "Job Search"],
    features: ["Job search", "Professional network", "Company insights", "Skill assessments"],
    pricing: "$29.99/month",
    difficulty: "Beginner"
  },
  {
    id: "5",
    title: "AngelList (Wellfound)",
    description: "Platform for startup jobs and connecting with innovative companies",
    category: "Jobs",
    subcategory: "Startups",
    type: "Platform",
    rating: 4.3,
    isPremium: false,
    url: "https://wellfound.com",
    tags: ["Startups", "Tech", "Innovation"],
    features: ["Startup jobs", "Company profiles", "Salary transparency", "Direct applications"],
    pricing: "Free",
    difficulty: "Beginner"
  },
  {
    id: "6",
    title: "Stack Overflow Jobs",
    description: "Tech-focused job board with developer-centric features and company culture insights",
    category: "Jobs",
    subcategory: "Tech",
    type: "Platform",
    rating: 4.5,
    isPremium: false,
    url: "https://stackoverflow.com/jobs",
    tags: ["Tech", "Developer", "Programming"],
    features: ["Developer jobs", "Tech stack filtering", "Company culture", "Remote options"],
    pricing: "Free",
    difficulty: "Beginner"
  },

  // Interview Preparation
  {
    id: "7",
    title: "LeetCode",
    description: "Platform for practicing coding interview questions and algorithm challenges",
    category: "Interview",
    subcategory: "Coding",
    type: "Platform",
    rating: 4.7,
    isPremium: true,
    url: "https://leetcode.com",
    tags: ["Coding", "Algorithms", "Practice"],
    features: ["Coding challenges", "Mock interviews", "Discussion forums", "Progress tracking"],
    pricing: "$35/month",
    difficulty: "Intermediate"
  },
  {
    id: "8",
    title: "Pramp",
    description: "Free peer-to-peer mock interview platform for technical interviews",
    category: "Interview",
    subcategory: "Mock Interviews",
    type: "Platform",
    rating: 4.4,
    isPremium: false,
    url: "https://pramp.com",
    tags: ["Mock Interviews", "Peer Practice", "Free"],
    features: ["Peer matching", "Real-time coding", "Interview feedback", "Multiple domains"],
    pricing: "Free",
    difficulty: "Intermediate"
  },
  {
    id: "9",
    title: "Glassdoor Interview Insights",
    description: "Interview questions and company reviews from real employees",
    category: "Interview",
    subcategory: "Research",
    type: "Platform",
    rating: 4.2,
    isPremium: false,
    url: "https://glassdoor.com",
    tags: ["Company Reviews", "Interview Questions", "Salary"],
    features: ["Interview questions", "Company reviews", "Salary insights", "Employee feedback"],
    pricing: "Free",
    difficulty: "Beginner"
  },

  // Skill Assessment & Learning
  {
    id: "10",
    title: "HackerRank",
    description: "Coding challenges and skill assessments for developers",
    category: "Skills",
    subcategory: "Coding Assessment",
    type: "Platform",
    rating: 4.5,
    isPremium: true,
    url: "https://hackerrank.com",
    tags: ["Coding", "Assessment", "Certification"],
    features: ["Coding challenges", "Skill verification", "Certificates", "Company challenges"],
    pricing: "$39/month",
    difficulty: "Intermediate"
  },
  {
    id: "11",
    title: "Coursera Career Certificates",
    description: "Professional certificates from top companies like Google, IBM, and Meta",
    category: "Skills",
    subcategory: "Certification",
    type: "Course",
    rating: 4.6,
    isPremium: true,
    url: "https://coursera.org",
    tags: ["Certification", "Learning", "Career Change"],
    features: ["Industry certificates", "Job placement support", "Hands-on projects", "Career services"],
    pricing: "$49/month",
    difficulty: "Beginner"
  },
  {
    id: "12",
    title: "Pluralsight Skill IQ",
    description: "Skill assessments and learning paths for technology professionals",
    category: "Skills",
    subcategory: "Tech Skills",
    type: "Platform",
    rating: 4.4,
    isPremium: true,
    url: "https://pluralsight.com",
    tags: ["Tech Skills", "Assessment", "Learning Paths"],
    features: ["Skill assessments", "Learning paths", "Hands-on labs", "Progress analytics"],
    pricing: "$35.99/month",
    difficulty: "Intermediate"
  },

  // Portfolio & Personal Branding
  {
    id: "13",
    title: "GitHub Portfolio",
    description: "Showcase your coding projects and contributions with GitHub Pages",
    category: "Portfolio",
    subcategory: "Developer Portfolio",
    type: "Platform",
    rating: 4.8,
    isPremium: false,
    url: "https://github.com",
    tags: ["Portfolio", "GitHub", "Open Source"],
    features: ["Code showcase", "Contribution history", "GitHub Pages", "Collaboration proof"],
    pricing: "Free",
    difficulty: "Beginner"
  },
  {
    id: "14",
    title: "Behance",
    description: "Creative portfolio platform for designers and creative professionals",
    category: "Portfolio",
    subcategory: "Creative Portfolio",
    type: "Platform",
    rating: 4.5,
    isPremium: false,
    url: "https://behance.net",
    tags: ["Design", "Creative", "Portfolio"],
    features: ["Creative showcase", "Adobe integration", "Community feedback", "Job opportunities"],
    pricing: "Free",
    difficulty: "Beginner"
  },

  // Networking & Professional Development
  {
    id: "15",
    title: "Meetup",
    description: "Find and join professional networking events and tech meetups in your area",
    category: "Networking",
    subcategory: "Events",
    type: "Platform",
    rating: 4.3,
    isPremium: false,
    url: "https://meetup.com",
    tags: ["Networking", "Events", "Community"],
    features: ["Local events", "Professional groups", "Skill-based meetups", "Industry networking"],
    pricing: "Free",
    difficulty: "Beginner"
  }
];

const categories = [
  { id: "Resume", label: "Resume", icon: FileText, count: careerResources.filter(r => r.category === "Resume").length },
  { id: "Jobs", label: "Job Search", icon: Briefcase, count: careerResources.filter(r => r.category === "Jobs").length },
  { id: "Interview", label: "Interview Prep", icon: Users, count: careerResources.filter(r => r.category === "Interview").length },
  { id: "Skills", label: "Skill Building", icon: Trophy, count: careerResources.filter(r => r.category === "Skills").length },
  { id: "Portfolio", label: "Portfolio", icon: Star, count: careerResources.filter(r => r.category === "Portfolio").length },
  { id: "Networking", label: "Networking", icon: Users, count: careerResources.filter(r => r.category === "Networking").length }
];

export default function CareerHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Resume");
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredResources = careerResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = resource.category === selectedCategory;
    const matchesPricing = !showFreeOnly || !resource.isPremium;
    return matchesSearch && matchesCategory && matchesPricing;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Template': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Platform': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Course': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Tool': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Guide': return 'bg-pink-500/10 text-pink-500 border-pink-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Career Hub</h1>
            <p className="text-muted-foreground">Resume templates, job boards, interview prep, and skill assessments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFreeOnly(!showFreeOnly)}>
              <Filter className="h-4 w-4" />
              {showFreeOnly ? "All Resources" : "Free Only"}
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search career resources..."
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
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                          {resource.title}
                          {!resource.isPremium && (
                            <Badge variant="secondary" className="text-xs">
                              Free
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {resource.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Type, Subcategory, and Difficulty */}
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={getTypeColor(resource.type)}>
                        {resource.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.subcategory}
                      </Badge>
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Key Features:</div>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {resource.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center gap-1 text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Rating and Pricing */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{resource.rating}</span>
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {resource.pricing}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit
                      </Button>
                      {resource.type === 'Template' && (
                        <Button variant="default" size="sm">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">No career resources found matching your search.</div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{careerResources.length}</div>
            <div className="text-sm text-muted-foreground">Total Resources</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{careerResources.filter(r => !r.isPremium).length}</div>
            <div className="text-sm text-muted-foreground">Free Resources</div>
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
            <div className="text-2xl font-bold text-primary">{(careerResources.reduce((sum, r) => sum + r.rating, 0) / careerResources.length).toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { useState } from "react";
import {
  Search,
  Briefcase,
  FileText,
  Users,
  Trophy,
  ExternalLink,
  Star,
  Filter,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CareerResource {
  id: string;
  title: string;
  description: string;
  category: "Resume" | "Jobs" | "Interview" | "Skills" | "Portfolio" | "Networking";
  subcategory: string;
  type: "Template" | "Platform" | "Course" | "Tool" | "Guide";
  rating: number;
  isPremium: boolean;
  url: string;
  tags: string[];
  features: string[];
  pricing: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
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
    difficulty: "Beginner",
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
    difficulty: "Beginner",
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
    difficulty: "Advanced",
  },
  {
    id: "16",
    title: "Zety",
    description: "Resume builder with professional templates and real-time editing",
    category: "Resume",
    subcategory: "Builder",
    type: "Platform",
    rating: 4.5,
    isPremium: true,
    url: "https://zety.com",
    tags: ["Builder", "Templates", "Professional"],
    features: ["Resume creation", "Real-time previews", "Download options", "Expert advice"],
    pricing: "$5.99/month",
    difficulty: "Beginner",
  },
  {
    id: "17",
    title: "Novoresume",
    description: "Modern resume templates with ATS optimization and customization",
    category: "Resume",
    subcategory: "Templates",
    type: "Template",
    rating: 4.6,
    isPremium: true,
    url: "https://novoresume.com",
    tags: ["Templates", "ATS", "Modern"],
    features: ["ATS-friendly designs", "Customization", "Cover letter builder", "Downloadable"],
    pricing: "$16/month",
    difficulty: "Beginner",
  },
  {
    id: "18",
    title: "Resume Worded",
    description: "AI-powered resume analysis and optimization tool",
    category: "Resume",
    subcategory: "Tool",
    type: "Tool",
    rating: 4.7,
    isPremium: true,
    url: "https://resumeworded.com",
    tags: ["AI", "Optimization", "Analysis"],
    features: ["AI feedback", "Score tracking", "Keyword optimization", "Suggestions"],
    pricing: "$49/month",
    difficulty: "Intermediate",
  },
  {
    id: "19",
    title: "Jobscan",
    description: "ATS resume matching and keyword optimization tool",
    category: "Resume",
    subcategory: "Tool",
    type: "Tool",
    rating: 4.6,
    isPremium: true,
    url: "https://jobscan.co",
    tags: ["ATS", "Keyword", "Matching"],
    features: ["ATS score checker", "Keyword suggestions", "Resume comparison", "Job matching"],
    pricing: "$49.95/month",
    difficulty: "Intermediate",
  },
  {
    id: "20",
    title: "Teal Resume Builder",
    description: "Resume builder with job tracking and AI assistance",
    category: "Resume",
    subcategory: "Builder",
    type: "Platform",
    rating: 4.5,
    isPremium: true,
    url: "https://tealhq.com",
    tags: ["Builder", "AI", "Job Tracking"],
    features: ["Resume builder", "Job application tracker", "AI suggestions", "Templates"],
    pricing: "$9/week",
    difficulty: "Beginner",
  },
  {
    id: "21",
    title: "Jake's Resume Overleaf",
    description: "Customizable LaTeX resume template for technical professionals",
    category: "Resume",
    subcategory: "Technical",
    type: "Template",
    rating: 4.7,
    isPremium: false,
    url: "https://overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs",
    tags: ["LaTeX", "Technical", "Customizable"],
    features: ["LaTeX formatting", "Professional design", "Editable", "Free access"],
    pricing: "Free",
    difficulty: "Advanced",
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
    difficulty: "Beginner",
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
    difficulty: "Beginner",
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
    difficulty: "Beginner",
  },
  {
    id: "22",
    title: "FlexJobs",
    description: "Curated remote job listings across various industries with scam protection",
    category: "Jobs",
    subcategory: "Remote",
    type: "Platform",
    rating: 4.8,
    isPremium: true,
    url: "https://flexjobs.com",
    tags: ["Remote", "Curated", "Scam-Free"],
    features: ["Remote jobs", "Scam screening", "Career coaching", "Job alerts"],
    pricing: "$14.95/month",
    difficulty: "Beginner",
  },
  {
    id: "23",
    title: "We Work Remotely",
    description: "Leading remote job board for tech, marketing, and design roles",
    category: "Jobs",
    subcategory: "Remote",
    type: "Platform",
    rating: 4.4,
    isPremium: false,
    url: "https://weworkremotely.com",
    tags: ["Remote", "Tech", "Design"],
    features: ["Job listings", "Remote focus", "Established companies", "Easy apply"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "24",
    title: "Himalayas",
    description: "Remote job platform with transparent salary and company insights",
    category: "Jobs",
    subcategory: "Remote",
    type: "Platform",
    rating: 4.0,
    isPremium: false,
    url: "https://himalayas.app",
    tags: ["Remote", "Transparency", "Tech"],
    features: ["Salary data", "Company insights", "Job listings", "Filters"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "25",
    title: "RemoteOK",
    description: "Global job board for digital nomads across tech and non-tech industries",
    category: "Jobs",
    subcategory: "Remote",
    type: "Platform",
    rating: 3.6,
    isPremium: false,
    url: "https://remoteok.com",
    tags: ["Remote", "Digital Nomad", "All Industries"],
    features: ["Job postings", "Global reach", "Daily updates", "Simple interface"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "26",
    title: "Indeed",
    description: "Massive job aggregator with filters for remote and local positions",
    category: "Jobs",
    subcategory: "General",
    type: "Platform",
    rating: 3.8,
    isPremium: false,
    url: "https://indeed.com",
    tags: ["Aggregator", "General", "Remote"],
    features: ["Job search", "Filters", "Company reviews", "Application tracking"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "27",
    title: "Glassdoor",
    description: "Job board with employee reviews, salary insights, and interview questions",
    category: "Jobs",
    subcategory: "Research",
    type: "Platform",
    rating: 4.0,
    isPremium: false,
    url: "https://glassdoor.com",
    tags: ["Reviews", "Salary", "Interview"],
    features: ["Job listings", "Company reviews", "Salary data", "Interview prep"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "28",
    title: "Toptal",
    description: "Elite freelance platform for top-tier tech and design talent",
    category: "Jobs",
    subcategory: "Freelance",
    type: "Platform",
    rating: 4.4,
    isPremium: false,
    url: "https://toptal.com",
    tags: ["Freelance", "Elite", "Tech"],
    features: ["Top talent", "Project matching", "High pay", "Screening process"],
    pricing: "Free to join",
    difficulty: "Intermediate",
  },
  {
    id: "29",
    title: "Upwork",
    description: "Largest freelance marketplace for various skills and industries",
    category: "Jobs",
    subcategory: "Freelance",
    type: "Platform",
    rating: 3.2,
    isPremium: false,
    url: "https://upwork.com",
    tags: ["Freelance", "All Skills", "Marketplace"],
    features: ["Job postings", "Bidding system", "Payment protection", "Diverse projects"],
    pricing: "Free with fees",
    difficulty: "Beginner",
  },
  {
    id: "30",
    title: "Handshake",
    description: "Student-focused job and internship platform with university partnerships",
    category: "Jobs",
    subcategory: "Entry-Level",
    type: "Platform",
    rating: 4.2,
    isPremium: false,
    url: "https://handshake.com",
    tags: ["Students", "Internships", "Entry-Level"],
    features: ["Job listings", "University access", "Career fairs", "Employer connections"],
    pricing: "Free",
    difficulty: "Beginner",
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
    difficulty: "Intermediate",
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
    difficulty: "Intermediate",
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
    difficulty: "Beginner",
  },
  {
    id: "31",
    title: "InterviewBit",
    description: "Platform for technical interview preparation with coding problems",
    category: "Interview",
    subcategory: "Coding",
    type: "Platform",
    rating: 4.7,
    isPremium: true,
    url: "https://interviewbit.com",
    tags: ["Coding", "Technical", "Practice"],
    features: ["Coding problems", "Mock interviews", "Progress tracking", "Solutions"],
    pricing: "$9.99/month",
    difficulty: "Intermediate",
  },
  {
    id: "32",
    title: "Interviewing.io",
    description: "Mock technical interviews with real engineers and feedback",
    category: "Interview",
    subcategory: "Mock Interviews",
    type: "Platform",
    rating: 4.4,
    isPremium: false,
    url: "https://interviewing.io",
    tags: ["Mock Interviews", "Technical", "Feedback"],
    features: ["Live interviews", "Engineer feedback", "Practice rooms", "Job referrals"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "33",
    title: "CareerCup",
    description: "Resource for algorithm and coding interview questions",
    category: "Interview",
    subcategory: "Coding",
    type: "Guide",
    rating: 4.3,
    isPremium: false,
    url: "https://careercup.com",
    tags: ["Algorithms", "Coding", "Guide"],
    features: ["Question bank", "Solutions", "Interview tips", "Practice"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "34",
    title: "PrepLounge",
    description: "Case interview preparation for consulting roles",
    category: "Interview",
    subcategory: "Case Interviews",
    type: "Platform",
    rating: 4.5,
    isPremium: true,
    url: "https://preplounge.com",
    tags: ["Case Interviews", "Consulting", "Practice"],
    features: ["Case studies", "Peer practice", "Expert coaching", "Templates"],
    pricing: "$49/month",
    difficulty: "Advanced",
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
    difficulty: "Intermediate",
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
    difficulty: "Beginner",
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
    difficulty: "Intermediate",
  },
  {
    id: "35",
    title: "Udemy Tech Courses",
    description: "Wide range of tech courses with lifetime access and certificates",
    category: "Skills",
    subcategory: "Tech Skills",
    type: "Course",
    rating: 4.5,
    isPremium: false,
    url: "https://udemy.com",
    tags: ["Courses", "Tech", "Certificates"],
    features: ["Video lessons", "Lifetime access", "Certificates", "Project-based"],
    pricing: "One-time $10-$200",
    difficulty: "Beginner",
  },
  {
    id: "36",
    title: "edX Professional Education",
    description: "Advanced courses and certifications from top universities",
    category: "Skills",
    subcategory: "Certification",
    type: "Course",
    rating: 4.6,
    isPremium: true,
    url: "https://edx.org",
    tags: ["Certification", "University", "Advanced"],
    features: ["University courses", "Certificates", "Flexible learning", "Career support"],
    pricing: "$50-$300",
    difficulty: "Intermediate",
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
    difficulty: "Beginner",
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
    difficulty: "Beginner",
  },
  {
    id: "37",
    title: "Dribbble",
    description: "Portfolio platform for designers to showcase and network",
    category: "Portfolio",
    subcategory: "Creative Portfolio",
    type: "Platform",
    rating: 4.4,
    isPremium: false,
    url: "https://dribbble.com",
    tags: ["Design", "Portfolio", "Networking"],
    features: ["Project showcase", "Community feedback", "Job board", "Inspiration"],
    pricing: "Free",
    difficulty: "Beginner",
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
    difficulty: "Beginner",
  },
  {
    id: "38",
    title: "Eventbrite",
    description: "Platform for discovering and registering for career and tech events",
    category: "Networking",
    subcategory: "Events",
    type: "Platform",
    rating: 4.2,
    isPremium: false,
    url: "https://eventbrite.com",
    tags: ["Events", "Networking", "Tech"],
    features: ["Event listings", "Registration", "Networking opportunities", "Workshops"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  // New Email Finding Tools
  {
    id: "39",
    title: "Hunter.io",
    description: "Email finder tool to discover professional email addresses",
    category: "Networking",
    subcategory: "Tools",
    type: "Tool",
    rating: 4.6,
    isPremium: true,
    url: "https://hunter.io",
    tags: ["Email Finder", "Networking", "Outreach"],
    features: ["Email discovery", "Domain search", "Verification", "API access"],
    pricing: "$49/month",
    difficulty: "Intermediate",
  },
  {
    id: "40",
    title: "Voila Norbert",
    description: "Email search tool for finding and verifying email addresses",
    category: "Networking",
    subcategory: "Tools",
    type: "Tool",
    rating: 4.4,
    isPremium: true,
    url: "https://voilanorbert.com",
    tags: ["Email Finder", "Verification", "Outreach"],
    features: ["Email lookup", "Bulk search", "Verification", "Integration"],
    pricing: "$49/month",
    difficulty: "Intermediate",
  },
  {
    id: "41",
    title: "RocketReach",
    description: "Email and phone finder with detailed contact information",
    category: "Networking",
    subcategory: "Tools",
    type: "Tool",
    rating: 4.5,
    isPremium: true,
    url: "https://rocketreach.co",
    tags: ["Email Finder", "Contact Info", "Networking"],
    features: ["Email and phone search", "Company data", "Export options", "CRM integration"],
    pricing: "$49/month",
    difficulty: "Intermediate",
  },
];

const categories = [
  {
    id: "Resume",
    label: "Resume",
    icon: FileText,
    count: careerResources.filter((r) => r.category === "Resume").length,
  },
  {
    id: "Jobs",
    label: "Job Search",
    icon: Briefcase,
    count: careerResources.filter((r) => r.category === "Jobs").length,
  },
  {
    id: "Interview",
    label: "Interview Prep",
    icon: Users,
    count: careerResources.filter((r) => r.category === "Interview").length,
  },
  {
    id: "Skills",
    label: "Skill Building",
    icon: Trophy,
    count: careerResources.filter((r) => r.category === "Skills").length,
  },
  {
    id: "Portfolio",
    label: "Portfolio",
    icon: Star,
    count: careerResources.filter((r) => r.category === "Portfolio").length,
  },
  {
    id: "Networking",
    label: "Networking",
    icon: Users,
    count: careerResources.filter((r) => r.category === "Networking").length,
  },
];

export default function CareerHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Resume");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const filteredResources = careerResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = resource.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || resource.subcategory === selectedSubcategory;
    const matchesPricing = !showFreeOnly || !resource.isPremium;
    return matchesSearch && matchesCategory && matchesSubcategory && matchesPricing;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Template":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Platform":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Course":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Tool":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Guide":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Advanced":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const handleDownload = (url: string, title: string) => {
    try {
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.replace(/ /g, "_")}.pdf`; // Simplified assumption of PDF download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Failed to download: " + (error as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Career Hub</h1>
            <p className="text-muted-foreground">
              Resume templates, job boards, interview prep, and skill assessments
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              aria-label={showFreeOnly ? "Show all resources" : "Show free resources only"}
              onClick={() => setShowFreeOnly(!showFreeOnly)}
            >
              <Filter className="h-4 w-4" />
              {showFreeOnly ? "All Resources" : "Free Only"}
            </Button>
          </div>
        </div>

        {/* Search and Subcategory Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search career resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedSubcategory || ""}
            onChange={(e) => setSelectedSubcategory(e.target.value || null)}
            className="border rounded-md p-2 text-sm text-muted-foreground bg-background"
          >
            <option value="">All Subcategories</option>
            {[
              ...new Set(careerResources.filter(r => r.category === selectedCategory).map(r => r.subcategory)),
            ].map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex flex-col items-center gap-1"
                aria-label={`Switch to ${category.label} category`}
              >
                <div className="flex items-center gap-1">
                  <IconComponent className="h-3 w-3" />
                  <span className="text-xs hidden sm:inline">{category.label.split(" ")[0]}</span>
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
                        aria-label={`Visit ${resource.title}`}
                        onClick={() => {
                          try {
                            window.open(resource.url, "_blank");
                          } catch (error) {
                            alert("Failed to open URL: " + (error as Error).message);
                          }
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit
                      </Button>
                      {resource.type === "Template" && (
                        <Button
                          variant="default"
                          size="sm"
                          aria-label={`Download ${resource.title}`}
                          onClick={() => handleDownload(resource.url, resource.title)}
                        >
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
            <div className="text-2xl font-bold text-primary">{careerResources.filter((r) => !r.isPremium).length}</div>
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
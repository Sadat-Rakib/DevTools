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
  type: "Template" | "Platform" | "Course" | "Tool" | "Guide" | "Job Board";
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
  {
    id: "42",
    title: "Brian’s Job Search",
    description: "Curated listings of tech and business jobs for new grads and professionals",
    category: "Jobs",
    subcategory: "General",
    type: "Job Board",
    rating: 4.5,
    isPremium: false,
    url: "",
    tags: ["Curated", "Tech", "Business"],
    features: ["Curated job listings", "Tech focus", "New grad roles", "Regular updates"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "43",
    title: "JobRight",
    description: "AI-powered job board with filters for tech and business roles",
    category: "Jobs",
    subcategory: "General",
    type: "Job Board",
    rating: 4.4,
    isPremium: false,
    url: "",
    tags: ["AI", "Job Search", "Filters"],
    features: ["AI-powered search", "Role filters", "Tech jobs", "Business jobs"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "44",
    title: "GitHub - New Grad 2025",
    description: "Curated list of new grad job postings for 2025",
    category: "Jobs",
    subcategory: "Entry-Level",
    type: "Job Board",
    rating: 4.6,
    isPremium: false,
    url: "https://github.com/haydenthai",
    tags: ["New Grad", "Job Listings", "Tech"],
    features: ["Curated job postings", "New grad focus", "Tech roles", "Open source"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "45",
    title: "SimplifyJobs New Grad Positions",
    description: "Centralized list of new grad job opportunities",
    category: "Jobs",
    subcategory: "Entry-Level",
    type: "Job Board",
    rating: 4.5,
    isPremium: false,
    url: "https://github.com/SimplifyJobs",
    tags: ["New Grad", "Job Listings", "Tech"],
    features: ["New grad jobs", "Centralized list", "Tech focus", "Community-driven"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "46",
    title: "cvrve/New Grad",
    description: "Maintained list of new grad job openings",
    category: "Jobs",
    subcategory: "Entry-Level",
    type: "Job Board",
    rating: 4.4,
    isPremium: false,
    url: "https://github.com/cvrve",
    tags: ["New Grad", "Job Listings", "Tech"],
    features: ["Job postings", "New grad focus", "Regular updates", "Community-driven"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "47",
    title: "Machinify",
    description: "Data and analyst roles at a data-driven healthcare company",
    category: "Jobs",
    subcategory: "Data",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://jobs.ashbyhq.com",
    tags: ["Data", "Analyst", "Healthcare"],
    features: ["Data roles", "Analyst positions", "Healthcare focus", "Direct applications"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "48",
    title: "Luxor",
    description: "Analyst roles in a tech-driven financial services company",
    category: "Jobs",
    subcategory: "Analyst",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "https://jobs.ashbyhq.com",
    tags: ["Analyst", "Finance", "Tech"],
    features: ["Analyst jobs", "Financial services", "Tech focus", "Direct applications"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "49",
    title: "Earnest Partners",
    description: "Analyst positions in investment management",
    category: "Jobs",
    subcategory: "Analyst",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "https://jobs.lever.co",
    tags: ["Analyst", "Investment", "Finance"],
    features: ["Analyst roles", "Investment focus", "Direct applications", "Professional growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "50",
    title: "Google Careers",
    description: "Strategy and operations analyst roles at Google",
    category: "Jobs",
    subcategory: "Analyst",
    type: "Job Board",
    rating: 4.8,
    isPremium: false,
    url: "https://google.com/about/careers",
    tags: ["Analyst", "Strategy", "Tech"],
    features: ["Strategy roles", "Operations analyst", "Tech industry", "Global opportunities"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "51",
    title: "Fannie Mae",
    description: "Business intelligence developer roles in finance",
    category: "Jobs",
    subcategory: "Data",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://fanniemae.wd1.myworkdayjobs.com",
    tags: ["BI", "Developer", "Finance"],
    features: ["BI developer roles", "Finance industry", "Data focus", "Direct applications"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "52",
    title: "BNP Paribas",
    description: "Summer analyst internships in banking",
    category: "Jobs",
    subcategory: "Analyst",
    type: "Job Board",
    rating: 4.4,
    isPremium: false,
    url: "https://group.bnpparibas.com/careers",
    tags: ["Analyst", "Internship", "Banking"],
    features: ["Summer internships", "Analyst roles", "Banking industry", "Career growth"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "53",
    title: "Paylocity",
    description: "Analyst roles in HR and payroll technology",
    category: "Jobs",
    subcategory: "Analyst",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://recruiting.paylocity.com",
    tags: ["Analyst", "HR", "Tech"],
    features: ["Analyst jobs", "HR technology", "Payroll focus", "Direct applications"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "54",
    title: "OSV (CCI)",
    description: "Data engineering internships in consulting",
    category: "Jobs",
    subcategory: "Data",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "https://osv-cci.wd1.myworkdayjobs.com",
    tags: ["Data", "Internship", "Consulting"],
    features: ["Data engineering", "Internships", "Consulting industry", "Career growth"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "55",
    title: "Unum",
    description: "Business intelligence analyst roles in insurance",
    category: "Jobs",
    subcategory: "Data",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "https://unum.wd1.myworkdayjobs.com",
    tags: ["BI", "Analyst", "Insurance"],
    features: ["BI analyst roles", "Insurance industry", "Data focus", "Direct applications"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "56",
    title: "East West Bank",
    description: "Business intelligence developer roles in banking",
    category: "Jobs",
    subcategory: "Data",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://careers-eastwestbank.icims.com",
    tags: ["BI", "Developer", "Banking"],
    features: ["BI developer roles", "Banking industry", "Data focus", "Direct applications"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "57",
    title: "PacD (Ultipro)",
    description: "Data analyst roles in tech-driven solutions",
    category: "Jobs",
    subcategory: "Data",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "https://recruiting.ultipro.com",
    tags: ["Data", "Analyst", "Tech"],
    features: ["Data analyst roles", "Tech solutions", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "58",
    title: "Crate & Barrel",
    description: "Software engineering roles in retail technology",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://jobs.crateandbarrel.com",
    tags: ["SWE", "Retail", "Tech"],
    features: ["Software engineering", "Retail technology", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "59",
    title: "Adobe",
    description: "Software engineering internships in creative tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.7,
    isPremium: false,
    url: "https://adobe.wd5.myworkdayjobs.com",
    tags: ["SWE", "Internship", "Creative"],
    features: ["SWE internships", "Creative tech", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "60",
    title: "TopBloc",
    description: "Software engineering roles in consulting",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://topbloc.wd5.myworkdayjobs.com",
    tags: ["SWE", "Consulting", "Tech"],
    features: ["Software engineering", "Consulting industry", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "61",
    title: "Meta",
    description: "Software engineering roles at Meta",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.8,
    isPremium: false,
    url: "https://metacareers.com",
    tags: ["SWE", "Tech", "Social Media"],
    features: ["Software engineering", "Tech industry", "Direct applications", "Global opportunities"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "62",
    title: "Garmin",
    description: "Software engineering roles in fitness and navigation tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.4,
    isPremium: false,
    url: "https://careers.garmin.com",
    tags: ["SWE", "Fitness", "Navigation"],
    features: ["Software engineering", "Tech industry", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "63",
    title: "Tetra Tech",
    description: "Energy engineering roles in sustainable solutions",
    category: "Jobs",
    subcategory: "Engineering",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://tetratech.referrals.selectminds.com",
    tags: ["Engineering", "Energy", "Sustainability"],
    features: ["Energy engineering", "Sustainable solutions", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "64",
    title: "GEI Consultants",
    description: "Web developer internships in engineering consulting",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "https://jointeamgei.geiconsultants.com",
    tags: ["Web Developer", "Internship", "Consulting"],
    features: ["Web developer internships", "Consulting industry", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "65",
    title: "Royal Caribbean",
    description: "Software engineering roles in travel and hospitality",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://jobs.royalcaribbeangroup.com",
    tags: ["SWE", "Travel", "Hospitality"],
    features: ["Software engineering", "Travel industry", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "66",
    title: "Optiver",
    description: "Software engineering internships in financial trading",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.4,
    isPremium: false,
    url: "https://optiver.com/careers",
    tags: ["SWE", "Internship", "Finance"],
    features: ["SWE internships", "Financial trading", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "67",
    title: "SewerAI",
    description: "Software engineering roles in AI-driven infrastructure",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://ats.rippling.com",
    tags: ["SWE", "AI", "Infrastructure"],
    features: ["Software engineering", "AI-driven solutions", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "68",
    title: "Omnidian",
    description: "Software engineering roles in renewable energy",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://jobs.lever.co",
    tags: ["SWE", "Renewable Energy", "Tech"],
    features: ["Software engineering", "Renewable energy", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "69",
    title: "Apple",
    description: "Software engineering internships at Apple",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.8,
    isPremium: false,
    url: "https://jobs.apple.com",
    tags: ["SWE", "Internship", "Tech"],
    features: ["SWE internships", "Tech industry", "Direct applications", "Global opportunities"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "70",
    title: "Amazon",
    description: "Software engineering internships and full-time roles",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.7,
    isPremium: false,
    url: "https://amazon.jobs",
    tags: ["SWE", "Internship", "Full-time"],
    features: ["Software engineering", "Tech industry", "Direct applications", "Global opportunities"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "71",
    title: "Stier Solutions",
    description: "Software engineering roles in tech solutions",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "https://stiersol.com/careers",
    tags: ["SWE", "Tech", "Solutions"],
    features: ["Software engineering", "Tech solutions", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "72",
    title: "Quanta",
    description: "Marketing lead roles with an analyst track",
    category: "Jobs",
    subcategory: "Analyst",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://usequanta.notion.site",
    tags: ["Marketing", "Analyst", "Tech"],
    features: ["Marketing roles", "Analyst track", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "73",
    title: "ProofServe",
    description: "Software engineering roles in Canadian tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "",
    tags: ["SWE", "Canada", "Tech"],
    features: ["Software engineering", "Canadian tech", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "74",
    title: "Veeva",
    description: "Full stack engineering roles in life sciences",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.4,
    isPremium: false,
    url: "https://jobs.lever.co",
    tags: ["Full Stack", "Life Sciences", "Tech"],
    features: ["Full stack engineering", "Life sciences", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "75",
    title: "Autodesk",
    description: "Software engineering roles in design and engineering",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.5,
    isPremium: false,
    url: "https://autodesk.wd1.myworkdayjobs.com",
    tags: ["SWE", "Design", "Engineering"],
    features: ["Software engineering", "Design industry", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "76",
    title: "Sayari",
    description: "Software engineering roles in data intelligence",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://jobs.lever.co",
    tags: ["SWE", "Data", "Intelligence"],
    features: ["Software engineering", "Data intelligence", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "77",
    title: "Auvik",
    description: "Software engineering roles in network management",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://auvik.com/careers",
    tags: ["SWE", "Networking", "Tech"],
    features: ["Software engineering", "Network management", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "78",
    title: "Mediafly",
    description: "Software engineering roles in sales enablement",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://jobs.lever.co",
    tags: ["SWE", "Sales", "Tech"],
    features: ["Software engineering", "Sales enablement", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "79",
    title: "DataVisor",
    description: "Software engineering roles in fraud detection",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://himalayas.app",
    tags: ["SWE", "Fraud Detection", "Tech"],
    features: ["Software engineering", "Fraud detection", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "80",
    title: "Myticas Consulting",
    description: "Software engineering roles via LinkedIn job postings",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "https://linkedin.com/jobs",
    tags: ["SWE", "Consulting", "Tech"],
    features: ["Software engineering", "Consulting industry", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "81",
    title: "TD Bank",
    description: "Software engineering roles in banking",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://tdbank.jobs",
    tags: ["SWE", "Banking", "Tech"],
    features: ["Software engineering", "Banking industry", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "82",
    title: "RemoteRocketship",
    description: "Solutions engineer roles for remote opportunities",
    category: "Jobs",
    subcategory: "Remote",
    type: "Job Board",
    rating: 4.4,
    isPremium: false,
    url: "https://remoterocketship.com",
    tags: ["Solutions Engineer", "Remote", "Tech"],
    features: ["Solutions engineering", "Remote jobs", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "83",
    title: "Confluent",
    description: "Business intelligence developer roles in data streaming",
    category: "Jobs",
    subcategory: "Data",
    type: "Job Board",
    rating: 4.5,
    isPremium: false,
    url: "https://careers.confluent.io",
    tags: ["BI", "Developer", "Data"],
    features: ["BI developer roles", "Data streaming", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "84",
    title: "Payman",
    description: "AI-driven payment solutions roles",
    category: "Jobs",
    subcategory: "AI",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "",
    tags: ["AI", "Payments", "Tech"],
    features: ["AI roles", "Payment solutions", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "85",
    title: "Dub.co",
    description: "Link attribution roles in tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "",
    tags: ["Link Attribution", "Tech", "Startups"],
    features: ["Tech roles", "Link attribution", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "86",
    title: "Mail0 (YC X25)",
    description: "AI email client development roles",
    category: "Jobs",
    subcategory: "AI",
    type: "Job Board",
    rating: 4.4,
    isPremium: false,
    url: "",
    tags: ["AI", "Email", "Tech"],
    features: ["AI development", "Email client", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "87",
    title: "Liminary",
    description: "AI assistant development roles",
    category: "Jobs",
    subcategory: "AI",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "",
    tags: ["AI", "Assistant", "Tech"],
    features: ["AI development", "Assistant roles", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "88",
    title: "Outsmart",
    description: "EdTech roles in educational technology",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "",
    tags: ["EdTech", "Tech", "Education"],
    features: ["EdTech roles", "Educational technology", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "89",
    title: "Loti",
    description: "Deepfake protection roles in AI",
    category: "Jobs",
    subcategory: "AI",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "",
    tags: ["AI", "Deepfake", "Tech"],
    features: ["AI roles", "Deepfake protection", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "90",
    title: "Northstar",
    description: "Financial wellness roles in tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "",
    tags: ["Financial Wellness", "Tech", "Finance"],
    features: ["Tech roles", "Financial wellness", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "91",
    title: "Rollups",
    description: "Equity management roles in tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "",
    tags: ["Equity Management", "Tech", "Finance"],
    features: ["Tech roles", "Equity management", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "92",
    title: "Langdock",
    description: "AI platform development roles",
    category: "Jobs",
    subcategory: "AI",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "",
    tags: ["AI", "Platform", "Tech"],
    features: ["AI development", "Platform roles", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "93",
    title: "Prismic",
    description: "Headless CMS development roles",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "",
    tags: ["Headless CMS", "Tech", "Development"],
    features: ["Tech roles", "Headless CMS", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "94",
    title: "Arcol",
    description: "Design collaboration roles in tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "",
    tags: ["Design", "Collaboration", "Tech"],
    features: ["Tech roles", "Design collaboration", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "95",
    title: "Thatch",
    description: "HealthTech roles in technology",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "",
    tags: ["HealthTech", "Tech", "Healthcare"],
    features: ["Tech roles", "HealthTech", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "96",
    title: "Bluefish",
    description: "Brand monitoring roles in tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "",
    tags: ["Brand Monitoring", "Tech", "Marketing"],
    features: ["Tech roles", "Brand monitoring", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "97",
    title: "Zed Industries",
    description: "Multiplayer code editor development roles",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "",
    tags: ["Code Editor", "Tech", "Development"],
    features: ["Tech roles", "Code editor development", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "98",
    title: "Gensyn",
    description: "Machine intelligence roles in AI",
    category: "Jobs",
    subcategory: "AI",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "",
    tags: ["AI", "Machine Intelligence", "Tech"],
    features: ["AI roles", "Machine intelligence", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "99",
    title: "Ravenna",
    description: "Operations helpdesk roles in tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "",
    tags: ["Operations", "Helpdesk", "Tech"],
    features: ["Tech roles", "Operations helpdesk", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "100",
    title: "Junction",
    description: "Healthcare infrastructure roles in tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "",
    tags: ["Healthcare", "Infrastructure", "Tech"],
    features: ["Tech roles", "Healthcare infrastructure", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "101",
    title: "Rerun",
    description: "Multimodal data roles in tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "",
    tags: ["Multimodal Data", "Tech", "Data"],
    features: ["Tech roles", "Multimodal data", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "102",
    title: "ElevenLabs",
    description: "AI voice development roles",
    category: "Jobs",
    subcategory: "AI",
    type: "Job Board",
    rating: 4.4,
    isPremium: false,
    url: "",
    tags: ["AI", "Voice", "Tech"],
    features: ["AI roles", "Voice development", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "103",
    title: "Firecrawl",
    description: "LLM data tools development roles",
    category: "Jobs",
    subcategory: "AI",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "",
    tags: ["AI", "LLM", "Data"],
    features: ["AI roles", "LLM data tools", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "104",
    title: "Footprint",
    description: "KYC/KYB roles in tech",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.2,
    isPremium: false,
    url: "",
    tags: ["KYC", "KYB", "Tech"],
    features: ["Tech roles", "KYC/KYB", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "105",
    title: "Supper",
    description: "AI data platform development roles",
    category: "Jobs",
    subcategory: "AI",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "",
    tags: ["AI", "Data Platform", "Tech"],
    features: ["AI roles", "Data platform", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "106",
    title: "Nuvolari AI",
    description: "AI engineer and full stack roles",
    category: "Jobs",
    subcategory: "AI",
    type: "Job Board",
    rating: 4.4,
    isPremium: false,
    url: "https://notion.site",
    tags: ["AI", "Full Stack", "Tech"],
    features: ["AI roles", "Full stack engineering", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "107",
    title: "Gelato Digital",
    description: "Developer relations internships in Web3",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://workable.com",
    tags: ["DevRel", "Internship", "Web3"],
    features: ["DevRel internships", "Web3 focus", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Beginner",
  },
  {
    id: "108",
    title: "Ripple",
    description: "Ecosystem growth roles in blockchain",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.4,
    isPremium: false,
    url: "https://ripple.com/careers",
    tags: ["Ecosystem Growth", "Blockchain", "Tech"],
    features: ["Tech roles", "Blockchain industry", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "109",
    title: "Aptos Labs",
    description: "GTM strategist roles in Web3",
    category: "Jobs",
    subcategory: "Tech",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://greenhouse.io",
    tags: ["GTM", "Web3", "Tech"],
    features: ["GTM strategist roles", "Web3 focus", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
  },
  {
    id: "110",
    title: "Sahara AI",
    description: "Ambassador manager roles in AI",
    category: "Jobs",
    subcategory: "AI",
    type: "Job Board",
    rating: 4.3,
    isPremium: false,
    url: "https://ashbyhq.com",
    tags: ["AI", "Ambassador", "Tech"],
    features: ["AI roles", "Ambassador management", "Direct applications", "Career growth"],
    pricing: "Free",
    difficulty: "Intermediate",
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
      case "Job Board":
        return "bg-teal-500/10 text-teal-500 border-teal-500/20";
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
                        disabled={!resource.url}
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
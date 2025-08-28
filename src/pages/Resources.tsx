import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Search,
  ExternalLink,
  Star,
  Filter,
  Bookmark,
  Share,
  Plus,
  Download,
  Upload,
  Trash,
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

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  subcategory: string;
  rating: number;
  type:
    | "Documentation"
    | "Tool"
    | "Library"
    | "Tutorial"
    | "Course"
    | "Article"
    | "Cheat Sheet"
    | "Roadmap"
    | "Code Repository"
    | "Guide";
  tags: string[];
  isBookmarked: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const resources: Resource[] = [
  // Frontend Resources
  {
    id: "1",
    title: "React Documentation",
    description:
      "Official React documentation with comprehensive guides and API reference",
    url: "https://react.dev",
    category: "Frontend",
    subcategory: "React",
    rating: 4.9,
    type: "Documentation",
    tags: ["React", "JavaScript", "UI"],
    isBookmarked: true,
    difficulty: "Beginner",
  },
  {
    id: "2",
    title: "Tailwind CSS",
    description:
      "Utility-first CSS framework for rapidly building custom user interfaces",
    url: "https://tailwindcss.com",
    category: "Frontend",
    subcategory: "CSS",
    rating: 4.8,
    type: "Library",
    tags: ["CSS", "Styling", "Utility"],
    isBookmarked: false,
    difficulty: "Beginner",
  },
  {
    id: "3",
    title: "TypeScript Handbook",
    description:
      "Complete guide to TypeScript language features and best practices",
    url: "https://www.typescriptlang.org/docs/",
    category: "Frontend",
    subcategory: "TypeScript",
    rating: 4.7,
    type: "Documentation",
    tags: ["TypeScript", "JavaScript", "Types"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
  {
    id: "4",
    title: "Framer Motion",
    description:
      "Production-ready motion library for React with simple declarative syntax",
    url: "https://www.framer.com/motion/",
    category: "Frontend",
    subcategory: "Animation",
    rating: 4.6,
    type: "Library",
    tags: ["Animation", "React", "Motion"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },
  {
    id: "5",
    title: "Vite",
    description:
      "Next generation frontend tooling with lightning fast development server",
    url: "https://vitejs.dev",
    category: "Frontend",
    subcategory: "Build Tools",
    rating: 4.8,
    type: "Tool",
    tags: ["Build", "Development", "Fast"],
    isBookmarked: true,
    difficulty: "Beginner",
  },
  {
    id: "16",
    title: "The Essential Git Command Cheat Sheet",
    description: "Comprehensive cheat sheet for essential Git commands",
    url: "",
    category: "Frontend",
    subcategory: "Version Control",
    rating: 4.7,
    type: "Cheat Sheet",
    tags: ["Git", "Version Control", "Cheat Sheet"],
    isBookmarked: false,
    difficulty: "Beginner",
  },
  {
    id: "17",
    title: "OverAPI.com",
    description:
      "The ultimate cheat sheet collection for JavaScript, Python, Git, Linux, and more",
    url: "https://overapi.com",
    category: "Frontend",
    subcategory: "Reference",
    rating: 4.6,
    type: "Cheat Sheet",
    tags: ["JavaScript", "Python", "Git", "Linux"],
    isBookmarked: true,
    difficulty: "Beginner",
  },
  {
    id: "18",
    title: "Carbon.now.sh",
    description: "Turn your code into beautiful images for social media or portfolios",
    url: "https://carbon.now.sh",
    category: "Frontend",
    subcategory: "Tools",
    rating: 4.8,
    type: "Tool",
    tags: ["Code Visualization", "Portfolio", "Social Media"],
    isBookmarked: false,
    difficulty: "Beginner",
  },
  {
    id: "19",
    title: "Roadmap.sh",
    description: "Interactive developer roadmaps for frontend, backend, and DevOps",
    url: "https://roadmap.sh",
    category: "Frontend",
    subcategory: "Learning Path",
    rating: 4.9,
    type: "Roadmap",
    tags: ["Roadmap", "Learning", "Career"],
    isBookmarked: true,
    difficulty: "Beginner",
  },
  {
    id: "20",
    title: "DevDocs.io",
    description: "Offline-first, super-fast API documentation for React, JS, Python, etc.",
    url: "https://devdocs.io",
    category: "Frontend",
    subcategory: "Reference",
    rating: 4.8,
    type: "Documentation",
    tags: ["API", "Documentation", "React", "JavaScript"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },
  {
    id: "21",
    title: "SourceGraph.com",
    description: "Search across real-world open source codebases",
    url: "https://sourcegraph.com",
    category: "Frontend",
    subcategory: "Tools",
    rating: 4.7,
    type: "Tool",
    tags: ["Code Search", "Open Source", "Git"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
  {
    id: "22",
    title: "htmx.org",
    description: "Add dynamic behavior to HTML without JavaScript",
    url: "https://htmx.org",
    category: "Frontend",
    subcategory: "Library",
    rating: 4.6,
    type: "Library",
    tags: ["HTML", "Dynamic", "No JS"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },
  {
    id: "23",
    title: "Frontend Dev Roadmap Repository",
    description: "Interactive roadmaps and guides for frontend developers",
    url: "https://github.com/kamranahmedse/developer-roadmap",
    category: "Frontend",
    subcategory: "Learning Path",
    rating: 4.9,
    type: "Code Repository",
    tags: ["Roadmap", "Frontend", "Career"],
    isBookmarked: true,
    difficulty: "Beginner",
  },
  {
    id: "24",
    title: "Awesome React Repository",
    description: "Curated collection of React resources and projects",
    url: "https://github.com/enaqx/awesome-react",
    category: "Frontend",
    subcategory: "React",
    rating: 4.8,
    type: "Code Repository",
    tags: ["React", "Resources", "Ecosystem"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },
  {
    id: "25",
    title: "30 Seconds of Code Repository",
    description: "Short JavaScript, React, CSS, and DOM snippets",
    url: "https://github.com/Chalarangelo/30-seconds-of-code",
    category: "Frontend",
    subcategory: "JavaScript",
    rating: 4.7,
    type: "Code Repository",
    tags: ["JavaScript", "Snippets", "Learning"],
    isBookmarked: true,
    difficulty: "Beginner",
  },
  {
    id: "26",
    title: "Frontend Developer Interview Questions",
    description: "List of frontend-related interview questions",
    url: "https://github.com/h5bp/Front-end-Developer-Interview-Questions",
    category: "Frontend",
    subcategory: "Interview Prep",
    rating: 4.7,
    type: "Code Repository",
    tags: ["Interview", "Frontend", "Questions"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },
  {
    id: "27",
    title: "React Interview Questions & Answers",
    description: "Comprehensive list of 500+ React interview questions",
    url: "https://github.com/sudheerj/reactjs-interview-questions",
    category: "Frontend",
    subcategory: "Interview Prep",
    rating: 4.8,
    type: "Code Repository",
    tags: ["React", "Interview", "Questions"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
  {
    id: "28",
    title: "JavaScript 30",
    description: "Build 30 projects with vanilla JavaScript in 30 days",
    url: "https://javascript30.com",
    category: "Frontend",
    subcategory: "Tutorial",
    rating: 4.7,
    type: "Tutorial",
    tags: ["JavaScript", "Projects", "Learning"],
    isBookmarked: false,
    difficulty: "Beginner",
  },

  // Backend Resources
  {
    id: "6",
    title: "Node.js Documentation",
    description:
      "Official Node.js documentation and guides for server-side JavaScript",
    url: "https://nodejs.org/docs/",
    category: "Backend",
    subcategory: "Node.js",
    rating: 4.7,
    type: "Documentation",
    tags: ["Node.js", "JavaScript", "Server"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },
  {
    id: "7",
    title: "Express.js",
    description: "Fast, unopinionated, minimalist web framework for Node.js",
    url: "https://expressjs.com",
    category: "Backend",
    subcategory: "Frameworks",
    rating: 4.6,
    type: "Library",
    tags: ["Express", "Node.js", "Web Framework"],
    isBookmarked: true,
    difficulty: "Beginner",
  },
  {
    id: "8",
    title: "PostgreSQL Tutorial",
    description:
      "Comprehensive PostgreSQL tutorial from beginner to advanced concepts",
    url: "https://www.postgresqltutorial.com",
    category: "Backend",
    subcategory: "Database",
    rating: 4.8,
    type: "Tutorial",
    tags: ["PostgreSQL", "Database", "SQL"],
    isBookmarked: false,
    difficulty: "Beginner",
  },
  {
    id: "9",
    title: "Prisma",
    description:
      "Next-generation ORM for Node.js and TypeScript with type safety",
    url: "https://www.prisma.io",
    category: "Backend",
    subcategory: "ORM",
    rating: 4.7,
    type: "Tool",
    tags: ["ORM", "Database", "TypeScript"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
  {
    id: "10",
    title: "Redis Documentation",
    description:
      "In-memory data structure store used as database, cache, and message broker",
    url: "https://redis.io/documentation",
    category: "Backend",
    subcategory: "Cache",
    rating: 4.6,
    type: "Documentation",
    tags: ["Redis", "Cache", "Memory"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },
  {
    id: "29",
    title: "SQL Guide",
    description: "Comprehensive guide to learning SQL with top free resources",
    url: "https://sqlbolt.com",
    category: "Backend",
    subcategory: "Database",
    rating: 4.8,
    type: "Guide",
    tags: ["SQL", "Database", "Learning"],
    isBookmarked: true,
    difficulty: "Beginner",
  },
  {
    id: "30",
    title: "SQL MyStrivera",
    description: "GitHub repository for SQL learning and practice",
    url: "https://github.com/SahilGogna/SQL-MyStrivera",
    category: "Backend",
    subcategory: "Database",
    rating: 4.6,
    type: "Code Repository",
    tags: ["SQL", "Database", "Practice"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },

  // DevOps Resources
  {
    id: "11",
    title: "Docker Documentation",
    description: "Complete guide to containerization with Docker",
    url: "https://docs.docker.com",
    category: "DevOps",
    subcategory: "Containers",
    rating: 4.8,
    type: "Documentation",
    tags: ["Docker", "Containers", "DevOps"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
  {
    id: "12",
    title: "Kubernetes",
    description: "Production-grade container orchestration platform",
    url: "https://kubernetes.io/docs/",
    category: "DevOps",
    subcategory: "Orchestration",
    rating: 4.7,
    type: "Documentation",
    tags: ["Kubernetes", "Orchestration", "Containers"],
    isBookmarked: false,
    difficulty: "Advanced",
  },
  {
    id: "13",
    title: "AWS Documentation",
    description:
      "Comprehensive Amazon Web Services documentation and tutorials",
    url: "https://docs.aws.amazon.com",
    category: "DevOps",
    subcategory: "Cloud",
    rating: 4.6,
    type: "Documentation",
    tags: ["AWS", "Cloud", "Infrastructure"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
  {
    id: "14",
    title: "Terraform",
    description:
      "Infrastructure as code tool for building, changing, and versioning infrastructure",
    url: "https://www.terraform.io/docs",
    category: "DevOps",
    subcategory: "IaC",
    rating: 4.7,
    type: "Tool",
    tags: ["Terraform", "Infrastructure", "IaC"],
    isBookmarked: false,
    difficulty: "Advanced",
  },
  {
    id: "15",
    title: "GitHub Actions",
    description:
      "CI/CD platform that allows you to automate your build, test, and deployment pipeline",
    url: "https://docs.github.com/en/actions",
    category: "DevOps",
    subcategory: "CI/CD",
    rating: 4.8,
    type: "Documentation",
    tags: ["CI/CD", "GitHub", "Automation"],
    isBookmarked: true,
    difficulty: "Beginner",
  },

  // AI Resources
  {
    id: "31",
    title: "Scrimba's LangChain Course",
    description: "Interactive course for building AI agents using LangChain",
    url: "https://v2.scrimba.com/learn-langchainjs-c02",
    category: "AI",
    subcategory: "AI Agents",
    rating: 4.8,
    type: "Course",
    tags: ["LangChain", "AI", "JavaScript"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
  {
    id: "32",
    title: "DeepLearning.AI's AI Agents in LangGraph Course",
    description: "Learn to build AI agents using LangGraph",
    url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/",
    category: "AI",
    subcategory: "AI Agents",
    rating: 4.9,
    type: "Course",
    tags: ["LangGraph", "AI", "Agents"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },
  {
    id: "33",
    title: "DeepLearning.AI's Multi-AI Agent Systems with CrewAI",
    description: "Course on building multi-agent systems with CrewAI",
    url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/",
    category: "AI",
    subcategory: "AI Agents",
    rating: 4.8,
    type: "Course",
    tags: ["CrewAI", "Multi-Agent", "AI"],
    isBookmarked: true,
    difficulty: "Advanced",
  },
  {
    id: "34",
    title: "NVIDIA's Fundamentals of Accelerated Computing with AI Agents",
    description: "Optimize AI agents using GPU-accelerated computing",
    url: "https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+S-FX-15+V1",
    category: "AI",
    subcategory: "AI Optimization",
    rating: 4.7,
    type: "Course",
    tags: ["NVIDIA", "AI", "GPU"],
    isBookmarked: false,
    difficulty: "Advanced",
  },
  {
    id: "35",
    title: "YouTube - How to Build AI Agents (Tutorial)",
    description: "Concise video tutorial on building AI agents",
    url: "https://www.youtube.com/watch?v=cDm5vPXVln8",
    category: "AI",
    subcategory: "AI Agents",
    rating: 4.6,
    type: "Tutorial",
    tags: ["AI", "Tutorial", "YouTube"],
    isBookmarked: true,
    difficulty: "Beginner",
  },

  // Algorithms
  {
    id: "36",
    title: "Algorithms, Part I",
    description: "Princeton University course on fundamental algorithms",
    url: "https://www.coursera.org/learn/algorithms-part1",
    category: "Algorithms",
    subcategory: "Courses",
    rating: 4.8,
    type: "Course",
    tags: ["Algorithms", "Data Structures", "Java"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
  {
    id: "37",
    title: "Algorithms, Part II",
    description: "Advanced algorithms course by Princeton University",
    url: "https://www.coursera.org/learn/algorithms-part2",
    category: "Algorithms",
    subcategory: "Courses",
    rating: 4.8,
    type: "Course",
    tags: ["Algorithms", "Data Structures", "Java"],
    isBookmarked: false,
    difficulty: "Advanced",
  },
  {
    id: "38",
    title: "Algorithms on Graphs",
    description: "UC San Diego course on graph-based algorithms",
    url: "https://www.coursera.org/learn/algorithms-on-graphs",
    category: "Algorithms",
    subcategory: "Courses",
    rating: 4.7,
    type: "Course",
    tags: ["Graphs", "Algorithms", "Data Structures"],
    isBookmarked: true,
    difficulty: "Advanced",
  },
  {
    id: "39",
    title: "Awesome Algorithms Repository",
    description: "Curated list of resources for learning algorithms",
    url: "https://github.com/tayllan/awesome-algorithms",
    category: "Algorithms",
    subcategory: "Resources",
    rating: 4.6,
    type: "Code Repository",
    tags: ["Algorithms", "Learning", "Resources"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },

  // General Development
  {
    id: "40",
    title: "freeCodeCamp",
    description: "Open-source codebase and curriculum for learning to code",
    url: "https://github.com/freeCodeCamp/freeCodeCamp",
    category: "General",
    subcategory: "Learning",
    rating: 4.9,
    type: "Code Repository",
    tags: ["Learning", "Fullstack", "Free"],
    isBookmarked: true,
    difficulty: "Beginner",
  },
  {
    id: "41",
    title: "What the f*ck JavaScript?",
    description: "List of funny and tricky JavaScript examples",
    url: "https://github.com/denysdovhan/wtfjs",
    category: "General",
    subcategory: "JavaScript",
    rating: 4.7,
    type: "Code Repository",
    tags: ["JavaScript", "Learning", "Examples"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },
  {
    id: "42",
    title: "Every Programmer Should Know",
    description: "Technical knowledge every developer should know",
    url: "https://github.com/mtdvio/every-programmer-should-know",
    category: "General",
    subcategory: "Resources",
    rating: 4.8,
    type: "Code Repository",
    tags: ["Development", "Knowledge", "Resources"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
  {
    id: "43",
    title: "DSA Bootcamp Java",
    description: "Java data structures and algorithms bootcamp",
    url: "https://github.com/kunal-kushwaha/DSA-Bootcamp-Java",
    category: "General",
    subcategory: "Data Structures",
    rating: 4.7,
    type: "Code Repository",
    tags: ["Java", "Data Structures", "Algorithms"],
    isBookmarked: false,
    difficulty: "Intermediate",
  },
  {
    id: "44",
    title: "Awesome Cheatsheets",
    description: "Cheat sheets for programming languages and tools",
    url: "https://github.com/LeCoupa/awesome-cheatsheets",
    category: "General",
    subcategory: "Reference",
    rating: 4.8,
    type: "Code Repository",
    tags: ["Cheat Sheets", "Programming", "Tools"],
    isBookmarked: true,
    difficulty: "Beginner",
  },
  {
    id: "45",
    title: "AI Fullstack Developer Roadmap",
    description: "6-month roadmap to become an AI-powered fullstack developer",
    url: "",
    category: "General",
    subcategory: "Learning Path",
    rating: 4.9,
    type: "Roadmap",
    tags: ["AI", "Fullstack", "Roadmap"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
  {
    id: "46",
    title: "Resume Format Guide",
    description: "Structured guide for creating an effective developer resume",
    url: "",
    category: "General",
    subcategory: "Career",
    rating: 4.6,
    type: "Guide",
    tags: ["Resume", "Career", "Job Search"],
    isBookmarked: false,
    difficulty: "Beginner",
  },
  {
    id: "47",
    title: "JavaScript Questions",
    description: "Comprehensive list of JavaScript interview questions",
    url: "",
    category: "General",
    subcategory: "Interview Prep",
    rating: 4.7,
    type: "Guide",
    tags: ["JavaScript", "Interview", "Questions"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
  {
    id: "48",
    title: "Big Tech Tech Stack",
    description: "Overview of tech stacks used by major tech companies",
    url: "",
    category: "General",
    subcategory: "Reference",
    rating: 4.6,
    type: "Guide",
    tags: ["Tech Stack", "Big Tech", "Reference"],
    isBookmarked: false,
    difficulty: "Beginner",
  },
  {
    id: "49",
    title: "40+ Cheat Sheets for Developers",
    description: "Comprehensive list of cheat sheets for various technologies",
    url: "https://htmlcheatsheet.com",
    category: "General",
    subcategory: "Reference",
    rating: 4.8,
    type: "Cheat Sheet",
    tags: ["Cheat Sheets", "Programming", "Reference"],
    isBookmarked: true,
    difficulty: "Beginner",
  },
  {
    id: "50",
    title: "Retail Sales Dataset Guide",
    description: "Guide for setting up and analyzing a retail sales dataset with SQL",
    url: "https://drive.google.com/file/d/1OyUpe_EPnN_9-o5qwVJh_1wVnh-8M7TC/view?usp=sharing",
    category: "Backend",
    subcategory: "Database",
    rating: 4.7,
    type: "Guide",
    tags: ["SQL", "Dataset", "Analysis"],
    isBookmarked: true,
    difficulty: "Intermediate",
  },
];

const categories = [
  {
    id: "Frontend",
    label: "Frontend",
    count: resources.filter((r) => r.category === "Frontend").length,
  },
  {
    id: "Backend",
    label: "Backend",
    count: resources.filter((r) => r.category === "Backend").length,
  },
  {
    id: "DevOps",
    label: "DevOps",
    count: resources.filter((r) => r.category === "DevOps").length,
  },
  {
    id: "AI",
    label: "AI",
    count: resources.filter((r) => r.category === "AI").length,
  },
  {
    id: "Algorithms",
    label: "Algorithms",
    count: resources.filter((r) => r.category === "Algorithms").length,
  },
  {
    id: "General",
    label: "General",
    count: resources.filter((r) => r.category === "General").length,
  },
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [resourceList, setResourceList] = useState<Resource[]>(resources);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredResources = resourceList.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory = resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (id: string) => {
    setResourceList((prev) =>
      prev.map((resource) =>
        resource.id === id
          ? { ...resource, isBookmarked: !resource.isBookmarked }
          : resource
      )
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Documentation":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Tool":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Library":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Tutorial":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Course":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      case "Article":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Cheat Sheet":
        return "bg-teal-500/10 text-teal-500 border-teal-500/20";
      case "Roadmap":
        return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
      case "Code Repository":
        return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
      case "Guide":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
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

  const deleteResource = (id: string) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      setResourceList((prev) => prev.filter((resource) => resource.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Resources Hub</h1>
            <p className="text-muted-foreground">
              Curated collection of development resources and tools
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              aria-label="Import resources"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".json";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      try {
                        const importedData = JSON.parse(
                          event.target?.result as string
                        );
                        if (
                          Array.isArray(importedData) &&
                          importedData.every(
                            (item) =>
                              item.id &&
                              item.title &&
                              item.description &&
                              item.url &&
                              item.category &&
                              item.subcategory &&
                              item.rating >= 0 &&
                              item.rating <= 5 &&
                              item.type &&
                              Array.isArray(item.tags) &&
                              typeof item.isBookmarked === "boolean" &&
                              ["Beginner", "Intermediate", "Advanced"].includes(
                                item.difficulty
                              )
                          )
                        ) {
                          setResourceList((prev) => [
                            ...prev,
                            ...importedData.map((item) => ({
                              ...item,
                              id: uuidv4(),
                            })),
                          ]);
                          alert("Resources imported successfully!");
                        } else {
                          throw new Error("Invalid resource format");
                        }
                      } catch (error) {
                        alert(
                          "Error importing resources. Please ensure the file is a valid JSON with correct resource structure."
                        );
                      }
                    };
                    reader.readAsText(file);
                  }
                };
                input.click();
              }}
            >
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button
              variant="outline"
              size="sm"
              aria-label="Export resources"
              onClick={() => {
                const dataStr = JSON.stringify(resourceList, null, 2);
                const timestamp = new Date()
                  .toISOString()
                  .replace(/[:.]/g, "-");
                const dataUri =
                  "data:application/json;charset=utf-8," +
                  encodeURIComponent(dataStr);
                const exportFileDefaultName = `resources_export_${timestamp}.json`;
                const linkElement = document.createElement("a");
                linkElement.setAttribute("href", dataUri);
                linkElement.setAttribute("download", exportFileDefaultName);
                document.body.appendChild(linkElement);
                linkElement.click();
                document.body.removeChild(linkElement);
              }}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              aria-label="Create new resource"
              onClick={() => {
                const newResource: Resource = {
                  id: uuidv4(),
                  title: "New Resource",
                  description: "Add your resource description here",
                  url: "",
                  category: "General",
                  subcategory: "Resources",
                  rating: 0,
                  type: "Guide",
                  tags: ["new"],
                  isBookmarked: false,
                  difficulty: "Beginner",
                };
                setResourceList((prev) => [newResource, ...prev]);
                alert("New resource created! You can now edit it.");
              }}
            >
              <Plus className="h-4 w-4" />
              New Resource
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-2"
            >
              {category.label}
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex gap-2 mt-4">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            aria-label="Switch to grid view"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            aria-label="Switch to list view"
            onClick={() => setViewMode("list")}
          >
            List
          </Button>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="group hover:shadow-lg transition-all duration-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                          {resource.title}
                          <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {resource.description}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(resource.id)}
                        className="shrink-0"
                        aria-label={
                          resource.isBookmarked
                            ? "Remove from bookmarks"
                            : "Add to bookmarks"
                        }
                      >
                        <Bookmark
                          className={`h-4 w-4 ${
                            resource.isBookmarked
                              ? "fill-primary text-primary"
                              : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Type and Difficulty */}
                    <div className="flex gap-2">
                      <Badge className={getTypeColor(resource.type)}>
                        {resource.type}
                      </Badge>
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Rating and URL */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{resource.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                        {resource.url.replace("https://", "")}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleBookmark(resource.id)}
                        className="flex-1"
                        aria-label={
                          resource.isBookmarked
                            ? "Remove from bookmarks"
                            : "Bookmark resource"
                        }
                      >
                        <Star
                          className={`h-4 w-4 ${
                            resource.isBookmarked
                              ? "fill-yellow-400 text-yellow-400"
                              : ""
                          }`}
                        />
                        {resource.isBookmarked ? "Bookmarked" : "Bookmark"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          alert(
                            `Added "${resource.title}" to your reading list!\n\nType: ${resource.type}\nDifficulty: ${resource.difficulty}\nDescription: ${resource.description}\nURL: ${resource.url}\n\nThis would typically be saved to your personal collection or learning tracker.`
                          );
                        }}
                        aria-label="Add to reading list"
                      >
                        <Plus className="h-4 w-4" />
                        Add to List
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(resource.url, "_blank")}
                        disabled={!resource.url}
                        aria-label="Visit resource"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteResource(resource.id)}
                        aria-label={`Delete ${resource.title}`}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  No resources found matching your search.
                </div>
                <Button
                  className="mt-4"
                  aria-label="Create new resource"
                  onClick={() => {
                    const newResource: Resource = {
                      id: uuidv4(),
                      title: "New Resource",
                      description: "Add your resource description here",
                      url: "",
                      category: "General",
                      subcategory: "Resources",
                      rating: 0,
                      type: "Guide",
                      tags: ["new"],
                      isBookmarked: false,
                      difficulty: "Beginner",
                    };
                    setResourceList((prev) => [newResource, ...prev]);
                    alert("New resource created! You can now edit it.");
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Create New Resource
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {resourceList.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Resources</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {resourceList.filter((r) => r.isBookmarked).length}
            </div>
            <div className="text-sm text-muted-foreground">Bookmarked</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {categories.length}
            </div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {resourceList.reduce((sum, r) => sum + r.rating, 0).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Rating</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

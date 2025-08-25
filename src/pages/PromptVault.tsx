import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Search,
  Plus,
  Filter,
  Star,
  Download,
  Upload,
  Copy,
  Eye,
  Heart,
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

interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  rating: number;
  uses: number;
  isFavorite: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  model: string[];
}

const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "React Component Generator",
    description: "Generate clean, typed React components with props interface",
    content:
      "Create a React TypeScript component named {componentName} that {functionality}. Include proper prop types, documentation, and follow best practices for {useCase}.",
    category: "Development",
    tags: ["React", "TypeScript", "Components"],
    rating: 4.8,
    uses: 1250,
    isFavorite: true,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "2",
    title: "API Documentation Writer",
    description: "Generate comprehensive API documentation",
    content:
      "Write detailed API documentation for {endpoint} including request/response examples, error codes, authentication requirements, and rate limiting information.",
    category: "Documentation",
    tags: ["API", "Documentation", "Backend"],
    rating: 4.6,
    uses: 890,
    isFavorite: false,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "3",
    title: "Database Schema Designer",
    description: "Design optimized database schemas with relationships",
    content:
      "Design a database schema for {projectType} with the following entities: {entities}. Include proper relationships, indexes, constraints, and consider scalability for {expectedLoad}.",
    category: "Database",
    tags: ["Database", "SQL", "Schema Design"],
    rating: 4.9,
    uses: 654,
    isFavorite: true,
    difficulty: "Advanced",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "4",
    title: "Code Review Assistant",
    description: "Comprehensive code review with suggestions",
    content:
      "Review this {language} code for {codeType}. Check for: security vulnerabilities, performance issues, code quality, best practices, and maintainability. Provide specific improvement suggestions.",
    category: "Development",
    tags: ["Code Review", "Security", "Performance"],
    rating: 4.7,
    uses: 2100,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "5",
    title: "Marketing Copy Creator",
    description: "Generate compelling marketing copy for products",
    content:
      "Create engaging marketing copy for {productType} targeting {audience}. Include: headline, value proposition, key benefits, call-to-action. Tone: {tone}. Length: {length}.",
    category: "Marketing",
    tags: ["Marketing", "Copywriting", "Content"],
    rating: 4.5,
    uses: 987,
    isFavorite: true,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "6",
    title: "Resume Optimization Prompt",
    description: "Optimize a resume for ATS compatibility",
    content:
      "Optimize a resume for a {jobTitle} role at {companyName}. Include ATS-friendly keywords, quantify achievements with metrics, and align with {industry} standards. Ensure a one-page format.",
    category: "Resume",
    tags: ["Resume", "ATS", "Optimization"],
    rating: 4.7,
    uses: 850,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "7",
    title: "Cover Letter Generator",
    description: "Create a tailored cover letter for a job application",
    content:
      "Generate a cover letter for a {jobTitle} position at {companyName}. Highlight {skill1}, {skill2}, and {achievement}. Use a professional tone, align with {companyValues}, and include a call-to-action.",
    category: "Resume",
    tags: ["Cover Letter", "Job Application", "Professional"],
    rating: 4.6,
    uses: 720,
    isFavorite: true,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "8",
    title: "LinkedIn Profile Enhancer",
    description: "Enhance a LinkedIn profile for job opportunities",
    content:
      "Optimize a LinkedIn profile for a {jobRole} in {industry}. Include a keyword-rich headline, a compelling about section with {years} years of experience, and showcase {skill1}, {skill2}. Add a recruiter pitch.",
    category: "Networking",
    tags: ["LinkedIn", "Networking", "Profile"],
    rating: 4.8,
    uses: 600,
    isFavorite: true,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "9",
    title: "Job Description Analyzer",
    description: "Analyze and extract key requirements from job descriptions",
    content:
      "Analyze a job description for {jobTitle} at {companyName}. Extract key skills, qualifications, and responsibilities. Suggest matching experiences and keywords for a resume or cover letter.",
    category: "Jobs",
    tags: ["Job Description", "Analysis", "Keywords"],
    rating: 4.5,
    uses: 950,
    isFavorite: false,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "10",
    title: "Interview Question Generator",
    description: "Generate technical interview questions",
    content:
      "Generate {number} technical interview questions for a {jobRole} position focusing on {topic}. Include difficulty levels: {levels}. Provide sample answers for each question.",
    category: "Interview",
    tags: ["Interview", "Technical", "Questions"],
    rating: 4.7,
    uses: 1100,
    isFavorite: true,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "11",
    title: "Mock Interview Script",
    description: "Create a mock interview script for practice",
    content:
      "Create a mock interview script for a {jobRole} position. Include {number} questions covering technical skills, behavioral aspects, and {specificTopic}. Provide expected answers and follow-ups.",
    category: "Interview",
    tags: ["Mock Interview", "Practice", "Script"],
    rating: 4.6,
    uses: 800,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "12",
    title: "Skill Assessment Prompt",
    description: "Generate a skill assessment test",
    content:
      "Design a skill assessment test for {skillType} with {number} questions. Include multiple-choice, coding problems, and short answers. Target {difficultyLevel} users and provide scoring guidelines.",
    category: "Skills",
    tags: ["Skill Assessment", "Test", "Learning"],
    rating: 4.8,
    uses: 700,
    isFavorite: true,
    difficulty: "Advanced",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "13",
    title: "Portfolio Project Description",
    description: "Generate a detailed project description for a portfolio",
    content:
      "Create a project description for a {projectType} portfolio entry. Include project name, overview, technologies used ({tech1}, {tech2}), challenges overcome, and impact. Target {audience}.",
    category: "Portfolio",
    tags: ["Portfolio", "Project", "Description"],
    rating: 4.7,
    uses: 650,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "14",
    title: "Networking Email Template",
    description: "Craft a professional networking email",
    content:
      "Write a networking email to connect with a {role} at {companyName}. Include a personalized introduction, reason for connection ({purpose}), and a polite call-to-action. Keep it under 150 words.",
    category: "Networking",
    tags: ["Networking", "Email", "Professional"],
    rating: 4.5,
    uses: 900,
    isFavorite: true,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude"],
  },
];

const categories = [
  "All",
  "Development",
  "Documentation",
  "Database",
  "Marketing",
  "Design",
  "SEO",
  "Analytics",
  "Resume",
  "Jobs",
  "Interview",
  "Skills",
  "Portfolio",
  "Networking",
];

export default function PromptVault() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [prompts, setPrompts] = useState<Prompt[]>(samplePrompts);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setPrompts((prev) =>
      prev.map((prompt) =>
        prompt.id === id
          ? { ...prompt, isFavorite: !prompt.isFavorite }
          : prompt
      )
    );
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => alert("Prompt copied to clipboard!"))
      .catch((err) =>
        alert("Failed to copy to clipboard: " + err.message)
      );
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

  const deletePrompt = (id: string) => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      setPrompts((prev) => prev.filter((prompt) => prompt.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Prompt Vault</h1>
            <p className="text-muted-foreground">
              Curated collection of AI prompts for developers
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              aria-label="Import prompts"
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
                              item.content &&
                              item.category &&
                              Array.isArray(item.tags) &&
                              item.rating >= 0 &&
                              item.rating <= 5 &&
                              item.uses >= 0 &&
                              typeof item.isFavorite === "boolean" &&
                              ["Beginner", "Intermediate", "Advanced"].includes(
                                item.difficulty
                              ) &&
                              Array.isArray(item.model)
                          )
                        ) {
                          setPrompts((prev) => [
                            ...prev,
                            ...importedData.map((item) => ({
                              ...item,
                              id: uuidv4(), // Ensure unique IDs
                            })),
                          ]);
                          alert("Prompts imported successfully!");
                        } else {
                          throw new Error("Invalid prompt format");
                        }
                      } catch (error) {
                        alert(
                          "Error importing prompts. Please ensure the file is a valid JSON with correct prompt structure."
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
              aria-label="Export prompts"
              onClick={() => {
                const dataStr = JSON.stringify(prompts, null, 2);
                const timestamp = new Date()
                  .toISOString()
                  .replace(/[:.]/g, "-");
                const dataUri =
                  "data:application/json;charset=utf-8," +
                  encodeURIComponent(dataStr);
                const exportFileDefaultName = `prompts_export_${timestamp}.json`;
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
              size="sm"
              aria-label="Create new prompt"
              onClick={() => {
                const newPrompt: Prompt = {
                  id: uuidv4(),
                  title: "New Prompt",
                  description: "Add your prompt description here",
                  content: "Your prompt content goes here...",
                  category: "Development",
                  tags: ["new"],
                  rating: 0,
                  uses: 0,
                  isFavorite: false,
                  difficulty: "Beginner",
                  model: ["GPT-4"],
                };
                setPrompts((prev) => [newPrompt, ...prev]);
                alert("New prompt created! You can now edit it.");
              }}
            >
              <Plus className="h-4 w-4" />
              New Prompt
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" aria-label="Filter prompts">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
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
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            aria-label={`Select ${category} category`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{prompts.length}</div>
            <div className="text-sm text-muted-foreground">Total Prompts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {prompts.filter((p) => p.isFavorite).length}
            </div>
            <div className="text-sm text-muted-foreground">Favorites</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {categories.length - 1}
            </div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {prompts.reduce((sum, p) => sum + p.uses, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Uses</div>
          </CardContent>
        </Card>
      </div>

      {/* Prompts Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredPrompts.map((prompt) => (
          <Card
            key={prompt.id}
            className="group hover:shadow-lg transition-all duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {prompt.title}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {prompt.description}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={
                    prompt.isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  onClick={() => toggleFavorite(prompt.id)}
                  className="shrink-0"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      prompt.isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Content Preview */}
              <div className="p-3 bg-muted/30 rounded-md text-sm font-mono text-muted-foreground line-clamp-3">
                {prompt.content}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {prompt.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(prompt.difficulty)}>
                    {prompt.difficulty}
                  </Badge>
                  <span className="text-muted-foreground">
                    {prompt.uses} uses
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{prompt.rating}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Copy prompt to clipboard"
                  onClick={() => copyToClipboard(prompt.content)}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="View prompt details"
                  onClick={() => {
                    alert(
                      `Prompt: ${prompt.title}\n\nDescription: ${
                        prompt.description
                      }\n\nContent: ${prompt.content}\n\nCategory: ${
                        prompt.category
                      }\nDifficulty: ${
                        prompt.difficulty
                      }\nModel: ${prompt.model.join(
                        ", "
                      )}\nTags: ${prompt.tags.join(", ")}\nRating: ${
                        prompt.rating
                      }\nUses: ${prompt.uses}`
                    );
                  }}
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  aria-label={`Delete ${prompt.title}`}
                  onClick={() => deletePrompt(prompt.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            No prompts found matching your criteria.
          </div>
          <Button className="mt-4" aria-label="Create new prompt">
            <Plus className="h-4 w-4" />
            Create New Prompt
          </Button>
        </div>
      )}
    </div>
  );
}
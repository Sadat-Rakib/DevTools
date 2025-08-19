import { useState } from "react";
import { Search, Plus, Filter, Star, Download, Upload, Copy, Eye, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  model: string[];
}

const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "React Component Generator",
    description: "Generate clean, typed React components with props interface",
    content: "Create a React TypeScript component named {componentName} that {functionality}. Include proper prop types, documentation, and follow best practices for {useCase}.",
    category: "Development",
    tags: ["React", "TypeScript", "Components"],
    rating: 4.8,
    uses: 1250,
    isFavorite: true,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude", "Gemini"]
  },
  {
    id: "2",
    title: "API Documentation Writer",
    description: "Generate comprehensive API documentation",
    content: "Write detailed API documentation for {endpoint} including request/response examples, error codes, authentication requirements, and rate limiting information.",
    category: "Documentation",
    tags: ["API", "Documentation", "Backend"],
    rating: 4.6,
    uses: 890,
    isFavorite: false,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude"]
  },
  {
    id: "3",
    title: "Database Schema Designer",
    description: "Design optimized database schemas with relationships",
    content: "Design a database schema for {projectType} with the following entities: {entities}. Include proper relationships, indexes, constraints, and consider scalability for {expectedLoad}.",
    category: "Database",
    tags: ["Database", "SQL", "Schema Design"],
    rating: 4.9,
    uses: 654,
    isFavorite: true,
    difficulty: "Advanced",
    model: ["GPT-4", "Claude", "Gemini"]
  },
  {
    id: "4",
    title: "Code Review Assistant",
    description: "Comprehensive code review with suggestions",
    content: "Review this {language} code for {codeType}. Check for: security vulnerabilities, performance issues, code quality, best practices, and maintainability. Provide specific improvement suggestions.",
    category: "Development",
    tags: ["Code Review", "Security", "Performance"],
    rating: 4.7,
    uses: 2100,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude"]
  },
  {
    id: "5",
    title: "Marketing Copy Creator",
    description: "Generate compelling marketing copy for products",
    content: "Create engaging marketing copy for {productType} targeting {audience}. Include: headline, value proposition, key benefits, call-to-action. Tone: {tone}. Length: {length}.",
    category: "Marketing",
    tags: ["Marketing", "Copywriting", "Content"],
    rating: 4.5,
    uses: 987,
    isFavorite: true,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude", "Gemini"]
  }
];

const categories = ["All", "Development", "Documentation", "Database", "Marketing", "Design", "SEO", "Analytics"];

export default function PromptVault() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [prompts, setPrompts] = useState<Prompt[]>(samplePrompts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setPrompts(prev => prev.map(prompt => 
      prompt.id === id ? { ...prompt, isFavorite: !prompt.isFavorite } : prompt
    ));
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
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
            <h1 className="text-3xl font-bold">Prompt Vault</h1>
            <p className="text-muted-foreground">Curated collection of AI prompts for developers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
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
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
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
            <div className="text-2xl font-bold text-primary">{prompts.filter(p => p.isFavorite).length}</div>
            <div className="text-sm text-muted-foreground">Favorites</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{prompts.reduce((sum, p) => sum + p.uses, 0)}</div>
            <div className="text-sm text-muted-foreground">Total Uses</div>
          </CardContent>
        </Card>
      </div>

      {/* Prompts Grid/List */}
      <div className={viewMode === 'grid' ? 
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
        "space-y-4"
      }>
        {filteredPrompts.map((prompt) => (
          <Card key={prompt.id} className="group hover:shadow-lg transition-all duration-200">
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
                  onClick={() => toggleFavorite(prompt.id)}
                  className="shrink-0"
                >
                  <Heart className={`h-4 w-4 ${prompt.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
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
                  onClick={() => copyToClipboard(prompt.content)}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No prompts found matching your criteria.</div>
          <Button className="mt-4">
            <Plus className="h-4 w-4" />
            Create New Prompt
          </Button>
        </div>
      )}
    </div>
  );
}
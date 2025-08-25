import { useState } from "react";
import {
  Search,
  ExternalLink,
  Star,
  Filter,
  Bookmark,
  Share,
  Plus,
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
    | "Article";
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
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [resourceList, setResourceList] = useState<Resource[]>(resources);

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
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4" />
              Share
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
        <TabsList className="grid w-full grid-cols-3">
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

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <Badge
                        className={getDifficultyColor(resource.difficulty)}
                      >
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
                            `Added "${resource.title}" to your reading list!\n\nType: ${resource.type}\nDifficulty: ${resource.difficulty}\nDescription: ${resource.description}\n\nThis would typically be saved to your personal collection or learning tracker.`
                          );
                        }}
                      >
                        <Plus className="h-4 w-4" />
                        Add to List
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(resource.url, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit
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
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

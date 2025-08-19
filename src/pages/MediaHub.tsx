import { useState } from "react";
import { Search, Image, Video, Music, Palette, Download, ExternalLink, Star, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MediaTool {
  id: string;
  title: string;
  description: string;
  category: 'Image' | 'Video' | 'Audio' | 'Design';
  subcategory: string;
  type: 'Generator' | 'Editor' | 'Converter' | 'Optimizer' | 'Library';
  rating: number;
  isPremium: boolean;
  url: string;
  tags: string[];
  features: string[];
}

const mediaTools: MediaTool[] = [
  // Image Tools
  {
    id: "1",
    title: "DALL-E 3",
    description: "AI-powered image generation with natural language prompts",
    category: "Image",
    subcategory: "AI Generation",
    type: "Generator",
    rating: 4.8,
    isPremium: true,
    url: "https://openai.com/dall-e-3",
    tags: ["AI", "Generation", "Creative"],
    features: ["Text-to-image", "High resolution", "Multiple styles", "Commercial use"]
  },
  {
    id: "2",
    title: "Unsplash",
    description: "High-quality stock photos from talented photographers worldwide",
    category: "Image",
    subcategory: "Stock Photos",
    type: "Library",
    rating: 4.9,
    isPremium: false,
    url: "https://unsplash.com",
    tags: ["Stock", "Photography", "Free"],
    features: ["Free photos", "High resolution", "Commercial use", "API access"]
  },
  {
    id: "3",
    title: "Photopea",
    description: "Advanced image editor that works in your browser, similar to Photoshop",
    category: "Image",
    subcategory: "Photo Editing",
    type: "Editor",
    rating: 4.7,
    isPremium: false,
    url: "https://photopea.com",
    tags: ["Editor", "Photoshop", "Browser"],
    features: ["Layer support", "PSD files", "Advanced tools", "Free to use"]
  },
  {
    id: "4",
    title: "TinyPNG",
    description: "Smart PNG and JPEG compression to reduce file sizes",
    category: "Image",
    subcategory: "Optimization",
    type: "Optimizer",
    rating: 4.6,
    isPremium: false,
    url: "https://tinypng.com",
    tags: ["Compression", "Optimization", "PNG", "JPEG"],
    features: ["Lossless compression", "Batch processing", "API available", "Web optimization"]
  },
  {
    id: "5",
    title: "Canva",
    description: "Graphic design platform with templates for social media, presentations, and more",
    category: "Image",
    subcategory: "Graphic Design",
    type: "Editor",
    rating: 4.5,
    isPremium: true,
    url: "https://canva.com",
    tags: ["Design", "Templates", "Social Media"],
    features: ["Drag-and-drop", "Templates", "Team collaboration", "Brand kits"]
  },

  // Video Tools
  {
    id: "6",
    title: "RunwayML",
    description: "AI-powered video generation and editing tools",
    category: "Video",
    subcategory: "AI Generation",
    type: "Generator",
    rating: 4.7,
    isPremium: true,
    url: "https://runwayml.com",
    tags: ["AI", "Video Generation", "Machine Learning"],
    features: ["Text-to-video", "Video editing", "Motion graphics", "Green screen"]
  },
  {
    id: "7",
    title: "DaVinci Resolve",
    description: "Professional video editing, color correction, and audio post-production",
    category: "Video",
    subcategory: "Video Editing",
    type: "Editor",
    rating: 4.8,
    isPremium: false,
    url: "https://blackmagicdesign.com/products/davinciresolve",
    tags: ["Professional", "Editing", "Color Grading"],
    features: ["Professional editing", "Color correction", "Audio editing", "Free version"]
  },
  {
    id: "8",
    title: "Loom",
    description: "Screen recording and video messaging for work",
    category: "Video",
    subcategory: "Screen Recording",
    type: "Generator",
    rating: 4.6,
    isPremium: true,
    url: "https://loom.com",
    tags: ["Screen Recording", "Work", "Communication"],
    features: ["Quick recording", "Instant sharing", "Transcription", "Analytics"]
  },
  {
    id: "9",
    title: "HandBrake",
    description: "Open-source video transcoder for converting video formats",
    category: "Video",
    subcategory: "Video Processing",
    type: "Converter",
    rating: 4.5,
    isPremium: false,
    url: "https://handbrake.fr",
    tags: ["Conversion", "Compression", "Open Source"],
    features: ["Format conversion", "Batch processing", "Quality presets", "Free software"]
  },

  // Audio Tools
  {
    id: "10",
    title: "Audacity",
    description: "Free, open-source audio editing and recording software",
    category: "Audio",
    subcategory: "Audio Editing",
    type: "Editor",
    rating: 4.4,
    isPremium: false,
    url: "https://audacityteam.org",
    tags: ["Audio Editing", "Recording", "Open Source"],
    features: ["Multi-track editing", "Effects", "Analysis tools", "Cross-platform"]
  },
  {
    id: "11",
    title: "ElevenLabs",
    description: "AI voice generation and cloning with realistic speech synthesis",
    category: "Audio",
    subcategory: "Voice Synthesis",
    type: "Generator",
    rating: 4.8,
    isPremium: true,
    url: "https://elevenlabs.io",
    tags: ["AI", "Voice", "Text-to-Speech"],
    features: ["Voice cloning", "Multi-language", "Realistic speech", "API access"]
  },
  {
    id: "12",
    title: "Adobe Audition",
    description: "Professional audio editing and mixing software",
    category: "Audio",
    subcategory: "Professional Audio",
    type: "Editor",
    rating: 4.6,
    isPremium: true,
    url: "https://adobe.com/products/audition",
    tags: ["Professional", "Adobe", "Audio Production"],
    features: ["Spectral editing", "Multitrack mixing", "Audio restoration", "Integration"]
  },

  // Design Tools
  {
    id: "13",
    title: "Figma",
    description: "Collaborative interface design tool for UI/UX designers",
    category: "Design",
    subcategory: "UI/UX Design",
    type: "Editor",
    rating: 4.9,
    isPremium: true,
    url: "https://figma.com",
    tags: ["UI/UX", "Collaboration", "Prototyping"],
    features: ["Real-time collaboration", "Prototyping", "Design systems", "Developer handoff"]
  },
  {
    id: "14",
    title: "Coolors",
    description: "Color palette generator and color scheme designer",
    category: "Design",
    subcategory: "Color Tools",
    type: "Generator",
    rating: 4.7,
    isPremium: false,
    url: "https://coolors.co",
    tags: ["Colors", "Palette", "Design"],
    features: ["Palette generation", "Color extraction", "Accessibility", "Export options"]
  },
  {
    id: "15",
    title: "Dribbble",
    description: "Design inspiration and portfolio platform for creative professionals",
    category: "Design",
    subcategory: "Inspiration",
    type: "Library",
    rating: 4.5,
    isPremium: true,
    url: "https://dribbble.com",
    tags: ["Inspiration", "Portfolio", "Community"],
    features: ["Design showcase", "Job board", "Community", "Pro features"]
  }
];

const categories = [
  { id: "Image", label: "Image Tools", icon: Image, count: mediaTools.filter(t => t.category === "Image").length },
  { id: "Video", label: "Video Tools", icon: Video, count: mediaTools.filter(t => t.category === "Video").length },
  { id: "Audio", label: "Audio Tools", icon: Music, count: mediaTools.filter(t => t.category === "Audio").length },
  { id: "Design", label: "Design Tools", icon: Palette, count: mediaTools.filter(t => t.category === "Design").length }
];

export default function MediaHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Image");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const filteredTools = mediaTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = tool.category === selectedCategory;
    const matchesPremium = !showPremiumOnly || tool.isPremium;
    return matchesSearch && matchesCategory && matchesPremium;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Generator': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Editor': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Converter': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Optimizer': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Library': return 'bg-pink-500/10 text-pink-500 border-pink-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Media Hub</h1>
            <p className="text-muted-foreground">Image generation, video tools, audio processing, and design resources</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowPremiumOnly(!showPremiumOnly)}>
              <Filter className="h-4 w-4" />
              {showPremiumOnly ? "All Tools" : "Premium Only"}
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search media tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{category.label}</span>
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
                          {tool.isPremium && (
                            <Badge variant="default" className="text-xs">
                              Premium
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
                      <div className="grid grid-cols-2 gap-1 text-xs">
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

                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{tool.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {tool.isPremium ? "Paid" : "Free"}
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
                <div className="text-muted-foreground">No media tools found matching your search.</div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mediaTools.length}</div>
            <div className="text-sm text-muted-foreground">Total Tools</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mediaTools.filter(t => !t.isPremium).length}</div>
            <div className="text-sm text-muted-foreground">Free Tools</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mediaTools.filter(t => t.isPremium).length}</div>
            <div className="text-sm text-muted-foreground">Premium Tools</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{(mediaTools.reduce((sum, t) => sum + t.rating, 0) / mediaTools.length).toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Wrench,
  BookOpen,
  Workflow,
  Image,
  TrendingUp,
  Briefcase,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Code2,
  Hash,
  FileText,
  Clock,
  Lock,
  Database,
  CheckSquare,
  Timer,
  FolderOpen,
  Bot,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useDemo } from "@/contexts/DemoContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const publicNavItems = [
  { title: "Home", href: "/", icon: Home },
  { title: "Pricing", href: "/pricing", icon: CreditCard },
];

const authenticatedNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Pricing", href: "/pricing", icon: CreditCard },
];

const toolCategories = [
  {
    title: "Text & Data",
    tools: [
      { title: "JSON Viewer", href: "/tools/json-viewer", icon: Code2 },
      { title: "Base64 Converter", href: "/tools/base64", icon: FileText },
      { title: "Hash Generator", href: "/tools/hash", icon: Hash },
      { title: "UUID Generator", href: "/tools/uuid", icon: Lock },
    ]
  },
  {
    title: "Productivity",
    tools: [
      { title: "Todo Manager", href: "/tools/todo", icon: CheckSquare },
      { title: "Pomodoro Timer", href: "/tools/pomodoro", icon: Timer },
    ]
  },
  {
    title: "Utilities",
    tools: [
      { title: "Timestamp Converter", href: "/tools/timestamp", icon: Clock },
      { title: "SQL Formatter", href: "/tools/sql-formatter", icon: Database },
    ]
  }
];

const hubItems = [
  { title: "Prompt Vault", href: "/prompts", icon: BookOpen },
  { title: "Resources", href: "/resources", icon: Wrench },
  { title: "Workflows", href: "/workflows", icon: Workflow },
  { title: "Assets Library", href: "/assets", icon: FolderOpen },
  { title: "AI Assistant", href: "/ai-assistant", icon: Bot },
  { title: "Media Hub", href: "/media", icon: Image },
  { title: "Marketing Hub", href: "/marketing", icon: TrendingUp },
  { title: "Career Hub", href: "/career", icon: Briefcase },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { user } = useDemo();
  const [openCategories, setOpenCategories] = useState<string[]>(["Text & Data", "Productivity"]);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const isActiveLink = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <nav className="h-full overflow-y-auto p-4 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-2">
            {(user ? authenticatedNavItems : publicNavItems).map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "nav-link",
                  isActiveLink(item.href) && "nav-link-active"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </NavLink>
            ))}
          </div>

          {/* Core Tools */}
          <div>
            <h3 className="px-3 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Core Tools
            </h3>
            <div className="space-y-1">
              {toolCategories.map((category) => (
                <Collapsible
                  key={category.title}
                  open={openCategories.includes(category.title)}
                  onOpenChange={() => toggleCategory(category.title)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-sm font-medium h-8 px-3"
                    >
                      {category.title}
                      {openCategories.includes(category.title) ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-3 space-y-1">
                    {category.tools.map((tool) => (
                      <NavLink
                        key={tool.href}
                        to={tool.href}
                        onClick={onClose}
                        className={cn(
                          "nav-link text-sm",
                          isActiveLink(tool.href) && "nav-link-active"
                        )}
                      >
                        <tool.icon className="h-3 w-3" />
                        {tool.title}
                      </NavLink>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Hubs */}
          {user && (
            <div>
              <h3 className="px-3 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Hubs
              </h3>
              <div className="space-y-1">
                {hubItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "nav-link",
                      isActiveLink(item.href) && "nav-link-active"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
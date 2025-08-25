import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { DemoProvider } from "@/contexts/DemoContext";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import DemoDashboard from "./pages/DemoDashboard";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import ContactSales from "./pages/ContactSales";
import JsonViewerPage from "./pages/tools/JsonViewerPage";
import Base64Page from "./pages/tools/Base64Page";
import UuidPage from "./pages/tools/UuidPage";
import HashPage from "./pages/tools/HashPage";
import TimestampPage from "./pages/tools/TimestampPage";
import TodoPage from "./pages/tools/TodoPage";
import PomodoroPage from "./pages/tools/PomodoroPage";
import SqlFormatterPage from "./pages/tools/SqlFormatterPage";
import AIAssistantPage from "./pages/AIAssistant";
import AssetsLibraryPage from "./pages/AssetsLibrary";
import PromptVault from "./pages/PromptVault";
import Resources from "./pages/Resources";
import Workflows from "./pages/Workflows";
import MediaHub from "./pages/MediaHub";
import MarketingHub from "./pages/MarketingHub";
import CareerHub from "./pages/CareerHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DemoProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact-sales" element={<ContactSales />} />
            
            {/* Demo dashboard */}
            <Route path="/demo-dashboard" element={<Layout><DemoDashboard /></Layout>} />
            
            {/* App routes - no authentication required */}
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/billing" element={<Layout><Billing /></Layout>} />
            
            <Route path="/tools/json-viewer" element={<Layout><JsonViewerPage /></Layout>} />
            <Route path="/tools/base64" element={<Layout><Base64Page /></Layout>} />
            <Route path="/tools/uuid" element={<Layout><UuidPage /></Layout>} />
            <Route path="/tools/hash" element={<Layout><HashPage /></Layout>} />
            <Route path="/tools/timestamp" element={<Layout><TimestampPage /></Layout>} />
            <Route path="/tools/todo" element={<Layout><TodoPage /></Layout>} />
            <Route path="/tools/pomodoro" element={<Layout><PomodoroPage /></Layout>} />
            <Route path="/tools/sql-formatter" element={<Layout><SqlFormatterPage /></Layout>} />
            
            <Route path="/ai-assistant" element={<Layout><AIAssistantPage /></Layout>} />
            <Route path="/assets" element={<Layout><AssetsLibraryPage /></Layout>} />
            <Route path="/prompts" element={<Layout><PromptVault /></Layout>} />
            <Route path="/resources" element={<Layout><Resources /></Layout>} />
            <Route path="/workflows" element={<Layout><Workflows /></Layout>} />
            <Route path="/media" element={<Layout><MediaHub /></Layout>} />
            <Route path="/marketing" element={<Layout><MarketingHub /></Layout>} />
            <Route path="/career" element={<Layout><CareerHub /></Layout>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DemoProvider>
  </QueryClientProvider>
);

export default App;
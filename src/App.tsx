import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import JsonViewerPage from "./pages/tools/JsonViewerPage";
import Base64Page from "./pages/tools/Base64Page";
import UuidPage from "./pages/tools/UuidPage";
import HashPage from "./pages/tools/HashPage";
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/tools/json-viewer" element={<JsonViewerPage />} />
            <Route path="/tools/base64" element={<Base64Page />} />
            <Route path="/tools/uuid" element={<UuidPage />} />
            <Route path="/tools/hash" element={<HashPage />} />
            <Route path="/prompts" element={<PromptVault />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/media" element={<MediaHub />} />
            <Route path="/marketing" element={<MarketingHub />} />
            <Route path="/career" element={<CareerHub />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

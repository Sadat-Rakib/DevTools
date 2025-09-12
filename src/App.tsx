import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { DemoProvider } from "@/contexts/DemoContext"; // Add this import

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <DemoProvider> {/* Add DemoProvider here */}
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact-sales" element={<ContactSales />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout><Dashboard /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Layout><Profile /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout><Settings /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/billing"
                element={
                  <ProtectedRoute>
                    <Layout><Billing /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tools/json-viewer"
                element={
                  <ProtectedRoute>
                    <Layout><JsonViewerPage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tools/base64"
                element={
                  <ProtectedRoute>
                    <Layout><Base64Page /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tools/uuid"
                element={
                  <ProtectedRoute>
                    <Layout><UuidPage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tools/hash"
                element={
                  <ProtectedRoute>
                    <Layout><HashPage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tools/timestamp"
                element={
                  <ProtectedRoute>
                    <Layout><TimestampPage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tools/todo"
                element={
                  <ProtectedRoute>
                    <Layout><TodoPage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tools/pomodoro"
                element={
                  <ProtectedRoute>
                    <Layout><PomodoroPage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tools/sql-formatter"
                element={
                  <ProtectedRoute>
                    <Layout><SqlFormatterPage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-assistant"
                element={
                  <ProtectedRoute>
                    <Layout><AIAssistantPage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assets"
                element={
                  <ProtectedRoute>
                    <Layout><AssetsLibraryPage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prompts"
                element={
                  <ProtectedRoute>
                    <Layout><PromptVault /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resources"
                element={
                  <ProtectedRoute>
                    <Layout><Resources /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workflows"
                element={
                  <ProtectedRoute>
                    <Layout><Workflows /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/media"
                element={
                  <ProtectedRoute>
                    <Layout><MediaHub /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/marketing"
                element={
                  <ProtectedRoute>
                    <Layout><MarketingHub /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/career"
                element={
                  <ProtectedRoute>
                    <Layout><CareerHub /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DemoProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
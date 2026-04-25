import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LocalThreadsProvider } from "@/contexts/LocalThreadsContext";
import { ComfortReadingProvider } from "@/contexts/ComfortReadingContext";
import { BackgroundIntensityProvider } from "@/contexts/BackgroundIntensityContext";
import { HelperGuideBanner } from "@/components/HelperGuideBanner";
import Header from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import Index from "./pages/Index";
import AskQuestion from "./pages/AskQuestion";
import Browse from "./pages/Browse";
import Thread from "./pages/Thread";
import ScamChecker from "./pages/ScamChecker";
import MyPosts from "./pages/MyPosts";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import SafetyHub from "./pages/SafetyHub";

const queryClient = new QueryClient();

const App = () => (
  <BackgroundIntensityProvider>
    <ComfortReadingProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AuthProvider>
            <LocalThreadsProvider>
              <div className="flex min-h-screen flex-col bg-white text-[#2C2C2A]">
                <Header />
                <HelperGuideBanner />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/safety" element={<SafetyHub />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/ask" element={<AskQuestion />} />
                    <Route path="/thread/:id" element={<Thread />} />
                    <Route path="/scam-checker" element={<ScamChecker />} />
                    <Route path="/my-posts" element={<MyPosts />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <SiteFooter />
              </div>
            </LocalThreadsProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ComfortReadingProvider>
  </BackgroundIntensityProvider>
);

export default App;

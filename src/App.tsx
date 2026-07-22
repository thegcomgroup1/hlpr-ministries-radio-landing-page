import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConsentBanner } from "@/components/ConsentBanner";
import { getConsent, subscribeConsent } from "@/lib/consent";
import { loadClarity } from "@/lib/clarity";
import Index from "./pages/Index.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import Radio from "./pages/Radio.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

function isRadioSubdomain() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname.toLowerCase();
  return host === "radio.hlpr.io" || host.startsWith("radio.");
}

const App = () => {
  useEffect(() => {
    if (getConsent() === "accepted") loadClarity();
    return subscribeConsent((s) => {
      if (s === "accepted") loadClarity();
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/radio" element={<Radio />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ConsentBanner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

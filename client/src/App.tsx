import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { AnimatePresence } from "framer-motion";

// Lazy load project detail page for better performance
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetail"));

function Router() {
  const [location] = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    if (!location.includes('#')) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-deep-space">
          <div className="w-20 h-20 rounded-full border-4 border-t-neon-cyan border-r-electric-purple border-b-neon-cyan border-l-electric-purple animate-spin"></div>
        </div>
      }>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/portfolio/:projectId" component={ProjectDetailPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Toaster />
          <Router />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

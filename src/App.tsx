import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CursorGlow from "@/components/CursorGlow";
import { PageTransitionProvider } from "@/components/PageTransitionProvider";

const Index = lazy(() => import("./pages/Index"));
const Host = lazy(() => import("./pages/Host"));
const Agency = lazy(() => import("./pages/Agency"));
const AgencyCase = lazy(() => import("./pages/AgencyCase"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTransitionProvider>
          <CursorGlow />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/host" element={<Host />} />
              <Route path="/agency" element={<Agency />} />
              <Route path="/agency/cases/:slug" element={<AgencyCase />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransitionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

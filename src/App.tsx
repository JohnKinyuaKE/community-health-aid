import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CerviConnect from "@/pages/CerviConnect";
import AIHealthBot from "@/pages/AIHealthBot";
import USSD from "@/pages/USSD";
import CancerWallet from "@/pages/CancerWallet";
import ShujaaStories from "@/pages/ShujaaStories";
import MtaaniWatch from "@/pages/MtaaniWatch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cerviconnect" element={<CerviConnect />} />
              <Route path="/ai-healthbot" element={<AIHealthBot />} />
              <Route path="/ussd" element={<USSD />} />
              <Route path="/cancer-wallet" element={<CancerWallet />} />
              <Route path="/shujaastories" element={<ShujaaStories />} />
              <Route path="/mtaani-watch" element={<MtaaniWatch />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <SiteFooter />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;

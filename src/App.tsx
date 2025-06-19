
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import Chat from "./components/Chat";

const queryClient = new QueryClient();

// Separate component to handle chat route with useParams
const ChatRoute = () => {
  const { profile } = useParams<{ profile: string }>();
  const userProfile = profile ? decodeURIComponent(profile) : localStorage.getItem('userProfile') || 'Le Sensible Silencieux';
  
  return (
    <div className="min-h-screen">
      <Chat profile={userProfile} />
    </div>
  );
};

// Default chat route component
const DefaultChatRoute = () => {
  const userProfile = localStorage.getItem('userProfile') || 'Le Sensible Silencieux';
  
  return (
    <div className="min-h-screen">
      <Chat profile={userProfile} />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat/:profile" element={<ChatRoute />} />
          <Route path="/chat" element={<DefaultChatRoute />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

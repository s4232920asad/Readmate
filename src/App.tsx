import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import AllBooks from "./pages/AllBooks";
import ManageBooks from "./pages/ManageBooks";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "@/hooks/use-auth"; 

const queryClient = new QueryClient();


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth(); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen theme-bg">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Navigation />
                    <Routes>
                      <Route path="/" element={<AllBooks />} />
                      <Route path="/manage" element={<ManageBooks />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </AuthProvider>{" "}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

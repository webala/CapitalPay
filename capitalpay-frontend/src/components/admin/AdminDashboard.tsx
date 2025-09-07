import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "./DashboardLayout";
import DashboardOverview from "./sections/DashboardOverview";
import UserManagement from "./sections/UserManagement";
import MessageManagement from "./sections/MessageManagement";
import BlogManagement from "./sections/BlogManagement";
import LoginModal from "./LoginModal";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Settings: React.FC = () => {
  const { state, logout } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          Account Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Name
            </label>
            <div className="p-3 bg-white/5 rounded-lg text-white">
              {state.user?.name}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Email
            </label>
            <div className="p-3 bg-white/5 rounded-lg text-white">
              {state.user?.email}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Role
            </label>
            <div className="p-3 bg-white/5 rounded-lg text-white capitalize">
              {state.user?.role}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Last Login
            </label>
            <div className="p-3 bg-white/5 rounded-lg text-white">
              {state.user?.lastLogin
                ? new Date(state.user.lastLogin).toLocaleString()
                : "Never"}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          System Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              API Base URL
            </label>
            <div className="p-3 bg-white/5 rounded-lg text-white text-sm">
              {import.meta.env.VITE_API_URL || "http://localhost:5000/api"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Environment
            </label>
            <div className="p-3 bg-white/5 rounded-lg text-white text-sm">
              {import.meta.env.MODE || "development"}
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/20 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Danger Zone</h3>
        <p className="text-white/80 mb-4">
          Once you logout, you'll need to authenticate again to access the
          dashboard.
        </p>
        <Button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

const AdminDashboardContent: React.FC = () => {
  const { state } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hasTriedLogin, setHasTriedLogin] = useState(false);

  useEffect(() => {
    // Only show login modal if user is not authenticated, not loading, and hasn't tried logging in yet
    if (!state.isAuthenticated && !state.isLoading && !hasTriedLogin) {
      setShowLoginModal(true);
    } else if (state.isAuthenticated) {
      setShowLoginModal(false);
      setHasTriedLogin(false); // Reset for future logouts
    }
  }, [state.isAuthenticated, state.isLoading, hasTriedLogin]);

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "users":
        return <UserManagement />;
      case "messages":
        return <MessageManagement />;
      case "blogs":
        return <BlogManagement />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/80">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            CapitalPay Admin Dashboard
          </h1>
          <p className="text-white/80 mb-8">
            Secure access to manage users, blog posts, and contact messages.
          </p>
          <Button
            onClick={() => {
              setShowLoginModal(true);
              setHasTriedLogin(false); // Allow retry
            }}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3"
          >
            {hasTriedLogin ? "Try Again" : "Access Dashboard"}
          </Button>

          <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-sm text-white/60 mb-2">Demo Credentials:</p>
            <p className="text-sm text-white">
              admin@capitalpay.com / admin123
            </p>
          </div>
        </div>

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
            setHasTriedLogin(true); // Mark that user has attempted login
          }}
          onSuccess={() => {
            setShowLoginModal(false);
            setHasTriedLogin(false); // Reset on successful login
          }}
        />
      </div>
    );
  }

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <AuthProvider>
      <AdminDashboardContent />
    </AuthProvider>
  );
};

export default AdminDashboard;

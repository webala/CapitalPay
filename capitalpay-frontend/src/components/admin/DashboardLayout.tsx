import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  FileText,
  LogOut,
  Menu,
  X,
  Settings,
  BarChart3,
  Shield,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeSection,
  onSectionChange,
}) => {
  const { state, logout, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users, adminOnly: true },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "blogs", label: "Blog Posts", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings, adminOnly: true },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !item.adminOnly || isAdmin()
  );

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex  from-blue-900 via-blue-800 to-purple-900">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50 w-fit">
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          size="sm"
        >
          {sidebarOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`
         fixed inset-y-0 left-0 z-40 md:w-64 bg-black/20 backdrop-blur-sm border-r transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">CapitalPay</h1>
                <p className="text-white/60 text-sm">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {state.user?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {state.user?.name}
                </p>
                <p className="text-white/60 text-xs truncate">
                  {state.user?.email}
                </p>
                <div className="flex items-center mt-1">
                  <span
                    className={`
                    px-2 py-0.5 rounded-full text-xs font-medium
                    ${
                      state.user?.role === "admin"
                        ? "bg-red-500/20 text-red-200 border border-red-500/30"
                        : "bg-blue-500/20 text-blue-200 border border-blue-500/30"
                    }
                  `}
                  >
                    {state.user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-pink-500/20 to-red-500/20 text-white border border-pink-500/30"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-white/10">
            <Button
              onClick={handleLogout}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30"
              size="sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="w-full max-w-5xl xl:max-w-7xl min-h-screen ">
        <div className="p-4 lg:p-8 ">
          {/* Header */}
          <div className="mb-8 pt-12  lg:pt-0">
            <h2 className="text-3xl font-bold text-white capitalize">
              {activeSection === "overview"
                ? "Dashboard Overview"
                : activeSection === "users"
                ? "User Management"
                : activeSection === "messages"
                ? "Contact Messages"
                : activeSection === "blogs"
                ? "Blog Management"
                : activeSection === "settings"
                ? "Settings"
                : activeSection}
            </h2>
            <p className="text-white/60 mt-2">
              {activeSection === "overview" &&
                "Welcome to your admin dashboard"}
              {activeSection === "users" &&
                "Manage users, roles, and permissions"}
              {activeSection === "messages" &&
                "View and respond to contact messages"}
              {activeSection === "blogs" && "Create and manage blog posts"}
              {activeSection === "settings" && "Configure dashboard settings"}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

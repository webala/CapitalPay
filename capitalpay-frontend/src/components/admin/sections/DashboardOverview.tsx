import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  MessageSquare,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  UserPlus,
} from "lucide-react";

interface Stats {
  users: {
    total: number;
    active: number;
    new: number;
  };
  messages: {
    total: number;
    unread: number;
    recent: number;
  };
  blogs: {
    total: number;
    published: number;
    drafts: number;
  };
}

const DashboardOverview: React.FC = () => {
  const { state } = useAuth();
  const [stats, setStats] = useState<Stats>({
    users: { total: 0, active: 0, new: 0 },
    messages: { total: 0, unread: 0, recent: 0 },
    blogs: { total: 0, published: 0, drafts: 0 },
  });
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const headers = {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        };

        // Fetch user stats (admin only)
        let userStats = { total: 0, active: 0, new: 0 };
        if (state.user?.role === "admin") {
          try {
            const userResponse = await fetch(`${API_BASE_URL}/users/stats`, {
              headers,
            });
            if (userResponse.ok) {
              const userData = await userResponse.json();
              userStats = {
                total: userData.data.totalUsers || 0,
                active: userData.data.activeUsers || 0,
                new: userData.data.newUsers || 0,
              };
            }
          } catch (error) {
            console.error("Failed to fetch user stats:", error);
          }
        }

        // Fetch message stats
        let messageStats = { total: 0, unread: 0, recent: 0 };
        try {
          const messageResponse = await fetch(`${API_BASE_URL}/contact/stats`, {
            headers,
          });
          if (messageResponse.ok) {
            const messageData = await messageResponse.json();
            messageStats = {
              total: messageData.data.totalCount || 0,
              unread: messageData.data.unreadCount || 0,
              recent: messageData.data.recentCount || 0,
            };
          }
        } catch (error) {
          console.error("Failed to fetch message stats:", error);
        }

        // Fetch blog stats
        let blogStats = { total: 0, published: 0, drafts: 0 };
        try {
          const blogResponse = await fetch(
            `${API_BASE_URL}/blogs/admin/all?limit=1`,
            { headers }
          );
          if (blogResponse.ok) {
            const blogData = await blogResponse.json();
            blogStats.total = blogData.pagination?.total || 0;
          }

          const publishedResponse = await fetch(
            `${API_BASE_URL}/blogs?limit=1`
          );
          if (publishedResponse.ok) {
            const publishedData = await publishedResponse.json();
            blogStats.published = publishedData.pagination?.total || 0;
            blogStats.drafts = blogStats.total - blogStats.published;
          }
        } catch (error) {
          console.error("Failed to fetch blog stats:", error);
        }

        setStats({
          users: userStats,
          messages: messageStats,
          blogs: blogStats,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (state.token) {
      fetchStats();
    }
  }, [state.token, state.user?.role, API_BASE_URL]);

  const StatCard: React.FC<{
    title: string;
    value: number;
    subtitle?: string;
    icon: React.ElementType;
    color: string;
    trend?: string;
  }> = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/80">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">
          {loading ? (
            <div className="animate-pulse bg-white/20 h-8 w-16 rounded"></div>
          ) : (
            value.toLocaleString()
          )}
        </div>
        {subtitle && <p className="text-xs text-white/60 mt-1">{subtitle}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
            <span className="text-xs text-green-400">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const QuickActions = () => (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-left">
          <MessageSquare className="h-4 w-4 text-blue-400" />
          <div>
            <p className="font-medium">View New Messages</p>
            <p className="text-sm text-white/60">
              {stats.messages.unread} unread messages
            </p>
          </div>
        </button>

        <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-left">
          <FileText className="h-4 w-4 text-green-400" />
          <div>
            <p className="font-medium">Create Blog Post</p>
            <p className="text-sm text-white/60">Write a new article</p>
          </div>
        </button>

        {state.user?.role === "admin" && (
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-left">
            <UserPlus className="h-4 w-4 text-purple-400" />
            <div>
              <p className="font-medium">Manage Users</p>
              <p className="text-sm text-white/60">
                {stats.users.total} total users
              </p>
            </div>
          </button>
        )}
      </CardContent>
    </Card>
  );

  const RecentActivity = () => (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    <div className="h-3 bg-white/10 rounded w-1/2 mt-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">New contact messages</p>
                <p className="text-sm text-white/60">
                  {stats.messages.recent} messages in the last 7 days
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Blog posts published</p>
                <p className="text-sm text-white/60">
                  {stats.blogs.published} posts are live
                </p>
              </div>
            </div>

            {state.user?.role === "admin" && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    New user registrations
                  </p>
                  <p className="text-sm text-white/60">
                    {stats.users.new} new users this month
                  </p>
                </div>
              </div>
            )}

            {stats.messages.unread > 0 && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Pending messages</p>
                  <p className="text-sm text-white/60">
                    {stats.messages.unread} messages need attention
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-pink-500/30 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">
          Welcome back, {state.user?.name}! 👋
        </h3>
        <p className="text-white/80 text-sm">
          Here's what's happening with your CapitalPay dashboard today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {state.user?.role === "admin" && (
          <>
            <StatCard
              title="Total Users"
              value={stats.users.total}
              subtitle={`${stats.users.active} active users`}
              icon={Users}
              color="text-blue-400"
              trend={
                stats.users.new > 0
                  ? `+${stats.users.new} this month`
                  : undefined
              }
            />
            <StatCard
              title="Active Users"
              value={stats.users.active}
              subtitle={`${(
                (stats.users.active / stats.users.total) * 100 || 0
              ).toFixed(1)}% of total`}
              icon={CheckCircle}
              color="text-green-400"
            />
          </>
        )}

        <StatCard
          title="Total Messages"
          value={stats.messages.total}
          subtitle={`${stats.messages.unread} unread`}
          icon={MessageSquare}
          color="text-purple-400"
          trend={
            stats.messages.recent > 0
              ? `+${stats.messages.recent} this week`
              : undefined
          }
        />

        <StatCard
          title="Blog Posts"
          value={stats.blogs.published}
          subtitle={`${stats.blogs.drafts} drafts`}
          icon={FileText}
          color="text-orange-400"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentActivity />
      </div>

      {/* System Status */}
      {/* <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>System Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white">API Status: Online</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white">Database: Connected</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white">Services: Running</span>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default DashboardOverview;

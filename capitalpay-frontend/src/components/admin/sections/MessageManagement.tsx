import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Search,
  Mail,
  MailOpen,
  Reply,
  Check,
  Building,
  User,
  Calendar,
  Plus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "resolved" | "spam";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  notes?: Array<{
    content: string;
    addedBy: {
      name: string;
      email: string;
    };
    addedAt: string;
  }>;
}

interface MessageStats {
  totalCount: number;
  unreadCount: number;
  recentCount: number;
  byStatus: {
    new?: number;
    read?: number;
    replied?: number;
    resolved?: number;
    spam?: number;
  };
}

const MessageManagement: React.FC = () => {
  const { state } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<MessageStats>({
    totalCount: 0,
    unreadCount: 0,
    recentCount: 0,
    byStatus: {},
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [newNote, setNewNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(priorityFilter !== "all" && { priority: priorityFilter }),
      });

      const response = await fetch(`${API_BASE_URL}/contact?${params}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/stats`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch message stats:", error);
    }
  };

  useEffect(() => {
    if (state.token) {
      fetchMessages();
      fetchStats();
    }
  }, [state.token, currentPage, searchTerm, statusFilter, priorityFilter]);

  const handleStatusChange = async (
    messageId: string,
    newStatus: string,
    priority?: string
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/contact/${messageId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
            ...(priority && { priority }),
          }),
        }
      );

      if (response.ok) {
        fetchMessages();
        fetchStats();
        if (selectedMessage && selectedMessage._id === messageId) {
          setSelectedMessage({ ...selectedMessage, status: newStatus as any });
        }
      }
    } catch (error) {
      console.error("Failed to update message status:", error);
    }
  };

  const handleAddNote = async () => {
    if (!selectedMessage || !newNote.trim()) return;

    try {
      setAddingNote(true);
      const response = await fetch(
        `${API_BASE_URL}/contact/${selectedMessage._id}/notes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: newNote.trim() }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedMessage({
          ...selectedMessage,
          notes: [...(selectedMessage.notes || []), data.data],
        });
        setNewNote("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Failed to add note:", error);
    } finally {
      setAddingNote(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-200 border-blue-500/30";
      case "read":
        return "bg-yellow-500/20 text-yellow-200 border-yellow-500/30";
      case "replied":
        return "bg-green-500/20 text-green-200 border-green-500/30";
      case "resolved":
        return "bg-gray-500/20 text-gray-200 border-gray-500/30";
      case "spam":
        return "bg-red-500/20 text-red-200 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-200 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-200 border-red-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-200 border-orange-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-200 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-200 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-200 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Mail className="h-4 w-4" />;
      case "read":
        return <MailOpen className="h-4 w-4" />;
      case "replied":
        return <Reply className="h-4 w-4" />;
      case "resolved":
        return <Check className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Total Messages</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalCount}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Unread</p>
                <p className="text-2xl font-bold text-white">
                  {stats.unreadCount}
                </p>
              </div>
              <Mail className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">This Week</p>
                <p className="text-2xl font-bold text-white">
                  {stats.recentCount}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Resolved</p>
                <p className="text-2xl font-bold text-white">
                  {stats.byStatus.resolved || 0}
                </p>
              </div>
              <Check className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Contact Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="resolved">Resolved</option>
              <option value="spam">Spam</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Messages List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-white/20 rounded w-1/4"></div>
                      <div className="h-3 bg-white/10 rounded w-1/2 mt-1"></div>
                    </div>
                    <div className="w-20 h-6 bg-white/20 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-white truncate">
                          {message.name}
                        </p>
                        {message.company && (
                          <div className="flex items-center space-x-1 text-white/60">
                            <Building className="h-3 w-3" />
                            <span className="text-sm">{message.company}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-white/60 truncate">
                        {message.subject}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-white/40">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-xs text-white/40">
                          {message.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(message.priority)}>
                      {message.priority.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(message.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(message.status)}
                        <span>{message.status.toUpperCase()}</span>
                      </div>
                    </Badge>
                  </div>
                </div>
              ))}

              {messages.length === 0 && !loading && (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">
                    No messages found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Previous
              </Button>
              <span className="px-3 py-2 text-white">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Modal */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-purple-900/95 backdrop-blur-sm border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Message Details</DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-6">
              {/* Message Header */}
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {selectedMessage.subject}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-white/60 mt-1">
                      <span>
                        From: {selectedMessage.name} ({selectedMessage.email})
                      </span>
                      {selectedMessage.company && (
                        <span>Company: {selectedMessage.company}</span>
                      )}
                      <span>
                        Date:{" "}
                        {new Date(
                          selectedMessage.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={getPriorityColor(selectedMessage.priority)}
                    >
                      {selectedMessage.priority.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(selectedMessage.status)}>
                      {selectedMessage.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      handleStatusChange(selectedMessage._id, "read")
                    }
                    className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-200 border border-yellow-500/30"
                  >
                    Mark as Read
                  </Button>
                  <Button
                    size="sm"
                    onClick={() =>
                      handleStatusChange(selectedMessage._id, "replied")
                    }
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-200 border border-green-500/30"
                  >
                    Mark as Replied
                  </Button>
                  <Button
                    size="sm"
                    onClick={() =>
                      handleStatusChange(selectedMessage._id, "resolved")
                    }
                    className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-200 border border-gray-500/30"
                  >
                    Mark as Resolved
                  </Button>
                </div>
              </div>

              {/* Message Content */}
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Message:</h4>
                <div className="text-white/80 whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Internal Notes</h4>

                {/* Existing Notes */}
                {selectedMessage.notes && selectedMessage.notes.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {selectedMessage.notes.map((note, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">
                            {note.addedBy.name}
                          </span>
                          <span className="text-xs text-white/60">
                            {new Date(note.addedAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-white/80">{note.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Note */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add an internal note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    rows={3}
                  />
                  <Button
                    onClick={handleAddNote}
                    disabled={!newNote.trim() || addingNote}
                    className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                  >
                    {addingNote ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Adding...</span>
                      </div>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Note
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageManagement;

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, state } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError("");

    if (!email || !password) {
      const errorMessage = "Please fill in all fields";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    try {
      toast.loading("Logging in...", { id: "login-toast" });

      const success = await login(email, password);
      if (success) {
        toast.success("Login successful! Welcome to the admin dashboard.", {
          id: "login-toast",
        });
        setEmail("");
        setPassword("");
        setError("");
        onSuccess?.();
        onClose();
      } else {
        // This shouldn't happen with the updated login function, but just in case
        throw new Error("Login failed unexpectedly");
      }
    } catch (err: any) {
      const errorMessage =
        err.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      toast.error(errorMessage, { id: "login-toast" });
    }
  };

  const handleClose = () => {
    // Dismiss any active toast notifications
    toast.dismiss("login-toast");
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-purple-900/95 backdrop-blur-sm border border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Admin Dashboard Login
          </DialogTitle>
          <p className="text-white/80 text-center text-sm">
            Enter your admin credentials to access the dashboard
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/20"
                placeholder="admin@capitalpay.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/20"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-600/30">
            <h4 className="text-white font-medium mb-2">Demo Credentials:</h4>
            <div className="text-sm text-white/80 space-y-1">
              <p>Email: admin@capitalpay.com</p>
              <p>Password: admin123</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
              disabled={state.isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
              disabled={state.isLoading}
            >
              {state.isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-white/60">
            Only admin and moderator accounts can access this dashboard
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;

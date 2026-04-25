import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      navigate("/auth");
    }
  }, [navigate]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Something went wrong — please try again", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "✅ Password updated!", description: "You can now sign in with your new password." });
      navigate("/");
    }
  };

  return (
    <main className="container flex min-h-[70vh] items-center justify-center py-8">
      <div className="w-full max-w-md rounded-2xl border-2 border-border bg-card p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-foreground">Set Your New Password</h1>
        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label htmlFor="newPassword" className="mb-2 block text-lg font-semibold text-foreground">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 w-full rounded-xl border-2 border-border bg-background px-4 pr-36 text-lg text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1 text-base font-semibold text-primary hover:bg-primary/10"
              >
                {showPassword ? "👁️ Hide" : "👁️ Show"}
              </button>
            </div>
          </div>
          <Button variant="mega" size="lg" type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : "Update Password"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;

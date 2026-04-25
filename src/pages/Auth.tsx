import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (forgotMode) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setLoading(false);
      if (error) {
        toast({ title: "Something went wrong — please try again", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "✅ Check your email!", description: "We sent you a link to reset your password." });
      }
      return;
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        toast({ title: "Something went wrong — please try again", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "✅ Welcome back!" });
        navigate("/");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName },
          emailRedirectTo: window.location.origin,
        },
      });
      setLoading(false);
      if (error) {
        toast({ title: "Something went wrong — please try again", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "✅ Account created!", description: "Please check your email to confirm your account before signing in." });
      }
    }
  };

  return (
    <main className="container flex min-h-[70vh] items-center justify-center py-8">
      <div className="w-full max-w-md rounded-2xl border-2 border-border bg-card p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-foreground">
          {forgotMode ? "Reset Your Password" : isLogin ? "Sign In to SilverLink" : "Create Your Account"}
        </h1>

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLogin && !forgotMode && (
            <div>
              <label htmlFor="firstName" className="mb-2 block text-lg font-semibold text-foreground">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-14 w-full rounded-xl border-2 border-border bg-background px-4 text-lg text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-lg font-semibold text-foreground">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 w-full rounded-xl border-2 border-border bg-background px-4 text-lg text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {!forgotMode && (
            <div>
              <label htmlFor="password" className="mb-2 block text-lg font-semibold text-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
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
                  {showPassword ? "👁️ Hide Password" : "👁️ Show Password"}
                </button>
              </div>
            </div>
          )}

          <Button variant="mega" size="lg" type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : forgotMode ? "Send Reset Link" : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          {forgotMode ? (
            <button
              onClick={() => setForgotMode(false)}
              className="text-lg font-semibold text-primary hover:underline"
            >
              ← Back to Sign In
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-lg font-semibold text-primary hover:underline"
              >
                {isLogin ? "New here? Create an account" : "Already have an account? Sign in"}
              </button>
              {isLogin && (
                <div className="mt-4">
                  <button
                    onClick={() => setForgotMode(true)}
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    Forgot your password? Click here
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Auth;

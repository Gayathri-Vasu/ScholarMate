import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext"; // ✅ import AuthContext

const VALID_EMAIL = "user@gmail.com";
const VALID_PASSWORD = "1234";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const { toast } = useToast();
  const { setIsLoggedIn } = useAuth(); // ✅ get setIsLoggedIn from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const emailOk = email.trim().toLowerCase() === VALID_EMAIL;
      const pwOk = password === VALID_PASSWORD;

      if (!emailOk || !pwOk) {
        toast({
          title: "Invalid credentials",
          description: "Please check your email or password.",
          variant: "destructive",
        });
        return;
      }

      // ✅ Save user in localStorage
      localStorage.setItem(
        "auth_user",
        JSON.stringify({ email: VALID_EMAIL, loggedInAt: new Date().toISOString() })
      );

      // ✅ Update AuthContext so Header updates immediately
      setIsLoggedIn(true);

      toast({ title: "Welcome back!", description: "Signed in successfully." });

      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Use demo credentials to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="user@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

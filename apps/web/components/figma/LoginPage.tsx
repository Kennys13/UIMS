"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GraduationCap, User, UserCircle, Shield } from "lucide-react";
import { toast } from "sonner";
import { getDashboard, login } from "../../services/api";
import { saveSession } from "../../services/session";

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const session = await login({ email, password, captchaToken: "demo-pass", allowedRoles: [activeTab] });
      saveSession(session);
      const payload = await getDashboard(session.token);
      localStorage.setItem("currentUser", JSON.stringify({ id: session.user.id, name: session.user.name, email: session.user.email, role: session.user.role }));
      localStorage.setItem("lotus-valley-dashboard-cache", JSON.stringify(payload));
      toast.success(`Welcome back, ${session.user.name}!`);
      router.push(`/${session.user.role}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (role: "student" | "teacher" | "admin") => {
    const credentials = {
      student: { email: "student@lotusvalley.test", password: "Password@123" },
      teacher: { email: "teacher@lotusvalley.test", password: "Password@123" },
      admin: { email: "admin@lotusvalley.test", password: "Password@123" },
    };
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
    setActiveTab(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">LOTUS VALLEY SCHOOL</h1>
              <p className="text-sm text-gray-600">University Information Management System</p>
            </div>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Portal Login</CardTitle>
            <CardDescription>Select your role and enter credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2"><User className="w-4 h-4" />Student</TabsTrigger>
                <TabsTrigger value="teacher" className="flex items-center gap-2"><UserCircle className="w-4 h-4" />Teacher</TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2"><Shield className="w-4 h-4" />Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="student"><LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={handleLogin} role="Student" loading={loading} /></TabsContent>
              <TabsContent value="teacher"><LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={handleLogin} role="Teacher" loading={loading} /></TabsContent>
              <TabsContent value="admin"><LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={handleLogin} role="Admin" loading={loading} /></TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-3">Demo Credentials (Click to auto-fill):</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={() => quickLogin("student")} className="text-xs">Student Demo</Button>
                <Button variant="outline" size="sm" onClick={() => quickLogin("teacher")} className="text-xs">Teacher Demo</Button>
                <Button variant="outline" size="sm" onClick={() => quickLogin("admin")} className="text-xs">Admin Demo</Button>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-600">
                <p>Student: student@lotusvalley.test / Password@123</p>
                <p>Teacher: teacher@lotusvalley.test / Password@123</p>
                <p>Admin: admin@lotusvalley.test / Password@123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button variant="link" onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ email, setEmail, password, setPassword, onSubmit, role, loading }: { email: string; setEmail: (email: string) => void; password: string; setPassword: (password: string) => void; onSubmit: (e: React.FormEvent) => void; role: string; loading: boolean; }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{role} Email</Label>
        <Input id="email" type="email" placeholder={`Enter your ${role.toLowerCase()} email`} value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded" /><span className="text-gray-600">Remember me</span></label>
        <span className="text-blue-600 hover:underline">Forgot password?</span>
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">{loading ? "Signing in..." : `Login as ${role}`}</Button>
    </form>
  );
}

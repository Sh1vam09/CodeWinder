"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Shield, Users, Trophy, FileText, LogOut, 
  Loader2, CheckCircle, XCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Dashboard Data State
  const [users, setUsers] = useState<any[]>([]);
  
  // Forms State
  const [contestForm, setContestForm] = useState({
    title: "", platform: "", description: "", startTime: "", endTime: ""
  });
  const [blogForm, setBlogForm] = useState({
    title: "", content: ""
  });

  // --- AUTH HANDLERS ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setIsLoggedIn(true);
        toast.success("Welcome back, Admin");
        fetchUsers(); // Load initial data
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  // --- DATA FETCHERS ---
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch (e) {
      console.error(e);
    }
  };

  const createContest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        body: JSON.stringify(contestForm)
      });
      if (res.ok) {
        toast.success("Contest Created!");
        setContestForm({ title: "", platform: "", description: "", startTime: "", endTime: "" });
      } else {
        toast.error("Failed to create contest");
      }
    } catch (e) {
      toast.error("Error creating contest");
    }
  };

  const createBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // REUSING YOUR MONGO API
      const res = await fetch("/api/mongo-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogForm)
      });
      if (res.ok) {
        toast.success("Blog Post Published to MongoDB!");
        setBlogForm({ title: "", content: "" });
      } else {
        toast.error("Failed to publish blog");
      }
    } catch (e) {
      toast.error("Error publishing blog");
    }
  };

  // --- LOGIN VIEW ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-900/20 rounded-full">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-white">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder="Username" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
              </div>
              <Button disabled={loading} className="w-full bg-red-600 hover:bg-red-700">
                {loading ? <Loader2 className="animate-spin" /> : "Enter Console"}
              </Button>
            </form>
            <div className="mt-6 text-center text-xs text-zinc-500">
              <p>Demo Credentials:</p>
              <p>admin / admin123</p>
              <p>shivam / code123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold">Admin Console</h1>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-red-400 border-red-900 hover:bg-red-950">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" /> Users
            </TabsTrigger>
            <TabsTrigger value="contests">
              <Trophy className="w-4 h-4 mr-2" /> Add Contest
            </TabsTrigger>
            <TabsTrigger value="blogs">
              <FileText className="w-4 h-4 mr-2" /> Add Blog (Mongo)
            </TabsTrigger>
          </TabsList>

          {/* USERS TAB */}
          <TabsContent value="users">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Registered Users (Postgres)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-zinc-900">
                      <TableHead className="text-zinc-400">Name</TableHead>
                      <TableHead className="text-zinc-400">Email</TableHead>
                      <TableHead className="text-zinc-400">Rating</TableHead>
                      <TableHead className="text-zinc-400">Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-medium text-white">{user.name || "No Name"}</TableCell>
                        <TableCell className="text-zinc-300">{user.email}</TableCell>
                        <TableCell className="text-yellow-500">{user.rating}</TableCell>
                        <TableCell className="text-zinc-500">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {users.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-zinc-500">
                          No users found (or database error)
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ADD CONTEST TAB */}
          <TabsContent value="contests">
            <Card className="bg-zinc-900 border-zinc-800 max-w-2xl">
              <CardHeader>
                <CardTitle className="text-white">Create New Contest</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={createContest} className="space-y-4">
                  <Input 
                    placeholder="Contest Title" 
                    className="bg-zinc-950 border-zinc-700 text-white"
                    value={contestForm.title}
                    onChange={e => setContestForm({...contestForm, title: e.target.value})}
                  />
                  <Input 
                    placeholder="Platform (e.g. LeetCode, CodeForces)" 
                    className="bg-zinc-950 border-zinc-700 text-white"
                    value={contestForm.platform}
                    onChange={e => setContestForm({...contestForm, platform: e.target.value})}
                  />
                  <Textarea 
                    placeholder="Description / Rules" 
                    className="bg-zinc-950 border-zinc-700 text-white"
                    value={contestForm.description}
                    onChange={e => setContestForm({...contestForm, description: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-zinc-400">Start Time</label>
                      <Input 
                        type="datetime-local" 
                        className="bg-zinc-950 border-zinc-700 text-white"
                        value={contestForm.startTime}
                        onChange={e => setContestForm({...contestForm, startTime: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-zinc-400">End Time</label>
                      <Input 
                        type="datetime-local" 
                        className="bg-zinc-950 border-zinc-700 text-white"
                        value={contestForm.endTime}
                        onChange={e => setContestForm({...contestForm, endTime: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Launch Contest</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ADD BLOG TAB */}
          <TabsContent value="blogs">
            <Card className="bg-zinc-900 border-zinc-800 max-w-2xl">
              <CardHeader>
                <CardTitle className="text-white">Write Blog Post (MongoDB)</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={createBlog} className="space-y-4">
                  <Input 
                    placeholder="Post Title" 
                    className="bg-zinc-950 border-zinc-700 text-white"
                    value={blogForm.title}
                    onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                  />
                  <Textarea 
                    placeholder="Content (Markdown supported)" 
                    className="bg-zinc-950 border-zinc-700 text-white min-h-[200px]"
                    value={blogForm.content}
                    onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                  />
                  <Button className="w-full bg-green-600 hover:bg-green-700">Publish to MongoDB</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
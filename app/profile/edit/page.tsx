"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Schema must match API validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Alphanumeric only"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
});

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      website: "",
      githubHandle: "",
      twitterHandle: "",
    },
  });

  // Fetch existing data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        
        // Reset form with fetched data
        form.reset({
          name: data.name || "",
          username: data.username || "",
          bio: data.bio || "",
          website: data.website || "",
          githubHandle: data.githubHandle || "",
          twitterHandle: data.twitterHandle || "",
        });
      } catch (error) {
        toast({
            title: "Error",
            description: "Could not load profile data.",
            variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [form, toast]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
      
      router.refresh(); // Refresh server components
      router.push("/profile"); // Redirect back to profile
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-zinc-800">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-gray-400">Update your personal information and public links.</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Display Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-zinc-950 border-zinc-800 focus:ring-orange-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} className="bg-zinc-950 border-zinc-800 focus:ring-orange-500" />
                      </FormControl>
                      <FormDescription className="text-zinc-500 text-xs">
                        Unique handle for your profile URL.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about yourself..." 
                        className="bg-zinc-950 border-zinc-800 focus:ring-orange-500 min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-zinc-500 text-xs">
                        Markdown is not supported yet.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border-t border-zinc-800 pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Social Links</h3>
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} className="bg-zinc-950 border-zinc-800 focus:ring-orange-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="githubHandle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-zinc-300">GitHub Username</FormLabel>
                        <FormControl>
                            <Input placeholder="octocat" {...field} className="bg-zinc-950 border-zinc-800 focus:ring-orange-500" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="twitterHandle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-zinc-300">Twitter/X Username</FormLabel>
                        <FormControl>
                            <Input placeholder="elonmusk" {...field} className="bg-zinc-950 border-zinc-800 focus:ring-orange-500" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="bg-orange-600 hover:bg-orange-700 text-white min-w-[120px]"
                >
                  {isSaving ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                    </>
                  ) : (
                    <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
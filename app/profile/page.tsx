'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Link as LinkIcon, Calendar, Award, Users, Trophy, Edit3, Github, Twitter, LogOut, Loader2 } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Helper Icons
const CodeIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
)
const ZapIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
)
const BugIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><polyline points="9 14 12 11 15 14"/><line x1="12" y1="11" x2="12" y2="19"/><path d="M10 6.13L12 4l2 2.13"/><line x1="14" y1="10" x2="10" y2="10"/></svg>
)

// Interface for the profile data
interface UserProfile {
    name: string | null;
    username: string | null;
    image: string | null;
    bio: string | null;
    website: string | null;
    githubHandle: string | null;
    twitterHandle: string | null;
    createdAt: string;
    rating?: number;
}

export default function ProfilePage() {
  // FIX: Use isPending instead of status
  const { data: session, isPending } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
        // Wait for session to initialize
        if (isPending) return;

        if (session?.user) {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setIsLoadingData(false);
            }
        } else {
            // If not authenticated, stop loading so we can show Access Denied
             setIsLoadingData(false);
        }
    };

    fetchProfile();
  }, [session, isPending]); // Run when session or pending state changes


  // Show loader if Auth is pending OR Data is fetching
  if (isPending || (session?.user && isLoadingData)) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
    );
  }

  if (!session?.user) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white pt-24">
            <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-400 mb-6">Please log in to view this page.</p>
            <Link href="/login">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Go to Login
                </Button>
            </Link>
        </div>
    );
  }

  // Use API data if available, otherwise fall back to session data
  const displayUser = {
    name: profile?.name || session.user.name || "Coder",
    username: profile?.username || session.user.email?.split('@')[0] || "Anonymous",
    image: profile?.image || session.user.image,
    bio: profile?.bio || "No bio yet.",
    website: profile?.website,
    github: profile?.githubHandle,
    twitter: profile?.twitterHandle,
    joinedAt: profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Unknown Date",
    // Mock stats
    rating: 1450,
    rank: "Expert", 
    stats: {
        contests: 42,
        solved: 315,
        contributions: 128,
        globalRank: 1240
    }
  };

  const badges = [
      { name: "Algo Master", color: "text-orange-500", bg: "bg-orange-500/10", icon: Trophy },
      { name: "Problem Solver", color: "text-teal-500", bg: "bg-teal-500/10", icon: CodeIcon },
      { name: "Fast Typer", color: "text-purple-500", bg: "bg-purple-500/10", icon: ZapIcon },
      { name: "Bug Hunter", color: "text-red-500", bg: "bg-red-500/10", icon: BugIcon },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Profile Header */}
        <div className="bg-zinc-900 rounded-xl shadow-2xl p-8 border border-zinc-800 relative mb-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="flex items-center gap-6">
                    {/* User Avatar */}
                    <Avatar className="w-24 h-24 border-4 border-orange-600">
                        <AvatarImage src={displayUser.image || `https://ui-avatars.com/api/?name=${displayUser.name}&background=f97316&color=fff`} />
                        <AvatarFallback className="bg-orange-600 text-white text-3xl font-bold">{displayUser.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>

                    <div>
                        <h1 className="text-3xl font-bold">{displayUser.name}</h1>
                        <p className="text-xl text-gray-400 mb-2">@{displayUser.username}</p>
                        
                        <div className="flex items-center gap-3 text-sm">
                            <span className="font-semibold text-lg text-orange-500">{displayUser.rating}</span>
                            <span className="px-3 py-1 bg-zinc-800 text-orange-400 rounded-full text-xs font-medium border border-orange-800/50">
                                {displayUser.rank}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3 w-full md:w-auto">
                    <Link href="/profile/edit"> 
                        <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2 border border-zinc-700">
                            <Edit3 className="w-4 h-4" />
                            Edit Profile
                        </Button>
                    </Link>

                    <Button 
                        onClick={() => signOut()} 
                        variant="destructive" 
                        className="w-full flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </div>
        
        {/* Bio and Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                
                {/* Bio */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-xl font-semibold mb-3 border-b border-zinc-800 pb-2">About Me</h2>
                    <p className="text-gray-400 whitespace-pre-wrap min-h-[4rem]">
                        {displayUser.bio}
                    </p>
                </div>

                {/* Badges */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-xl font-semibold mb-3 border-b border-zinc-800 pb-2">Badges & Achievements</h2>
                    <div className="flex flex-wrap gap-3">
                        {badges.map((badge, index) => {
                            const IconComponent = badge.icon;
                            return (
                                <span 
                                    key={index}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${badge.bg} ${badge.color} border border-zinc-800`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    {badge.name}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Sidebar / Stats */}
            <div className="md:col-span-1 space-y-6">
                
                {/* General Info */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 space-y-3">
                    <h2 className="text-xl font-semibold mb-3 border-b border-zinc-800 pb-2">Contact & Info</h2>
                    
                    <div className="flex items-center gap-3 text-gray-400">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        Joined: <span className="text-white font-medium">{displayUser.joinedAt}</span>
                    </div>
                    
                    {displayUser.website && (
                        <a href={displayUser.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors">
                            <LinkIcon className="w-5 h-5 text-orange-500" />
                            Website
                        </a>
                    )}
                    
                    {displayUser.github && (
                        <a href={`https://github.com/${displayUser.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors">
                            <Github className="w-5 h-5 text-orange-500" />
                            {displayUser.github}
                        </a>
                    )}
                    
                    {displayUser.twitter && (
                        <a href={`https://twitter.com/${displayUser.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors">
                            <Twitter className="w-5 h-5 text-orange-500" />
                            {displayUser.twitter}
                        </a>
                    )}
                </div>

                {/* Stats */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-xl font-semibold mb-3 border-b border-zinc-800 pb-2">Statistics</h2>
                    <div className="space-y-4">
                        <StatItem icon={Trophy} label="Contests" value={displayUser.stats.contests} color="text-teal-400" />
                        <StatItem icon={CodeIcon} label="Problems Solved" value={displayUser.stats.solved} color="text-orange-400" />
                        <StatItem icon={Users} label="Contributions" value={displayUser.stats.contributions} color="text-purple-400" />
                        <StatItem icon={Award} label="Global Rank" value={`#${displayUser.stats.globalRank}`} color="text-yellow-400" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

const StatItem = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${color}`} />
            <span className="text-gray-400">{label}</span>
        </div>
        <span className="text-white font-bold text-lg">{value}</span>
    </div>
);

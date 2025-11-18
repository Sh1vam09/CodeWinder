'use client';

import React from 'react';
import { MapPin, Link as LinkIcon, Calendar, Award, Users, Trophy, Edit3, Github, Twitter, LogOut } from 'lucide-react';
import { useSession, signOut } from 'better-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Assuming button import
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming avatar imports

// Helper Icons (kept from original file)
const CodeIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
)
const ZapIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
)
const BugIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><polyline points="9 14 12 11 15 14"/><line x1="12" y1="11" x2="12" y2="19"/><path d="M10 6.13L12 4l2 2.13"/><line x1="14" y1="10" x2="10" y2="10"/></svg>
)

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">Loading profile...</div>;
  }

  if (status === 'unauthenticated' || !session?.user) {
    // You should probably redirect to a login page using next/navigation's useRouter
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white pt-24">
            <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-400 mb-6">Please log in to view this page.</p>
            <Button 
                onClick={() => signIn()} 
                className="bg-orange-600 hover:bg-orange-700 text-white"
            >
                Go to Login
            </Button>
        </div>
    );
  }

  // Use live data from the session
  const liveUser = session.user;

  // Mock data for complex fields not available in the basic session (badges, stats, etc.)
  // You will need to implement API calls later to fetch this real data based on liveUser.id
  const mockComplexData = {
    // Using live data where possible, falling back to mock values
    username: liveUser.username || liveUser.name?.replace(/\s+/g, '') || "AnonymousCoder",
    fullName: liveUser.name || "Coder",
    bio: liveUser.bio || "Full-stack developer & Competitive Programmer. Obsessed with clean code and efficient algorithms.",
    rating: liveUser.rating || 1450,
    rank: liveUser.rating && liveUser.rating >= 1400 ? "Expert" : "Newbie",
    joinedAt: liveUser.createdAt ? new Date(liveUser.createdAt).toLocaleDateString() : "Unknown Date",
    location: "San Francisco, CA",
    website: "alexturner.dev",
    socials: {
        github: "github.com/coder-handle",
        twitter: "twitter.com/coder-handle"
    },
    stats: {
      contests: 42,
      solved: 315,
      contributions: 128,
      globalRank: 1240
    },
    badges: [
      { name: "Algo Master", color: "text-orange-500", bg: "bg-orange-500/10", icon: Trophy },
      { name: "Problem Solver", color: "text-teal-500", bg: "bg-teal-500/10", icon: CodeIcon },
      { name: "Fast Typer", color: "text-purple-500", bg: "bg-purple-500/10", icon: ZapIcon },
      { name: "Bug Hunter", color: "text-red-500", bg: "bg-red-500/10", icon: BugIcon },
    ],
    // Mock activity log is removed for brevity, use real API data when implemented
  };


  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Profile Header */}
        <div className="bg-zinc-900 rounded-xl shadow-2xl p-8 border border-zinc-800 relative mb-8">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                    {/* User Avatar - using live image if available */}
                    <Avatar className="w-24 h-24 border-4 border-orange-600">
                        <AvatarImage src={liveUser.image || liveUser.name ? `https://ui-avatars.com/api/?name=${liveUser.name}&background=f97316&color=fff&size=512` : undefined} />
                        <AvatarFallback className="bg-orange-600 text-white text-3xl font-bold">{mockComplexData.fullName[0]}</AvatarFallback>
                    </Avatar>

                    <div>
                        {/* User Name - using live name */}
                        <h1 className="text-3xl font-bold">{mockComplexData.fullName}</h1>
                        <p className="text-xl text-gray-400 mb-2">@{mockComplexData.username}</p>
                        
                        {/* Rating & Rank */}
                        <div className="flex items-center gap-3 text-sm">
                            <span className="font-semibold text-lg text-orange-500">{mockComplexData.rating}</span>
                            <span className="px-3 py-1 bg-zinc-800 text-orange-400 rounded-full text-xs font-medium border border-orange-800/50">
                                {mockComplexData.rank}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3">
                    {/* Edit Profile Button */}
                    <Link href="/profile/edit" passHref> 
                        <Button className="bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2 border border-zinc-700">
                            <Edit3 className="w-4 h-4" />
                            Edit Profile
                        </Button>
                    </Link>

                    {/* Sign Out Button */}
                    <Button 
                        onClick={() => signOut({ callbackUrl: '/' })} 
                        variant="destructive" 
                        className="flex items-center gap-2"
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
                    <p className="text-gray-400 whitespace-pre-wrap">{mockComplexData.bio}</p>
                </div>

                {/* Badges */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-xl font-semibold mb-3 border-b border-zinc-800 pb-2">Badges & Achievements</h2>
                    <div className="flex flex-wrap gap-3">
                        {mockComplexData.badges.map((badge, index) => {
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
                        Joined: <span className="text-white font-medium">{mockComplexData.joinedAt}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        Location: <span className="text-white font-medium">{mockComplexData.location}</span>
                    </div>
                    <a href={`https://${mockComplexData.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors">
                        <LinkIcon className="w-5 h-5 text-orange-500" />
                        Website: <span className="font-medium truncate">{mockComplexData.website}</span>
                    </a>
                    <a href={`https://${mockComplexData.socials.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors">
                        <Github className="w-5 h-5 text-orange-500" />
                        GitHub
                    </a>
                    <a href={`https://${mockComplexData.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors">
                        <Twitter className="w-5 h-5 text-orange-500" />
                        Twitter
                    </a>
                </div>

                {/* Stats */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-xl font-semibold mb-3 border-b border-zinc-800 pb-2">Statistics</h2>
                    <div className="space-y-4">
                        <StatItem icon={Trophy} label="Contests Participated" value={mockComplexData.stats.contests} color="text-teal-400" />
                        <StatItem icon={CodeIcon} label="Total Problems Solved" value={mockComplexData.stats.solved} color="text-orange-400" />
                        <StatItem icon={Users} label="Community Contributions" value={mockComplexData.stats.contributions} color="text-purple-400" />
                        <StatItem icon={Award} label="Global Rank" value={`#${mockComplexData.stats.globalRank}`} color="text-yellow-400" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for stat items (added for structure)
const StatItem = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${color}`} />
            <span className="text-gray-400">{label}</span>
        </div>
        <span className="text-white font-bold text-lg">{value}</span>
    </div>
);
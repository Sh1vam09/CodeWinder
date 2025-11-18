'use client';

import React from 'react';
import { MapPin, Link as LinkIcon, Calendar, Award, Users, Trophy, Edit3, Github, Twitter } from 'lucide-react';

export default function ProfilePage() {
  // Mock User Data based on Schema
  const user = {
    username: "AlexTurner",
    fullName: "Alex Turner",
    bio: "Full-stack developer & Competitive Programmer. Obsessed with clean code and efficient algorithms. Currently grinding for Grandmaster.",
    rating: 1450,
    rank: "Expert",
    joinedAt: "September 2023",
    location: "San Francisco, CA",
    website: "alexturner.dev",
    socials: {
        github: "github.com/alexturner",
        twitter: "twitter.com/alexturner"
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
      { name: "Bug Hunter", color: "text-red-500", bg: "bg-red-500/10", icon: BugIcon }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Profile Header Card */}
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-zinc-800 shadow-2xl relative overflow-hidden mb-8">
            {/* Background Glow Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/5 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                {/* Avatar */}
                <div className="group relative">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 p-0.5 shrink-0 shadow-lg shadow-orange-500/20">
                        <div className="w-full h-full bg-zinc-900 rounded-2xl flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
                            {/* Placeholder for actual image */}
                             {user.username.charAt(0)}
                        </div>
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-zinc-900 border border-zinc-800 rounded-full p-2 text-orange-500 shadow-lg">
                        <Trophy className="w-5 h-5" />
                    </div>
                </div>

                {/* User Info */}
                <div className="flex-grow w-full">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
                                {user.fullName}
                                <span className="text-lg font-normal text-gray-500">@{user.username}</span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 font-mono font-medium flex items-center gap-1">
                                    Rating: {user.rating}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-zinc-800 text-gray-300 border border-zinc-700 font-medium">
                                    Rank: {user.rank}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                             <button className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl font-medium transition-colors border border-zinc-700 flex items-center gap-2 text-sm">
                                <Edit3 className="w-4 h-4" />
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    <p className="text-gray-300 mb-6 max-w-2xl leading-relaxed text-base border-l-2 border-zinc-700 pl-4">
                        {user.bio}
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                        {user.location && (
                            <div className="flex items-center gap-2 hover:text-white transition-colors">
                                <MapPin className="w-4 h-4 text-orange-500" /> {user.location}
                            </div>
                        )}
                        {user.website && (
                            <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                                <LinkIcon className="w-4 h-4 text-teal-500" /> {user.website}
                            </a>
                        )}
                         {user.socials.github && (
                            <a href={`https://${user.socials.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Github className="w-4 h-4" /> Github
                            </a>
                        )}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" /> Joined {user.joinedAt}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Column: Stats & Badges */}
            <div className="space-y-8">
                {/* Stats Card */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 shadow-xl">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                        <Users className="w-5 h-5 text-orange-500" /> Community Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900">
                            <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Global Rank</div>
                            <div className="text-xl font-mono font-bold text-white">#{user.stats.globalRank}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900">
                            <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Contests</div>
                            <div className="text-xl font-mono font-bold text-white">{user.stats.contests}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900">
                             <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Solved</div>
                            <div className="text-xl font-mono font-bold text-white">{user.stats.solved}</div>
                        </div>
                         <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900">
                             <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Contribs</div>
                            <div className="text-xl font-mono font-bold text-white">{user.stats.contributions}</div>
                        </div>
                    </div>
                </div>

                {/* Badges Card */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 shadow-xl">
                     <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                        <Award className="w-5 h-5 text-teal-500" /> Badges
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {user.badges.map((badge, i) => (
                            <div key={i} className={`p-3 rounded-xl border border-zinc-800/50 flex items-center gap-3 ${badge.bg}`}>
                                <div className={`p-2 rounded-lg bg-zinc-950/30 ${badge.color}`}>
                                    <badge.icon className="w-4 h-4" />
                                </div>
                                <span className={`text-sm font-bold ${badge.color}`}>
                                    {badge.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Activity Timeline */}
            <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                    <h2 className="text-xl font-bold">Recent Activity</h2>
                    <a href="#" className="text-sm text-orange-500 hover:text-orange-400 font-medium">View All</a>
                </div>
                
                {/* Activity List */}
                <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
                    {[
                        { title: 'Solved "Dynamic Grid V2"', contest: 'Weekly Contest #105', time: '2 days ago', type: 'solve' },
                        { title: 'Participated in Global Round', contest: 'CodeWinder Global', time: '1 week ago', type: 'contest' },
                        { title: 'Posted a tutorial', contest: 'Graph Theory Basics', time: '2 weeks ago', type: 'post' }
                    ].map((item, i) => (
                        <div key={i} className="relative pl-12 group">
                            {/* Timeline Dot */}
                            <div className="absolute left-2 top-1 w-6 h-6 rounded-full bg-zinc-900 border-4 border-zinc-800 group-hover:border-orange-500 transition-colors z-10"></div>
                            
                            {/* Content */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-800/50">
                                <div>
                                    <p className="text-white font-semibold text-base mb-1">{item.title}</p>
                                    <p className="text-sm text-gray-400 flex items-center gap-2">
                                        in <span className="text-orange-400">{item.contest}</span>
                                    </p>
                                </div>
                                <span className="text-xs font-mono text-gray-600 bg-zinc-950 px-2 py-1 rounded-md border border-zinc-900 whitespace-nowrap">
                                    {item.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// Helper Icons for Badges (local to file to avoid imports issues)
const CodeIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
)
const ZapIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
)
const BugIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"/><path d="m19 7-3 2"/><path d="m5 7 3 2"/><path d="m19 19-3-2"/><path d="m5 19 3-2"/><path d="M20 13h-4"/><path d="M4 13h4"/><path d="m10 4 1 2"/></svg>
)
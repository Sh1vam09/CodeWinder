'use client';

import React from 'react';
import { Plus } from 'lucide-react';

// --- Mock Data to match the Figma design ---
const teamFilters = [
    'Codeforces Prep',
    'ICPC Training',
    'Beginner Friendly',
    'Advanced',
    'Weekly Challenges',
];

const mockTeams = [
    {
        id: 1,
        name: 'CodeCrushers',
        description: 'Focused on Codeforces contests',
        logoType: 'colorBlock',
        color: 'bg-teal-700', // Adjusted to match Figma's green/teal
        logoContent: 'TEAM'
    },
    {
        id: 2,
        name: 'AlgoWarriors',
        description: 'Preparing for ICPC competitions',
        logoType: 'colorBlock',
        color: 'bg-teal-700', // Adjusted
        logoContent: 'TEAM',
        logoSlogan: 'LETS WIN YOUR ALGORITHM'
    },
    {
        id: 3,
        name: 'BinaryBeasts',
        description: 'Beginner-friendly coding challenges',
        logoType: 'textLogo',
        logoContent: 'TEAM',
        logoFont: 'font-serif italic', // Example font style
        logoColor: 'text-yellow-400'
    },
    {
        id: 4,
        name: 'SyntaxSavants',
        description: 'Advanced algorithm practice',
        logoType: 'textLogo',
        logoContent: 'TEAM',
        logoFont: 'font-mono text-xl', // Example font style
        logoColor: 'text-teal-400'
    },
    {
        id: 5,
        name: 'DebugDemons',
        description: 'Debugging and problem-solving',
        logoType: 'textLogo',
        logoContent: 'TEAM',
        logoFont: 'font-bold text-2xl', // Example font style
        logoColor: 'text-gray-400'
    },
    {
        id: 6,
        name: 'Newbies United',
        description: 'Great for learning the ropes',
        logoType: 'colorBlock',
        color: 'bg-teal-500', // Lighter teal
        logoContent: 'TEAM'
    },
];


export default function TeamsPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Mock Global Header (to match Figma screenshot) */}
                <div className="absolute top-0 left-0 w-full bg-zinc-950/90 backdrop-blur-sm z-50 py-4 px-6 border-b border-zinc-800 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-white">CodeWinder</h1>
                    <nav className="hidden md:flex space-x-6 text-gray-300">
                        <a href="#" className="hover:text-orange-500 transition-colors">Compete</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Practice</a>
                        <a href="/teams" className="text-orange-500 font-semibold border-b-2 border-orange-500 pb-1">Teams</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Discuss</a>
                    </nav>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                        New Contest
                    </button>
                </div>

                <div className="mt-8"> {/* Added margin to separate from the mocked header */}
                    <h2 className="text-3xl font-bold mb-2 text-white">Teams</h2>
                    <p className="text-gray-400 mb-8">
                        Join or create a team to compete and collaborate with others.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mb-10">
                        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-orange-600/30">
                            Create Team
                        </button>
                        <button className="bg-zinc-800 hover:bg-zinc-700 text-gray-200 font-semibold px-6 py-3 rounded-lg transition-colors border border-zinc-700">
                            Join Team
                        </button>
                    </div>

                    {/* Available Teams Header */}
                    <h3 className="text-2xl font-bold mb-6 text-white">Available Teams</h3>

                    {/* Filter Tags */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        {teamFilters.map((filter, index) => (
                            <span key={index} className="bg-zinc-800 text-gray-300 text-sm px-4 py-2 rounded-full border border-zinc-700 hover:bg-zinc-700 cursor-pointer transition-colors">
                                {filter}
                            </span>
                        ))}
                    </div>

                    {/* Teams Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {mockTeams.map((team) => (
                            <div
                                key={team.id}
                                className="p-5 bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 hover:border-orange-600 transition-all cursor-pointer group"
                            >
                                {/* Team Logo / Visual */}
                                <div className={`w-full h-32 flex items-center justify-center rounded-lg mb-4 ${team.logoType === 'colorBlock' ? team.color : 'bg-zinc-800'}`}>
                                    <div className={`text-white text-3xl font-bold ${team.logoFont} ${team.logoColor}`}>
                                        {team.logoContent}
                                        {team.logoSlogan && <div className="text-xs font-normal text-gray-400 mt-1">{team.logoSlogan}</div>}
                                    </div>
                                </div>

                                <h4 className="text-xl font-bold mb-1 group-hover:text-orange-500 transition-colors">{team.name}</h4>
                                <p className="text-gray-400 text-sm">{team.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

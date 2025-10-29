'use client';

import { Trophy, Clock, Users, Calendar, ArrowRight } from 'lucide-react';

const mockContests = [
    { id: 1, name: 'CodeWinder Weekly #105', date: 'November 5, 2025', time: '18:00 UTC', participants: 4520, status: 'Upcoming', theme: 'Dynamic Programming' },
    { id: 2, name: 'Global Finals Qualifier', date: 'October 30, 2025', time: '14:00 UTC', participants: 890, status: 'Upcoming', theme: 'Graph Theory' },
    { id: 3, name: 'Starter Contest #42', date: 'October 25, 2025', time: '10:00 UTC', participants: 6200, status: 'Completed', theme: 'Beginner Algorithms' },
    { id: 4, name: 'Advanced Data Structure Blitz', date: 'October 18, 2025', time: '20:00 UTC', participants: 1500, status: 'Completed', theme: 'Data Structures' },
];

export default function ContestsPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
            <div className="max-w-[1400px] mx-auto">
                <h1 className="text-4xl font-bold mb-10 text-orange-600 flex items-center gap-3">
                    <Trophy className="w-8 h-8" />
                    Contest Schedule
                </h1>

                <div className="space-y-12">
                    {/* Upcoming Contests */}
                    <div className="bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-zinc-800">
                        <h2 className="text-3xl font-bold mb-6 text-gray-200 border-b border-zinc-800 pb-4">Upcoming Contests</h2>
                        <div className="space-y-6">
                            {mockContests.filter(c => c.status === 'Upcoming').map((contest) => (
                                <div key={contest.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800 hover:border-orange-500 transition-all">
                                    <div>
                                        <h3 className="text-xl font-semibold text-orange-400 mb-1">{contest.name}</h3>
                                        <p className="text-sm text-gray-400 flex items-center gap-4">
                                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {contest.date}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {contest.time}</span>
                                            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {contest.participants.toLocaleString()} Participants</span>
                                        </p>
                                        <span className="text-xs font-medium mt-2 inline-block px-3 py-1 rounded-full bg-zinc-700 text-gray-300">{contest.theme}</span>
                                    </div>
                                    <button className="mt-4 md:mt-0 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
                                        Register <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Past Contests */}
                    <div className="bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-zinc-800">
                        <h2 className="text-3xl font-bold mb-6 text-gray-200 border-b border-zinc-800 pb-4">Past Contests</h2>
                        <div className="space-y-6">
                            {mockContests.filter(c => c.status === 'Completed').map((contest) => (
                                <div key={contest.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800 opacity-80">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-300 mb-1">{contest.name}</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-4">
                                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {contest.date}</span>
                                            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {contest.participants.toLocaleString()} Participants</span>
                                        </p>
                                        <span className="text-xs font-medium mt-2 inline-block px-3 py-1 rounded-full bg-zinc-800 text-gray-500">{contest.theme}</span>
                                    </div>
                                    <button className="mt-4 md:mt-0 text-gray-500 hover:text-white font-semibold px-6 py-2 rounded-lg transition-colors border border-zinc-700 hover:border-white">
                                        View Results
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

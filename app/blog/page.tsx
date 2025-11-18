'use client';

import React from 'react';
import { FileText, Clock, User, ArrowRight } from 'lucide-react';

// --- Mock Data to match the complex Figma design structure ---
const contentUpdates = [
    {
        type: 'contest',
        title: 'Global Coding Challenge',
        date: 'July 15, 2024',
        platform: 'Codeforces',
        image: 'https://placehold.co/200x120/0f0f0f/e5e7eb?text=Code+Blocks',
        countdown: { hours: 2, minutes: 30, seconds: 15 } // Mock countdown data
    },
    {
        type: 'blog',
        title: 'Mastering Dynamic Programming',
        author: 'Alex Turner',
        date: 'July 10, 2024',
        image: 'https://placehold.co/200x120/1f2937/e5e7eb?text=Circuit+Board',
        link: '#blog-post-dynamic-programming'
    },
    {
        type: 'contest',
        title: 'AtCoder Grand Contest',
        date: 'July 25, 2024',
        platform: 'AtCoder',
        image: 'https://placehold.co/200x120/171717/e5e7eb?text=Server+Racks',
        countdown: { hours: 7, minutes: 45, seconds: 0 }
    },
    {
        type: 'blog',
        title: 'Advanced Data Structures',
        author: 'Jane Doe',
        date: 'July 01, 2024',
        image: 'https://placehold.co/200x120/27272a/e5e7eb?text=Binary+Code',
        link: '#blog-post-data-structures'
    },
];

// Reusable Countdown Block Component
const CountdownBlock: React.FC<{ value: number, label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center p-3 bg-zinc-900 rounded-lg border border-zinc-700 w-full">
        <span className="text-3xl font-mono font-bold text-white">{value.toString().padStart(2, '0')}</span>
        <span className="text-xs text-gray-500 uppercase mt-1">{label}</span>
    </div>
);

// Reusable Image Card Component (for mock visuals)
const ImageCard: React.FC<{ src: string, alt: string }> = ({ src, alt }) => (
    <div className="w-full h-32 overflow-hidden rounded-lg shadow-lg">
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/200x120/18181b/e5e7eb?text=CodeWinder"; // Fallback placeholder
            }}
        />
    </div>
);

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
            <div className="max-w-[1000px] mx-auto">
                <div className="mt-8">
                    <h1 className="text-3xl font-bold mb-10 text-white text-center">
                        Blog & Contest Updates
                    </h1>

                    <div className="space-y-12">
                        {contentUpdates.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="p-6 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6">

                                    {/* Left Column: Text Content */}
                                    <div className="md:col-span-2 flex flex-col justify-between">
                                        <div>
                                            {item.type === 'contest' && (
                                                <span className="text-sm font-semibold text-orange-500 uppercase tracking-widest block mb-2">Contest Announcement</span>
                                            )}
                                            {item.type === 'blog' && (
                                                <span className="text-sm font-semibold text-teal-400 uppercase tracking-widest block mb-2">Blog Post</span>
                                            )}

                                            <h2 className="text-2xl font-bold mb-2 text-white">{item.title}</h2>

                                            <p className="text-sm text-gray-500 mb-4">
                                                {item.type === 'contest' && (
                                                    `Date: ${item.date} | Platform: ${item.platform}`
                                                )}
                                                {item.type === 'blog' && (
                                                    <span className="flex items-center gap-3">
                                                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> By {item.author}</span>
                                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Published {item.date}</span>
                                                    </span>
                                                )}
                                            </p>

                                            {item.type === 'contest' && (
                                                <a href="#" className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-2 transition-colors">
                                                    View Details <ArrowRight className="w-4 h-4" />
                                                </a>
                                            )}
                                            {item.type === 'blog' && (
                                                <a href={item.link} className="text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-2 transition-colors">
                                                    Read More <ArrowRight className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>

                                        {/* Countdown Timer (Contests only) */}
                                        {item.type === 'contest' && item.countdown && (
                                            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between gap-4">
                                                <CountdownBlock value={item.countdown.hours} label="Hours" />
                                                <CountdownBlock value={item.countdown.minutes} label="Minutes" />
                                                <CountdownBlock value={item.countdown.seconds} label="Seconds" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column: Image */}
                                    <div className="md:col-span-1">
                                        <ImageCard src={item.image} alt={`${item.title} visual`} />
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

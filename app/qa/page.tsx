'use client';

import { HelpCircle, Search, Tag } from 'lucide-react';

// Mock data reflecting the structured card-based design in the Figma image
const mockQuestions = [
    {
        id: 1,
        title: 'How to optimize dynamic programming solutions?',
        description: 'Struggling to improve the time complexity of my DP algorithms. Any tips or resources?',
        tags: ['dynamic-programming', 'optimization'],
        imagePlaceholder: 'orange-1',
    },
    {
        id: 2,
        title: 'Best data structures for graph algorithms?',
        description: 'Which data structures are most efficient for implementing graph algorithms like Dijkstra\'s or BFS?',
        tags: ['graphs', 'data-structures'],
        imagePlaceholder: 'wavy-2',
    },
    {
        id: 3,
        title: 'Understanding Recursion vs. Iteration',
        description: 'What are the key differences between recursion and iteration, and when should I use one over the other?',
        tags: ['recursion', 'algorithms'],
        imagePlaceholder: 'wavy-3',
    },
    {
        id: 4,
        title: 'Debugging techniques for competitive coding',
        description: 'What are some effective debugging strategies for identifying and fixing errors in competitive programming code?',
        tags: ['debugging', 'tools'],
        imagePlaceholder: 'orange-4',
    },
    {
        id: 5,
        title: 'Time complexity analysis of algorithms',
        description: 'How do I accurately analyze the time complexity of my algorithms, especially for nested loops?',
        tags: ['complexity', 'analysis'],
        imagePlaceholder: 'wavy-5',
    },
];

// Helper component for the placeholder image based on a type for varied visuals
const ImageCard = ({ type }: { type: string }) => {
    // These styles are inspired by the orange/dark theme and abstract patterns
    const gradient = type.includes('wavy')
        ? 'bg-gradient-to-br from-zinc-800 to-zinc-900'
        : 'bg-gradient-to-br from-orange-600 to-orange-800';

    // Abstract pattern visual simulation
    const patternStyle = type.includes('wavy')
        ? 'background: repeating-linear-gradient(45deg, rgba(255,140,50,.15), rgba(255,140,50,.15) 5px, transparent 5px, transparent 10px);'
        : 'background: repeating-linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.08) 3px, transparent 3px, transparent 6px);'

    return (
        <div className={`w-full h-full rounded-xl overflow-hidden ${gradient} transform transition-transform duration-300 group-hover:scale-[1.02]`}
            style={{
                minHeight: '200px',
                ... (type.includes('wavy') ? { background: 'linear-gradient(145deg, #27272a, #3f3f46)' } : {}),
            }}
        >
            {/* Inner abstract pattern */}
            <div className="w-full h-full opacity-60" style={{
                ... (type.includes('wavy') ? {
                    backgroundImage: 'url(https://placehold.co/400x400/27272a/fff?text=ABSTRACT+VISUAL)',
                    backgroundSize: 'cover'
                } : {
                    backgroundImage: 'url(https://placehold.co/400x400/ea580c/fff?text=CODE+SNIPPET)',
                    backgroundSize: 'cover'
                })
            }}>
            </div>
        </div>
    );
};


export default function QAPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Header (Mocked Global Header from Figma) */}
                <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Q&A / Doubts</h1>
                    <p className="text-gray-400 text-lg">Ask questions, share knowledge, and find answers from the community.</p>
                </header>

                {/* Search and Filters Area */}
                <div className="mb-12">
                    <div className="relative max-w-4xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search questions or topics..."
                            className="w-full p-4 pl-12 bg-zinc-800 text-white text-lg rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-shadow shadow-lg"
                        />
                        <Search className="w-6 h-6 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

                {/* Questions Grid */}
                <div className="grid grid-cols-1 gap-y-12 max-w-4xl mx-auto">
                    {mockQuestions.map((q) => (
                        <div
                            key={q.id}
                            className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 p-6 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 hover:border-orange-600 transition-all cursor-pointer group"
                        >
                            {/* Left Content Area */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">{q.title}</h3>
                                    <p className="text-gray-400 text-base mb-4 line-clamp-2">{q.description}</p>
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {q.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 text-orange-400 border border-zinc-700"
                                            >
                                                <Tag className="w-3 h-3 inline-block mr-1 align-sub" /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-orange-500 font-semibold inline-flex items-center gap-1 transition-colors hover:text-orange-300 mt-4"
                                >
                                    View Details
                                </a>
                            </div>

                            {/* Right Image/Visual Placeholder */}
                            <div className="md:order-last order-first">
                                <ImageCard type={q.imagePlaceholder} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

'use client';

import React from 'react';
import { Send, MessageCircle, User as UserIcon, Zap } from 'lucide-react';

// --- Static Mock Data to Replicate Figma Design ---
const MOCK_ACTIVE_MEMBERS = [
    { id: 'mock-1', name: 'Alex' },
    { id: 'mock-2', name: 'Sarah' },
    { id: 'mock-3', name: 'Ryan' },
    { id: 'mock-4', name: 'Emily' },
    { id: 'mock-5', name: 'David' },
];

const MOCK_CHAT_MESSAGES = [
    { id: 1, user: 'Alex', text: 'Hey everyone! Anyone else stuck on the latest challenge? I\'m having trouble with the dynamic programming part.', type: 'left' },
    { id: 2, user: 'Ryan', text: 'Hey Alex, yeah, I was too. Try breaking it down into smaller subproblems. That helped me a lot.', type: 'right' },
    { id: 3, user: 'Alex', text: 'Thanks, guys! I\'ll give those a shot. Appreciate the help!', type: 'left' },
];

// Helper to generate a placeholder avatar
const getAvatar = (name: string, isRightAligned: boolean) => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0 ${isRightAligned ? 'bg-orange-600' : 'bg-zinc-700'}`}>
        {name.charAt(0).toUpperCase()}
    </div>
);

interface MockMessage {
    id: number;
    user: string;
    text: string;
    type: 'left' | 'right';
}

const ChatBubble: React.FC<{ message: MockMessage }> = ({ message }) => {
    const isRightAligned = message.type === 'right';
    const alignClass = isRightAligned ? 'justify-end' : 'justify-start';

    // Custom styling to match the Figma bubbles exactly
    const bubbleClass = isRightAligned
        ? 'bg-orange-600 text-white rounded-tl-xl rounded-tr-md rounded-bl-xl rounded-br-xl'
        : 'bg-zinc-800 text-gray-200 rounded-tr-xl rounded-tl-md rounded-bl-xl rounded-br-xl';

    // Avatars are placed outside the message wrapper for clean design match
    return (
        <div className={`flex w-full my-3 ${alignClass} items-start`}>
            {/* Avatar (Left side) */}
            {!isRightAligned && <div className="mr-2">{getAvatar(message.user, false)}</div>}

            {/* Message Content */}
            <div className={`flex flex-col max-w-[70%] lg:max-w-[50%] ${isRightAligned ? 'items-end' : 'items-start'} ${isRightAligned ? 'order-1' : 'order-2'}`}>
                {/* Username/Time is not shown in the Figma bubble, only above the message block */}
                <span className={`text-sm ${isRightAligned ? 'text-gray-400 self-end mr-2' : 'text-gray-400 self-start ml-2'} mb-1`}>
                    {message.user}
                </span>
                <div className={`p-3 shadow-md ${bubbleClass}`}>
                    {message.text}
                </div>
            </div>

            {/* Avatar (Right side) */}
            {isRightAligned && <div className="ml-2 order-3">{getAvatar(message.user, true)}</div>}
        </div>
    );
};


export default function WorldChatPage() {
    const currentUserName = 'GuestUser'; // Static placeholder for the current user, used in the input box

    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold mb-1 text-white">World Chat</h1>
                        <p className="text-gray-400">
                            Join the global conversation with fellow coders. Share insights, ask questions, and connect with the community.
                        </p>
                    </div>
                </div>

                {/* Main Layout: Chat Area and Active Members Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Chat Area */}
                    <div className="lg:col-span-2 flex flex-col h-[75vh] bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800">

                        {/* Messages Display */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-2">
                            {MOCK_CHAT_MESSAGES.map((msg) => (
                                <ChatBubble
                                    key={msg.id}
                                    message={msg}
                                />
                            ))}
                            {/* This message specifically from the Figma design that has the avatar below the text */}
                            <div className="flex w-full my-3 justify-start items-end">
                                <div className="mr-2">{getAvatar("Alex", false)}</div>
                                <div className="flex flex-col max-w-[70%] lg:max-w-[50%] items-start order-2">
                                    <span className="text-sm text-gray-400 self-start ml-2 mb-1">Alex</span>
                                    <div className="p-3 shadow-md bg-zinc-800 text-gray-200 rounded-tr-xl rounded-tl-md rounded-bl-xl rounded-br-xl">
                                        Thanks, guys! I'll give those a shot. Appreciate the help!
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Message Input - Styled to match the Figma design */}
                        <form className="p-4 border-t border-zinc-800 flex items-center gap-4">
                            <div className="shrink-0">{getAvatar(currentUserName, true)}</div>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-grow bg-zinc-800 text-white border border-zinc-700 rounded-xl py-3 px-4 placeholder-gray-500 focus:ring-1 focus:ring-orange-600 focus:border-orange-600 transition-all text-sm"
                            />
                            <button
                                type="submit"
                                className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-xl transition-colors shrink-0"
                                aria-label="Send Message"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Active Members */}
                    <div className="lg:col-span-1 bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 p-6 h-fit sticky top-24">
                        <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-3 text-gray-200">Active Members</h2>
                        <div className="space-y-4">
                            {/* Mock active members list (matches Figma design) */}
                            {MOCK_ACTIVE_MEMBERS.map((member) => (
                                <div key={member.id} className="flex items-center justify-between gap-4 p-2 rounded-lg transition-colors cursor-pointer">
                                    <div className='flex items-center gap-3'>
                                        {getAvatar(member.name, false)}
                                        <p className="text-white font-medium">{member.name}</p>
                                    </div>
                                    {/* The Figma design has an empty space here */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
// Note: Custom Scrollbar style is no longer needed since this is static, but left for reference.

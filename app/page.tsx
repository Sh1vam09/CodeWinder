'use client';

import { Users, FileText, Trophy, MessageCircle, Code } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-600 flex items-center justify-center rounded">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">CodeWinder</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">World Chat</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Teams</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contests</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Q&A</a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
              Sign Up
            </button>
            <button className="text-gray-300 hover:text-white font-semibold px-6 py-2 transition-colors">
              Log In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Hero Content Container with dark overlay */}
        <div className="relative w-full max-w-[1400px] mx-6 rounded-3xl overflow-hidden" style={{ minHeight: '500px' }}>
          {/* Background with orange light streaks */}
          <div className="absolute inset-0 bg-black">
            {/* Orange gradient streaks with glow effect */}
            <div className="absolute inset-0">
              {/* Multiple scattered light streaks */}
              <div className="absolute top-0 left-0 w-full h-full"
                style={{
                  background: `
                    linear-gradient(118deg,
                      transparent 0%,
                      transparent 8%,
                      rgba(234, 88, 12, 0.1) 12%,
                      rgba(249, 115, 22, 0.3) 15%,
                      rgba(255, 140, 50, 0.5) 17%,
                      rgba(255, 160, 80, 0.7) 18%,
                      rgba(255, 180, 100, 0.8) 18.5%,
                      rgba(255, 160, 80, 0.7) 19%,
                      rgba(255, 140, 50, 0.5) 20%,
                      rgba(249, 115, 22, 0.3) 22%,
                      rgba(234, 88, 12, 0.1) 25%,
                      transparent 29%,
                      transparent 100%
                    ),
                    linear-gradient(122deg,
                      transparent 0%,
                      transparent 20%,
                      rgba(234, 88, 12, 0.08) 24%,
                      rgba(249, 115, 22, 0.25) 27%,
                      rgba(255, 140, 50, 0.45) 29%,
                      rgba(255, 160, 80, 0.65) 30%,
                      rgba(255, 180, 100, 0.75) 30.5%,
                      rgba(255, 160, 80, 0.65) 31%,
                      rgba(255, 140, 50, 0.45) 32%,
                      rgba(249, 115, 22, 0.25) 34%,
                      rgba(234, 88, 12, 0.08) 37%,
                      transparent 41%,
                      transparent 100%
                    ),
                    linear-gradient(128deg,
                      transparent 0%,
                      transparent 35%,
                      rgba(234, 88, 12, 0.12) 39%,
                      rgba(249, 115, 22, 0.32) 42%,
                      rgba(255, 140, 50, 0.52) 44%,
                      rgba(255, 160, 80, 0.72) 45%,
                      rgba(255, 180, 100, 0.82) 45.5%,
                      rgba(255, 160, 80, 0.72) 46%,
                      rgba(255, 140, 50, 0.52) 47%,
                      rgba(249, 115, 22, 0.32) 49%,
                      rgba(234, 88, 12, 0.12) 52%,
                      transparent 56%,
                      transparent 100%
                    ),
                    linear-gradient(125deg,
                      transparent 0%,
                      transparent 48%,
                      rgba(234, 88, 12, 0.09) 52%,
                      rgba(249, 115, 22, 0.28) 55%,
                      rgba(255, 140, 50, 0.48) 57%,
                      rgba(255, 160, 80, 0.68) 58%,
                      rgba(255, 180, 100, 0.78) 58.5%,
                      rgba(255, 160, 80, 0.68) 59%,
                      rgba(255, 140, 50, 0.48) 60%,
                      rgba(249, 115, 22, 0.28) 62%,
                      rgba(234, 88, 12, 0.09) 65%,
                      transparent 69%,
                      transparent 100%
                    ),
                    linear-gradient(132deg,
                      transparent 0%,
                      transparent 58%,
                      rgba(234, 88, 12, 0.11) 62%,
                      rgba(249, 115, 22, 0.31) 65%,
                      rgba(255, 140, 50, 0.51) 67%,
                      rgba(255, 160, 80, 0.71) 68%,
                      rgba(255, 180, 100, 0.81) 68.5%,
                      rgba(255, 160, 80, 0.71) 69%,
                      rgba(255, 140, 50, 0.51) 70%,
                      rgba(249, 115, 22, 0.31) 72%,
                      rgba(234, 88, 12, 0.11) 75%,
                      transparent 79%,
                      transparent 100%
                    ),
                    linear-gradient(120deg,
                      transparent 0%,
                      transparent 70%,
                      rgba(234, 88, 12, 0.1) 74%,
                      rgba(249, 115, 22, 0.3) 77%,
                      rgba(255, 140, 50, 0.5) 79%,
                      rgba(255, 160, 80, 0.7) 80%,
                      rgba(255, 180, 100, 0.8) 80.5%,
                      rgba(255, 160, 80, 0.7) 81%,
                      rgba(255, 140, 50, 0.5) 82%,
                      rgba(249, 115, 22, 0.3) 84%,
                      rgba(234, 88, 12, 0.1) 87%,
                      transparent 91%,
                      transparent 100%
                    )
                  `,
                  filter: 'blur(1px)'
                }}
              />
              {/* Glow layer */}
              <div className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse 800px 400px at 20% 40%, rgba(255, 140, 50, 0.15), transparent),
                    radial-gradient(ellipse 700px 350px at 40% 60%, rgba(255, 140, 50, 0.12), transparent),
                    radial-gradient(ellipse 900px 450px at 65% 45%, rgba(255, 140, 50, 0.13), transparent),
                    radial-gradient(ellipse 600px 300px at 85% 70%, rgba(255, 140, 50, 0.1), transparent)
                  `,
                  filter: 'blur(40px)'
                }}
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-8 py-24 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Welcome to the Competitive<br />Programming Hub
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join a vibrant community of competitive programmers. Sharpen your skills, collaborate with peers, and compete exciting contests.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-10 py-4 rounded-xl text-base transition-colors shadow-lg shadow-orange-600/30">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Quick Navigation</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* World Chat */}
            <div className="flex flex-col items-start">
              <div className="w-full aspect-square rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden shadow-xl">
                <img
                  src="\worldchat.png"
                  alt="worldchat"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white font-medium text-lg">World Chat</p>
            </div>

            {/* Teams */}
            <div className="flex flex-col items-start">
              <div className="w-full aspect-square rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden shadow-xl">
                <img
                  src="/Team.png"
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white font-medium text-lg">Teams</p>
            </div>

            {/* Blog */}
            <div className="flex flex-col items-start">
              <div className="w-full aspect-square rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden shadow-xl">
                <img
                  src="\blog.png"
                  alt="Blog"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white font-medium text-lg">Blog</p>
            </div>

            {/* Contests */}
            <div className="flex flex-col items-start">
              <div className="w-full aspect-square rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden shadow-xl">
                <img
                  src="/contest.png"
                  alt="Contest"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white font-medium text-lg">Contests</p>
            </div>

            {/* Q&A */}
                        <div className="flex flex-col items-start">
              <div className="w-full aspect-square rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden shadow-xl">
                <img
                  src="/QA.png"
                  alt="QA"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white font-medium text-lg">Q&A</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Programmers Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Top Programmers</h2>

          <div className="flex flex-wrap justify-start gap-12">
            {[
              { name: 'Alex', points: '1000 points', color: 'from-slate-700 to-slate-800' },
              { name: 'Jordan', points: '950 points', color: 'from-teal-700 to-teal-800' },
              { name: 'Taylor', points: '900 points', color: 'from-slate-600 to-slate-800' },
              { name: 'Casey', points: '850 points', color: 'from-teal-600 to-teal-700' },
              { name: 'Jamie', points: '800 points', color: 'from-slate-500 to-slate-700' }
            ].map((programmer, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-36 h-36 rounded-full bg-gradient-to-br ${programmer.color} mb-4 flex items-center justify-center overflow-hidden shadow-2xl`}>
                  <div className="w-full h-full bg-slate-600/80 rounded-full flex items-center justify-center text-slate-300">
                    <Users className="w-20 h-20" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-white font-semibold text-lg mb-1">{programmer.name}</p>
                <p className="text-gray-400 text-sm">{programmer.points}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 px-6 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Upcoming Events</h2>

          <div className="relative bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="p-12">
                <h3 className="text-3xl font-bold mb-6">Global Coding Challenge</h3>
                <p className="text-gray-400 mb-10 leading-relaxed text-base">
                  Join the ultimate coding showdown! Compete against top programmers worldwide in a series of challenging problems. Win prizes and recognition.
                </p>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-3 shadow-lg">
                  Register Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Right Decorative Section */}
              <div className="relative min-h-[300px] bg-black">
                <div className="absolute inset-0">
                  {/* Multiple scattered light streaks with glow */}
                  <div className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(138deg,
                          transparent 0%,
                          transparent 5%,
                          rgba(234, 88, 12, 0.12) 10%,
                          rgba(249, 115, 22, 0.35) 14%,
                          rgba(255, 140, 50, 0.55) 16%,
                          rgba(255, 160, 80, 0.75) 17%,
                          rgba(255, 180, 100, 0.85) 17.5%,
                          rgba(255, 160, 80, 0.75) 18%,
                          rgba(255, 140, 50, 0.55) 19%,
                          rgba(249, 115, 22, 0.35) 21%,
                          rgba(234, 88, 12, 0.12) 25%,
                          transparent 30%,
                          transparent 100%
                        ),
                        linear-gradient(142deg,
                          transparent 0%,
                          transparent 18%,
                          rgba(234, 88, 12, 0.1) 23%,
                          rgba(249, 115, 22, 0.32) 27%,
                          rgba(255, 140, 50, 0.52) 29%,
                          rgba(255, 160, 80, 0.72) 30%,
                          rgba(255, 180, 100, 0.82) 30.5%,
                          rgba(255, 160, 80, 0.72) 31%,
                          rgba(255, 140, 50, 0.52) 32%,
                          rgba(249, 115, 22, 0.32) 34%,
                          rgba(234, 88, 12, 0.1) 38%,
                          transparent 43%,
                          transparent 100%
                        ),
                        linear-gradient(148deg,
                          transparent 0%,
                          transparent 32%,
                          rgba(234, 88, 12, 0.13) 37%,
                          rgba(249, 115, 22, 0.36) 41%,
                          rgba(255, 140, 50, 0.56) 43%,
                          rgba(255, 160, 80, 0.76) 44%,
                          rgba(255, 180, 100, 0.86) 44.5%,
                          rgba(255, 160, 80, 0.76) 45%,
                          rgba(255, 140, 50, 0.56) 46%,
                          rgba(249, 115, 22, 0.36) 48%,
                          rgba(234, 88, 12, 0.13) 52%,
                          transparent 57%,
                          transparent 100%
                        ),
                        linear-gradient(145deg,
                          transparent 0%,
                          transparent 46%,
                          rgba(234, 88, 12, 0.11) 51%,
                          rgba(249, 115, 22, 0.33) 55%,
                          rgba(255, 140, 50, 0.53) 57%,
                          rgba(255, 160, 80, 0.73) 58%,
                          rgba(255, 180, 100, 0.83) 58.5%,
                          rgba(255, 160, 80, 0.73) 59%,
                          rgba(255, 140, 50, 0.53) 60%,
                          rgba(249, 115, 22, 0.33) 62%,
                          rgba(234, 88, 12, 0.11) 66%,
                          transparent 71%,
                          transparent 100%
                        ),
                        linear-gradient(152deg,
                          transparent 0%,
                          transparent 60%,
                          rgba(234, 88, 12, 0.14) 65%,
                          rgba(249, 115, 22, 0.37) 69%,
                          rgba(255, 140, 50, 0.57) 71%,
                          rgba(255, 160, 80, 0.77) 72%,
                          rgba(255, 180, 100, 0.87) 72.5%,
                          rgba(255, 160, 80, 0.77) 73%,
                          rgba(255, 140, 50, 0.57) 74%,
                          rgba(249, 115, 22, 0.37) 76%,
                          rgba(234, 88, 12, 0.14) 80%,
                          transparent 85%,
                          transparent 100%
                        )
                      `,
                      filter: 'blur(1.5px)'
                    }}
                  />
                  {/* Glow layer for events section */}
                  <div className="absolute inset-0"
                    style={{
                      background: `
                        radial-gradient(ellipse 600px 300px at 30% 30%, rgba(255, 140, 50, 0.2), transparent),
                        radial-gradient(ellipse 700px 350px at 60% 50%, rgba(255, 140, 50, 0.18), transparent),
                        radial-gradient(ellipse 500px 250px at 80% 70%, rgba(255, 140, 50, 0.15), transparent)
                      `,
                      filter: 'blur(50px)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

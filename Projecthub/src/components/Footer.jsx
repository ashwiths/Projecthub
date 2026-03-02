import React from 'react';

import React from 'react';

export default function Footer() {
    return (
        <footer id="contact" className="relative z-10 border-t border-white/5 pt-12 pb-8 mt-auto bg-slate-950/50 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                    {/* Brand Section */}
                    <div className="flex flex-col items-start gap-4">
                        <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-1">
                            Powered By
                        </span>

                        <a
                            href="https://www.bluelabtech.space/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer inline-flex"
                        >
                            {/* Bluelab Logo Icon */}
                            <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="100" height="100" rx="24" fill="#262626" />
                                    <path d="M 32 24 L 32 76" stroke="white" strokeWidth="12" strokeLinecap="round" />
                                    <path d="M 32 46 C 45 42 68 42 68 60 C 68 76 45 76 32 76" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="52" cy="36" r="3.5" fill="white" />
                                    <circle cx="44" cy="28" r="2.5" fill="white" />
                                    <circle cx="58" cy="26" r="2" fill="white" />
                                    <circle cx="48" cy="18" r="1.5" fill="white" />
                                </svg>
                            </div>

                            {/* Bluelab Logo Text */}
                            <div className="flex flex-col items-start justify-center">
                                <span className="text-2xl font-black tracking-widest text-[#262626] dark:text-gray-100 leading-none mb-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                    BLUELAB
                                </span>
                                <span className="text-[10px] font-semibold tracking-[0.3em] text-gray-500 leading-none">
                                    TECHNOLOGIES
                                </span>
                            </div>
                        </a>
                        <p className="text-sm text-slate-400 mt-2 max-w-sm leading-relaxed">
                            We specialize in academic project guidance, custom software development, and technical consulting. Transforming student ideas into reality.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col md:items-end gap-3">
                        <h3 className="text-sm font-bold text-white mb-2 tracking-wide uppercase">Contact Us</h3>

                        <a href="mailto:bluelabtechnologies@gmail.com" className="flex items-center gap-3 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                            <span className="text-lg">✉️</span>
                            bluelabtechnologies@gmail.com
                        </a>

                        <div className="flex items-start gap-3 text-sm text-slate-400 mt-2">
                            <span className="text-lg">📞</span>
                            <div className="flex flex-col gap-2 md:items-end">
                                <a href="tel:+918148955789" className="hover:text-indigo-400 transition-colors">+91 81489 55789</a>
                                <a href="tel:+918870348008" className="hover:text-indigo-400 transition-colors">+91 88703 48008</a>
                                <a href="tel:+919345854516" className="hover:text-indigo-400 transition-colors">+91 93458 54516</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
                    <div>
                        © {new Date().getFullYear()} ProjectHub. Empowering students to build better.
                    </div>
                </div>
            </div>
        </footer>
    );
}

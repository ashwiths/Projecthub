import { useNavigate } from 'react-router-dom'

const techBadges = [
    { label: 'AI & ML', icon: '🤖' },
    { label: 'Web Dev', icon: '🌐' },
    { label: 'Cybersecurity', icon: '🔐' },
    { label: 'IoT', icon: '📡' },
    { label: 'Cloud', icon: '☁️' },
    { label: 'Data Science', icon: '📊' },
]

const stats = [
    { value: '2,400+', label: 'Projects Delivered' },
    { value: '850+', label: 'Happy Students' },
    { value: '50+', label: 'Colleges Served' },
    { value: '98%', label: 'Success Rate' },
]

export default function Dashboard() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

            {/* ---- Background ---- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* grid pattern */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                {/* radial glow top-left */}
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px]" />
                {/* radial glow bottom-right */}
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
                {/* radial glow center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-900/20 blur-[100px]" />
            </div>

            {/* ---- Navbar ---- */}
            <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/30">
                        P
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-white">
                        Project<span className="text-indigo-400">Hub</span>
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    <a href="#features" className="hidden md:block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                        How it works
                    </a>
                    <a href="#domains" className="hidden md:block text-sm text-slate-400 hover:text-white transition-colors duration-200">
                        Domains
                    </a>
                    <button
                        onClick={() => navigate('/onboarding')}
                        className="text-sm font-medium px-4 py-2 rounded-lg border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-200"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ---- Hero ---- */}
            <section className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-20 md:pt-36 md:pb-28">

                {/* Pill badge */}
                <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    Trusted by 850+ students across India
                </div>

                {/* Headline */}
                <h1 className="animate-fade-in delay-100 max-w-4xl text-5xl md:text-7xl font-black tracking-tight leading-tight">
                    Build Your College{' '}
                    <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                        Project Faster
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="animate-fade-in delay-200 mt-6 max-w-xl text-lg md:text-xl text-slate-400 leading-relaxed">
                    Helping students complete <span className="text-slate-200 font-medium">mini projects</span>,{' '}
                    <span className="text-slate-200 font-medium">final year projects</span>, and{' '}
                    <span className="text-slate-200 font-medium">portfolio builds</span> — guided by experts.
                </p>

                {/* CTA Buttons */}
                <div className="animate-fade-in delay-300 mt-10 flex flex-col sm:flex-row gap-4 items-center">
                    <button
                        id="get-started-btn"
                        onClick={() => navigate('/onboarding')}
                        className="animate-pulse-glow group relative px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-base text-white shadow-xl shadow-indigo-500/30 hover:scale-105 hover:shadow-indigo-500/50 active:scale-95 transition-all duration-200"
                    >
                        <span className="flex items-center gap-2">
                            Get Started
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </button>
                    <a
                        href="#features"
                        className="px-8 py-4 rounded-xl border border-white/10 text-slate-300 font-medium text-base hover:bg-white/5 hover:border-white/20 transition-all duration-200"
                    >
                        See how it works
                    </a>
                </div>

                {/* Tech domain badges */}
                <div id="domains" className="animate-fade-in delay-400 mt-14 flex flex-wrap justify-center gap-3">
                    {techBadges.map((b) => (
                        <span
                            key={b.label}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default"
                        >
                            {b.icon} {b.label}
                        </span>
                    ))}
                </div>
            </section>

            {/* ---- Stats ---- */}
            <section className="relative z-10 px-6 md:px-12 pb-20">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                        <div
                            key={s.label}
                            className={`animate-fade-in delay-${(i + 2) * 100} flex flex-col items-center justify-center py-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm hover:bg-white/6 transition-all duration-300`}
                        >
                            <span className="text-3xl font-black text-white">{s.value}</span>
                            <span className="mt-1 text-xs text-slate-400 font-medium text-center">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---- How it works ---- */}
            <section id="features" className="relative z-10 px-6 md:px-12 pb-28">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Three steps to your finished project</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { step: '01', title: 'Tell us your idea', desc: 'Fill out our simple form with your project type, domain, and requirements — takes under 3 minutes.', icon: '📝' },
                            { step: '02', title: 'We match you with experts', desc: 'Our team reviews your request and assigns the right mentors for your tech stack instantly.', icon: '🤝' },
                            { step: '03', title: 'Get your project done', desc: 'Receive guidance, code reviews, and full project delivery — all within your deadline.', icon: '🚀' },
                        ].map((card) => (
                            <div
                                key={card.step}
                                className="relative p-6 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm hover:bg-white/6 hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="absolute top-4 right-4 text-4xl font-black text-white/5 group-hover:text-indigo-500/10 transition-colors duration-300 select-none">
                                    {card.step}
                                </div>
                                <div className="text-3xl mb-4">{card.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- Bottom CTA Banner ---- */}
            <section className="relative z-10 px-6 pb-20">
                <div className="max-w-3xl mx-auto text-center py-14 px-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900/30 to-violet-900/20 backdrop-blur-sm">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                        Ready to build something{' '}
                        <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">amazing?</span>
                    </h2>
                    <p className="text-slate-400 mb-8">Join hundreds of students who shipped their projects on time.</p>
                    <button
                        onClick={() => navigate('/onboarding')}
                        className="group px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        <span className="flex items-center gap-2">
                            Start Your Project
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </button>
                </div>
            </section>

            {/* ---- Footer ---- */}
            <footer className="relative z-10 border-t border-white/5 py-8 text-center text-sm text-slate-500">
                © 2026 ProjectHub. Empowering students to build better.
            </footer>
        </div>
    )
}

import { useNavigate } from 'react-router-dom'

export default function SuccessScreen() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col overflow-x-hidden">

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[120px]" />
                <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 flex items-center px-6 md:px-12 py-5 border-b border-white/5 backdrop-blur-sm">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/30">
                        P
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-white">
                        Project<span className="text-indigo-400">Hub</span>
                    </span>
                </button>
            </nav>

            {/* Main content */}
            <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-16">
                <div className="text-center max-w-lg">

                    {/* Rocket icon */}
                    <div className="animate-check-pop mb-8 flex justify-center">
                        <div className="relative">
                            {/* Glow ring */}
                            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl scale-150" />
                            {/* Circle */}
                            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                                <span className="animate-rocket text-5xl select-none" style={{ display: 'inline-block' }}>🚀</span>
                            </div>
                        </div>
                    </div>

                    {/* Check badge */}
                    <div className="animate-fade-in mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Request submitted successfully!
                    </div>

                    {/* Headline */}
                    <h1 className="animate-fade-in delay-100 text-4xl md:text-5xl font-black tracking-tight mb-4">
                        We'll contact you{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                            shortly
                        </span>{' '}
                        🚀
                    </h1>

                    {/* Subtext */}
                    <p className="animate-fade-in delay-200 text-slate-400 text-lg leading-relaxed mb-10">
                        Our team has received your project request and will reach out to you within{' '}
                        <span className="text-white font-semibold">24 hours</span> to discuss the next steps.
                    </p>

                    {/* What to expect */}
                    <div className="animate-fade-in delay-300 mb-10 text-left rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-5 space-y-3">
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-4">What happens next?</p>
                        {[
                            { icon: '📞', text: 'Our team will call or WhatsApp you to understand your requirements better.' },
                            { icon: '📋', text: "You'll get a detailed project plan and timeline within 48 hours." },
                            { icon: '💻', text: 'Development begins — you track progress through shared milestones.' },
                            { icon: '✅', text: 'Final delivery with code, documentation, and a working demo.' },
                        ].map((item) => (
                            <div key={item.text} className="flex items-start gap-3">
                                <span className="text-lg shrink-0">{item.icon}</span>
                                <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            id="back-to-dashboard-btn"
                            onClick={() => navigate('/')}
                            className="group px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                                Back to Dashboard
                            </span>
                        </button>
                        <button
                            onClick={() => navigate('/onboarding')}
                            className="px-8 py-3.5 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 hover:border-white/20 transition-all duration-200"
                        >
                            Submit Another Request
                        </button>
                    </div>

                    {/* Support note */}
                    <p className="animate-fade-in delay-500 mt-8 text-sm text-slate-500">
                        Have questions? Reach us at{' '}
                        <a href="mailto:support@projecthub.in" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                            support@projecthub.in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

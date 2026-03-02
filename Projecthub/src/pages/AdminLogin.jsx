import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('adminToken', data.token)
                navigate('/admin/dashboard')
            } else {
                setError(data.error || 'Invalid credentials')
            }
        } catch (err) {
            console.error(err)
            setError('Connection failed. Please ensure the backend is running.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-md animate-scale-in">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs text-slate-400 mb-6 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        Restricted Area
                    </div>
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-lg font-bold shadow-lg shadow-indigo-500/30">
                            P
                        </div>
                        <h1 className="text-2xl font-black tracking-tight text-white">
                            Project<span className="text-indigo-400">Hub</span> Admin
                        </h1>
                    </div>
                    <p className="text-slate-400 text-sm">Sign in to manage student project requests.</p>
                </div>

                <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder="Admin@gmail.com"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="•••••"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                                <p className="text-xs text-red-400 font-medium">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-bold text-white text-sm shadow-xl shadow-indigo-500/25 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                                }`}
                        >
                            {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-xs text-slate-600">
                    © 2024 ProjectHub. Built for administrative use only.
                </p>
            </div>
        </div>
    )
}

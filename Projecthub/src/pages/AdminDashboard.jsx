import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedProject, setSelectedProject] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            navigate('/admin')
            return
        }

        fetchProjects()
    }, [navigate])

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/projects')
            if (response.ok) {
                const data = await response.json()
                setProjects(data)
            } else {
                setError('Failed to fetch data')
            }
        } catch (err) {
            console.error(err)
            setError('Connection error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        navigate('/admin')
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30">
            {/* Navbar */}
            <nav className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/30 text-white">
                        P
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">
                        Project<span className="text-indigo-400">Hub</span> <span className="text-slate-500 font-medium ml-2 text-sm uppercase tracking-widest border-l border-white/10 pl-3">Admin Console</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={fetchProjects}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                        title="Refresh Data"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold hover:bg-red-500 hover:text-white transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="p-6 md:p-10 max-w-[1600px] mx-auto">
                <header className="mb-10">
                    <h2 className="text-3xl font-black tracking-tight mb-2">Project Requests</h2>
                    <p className="text-slate-400">Total submissons: <span className="text-indigo-400 font-bold">{projects.length}</span></p>
                </header>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-slate-500 font-medium">Loading submissions...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center max-w-xl mx-auto">
                        <p className="text-red-400 mb-4 font-medium">{error}</p>
                        <button onClick={fetchProjects} className="px-6 py-2 bg-red-500 rounded-xl font-bold hover:scale-105 transition-transform">Retry</button>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-3xl">
                        <div className="text-5xl mb-4">📭</div>
                        <h3 className="text-xl font-bold text-slate-300">No requests yet</h3>
                        <p className="text-slate-500 mt-2">When students submit projects, they'll appear here.</p>
                    </div>
                ) : (
                    <div className="relative overflow-hidden border border-white/10 rounded-2xl bg-white/3 shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Student Details</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">College & Dept</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Project Type</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Domain</th>
                                        <th className="px-6 py-4 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {projects.map((req) => (
                                        <tr key={req._id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-slate-300">
                                                    {formatDate(req.createdAt)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors uppercase">{req.fullName}</span>
                                                    <span className="text-xs text-slate-500 mt-1">{req.email}</span>
                                                    <span className="text-xs text-slate-500">{req.phone}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col max-w-xs">
                                                    <span className="text-sm text-slate-300 line-clamp-1">{req.collegeName}</span>
                                                    <span className="text-xs text-slate-500 mt-1">{req.department} • Year {req.yearOfStudy}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                    ${req.projectType === 'fyp' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                                                        req.projectType === 'mini' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                            'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'}
                                                `}>
                                                    {req.projectType}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-sm text-indigo-300 font-medium">
                                                    {req.projectDomain}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button
                                                    onClick={() => setSelectedProject(req)}
                                                    className="px-4 py-2 rounded-lg bg-indigo-500 text-xs font-bold hover:bg-indigo-600 transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
                    <div className="relative z-10 w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight">{selectedProject.fullName}</h3>
                                    <p className="text-slate-400 text-sm mt-1">{selectedProject.collegeName}</p>
                                </div>
                                <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-white/10 rounded-xl text-slate-500">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Contact Info</p>
                                        <p className="text-sm">{selectedProject.email}</p>
                                        <p className="text-sm text-slate-400">{selectedProject.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Academic</p>
                                        <p className="text-sm">{selectedProject.department}</p>
                                        <p className="text-sm text-slate-400">Year {selectedProject.yearOfStudy}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Project Classification</p>
                                        <p className="text-sm font-semibold text-indigo-400">{selectedProject.projectType.toUpperCase()}</p>
                                        <p className="text-sm">{selectedProject.projectDomain}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Submission Date</p>
                                        <p className="text-sm">{formatDate(selectedProject.createdAt)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Project Description</p>
                                <p className="text-sm text-slate-300 leading-relaxed italic">
                                    "{selectedProject.description || 'No description provided.'}"
                                </p>
                            </div>
                        </div>
                        <div className="p-6 bg-white/5 border-t border-white/5 flex justify-end">
                            <button onClick={() => setSelectedProject(null)} className="px-6 py-2 bg-indigo-600 rounded-xl font-bold shadow-lg shadow-indigo-500/20">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

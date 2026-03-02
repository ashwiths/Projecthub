import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const departments = [
    'Computer Science & Engineering (CSE)',
    'Information Technology (IT)',
    'Electronics & Communication (ECE)',
    'Electrical Engineering (EE)',
    'Mechanical Engineering (ME)',
    'Civil Engineering (CE)',
    'Artificial Intelligence & ML (AI/ML)',
    'Data Science (DS)',
    'Biomedical Engineering',
    'Other',
]

const domains = [
    'Artificial Intelligence & ML',
    'Web Development',
    'Cybersecurity',
    'Internet of Things (IoT)',
    'Cloud Computing',
    'Data Science & Analytics',
    'Blockchain',
    'Mobile App Development',
    'Embedded Systems',
    'Computer Vision',
    'Other',
]

const projectTypes = [
    { id: 'mini', label: 'Mini Project', desc: 'Quick, focused projects', icon: '⚡' },
    { id: 'fyp', label: 'Final Year Project', desc: 'Full-scope capstone work', icon: '🎓' },
    { id: 'portfolio', label: 'Portfolio Project', desc: 'Showcase your skills', icon: '💼' },
    { id: 'custom', label: 'Custom Project', desc: 'Something unique in mind?', icon: '✨' },
]

// Floating label input component
function FloatingInput({ id, label, type = 'text', value, onChange, required, pattern, inputMode }) {
    return (
        <div className="relative">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                pattern={pattern}
                inputMode={inputMode}
                placeholder=" "
                className="peer block w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-6 pb-2 text-sm text-white placeholder-transparent focus:outline-none focus:border-indigo-500 focus:bg-white/8 hover:border-white/20 transition-all duration-200 autofill:bg-white/5"
            />
            <label
                htmlFor={id}
                className="absolute left-4 top-2 text-xs text-slate-500 font-medium peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400 transition-all duration-200 pointer-events-none"
            >
                {label} {required && <span className="text-indigo-400">*</span>}
            </label>
        </div>
    )
}

// Floating label select component
function FloatingSelect({ id, label, value, onChange, options, required }) {
    return (
        <div className="relative">
            <select
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className="peer block w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-6 pb-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:bg-white/8 hover:border-white/20 transition-all duration-200 appearance-none cursor-pointer"
                style={{ colorScheme: 'dark' }}
            >
                <option value="" disabled hidden />
                {options.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-900 text-white">
                        {opt}
                    </option>
                ))}
            </select>
            <label
                htmlFor={id}
                className={`absolute left-4 pointer-events-none transition-all duration-200 font-medium
          ${value ? 'top-2 text-xs text-slate-500' : 'top-4 text-sm text-slate-500'}
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400`}
            >
                {label} {required && <span className="text-indigo-400">*</span>}
            </label>
            {/* chevron icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    )
}

function CollegeAutocomplete({ value, onChange, required }) {
    const [query, setQuery] = useState(value)
    const [suggestions, setSuggestions] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const wrapperRef = useRef(null)

    useEffect(() => {
        // Sync outer value if it changes externally
        setQuery(value)
    }, [value])

    useEffect(() => {
        // Close dropdown when clicking outside
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        if (!isOpen) return;

        const fetchColleges = async () => {
            if (query.trim().length < 2) {
                setSuggestions([])
                return
            }
            setIsLoading(true)
            try {
                const res = await fetch(`http://localhost:5000/api/colleges/search?q=${encodeURIComponent(query)}`)
                if (res.ok) {
                    const data = await res.json()
                    setSuggestions(data)
                }
            } catch (err) {
                console.error("Failed to fetch colleges", err)
            } finally {
                setIsLoading(false)
            }
        }

        const timeoutId = setTimeout(fetchColleges, 300)
        return () => clearTimeout(timeoutId)
    }, [query, isOpen])

    const handleSelect = (college) => {
        setQuery(college)
        setIsOpen(false)
        onChange(college) // bubble up to parent form state
    }

    const handleChange = (e) => {
        setQuery(e.target.value)
        onChange(e.target.value)
        setIsOpen(true)
    }

    return (
        <div ref={wrapperRef} className="relative">
            <div className="relative">
                <input
                    type="text"
                    id="collegeName"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => setIsOpen(true)}
                    required={required}
                    placeholder=" "
                    autoComplete="off"
                    className="peer block w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-6 pb-2 text-sm text-white placeholder-transparent focus:outline-none focus:border-indigo-500 focus:bg-white/8 hover:border-white/20 transition-all duration-200"
                />
                <label
                    htmlFor="collegeName"
                    className="absolute left-4 top-2 text-xs text-slate-500 font-medium peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400 transition-all duration-200 pointer-events-none"
                >
                    College Name <span className="text-indigo-400">*</span>
                </label>
            </div>

            {isOpen && (query.length >= 2 || isLoading) && (
                <div className="absolute z-50 w-full mt-2 rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-4 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            Searching colleges...
                        </div>
                    ) : suggestions.length > 0 ? (
                        <ul className="py-2">
                            {suggestions.map((college, i) => (
                                <li
                                    key={i}
                                    onClick={() => handleSelect(college)}
                                    className="px-4 py-2.5 text-sm text-slate-200 hover:bg-indigo-500/20 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                >
                                    {college}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-sm text-slate-400">
                            No matching colleges found. You can type it manually.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default function OnboardingForm() {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [form, setForm] = useState({
        fullName: '',
        collegeName: '',
        department: '',
        yearOfStudy: '',
        phone: '',
        email: '',
        projectType: '',
        projectDomain: '',
        description: '',
    })

    const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrorMsg('')

        try {
            const response = await fetch('http://localhost:5000/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })

            if (!response.ok) {
                throw new Error('Failed to submit form')
            }

            navigate('/success')
        } catch (err) {
            console.error(err)
            setErrorMsg('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

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
                <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[120px]" />
                <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-600/15 blur-[120px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5 backdrop-blur-sm">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/30">
                        P
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-white">
                        Project<span className="text-indigo-400">Hub</span>
                    </span>
                </button>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Our team is online
                </div>
            </nav>

            {/* Form Container */}
            <div className="relative z-10 flex justify-center px-4 py-10 pb-20">
                <div className="w-full max-w-2xl">

                    {/* Header */}
                    <div className="animate-fade-in text-center mb-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-4">
                            🎯 Project Request Form
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                            Tell us about your project
                        </h1>
                        <p className="mt-3 text-slate-400 text-base">
                            Fill in the details below — our team will reach out within 24 hours.
                        </p>
                    </div>

                    {/* Glassmorphism card */}
                    <form
                        onSubmit={handleSubmit}
                        className="animate-scale-in backdrop-blur-xl bg-white/4 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl shadow-black/40"
                    >

                        {/* Section: Personal Info */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">
                                    1
                                </div>
                                <h2 className="text-base font-semibold text-white">Personal Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FloatingInput
                                    id="fullName"
                                    label="Full Name"
                                    value={form.fullName}
                                    onChange={set('fullName')}
                                    required
                                />
                                <CollegeAutocomplete
                                    value={form.collegeName}
                                    onChange={(val) => setForm(f => ({ ...f, collegeName: val }))}
                                    required
                                />
                                <FloatingSelect
                                    id="department"
                                    label="Department"
                                    value={form.department}
                                    onChange={set('department')}
                                    options={departments}
                                    required
                                />
                                <div className="relative">
                                    <p className="text-xs text-slate-500 font-medium mb-2">
                                        Year of Study <span className="text-indigo-400">*</span>
                                    </p>
                                    <div className="flex gap-2">
                                        {['1', '2', '3', '4'].map((yr) => (
                                            <button
                                                type="button"
                                                key={yr}
                                                onClick={() => setForm((f) => ({ ...f, yearOfStudy: yr }))}
                                                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${form.yearOfStudy === yr
                                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white hover:bg-white/8'
                                                    }`}
                                            >
                                                {yr}st
                                            </button>
                                        ))}
                                    </div>
                                    <input type="hidden" name="yearOfStudy" value={form.yearOfStudy} required />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/5 mb-8" />

                        {/* Section: Contact */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">
                                    2
                                </div>
                                <h2 className="text-base font-semibold text-white">Contact Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FloatingInput
                                    id="phone"
                                    label="Phone Number"
                                    type="tel"
                                    inputMode="tel"
                                    value={form.phone}
                                    onChange={set('phone')}
                                    required
                                    pattern="[6-9]{1}[0-9]{9}"
                                />
                                <FloatingInput
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    value={form.email}
                                    onChange={set('email')}
                                    required
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/5 mb-8" />

                        {/* Section: Project Info */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">
                                    3
                                </div>
                                <h2 className="text-base font-semibold text-white">Project Details</h2>
                            </div>

                            {/* Project Type cards */}
                            <p className="text-xs text-slate-500 font-medium mb-3">
                                Project Type <span className="text-indigo-400">*</span>
                            </p>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {projectTypes.map((pt) => (
                                    <button
                                        type="button"
                                        key={pt.id}
                                        onClick={() => setForm((f) => ({ ...f, projectType: pt.id }))}
                                        className={`text-left p-4 rounded-xl border transition-all duration-200 ${form.projectType === pt.id
                                            ? 'border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/10'
                                            : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/6'
                                            }`}
                                    >
                                        <span className="text-2xl block mb-1">{pt.icon}</span>
                                        <span className={`text-sm font-semibold block ${form.projectType === pt.id ? 'text-indigo-300' : 'text-white'}`}>
                                            {pt.label}
                                        </span>
                                        <span className="text-xs text-slate-500 mt-0.5 block">{pt.desc}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Project Domain */}
                            <div className="mb-4">
                                <FloatingSelect
                                    id="projectDomain"
                                    label="Project Domain"
                                    value={form.projectDomain}
                                    onChange={set('projectDomain')}
                                    options={domains}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="relative">
                                <textarea
                                    id="description"
                                    value={form.description}
                                    onChange={set('description')}
                                    placeholder=" "
                                    rows={4}
                                    className="peer block w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-6 pb-3 text-sm text-white placeholder-transparent focus:outline-none focus:border-indigo-500 focus:bg-white/8 hover:border-white/20 transition-all duration-200 resize-none"
                                />
                                <label
                                    htmlFor="description"
                                    className="absolute left-4 top-2 text-xs text-slate-500 font-medium peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400 transition-all duration-200 pointer-events-none"
                                >
                                    Short Description of Your Project
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            id="submit-form-btn"
                            disabled={isSubmitting}
                            className={`group w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white text-base shadow-xl shadow-indigo-500/25 transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98]'
                                }`}
                        >
                            <span className="flex items-center justify-center gap-2">
                                {isSubmitting ? 'Submitting...' : 'Submit My Project Request'}
                                {!isSubmitting && (
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                )}
                            </span>
                        </button>

                        {errorMsg && (
                            <p className="mt-4 text-center text-sm text-red-400">
                                {errorMsg}
                            </p>
                        )}

                        <p className="mt-4 text-center text-xs text-slate-500">
                            🔒 Your information is confidential and only used by our team to contact you.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

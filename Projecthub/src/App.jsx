import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import OnboardingForm from './pages/OnboardingForm'
import SuccessScreen from './pages/SuccessScreen'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/onboarding" element={<OnboardingForm />} />
        <Route path="/success" element={<SuccessScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

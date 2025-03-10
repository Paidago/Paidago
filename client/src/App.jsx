import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import PlannerPage from './pages/PlannerPage'
import ResourcesPage from './pages/ResourcesPage'
import StorePage from './pages/store/StorePage'
import ProtectedRoute from './ProtectedRoute'
import HistoryPage from './pages/HistoryPage'
import CreateExamPage from './pages/CreateExamPage'
import QuotesPage from './pages/QuotesPage'
import ICFESPage from './pages/ICFESPage'
import { AuthProvider } from './context/AuthContext'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import BancoDePreguntasPage from './pages/BancoDePreguntasPage'

const initialOptions = {
  clientId: "AXeTD9HKO9Qf2wXzOyjmqmDbw0DF9SHjKBzRww9IVSRqZzXY0C48ErLiwdD8l-PhgR8bJU0cneaES7BM",
  currency: "USD",
  intent: "capture",
};

function App() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/documentacion" element={<ResourcesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/planeador" element={<PlannerPage />} />
            <Route path="/historial-clases" element={<HistoryPage />} />
            <Route path="/crear-examen" element={<CreateExamPage />} />
            <Route path="/crear-icfes" element={<ICFESPage />} />
            <Route path="/citas" element={<QuotesPage />} />
            <Route path="/icfes/preguntas" element={<BancoDePreguntasPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            <Route path="/store" element={<StorePage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </PayPalScriptProvider>
  )
}

export default App

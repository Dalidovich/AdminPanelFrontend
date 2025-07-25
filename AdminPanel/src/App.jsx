import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from "./pages/Login";
import { RegistrationPage } from "./pages/Registration";
import { AccountsPage } from "./pages/Accounts";
import './App.css'

export default function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Registration" element={<RegistrationPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/accounts" element={<AccountsPage />} />
          </Route>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
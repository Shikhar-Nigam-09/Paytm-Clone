import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import SendMoney from "./pages/SendMoney";
import Transactions from "./pages/Transactions";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { Navigate } from "react-router-dom";
import Auth from "./pages/Auth";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar visible on all pages (it hides itself if not logged in) */}
      <Navbar />

      <Routes>
         <Route
    path="/"
    element={<Navigate to="/signin" replace />}
  />


        {/* Public routes */}
        <Route path="/signin" element={<Auth />} />
<Route path="/" element={<Navigate to="/signin" />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/send/:id"
          element={
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;





import GlobalStyle from "./global";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { useAuth } from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={auth.auth ? <Profile /> : <Login />} />
          <Route
            path="/register"
            element={!auth.auth ? <Register /> : <Navigate to="/profile" />}
          />
          <Route
            path="/profile"
            element={auth.auth ? <Profile /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

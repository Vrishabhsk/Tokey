import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";
//theme
import { darkTheme, lightTheme } from "./utils/Theme";
//routes
import { PrivateTokenRoute, PrivateOtpRoute } from "./utils/PrivateRoutes";
//Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import ResetPassword from "./pages/Reset";
import Code from "./pages/Reset/Code";
import Reset from "./pages/Reset/Reset";
import Items from "./pages/Items";
import Cards from "./pages/Cards";
import Pwds from "./pages/Passwords";
import Notes from "./pages/Notes";
import PasswordGenerator from "./pages/PasswordGenerator";
import Layout from "./pages/Layout";
import Account from "./pages/Account";
import { useState } from "react";

export default function App() {
  const [refetch, setRefetch] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "dark");

  return (
    <CookiesProvider>
      <NextUIProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <BrowserRouter>
          <Layout refetch={refetch}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/" element={<PrivateTokenRoute />}>
                <Route path="/vault/items" element={<Items />} />
                <Route path="/vault/pwds" element={<Pwds />} />
                <Route path="/vault/notes" element={<Notes />} />
                <Route path="/vault/cards" element={<Cards />} />
                <Route path="/vault/create-pwd" element={<PasswordGenerator />} />
                <Route
                  path="/vault/settings"
                  element={<Account theme={theme} setTheme={setTheme} setRefetch={setRefetch} />}
                />
                <Route path="/vault/reset" element={<Reset from="vault" />} />
                <Route path="/reset/password" element={<Reset from="forgot" />} />
              </Route>
              <Route path="/" element={<PrivateOtpRoute />}>
                <Route path="/otp" element={<Otp />} />
                <Route path="/code" element={<Code />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster />
      </NextUIProvider>
    </CookiesProvider>
  );
}

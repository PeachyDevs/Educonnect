// This is the main Layout for the app, it will contain the header (navbar), and footer

import { Outlet } from "react-router-dom";
import NavbarApp from "../components/Navbar";

export default function RootLayout() {
  return (
    <div className="w-full">
      <NavbarApp />
      <main className="w-full min-h-screen pt-20">
        <Outlet /> {/* Child routes render here */}
      </main>
      <footer className="w-full h-max p-4 bg-black text-green-500">© 2026 My App</footer>
    </div>
  );
}

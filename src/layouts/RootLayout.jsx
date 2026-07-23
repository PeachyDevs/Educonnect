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
    </div>
  );
}

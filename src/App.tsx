import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <header style={{ padding: "10px", background: "var(--color-primary)" }}>
        <nav style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link to="/" style={{ color: "white" }}>Home</Link>
          <Link to="/about" style={{ color: "white" }}>About</Link>
        </nav>
      </header>
      <main style={{ padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

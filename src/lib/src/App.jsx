import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import "./index.css";

const menu = [
  ["dashboard", "⌂", "Dashboard"],
  ["products", "▣", "Products"],
  ["customers", "♙", "Customers"],
  ["orders", "▤", "Orders"],
  ["assistant", "✦", "AI Assistant"],
];

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <Loading />;

  if (!session) {
    return <Auth />;
  }

  return (
    <Dashboard
      session={session}
      page={page}
      setPage={setPage}
    />
  );
}

function Loading() {
  return (
    <div className="loading-screen">
      <div className="loader-logo">S</div>
      <h2>SELLORA</h2>
      <p>Loading your business...</p>
    </div>
  );
}

function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              business_name: businessName,
            },
          },
        });

        if (error) throw error;

        setMessage(
          "Account created. Check your email if confirmation is enabled."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="logo">S</div>
          <strong>SELLORA</strong>
        </div>

        <div className="auth-copy">
          <span>AI SALES & CUSTOMER ASSISTANT</span>
          <h1>
            Run your business
            <br />
            <em>smarter.</em>
          </h1>

          <p>
            Manage customers, products, orders and AI-powered conversations
            from one simple platform.
          </p>

          <div className="benefits">
            <div>✓ AI customer assistance</div>
            <div>✓ Product & order management</div>
            <div>✓ Business insights</div>
          </div>
        </div>
      </div>

      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setMessage("");
            }}
          >
            Log in
          </button>

          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setMessage("");
            }}
          >
            Create account
          </button>
        </div>

        <h2>
          {mode === "login"
            ? "Welcome back"
            : "Create your SELLORA account"}
        </h2>

        <p className="auth-subtitle">
          {mode === "login"
            ? "Log in to continue to your business dashboard."
            : "Start managing your business with SELLORA."}
        </p>

        <form onSubmit={submit}>
          {mode === "signup" && (
            <label>
              Business name
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="My Business"
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              minLength="6"
              required
            />
          </label>

          <button className="auth-submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Log in →"
                : "Create account →"}
          </button>
        </form>

        {message && <div className="auth-message">{message}</div>}
      </div>
    </main>
  );
}

function Dashboard({ session, page, setPage }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  async function logout() {
    await supabase.auth.signOut();
  }

  const current = menu.find((item) => item[0] === page);

  return (
    <div className="dashboard-layout">
      <aside className={mobileMenu ? "sidebar open" : "sidebar"}>
        <div className="sidebar-brand">
          <div className="logo">S</div>
          <strong>SELLORA</strong>
        </div>

        <div className="business-switcher">
          <div className="business-icon">B</div>
          <div>
            <strong>My Business</strong>
            <small>Business account</small>
          </div>
        </div>

        <nav className="side-nav">
          {menu.map(([id, icon, label]) => (
            <button
              key={id}
              className={page === id ? "selected" : ""}
              onClick={() => {
                setPage(id);
                setMobileMenu(false);
              }}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button onClick={() => setPage("settings")}>
            ⚙ Settings
          </button>

          <button className="logout" onClick={logout}>
            ↪ Log out
          </button>
        </div>
      </aside>

      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <section className="main-area">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMobileMenu(true)}
          >
            ☰
          </button>

          <div>
            <span className="top-label">SELLORA</span>
            <h1>{current?.[2] || "Settings"}</h1>
          </div>

          <div className="top-user">
            <div className="notification">♢</div>
            <div className="user-avatar">
              {(session.user.email || "U")[0].toUpperCase()}
            </div>
          </div>
        </header>

        <div className="content">
          {page === "dashboard" && <Overview session={session} />}
          {page === "products" && <Products />}
          {page === "customers" && <Customers />}
          {page === "orders" && <Orders />}
          {page === "assistant" && <Assistant />}
          {page === "settings" && <Settings session={session} />}
        </div>
      </section>
    </div>
  );
}

function Overview({ session }) {
  return (
    <>
      <div className="welcome">
        <div>
          <span className="eyebrow">BUSINESS OVERVIEW</span>
          <h2>Good to see you 👋</h2>
          <p>Here's what's happening with your business today.</p>
        </div>

        <button className="primary-action">+ New order</button>
      </div>

      <div className="dashboard-stats">
        <Stat
          icon="💰"
          title="Total sales"
          value="TZS 0"
          change="+0%"
        />

        <Stat
          icon="▤"
          title="Orders"
          value="0"
          change="+0%"
        />

        <Stat
          icon="♙"
          title="Customers"
          value="0"
          change="+0%"
        />

        <Stat
          icon="📦"
          title="Products"
          value="0"
          change="Active"
        />
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>Sales overview</h3>
              <p>Your sales activity will appear here.</p>
            </div>

            <select>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This year</option>
            </select>
          </div>

          <div className="empty-chart">
            <div className="chart-line">⌁⌁⌁⌁⌁⌁⌁⌁</div>
            <strong>No sales data yet</strong>
            <p>Create your first order to start tracking sales.</p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>AI Assistant</h3>
              <p>Customer conversations</p>
            </div>

            <span className="live">● LIVE</span>
          </div>

          <div className="ai-empty">
            <div className="big-ai">✦</div>
            <strong>Your AI assistant is ready</strong>
            <p>
              Connect your customer channels and SELLORA will help
              handle common questions.
            </p>

            <button className="secondary-action">
              Configure AI
            </button>
          </div>
        </div>
      </div>

      <div className="panel quick-panel">
        <div className="panel-heading">
          <div>
            <h3>Quick actions</h3>
            <p>Manage your business quickly.</p>
          </div>
        </div>

        <div className="quick-actions">
          <button>
            <span>+</span>
            Add product
          </button>

          <button>
            <span>♙</span>
            Add customer
          </button>

          <button>
            <span>▤</span>
            Create order
          </button>

          <button>
            <span>✦</span>
            Configure AI
          </button>
        </div>
      </div>
    </>
  );
}

function Stat({ icon, title, value, change }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>
        <span>{change}</span>
      </div>

      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
}

function Products() {
  return (
    <PagePlaceholder
      icon="▣"
      title="Products"
      text="Your products will appear here."
      button="+ Add product"
    />
  );
}

function Customers() {
  return (
    <PagePlaceholder
      icon="♙"
      title="Customers"
      text="Your customers will appear here."
      button="+ Add customer"
    />
  );
}

function Orders() {
  return (
    <PagePlaceholder
      icon="▤"
      title="Orders"
      text="Your orders will appear here."
      button="+ Create order"
    />
  );
}

function Assistant() {
  return (
    <div className="assistant-page">
      <div className="assistant-header">
        <div className="big-ai">✦</div>
        <div>
          <span className="eyebrow">SELLORA AI</span>
          <h2>Your business assistant</h2>
          <p>
            Ask questions about your products, customers and orders.
          </p>
        </div>
      </div>

      <div className="chat-box">
        <div className="assistant-message">
          <div className="chat-avatar">S</div>
          <div>
            <strong>SELLORA AI</strong>
            <p>
              Hello! I'm ready to help you manage your business.
              What would you like to know?
            </p>
          </div>
        </div>

        <div className="suggestions">
          <button>How are my sales doing?</button>
          <button>Which products should I promote?</button>
          <button>Show today's orders</button>
        </div>

        <div className="chat-input">
          <input placeholder="Ask SELLORA AI..." />
          <button>→</button>
        </div>
      </div>
    </div>
  );
}

function Settings({ session }) {
  return (
    <div className="panel settings-panel">
      <span className="eyebrow">ACCOUNT</span>
      <h2>Settings</h2>

      <div className="setting-row">
        <span>Email</span>
        <strong>{session.user.email}</strong>
      </div>

      <div className="setting-row">
        <span>Authentication</span>
        <strong>Supabase Auth</strong>
      </div>

      <div className="setting-row">
        <span>SELLORA version</span>
        <strong>1.0.0</strong>
      </div>
    </div>
  );
}

function PagePlaceholder({ icon, title, text, button }) {
  return (
    <div className="placeholder">
      <div className="placeholder-icon">{icon}</div>
      <span className="eyebrow">SELLORA</span>
      <h2>{title}</h2>
      <p>{text}</p>
      <button className="primary-action">{button}</button>
    </div>
  );
}

export default App;

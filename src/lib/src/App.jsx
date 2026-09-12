import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading SELLORA...</div>;
  }

  return (
    <main className="app">
      <section className="hero">
        <div className="badge">AI SALES & CUSTOMER ASSISTANT</div>

        <h1>
          Sell smarter with <span>SELLORA</span>
        </h1>

        <p>
          Your AI-powered assistant for products, customers, orders and
          business growth.
        </p>

        {!session ? (
          <div className="actions">
            <button onClick={() => alert("Sign up coming next")}>
              Get Started
            </button>

            <button
              className="secondary"
              onClick={() => alert("Login coming next")}
            >
              Login
            </button>
          </div>
        ) : (
          <div className="dashboard-card">
            <h2>Welcome to SELLORA 🎉</h2>
            <p>{session.user.email}</p>

            <button onClick={() => supabase.auth.signOut()}>
              Sign Out
            </button>
          </div>
        )}

        <div className="features">
          <div>
            <strong>🤖 AI Assistant</strong>
            <p>Answer customer questions automatically.</p>
          </div>

          <div>
            <strong>📦 Products</strong>
            <p>Manage your products and prices.</p>
          </div>

          <div>
            <strong>🛒 Orders</strong>
            <p>Track customer orders easily.</p>
          </div>

          <div>
            <strong>📊 Analytics</strong>
            <p>Understand your business performance.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

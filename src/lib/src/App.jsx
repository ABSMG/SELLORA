import { useState } from "react";
import { supabase } from "./lib/supabase";

const features = [
  {
    icon: "🤖",
    title: "AI Assistant",
    text: "Answer customer questions automatically and help turn conversations into sales."
  },
  {
    icon: "💬",
    title: "WhatsApp Sales",
    text: "Manage customer conversations and sales inquiries from one dashboard."
  },
  {
    icon: "📦",
    title: "Products",
    text: "Keep your products, prices and stock information organized."
  },
  {
    icon: "👥",
    title: "Customers",
    text: "Understand customers and keep useful conversation history."
  },
  {
    icon: "🧾",
    title: "Orders",
    text: "Track orders from customer inquiry to completed sale."
  },
  {
    icon: "📊",
    title: "Business Insights",
    text: "See useful sales information and discover opportunities to grow."
  }
];

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <div className="brand-mark">S</div>
          <span>SELLORA</span>
        </div>

        <nav>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <div className="nav-actions">
          <button className="btn ghost" onClick={() => setShowLogin(true)}>
            Log in
          </button>

          <button className="btn primary" onClick={() => setShowSignup(true)}>
            Get started
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="badge">
              ✨ AI-powered business assistant
            </div>

            <h1>
              Turn customer conversations
              <span> into more sales.</span>
            </h1>

            <p>
              SELLORA helps small businesses manage customers, products,
              orders and AI-powered conversations from one simple platform.
            </p>

            <div className="hero-actions">
              <button
                className="btn primary large"
                onClick={() => setShowSignup(true)}
              >
                Start selling smarter →
              </button>

              <a className="btn secondary large" href="#how">
                See how it works
              </a>
            </div>

            <div className="trust">
              <span>✓ AI assistance</span>
              <span>✓ WhatsApp ready</span>
              <span>✓ Built for small businesses</span>
            </div>
          </div>

          <div className="dashboard-preview">
            <div className="preview-header">
              <div>
                <small>SELLORA</small>
                <strong>Business Overview</strong>
              </div>
              <div className="avatar">A</div>
            </div>

            <div className="stats">
              <div className="stat">
                <small>Sales</small>
                <strong>TZS 1.84M</strong>
                <span className="up">+18.4%</span>
              </div>

              <div className="stat">
                <small>Orders</small>
                <strong>126</strong>
                <span className="up">+12.8%</span>
              </div>

              <div className="stat">
                <small>Customers</small>
                <strong>384</strong>
                <span className="up">+9.2%</span>
              </div>
            </div>

            <div className="ai-card">
              <div className="ai-icon">✦</div>
              <div>
                <strong>AI Assistant</strong>
                <p>
                  12 customer conversations need attention today.
                </p>
              </div>
              <span className="online">●</span>
            </div>

            <div className="activity">
              <div className="activity-title">
                <strong>Recent activity</strong>
                <span>View all</span>
              </div>

              <div className="activity-row">
                <div className="circle">J</div>
                <div>
                  <strong>New order</strong>
                  <small>John • 2 minutes ago</small>
                </div>
                <b>TZS 85,000</b>
              </div>

              <div className="activity-row">
                <div className="circle">M</div>
                <div>
                  <strong>Customer inquiry</strong>
                  <small>Maria • 8 minutes ago</small>
                </div>
                <span className="pending">Pending</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="section-heading">
            <span className="eyebrow">POWERFUL TOOLS</span>
            <h2>Everything you need to sell smarter.</h2>
            <p>
              One simple platform for managing the parts of your business
              that matter most.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <div className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="how" id="how">
          <div className="section-heading">
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>Start in minutes.</h2>
          </div>

          <div className="steps">
            <div className="step">
              <span>01</span>
              <h3>Create your business</h3>
              <p>Set up your SELLORA workspace and business information.</p>
            </div>

            <div className="step">
              <span>02</span>
              <h3>Add your products</h3>
              <p>Add products, prices and information your customers need.</p>
            </div>

            <div className="step">
              <span>03</span>
              <h3>Let AI help you sell</h3>
              <p>Use AI to handle common customer questions and sales tasks.</p>
            </div>
          </div>
        </section>

        <section className="pricing" id="pricing">
          <div className="section-heading">
            <span className="eyebrow">PRICING</span>
            <h2>Simple plans for growing businesses.</h2>
          </div>

          <div className="pricing-grid">
            <Pricing
              name="Free"
              price="0"
              description="For businesses getting started."
              items={[
                "Product management",
                "Customer management",
                "Basic orders",
                "Basic dashboard"
              ]}
            />

            <Pricing
              featured
              name="Pro"
              price="10,000"
              description="For businesses ready to grow."
              items={[
                "Everything in Free",
                "AI assistant",
                "Advanced insights",
                "Customer conversations",
                "Priority features"
              ]}
            />

            <Pricing
              name="Business"
              price="25,000"
              description="For growing teams and businesses."
              items={[
                "Everything in Pro",
                "More AI usage",
                "Advanced business tools",
                "Team features",
                "Priority support"
              ]}
            />
          </div>
        </section>

        <section className="cta">
          <div>
            <span className="eyebrow">SELL SMARTER</span>
            <h2>Ready to grow your business?</h2>
            <p>
              Create your SELLORA account and start building your smarter
              sales workflow.
            </p>
          </div>

          <button
            className="btn light large"
            onClick={() => setShowSignup(true)}
          >
            Create free account →
          </button>
        </section>
      </main>

      <footer>
        <div className="brand">
          <div className="brand-mark">S</div>
          <span>SELLORA</span>
        </div>

        <p>AI Sales & Customer Assistant</p>

        <small>© 2026 SELLORA. All rights reserved.</small>
      </footer>

      {showLogin && (
        <AuthModal
          title="Welcome back"
          button="Log in"
          onClose={() => setShowLogin(false)}
        />
      )}

      {showSignup && (
        <AuthModal
          title="Create your SELLORA account"
          button="Create account"
          signup
          onClose={() => setShowSignup(false)}
        />
      )}
    </div>
  );
}

function Pricing({ name, price, description, items, featured }) {
  return (
    <div className={`price-card ${featured ? "featured" : ""}`}>
      {featured && <div className="popular">MOST POPULAR</div>}

      <h3>{name}</h3>
      <p>{description}</p>

      <div className="price">
        <strong>TZS {price}</strong>
        {price !== "0" && <span>/month</span>}
      </div>

      <ul>
        {items.map((item) => (
          <li key={item}>✓ {item}</li>
        ))}
      </ul>

      <button className={`btn ${featured ? "primary" : "secondary"}`}>
        Choose {name}
      </button>
    </div>
  );
}

function AuthModal({ title, button, signup, onClose }) {
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
      if (signup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              business_name: businessName
            }
          }
        });

        if (error) throw error;

        setMessage(
          "Account created. Check your email if email confirmation is enabled."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        setMessage("Login successful.");
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>

        <div className="modal-brand">
          <div className="brand-mark">S</div>
          <span>SELLORA</span>
        </div>

        <h2>{title}</h2>

        <form onSubmit={submit}>
          {signup && (
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
              placeholder="••••••••"
              minLength="6"
              required
            />
          </label>

          <button className="btn primary full" disabled={loading}>
            {loading ? "Please wait..." : button}
          </button>
        </form>

        {message && <div className="form-message">{message}</div>}
      </div>
    </div>
  );
}

export default App;

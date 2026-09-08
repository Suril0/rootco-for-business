import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";

import logoAsset from "../assets/logo.svg.asset.json";
import footerVideo from "../assets/footer-loop.mp4.asset.json";
import heroImage from "../assets/hero.jpg";

const TITLE = "Root & Co, For Business — Wholesale Produce & Plant-Forward Supply";
const DESCRIPTION =
  "Wholesale supply from Root & Co: small-batch, plant-forward produce, weekly standing orders and next-morning delivery for cafes, restaurants and grocers. Request trade pricing in minutes.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

/* ------------------------------------------------------------------ data */

const VALUES = [
  {
    icon: "◈",
    title: "One grower network",
    body: "Every crate is traced to a named farm within 200km. Same growers, same standard, every single delivery.",
  },
  {
    icon: "⧗",
    title: "Harvest-to-door in 24h",
    body: "Cut in the morning, graded by afternoon, on your bench before service the next day. No cold-store detours.",
  },
  {
    icon: "▤",
    title: "Trade pricing that holds",
    body: "Fixed rates for 90 days on standing lines, so your menu costings stay accurate through the quarter.",
  },
  {
    icon: "☘",
    title: "Zero-waste packing",
    body: "Returnable crates, compostable liners and a take-back run on every delivery route we already service.",
  },
];

const RANGES = [
  {
    name: "Leaf & Herb",
    tag: "Cut daily, packed cold",
    items: [
      "Salad leaf, baby spinach, rocket",
      "Soft herbs — basil, dill, coriander",
      "Micro-leaf and edible flower trays",
      "Washed, ready-to-plate options",
    ],
    moq: "6 crates",
    lead: "24 hours",
  },
  {
    name: "Roots & Field",
    tag: "Graded to spec",
    items: [
      "Heritage carrot, beet, celeriac",
      "Alliums, brassicas, squash",
      "Size-graded to your kitchen spec",
      "Bulk sacks or portioned cases",
    ],
    moq: "10 crates",
    lead: "48 hours",
  },
  {
    name: "Pantry & Ferment",
    tag: "Small-batch, own kitchen",
    items: [
      "Krauts, kimchi, pickled roots",
      "Cold-pressed dressings and oils",
      "Stock bases and root pastes",
      "White-label runs from 200 units",
    ],
    moq: "4 cases",
    lead: "5 days",
  },
];

const STEPS = [
  {
    n: "Step 01",
    title: "Send an enquiry",
    body: "Tell us your business type, volume and the lines you care about. Two minutes, no account needed.",
  },
  {
    n: "Step 02",
    title: "Trade list in 24h",
    body: "A named account lead sends pricing, minimums and the delivery windows that cover your postcode.",
  },
  {
    n: "Step 03",
    title: "Sample crate",
    body: "We send a free graded sample crate so your chefs can check quality before anything is committed.",
  },
  {
    n: "Step 04",
    title: "Standing order",
    body: "Lock a weekly schedule, adjust quantities by 6pm the day before, and track every drop by crate ID.",
  },
];

const BUSINESS_TYPES = [
  "Cafe or coffee shop",
  "Restaurant or hotel group",
  "Grocer or farm shop",
  "Meal kit or food manufacturer",
  "Distributor or reseller",
  "Other",
];

const VOLUMES = [
  "Under 10 crates / week",
  "10 – 30 crates / week",
  "30 – 100 crates / week",
  "100+ crates / week",
];

/* ------------------------------------------------------------ reveal hook */

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

/* --------------------------------------------------------------- the page */

function Index() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Why />
        <Ranges />
        <Process />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}

function Logo({ className = "brand-mark" }: { className?: string }) {
  return <img src={logoAsset.url} alt="Root & Co" className={className} width={733} height={166} />;
}

function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a href="#top" className="brand-lockup" aria-label="Root & Co, For Business — home">
          <Logo />
          <span className="brand-text">
            Root &amp; Co
            <span>For Business</span>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#why">Why us</a>
          <a href="#ranges">Ranges</a>
          <a href="#how">How it works</a>
          <a href="#enquiry">Contact</a>
        </nav>
        <a className="btn btn-primary" href="#enquiry">
          Request trade pricing
        </a>
      </div>
    </header>
  );
}

/* 1 — Hero */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <span className="hero-badge">Wholesale · Trade accounts</span>
          <h1>
            Fresh from the ground up — <em>at wholesale scale</em>
          </h1>
          <p className="hero-lead">
            Root &amp; Co supplies cafes, kitchens and grocers with small-batch, plant-forward
            produce from a fixed network of growers. Traceable crates, honest pricing, and a
            delivery window you can build a prep list around.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#enquiry">
              Request trade pricing
            </a>
            <a className="btn btn-ghost" href="#ranges">
              See the ranges
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="num">340+</div>
              <div className="lbl">trade accounts served weekly</div>
            </div>
            <div>
              <div className="num">24h</div>
              <div className="lbl">harvest to delivery bench</div>
            </div>
            <div>
              <div className="num">98.6%</div>
              <div className="lbl">order-accuracy last quarter</div>
            </div>
          </div>
        </div>
        <div className="hero-media">
          <img
            src={heroImage}
            alt="Wooden wholesale crates filled with fresh leafy greens, herbs and root vegetables"
            width={1600}
            height={1104}
          />
          <div className="hero-chip">
            <strong>Crate #RC-2481</strong>
            <span>Hallow Field Farm · picked 05:40</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2 — Why partner */
function Why() {
  return (
    <section className="section why reveal" id="why">
      <div className="wrap">
        <p className="eyebrow">Why buyers stay</p>
        <h2 className="section-title">Built for kitchens that can't afford a bad delivery</h2>
        <p className="section-lead">
          We run one supply chain, not a marketplace. That means fewer lines, tighter grading, and a
          person who answers when something goes wrong.
        </p>
        <div className="card-grid">
          {VALUES.map((v) => (
            <article className="card" key={v.title}>
              <div className="card-icon" aria-hidden="true">
                {v.icon}
              </div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 3 — Ranges */
function Ranges() {
  return (
    <section className="section reveal" id="ranges">
      <div className="wrap">
        <p className="eyebrow">Wholesale ranges</p>
        <h2 className="section-title">Three ranges, one delivery run</h2>
        <p className="section-lead">
          Mix freely across ranges — minimums apply per range, not per line, so a small kitchen can
          still order like a big one.
        </p>
        <div className="range-grid">
          {RANGES.map((r) => (
            <article className="range" key={r.name}>
              <div className="range-top">
                <h3>{r.name}</h3>
                <p>{r.tag}</p>
              </div>
              <div className="range-body">
                <ul>
                  {r.items.map((i) => (
                    <li key={i}>
                      <span className="tick" aria-hidden="true">
                        ✓
                      </span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
                <div className="range-meta">
                  Minimum order <b>{r.moq}</b> · Lead time <b>{r.lead}</b>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 4 — How it works */
function Process() {
  return (
    <section className="section process reveal" id="how">
      <div className="wrap">
        <p className="eyebrow">How it works</p>
        <h2 className="section-title">From enquiry to standing order in a week</h2>
        <p className="section-lead">
          No portals to learn, no onboarding fee, no minimum contract term.
        </p>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5 — Enquiry form */

type FormState = {
  name: string;
  business: string;
  email: string;
  phone: string;
  type: string;
  volume: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  business: "",
  email: "",
  phone: "",
  type: "",
  volume: "",
  message: "",
};

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (values.business.trim().length < 2) errors.business = "Please enter your business name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Enter a valid email address, e.g. buyer@kitchen.com.";
  const digits = values.phone.replace(/[^\d]/g, "");
  if (values.phone.trim() && (digits.length < 7 || digits.length > 15))
    errors.phone = "Enter a valid phone number, or leave it blank.";
  if (!values.type) errors.type = "Select the type of business you run.";
  if (!values.volume) errors.volume = "Select an estimated weekly volume.";
  if (values.message.trim().length < 10)
    errors.message = "Tell us a little more — at least 10 characters.";
  return errors;
}

function Enquiry() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  function update(key: keyof FormState, value: string) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched) setErrors(validate(next));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>(".field.invalid input, .field.invalid select, .field.invalid textarea");
      first?.focus();
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setReference(`RC-${Math.floor(100000 + Math.random() * 899999)}`);
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const cls = (key: keyof FormState) => `field${errors[key] ? " invalid" : ""}`;

  return (
    <section className="section enquiry reveal" id="enquiry">
      <div className="wrap enquiry-grid">
        <div className="enquiry-aside">
          <p className="eyebrow">Trade enquiry</p>
          <h2 className="section-title">Get a trade list built for your kitchen</h2>
          <p className="section-lead">
            Send the form and a named account lead replies within one working day with pricing,
            minimums and your delivery window.
          </p>
          <ul className="contact-list">
            <li>
              <strong>Wholesale desk</strong>
              <span>trade@rootandco.example · Mon–Fri, 6am–4pm</span>
            </li>
            <li>
              <strong>Phone</strong>
              <span>+44 20 7946 0142</span>
            </li>
            <li>
              <strong>Packhouse</strong>
              <span>Unit 4, Hallow Field Way, Bristol BS2 0QT</span>
            </li>
          </ul>
        </div>

        <div className="form-card">
          {submitted ? (
            <div className="success" ref={successRef} tabIndex={-1} role="status" aria-live="polite">
              <div className="check" aria-hidden="true">
                ✓
              </div>
              <h3>Enquiry received, {values.name.split(" ")[0]}</h3>
              <p>
                Thanks — your trade enquiry for <strong>{values.business}</strong> is with our
                wholesale desk. Expect pricing and delivery windows by email within one working day.
              </p>
              <p className="ref">Reference {reference}</p>
              <div className="form-foot" style={{ justifyContent: "center" }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setValues(EMPTY);
                    setErrors({});
                    setTouched(false);
                    setSubmitted(false);
                  }}
                >
                  Send another enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="field-row two">
                <div className={cls("name")}>
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Alex Whitfield"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="err">{errors.name}</span>}
                </div>
                <div className={cls("business")}>
                  <label htmlFor="business">Business name</label>
                  <input
                    id="business"
                    name="business"
                    value={values.business}
                    onChange={(e) => update("business", e.target.value)}
                    placeholder="Fold Street Kitchen"
                    aria-invalid={!!errors.business}
                  />
                  {errors.business && <span className="err">{errors.business}</span>}
                </div>
              </div>

              <div className="field-row two">
                <div className={cls("email")}>
                  <label htmlFor="email">Work email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="buyer@kitchen.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="err">{errors.email}</span>}
                </div>
                <div className={cls("phone")}>
                  <label htmlFor="phone">Phone (optional)</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+44 20 7946 0000"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span className="err">{errors.phone}</span>}
                </div>
              </div>

              <div className="field-row two">
                <div className={cls("type")}>
                  <label htmlFor="type">Business type</label>
                  <select
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={(e) => update("type", e.target.value)}
                    aria-invalid={!!errors.type}
                  >
                    <option value="">Select one…</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.type && <span className="err">{errors.type}</span>}
                </div>
                <div className={cls("volume")}>
                  <label htmlFor="volume">Estimated weekly volume</label>
                  <select
                    id="volume"
                    name="volume"
                    value={values.volume}
                    onChange={(e) => update("volume", e.target.value)}
                    aria-invalid={!!errors.volume}
                  >
                    <option value="">Select one…</option>
                    {VOLUMES.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                  {errors.volume && <span className="err">{errors.volume}</span>}
                </div>
              </div>

              <div className={cls("message")}>
                <label htmlFor="message">What do you need from us?</label>
                <textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="We run a 60-cover bistro and need salad leaf, soft herbs and heritage roots three mornings a week."
                  aria-invalid={!!errors.message}
                />
                {errors.message && <span className="err">{errors.message}</span>}
              </div>

              <div className="form-foot">
                <button type="submit" className="btn btn-accent" disabled={submitting}>
                  {submitting ? "Sending…" : "Send trade enquiry"}
                </button>
                <small>No account needed. We reply within one working day.</small>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* 6 — Footer */
function Footer() {
  return (
    <footer className="site-footer">
      <video
        className="footer-video"
        src={footerVideo.url}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="footer-veil" aria-hidden="true" />

      <div className="wrap footer-top">
        <div className="footer-brand">
          <Logo />
          <div className="footer-wordmark">Root &amp; Co</div>
          <p>
            Small-batch, plant-forward, rooted in where it comes from. Growing, packing and
            delivering across the South West since 2016.
          </p>
          <div className="footer-news">
            <input type="email" placeholder="Email for the trade bulletin" aria-label="Email for the trade bulletin" />
            <button type="button" className="btn btn-accent">
              Join
            </button>
          </div>
        </div>

        <div className="footer-col">
          <h4>Wholesale</h4>
          <ul>
            <li>
              <a href="#ranges">Leaf &amp; Herb</a>
            </li>
            <li>
              <a href="#ranges">Roots &amp; Field</a>
            </li>
            <li>
              <a href="#ranges">Pantry &amp; Ferment</a>
            </li>
            <li>
              <a href="#enquiry">White-label runs</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#why">Why Root &amp; Co</a>
            </li>
            <li>
              <a href="#how">How it works</a>
            </li>
            <li>
              <a href="#how">Grower network</a>
            </li>
            <li>
              <a href="#enquiry">Careers</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>trade@rootandco.example</li>
            <li>+44 20 7946 0142</li>
            <li>Unit 4, Hallow Field Way</li>
            <li>Bristol BS2 0QT</li>
          </ul>
        </div>
      </div>

      <div className="footer-marquee" aria-hidden="true">
        <span>
          Harvested at dawn · Packed by 11 · On your bench by service · Returnable crates · Fixed
          90-day trade pricing · Harvested at dawn · Packed by 11 · On your bench by service ·
          Returnable crates · Fixed 90-day trade pricing ·&nbsp;
        </span>
      </div>

      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Root &amp; Co Produce Ltd. All rights reserved.</span>
        <div className="footer-legal">
          <a href="#top">Terms of trade</a>
          <a href="#top">Privacy</a>
          <a href="#top">Allergen &amp; sourcing</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

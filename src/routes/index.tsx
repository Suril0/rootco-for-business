import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

import footerVideo from "../assets/footer-loop.mp4.asset.json";
import juiceImage from "../assets/juice-range.jpg";
import logoAsset from "../assets/logo.svg.asset.json";
import snacksImage from "../assets/snacks-range.jpg";
import rangeImage from "../assets/solution-range.jpg";
import supplyImage from "../assets/solution-supply.jpg";
import heroImage from "../assets/wholesale-hero.jpg";

const TITLE = "Root & Co for Business | Plant-Based Wholesale";
const DESCRIPTION =
  "Tailored wholesale snack and juice partnerships for cafés, hospitality teams, workplaces and retailers. Enquire with Root & Co.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SOLUTIONS = [
  {
    number: "01",
    title: "A range shaped around your customer",
    body: "We help you choose the right balance of everyday favourites, premium treats and functional drinks for your space, audience and price point.",
    detail: "Range curation · Seasonal refreshes · Dietary mix",
    className: "solution-wide",
  },
  {
    number: "02",
    title: "Formats that fit",
    body: "From grab-and-go counters to meeting rooms and minibar moments, we recommend pack sizes and formats that work where they are served.",
    detail: "Single serve · Multipacks · Sharing formats",
    className: "solution-standard",
  },
  {
    number: "03",
    title: "A dependable supply rhythm",
    body: "Agree a practical ordering pattern with your account contact, with support to plan launches, promotions and changes in demand.",
    detail: "Planned orders · Account support · Clear lead times",
    className: "solution-standard solution-dark",
  },
];

const PARTNERS = [
  {
    title: "Independent retail",
    body: "A focused edit for shelves and counters, with a mix designed to be easy for customers to understand and easy for teams to replenish.",
  },
  {
    title: "Hospitality & foodservice",
    body: "Plant-based snacks and juices selected for cafés, hotels, venues and catering teams where presentation, consistency and pace all matter.",
  },
  {
    title: "Workplace & wellbeing",
    body: "Flexible ranges for offices, studios and shared spaces—from daily fridge fills to curated pantry and event moments.",
  },
];

const SUPPORT = [
  ["Range planning", "A considered starting mix based on your audience, service style and available space."],
  ["Ordering rhythm", "Practical guidance on quantities and frequency, so stock stays fresh without unnecessary complexity."],
  ["Launch support", "Product notes and team-ready information to help your people introduce the range with confidence."],
  ["Ongoing review", "A direct point of contact to review what is moving, adapt the mix and plan what comes next."],
];

const STEPS = [
  ["01", "Tell us about your business", "Share your space, customer, locations and the kind of range you have in mind."],
  ["02", "Shape the right solution", "We review fit, recommend a starting mix and talk through quantities and delivery needs."],
  ["03", "Agree the partnership", "Together we settle the range, ordering rhythm and practical details for launch."],
  ["04", "Grow with support", "Your account contact stays close as demand changes and new opportunities emerge."],
];

const BUSINESS_TYPES = [
  "Independent retailer",
  "Cafe or coffee shop",
  "Restaurant, hotel or venue",
  "Workplace or wellbeing provider",
  "Distributor or reseller",
  "Other",
];

const VOLUMES = ["Exploring a first order", "1–2 locations", "3–10 locations", "10+ locations"];

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

const EMPTY: FormState = { name: "", business: "", email: "", phone: "", type: "", volume: "", message: "" };

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (values.business.trim().length < 2) errors.business = "Please enter your business name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Enter a valid work email address.";
  const digits = values.phone.replace(/[^\d]/g, "");
  if (values.phone.trim() && (digits.length < 7 || digits.length > 15)) errors.phone = "Enter a valid phone number, or leave it blank.";
  if (!values.type) errors.type = "Select your business type.";
  if (!values.volume) errors.volume = "Select the option that best fits.";
  if (values.message.trim().length < 10) errors.message = "Tell us a little more — at least 10 characters.";
  return errors;
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Logo({ className = "brand-mark" }: { className?: string }) {
  return <img src={logoAsset.url} alt="Root & Co" className={className} width={733} height={166} />;
}

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="text-link" href={href}>{children}<span aria-hidden="true">↘</span></a>;
}

function Index() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <Partnerships />
        <Products />
        <Operations />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a href="#top" className="brand-lockup" aria-label="Root & Co for Business — home"><Logo /></a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#solutions">Solutions</a>
          <a href="#partners">Partnerships</a>
          <a href="#products">Products</a>
          <a href="#support">Support</a>
        </nav>
        <a className="btn btn-primary nav-cta" href="#enquiry">Start a conversation <span aria-hidden="true">↘</span></a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="kicker"><span /> Root &amp; Co · For Business</div>
          <h1>Better plant-based choices, <em>made to fit your business.</em></h1>
          <p className="hero-lead">Thoughtful wholesale partnerships for cafés, hospitality teams, workplaces and retailers—bringing together vibrant juices, satisfying snacks and support that adapts to the way you operate.</p>
          <a className="btn btn-primary hero-cta" href="#enquiry">Start a conversation <span aria-hidden="true">↘</span></a>
          <div className="hero-note"><strong>Built around you</strong><span>No one-size-fits-all catalogue. We shape the right starting range together.</span></div>
        </div>
        <div className="hero-media">
          <img src={heroImage} alt="A wholesale selection of colourful juices and plant-based snacks" width={1600} height={1200} />
          <div className="hero-caption"><span>Root &amp; Co collection</span><strong>Snacks, juices &amp; thoughtful formats</strong></div>
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section className="section solutions reveal" id="solutions">
      <div className="wrap">
        <div className="section-intro">
          <div><p className="eyebrow">Tailored wholesale solutions</p><h2>Not a product list. A better-fit range.</h2></div>
          <p>Every business serves a different customer. We start with what your space needs, then build a plant-based offer that feels considered, commercial and simple to run.</p>
        </div>
        <div className="solution-grid">
          <figure className="solution-media solution-tall">
            <img src={rangeImage} alt="Kraft snack pouches, nuts, dried fruit and cold-pressed juices laid out for wholesale range planning" width={1280} height={1600} loading="lazy" />
            <figcaption>Range planning</figcaption>
          </figure>
          {SOLUTIONS.map((item) => (
            <article className={`solution-card ${item.className}`} key={item.number}>
              <span className="solution-number">{item.number}</span>
              <div><h3>{item.title}</h3><p>{item.body}</p><small>{item.detail}</small></div>
            </article>
          ))}
          <figure className="solution-media solution-strip">
            <img src={supplyImage} alt="Café team unpacking crates of plant-based snacks and juice bottles behind the counter" width={1280} height={900} loading="lazy" />
            <figcaption>Delivered, unpacked, ready to serve</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Partnerships() {
  return (
    <section className="section partners reveal" id="partners">
      <div className="wrap">
        <p className="eyebrow">Flexible partnership models</p>
        <div className="partner-heading"><h2>Built for the place your customers pause, shop or work.</h2><ArrowLink href="#enquiry">Discuss your setup</ArrowLink></div>
        <div className="partner-list">
          {PARTNERS.map((partner, index) => <article key={partner.title}><span>0{index + 1}</span><h3>{partner.title}</h3><p>{partner.body}</p><a href="#enquiry" aria-label={`Enquire about ${partner.title}`}>↘</a></article>)}
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section className="section products reveal" id="products">
      <div className="wrap product-grid">
        <article className="product-feature product-snacks">
          <img src={snacksImage} alt="Plant-based snack bites, nuts and dried fruit in wholesale packaging" width={1200} height={912} loading="lazy" />
          <div className="product-copy"><span>01 · Snacks</span><h2>Small formats. Real satisfaction.</h2><p>Plant-based bites, naturally sweet treats and savoury snacks selected for counters, shelves, rooms and shared spaces.</p></div>
        </article>
        <article className="product-feature product-juices">
          <img src={juiceImage} alt="Colourful cold-pressed juices with fresh fruit and leafy greens" width={1200} height={912} loading="lazy" />
          <div className="product-copy"><span>02 · Juices</span><h2>Colour, freshness and easy choice.</h2><p>A bright range of fruit, vegetable and botanical blends designed to make the fridge feel inviting and the choice feel effortless.</p></div>
        </article>
        <aside className="product-note"><p className="eyebrow">A focused collection</p><p>We intentionally keep the conversation ahead of the catalogue—so the offer reflects your customer, rather than asking you to navigate every possible product.</p><ArrowLink href="#enquiry">Talk through the range</ArrowLink></aside>
      </div>
    </section>
  );
}

function Operations() {
  return (
    <section className="section operations reveal" id="support">
      <div className="wrap operations-grid">
        <div className="operations-heading"><p className="eyebrow">Operational support</p><h2>Good products are only the beginning.</h2><p>Behind the range is a straightforward working relationship: clear communication, useful guidance and practical support as your needs evolve.</p></div>
        <div className="support-list">
          {SUPPORT.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}
        </div>
      </div>
      <div className="wrap process-block">
        <p className="eyebrow">How we begin</p>
        <div className="steps">{STEPS.map(([n, title, body]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </div>
    </section>
  );
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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setTouched(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      window.setTimeout(() => document.querySelector<HTMLElement>(".field.invalid input, .field.invalid select, .field.invalid textarea")?.focus(), 0);
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setReference(`RC-${Math.floor(100000 + Math.random() * 899999)}`);
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

  useEffect(() => { if (submitted) successRef.current?.focus(); }, [submitted]);
  const cls = (key: keyof FormState) => `field${errors[key] ? " invalid" : ""}`;

  return (
    <section className="enquiry reveal" id="enquiry">
      <div className="wrap enquiry-grid">
        <div className="enquiry-aside"><p className="eyebrow">Start a conversation</p><h2>Let’s shape the right Root &amp; Co offer for your business.</h2><p>Tell us a little about your space and what you need. We’ll come back with a considered next step—not a generic price list.</p><div className="enquiry-points"><span>One direct point of contact</span><span>A tailored starting recommendation</span><span>No online checkout or account setup</span></div></div>
        <div className="form-shell">
          {submitted ? (
            <div className="success" ref={successRef} tabIndex={-1} role="status" aria-live="polite"><span className="success-mark">✓</span><p className="eyebrow">Enquiry received</p><h3>Thank you, {values.name.split(" ")[0]}.</h3><p>We have your enquiry for <strong>{values.business}</strong> and will be in touch to explore the right fit.</p><small>Reference {reference}</small><button type="button" className="btn btn-secondary" onClick={() => { setValues(EMPTY); setErrors({}); setTouched(false); setSubmitted(false); }}>Send another enquiry</button></div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="field-row two">
                <Field className={cls("name")} label="Your name" error={errors.name}><input id="name" name="name" value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Alex Morgan" aria-invalid={!!errors.name} /></Field>
                <Field className={cls("business")} label="Business name" error={errors.business}><input id="business" name="business" value={values.business} onChange={(e) => update("business", e.target.value)} placeholder="Field House Cafe" aria-invalid={!!errors.business} /></Field>
              </div>
              <div className="field-row two">
                <Field className={cls("email")} label="Work email" error={errors.email}><input id="email" name="email" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="alex@business.com" aria-invalid={!!errors.email} /></Field>
                <Field className={cls("phone")} label="Phone (optional)" error={errors.phone}><input id="phone" name="phone" type="tel" value={values.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Your phone number" aria-invalid={!!errors.phone} /></Field>
              </div>
              <div className="field-row two">
                <Field className={cls("type")} label="Business type" error={errors.type}><select id="type" name="type" value={values.type} onChange={(e) => update("type", e.target.value)} aria-invalid={!!errors.type}><option value="">Select one…</option>{BUSINESS_TYPES.map((type) => <option key={type}>{type}</option>)}</select></Field>
                <Field className={cls("volume")} label="Business scale" error={errors.volume}><select id="volume" name="volume" value={values.volume} onChange={(e) => update("volume", e.target.value)} aria-invalid={!!errors.volume}><option value="">Select one…</option>{VOLUMES.map((volume) => <option key={volume}>{volume}</option>)}</select></Field>
              </div>
              <Field className={cls("message")} label="What would a good partnership look like?" error={errors.message}><textarea id="message" name="message" value={values.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your locations, customers and what you would like to offer…" aria-invalid={!!errors.message} /></Field>
              <div className="form-foot"><button type="submit" className="btn btn-accent" disabled={submitting}>{submitting ? "Sending…" : "Send enquiry"} <span aria-hidden="true">↘</span></button><small>We’ll use these details only to respond to your enquiry.</small></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ className, label, error, children }: { className: string; label: string; error: string | undefined; children: ReactNode }) {
  const child = children as React.ReactElement<{ id?: string }>;
  return <div className={className}><label htmlFor={child.props.id}>{label}</label>{children}{error && <span className="err">{error}</span>}</div>;
}

function Footer() {
  return (
    <footer className="site-footer">
      <video className="footer-video" src={footerVideo.url} autoPlay muted loop playsInline aria-hidden="true" /><div className="footer-veil" aria-hidden="true" />
      <div className="wrap footer-top">
        <div className="footer-brand"><Logo /><p>Plant-based snacks, vibrant juices and wholesale partnerships shaped around the people you serve.</p></div>
        <div className="footer-col"><h3>Explore</h3><a href="#solutions">Solutions</a><a href="#partners">Partnerships</a><a href="#products">Products</a><a href="#support">Support</a></div>
        <div className="footer-col"><h3>For business</h3><a href="#partners">Independent retail</a><a href="#partners">Hospitality</a><a href="#partners">Workplaces</a><a href="#enquiry">Wholesale enquiry</a></div>
        <div className="footer-call"><p>Ready to build a better-fit range?</p><a className="btn btn-accent" href="#enquiry">Start a conversation <span aria-hidden="true">↘</span></a></div>
      </div>
      <div className="footer-marquee" aria-hidden="true"><span>Plant-based by nature · Built for business · Snacks with substance · Juices full of colour · Thoughtful partnerships · Plant-based by nature · Built for business · Snacks with substance · Juices full of colour · Thoughtful partnerships ·&nbsp;</span></div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Root &amp; Co. All rights reserved.</span><div><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Back to top ↑</a></div></div>
    </footer>
  );
}

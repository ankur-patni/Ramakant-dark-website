import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Beaker,
  Boxes,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  Earth,
  Factory,
  FlaskConical,
  Globe2,
  Leaf,
  Mail,
  MapPinned,
  Menu,
  PackageCheck,
  Phone,
  ShieldCheck,
  Ship,
  Sparkles,
  TimerReset,
  Truck,
  X,
} from 'lucide-react';
import './styles.css';

const navItems = ['Products', 'Industries', 'Compliance', 'Sustainability', 'Contact'];

const products = [
  { name: 'Industrial Solvents', detail: 'High-purity grades for manufacturing and process chemistry', icon: FlaskConical },
  { name: 'Specialty Intermediates', detail: 'Reliable sourcing for fine chemical and pharma-adjacent supply chains', icon: Beaker },
  { name: 'Agrochemical Inputs', detail: 'Export-ready raw materials with documentation support', icon: Leaf },
  { name: 'Performance Additives', detail: 'Formulation support for coatings, plastics, and industrial blends', icon: Sparkles },
];

const industries = [
  'Pharmaceuticals',
  'Agrochemicals',
  'Paints & Coatings',
  'Polymers',
  'Textile Processing',
  'Water Treatment',
];

const stats = [
  { value: 24, suffix: '+', label: 'Export corridors supported' },
  { value: 180, suffix: '+', label: 'Verified product families' },
  { value: 98, suffix: '%', label: 'On-time documentation readiness' },
  { value: 12, suffix: 'h', label: 'Average quote response window' },
];

const timeline = [
  { title: 'Source', text: 'Validated manufacturers, grade matching, and commercial fit.', icon: Globe2 },
  { title: 'Verify', text: 'COA, SDS, packing, origin, and compliance documentation checks.', icon: ClipboardCheck },
  { title: 'Move', text: 'Export packing, freight coordination, and milestone visibility.', icon: Ship },
  { title: 'Deliver', text: 'Clear delivery communication from dispatch through receipt.', icon: PackageCheck },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function AnimatedCounter({ value, suffix }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => spring.on('change', (latest) => setDisplay(Math.round(latest))), [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function Button({ children, variant = 'primary', href = '#contact', icon: Icon = ArrowRight }) {
  const className =
    variant === 'primary'
      ? 'bg-[#67E8F9] text-[#020617] shadow-lg shadow-cyan-300/20 hover:bg-[#22D3EE]'
      : 'border border-[#67E8F9] text-[#67E8F9] hover:bg-cyan-300/10';

  return (
    <motion.a
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${className}`}
      href={href}
    >
      {children}
      <Icon className="h-4 w-4" aria-hidden="true" />
    </motion.a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-300/10 bg-[#020617]/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#" className="group flex items-center gap-3" aria-label="Ramakant Chemiequelle home">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/20 bg-slate-900 text-[#67E8F9] shadow-cyan-soft">
            <FlaskConical className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-base font-bold leading-tight text-white">Ramakant</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[#67E8F9]">Chemiequelle</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item, index) => (
            <a
              key={item}
              className={`text-sm font-medium transition hover:text-[#67E8F9] ${index === 0 ? 'text-[#67E8F9]' : 'text-slate-300'}`}
              href={`#${item.toLowerCase()}`}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="#contact">Request Quote</Button>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/10 text-[#67E8F9] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-cyan-300/10 bg-[#020617]/95 px-5 py-5 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-4">
            {navItems.map((item) => (
              <a
                key={item}
                className="rounded-xl border border-cyan-300/10 px-4 py-3 text-sm font-semibold text-slate-200"
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ scale: 0.97 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative min-h-[340px] overflow-hidden rounded-2xl border border-cyan-300/10 bg-slate-900/60 p-4 shadow-cyan backdrop-blur-md md:min-h-[460px] md:p-5"
    >
      <img
        src="/assets/industrial-network.svg"
        alt="Original abstract industrial trade network visualization"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/15 via-transparent to-[#020617]/80" />
      <div className="relative z-10 flex h-full flex-col justify-between gap-5">
        <div className="ml-auto w-full max-w-full rounded-xl border border-cyan-300/15 bg-[#020617]/70 px-4 py-3 backdrop-blur-md sm:w-fit">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#67E8F9] sm:tracking-[0.18em]">
            <TimerReset className="h-4 w-4" />
            Live export workflow
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800 sm:w-56">
            <motion.div
              initial={{ width: '22%' }}
              animate={{ width: ['22%', '76%', '48%', '92%'] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
              className="h-full rounded-full bg-[#67E8F9]"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {['Quote', 'Compliance', 'Dispatch'].map((label, index) => (
            <motion.div
              key={label}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3 + index * 0.35, repeat: Infinity }}
              className="rounded-2xl border border-cyan-300/10 bg-[#020617]/75 p-4 backdrop-blur-md"
            >
              <CheckCircle2 className="mb-3 h-5 w-5 text-[#22C55E]" />
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="mt-1 text-xs text-slate-400">Verified</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#67E8F9]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-slate-300">{text}</p>
    </motion.div>
  );
}

function App() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020617] text-white">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#020617] pt-28">
          <div className="absolute inset-0 bg-industrial-grid bg-[length:44px_44px] opacity-45" />
          <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.20),transparent_55%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:pb-24">
            <motion.div initial={{ y: 18 }} animate={{ y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-[#67E8F9] backdrop-blur-md">
                <Earth className="h-4 w-4" />
                Global Chemical Sourcing & Export
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.05] text-white md:text-6xl xl:text-7xl">
                <span className="block">Ramakant</span>
                <span className="block break-words">Chemiequelle</span>
              </h1>
              <p className="mt-5 max-w-2xl text-xl font-semibold text-[#67E8F9]">
                Reliable & Hassle-Free Product Delivery
              </p>
              <p className="mt-6 max-w-[20rem] break-words text-sm leading-7 text-slate-300 sm:max-w-2xl sm:text-base md:text-lg md:leading-8">
                A premium sourcing partner for industrial chemicals, export documentation, quality coordination,
                and dependable global delivery across demanding B2B supply chains.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#contact">Request Quote</Button>
                <Button href="#products" variant="secondary" icon={ChevronRight}>
                  Explore Products
                </Button>
              </div>
              <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
                {['Compliance-led', 'Export-ready', 'Responsive support'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <BadgeCheck className="h-4 w-4 text-[#67E8F9]" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            <HeroVisual />
          </div>
        </section>

        <section className="border-y border-cyan-300/10 bg-slate-950 py-8">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-4 lg:px-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5, scale: 1.01 }}
                className="rounded-2xl border border-cyan-300/10 bg-slate-900/60 p-6 backdrop-blur-md transition hover:shadow-cyan-soft"
              >
                <p className="text-3xl font-black text-[#67E8F9]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="products" className="bg-[#020617] px-5 py-20 lg:px-8">
          <SectionIntro
            eyebrow="Product Platform"
            title="Sourcing built for technical buying teams"
            text="From recurring bulk requirements to project-based specialty chemicals, every request is handled with grade clarity, supplier validation, and export coordination."
          />
          <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.article
                  key={product.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group rounded-2xl border border-cyan-300/10 bg-slate-900/60 p-6 backdrop-blur-md transition hover:border-cyan-300/30 hover:shadow-cyan"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/10 text-[#67E8F9] transition group-hover:bg-[#67E8F9] group-hover:text-[#020617]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">{product.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{product.detail}</p>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#67E8F9]">
                    View Products <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="bg-slate-950 px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative overflow-hidden rounded-2xl border border-cyan-300/10 bg-slate-900/60 p-4 shadow-cyan-soft backdrop-blur-md"
            >
              <img
                src="/assets/supply-chain-control.svg"
                alt="Original abstract supply chain control room visualization"
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            </motion.div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#67E8F9]">Supply Chain Visibility</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Every shipment moves through a controlled workflow</h2>
              <div className="mt-8 grid gap-4">
                {timeline.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      whileHover={{ x: 5 }}
                      className="flex gap-4 rounded-2xl border border-cyan-300/10 bg-[#020617]/70 p-5 backdrop-blur-md"
                    >
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-[#67E8F9]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{step.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{step.text}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="industries" className="bg-[#020617] px-5 py-20 lg:px-8">
          <SectionIntro
            eyebrow="Industry Coverage"
            title="Reliable chemistry for global production networks"
            text="Commercial, technical, and logistics conversations stay connected so procurement teams get fast answers and fewer surprises."
          />
          <div className="mx-auto mt-12 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <motion.div
                key={industry}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="flex items-center justify-between rounded-2xl border border-cyan-300/10 bg-slate-900/60 p-5 backdrop-blur-md hover:shadow-cyan-soft"
              >
                <div className="flex items-center gap-3">
                  <Factory className="h-5 w-5 text-[#67E8F9]" />
                  <span className="font-semibold text-white">{industry}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="compliance" className="border-y border-cyan-300/10 bg-slate-950 px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {[
              { title: 'Documentation Confidence', text: 'COA, SDS, packing list, origin, and export paperwork alignment before dispatch.', icon: ShieldCheck },
              { title: 'Supplier Verification', text: 'Manufacturer checks, product fit validation, and quality expectation mapping.', icon: BadgeCheck },
              { title: 'Delivery Assurance', text: 'Shipment milestone communication and responsive coordination from quote to receipt.', icon: Truck },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="rounded-2xl border border-cyan-300/10 bg-slate-900/60 p-7 backdrop-blur-md hover:shadow-cyan"
                >
                  <Icon className="h-8 w-8 text-[#67E8F9]" />
                  <h3 className="mt-6 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="sustainability" className="bg-[#020617] px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-cyan-300/10 bg-slate-900/60 backdrop-blur-md">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-8 md:p-12">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#67E8F9]">Sustainability</p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Responsible sourcing without slowing procurement down</h2>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  We prioritize traceable supply, optimized freight conversations, and clear product documentation so customers can make informed chemical sourcing decisions.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {['Traceable supply discussions', 'Efficient shipment planning', 'Cleaner documentation flow', 'Long-term supplier alignment'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm font-medium text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[360px] border-t border-cyan-300/10 lg:border-l lg:border-t-0">
                <img
                  src="/assets/global-sustainability.svg"
                  alt="Original abstract global sustainability visualization"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-slate-950 px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#67E8F9]">Contact Sales</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Start a reliable chemical sourcing conversation</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                Share your product, grade, quantity, destination, and required documentation. Our team will align the sourcing path and quote window.
              </p>
              <div className="mt-8 grid gap-4">
                <a className="flex items-center gap-3 text-slate-300 hover:text-[#67E8F9]" href="mailto:sales@ramakantchemiequelle.com">
                  <Mail className="h-5 w-5 text-[#67E8F9]" /> sales@ramakantchemiequelle.com
                </a>
                <a className="flex items-center gap-3 text-slate-300 hover:text-[#67E8F9]" href="tel:+910000000000">
                  <Phone className="h-5 w-5 text-[#67E8F9]" /> +91 00000 00000
                </a>
                <span className="flex items-center gap-3 text-slate-300">
                  <MapPinned className="h-5 w-5 text-[#67E8F9]" /> India-based export coordination, global reach
                </span>
              </div>
            </div>
            <motion.form
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="rounded-2xl border border-cyan-300/10 bg-slate-900/60 p-6 backdrop-blur-md md:p-8"
            >
              <div className="grid gap-4 md:grid-cols-2">
                {['Name', 'Company', 'Email', 'Destination Country'].map((label) => (
                  <label key={label} className="grid gap-2 text-sm font-semibold text-slate-200">
                    {label}
                    <input
                      className="rounded-xl border border-cyan-300/10 bg-[#020617] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#67E8F9]"
                      placeholder={label}
                    />
                  </label>
                ))}
              </div>
              <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-200">
                Product Requirement
                <textarea
                  className="min-h-32 rounded-xl border border-cyan-300/10 bg-[#020617] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#67E8F9]"
                  placeholder="Product name, grade, quantity, packing, and documentation needs"
                />
              </label>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="#contact">Contact Sales</Button>
                <Button href="#products" variant="secondary" icon={Download}>
                  Download Catalog
                </Button>
              </div>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="border-t border-cyan-300/10 bg-[#020617] px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-bold text-white">Ramakant Chemiequelle</p>
            <p className="mt-1 text-sm text-slate-400">Reliable & Hassle-Free Product Delivery</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm font-medium">
            {navItems.map((item) => (
              <a key={item} className="text-white transition hover:text-[#67E8F9]" href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </div>
          <p className="text-sm text-slate-500">© {currentYear} Ramakant Chemiequelle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

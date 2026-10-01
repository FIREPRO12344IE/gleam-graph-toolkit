import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ImagePlus,
  Instagram,
  MapPin,
  Menu,
  X,
} from "lucide-react";

import heroImage from "@/assets/ts-workshop-hero.jpg";
import { Button } from "@/components/ui/button";

const services = [
  ["01", "Servicing", "Professional motorcycle servicing and maintenance."],
  ["02", "Repairs", "Mechanical repairs and troubleshooting."],
  ["03", "Tyres", "Tyre fitting and related services."],
  ["04", "Electrical", "Electrical diagnostics and repair."],
  ["05", "Engine work", "Engine-related inspection and repair."],
  ["06", "MOT prep", "Preparation and checks before an MOT."],
  ["07", "Diagnostics", "Fault finding and motorcycle diagnostics."],
] as const;

const prices = [
  ["Servicing", "From £_"],
  ["Diagnostics", "From £_"],
  ["Tyres", "From £_"],
  ["Repairs", "Quote required"],
  ["Engine work", "Quote required"],
  ["MOT prep", "From £_"],
] as const;

const gallerySlots = ["Workshop", "Customer motorcycles", "Repairs", "Servicing", "Before & after"];

const navItems = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["Pricing", "#pricing"],
  ["Our Work", "#work"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

function BrandMark() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="TS Workshop home">
      <span className="grid h-9 w-10 skew-x-[-8deg] place-items-center bg-primary font-display text-lg text-primary-foreground">
        <span className="skew-x-[8deg]">TS</span>
      </span>
      <span className="font-display text-xl uppercase leading-none text-foreground">Workshop</span>
    </a>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md transition-all ${compact ? "py-2" : "py-4"}`}>
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 md:px-8 xl:px-12">
        <BrandMark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="text-xs font-bold uppercase text-muted-foreground transition-colors hover:text-primary">
              {label}
            </a>
          ))}
          <Button asChild className="h-11 rounded-none px-5 font-bold uppercase">
            <a href="#quote">Book / get a quote <ArrowRight /></a>
          </Button>
        </nav>
        <Button variant="ghost" size="icon" className="rounded-none lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="absolute inset-x-0 top-full border-y border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="border-b border-border py-4 font-display text-2xl uppercase text-foreground">
                {label}
              </a>
            ))}
            <Button asChild className="mt-5 h-13 rounded-none font-bold uppercase">
              <a href="#quote" onClick={() => setOpen(false)}>Book / get a quote <ArrowRight /></a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`mb-7 flex items-center gap-3 text-xs font-extrabold uppercase ${light ? "text-primary" : "text-accent"}`}>
      <span className="h-0.5 w-8 bg-current" /> {children}
    </div>
  );
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const change = (delta: number) => setSelected((value) => value === null ? 0 : (value + delta + gallerySlots.length) % gallerySlots.length);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") change(1);
      if (event.key === "ArrowLeft") change(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      <div className="gallery-grid">
        {gallerySlots.map((slot, index) => (
          <button key={slot} type="button" onClick={() => setSelected(index)} className="gallery-slot group" aria-label={`Open ${slot} photo placeholder`}>
            <span className="gallery-gridlines" />
            <span className="relative z-10 flex h-full flex-col items-start justify-between p-5 text-left md:p-7">
              <span className="flex h-11 w-11 items-center justify-center border border-foreground/30"><ImagePlus /></span>
              <span>
                <span className="mb-2 block text-xs font-bold uppercase text-primary">Photo slot {String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl uppercase text-foreground md:text-3xl">{slot}</span>
                <span className="mt-2 flex items-center gap-2 text-xs uppercase text-muted-foreground">Owner photo to be added <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </span>
            </span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-background/95 p-4" role="dialog" aria-modal="true" aria-label="Gallery viewer">
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 rounded-none" onClick={() => setSelected(null)} aria-label="Close gallery"><X /></Button>
          <Button variant="outline" size="icon" className="absolute left-4 rounded-none" onClick={() => change(-1)} aria-label="Previous image"><ChevronLeft /></Button>
          <div className="flex aspect-[4/3] w-[min(80vw,900px)] flex-col items-center justify-center border border-border bg-card p-8 text-center">
            <ImagePlus className="mb-5 h-10 w-10 text-primary" />
            <p className="font-display text-3xl uppercase text-foreground md:text-5xl">{gallerySlots[selected]}</p>
            <p className="mt-3 text-sm text-muted-foreground">Replace this slot with a genuine TS Workshop photograph.</p>
            <p className="mt-8 text-xs font-bold uppercase text-primary">{selected + 1} / {gallerySlots.length}</p>
          </div>
          <Button variant="outline" size="icon" className="absolute right-4 rounded-none" onClick={() => change(1)} aria-label="Next image"><ChevronRight /></Button>
        </div>
      )}
    </>
  );
}

function QuoteForm() {
  const [status, setStatus] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `TS Workshop enquiry — ${data.get("make")} ${data.get("model")}`;
    const body = [
      `Name: ${data.get("name")}`, `Phone: ${data.get("phone")}`, `Email: ${data.get("email")}`,
      `Motorcycle: ${data.get("make")} ${data.get("model")}`, `Registration: ${data.get("registration")}`,
      `Mileage: ${data.get("mileage")}`, `Service required: ${data.get("service")}`,
      `Preferred date: ${data.get("date")}`, "", `Additional information:`, `${data.get("message")}`,
    ].join("\n");
    setStatus("Your email app should now open with the enquiry ready to send.");
    window.location.href = `mailto:YOUR_EMAIL@EXAMPLE.COM?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const fields = [
    ["name", "Name", "text", true], ["phone", "Phone", "tel", true], ["email", "Email", "email", true],
    ["make", "Motorcycle make", "text", true], ["model", "Motorcycle model", "text", true],
    ["registration", "Registration", "text", false], ["mileage", "Mileage", "text", false], ["date", "Preferred date", "date", false],
  ] as const;

  return (
    <form onSubmit={submit} className="mt-10 grid gap-x-5 gap-y-6 md:grid-cols-2">
      {fields.map(([name, label, type, required]) => (
        <label key={name} className="form-field">
          <span>{label}{required && " *"}</span>
          <input name={name} type={type} required={required} />
        </label>
      ))}
      <label className="form-field md:col-span-2">
        <span>Service required *</span>
        <select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(([, name]) => <option key={name}>{name}</option>)}</select>
      </label>
      <label className="form-field md:col-span-2">
        <span>Additional information</span>
        <textarea name="message" rows={5} />
      </label>
      <div className="flex flex-col items-start gap-3 md:col-span-2 sm:flex-row sm:items-center">
        <Button type="submit" className="h-14 w-full rounded-none px-8 font-bold uppercase sm:w-auto">Send enquiry <ArrowRight /></Button>
        <p className="text-xs text-muted-foreground">Email address placeholder — replace before launch.</p>
      </div>
      <p className="sr-only" aria-live="polite">{status}</p>
    </form>
  );
}

export function TSWorkshopHome() {
  return (
    <main id="home" className="overflow-clip bg-background">
      <Navigation />
      <section className="relative flex min-h-[92svh] items-end border-b border-border pt-28" aria-labelledby="hero-title">
        <img src={heroImage} width={1920} height={1280} alt="Mechanic working on a motorcycle inside a professional workshop" className="absolute inset-0 h-full w-full object-cover object-[64%_center]" fetchPriority="high" />
        <div className="hero-shade absolute inset-0" />
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-16 md:px-8 md:pb-20 xl:px-12">
          <div className="max-w-5xl">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase text-primary"><span className="h-0.5 w-9 bg-primary" /> Motorcycle workshop</p>
            <h1 id="hero-title" className="font-display text-[clamp(3.7rem,10vw,9.5rem)] uppercase leading-[0.82] text-foreground">
              Motorcycle<br /><span className="text-stroke">repairs</span> <span className="text-primary">&</span><br />diagnostics
            </h1>
            <p className="mt-7 max-w-xl text-sm font-bold uppercase text-foreground md:text-base">Fair prices. Honest work. Fast turnaround.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-14 rounded-none px-7 font-bold uppercase"><a href="#quote">Get a quote <ArrowRight /></a></Button>
              <Button asChild variant="outline" className="h-14 rounded-none border-foreground/40 bg-background/30 px-7 font-bold uppercase text-foreground hover:bg-foreground hover:text-background"><a href="#services">View services</a></Button>
            </div>
          </div>
          <a href="#services" className="absolute bottom-5 right-5 hidden items-center gap-3 text-xs font-bold uppercase text-muted-foreground md:flex">Scroll to explore <ArrowDown className="h-4 w-4 text-primary" /></a>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8 xl:px-12">
          <SectionLabel>Services / 01</SectionLabel>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div><h2 className="font-display text-6xl uppercase leading-[0.9] text-foreground md:text-8xl">What<br />we do<span className="text-primary">.</span></h2><p className="mt-6 max-w-sm text-muted-foreground">Professional motorcycle servicing, repairs and diagnostics.</p></div>
            <div className="border-t border-border">
              {services.map(([number, title, description]) => (
                <a href="#quote" key={title} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-border py-5 md:grid-cols-[4rem_0.8fr_1fr_auto] md:gap-5 md:py-7">
                  <span className="text-xs font-bold text-primary">{number}</span>
                  <h3 className="font-display text-2xl uppercase text-foreground md:text-3xl">{title}</h3>
                  <p className="col-start-2 mt-1 text-sm text-muted-foreground md:col-start-auto md:mt-0">{description}</p>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8 xl:px-12">
          <SectionLabel light>Pricing / 02</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div><h2 className="font-display text-5xl uppercase leading-[0.9] text-foreground md:text-7xl">Clear pricing.<br /><span className="text-primary">No BS.</span></h2><p className="mt-6 max-w-md text-muted-foreground">Prices can vary depending on the motorcycle and work required. Contact TS Workshop for an accurate quote.</p></div>
            <div>
              {prices.map(([label, value]) => <div key={label} className="flex items-end justify-between gap-5 border-b border-border py-5"><span className="font-display text-xl uppercase text-foreground md:text-2xl">{label}</span><span className="font-bold uppercase text-primary">{value}</span></div>)}
              <Button asChild variant="link" className="mt-6 h-auto rounded-none p-0 font-bold uppercase"><a href="#quote">Get a quote <ArrowRight /></a></Button>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-20 border-y border-border bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8 xl:px-12">
          <SectionLabel>Our work / 03</SectionLabel>
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><h2 className="max-w-4xl font-display text-5xl uppercase leading-[0.9] text-foreground md:text-8xl">The work speaks<br />for itself<span className="text-primary">.</span></h2><p className="max-w-xs text-sm text-muted-foreground">A place for genuine workshop, repair and finished-bike photography.</p></div>
          <Gallery />
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 md:px-8 lg:grid-cols-[1.2fr_0.8fr] xl:px-12">
          <h2 className="font-display text-6xl uppercase leading-[0.86] md:text-8xl xl:text-9xl">Fair prices.<br />Honest work.<br />Fast turnaround.</h2>
          <div className="grid gap-7 self-end">
            {[["Honest", "Straightforward communication about the work your bike needs."], ["Professional", "Focused on proper motorcycle servicing, repairs and diagnostics."], ["Efficient", "Clear communication and a focus on getting work completed efficiently."]].map(([title, text], index) => <div key={title} className="border-t border-primary-foreground/30 pt-4"><span className="text-xs font-bold">0{index + 1}</span><h3 className="mt-2 font-display text-2xl uppercase">{title}</h3><p className="mt-1 text-sm opacity-75">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8 xl:px-12">
          <SectionLabel light>About / 04</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-2">
            <div><h2 className="font-display text-5xl uppercase text-foreground md:text-7xl">About TS Workshop<span className="text-primary">.</span></h2><p className="mt-6 max-w-md text-muted-foreground">A dedicated space for the real story behind the workshop, added in the owner’s own words.</p></div>
            <div className="border-l-2 border-primary bg-surface p-6 md:p-10"><p className="text-xs font-bold uppercase text-primary">Owner content required</p><p className="mt-5 font-display text-3xl uppercase text-foreground">Add company story here</p><p className="mt-4 text-sm leading-7 text-muted-foreground">Workshop story · Owner and team · Experience · Qualifications · Specialisms</p></div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8 xl:px-12">
          <SectionLabel>Reviews / 05</SectionLabel>
          <h2 className="font-display text-5xl uppercase text-foreground md:text-7xl">What our customers say<span className="text-primary">.</span></h2>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
            {[1, 2, 3].map((item) => <div key={item} className="bg-surface p-7 md:p-9"><p className="text-xs font-bold uppercase text-primary">Genuine review slot 0{item}</p><p className="mt-12 font-display text-2xl uppercase text-muted-foreground">Customer review to be added</p><div className="mt-12 border-t border-border pt-4 text-xs uppercase text-muted-foreground">Customer name · Date</div></div>)}
          </div>
        </div>
      </section>

      <section id="quote" className="scroll-mt-20 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-8 lg:grid-cols-[0.75fr_1.25fr] xl:px-12">
          <div><SectionLabel light>Book / 06</SectionLabel><h2 className="font-display text-6xl uppercase leading-[0.9] text-foreground md:text-8xl">Need your<br />bike <span className="text-primary">sorting?</span></h2><p className="mt-6 max-w-md text-muted-foreground">Tell us what you need and we’ll get back to you.</p><Button asChild variant="outline" className="mt-8 h-12 rounded-none uppercase"><a href="mailto:YOUR_EMAIL@EXAMPLE.COM">Message TS Workshop <ExternalLink /></a></Button></div>
          <QuoteForm />
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 px-5 md:flex-row md:items-center md:px-8 xl:px-12">
          <div><p className="text-xs font-bold uppercase text-primary">Follow the work</p><p className="mt-2 font-display text-5xl uppercase text-foreground md:text-7xl">@tsworkshop</p><p className="mt-3 text-sm text-muted-foreground">Social profile URL to be added by the owner.</p></div>
          <span className="flex h-20 w-20 items-center justify-center border border-border text-foreground"><Instagram className="h-8 w-8" /></span>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 py-24 md:py-32">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8 xl:px-12">
          <SectionLabel light>Contact / 07</SectionLabel>
          <div className="grid gap-10 lg:grid-cols-2">
            <div><h2 className="font-display text-6xl uppercase text-foreground md:text-8xl">Find us<span className="text-primary">.</span></h2><dl className="mt-10 grid gap-6 sm:grid-cols-2">{[["Address", "[Add address]"], ["Phone", "[Add phone]"], ["Email", "[Add email]"], ["Opening hours", "[Add opening hours]"]].map(([term, detail]) => <div key={term} className="border-t border-border pt-4"><dt className="text-xs font-bold uppercase text-primary">{term}</dt><dd className="mt-2 text-sm text-foreground">{detail}</dd></div>)}</dl></div>
            <div className="relative grid min-h-80 place-items-center overflow-hidden border border-border bg-surface"><span className="map-grid absolute inset-0" /><div className="relative text-center"><MapPin className="mx-auto h-9 w-9 text-primary" /><p className="mt-4 font-display text-2xl uppercase text-foreground">Map location</p><p className="mt-2 text-sm text-muted-foreground">Workshop address required</p></div></div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface pt-16">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8 xl:px-12">
          <div className="flex flex-col justify-between gap-10 md:flex-row"><div><BrandMark /><p className="mt-4 text-sm uppercase text-muted-foreground">Motorcycle repairs & diagnostics</p></div><nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-xs font-bold uppercase text-muted-foreground sm:grid-cols-3" aria-label="Footer navigation">{navItems.slice(1).map(([label, href]) => <a key={label} href={href} className="hover:text-primary">{label}</a>)}<span>Socials</span></nav></div>
          <p className="mt-20 border-t border-border py-6 text-xs uppercase text-muted-foreground">© TS Workshop {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}
import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingCart,
  Menu as MenuIcon,
  X,
  MapPin,
  Clock,
  Star,
  ChevronDown,
  ArrowRight,
  Plus,
  Minus,
  Check,
  Coffee,
  Instagram,
  ChevronRight,
  Leaf,
  Heart,
  Zap,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Page =
  | "home"
  | "order"
  | "menu"
  | "find-us"
  | "about"
  | "cart"
  | "checkout"
  | "confirmation";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
}

interface CartItem {
  cartId: string;
  menuItemId: string;
  name: string;
  basePrice: number;
  extrasPrice: number;
  qty: number;
  milk: string;
  sweetness: string;
  extras: string[];
}

interface OrderData {
  location: string;
  time: string;
  name: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const MENU_ITEMS: MenuItem[] = [
  {
    id: "signature-iced-latte",
    name: "Signature Iced Latte",
    description: "Our classic, bold coffee over ice with that smooth, satisfying finish",
    price: 5.0,
    category: "Iced Lattes",
    image:
      "https://images.unsplash.com/photo-1558122104-355edad709f6?w=600&h=600&fit=crop&auto=format",
    popular: true,
  },
  {
    id: "vanilla-iced-latte",
    name: "Vanilla Iced Latte",
    description: "House-made vanilla syrup, smooth and subtly sweet — a community favourite",
    price: 6.0,
    category: "Iced Lattes",
    image:
      "https://drive.google.com/file/d/1EtjzdxHPdnWJw0xx9eQi7Qsd9GJ58G-J/view?usp=sharing",
    popular: true,
  },
  {
    id: "caramel-iced-latte",
    name: "Caramel Iced Latte",
    description: "Rich homemade caramel syrup blended into our iced latte — deeply satisfying",
    price: 6.0,
    category: "Iced Lattes",
    image:
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&h=600&fit=crop&auto=format",
    popular: true,
  },
  {
    id: "mocha-iced-latte",
    name: "Mocha Iced Latte",
    description: "Homemade chocolate syrup meets our iced latte for a treat you'll come back for",
    price: 6.0,
    category: "Iced Lattes",
    image:
      "https://images.unsplash.com/photo-1550731358-491ded4af838?w=600&h=600&fit=crop&auto=format",
  },
  {
    id: "cherry-lemonade",
    name: "Cherry Lemonade Refresher",
    description: "Bright cherry and fresh lemon — a refreshing, caffeine-free crowd pleaser",
    price: 5.0,
    category: "Refreshers",
    image:
      "https://images.unsplash.com/photo-1562447457-579fc34967fb?w=600&h=600&fit=crop&auto=format",
    popular: true,
  },
  {
    id: "strawberry-lemonade",
    name: "Strawberry Lemonade Refresher",
    description: "Sweet strawberry and zesty lemon, made fresh, no caffeine, all flavour",
    price: 5.0,
    category: "Refreshers",
    image:
      "https://images.unsplash.com/photo-1549652127-2e5e59e86a7a?w=600&h=600&fit=crop&auto=format",
  },
];

const CATEGORIES = ["All", "Iced Lattes", "Refreshers"];

const EVENTS = [
  {
    date: "3",
    day: "Fri",
    month: "Jul",
    market: "Ottawa Uyghur Centre — After Jummah",
    time: "2:00 PM – 3:00 PM",
    address: "3555 St Joseph Blvd, Ottawa",
  },
  {
    date: "10",
    day: "Fri",
    month: "Jul",
    market: "Ottawa Uyghur Centre — After Jummah",
    time: "2:00 PM – 3:00 PM",
    address: "3555 St Joseph Blvd, Ottawa",
  },
  {
    date: "17",
    day: "Fri",
    month: "Jul",
    market: "Ottawa Uyghur Centre — After Jummah",
    time: "2:00 PM – 3:00 PM",
    address: "3555 St Joseph Blvd, Ottawa",
  },
  {
    date: "24",
    day: "Fri",
    month: "Jul",
    market: "Ottawa Uyghur Centre — After Jummah",
    time: "2:00 PM – 3:00 PM",
    address: "3555 St Joseph Blvd, Ottawa",
  },
  {
    date: "31",
    day: "Fri",
    month: "Jul",
    market: "Ottawa Uyghur Centre — After Jummah",
    time: "2:00 PM – 3:00 PM",
    address: "3555 St Joseph Blvd, Ottawa",
  },
  {
    date: "7",
    day: "Fri",
    month: "Aug",
    market: "Ottawa Uyghur Centre — After Jummah",
    time: "2:00 PM – 3:00 PM",
    address: "3555 St Joseph Blvd, Ottawa",
  },
];

const REVIEWS = [
  {
    text: "Best iced coffee I've had. The caramel latte is something else — I come back every Friday.",
    author: "Priya M.",
    stars: 5,
  },
  {
    text: "I came for one drink and ended up getting three. The vanilla latte is absolutely unreal.",
    author: "Jake T.",
    stars: 5,
  },
  {
    text: "My first stop after Jummah every week. The community vibes make it even better.",
    author: "Sofia R.",
    stars: 5,
  },
];

const FAQS = [
  {
    q: "Where are you located?",
    a: "We set up every Friday after Jummah at the Ottawa Uyghur Centre, 3555 St Joseph Blvd, Ottawa, from 2:00 PM to 3:00 PM. Come find us!",
  },
  {
    q: "Do you accept pre-orders?",
    a: "Yes! Order ahead on our website, choose your pickup time, and walk straight up to the counter when you arrive. No waiting around.",
  },
  {
    q: "Can I book you for an event?",
    a: "We'd love to bring The Cafénator to your event. Email us at thecafenatorstar@gmail.com with your date and details and we'll get back to you quickly.",
  },
  {
    q: "What payment methods do you take?",
    a: "We accept cash and e-transfer at the booth. Online pre-orders are card only.",
  },
  {
    q: "Do you offer dairy-free options?",
    a: "Yes, we offer oat milk as a dairy-free alternative for any of our iced lattes. Just select oat milk when you customize your order.",
  },
];

const EXTRAS: { name: string; price: number }[] = [];

const MILKS = ["Regular Milk", "Oat Milk"];
const SWEETNESS_OPTS = ["No Sugar", "Light", "Regular", "Extra Sweet"];
const PICKUP_TIMES = [
  "2:00 PM",
  "2:10 PM",
  "2:20 PM",
  "2:30 PM",
  "2:40 PM",
  "2:50 PM",
];

const fmt = (n: number) => `$${n.toFixed(2)}`;

// ── Customize Modal ───────────────────────────────────────────────────────────
function CustomizeModal({
  item,
  onClose,
  onConfirm,
}: {
  item: MenuItem;
  onClose: () => void;
  onConfirm: (milk: string, sweetness: string, extras: string[], extrasPrice: number) => void;
}) {
  const [milk, setMilk] = useState("Oat Milk");
  const [sweetness, setSweetness] = useState("Regular");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const toggleExtra = (name: string) =>
    setSelectedExtras((prev) =>
      prev.includes(name) ? prev.filter((e) => e !== name) : [...prev, name]
    );

  const extrasPrice = EXTRAS.filter((e) => selectedExtras.includes(e.name)).reduce(
    (sum, e) => sum + e.price,
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-xl">
              {item.name}
            </h3>
            <p className="text-sm text-[#7A6358] mt-0.5">
              {fmt(item.price + extrasPrice)} total
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#7A6358] hover:text-[#3B2A22] transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358] mb-1">
            Milk
          </p>
          <p className="text-[11px] text-[#7A6358]/70 mb-3">Choose oat milk for a dairy-free option</p>
          <div className="flex flex-wrap gap-2">
            {MILKS.map((m) => (
              <button
                key={m}
                onClick={() => setMilk(m)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  milk === m
                    ? "bg-[#3B2A22] text-[#F7F3ED]"
                    : "bg-[#F7F3ED] text-[#3B2A22] hover:bg-[#EDE8E1]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358] mb-3">
            Sweetness
          </p>
          <div className="flex flex-wrap gap-2">
            {SWEETNESS_OPTS.map((s) => (
              <button
                key={s}
                onClick={() => setSweetness(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  sweetness === s
                    ? "bg-[#3B2A22] text-[#F7F3ED]"
                    : "bg-[#F7F3ED] text-[#3B2A22] hover:bg-[#EDE8E1]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onConfirm(milk, sweetness, selectedExtras, extrasPrice)}
          className="w-full bg-[#3B2A22] text-[#F7F3ED] py-3.5 rounded-full font-semibold text-base hover:bg-[#4d382d] transition-colors"
        >
          Add to Cart — {fmt(item.price + extrasPrice)}
        </button>
      </motion.div>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav({
  page,
  setPage,
  cartCount,
}: {
  page: Page;
  setPage: (p: Page) => void;
  cartCount: number;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const go = (p: Page) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links: { label: string; page: Page }[] = [
    { label: "Order Ahead", page: "order" },
    { label: "Menu", page: "menu" },
    { label: "Find Us", page: "find-us" },
    { label: "About", page: "about" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F3ED]/92 backdrop-blur-md shadow-[0_1px_0_rgba(59,42,34,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-full bg-[#3B2A22] flex items-center justify-center shrink-0 group-hover:bg-[#4d382d] transition-colors">
            <Coffee size={14} className="text-[#F7F3ED]" />
          </span>
          <span className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-[17px] leading-none tracking-tight">
            The Cafénator
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className={`text-sm font-medium transition-colors ${
                page === l.page
                  ? "text-[#C68A4D]"
                  : "text-[#3B2A22]/65 hover:text-[#3B2A22]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go("cart")}
            className="relative p-2.5 text-[#3B2A22] hover:text-[#C68A4D] transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C68A4D] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => go("order")}
            className="hidden md:flex bg-[#3B2A22] text-[#F7F3ED] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#4d382d] transition-colors"
          >
            Order Now
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#3B2A22]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[#F7F3ED] border-t border-[#3B2A22]/10"
          >
            <div className="px-5 pt-4 pb-6 flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.page}
                  onClick={() => go(l.page)}
                  className={`text-left py-3 text-base font-medium border-b border-[#3B2A22]/08 last:border-0 ${
                    page === l.page ? "text-[#C68A4D]" : "text-[#3B2A22]"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => go("order")}
                className="mt-3 bg-[#3B2A22] text-[#F7F3ED] px-5 py-3.5 rounded-full text-sm font-semibold text-center"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Drink Card ────────────────────────────────────────────────────────────────
function DrinkCard({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem) => void }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 16px 48px rgba(59,42,34,0.13)" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer group"
      style={{ boxShadow: "0 2px 14px rgba(59,42,34,0.07)" }}
    >
      <div className="aspect-square overflow-hidden bg-[#EDE8E1] relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
        />
        {item.popular && (
          <span className="absolute top-3 left-3 text-[10px] font-bold bg-[#C68A4D] text-white px-2.5 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>
      <div className="p-4 pb-5">
        <h3 className="font-['Playfair_Display'] font-semibold text-[#3B2A22] text-[17px] leading-tight mb-1.5">
          {item.name}
        </h3>
        <p className="text-sm text-[#7A6358] leading-snug mb-4 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#3B2A22] text-base">{fmt(item.price)}</span>
          <button
            onClick={() => onAdd(item)}
            className="flex items-center gap-1.5 bg-[#3B2A22] text-[#F7F3ED] px-3.5 py-1.5 rounded-full text-sm font-medium hover:bg-[#4d382d] transition-colors"
          >
            <Plus size={13} /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────
function HomePage({
  setPage,
  onAdd,
}: {
  setPage: (p: Page) => void;
  onAdd: (item: MenuItem) => void;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const go = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const featured = MENU_ITEMS.filter((i) => i.popular).slice(0, 4);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=1400&h=900&fit=crop&auto=format"
            alt="Iced coffee in a beautiful glass"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F3ED] via-[#F7F3ED]/80 to-[#F7F3ED]/15 md:to-transparent" />
        </div>

        {/* Floating doodles */}
        <div className="absolute bottom-28 right-[14%] hidden md:block pointer-events-none select-none rotate-[-8deg]">
          <span className="font-['Caveat'] text-[#3B2A22]/18 text-5xl block">
            freshly crafted ☕
          </span>
        </div>
        <div className="absolute top-28 right-[8%] hidden md:block pointer-events-none opacity-10">
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            className="animate-spin"
            style={{ animationDuration: "28s" }}
          >
            <circle
              cx="36"
              cy="36"
              r="30"
              stroke="#3B2A22"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              fill="none"
            />
            <circle cx="36" cy="36" r="8" fill="#3B2A22" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-5 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="font-['Caveat'] text-[#C68A4D] text-2xl block mb-3"
            >
              pop-up coffee ✦ made to order
            </motion.span>
            <h1 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-[54px] md:text-[80px] leading-[0.93] mb-8">
              Coffee
              <br />
              Worth
              <br />
              Finding.
            </h1>
            <p className="text-[#7A6358] text-lg md:text-xl leading-relaxed mb-10 max-w-sm">
              Handcrafted iced lattes with homemade syrups. Every Friday after Jummah in Ottawa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => go("order")}
                className="bg-[#3B2A22] text-[#F7F3ED] px-7 py-4 rounded-full text-base font-semibold hover:bg-[#4d382d] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Order Ahead
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
              <button
                onClick={() => go("find-us")}
                className="bg-white/70 backdrop-blur-sm text-[#3B2A22] border border-[#3B2A22]/15 px-7 py-4 rounded-full text-base font-medium hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <MapPin size={15} /> Find Our Next Market
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Drinks ── */}
      <section className="py-20 bg-[#F7F3ED]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="font-['Caveat'] text-[#C68A4D] text-xl">fan favorites</span>
              <h2 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl md:text-4xl mt-1">
                Start Here.
              </h2>
            </div>
            <button
              onClick={() => go("menu")}
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#7A6358] hover:text-[#C68A4D] transition-colors"
            >
              Full menu <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <DrinkCard item={item} onAdd={onAdd} />
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <button
              onClick={() => go("menu")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C68A4D]"
            >
              View full menu <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Order Ahead explainer ── */}
      <section className="py-20 bg-[#3B2A22] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #C68A4D 0%, transparent 55%), radial-gradient(circle at 80% 20%, #A6B89B 0%, transparent 45%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="font-['Caveat'] text-[#C68A4D] text-2xl">no waiting around</span>
            <h2 className="font-['Playfair_Display'] font-bold text-[#F7F3ED] text-3xl md:text-5xl mt-2 leading-tight">
              Skip the Line.
            </h2>
            <p className="text-[#F7F3ED]/50 mt-4 max-w-sm mx-auto text-base leading-relaxed">
              Order before you arrive and your drink will be waiting. It really is that easy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-3xl mx-auto">
            {[
              {
                num: "01",
                Icon: Coffee,
                title: "Choose your drinks",
                desc: "Browse the full menu and customize every detail — milk, sweetness, extras.",
              },
              {
                num: "02",
                Icon: Clock,
                title: "Pick your pickup time",
                desc: "Select which market and a 30-minute window that works for your morning.",
              },
              {
                num: "03",
                Icon: Check,
                title: "Skip the line",
                desc: "Walk up to the counter, say your name, and your drink is ready to go.",
              },
            ].map(({ num, Icon, title, desc }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full border border-[#C68A4D]/35 flex items-center justify-center mx-auto mb-5">
                  <Icon size={22} className="text-[#C68A4D]" />
                </div>
                <span className="font-['Caveat'] text-[#C68A4D]/50 text-sm">{num}</span>
                <h3 className="font-['Playfair_Display'] font-semibold text-[#F7F3ED] text-lg mt-0.5 mb-2.5">
                  {title}
                </h3>
                <p className="text-[#F7F3ED]/45 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => go("order")}
              className="bg-[#C68A4D] text-white px-9 py-4 rounded-full text-base font-semibold hover:bg-[#b07840] transition-colors"
            >
              Start Your Order
            </button>
          </div>
        </div>
      </section>

      {/* ── Find Us preview ── */}
      <section className="py-20 bg-[#F7F3ED]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="font-['Caveat'] text-[#C68A4D] text-xl">every friday</span>
              <h2 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl md:text-4xl mt-1">
                Find Us Weekly.
              </h2>
            </div>
            <button
              onClick={() => go("find-us")}
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#7A6358] hover:text-[#C68A4D] transition-colors"
            >
              Full schedule <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EVENTS.slice(0, 2).map((evt, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-5 flex gap-4 items-start"
                style={{ boxShadow: "0 2px 14px rgba(59,42,34,0.06)" }}
              >
                <div className="text-center min-w-[56px] bg-[#F7F3ED] rounded-xl py-2.5 px-1">
                  <span className="font-['Playfair_Display'] font-bold text-[#C68A4D] text-2xl leading-none block">
                    {evt.date}
                  </span>
                  <span className="text-[10px] font-bold text-[#7A6358] uppercase tracking-wider block mt-0.5">
                    {evt.day} {evt.month}
                  </span>
                </div>
                <div>
                  <h3 className="font-['Playfair_Display'] font-semibold text-[#3B2A22] text-base mb-1.5">
                    {evt.market}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#7A6358] mb-1">
                    <Clock size={11} className="shrink-0" /> {evt.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#7A6358]">
                    <MapPin size={11} className="shrink-0" /> {evt.address}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => go("find-us")}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3B2A22] border border-[#3B2A22]/20 px-6 py-3 rounded-full hover:bg-[#3B2A22] hover:text-[#F7F3ED] transition-all duration-200"
            >
              See Full Schedule <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── About snippet ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="grid grid-cols-2 gap-3 max-w-[480px] mx-auto lg:mx-0">
              <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-[#EDE8E1]">
                <img
                  src="https://images.unsplash.com/photo-1769262122904-f1b353d330a0?w=400&h=600&fit=crop&auto=format"
                  alt="Barista preparing coffee"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-[#EDE8E1] mt-10">
                <img
                  src="https://images.unsplash.com/photo-1769262122923-f7796ba58638?w=400&h=600&fit=crop&auto=format"
                  alt="Barista tamping espresso"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <span className="font-['Caveat'] text-[#C68A4D] text-xl">our story</span>
              <h2 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl md:text-5xl mt-2 mb-7 leading-tight">
                More Than
                <br />
                Coffee.
              </h2>
              <p className="text-[#7A6358] text-base leading-relaxed mb-5">
                The Cafénator began with a dream that had been years in the making and an
                opportunity that finally turned it into reality. Starting with a small menu,
                homemade recipes, and a passion for great coffee — every drink made by hand.
              </p>
              <p className="text-[#7A6358] text-base leading-relaxed mb-9">
                Our focus stays the same: handcrafted coffee with homemade syrups, memorable
                experiences, and becoming a familiar face at community events across Ottawa.
              </p>
              <button
                onClick={() => go("about")}
                className="inline-flex items-center gap-2 font-semibold text-[#3B2A22] pb-1 border-b-2 border-[#C68A4D] hover:text-[#C68A4D] transition-colors"
              >
                Read our full story <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 bg-[#F7F3ED]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="font-['Caveat'] text-[#C68A4D] text-xl">what people say</span>
            <h2 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl md:text-4xl mt-1">
              Heard at the Market.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6"
                style={{ boxShadow: "0 2px 14px rgba(59,42,34,0.06)" }}
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} size={14} className="fill-[#C68A4D] text-[#C68A4D]" />
                  ))}
                </div>
                <p className="font-['Playfair_Display'] text-[#3B2A22] text-base leading-relaxed italic mb-5">
                  "{r.text}"
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358]">
                  {r.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="font-['Caveat'] text-[#C68A4D] text-xl">@thecafenator</span>
            <h2 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl md:text-4xl mt-1">
              Follow the Journey.
            </h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[
              "photo-1517701550927-30cf4ba1dba5",
              "photo-1769262122904-f1b353d330a0",
              "photo-1742549626436-bf3c11dab212",
              "photo-1559496417-e7f25cb247f3",
              "photo-1507133750040-4a8f57021571",
              "photo-1558122104-355edad709f6",
            ].map((id, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.18 }}
                className="aspect-square rounded-xl overflow-hidden bg-[#EDE8E1] cursor-pointer"
              >
                <img
                  src={`https://images.unsplash.com/${id}?w=300&h=300&fit=crop&auto=format`}
                  alt="Coffee at the market"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#3B2A22] text-[#F7F3ED] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#4d382d] transition-colors"
            >
              <Instagram size={15} /> Follow @thecafenator
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#F7F3ED]">
        <div className="max-w-2xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="font-['Caveat'] text-[#C68A4D] text-xl">got questions?</span>
            <h2 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl md:text-4xl mt-1">
              Quick Answers.
            </h2>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 1px 8px rgba(59,42,34,0.05)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="font-medium text-[#3B2A22] text-sm md:text-base">
                    {faq.q}
                  </span>
                  <span
                    className="text-[#C68A4D] shrink-0 transition-transform duration-200"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "none" }}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-[#7A6358] leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Order Page ────────────────────────────────────────────────────────────────
function OrderPage({ onAdd }: { onAdd: (item: MenuItem) => void }) {
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState(EVENTS[0].market);
  const [time, setTime] = useState(PICKUP_TIMES[2]);
  const filtered =
    category === "All" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === category);

  return (
    <div className="min-h-screen bg-[#F7F3ED] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="mb-10">
          <span className="font-['Caveat'] text-[#C68A4D] text-xl">customize & go</span>
          <h1 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl md:text-5xl mt-1 mb-2">
            Order Ahead.
          </h1>
          <p className="text-[#7A6358] text-base">
            Build your order below, then skip the line at the market.
          </p>
        </div>

        <div
          className="bg-white rounded-2xl p-5 mb-10 flex flex-col md:flex-row gap-5"
          style={{ boxShadow: "0 2px 14px rgba(59,42,34,0.07)" }}
        >
          <div className="flex-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358] block mb-2">
              Pickup Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#F7F3ED] text-[#3B2A22] rounded-xl px-4 py-2.5 text-sm font-medium outline-none border border-[#3B2A22]/10 focus:border-[#C68A4D] transition-colors"
            >
              {EVENTS.map((evt) => (
                <option key={evt.market} value={evt.market}>
                  {evt.day} {evt.date} {evt.month} — {evt.market}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358] block mb-2">
              Pickup Time
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-[#F7F3ED] text-[#3B2A22] rounded-xl px-4 py-2.5 text-sm font-medium outline-none border border-[#3B2A22]/10 focus:border-[#C68A4D] transition-colors"
            >
              {PICKUP_TIMES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-[#3B2A22] text-[#F7F3ED]"
                  : "bg-white text-[#3B2A22] hover:bg-[#EDE8E1]"
              }`}
              style={{ boxShadow: "0 1px 4px rgba(59,42,34,0.06)" }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
            >
              <DrinkCard item={item} onAdd={onAdd} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Menu Page ─────────────────────────────────────────────────────────────────
function MenuPage({
  onAdd,
  setPage,
}: {
  onAdd: (item: MenuItem) => void;
  setPage: (p: Page) => void;
}) {
  const categories = CATEGORIES.slice(1);

  return (
    <div className="min-h-screen bg-[#F7F3ED] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="mb-12">
          <span className="font-['Caveat'] text-[#C68A4D] text-xl">the full lineup</span>
          <h1 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl md:text-5xl mt-1 mb-2">
            Our Menu.
          </h1>
          <p className="text-[#7A6358] text-base max-w-md">
            Every drink made to order. Customize your milk, sweetness, and extras when you add to
            cart.
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-14">
            <div className="flex items-center gap-4 mb-7">
              <h2 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-2xl whitespace-nowrap">
                {cat}
              </h2>
              <div className="flex-1 h-px bg-[#3B2A22]/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {MENU_ITEMS.filter((i) => i.category === cat).map((item, j) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: j * 0.06 }}
                >
                  <DrinkCard item={item} onAdd={onAdd} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-4 pt-4">
          <button
            onClick={() => {
              setPage("order");
              window.scrollTo({ top: 0 });
            }}
            className="bg-[#3B2A22] text-[#F7F3ED] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#4d382d] transition-colors"
          >
            Order Ahead — Skip the Line
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Find Us Page ──────────────────────────────────────────────────────────────
function FindUsPage() {
  return (
    <div className="min-h-screen bg-[#F7F3ED] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="mb-10">
          <span className="font-['Caveat'] text-[#C68A4D] text-xl">every friday after jummah</span>
          <h1 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl md:text-5xl mt-1 mb-2">
            Find Us.
          </h1>
          <p className="text-[#7A6358] text-base max-w-md">
            We're at the Ottawa Uyghur Centre every Friday from 2:00–3:00 PM. Come grab a drink
            after Jummah — we'd love to see you.
          </p>
        </div>

        {/* Map placeholder */}
        <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden mb-10 relative bg-[#A6B89B]/15 border border-[#A6B89B]/25">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(166,184,155,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(166,184,155,0.15) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#C68A4D] flex items-center justify-center shadow-lg">
              <MapPin size={24} className="text-white" />
            </div>
            <p className="font-['Playfair_Display'] font-semibold text-[#3B2A22] text-lg">
              Interactive map coming soon
            </p>
            <p className="text-sm text-[#7A6358]">Follow @thecafenator for real-time location drops</p>
          </div>
          {[
            { x: "22%", y: "38%" },
            { x: "60%", y: "55%" },
            { x: "76%", y: "26%" },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-5 h-5 bg-[#3B2A22]/25 rounded-full flex items-center justify-center"
              style={{ left: pos.x, top: pos.y, transform: "translate(-50%,-50%)" }}
            >
              <div className="w-2 h-2 rounded-full bg-[#C68A4D]/60" />
            </div>
          ))}
        </div>

        <h2 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-2xl mb-6">
          Upcoming Fridays
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {EVENTS.map((evt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl p-5 flex gap-5 items-start relative"
              style={{ boxShadow: "0 2px 14px rgba(59,42,34,0.06)" }}
            >
              {i === 0 && (
                <span className="absolute top-4 right-4 text-[10px] font-bold bg-[#264332] text-white px-2.5 py-1 rounded-full">
                  This Friday
                </span>
              )}
              <div className="text-center min-w-[62px] bg-[#F7F3ED] rounded-xl py-3 px-2">
                <span className="font-['Playfair_Display'] font-bold text-[#C68A4D] text-2xl leading-none block">
                  {evt.date}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6358] block mt-0.5">
                  {evt.day}
                </span>
                <span className="text-[10px] font-medium text-[#7A6358]">{evt.month}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-['Playfair_Display'] font-semibold text-[#3B2A22] text-base mb-2">
                  {evt.market}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#7A6358] mb-1">
                  <Clock size={11} className="shrink-0" /> {evt.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#7A6358]">
                  <MapPin size={11} className="shrink-0" /> {evt.address}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#3B2A22] rounded-3xl p-8 md:p-12 text-center">
          <span className="font-['Caveat'] text-[#C68A4D] text-xl">want us at your event?</span>
          <h2 className="font-['Playfair_Display'] font-bold text-[#F7F3ED] text-2xl md:text-3xl mt-2 mb-4">
            Book The Cafénator
          </h2>
          <p className="text-[#F7F3ED]/50 text-sm mb-7 max-w-md mx-auto leading-relaxed">
            We do weddings, corporate events, pop-ups, and private markets. Let's talk coffee.
          </p>
          <a
            href="#"
            className="inline-block bg-[#C68A4D] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#b07840] transition-colors"
          >
            thecafenatorstar@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

// ── About Page ────────────────────────────────────────────────────────────────
function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          <div>
            <span className="font-['Caveat'] text-[#C68A4D] text-2xl">the cafénator story</span>
            <h1 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-4xl md:text-6xl mt-2 leading-[1.05] mb-7">
              More Than
              <br />
              Coffee.
            </h1>
            <p className="text-[#7A6358] text-base leading-relaxed mb-5">
              The Cafénator began with a dream that had been years in the making and an opportunity
              that finally turned it into reality.
            </p>
            <p className="text-[#7A6358] text-base leading-relaxed mb-5">
              Starting with a small menu, homemade recipes, and a passion for great coffee, we
              served our very first community event. Every drink was made by hand, every interaction
              became a learning experience, and every event helped shape what The Cafénator is today.
            </p>
            <p className="text-[#7A6358] text-base leading-relaxed">
              As we continue to grow, our focus stays the same: serving handcrafted coffee with
              homemade syrups, creating memorable experiences, and becoming a familiar face at
              community events across Ottawa.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#EDE8E1]">
              <img
                src="https://images.unsplash.com/photo-1769262122904-f1b353d330a0?w=400&h=600&fit=crop&auto=format"
                alt="Barista at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#EDE8E1] mt-12">
              <img
                src="https://images.unsplash.com/photo-1777464026512-3d50455d11fd?w=400&h=600&fit=crop&auto=format"
                alt="Cold brew on display"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#F7F3ED] rounded-3xl p-8 md:p-12 mb-20">
          <h2 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-2xl md:text-3xl mb-10 text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Leaf,
                title: "Homemade Always",
                desc: "Every syrup is made in-house — vanilla, caramel, chocolate. Natural ingredients, real flavour, no shortcuts.",
              },
              {
                Icon: Heart,
                title: "Community First",
                desc: "We show up at community events because we genuinely love being part of them. The coffee is just how we say hello.",
              },
              {
                Icon: Zap,
                title: "Always Improving",
                desc: "We're students. We watch, we learn, we adjust. Every event makes us better at what we do.",
              },
            ].map(({ Icon, title, desc }, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#C68A4D]/15 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-[#C68A4D]" />
                </div>
                <h3 className="font-['Playfair_Display'] font-semibold text-[#3B2A22] text-lg mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[#7A6358] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-2xl md:text-3xl mb-7">
            Behind the Counter
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: "photo-1769262122923-f7796ba58638", alt: "Tamping espresso" },
              { id: "photo-1742549626436-bf3c11dab212", alt: "Latte art detail" },
              { id: "photo-1550731358-491ded4af838", alt: "Holding a cappuccino" },
              { id: "photo-1559001724-fbad036dbc9e", alt: "Cafe latte" },
            ].map(({ id, alt }, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-[#EDE8E1]">
                <img
                  src={`https://images.unsplash.com/${id}?w=400&h=400&fit=crop&auto=format`}
                  alt={alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-2xl md:text-3xl mb-4">
            Come Say Hello.
          </h2>
          <p className="text-[#7A6358] mb-8">
            Find us at a market this weekend. We'll have your drink ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setPage("order");
                window.scrollTo({ top: 0 });
              }}
              className="bg-[#3B2A22] text-[#F7F3ED] px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#4d382d] transition-colors"
            >
              Order Ahead
            </button>
            <button
              onClick={() => {
                setPage("find-us");
                window.scrollTo({ top: 0 });
              }}
              className="bg-[#F7F3ED] text-[#3B2A22] border border-[#3B2A22]/20 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#EDE8E1] transition-colors"
            >
              Find Our Next Market
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Cart Page ─────────────────────────────────────────────────────────────────
function CartPage({
  cart,
  setCart,
  setPage,
}: {
  cart: CartItem[];
  setCart: (c: CartItem[]) => void;
  setPage: (p: Page) => void;
}) {
  const total = cart.reduce((sum, i) => sum + (i.basePrice + i.extrasPrice) * i.qty, 0);

  const updateQty = (cartId: string, delta: number) => {
    setCart(
      cart
        .map((i) => (i.cartId === cartId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED] pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-5">
        <div className="mb-8">
          <h1 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl md:text-4xl">
            Your Order.
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-[#EDE8E1] flex items-center justify-center mx-auto mb-5">
              <ShoppingCart size={24} className="text-[#7A6358]" />
            </div>
            <p className="font-['Playfair_Display'] text-[#3B2A22] text-xl mb-2">
              Your cart is empty.
            </p>
            <p className="text-sm text-[#7A6358] mb-7">Ready to build something delicious?</p>
            <button
              onClick={() => {
                setPage("order");
                window.scrollTo({ top: 0 });
              }}
              className="bg-[#3B2A22] text-[#F7F3ED] px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#4d382d] transition-colors"
            >
              Browse the Menu
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {cart.map((item) => (
                <motion.div
                  key={item.cartId}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4"
                  style={{ boxShadow: "0 2px 10px rgba(59,42,34,0.06)" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-['Playfair_Display'] font-semibold text-[#3B2A22] text-base truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#7A6358] mt-0.5">
                      {item.milk} · {item.sweetness}
                      {item.extras.length > 0 && ` · ${item.extras.join(", ")}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2 bg-[#F7F3ED] rounded-full px-2 py-1.5">
                      <button
                        onClick={() => updateQty(item.cartId, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#EDE8E1] transition-colors"
                      >
                        <Minus size={12} className="text-[#3B2A22]" />
                      </button>
                      <span className="text-sm font-semibold text-[#3B2A22] w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.cartId, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#EDE8E1] transition-colors"
                      >
                        <Plus size={12} className="text-[#3B2A22]" />
                      </button>
                    </div>
                    <span className="font-semibold text-[#3B2A22] text-sm w-14 text-right">
                      {fmt((item.basePrice + item.extrasPrice) * item.qty)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div
              className="bg-white rounded-2xl p-5 mb-6"
              style={{ boxShadow: "0 2px 10px rgba(59,42,34,0.06)" }}
            >
              <div className="flex justify-between text-sm text-[#7A6358] mb-2">
                <span>Subtotal</span>
                <span>{fmt(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#7A6358] mb-3">
                <span>Pickup fee</span>
                <span className="text-[#A6B89B] font-semibold">Free</span>
              </div>
              <div className="border-t border-[#3B2A22]/08 pt-3 flex justify-between font-semibold text-[#3B2A22] text-base">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setPage("checkout");
                window.scrollTo({ top: 0 });
              }}
              className="w-full bg-[#3B2A22] text-[#F7F3ED] py-4 rounded-full font-semibold text-base hover:bg-[#4d382d] transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>
            <button
              onClick={() => {
                setPage("order");
                window.scrollTo({ top: 0 });
              }}
              className="w-full mt-3 text-sm text-[#7A6358] hover:text-[#3B2A22] transition-colors py-2"
            >
              + Add more drinks
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Checkout Page ─────────────────────────────────────────────────────────────
function CheckoutPage({
  cart,
  setPage,
  onConfirm,
}: {
  cart: CartItem[];
  setPage: (p: Page) => void;
  onConfirm: (data: OrderData) => void;
}) {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState(EVENTS[0].market);
  const [time, setTime] = useState(PICKUP_TIMES[2]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const total = cart.reduce((sum, i) => sum + (i.basePrice + i.extrasPrice) * i.qty, 0);

  const handlePayment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm({ location, time, name });
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED] pt-24 pb-20">
      <div className="max-w-lg mx-auto px-5">
        <h1 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl mb-8">
          Checkout.
        </h1>

        <div className="flex items-center gap-3 mb-8">
          {["Pickup", "Payment"].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i + 1 <= step
                    ? "bg-[#3B2A22] text-[#F7F3ED]"
                    : "bg-[#EDE8E1] text-[#7A6358]"
                }`}
              >
                {i + 1 < step ? <Check size={13} /> : i + 1}
              </div>
              <span
                className={`text-xs font-medium ${
                  i + 1 === step ? "text-[#3B2A22]" : "text-[#7A6358]"
                }`}
              >
                {label}
              </span>
              {i < 1 && <div className="w-8 h-px bg-[#3B2A22]/15 mx-1" />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}>
            <div
              className="bg-white rounded-2xl p-6 mb-5"
              style={{ boxShadow: "0 2px 14px rgba(59,42,34,0.07)" }}
            >
              <h2 className="font-['Playfair_Display'] font-semibold text-[#3B2A22] text-xl mb-5">
                Pickup Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358] block mb-2">
                    Your Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First name for pickup"
                    className="w-full bg-[#F7F3ED] text-[#3B2A22] rounded-xl px-4 py-3 text-sm outline-none border border-[#3B2A22]/10 focus:border-[#C68A4D] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358] block mb-2">
                    Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#F7F3ED] text-[#3B2A22] rounded-xl px-4 py-3 text-sm outline-none border border-[#3B2A22]/10 focus:border-[#C68A4D] transition-colors"
                  >
                    {EVENTS.map((evt) => (
                      <option key={evt.market} value={evt.market}>
                        {evt.day} {evt.date} {evt.month} — {evt.market}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358] block mb-2">
                    Pickup Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PICKUP_TIMES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`py-2.5 rounded-xl text-xs font-medium transition-colors ${
                          time === t
                            ? "bg-[#3B2A22] text-[#F7F3ED]"
                            : "bg-[#F7F3ED] text-[#3B2A22] hover:bg-[#EDE8E1] border border-[#3B2A22]/10"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-5 mb-5"
              style={{ boxShadow: "0 2px 10px rgba(59,42,34,0.06)" }}
            >
              <h3 className="font-medium text-[#3B2A22] text-sm mb-3">Order Summary</h3>
              {cart.map((item) => (
                <div
                  key={item.cartId}
                  className="flex justify-between text-xs text-[#7A6358] mb-1.5"
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>{fmt((item.basePrice + item.extrasPrice) * item.qty)}</span>
                </div>
              ))}
              <div className="border-t border-[#3B2A22]/08 pt-3 mt-2 flex justify-between font-semibold text-[#3B2A22] text-sm">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>

            <button
              onClick={() => (name.trim() ? setStep(2) : undefined)}
              disabled={!name.trim()}
              className="w-full bg-[#3B2A22] text-[#F7F3ED] py-4 rounded-full font-semibold text-base disabled:opacity-40 hover:bg-[#4d382d] transition-colors"
            >
              Continue to Payment
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.form
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handlePayment}
          >
            <div
              className="bg-white rounded-2xl p-6 mb-5"
              style={{ boxShadow: "0 2px 14px rgba(59,42,34,0.07)" }}
            >
              <h2 className="font-['Playfair_Display'] font-semibold text-[#3B2A22] text-xl mb-5">
                Payment
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358] block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-[#F7F3ED] text-[#3B2A22] rounded-xl px-4 py-3 text-sm outline-none border border-[#3B2A22]/10 focus:border-[#C68A4D] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358] block mb-2">
                    Card Number
                  </label>
                  <input
                    value={card}
                    onChange={(e) => setCard(e.target.value.replace(/\D/g, "").slice(0, 16))}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full bg-[#F7F3ED] text-[#3B2A22] rounded-xl px-4 py-3 text-sm outline-none border border-[#3B2A22]/10 focus:border-[#C68A4D] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358] block mb-2">
                      Expiry
                    </label>
                    <input
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      required
                      className="w-full bg-[#F7F3ED] text-[#3B2A22] rounded-xl px-4 py-3 text-sm outline-none border border-[#3B2A22]/10 focus:border-[#C68A4D] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A6358] block mb-2">
                      CVV
                    </label>
                    <input
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.slice(0, 4))}
                      placeholder="123"
                      required
                      className="w-full bg-[#F7F3ED] text-[#3B2A22] rounded-xl px-4 py-3 text-sm outline-none border border-[#3B2A22]/10 focus:border-[#C68A4D] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#264332]/8 rounded-2xl p-4 mb-5 flex items-start gap-3">
              <div className="w-4 h-4 rounded-full bg-[#264332] flex items-center justify-center mt-0.5 shrink-0">
                <Check size={9} className="text-white" />
              </div>
              <p className="text-xs text-[#264332] leading-relaxed">
                Pickup at <strong>{location}</strong> · {time} · Under the name{" "}
                <strong>{name || "your name"}</strong>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-[#EDE8E1] text-[#3B2A22] py-4 rounded-full font-medium text-sm hover:bg-[#E0D9D0] transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-[2] bg-[#3B2A22] text-[#F7F3ED] py-4 rounded-full font-semibold text-base hover:bg-[#4d382d] transition-colors"
              >
                Pay {fmt(total)}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}

// ── Confirmation Page ─────────────────────────────────────────────────────────
function ConfirmationPage({
  orderData,
  setPage,
  setCart,
}: {
  orderData: OrderData | null;
  setPage: (p: Page) => void;
  setCart: (c: CartItem[]) => void;
}) {
  return (
    <div className="min-h-screen bg-[#F7F3ED] pt-24 pb-20 flex items-center justify-center">
      <div className="max-w-md mx-auto px-5 text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="w-20 h-20 rounded-full bg-[#264332] flex items-center justify-center mx-auto mb-8"
        >
          <Check size={32} className="text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <span className="font-['Caveat'] text-[#C68A4D] text-2xl">order confirmed ✦</span>
          <h1 className="font-['Playfair_Display'] font-bold text-[#3B2A22] text-3xl md:text-4xl mt-2 mb-4">
            See You There.
          </h1>
          <p className="text-[#7A6358] text-base leading-relaxed mb-8">
            Your order is locked in.{" "}
            {orderData && (
              <>
                Pick up at{" "}
                <strong className="text-[#3B2A22]">{orderData.location}</strong> at{" "}
                <strong className="text-[#3B2A22]">{orderData.time}</strong>. Just say your name
                and your drink will be waiting.
              </>
            )}
          </p>

          <div
            className="bg-white rounded-2xl p-5 mb-8 text-left"
            style={{ boxShadow: "0 2px 14px rgba(59,42,34,0.07)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Coffee size={16} className="text-[#C68A4D]" />
              <span className="font-medium text-[#3B2A22] text-sm">What to do next</span>
            </div>
            <ul className="space-y-2 text-sm text-[#7A6358]">
              <li className="flex items-start gap-2">
                <span className="text-[#C68A4D] font-bold mt-0.5">1.</span>{" "}
                {"You'll get a confirmation email shortly."}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C68A4D] font-bold mt-0.5">2.</span> Head to the market and
                look for our banner.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C68A4D] font-bold mt-0.5">3.</span>{" "}
                {"Say your name at the counter — that's it."}
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              setCart([]);
              setPage("home");
              window.scrollTo({ top: 0 });
            }}
            className="bg-[#3B2A22] text-[#F7F3ED] px-8 py-4 rounded-full font-semibold text-base hover:bg-[#4d382d] transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="bg-[#3B2A22] text-[#F7F3ED] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#F7F3ED] flex items-center justify-center">
                <Coffee size={14} className="text-[#3B2A22]" />
              </span>
              <span className="font-['Playfair_Display'] font-bold text-[#F7F3ED] text-lg">
                The Cafénator
              </span>
            </div>
            <p className="text-[#F7F3ED]/50 text-sm leading-relaxed max-w-xs mb-6">
              Handcrafted iced lattes and refreshers at community events across Ottawa. Every Friday
              after Jummah.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-[#F7F3ED]/50 hover:text-[#F7F3ED] transition-colors">
                <Instagram size={17} />
              </a>
              <a
                href="#"
                className="text-[#F7F3ED]/50 hover:text-[#F7F3ED] transition-colors text-sm"
              >
                TikTok
              </a>
              <a
                href="#"
                className="text-[#F7F3ED]/50 hover:text-[#F7F3ED] transition-colors text-sm"
              >
                thecafenatorstar@gmail.com
              </a>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#F7F3ED]/30 mb-5">
              Quick Links
            </p>
            <div className="flex flex-col gap-3">
              {(["order", "menu", "find-us", "about"] as Page[]).map((p) => (
                <button
                  key={p}
                  onClick={() => go(p)}
                  className="text-sm text-[#F7F3ED]/60 hover:text-[#F7F3ED] transition-colors text-left"
                >
                  {p === "find-us"
                    ? "Find Us"
                    : p === "order"
                    ? "Order Ahead"
                    : p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#F7F3ED]/30 mb-5">
              Stay Updated
            </p>
            <p className="text-sm text-[#F7F3ED]/50 mb-4 leading-relaxed">
              New markets, seasonal drinks, and behind-the-scenes.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-white/10 text-[#F7F3ED] placeholder-[#F7F3ED]/25 rounded-full px-4 py-2.5 text-sm outline-none focus:bg-white/15 transition-colors"
              />
              <button className="bg-[#C68A4D] text-white rounded-full px-4 py-2.5 text-sm font-medium hover:bg-[#b07840] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#F7F3ED]/25 text-xs">© 2025 The Cafénator. All rights reserved.</p>
          <p className="font-['Caveat'] text-[#C68A4D] text-xl">
            Made with lots of coffee and a little obsession.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customizing, setCustomizing] = useState<MenuItem | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const handleAdd = (item: MenuItem) => setCustomizing(item);

  const handleCustomizeConfirm = (
    milk: string,
    sweetness: string,
    extras: string[],
    extrasPrice: number
  ) => {
    if (!customizing) return;
    const existing = cart.find(
      (c) =>
        c.menuItemId === customizing.id &&
        c.milk === milk &&
        c.sweetness === sweetness &&
        JSON.stringify(c.extras) === JSON.stringify(extras)
    );
    if (existing) {
      setCart(cart.map((c) => (c.cartId === existing.cartId ? { ...c, qty: c.qty + 1 } : c)));
    } else {
      setCart([
        ...cart,
        {
          cartId: `${customizing.id}-${Date.now()}`,
          menuItemId: customizing.id,
          name: customizing.name,
          basePrice: customizing.price,
          extrasPrice,
          qty: 1,
          milk,
          sweetness,
          extras,
        },
      ]);
    }
    setCustomizing(null);
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const showFooter = !["cart", "checkout", "confirmation"].includes(page);

  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      <Nav page={page} setPage={setPage} cartCount={cartCount} />

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {page === "home" && <HomePage setPage={setPage} onAdd={handleAdd} />}
          {page === "order" && <OrderPage onAdd={handleAdd} />}
          {page === "menu" && <MenuPage onAdd={handleAdd} setPage={setPage} />}
          {page === "find-us" && <FindUsPage />}
          {page === "about" && <AboutPage setPage={setPage} />}
          {page === "cart" && <CartPage cart={cart} setCart={setCart} setPage={setPage} />}
          {page === "checkout" && (
            <CheckoutPage
              cart={cart}
              setPage={setPage}
              onConfirm={(data) => {
                setOrderData(data);
                setPage("confirmation");
                window.scrollTo({ top: 0 });
              }}
            />
          )}
          {page === "confirmation" && (
            <ConfirmationPage orderData={orderData} setPage={setPage} setCart={setCart} />
          )}
        </motion.div>
      </AnimatePresence>

      {showFooter && <Footer setPage={setPage} />}

      <AnimatePresence>
        {customizing && (
          <CustomizeModal
            item={customizing}
            onClose={() => setCustomizing(null)}
            onConfirm={handleCustomizeConfirm}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

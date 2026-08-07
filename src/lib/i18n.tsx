import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const LANGS = ["UZ", "EN", "RU"] as const;
export type Lang = (typeof LANGS)[number];

type Dict = {
  nav: { architecture: string; ai: string; how: string; about: string; cta: string };
  hero: {
    eyebrow: string;
    headline: string;
    support: string;
    primary: string;
    secondary: string;
    scroll: string;
  };
  scenes: { exterior: string; facade: string; pool: string; interior: string; night: string };
  idea: { label: string; headline: string; text: string; caption: string };
  how: {
    label: string;
    steps: { n: string; title: string; text: string }[];
  };
  transform: {
    label: string;
    headline: string;
    stages: [string, string, string, string, string, string];
  };
  showcase: {
    label: string;
    headline: string;
    projects: { title: string; meta: string }[];
  };
  daynight: { label: string; headline: string; phases: [string, string, string, string] };
  ai: { headline: string; text: string };
  final: { headline: string; cta: string; note: string };
  footer: { links: string[]; rights: string };
  toast: { start: string; explore: string; lang: string };
};

const en: Dict = {
  nav: { architecture: "Architecture", ai: "AI", how: "How it Works", about: "About", cta: "Start Designing" },
  hero: {
    eyebrow: "AI Architecture Platform",
    headline: "Design your future home.",
    support:
      "Turn your ideas into intelligent architectural concepts and explore your future home in 3D.",
    primary: "Start Designing",
    secondary: "Explore PlanX",
    scroll: "Scroll",
  },
  scenes: {
    exterior: "Exterior",
    facade: "Facade",
    pool: "Pool & Garden",
    interior: "Interior",
    night: "Night",
  },
  idea: {
    label: "From idea to home",
    headline: "Your idea. Our intelligence.",
    text: "PlanX helps transform a simple description into a visual architectural concept that you can explore and refine.",
    caption: "Concept study — generated volume and site",
  },
  how: {
    label: "How PlanX works",
    steps: [
      { n: "01", title: "Describe", text: "Tell PlanX what you imagine." },
      { n: "02", title: "Generate", text: "AI creates your architectural concept." },
      { n: "03", title: "Explore", text: "Walk through your future home in 3D." },
    ],
  },
  transform: {
    label: "Wireframe to reality",
    headline: "From line to light.",
    stages: ["Wireframe", "Blueprint", "Structure", "Glass", "Landscape", "Complete home"],
  },
  showcase: {
    label: "Architectural showcase",
    headline: "Concepts explored with PlanX.",
    projects: [
      { title: "Modern Villa", meta: "Concrete · Glass · Pool" },
      { title: "Minimal Residence", meta: "Single storey · Courtyard" },
      { title: "Luxury Home", meta: "Hillside · Cantilever" },
      { title: "Smart Compact House", meta: "Timber · Solar · Compact" },
    ],
  },
  daynight: {
    label: "Day to night",
    headline: "One home, every light.",
    phases: ["Day", "Sunset", "Blue hour", "Night"],
  },
  ai: {
    headline: "Architecture, intelligently designed.",
    text: "PlanX combines AI with architectural visualization to help you explore possibilities before construction begins.",
  },
  final: {
    headline: "Your future starts with an idea.",
    cta: "Start Designing",
    note: "Turn your vision into architecture.",
  },
  footer: {
    links: ["Architecture", "AI", "How it Works", "About", "Contact"],
    rights: "All rights reserved.",
  },
  toast: {
    start: "PlanX design studio is coming soon.",
    explore: "Take the scroll tour — the house evolves as you go.",
    lang: "Language set to",
  },
};

const ru: Dict = {
  nav: { architecture: "Архитектура", ai: "ИИ", how: "Как это работает", about: "О нас", cta: "Начать проект" },
  hero: {
    eyebrow: "ИИ-платформа архитектуры",
    headline: "Спроектируйте дом будущего.",
    support:
      "Превратите свои идеи в продуманные архитектурные концепции и исследуйте будущий дом в 3D.",
    primary: "Начать проект",
    secondary: "Узнать о PlanX",
    scroll: "Прокрутите",
  },
  scenes: {
    exterior: "Экстерьер",
    facade: "Фасад",
    pool: "Бассейн и сад",
    interior: "Интерьер",
    night: "Ночь",
  },
  idea: {
    label: "От идеи к дому",
    headline: "Ваша идея. Наш интеллект.",
    text: "PlanX превращает простое описание в визуальную архитектурную концепцию, которую можно изучать и уточнять.",
    caption: "Концепт — объём и участок",
  },
  how: {
    label: "Как работает PlanX",
    steps: [
      { n: "01", title: "Опишите", text: "Расскажите PlanX, что вы представляете." },
      { n: "02", title: "Генерация", text: "ИИ создаёт архитектурную концепцию." },
      { n: "03", title: "Исследуйте", text: "Пройдитесь по будущему дому в 3D." },
    ],
  },
  transform: {
    label: "От каркаса к реальности",
    headline: "От линии к свету.",
    stages: ["Каркас", "Чертёж", "Структура", "Стекло", "Ландшафт", "Готовый дом"],
  },
  showcase: {
    label: "Архитектурная витрина",
    headline: "Концепции, созданные в PlanX.",
    projects: [
      { title: "Современная вилла", meta: "Бетон · Стекло · Бассейн" },
      { title: "Минимальная резиденция", meta: "Один этаж · Двор" },
      { title: "Люксовый дом", meta: "Склон · Консоль" },
      { title: "Умный компактный дом", meta: "Дерево · Солнце · Компакт" },
    ],
  },
  daynight: {
    label: "День и ночь",
    headline: "Один дом, разный свет.",
    phases: ["День", "Закат", "Синий час", "Ночь"],
  },
  ai: {
    headline: "Архитектура, спроектированная разумно.",
    text: "PlanX объединяет ИИ и архитектурную визуализацию, чтобы вы изучили возможности до начала строительства.",
  },
  final: {
    headline: "Ваше будущее начинается с идеи.",
    cta: "Начать проект",
    note: "Превратите видение в архитектуру.",
  },
  footer: {
    links: ["Архитектура", "ИИ", "Как это работает", "О нас", "Контакты"],
    rights: "Все права защищены.",
  },
  toast: {
    start: "Студия PlanX скоро откроется.",
    explore: "Прокрутите страницу — дом меняется по мере движения.",
    lang: "Выбран язык:",
  },
};

const uz: Dict = {
  nav: { architecture: "Arxitektura", ai: "AI", how: "Qanday ishlaydi", about: "Biz haqimizda", cta: "Loyihani boshlash" },
  hero: {
    eyebrow: "AI arxitektura platformasi",
    headline: "Kelajak uyingizni loyihalang.",
    support:
      "G'oyalaringizni aqlli arxitektura konsepsiyalariga aylantiring va kelajak uyingizni 3D da ko'ring.",
    primary: "Loyihani boshlash",
    secondary: "PlanX bilan tanishish",
    scroll: "Aylantiring",
  },
  scenes: {
    exterior: "Tashqi ko'rinish",
    facade: "Fasad",
    pool: "Basseyn va bog'",
    interior: "Interyer",
    night: "Tun",
  },
  idea: {
    label: "G'oyadan uyga",
    headline: "Sizning g'oyangiz. Bizning aqlimiz.",
    text: "PlanX oddiy tavsifni siz o'rganib, takomillashtira oladigan vizual arxitektura konsepsiyasiga aylantiradi.",
    caption: "Konsepsiya — hajm va uchastka",
  },
  how: {
    label: "PlanX qanday ishlaydi",
    steps: [
      { n: "01", title: "Tasvirlang", text: "PlanX ga nimani tasavvur qilganingizni aytib bering." },
      { n: "02", title: "Yaratish", text: "AI arxitektura konsepsiyangizni yaratadi." },
      { n: "03", title: "Kuzatish", text: "Kelajak uyingiz bo'ylab 3D da yuring." },
    ],
  },
  transform: {
    label: "Karkasdan haqiqatga",
    headline: "Chizmadan nurga.",
    stages: ["Karkas", "Chizma", "Struktura", "Shisha", "Landshaft", "Tayyor uy"],
  },
  showcase: {
    label: "Arxitektura namunalari",
    headline: "PlanX bilan yaratilgan konsepsiyalar.",
    projects: [
      { title: "Zamonaviy villa", meta: "Beton · Shisha · Basseyn" },
      { title: "Minimal rezidensiya", meta: "Bir qavat · Hovli" },
      { title: "Hashamatli uy", meta: "Yonbag'ir · Konsol" },
      { title: "Aqlli ixcham uy", meta: "Yog'och · Quyosh · Ixcham" },
    ],
  },
  daynight: {
    label: "Kunduzdan tunga",
    headline: "Bir uy, turli yorug'lik.",
    phases: ["Kunduz", "Quyosh botishi", "Ko'k soat", "Tun"],
  },
  ai: {
    headline: "Arxitektura, aql bilan loyihalangan.",
    text: "PlanX AI va arxitektura vizualizatsiyasini birlashtirib, qurilish boshlanishidan avval imkoniyatlarni ko'rishga yordam beradi.",
  },
  final: {
    headline: "Kelajagingiz g'oyadan boshlanadi.",
    cta: "Loyihani boshlash",
    note: "Tasavvuringizni arxitekturaga aylantiring.",
  },
  footer: {
    links: ["Arxitektura", "AI", "Qanday ishlaydi", "Biz haqimizda", "Aloqa"],
    rights: "Barcha huquqlar himoyalangan.",
  },
  toast: {
    start: "PlanX studiyasi tez orada ishga tushadi.",
    explore: "Sahifani aylantiring — uy siz bilan birga o'zgaradi.",
    lang: "Til tanlandi:",
  },
};

const DICTS: Record<Lang, Dict> = { EN: en, RU: ru, UZ: uz };

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "EN",
  setLang: () => {},
  t: en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("EN");

  useEffect(() => {
    const stored = window.localStorage.getItem("planx-lang");
    if (stored && (LANGS as readonly string[]).includes(stored)) setLangState(stored as Lang);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("planx-lang", l);
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: DICTS[lang] }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

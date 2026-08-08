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
  nav: {
    architecture: string;
    ai: string;
    how: string;
    about: string;
    features: string;
    calculator: string;
    gallery: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    support: string;
    primary: string;
    secondary: string;
    scroll: string;
  };
  trusted: { label: string; logos: string[] };
  features: {
    label: string;
    headline: string;
    items: { title: string; text: string }[];
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
  calc: {
    label: string;
    headline: string;
    text: string;
    area: string;
    floors: string;
    quality: string;
    tiers: [string, string, string];
    estimate: string;
    perSqm: string;
    note: string;
    cta: string;
  };
  why: {
    label: string;
    headline: string;
    stats: { value: string; label: string }[];
    points: string[];
  };
  testimonials: {
    label: string;
    headline: string;
    items: { quote: string; name: string; role: string }[];
  };
  faq: { label: string; headline: string; items: { q: string; a: string }[] };
  final: { headline: string; cta: string; note: string };
  footer: { links: string[]; rights: string };
  toast: { start: string; explore: string; lang: string };
};

const en: Dict = {
  nav: {
    architecture: "3D Showcase",
    ai: "AI",
    how: "How it Works",
    about: "Gallery",
    features: "Features",
    calculator: "Calculator",
    gallery: "Gallery",
    cta: "Start Designing",
  },
  hero: {
    eyebrow: "AI Architecture Platform",
    headline: "Design your future home.",
    support:
      "Turn your ideas into intelligent architectural concepts and explore your future home in 3D.",
    primary: "Start Designing",
    secondary: "Explore PlanX",
    scroll: "Scroll",
  },
  trusted: {
    label: "Trusted by architects, studios and developers",
    logos: ["ATELIER NORD", "STUDIO KAVA", "MERIDIAN HOMES", "FORMA LAB", "TASHKENT DEVCO"],
  },
  features: {
    label: "Features",
    headline: "Everything you need to shape a home.",
    items: [
      { title: "Text to architecture", text: "Describe a home in a sentence and receive a coherent architectural concept." },
      { title: "Real-time 3D", text: "Orbit, walk and study every volume in an interactive 3D scene." },
      { title: "Material studies", text: "Swap concrete, timber, stone and glass and see the facade respond." },
      { title: "Daylight simulation", text: "Read your home from sunrise to blue hour before it is built." },
      { title: "Plan generation", text: "Automatic floor plans with circulation, zoning and usable areas." },
      { title: "Cost intelligence", text: "Live construction estimates that follow every design decision." },
    ],
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
    label: "Project gallery",
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
  calc: {
    label: "Construction calculator",
    headline: "Know the cost before the first drawing.",
    text: "Move the sliders to see how area, height and finish quality shape your build budget.",
    area: "Total area",
    floors: "Floors",
    quality: "Finish quality",
    tiers: ["Standard", "Premium", "Signature"],
    estimate: "Estimated build cost",
    perSqm: "per m²",
    note: "Indicative estimate for planning purposes only.",
    cta: "Design at this budget",
  },
  why: {
    label: "Why PlanX",
    headline: "Studio-grade architecture, without the wait.",
    stats: [
      { value: "48h", label: "From brief to concept" },
      { value: "120+", label: "Concepts generated weekly" },
      { value: "3D", label: "Every project explorable" },
      { value: "12", label: "Material systems" },
    ],
    points: [
      "No CAD skills required — describe, refine, explore.",
      "Architectural logic, not decorative renders.",
      "Every concept exportable for your architect or builder.",
    ],
  },
  testimonials: {
    label: "Testimonials",
    headline: "What clients and architects say.",
    items: [
      {
        quote: "We presented three concepts to a client in a single afternoon. That used to take three weeks.",
        name: "Sabina Yusupova",
        role: "Principal, Atelier Nord",
      },
      {
        quote: "I finally understood my own house before we poured a single foundation.",
        name: "Timur Ahmedov",
        role: "Private client, Tashkent",
      },
      {
        quote: "The cost intelligence alone changed how we scope projects with developers.",
        name: "Elena Fischer",
        role: "Director, Meridian Homes",
      },
    ],
  },
  faq: {
    label: "FAQ",
    headline: "Questions, answered.",
    items: [
      { q: "Do I need architectural experience?", a: "No. You describe the home you want in plain language and PlanX handles the architectural reasoning." },
      { q: "Are the concepts buildable?", a: "PlanX produces architecturally coherent concepts intended as a starting point for a licensed architect or engineer." },
      { q: "Can I explore the design in 3D?", a: "Yes. Every generated concept becomes an interactive 3D scene you can orbit, walk and light." },
      { q: "How accurate is the cost calculator?", a: "It uses regional construction rates by area, height and finish tier, and is intended for early planning." },
      { q: "Can I export my project?", a: "Concepts, plans and imagery can be exported and shared with your architect or contractor." },
      { q: "Which languages are supported?", a: "PlanX is available in Uzbek, English and Russian." },
    ],
  },
  final: {
    headline: "Your future starts with an idea.",
    cta: "Start Designing",
    note: "Turn your vision into architecture.",
  },
  footer: {
    links: ["Features", "3D Showcase", "How it Works", "Calculator", "Gallery"],
    rights: "All rights reserved.",
  },
  toast: {
    start: "PlanX design studio is coming soon.",
    explore: "Take the scroll tour — the house evolves as you go.",
    lang: "Language set to",
  },
};

const ru: Dict = {
  nav: {
    architecture: "3D-показ",
    ai: "ИИ",
    how: "Как это работает",
    about: "Галерея",
    features: "Возможности",
    calculator: "Калькулятор",
    gallery: "Галерея",
    cta: "Начать проект",
  },
  hero: {
    eyebrow: "ИИ-платформа архитектуры",
    headline: "Спроектируйте дом будущего.",
    support:
      "Превратите свои идеи в продуманные архитектурные концепции и исследуйте будущий дом в 3D.",
    primary: "Начать проект",
    secondary: "Узнать о PlanX",
    scroll: "Прокрутите",
  },
  trusted: {
    label: "Нам доверяют архитекторы, студии и застройщики",
    logos: ["ATELIER NORD", "STUDIO KAVA", "MERIDIAN HOMES", "FORMA LAB", "TASHKENT DEVCO"],
  },
  features: {
    label: "Возможности",
    headline: "Всё, чтобы создать дом.",
    items: [
      { title: "Текст в архитектуру", text: "Опишите дом одним предложением и получите цельную архитектурную концепцию." },
      { title: "3D в реальном времени", text: "Вращайте, проходите и изучайте каждый объём в интерактивной сцене." },
      { title: "Материалы", text: "Меняйте бетон, дерево, камень и стекло — фасад реагирует мгновенно." },
      { title: "Симуляция света", text: "Смотрите на дом от рассвета до синего часа ещё до стройки." },
      { title: "Генерация планов", text: "Автоматические планы с зонированием и полезными площадями." },
      { title: "Расчёт стоимости", text: "Смета обновляется вместе с каждым решением проекта." },
    ],
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
    label: "Галерея проектов",
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
  calc: {
    label: "Калькулятор строительства",
    headline: "Стоимость — до первого чертежа.",
    text: "Двигайте ползунки, чтобы увидеть, как площадь, этажность и отделка влияют на бюджет.",
    area: "Общая площадь",
    floors: "Этажей",
    quality: "Уровень отделки",
    tiers: ["Стандарт", "Премиум", "Сигнатюр"],
    estimate: "Ориентировочная стоимость",
    perSqm: "за м²",
    note: "Оценка носит ознакомительный характер.",
    cta: "Проект под этот бюджет",
  },
  why: {
    label: "Почему PlanX",
    headline: "Студийная архитектура без ожидания.",
    stats: [
      { value: "48ч", label: "От брифа до концепции" },
      { value: "120+", label: "Концепций в неделю" },
      { value: "3D", label: "Каждый проект в 3D" },
      { value: "12", label: "Систем материалов" },
    ],
    points: [
      "Навыки CAD не нужны — опишите, уточните, исследуйте.",
      "Архитектурная логика, а не декоративные рендеры.",
      "Любую концепцию можно передать архитектору или строителю.",
    ],
  },
  testimonials: {
    label: "Отзывы",
    headline: "Что говорят клиенты и архитекторы.",
    items: [
      {
        quote: "Мы показали клиенту три концепции за один день. Раньше на это уходили недели.",
        name: "Сабина Юсупова",
        role: "Партнёр, Atelier Nord",
      },
      {
        quote: "Я наконец понял свой дом ещё до того, как залили фундамент.",
        name: "Тимур Ахмедов",
        role: "Частный клиент, Ташкент",
      },
      {
        quote: "Один расчёт стоимости изменил то, как мы обсуждаем проекты с застройщиками.",
        name: "Елена Фишер",
        role: "Директор, Meridian Homes",
      },
    ],
  },
  faq: {
    label: "Вопросы",
    headline: "Отвечаем на главное.",
    items: [
      { q: "Нужен ли архитектурный опыт?", a: "Нет. Вы описываете дом обычными словами, архитектурную логику берёт на себя PlanX." },
      { q: "Можно ли по этому строить?", a: "PlanX создаёт цельные концепции — основу для работы лицензированного архитектора или инженера." },
      { q: "Можно ли посмотреть в 3D?", a: "Да. Каждая концепция становится интерактивной 3D-сценой." },
      { q: "Насколько точен калькулятор?", a: "Он учитывает региональные ставки по площади, этажности и отделке и подходит для раннего планирования." },
      { q: "Можно ли экспортировать проект?", a: "Концепции, планы и изображения можно экспортировать и передать подрядчику." },
      { q: "Какие языки поддерживаются?", a: "PlanX доступен на узбекском, английском и русском." },
    ],
  },
  final: {
    headline: "Ваше будущее начинается с идеи.",
    cta: "Начать проект",
    note: "Превратите видение в архитектуру.",
  },
  footer: {
    links: ["Возможности", "3D-показ", "Как это работает", "Калькулятор", "Галерея"],
    rights: "Все права защищены.",
  },
  toast: {
    start: "Студия PlanX скоро откроется.",
    explore: "Прокрутите страницу — дом меняется по мере движения.",
    lang: "Выбран язык:",
  },
};

const uz: Dict = {
  nav: {
    architecture: "3D namoyish",
    ai: "AI",
    how: "Qanday ishlaydi",
    about: "Galereya",
    features: "Imkoniyatlar",
    calculator: "Kalkulyator",
    gallery: "Galereya",
    cta: "Loyihani boshlash",
  },
  hero: {
    eyebrow: "AI arxitektura platformasi",
    headline: "Kelajak uyingizni loyihalang.",
    support:
      "G'oyalaringizni aqlli arxitektura konsepsiyalariga aylantiring va kelajak uyingizni 3D da ko'ring.",
    primary: "Loyihani boshlash",
    secondary: "PlanX bilan tanishish",
    scroll: "Aylantiring",
  },
  trusted: {
    label: "Arxitektorlar, studiyalar va quruvchilar ishonadi",
    logos: ["ATELIER NORD", "STUDIO KAVA", "MERIDIAN HOMES", "FORMA LAB", "TASHKENT DEVCO"],
  },
  features: {
    label: "Imkoniyatlar",
    headline: "Uy yaratish uchun hamma narsa.",
    items: [
      { title: "Matndan arxitektura", text: "Uyni bir gapda tasvirlang va yaxlit arxitektura konsepsiyasini oling." },
      { title: "Real vaqtli 3D", text: "Har bir hajmni interaktiv 3D sahnada aylantirib o'rganing." },
      { title: "Materiallar", text: "Beton, yog'och, tosh va shishani almashtiring — fasad darhol o'zgaradi." },
      { title: "Yorug'lik simulyatsiyasi", text: "Uyni tongdan ko'k soatgacha qurilishdan avval ko'ring." },
      { title: "Reja yaratish", text: "Zonalash va foydali maydonlar bilan avtomatik qavat rejalari." },
      { title: "Xarajat hisobi", text: "Har bir qarorga mos keladigan qurilish smetasi." },
    ],
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
    label: "Loyihalar galereyasi",
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
  calc: {
    label: "Qurilish kalkulyatori",
    headline: "Xarajat — birinchi chizmadan avval.",
    text: "Maydon, qavat va pardoz sifati budjetga qanday ta'sir qilishini ko'rish uchun slayderni suring.",
    area: "Umumiy maydon",
    floors: "Qavatlar",
    quality: "Pardoz darajasi",
    tiers: ["Standart", "Premium", "Signature"],
    estimate: "Taxminiy qurilish narxi",
    perSqm: "m² uchun",
    note: "Hisob faqat rejalashtirish uchun taxminiy.",
    cta: "Shu budjetda loyihalash",
  },
  why: {
    label: "Nega PlanX",
    headline: "Studiya darajasidagi arxitektura — kutishsiz.",
    stats: [
      { value: "48s", label: "Brifdan konsepsiyagacha" },
      { value: "120+", label: "Haftada yaratilgan konsepsiya" },
      { value: "3D", label: "Har bir loyiha 3D da" },
      { value: "12", label: "Material tizimi" },
    ],
    points: [
      "CAD ko'nikmasi shart emas — tasvirlang, aniqlang, ko'ring.",
      "Dekorativ render emas, arxitektura mantiqi.",
      "Har bir konsepsiyani arxitektor yoki quruvchiga uzatish mumkin.",
    ],
  },
  testimonials: {
    label: "Fikrlar",
    headline: "Mijozlar va arxitektorlar nima deydi.",
    items: [
      {
        quote: "Mijozga bir kunda uchta konsepsiya ko'rsatdik. Avval bu uch hafta olardi.",
        name: "Sabina Yusupova",
        role: "Rahbar, Atelier Nord",
      },
      {
        quote: "Poydevor quyilmasidan avval o'z uyimni tushundim.",
        name: "Temur Ahmedov",
        role: "Xususiy mijoz, Toshkent",
      },
      {
        quote: "Faqat xarajat hisobi ham quruvchilar bilan ishlash uslubimizni o'zgartirdi.",
        name: "Elena Fisher",
        role: "Direktor, Meridian Homes",
      },
    ],
  },
  faq: {
    label: "Savollar",
    headline: "Asosiy savollarga javob.",
    items: [
      { q: "Arxitektura tajribasi kerakmi?", a: "Yo'q. Uyni oddiy so'zlar bilan tasvirlaysiz, arxitektura mantiqini PlanX bajaradi." },
      { q: "Konsepsiyalar qurish uchun yaroqlimi?", a: "PlanX litsenziyali arxitektor yoki muhandis uchun boshlang'ich bo'ladigan yaxlit konsepsiya beradi." },
      { q: "3D da ko'rish mumkinmi?", a: "Ha. Har bir konsepsiya interaktiv 3D sahnaga aylanadi." },
      { q: "Kalkulyator qanchalik aniq?", a: "U maydon, qavat va pardoz bo'yicha mintaqaviy narxlarga tayanadi va dastlabki reja uchun mos." },
      { q: "Loyihani eksport qilsam bo'ladimi?", a: "Konsepsiya, rejalar va tasvirlarni eksport qilib, pudratchiga berish mumkin." },
      { q: "Qaysi tillar qo'llanadi?", a: "PlanX o'zbek, ingliz va rus tillarida ishlaydi." },
    ],
  },
  final: {
    headline: "Kelajagingiz g'oyadan boshlanadi.",
    cta: "Loyihani boshlash",
    note: "Tasavvuringizni arxitekturaga aylantiring.",
  },
  footer: {
    links: ["Imkoniyatlar", "3D namoyish", "Qanday ishlaydi", "Kalkulyator", "Galereya"],
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

import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { LangProvider, useLang } from "@/lib/i18n";
import { Nav } from "@/components/planx/Nav";
import { Hero } from "@/components/planx/Hero";
import { TrustedBy } from "@/components/planx/TrustedBy";
import { Benefits } from "@/components/planx/Benefits";
import { Features } from "@/components/planx/Features";
import { MaterialPreview } from "@/components/planx/MaterialPreview";
import { Audience } from "@/components/planx/Audience";
import { AiDemo } from "@/components/planx/AiDemo";
import { ScrollSequence } from "@/components/planx/ScrollSequence";
import { IdeaSection } from "@/components/planx/IdeaSection";
import { HowItWorks } from "@/components/planx/HowItWorks";
import { Showcase } from "@/components/planx/Showcase";
import { AiSection } from "@/components/planx/AiSection";
import { Calculator } from "@/components/planx/Calculator";
import { WhyPlanX } from "@/components/planx/WhyPlanX";
import { Testimonials } from "@/components/planx/Testimonials";
import { Faq } from "@/components/planx/Faq";
import { FinalCta } from "@/components/planx/FinalCta";
import { Footer } from "@/components/planx/Footer";

import heroVilla from "@/assets/hero-villa.jpg";
import facade from "@/assets/facade.jpg";
import pool from "@/assets/pool.jpg";
import interior from "@/assets/interior.jpg";
import night from "@/assets/night.jpg";
import bluehour from "@/assets/bluehour.jpg";
import wireframe from "@/assets/wireframe.jpg";
import blueprint from "@/assets/blueprint.jpg";
import concrete from "@/assets/concrete.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlanX — Design Your Future Home with AI Architecture" },
      {
        name: "description",
        content:
          "PlanX turns your idea into an intelligent architectural concept. Describe your future home, generate it with AI and explore it in 3D.",
      },
      { property: "og:title", content: "PlanX — Design Your Future Home" },
      {
        property: "og:description",
        content:
          "An AI architecture platform for exploring modern homes in 3D — from wireframe to complete residence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LangProvider>
      <Landing />
    </LangProvider>
  );
}

function Landing() {
  const { t } = useLang();

  const start = () => toast(t.toast.start);
  const explore = () => {
    document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" });
    toast(t.toast.explore);
  };

  return (
    <main>
      <Nav onStart={start} />
      <Hero onStart={start} onExplore={explore} />
      <TrustedBy />
      <Benefits />
      <Features />


      <ScrollSequence
        id="showcase-3d"
        frames={[
          { src: heroVilla, label: t.scenes.exterior, alt: "Villa exterior at golden hour" },
          { src: facade, label: t.scenes.facade, alt: "Concrete facade close-up" },
          { src: pool, label: t.scenes.pool, alt: "Pool and landscaped garden" },
          { src: interior, label: t.scenes.interior, alt: "Warm minimal interior" },
          { src: night, label: t.scenes.night, alt: "Villa at night" },
        ]}
      />

      <IdeaSection />
      <HowItWorks />

      <ScrollSequence
        label={t.transform.label}
        headline={t.transform.headline}
        frames={[
          { src: wireframe, label: t.transform.stages[0], alt: "Architectural wireframe" },
          { src: blueprint, label: t.transform.stages[1], alt: "Architectural blueprint" },
          { src: concrete, label: t.transform.stages[2], alt: "Concrete structure massing" },
          { src: facade, label: t.transform.stages[3], alt: "Glass and concrete facade" },
          { src: pool, label: t.transform.stages[4], alt: "Landscaped garden and pool" },
          { src: heroVilla, label: t.transform.stages[5], alt: "Completed modern home" },
        ]}
      />

      <AiSection />
      <AiDemo />
      <Calculator onStart={start} />
      <MaterialPreview />
      <Showcase />


      <ScrollSequence
        label={t.daynight.label}
        headline={t.daynight.headline}
        frames={[
          { src: pool, label: t.daynight.phases[0], alt: "Villa in daylight" },
          { src: heroVilla, label: t.daynight.phases[1], alt: "Villa at sunset" },
          { src: bluehour, label: t.daynight.phases[2], alt: "Villa at blue hour" },
          { src: night, label: t.daynight.phases[3], alt: "Villa at night" },
        ]}
      />

      <WhyPlanX />
      <Testimonials />
      <Faq />
      <FinalCta onStart={start} />
      <Footer />
    </main>
  );
}

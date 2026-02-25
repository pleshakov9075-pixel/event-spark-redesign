import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Manifest from "@/components/Manifest";
import Reels from "@/components/Reels";
import MasonryGallery from "@/components/MasonryGallery";
import Editorial from "@/components/Editorial";
import Formats from "@/components/Formats";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { editorialMedia, galleryMedia, heroMedia, reelsMedia } from "@/content/media";

const Index = () => {
  const [openReelSignal, setOpenReelSignal] = useState(0);

  const heroBackground = heroMedia[0]?.src ?? editorialMedia[0]?.src ?? "/assets/photo/vk/vk-004.jpg";

  const selectedReels = useMemo(() => reelsMedia.slice(0, 8), []);

  const galleryPhotos = useMemo(() => {
    const combined = [...galleryMedia, ...heroMedia.slice(0, 8)];
    return combined.slice(0, 30);
  }, []);

  const handleWatchReel = () => {
    document.getElementById("reels")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => setOpenReelSignal((prev) => prev + 1), 320);
  };

  return (
    <main className="brand-page relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />
      <SiteHeader />

      <div className="relative z-[2]">
        <Hero backgroundSrc={heroBackground} onWatchReel={handleWatchReel} />
        <Manifest />
        <Reels videos={selectedReels} openSignal={openReelSignal} />
        <MasonryGallery photos={galleryPhotos} />
        <Editorial portraits={editorialMedia} />
        <Formats />
        <Testimonials />
        <CTA />
      </div>
    </main>
  );
};

export default Index;

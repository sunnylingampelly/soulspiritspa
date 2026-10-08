import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import { siteImages } from "@/lib/images";

// All eight source photos are portrait (3:4) phone shots of the real
// rooms — unlike the landscape treatment shots the /about page's Gallery
// uses, so this grid is built around that shape instead of reusing a
// landscape bento layout (which was center-cropping the actual subject
// out of several tiles, e.g. leaving just a blank wall).
const images = [
  { label: "The lounge, set for guests to unwind before a session", tone: "charcoal" as const, src: siteImages.spaceLoungeWide },
  { label: "A treatment suite, warm and unhurried in daylight", tone: "cream" as const, src: siteImages.spaceTreatmentDaylight },
  { label: "The hallway leading to each private suite", tone: "stone" as const, src: siteImages.spaceHallway },
  { label: "Low, ambient light sets the mood for a session", tone: "charcoal" as const, src: siteImages.spaceTreatmentMoodWide },
  { label: "A quiet corner, ready for a treatment", tone: "charcoal" as const, src: siteImages.spaceTreatmentCorner },
  { label: "Plush seating in the waiting lounge", tone: "charcoal" as const, src: siteImages.spaceLoungeCouch },
  { label: "Comfortable lounge seating near reception", tone: "charcoal" as const, src: siteImages.spaceLoungeSeating },
  { label: "A treatment table, set and waiting", tone: "charcoal" as const, src: siteImages.spaceTreatmentMood },
];

// Swipeable row on mobile (eight tall photos stacked would be a very long
// scroll); a plain grid from tablet up.
export default function SpaceGallery() {
  return (
    <section className="section-pad bg-ivory">
      <div className="container-luxe">
        {/* Short heading on mobile; the original eyebrow + heading on desktop. */}
        <Reveal>
          <h2 className="text-display-md font-serif sm:hidden">Inside the Spa</h2>
          <p className="eyebrow hidden sm:block">Take a Look Inside</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 hidden max-w-xl text-display-md font-serif text-balance sm:block">
            The space you&rsquo;ll actually walk into.
          </h2>
        </Reveal>

        <div className="-mx-gutter mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-gutter pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <ImagePlaceholder
              key={i}
              label={img.label}
              tone={img.tone}
              src={img.src}
              className="aspect-[3/4] w-[70vw] shrink-0 snap-start overflow-hidden sm:w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

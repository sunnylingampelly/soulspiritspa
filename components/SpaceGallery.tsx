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

export default function SpaceGallery() {
  return (
    <section className="section-pad bg-ivory">
      <div className="container-luxe">
        <Reveal>
          <p className="eyebrow">Take a Look Inside</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-xl text-display-md font-serif text-balance">
            The space you&rsquo;ll actually walk into.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((img, i) => (
            <Reveal key={i} delay={i * 0.05} direction={i % 2 === 0 ? "left" : "right"}>
              <ImagePlaceholder
                label={img.label}
                tone={img.tone}
                src={img.src}
                className="group aspect-[3/4] w-full overflow-hidden"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

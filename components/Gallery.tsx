import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import { siteImages } from "@/lib/images";

const images = [
  { label: "A guest's ritual moment, flowers and candlelight", tone: "sand" as const, span: "sm:col-span-3 sm:row-span-2", src: siteImages.backMassageFlower },
  { label: "Foot reflexology by candlelight", tone: "charcoal" as const, span: "sm:col-span-2", src: siteImages.footReflexology },
  { label: "Rolled towels, amber oils and plumeria, styled on marble", tone: "cream" as const, span: "sm:col-span-2", src: siteImages.toweledSetup },
  { label: "Herbal compress balls and oils, styled for a ritual", tone: "cream" as const, span: "sm:col-span-2", src: siteImages.ritualFlatlay },
  { label: "A herbal compress massage in progress", tone: "sand" as const, span: "sm:col-span-2", src: siteImages.compressBackMassage },
  { label: "A considered touch on the shoulder", tone: "stone" as const, span: "sm:col-span-1", src: siteImages.shoulderHandsCloseup },
];

export default function Gallery() {
  return (
    <section className="section-pad bg-ivory">
      <div className="container-luxe">
        <Reveal>
          <p className="eyebrow">Inside SoulSpirit</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-xl text-display-md font-serif text-balance">
            A space designed for stillness.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-5 sm:auto-rows-[220px]">
          {images.map((img, i) => (
            <Reveal
              key={i}
              delay={i * 0.05}
              direction={i % 2 === 0 ? "left" : "right"}
              className={`${img.span}`}
            >
              <ImagePlaceholder
                label={img.label}
                tone={img.tone}
                src={img.src}
                className="group aspect-[4/3] w-full overflow-hidden sm:aspect-auto sm:h-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

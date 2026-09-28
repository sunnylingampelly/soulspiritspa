import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-charcoal pb-28 pt-20 text-ivory sm:pb-16 sm:pt-28">
      <div className="container-luxe">
        <div className="grid grid-cols-1 gap-14 border-b border-ivory/10 pb-16 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Image
              src="/soul-logo.png"
              alt="SoulSpirit Spa"
              width={2009}
              height={783}
              className="h-20 w-auto sm:h-28"
            />
            <p className="mt-5 max-w-[26ch] font-serif text-lg italic text-ivory/70">
              &ldquo;Return to yourself.&rdquo;
            </p>
          </div>

          <div>
            <p className="eyebrow text-champagne/80">Navigation</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/70">
              {siteConfig.nav
                .filter((n) => n.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-underline hover:text-ivory">
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-champagne/80">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/70">
              <li>
                <a href={siteConfig.contact.phoneHref} className="link-underline hover:text-ivory">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                {siteConfig.contact.email.startsWith("[") ? (
                  siteConfig.contact.email
                ) : (
                  <a href={`mailto:${siteConfig.contact.email}`} className="link-underline hover:text-ivory">
                    {siteConfig.contact.email}
                  </a>
                )}
              </li>
              <li className="max-w-[38ch]">
                {siteConfig.location.addressLine}, {siteConfig.location.city},{" "}
                {siteConfig.location.region} {siteConfig.location.postalCode}
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-champagne/80">Hours</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/70">
              {siteConfig.hours.map((h) => (
                <li key={h.day}>
                  {h.day}: {h.time}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-champagne/80">Follow</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/70">
              <li>
                <a
                  href={siteConfig.social.instagram || "#"}
                  className="link-underline hover:text-ivory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.facebook || "#"}
                  className="link-underline hover:text-ivory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 pt-8 text-xs text-ivory/40 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p>© 2026 SoulSpirit Spa. All Rights Reserved.</p>
            <p>
              Website and Ads by{" "}
              <a
                href="https://vashynova.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory/70 underline underline-offset-2"
              >
                Sunny
              </a>
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-ivory/70">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ivory/70">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

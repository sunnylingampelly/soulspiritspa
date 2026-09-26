/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    // AVIF dropped: on-demand AVIF re-encoding is CPU-heavy, and under a
    // few concurrent cold requests the dev image optimizer would hang
    // indefinitely on some images rather than ever responding (reproduced
    // directly — identical concurrent requests without AVIF in the accept
    // set complete instantly). Our source photos are already WebP, so this
    // is a near-lossless passthrough instead, and it's reliable.
    formats: ['image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
};

export default nextConfig;

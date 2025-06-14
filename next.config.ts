import type { NextConfig } from "next";

const domains = [
  "m.media-amazon.com",
  "pics.filmaffinity.com",
  "lumiere-a.akamaihd.net",
  "s3.amazonaws.com",
  "cloudfront-us-east-1.images.arcpublishing.com",
  "media.revistagq.com",
  "fotografias.antena3.com",
  "images-na.ssl-images-amazon.com",
  "static.wikia.nocookie.net",
  "thecinemaholic.com",
  "movierob.files.wordpress.com",
  "www.magazinema.es",
  "i0.wp.com",
  "hips.hearstapps.com",
  "static3.srcdn.com",
  "img2.rtve.es",
  "img.aullidos.com",
  "terrigen-cdn-dev.marvel.com",
  "phantom-marca.unidadeditorial.es",
  "img.culturebase.org",
  "imgtoolkit.culturebase.org",
  "static.filmin.es",
  "occ-0-1555-3212.1.nflxso.net",
  "occ-0-1555-116.1.nflxso.net",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: domains.map((domain) => ({
      protocol: "https",
      hostname: domain,
    })),
  },
};

module.exports = nextConfig;

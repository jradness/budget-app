/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    //TODO: fix type errors
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

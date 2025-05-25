// next.config.js
const nextConfig = {
  output: "export",
  // dynamic: 'error', // (Varsa bunu kaldır veya 'auto' yap!)
};
module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Eğer hala statik export istiyorsan bu kalmalı
  async rewrites() {
    return [
      {
        source: '/api/rss', // React tarafında bu adresi kullanacaksın
        destination: 'https://europa.tips/rss.php', // Gerçek API adresi
      },
    ];
  },
};
export default nextConfig;
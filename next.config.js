/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,  // Enable Gzip compression
    swcMinify: true, // Faster builds with SWC
    images: {
        domains: ["www.backmarket.co.uk", "www.ebay.co.uk/", "www.argos.co.uk/", "www.currys.co.uk/", "www.johnlewis.com/", "i.ebayimg.com", "johnlewis.scene7.com", "media.currys.biz", "media.4rgos.it"]
    }
}

module.exports = nextConfig
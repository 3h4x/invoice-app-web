/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'src'],
  },
  compiler: {
    reactRemoveProperties: {
      properties: ['^data-test'],
    }
  }

}

module.exports = nextConfig

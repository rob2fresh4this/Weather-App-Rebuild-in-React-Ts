Desktop @ 1440px

mobile @ 375px

# 🚀 Next.js Setup Guide for SVG Imports

## 1️⃣ Install Required Packages
To import and use SVGs as React components, install `@svgr/webpack`:

```sh
npm install --save-dev @svgr/webpack
```

## 2️⃣ Update `next.config.js`
Modify your **Next.js configuration** to support SVG imports:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
```

## 3️⃣ Restart the Development Server
After making changes, restart your Next.js server:

```sh
npm run dev
```

✅ Now, you can import SVGs as React components:

```tsx
import StarIcon from "../assets/star-regular.svg";

export default function Example() {
  return <StarIcon className="w-8 h-8 text-white" />;
}
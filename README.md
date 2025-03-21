# Weather App Rebuild

### Description:
Rebuild your weather app.

### Requirements:
- Use your original Figma design.
- Built in **Next.js** / **TypeScript**.
- Must have a **component folder** (App cannot be built in `app.js` or `index.js`).
- **Tailwind** or **Bootstrap** for styling.
- Mobile version built for **375px** width.
- Desktop version built for **1440px** width.

### Things to Turn In:
- Must have a **Peer Review**.
- Links in a text field:
  - **Azure** or **Vercel** deployment link.
  - **GitHub** repository link.
  - **Original Figma** design link.


#### Your Names:  Robert G.

#### Date Revised  
- [3/21/25]  

#### Exercise or Lab Name  
[Weather-App-Rebuild-in-React-Ts]

## Peer Review:

# DONT FORGET INSTALL FOR SVG

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

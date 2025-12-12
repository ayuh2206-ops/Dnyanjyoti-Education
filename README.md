# Dnyanjyoti Landing Page - Next.js

A modern, fully-functional Next.js landing page with admin dashboard for customization.

## Features

- ✨ Beautiful, responsive landing page design
- 🎥 Custom video player with fullscreen support
- 📝 Registration form with lead capture
- 🎨 Admin dashboard for theme customization
- 🔗 Social media integration (WhatsApp & Telegram)
- 📱 Mobile-first responsive design
- ⚡ Built with Next.js 14 & Tailwind CSS
- 🎭 Smooth animations with Framer Motion
- 🔒 Admin security with login mechanism

## Installation

1. Navigate to the project directory:
```bash
cd landing-page-nextjs
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Admin Dashboard

Click the lock icon in the bottom right corner to access the admin dashboard.

### Features:
- **Theme Tab**: Customize primary color, accent color, and background color
- **Content & Links Tab**:
  - Configure video URL or upload video file
  - Add WhatsApp group link
  - Add Telegram channel link

## Project Structure

```
landing-page-nextjs/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with all components
│   ├── globals.css         # Global styles
├── components/             # Reusable components (optional)
├── public/                 # Static files
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
├── tailwind.config.js      # Tailwind CSS config
└── postcss.config.js       # PostCSS config
```

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **TypeScript** - Type safety

## Customization

### Colors
Use the admin dashboard to change:
- Primary Color (navy blue)
- Accent Color (burnt orange)
- Background Color

### Content
- Video: Upload a file or paste a URL
- Social Links: Add WhatsApp and Telegram links
- Text content can be edited directly in the code

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## Performance

- Optimized for Core Web Vitals
- Lazy-loaded components
- Responsive images
- CSS-in-JS for dynamic styling

## License

Private - All rights reserved

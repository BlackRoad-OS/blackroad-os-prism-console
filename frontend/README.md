# Prism Console Frontend

This is the frontend application for Prism Console, built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com).

## Features

- 📊 **Environments**: Manage deployment environments
- 🚀 **Deployments**: Track and control application deployments
- 📝 **Logs**: Monitor and analyze system logs
- 🌙 **Dark Mode**: Built-in dark mode support
- 📱 **Responsive**: Mobile-friendly sidebar navigation

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
frontend/
├── app/              # Next.js App Router pages
│   ├── environments/ # Environments page
│   ├── deployments/  # Deployments page
│   ├── logs/         # Logs page
│   ├── layout.tsx    # Root layout with sidebar
│   └── page.tsx      # Home page
├── components/       # Reusable React components
│   └── Sidebar.tsx   # Navigation sidebar
└── public/           # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Deploy on Railway or Cloudflare

This application is ready to be deployed on:
- **Railway**: Deploy directly from GitHub
- **Cloudflare Pages**: Build command: `npm run build`, Output directory: `.next`

See the [deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **React 19** - UI library

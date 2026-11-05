# XC Global Limited

> **Institutional Growth Engine & Elite Talent Infrastructure**

XC Global Limited empowers ambitious enterprises, high-growth startups, and scale-ups with institutional marketing execution and dedicated talent deployment. Powered by proprietary software ecosystems (**GrowthOS** and **TalentOS**), XC Global unifies full-funnel marketing execution with embedded fractional leaders and specialist talent.

---

## Key Features & Platform Architecture

### 1. Dual Portal Infrastructure
- **GrowthOS Client Portal (`/growth-os`)**: A private console for partner brands to monitor active growth sprints, live KPI dashboards, deliverables, direct communications with assigned squad leads, and service management.
- **TalentOS Specialist Bench (`/talent-os`)**: A dedicated platform for pre-vetted marketing specialists, growth engineers, and creative strategists to access client briefs, track contract engagements, and manage verification milestones.
- **Administrative Suite (`/admin`)**: Internal operations control center to review onboarding submissions, manage partner applications, and publish editorial content.

### 2. Marketing & Growth Systems
- **Go-to-Market (GTM) Strategy**: Structured market-entry frameworks and positioning.
- **Paid Media Operations**: High-performance acquisition campaigns across Meta, Google Search/Shopping, and TikTok.
- **Conversion Rate Optimization (CRO) & Technical SEO**: Data-backed user journey optimization and organic visibility.
- **E-Commerce & Shopify Engineering**: Custom headless and Shopify Plus development for transactional velocity.

### 3. Integrated Global Currency Console
- Instant currency translation across major operational currencies (**USD, GBP, EUR, CAD, AUD, NGN, KES, ZAR, GHS, AED, SGD**).
- Context-aware rates and persistent user preference state across all service packages and client dashboards.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), Radix UI primitives, Lucide React
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Auth SSR)
- **Transactional Email**: [Resend API](https://resend.com/)
- **Hosting & Deployment**: [Vercel](https://vercel.com/)

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm 9+ or pnpm / yarn

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lahchie1/xc-global-platform.git
   cd xc-global-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file by copying the example template:
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your configuration keys:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Resend
   RESEND_API_KEY=re_your_api_key
   NOTIFICATION_EMAIL_TO=admin@xcglobalhq.com
   NOTIFICATION_EMAIL_FROM=notifications@xcglobalhq.com

   # App Settings
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command | Action |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Compiles an optimized production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs Next.js ESLint checks |

---

## Deployment to Vercel

1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and select `xc-global-platform`.
3. Add the environment variables listed in `.env.local.example`.
4. Click **Deploy**.

---

## License

Private & Proprietary © XC Global Limited. All rights reserved.


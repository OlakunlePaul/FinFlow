# FinFlow - Modern Fintech Demo Platform

A complete, production-ready fintech demo application built with Next.js 14, featuring multi-step onboarding, wallet management, transaction handling, and error monitoring.

## 🚀 Features

### Core Functionality
- **Multi-step Onboarding Flow**: 4-step registration process with progress persistence
- **Wallet Dashboard**: Real-time balance tracking and transaction management
- **Money Operations**: Add funds and send money with validation
- **Virtual Card**: Interactive card component with flip animation
- **Transaction History**: Real-time transaction list with auto-refresh
- **Error Logs**: Mock Sentry integration for error monitoring

### Technical Highlights
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** with custom design system
- **React Query** for server state management
- **Zustand** for client state management
- **Next Auth** with Credentials Provider
- **Zod** for form validation
- **Shadcn UI** components
- **Fully Responsive** design
- **Accessible** components with ARIA labels
- **CSRF-safe** API routes
- **Input Sanitization** for security

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FinFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
FinFlow/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/             # Next Auth routes
│   │   ├── transactions/     # Transaction API
│   │   ├── transfer/         # Transfer API
│   │   ├── fund/             # Fund API
│   │   └── logs/             # Error logs API
│   ├── auth/                 # Auth pages
│   ├── dashboard/            # Dashboard page
│   ├── logs/                 # Error logs page
│   ├── onboarding/           # Onboarding flow
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── auth/                 # Auth components
│   ├── dashboard/            # Dashboard components
│   ├── logs/                 # Logs components
│   ├── onboarding/           # Onboarding components
│   └── ui/                   # Shadcn UI components
├── lib/                      # Utilities and helpers
│   ├── store/                # Zustand stores
│   ├── auth.ts               # Next Auth config
│   ├── auth-helpers.ts       # Auth utilities
│   └── utils.ts              # General utilities
├── types/                    # TypeScript types
└── public/                   # Static assets
```

## 🎨 Font Configuration

The project uses **Instrument Sans** as the primary font with **Inter** as fallback.

Fonts are loaded via Google Fonts in `app/layout.tsx` and configured in `tailwind.config.ts`:

```ts
fontFamily: {
  sans: ['var(--font-instrument-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
}
```

## 🔐 Authentication

### Demo Credentials
- **Email**: `demo@finflow.com`
- **Password**: `demo123`

### Creating New Accounts
New accounts can be created through the onboarding flow at `/onboarding`. The onboarding process includes:
1. Email and password creation
2. Personal information collection
3. ID verification (mock)
4. Review and submission

## 📱 Pages & Routes

- `/` - Homepage with features and CTA
- `/onboarding` - Multi-step registration flow
- `/auth/signin` - Sign in page
- `/dashboard` - Main wallet dashboard (protected)
- `/logs` - Error logs viewer (protected)

## 🔧 API Routes

All API routes are protected and require authentication:

- `GET /api/transactions` - Fetch user transactions
- `POST /api/transfer` - Send money to another user
- `POST /api/fund` - Add money to wallet
- `GET /api/logs` - Fetch error logs (supports `?level=error|warning|info`)

## 🎯 Key Features Explained

### Multi-Step Onboarding
- Progress saved in Zustand store with persistence
- Form validation with Zod
- Step-by-step navigation with progress indicator
- Input sanitization for security

### Wallet Dashboard
- Real-time balance calculation from transactions
- Interactive virtual card with flip animation
- Transaction list with auto-refresh
- Modals for adding/sending money
- Loading states and error handling

### Error Logs
- Mock Sentry integration
- Filter by log level (error, warning, info)
- Detailed context and stack traces
- Auto-refresh every 10 seconds

## 🔒 Security Features

- **CSRF Protection**: Next.js built-in CSRF protection
- **Input Sanitization**: All user inputs are sanitized
- **Protected Routes**: Authentication required for sensitive pages
- **Secure Sessions**: JWT-based sessions with Next Auth
- **Validation**: Zod schemas for all form inputs

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Micro-interactions**: Hover effects, transitions, animations
- **Loading States**: Skeleton loaders for async operations
- **Toast Notifications**: Success and error toasts
- **Accessibility**: ARIA labels, keyboard navigation
- **High Contrast**: Accessible color schemes

## 🧪 Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📝 Architecture Decisions

### State Management
- **Zustand**: Used for client-side state (onboarding progress, wallet balance)
- **React Query**: Used for server state (transactions, logs, API calls)
- **Next Auth**: Handles authentication state

### Form Handling
- **React Hook Form**: For form state management
- **Zod**: For schema validation
- **@hookform/resolvers**: Connects RHF with Zod

### Component Library
- **Shadcn UI**: Base component library
- **Radix UI**: Accessible primitives
- **Lucide React**: Icon library

### Styling
- **TailwindCSS**: Utility-first CSS framework
- **CSS Variables**: For theme customization
- **Custom Animations**: Tailwind keyframes

## 🚧 Future Enhancements

- Real database integration (Supabase/PostgreSQL)
- Real payment gateway integration
- Email verification
- Two-factor authentication
- Transaction categories and filtering
- Export transaction history
- Real-time notifications
- Dark mode toggle

## 📄 License

This project is a demo application for educational purposes.

## 🤝 Contributing

This is a demo project. For production use, consider:
- Adding proper database integration
- Implementing real payment processing
- Adding comprehensive error handling
- Setting up proper logging and monitoring
- Adding unit and integration tests
- Implementing rate limiting
- Adding API documentation

## 📸 Screenshots

Screenshots can be added to a `screenshots/` directory:
- `homepage.png` - Landing page
- `onboarding.png` - Onboarding flow
- `dashboard.png` - Wallet dashboard
- `logs.png` - Error logs page

## 🐛 Known Issues

- Mock API responses (no real database)
- Demo credentials are hardcoded
- File upload in onboarding is simulated
- No real payment processing

## 📞 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ using Next.js 14 and modern web technologies.


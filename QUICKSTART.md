# Quick Start Guide

## Installation Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment file**
   
   Create `.env.local` in the root directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=finflow-secret-key-change-in-production
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

- **Email**: `demo@finflow.com`
- **Password**: `demo123`

## Key Routes

- `/` - Homepage
- `/onboarding` - Registration flow
- `/auth/signin` - Sign in page
- `/dashboard` - Wallet dashboard (protected)
- `/logs` - Error logs viewer (protected)

## Features to Test

1. **Onboarding Flow**
   - Navigate to `/onboarding`
   - Complete all 4 steps
   - Progress is saved in localStorage

2. **Dashboard**
   - View balance and transactions
   - Click virtual card to flip it
   - Add money or send money using modals

3. **Error Logs**
   - Navigate to `/logs` from dashboard
   - Filter by log level
   - View detailed error information

## Troubleshooting

### TypeScript Errors
If you see TypeScript errors before installing dependencies, run:
```bash
npm install
```

### Next Auth Errors
Make sure `.env.local` exists with `NEXTAUTH_SECRET` set.

### Build Errors
Clear `.next` folder and rebuild:
```bash
rm -rf .next
npm run build
```


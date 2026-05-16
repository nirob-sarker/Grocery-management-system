# GMS Frontend - Goods Management System

A modern, responsive web application for managing products, orders, inventory, and suppliers built with **Next.js 14**, **React**, **Tailwind CSS**, and **TypeScript**.

## 🚀 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org) with App Router
- **UI Library**: [React 19+](https://react.dev)
- **Styling**: [Tailwind CSS 4+](https://tailwindcss.com)
- **Form Management**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **HTTP Client**: [Axios](https://axios-http.com)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Code Quality**: ESLint, Prettier

## 📁 Project Structure

```
gms-frontend/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages (login, register)
│   ├── dashboard/                # Dashboard pages
│   ├── products/                 # Product pages
│   ├── orders/                   # Order pages
│   ├── profile/                  # User profile pages
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── common/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Select.tsx
│   │   └── index.ts
│   ├── forms/                    # Form components
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── layouts/                  # Layout components
│   │   └── Navbar.tsx
│   └── Providers.tsx             # App providers (React Query, etc.)
├── lib/                          # Utilities & helpers
│   ├── api.ts                    # API client with interceptors
│   ├── validators.ts             # Zod validation schemas
│   └── utils.ts                  # Common utility functions
├── hooks/                        # Custom React hooks
│   └── useAuth.ts
├── types/                        # TypeScript types
│   └── index.ts
├── styles/                       # Additional styles
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── .env.local                    # Environment variables

```

## 🎨 Design System

### Colors
- **Primary**: #2563EB (Blue)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)
- **Danger**: #EF4444 (Red)
- **Info**: #0EA5E9 (Sky Blue)
- **Neutral**: #111827 (Dark Gray)

### Typography
- **Font**: Inter (System fonts fallback)
- **H1**: 2.25rem (36px) - font-bold
- **H2**: 1.875rem (30px) - font-bold
- **Body**: 1rem (16px) - font-normal
- **Caption**: 0.75rem (12px) - font-normal

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ or higher
- npm or yarn

### Installation

1. **Navigate to project directory**:
```bash
cd gms-frontend
```

2. **Install dependencies** (already done during setup):
```bash
npm install
```

3. **Set up environment variables**:
Create `.env.local` file with:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=GMS
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here
```

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📝 Key Features

### Authentication
- ✅ User registration with validation
- ✅ Login with JWT tokens
- ✅ HTTPOnly cookie storage (secure)
- ✅ Automatic logout on token expiration
- ✅ Protected routes

### Form Validation
- ✅ Real-time validation with React Hook Form
- ✅ Zod schema validation
- ✅ Frontend validation before API calls
- ✅ Error messages below fields

### API Integration
- ✅ Axios HTTP client with interceptors
- ✅ TanStack Query for server state management
- ✅ Automatic token injection in headers
- ✅ Error handling & retry logic
- ✅ Request/response interceptors

### UI Components
- ✅ Button (primary, secondary, danger, ghost)
- ✅ Input (text, email, password, number)
- ✅ Select dropdown
- ✅ Card with header, body, footer
- ✅ Alert/Toast notifications
- ✅ Badge/Tag
- ✅ Loading spinner
- ✅ Responsive design

### Responsive Design
- ✅ Mobile-first approach
- ✅ Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- ✅ Flexible layouts with Tailwind

## 🔐 Security Features

- **HTTPOnly Cookies**: JWT tokens stored securely in httpOnly cookies
- **CSRF Protection**: Ready for CSRF token implementation
- **Input Validation**: Frontend validation with Zod schemas
- **Secure Headers**: Auto-configured by Next.js
- **HTTPS Ready**: Production build optimized for HTTPS

## 📋 Available Routes

### Public Routes
- `/` - Landing page
- `/auth/login` - Login page
- `/auth/register` - Register page

### Protected Routes (require authentication)
- `/dashboard` - Dashboard
- `/products` - Product listing
- `/orders` - Order listing
- `/profile` - User profile

## 🧪 Testing

Jest and React Testing Library are configured for unit and component testing.

### Run Tests
```bash
npm run test
```

## 📦 Dependencies

### Core
- `next` - React framework
- `react` - UI library
- `react-dom` - React DOM rendering

### Forms & Validation
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - RHF + Zod integration

### API & State
- `@tanstack/react-query` - Server state management
- `axios` - HTTP client
- `js-cookie` - Cookie management

### Authentication
- `next-auth` - Authentication library

### Styling
- `tailwindcss` - CSS framework
- `@tailwindcss/postcss` - Tailwind CSS v4

### Development
- `typescript` - Type safety
- `eslint` - Linting
- `prettier` - Code formatting

## 🔄 Git Workflow

1. **Create feature branch**: `git checkout -b feature/feature-name`
2. **Make changes and commit**: `git commit -m "feat: description"`
3. **Push to remote**: `git push origin feature/feature-name`
4. **Create Pull Request**

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hook Form Docs](https://react-hook-form.com)
- [TanStack Query Docs](https://tanstack.com/query/latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is part of the GMS (Goods Management System) and follows the same license as the main project.

## 🆘 Support

For issues or questions, please contact the development team or create an issue in the project repository.

---

**Last Updated**: May 16, 2026  
**Version**: 1.0.0

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

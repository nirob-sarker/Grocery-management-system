# GMS Frontend - Requirements Document

**Project Name:** Goods Management System (GMS) - Frontend  
**Technology Stack:** React + Next.js + Tailwind CSS  
**Status:** Planning Phase  
**Last Updated:** May 2026

---

## 1. PROJECT OVERVIEW

### 1.1 Purpose
Build a modern, responsive web application for the GMS backend that allows users to manage products, orders, inventory, and suppliers with consistent UI/UX.

### 1.2 Target Users
- **Customers**: View products, place orders, track order status
- **Staff**: Manage inventory, process orders, view reports
- **Admins**: Full system access, user management, low-stock alerts

### 1.3 Key Goals
✅ Consistent design across all pages  
✅ Form validation on frontend (before sending to backend)  
✅ Responsive design (mobile, tablet, desktop)  
✅ Fast performance with Next.js optimization  
✅ Secure authentication with JWT tokens  
✅ Easy maintenance and scalability  

---

## 2. TECHNOLOGY STACK

### 2.1 Core Technologies
```
Frontend Framework:    Next.js 14+ (App Router)
UI Library:           React 18+
CSS Framework:        Tailwind CSS 3+
UI Component Library: shadcn/ui (optional, recommended)
Form Validation:      React Hook Form + Zod
State Management:     TanStack Query (React Query) for API state
HTTP Client:          Axios or Fetch API
Authentication:       NextAuth.js or custom JWT handling
```

### 2.2 Development Tools
```
Package Manager:      npm or yarn
Linting:             ESLint + Next.js config
Code Formatting:     Prettier
Type Safety:         TypeScript
```

### 2.3 Testing
```
Unit Tests:          Jest
Component Tests:     React Testing Library
E2E Tests:           Playwright or Cypress
```

---

## 3. DESIGN SYSTEM & BRANDING GUIDELINES

### 3.1 Color Palette (FIXED & CONSISTENT)

#### **Primary Colors**
```
Primary Blue:        #2563EB (hover: #1D4ED8)
Secondary Blue:      #3B82F6 (lighter shade)
Accent Blue:         #60A5FA (lightest shade)
```

#### **Semantic Colors**
```
Success (Green):     #10B981
Warning (Orange):    #F59E0B
Danger (Red):        #EF4444
Info (Sky Blue):     #0EA5E9
```

#### **Neutral Colors**
```
Background:          #FFFFFF
Surface:             #F9FAFB
Border:              #E5E7EB
Text Primary:        #111827
Text Secondary:      #6B7280
Text Muted:          #9CA3AF
```

#### **Dark Mode (Optional - Phase 2)**
```
Background Dark:     #0F172A
Surface Dark:        #1E293B
Text Dark:           #F1F5F9
```

### 3.2 Typography

```
Font Family:         Inter (Google Fonts) or System fonts
Font Fallback:       -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

Heading 1 (H1):      2.25rem (36px) - font-bold - used for page titles
Heading 2 (H2):      1.875rem (30px) - font-bold - section headers
Heading 3 (H3):      1.5rem (24px) - font-semibold - subsections
Heading 4 (H4):      1.25rem (20px) - font-semibold - component headers
Body Large:          1.125rem (18px) - font-normal - important content
Body Normal:         1rem (16px) - font-normal - standard text
Body Small:          0.875rem (14px) - font-normal - secondary text
Caption:             0.75rem (12px) - font-normal - helper/hint text
```

### 3.3 Spacing System

```
xs:  0.25rem (4px)
sm:  0.5rem (8px)
md:  1rem (16px)
lg:  1.5rem (24px)
xl:  2rem (32px)
2xl: 2.5rem (40px)
3xl: 3rem (48px)
```

### 3.4 Border Radius

```
None:    0px
sm:      0.25rem (4px) - subtle borders
md:      0.375rem (6px) - default buttons, inputs
lg:      0.5rem (8px) - cards, modals
xl:      0.75rem (12px) - large components
full:    9999px - pills, avatars
```

### 3.5 Shadows

```
sm:  0 1px 2px 0 rgba(0, 0, 0, 0.05)
md:  0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

---

## 4. COMPONENT LIBRARY & PATTERNS

### 4.1 Reusable Components

#### **Forms & Inputs**
- ✅ Input field (text, email, password, number)
- ✅ Textarea
- ✅ Select dropdown
- ✅ Checkbox
- ✅ Radio buttons
- ✅ Date picker
- ✅ File upload
- ✅ Error message display
- ✅ Form label with required asterisk

#### **Buttons**
- ✅ Primary button (filled)
- ✅ Secondary button (outline)
- ✅ Danger button (red background)
- ✅ Ghost button (transparent)
- ✅ Button with loading state
- ✅ Button with icon

#### **Layout Components**
- ✅ Navigation bar (header)
- ✅ Sidebar (for admin/staff)
- ✅ Footer
- ✅ Breadcrumb
- ✅ Container/Wrapper

#### **Data Display**
- ✅ Table with pagination
- ✅ Card component
- ✅ Badge/Tag
- ✅ Alert/Toast notifications
- ✅ Modal/Dialog
- ✅ Tabs
- ✅ Accordion
- ✅ Progress bar
- ✅ Skeleton loader

#### **Navigation**
- ✅ Navbar with user menu
- ✅ Sidebar navigation
- ✅ Breadcrumbs
- ✅ Pagination
- ✅ Tabs

---

## 5. FORM VALIDATION STRATEGY

### 5.1 Validation Libraries
- **React Hook Form**: For form state management
- **Zod**: For schema validation

### 5.2 Validation Rules by Form Type

#### **Authentication Forms**
```
Register Form:
- Email: required, valid email format, unique check (async)
- Password: required, min 8 chars, uppercase, number, special char
- Confirm Password: required, must match password
- Full Name: required, min 2 chars, max 50 chars

Login Form:
- Email: required, valid email format
- Password: required, min 8 chars
```

#### **Product Forms**
```
Create/Edit Product:
- Name: required, min 3 chars, max 100 chars
- Category: required, must select from dropdown
- Supplier: required, must select from dropdown
- SKU: required, unique, alphanumeric only
- Price: required, positive number, max 2 decimal places
- Stock: required, non-negative integer
- Description: optional, max 500 chars
- Image: optional, allowed formats (jpg, png), max 5MB
```

#### **Category Forms**
```
Create/Edit Category:
- Name: required, min 3 chars, max 50 chars, unique
- Description: optional, max 200 chars
```

#### **Order Forms**
```
Create Order:
- Items: required, at least 1 item, quantity > 0
- Shipping Address: required, min 10 chars
- Payment Method: required, select from options
- Notes: optional, max 300 chars
```

#### **Inventory/Restock Forms**
```
Restock Form:
- Product: required, must select from dropdown
- Quantity: required, positive integer, max 999,999
- Supplier: required, must select from dropdown
- Unit Cost: required, positive number, max 2 decimals
- Notes: optional, max 300 chars
```

### 5.3 Validation Feedback
```
✅ Real-time validation as user types (after blur or on change)
✅ Error messages below each field (in red)
✅ Field-level error highlighting (red border/background)
✅ Form-level errors at top of form
✅ Disabled submit button until form is valid
✅ Success message on form submission
```

---

## 6. PAGES & ROUTES STRUCTURE

### 6.1 Authentication Pages
```
Route                  Component              Access
/                      Landing Page           Public
/auth/login           Login Page             Public
/auth/register        Register Page          Public
/auth/forgot-password Forgot Password        Public
/auth/reset-password  Reset Password         Public
```

### 6.2 Customer Pages
```
Route                  Component              Access
/dashboard           Dashboard              Customer
/products            Product Listing        Customer
/products/[id]       Product Details        Customer
/cart                Shopping Cart          Customer
/checkout            Checkout               Customer
/orders              Order Listing          Customer
/orders/[id]         Order Details          Customer
/profile             Customer Profile       Customer
/profile/settings    Settings               Customer
```

### 6.3 Staff Pages
```
Route                  Component              Access
/staff/dashboard      Dashboard              Staff
/staff/orders        Order Management       Staff
/staff/orders/[id]   Order Details          Staff
/staff/inventory     Inventory Overview     Staff
/staff/restock       Restock Form           Staff
/staff/inventory-log Inventory Logs         Staff
/staff/reports       Reports Dashboard      Staff
```

### 6.4 Admin Pages
```
Route                    Component              Access
/admin/dashboard        Dashboard              Admin
/admin/users           User Management        Admin
/admin/users/create    Create User            Admin
/admin/users/[id]      Edit User              Admin
/admin/products        Product Management     Admin
/admin/products/create Create Product         Admin
/admin/products/[id]   Edit Product           Admin
/admin/categories      Category Management    Admin
/admin/categories/new  Create Category        Admin
/admin/suppliers       Supplier Management    Admin
/admin/suppliers/new   Create Supplier        Admin
/admin/orders          Order Management       Admin
/admin/inventory       Inventory Reports      Admin
/admin/settings        System Settings        Admin
```

### 6.5 Public Pages
```
Route                  Component              Access
/                      Landing/Home           Public
/products             Browse Products        Public
/about                About Us               Public
/contact              Contact Us             Public
/faq                  FAQ                    Public
```

---

## 7. AUTHENTICATION & AUTHORIZATION

### 7.1 Authentication Flow
```
1. User navigates to login page
2. Enters email and password
3. Frontend validates inputs with Zod
4. Sends POST /auth/login to backend
5. Backend returns JWT token
6. Store token in httpOnly cookie (secure)
7. Redirect to dashboard
8. For each API call, send Authorization: Bearer <token>
9. Middleware validates token on each request
```

### 7.2 Protected Routes
```
- Check if user is authenticated
- If not, redirect to /auth/login
- Check user role for specific routes
- If unauthorized, redirect to /dashboard
```

### 7.3 Session Management
```
- Token stored in httpOnly cookie (secure from XSS)
- Token refresh mechanism (optional JWT refresh token)
- Logout clears cookie
- Auto-logout on token expiration
```

---

## 8. API INTEGRATION PATTERNS

### 8.1 API Client Setup
```typescript
- Use Axios or Fetch API
- Base URL from environment variables
- Automatic token injection in headers
- Error interceptor for handling 401/403
- Request timeout: 30 seconds
```

### 8.2 Data Fetching Strategy
```
- Use TanStack Query (React Query) for server state
- Cache strategy: staleTime 5 min, gcTime 10 min
- Refetch on window focus
- Automatic retry on failure (max 3 attempts)
- Loading, error, and success states
```

### 8.3 Error Handling
```
- Display user-friendly error messages
- Log errors to console in development
- Show toast/alert notifications
- Retry button for failed requests
- Fallback UI for network errors
```

---

## 9. RESPONSIVE DESIGN BREAKPOINTS

```
Mobile:        < 640px (sm)
Tablet:        640px - 1024px (md, lg)
Desktop:       > 1024px (xl, 2xl)

Tailwind Breakpoints:
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## 10. FEATURES BY USER ROLE

### 10.1 Customer Features
- ✅ Browse products with filters
- ✅ Product search functionality
- ✅ Add products to cart
- ✅ Place orders
- ✅ View order history
- ✅ Track order status
- ✅ Download invoice
- ✅ Update profile
- ✅ Change password
- ✅ Wishlist/Favorites (optional)

### 10.2 Staff Features
- ✅ View all orders
- ✅ Update order status
- ✅ View inventory levels
- ✅ Restock products
- ✅ View inventory logs
- ✅ Generate reports
- ✅ View low-stock alerts
- ✅ Contact admin for issues

### 10.3 Admin Features
- ✅ All staff features +
- ✅ User management (CRUD)
- ✅ Product management (CRUD)
- ✅ Category management (CRUD)
- ✅ Supplier management (CRUD)
- ✅ System settings
- ✅ View analytics/dashboard
- ✅ Send bulk notifications

---

## 11. FORM EXAMPLES & USE CASES

### 11.1 Login Form
```
Fields:
- Email (text input)
- Password (password input)

Buttons:
- Login (primary)
- Register link (secondary text)
- Forgot password link

Validation:
- Email required & valid format
- Password required & min 8 chars
```

### 11.2 Product Creation Form
```
Fields:
- Product Name (text input)
- Category (dropdown select)
- Supplier (dropdown select)
- SKU (text input)
- Price (number input)
- Stock (number input)
- Description (textarea)
- Product Image (file upload)

Buttons:
- Create Product (primary)
- Cancel (secondary)

Validation:
- All required fields checked
- SKU must be unique
- Price must be positive
- Stock must be non-negative
```

### 11.3 Order Placement Form
```
Fields:
- Product Selection (search + add to order table)
- Quantity (number input)
- Shipping Address (textarea)
- Payment Method (radio buttons)
- Order Notes (textarea)
- Terms & Conditions (checkbox)

Buttons:
- Place Order (primary)
- Clear Cart (secondary)
- Continue Shopping (secondary)

Validation:
- At least 1 item in order
- Sufficient stock available
- Valid address format
- Payment method selected
- Terms accepted
```

---

## 12. UI/UX GUIDELINES

### 12.1 Loading States
```
- Show skeleton loaders while fetching data
- Show spinner for form submissions
- Disable buttons during loading
- Show loading progress indicators for long operations
```

### 12.2 Empty States
```
- Show friendly message when no data
- Provide action button (e.g., "Create Product")
- Use illustrations if available
```

### 12.3 Notifications
```
- Toast notifications (top-right)
- Auto-dismiss after 3 seconds (for success)
- Manual close for errors
- Different colors: success (green), error (red), info (blue)
```

### 12.4 Modals & Dialogs
```
- Confirm before destructive actions
- Clear action buttons (primary & secondary)
- Keyboard accessible (ESC to close)
- Focus management
```

---

## 13. PERFORMANCE REQUIREMENTS

### 13.1 Optimization Strategies
```
✅ Code splitting (Next.js automatic)
✅ Image optimization (Next.js Image component)
✅ Lazy loading for routes
✅ Memoization for expensive components
✅ Virtualization for large lists
✅ Caching with React Query
```

### 13.2 Performance Targets
```
- First Contentful Paint (FCP): < 2s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s
```

---

## 14. ACCESSIBILITY REQUIREMENTS

### 14.1 Standards
```
- WCAG 2.1 Level AA compliance
- Semantic HTML (heading hierarchy, lists, etc.)
- Proper ARIA labels for screen readers
- Keyboard navigation support
- Color contrast ratios (at least 4.5:1)
- Focus indicators visible
```

### 14.2 Implementation
```
- Use semantic HTML tags
- Add alt text to images
- Label form inputs properly
- Use ARIA attributes where needed
- Ensure keyboard navigation
- Test with screen readers
```

---

## 15. SECURITY REQUIREMENTS

### 15.1 Frontend Security
```
✅ Store JWT in httpOnly cookies (not localStorage)
✅ CSRF token for state-changing operations
✅ Input sanitization (prevent XSS)
✅ Validate all inputs on frontend
✅ Secure API calls over HTTPS only
✅ No sensitive data in console logs
✅ Environment variables for API URLs
```

### 15.2 Authentication
```
✅ JWT token validation
✅ Automatic logout on token expiration
✅ Refresh token mechanism
✅ Secure password requirements
✅ Rate limiting on login attempts (backend)
```

---

## 16. ENVIRONMENT CONFIGURATION

### 16.1 Environment Variables
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=GMS
NEXT_PUBLIC_APP_VERSION=1.0.0
JWT_SECRET=your-secret-key-here
```

---

## 17. PROJECT STRUCTURE

### 17.1 Folder Organization
```
gms-frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages (layout group)
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (public)/                 # Public pages
│   │   ├── page.tsx
│   │   └── products/
│   ├── (authenticated)/          # Protected pages (middleware)
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── orders/
│   │   └── layout.tsx
│   ├── api/                      # API routes (internal)
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── common/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...
│   ├── forms/                    # Form components
│   │   ├── LoginForm.tsx
│   │   ├── ProductForm.tsx
│   │   ├── OrderForm.tsx
│   │   └── ...
│   └── layouts/                  # Page layouts
│       ├── DashboardLayout.tsx
│       ├── AdminLayout.tsx
│       └── ...
├── lib/                          # Utilities & helpers
│   ├── api.ts                    # API client setup
│   ├── auth.ts                   # Auth utilities
│   ├── validators.ts             # Zod schemas
│   └── utils.ts
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useFetch.ts
│   └── ...
├── context/                      # React Context (if needed)
│   └── AuthContext.tsx
├── styles/                       # Global styles
│   └── globals.css
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── ...
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
├── next.config.js                # Next.js configuration
├── package.json
└── .env.local                    # Environment variables
```

---

## 18. DEVELOPMENT WORKFLOW

### 18.1 Setup Steps
```
1. npm create next-app@latest gms-frontend --typescript
2. npm install tailwindcss postcss autoprefixer
3. npm install react-hook-form zod
4. npm install @tanstack/react-query axios
5. npm install next-auth (for auth handling)
6. Configure Tailwind with custom design tokens
7. Create component library
8. Setup API client
```

### 18.2 Branching Strategy
```
- main (production)
- develop (staging)
- feature/* (feature branches)
- bugfix/* (bug fixes)
```

---

## 19. TESTING STRATEGY

### 19.1 Test Types
```
Unit Tests:        Jest + React Testing Library
Component Tests:   React Testing Library
Integration Tests: Playwright or Cypress
Snapshot Tests:    Jest snapshots (components)
```

### 19.2 Coverage Goals
```
- Components: 80%+ coverage
- Utils: 90%+ coverage
- Hooks: 85%+ coverage
- Pages: 60%+ coverage (integration-focused)
```

---

## 20. DEPLOYMENT & HOSTING

### 20.1 Hosting Options
```
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- DigitalOcean
```

### 20.2 Deployment Checklist
```
✅ Environment variables configured
✅ API endpoints point to production backend
✅ Building locally successful (no errors)
✅ All tests passing
✅ Code review completed
✅ Performance tests passed
✅ Security review completed
```

---

## 21. MOCKUP & DESIGN REFERENCES

### 21.1 Color Usage by Page
```
Login Page:
- Primary blue for button
- Neutral for background
- Text primary for labels

Dashboard:
- Primary blue for active menu
- Neutral for cards
- Success green for positive metrics

Product Listing:
- Primary blue for filters button
- Neutral for card backgrounds
- Price in success green

Order Management:
- Status colors: Success (confirmed), Warning (pending), Danger (cancelled)
- Primary blue for action buttons
```

---

## 22. DELIVERABLES CHECKLIST

- [ ] Design tokens configured in Tailwind
- [ ] Reusable component library
- [ ] Authentication system
- [ ] All pages implemented
- [ ] Form validation working
- [ ] API integration complete
- [ ] Responsive design verified
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met
- [ ] Security review completed
- [ ] Unit tests written
- [ ] E2E tests written
- [ ] Documentation completed
- [ ] Deployed to staging
- [ ] Ready for production

---

## 23. SUCCESS CRITERIA

✅ Design consistency across all pages  
✅ Zero form validation errors on submission  
✅ All API calls successful and error-handled  
✅ Mobile, tablet, desktop responsive  
✅ WCAG AA accessibility compliance  
✅ Performance targets met  
✅ User authentication working securely  
✅ Role-based access control enforced  
✅ All user stories implemented  
✅ Zero critical/high severity bugs  

---

**Document Version:** 1.0  
**Last Updated:** May 16, 2026  
**Status:** Ready for Development

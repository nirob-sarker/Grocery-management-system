import { z } from 'zod';

// Auth Schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(50, 'Full name must be less than 50 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[!@#$%^&*]/, 'Password must contain at least one special character (!@#$%^&*)'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// Product Schemas
export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must be less than 100 characters'),
  categoryId: z
    .string()
    .min(1, 'Category is required'),
  supplierId: z
    .string()
    .min(1, 'Supplier is required'),
  sku: z
    .string()
    .min(1, 'SKU is required')
    .regex(/^[A-Z0-9-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens'),
  price: z
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(999999.99, 'Price is too high')
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: 'Price must have at most 2 decimal places',
    }),
  stock: z
    .number()
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .or(z.literal('')),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

// Category Schemas
export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .min(3, 'Category name must be at least 3 characters')
    .max(50, 'Category name must be less than 50 characters'),
  description: z
    .string()
    .max(200, 'Description must be less than 200 characters')
    .optional()
    .or(z.literal('')),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

// Order Schemas
export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'Product is required'),
        quantity: z
          .number()
          .int('Quantity must be a whole number')
          .min(1, 'Quantity must be at least 1'),
      })
    )
    .min(1, 'At least one item is required'),
  shippingAddress: z
    .string()
    .min(1, 'Shipping address is required')
    .min(10, 'Shipping address must be at least 10 characters'),
  paymentMethod: z
    .enum(['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER'] as const)
    .refine((val) => ['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER'].includes(val), {
      message: 'Invalid payment method',
    }),
  notes: z
    .string()
    .max(300, 'Notes must be less than 300 characters')
    .optional()
    .or(z.literal('')),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

// Restock Schemas
export const restockSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  quantity: z
    .number()
    .int('Quantity must be a whole number')
    .min(1, 'Quantity must be at least 1')
    .max(999999, 'Quantity is too high'),
  supplierId: z.string().min(1, 'Supplier is required'),
  unitCost: z
    .number()
    .min(0.01, 'Unit cost must be greater than 0')
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: 'Unit cost must have at most 2 decimal places',
    }),
  notes: z
    .string()
    .max(300, 'Notes must be less than 300 characters')
    .optional()
    .or(z.literal('')),
});

export type RestockInput = z.infer<typeof restockSchema>;

// Supplier Schemas
export const createSupplierSchema = z.object({
  name: z
    .string()
    .min(1, 'Supplier name is required')
    .min(3, 'Supplier name must be at least 3 characters')
    .max(100, 'Supplier name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .regex(/^\+?[\d\s\-()]{10,}$/, 'Please enter a valid phone number'),
  address: z
    .string()
    .min(1, 'Address is required')
    .min(10, 'Address must be at least 10 characters'),
});

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;

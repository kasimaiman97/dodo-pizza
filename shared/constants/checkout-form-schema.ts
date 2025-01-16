import { z } from 'zod';

export const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: 'The first name must be at least 2 characters long' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  comment: z.string().optional(),

  buildingName: z.string().min(5, {message: 'Please enter a valid building name' }),
  roomNumber: z.string().min(5, {message: 'Please enter a valid room number' }),
  street: z.string().min(5, {message: 'Please enter a valid street' }),
  community: z.string().min(5, {message: 'Please enter a valid community' }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;


export const cardFormSchema = z.object({
  cardNumber: z
      .string()
      .regex(/^\d{15,16}$/, { message: '15 or 16 digits required.' }) // Allow 15 or 16 digits
      .nonempty({ message: 'Card required.' }),
  cardExp: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Use MM/YY.' })
      .nonempty({ message: 'Expiration required' }),
  cardCode: z
      .string()
      .regex(/^\d{3,4}$/, { message: '3 or 4 digits required.' }) // Allow 3 or 4 digits for CVV
      .nonempty({ message: 'CVV required' }),
  cardHolder: z
      .string()
      .min(2, { message: '2 characters minimum.' })
      .nonempty({ message: 'Card holder is required' }),
});


export type CardFormValues = z.infer<typeof cardFormSchema>;

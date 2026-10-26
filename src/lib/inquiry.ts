import { z } from "zod";
import { SITE } from "./site";

export const SERVICE_OPTIONS = [
  "Visa Assistance",
  "Flight Booking",
  "Hotel Reservation",
  "Car Rental",
  "Full Trip Planning",
] as const;

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name." })
    .max(80, { message: "Name must be under 80 characters." }),
  email: z
    .string()
    .trim()
    .max(255, { message: "Email must be under 255 characters." })
    .email({ message: "Please enter a valid email address." }),
  destination: z
    .string()
    .trim()
    .min(2, { message: "Where are you dreaming of going?" })
    .max(80, { message: "Destination must be under 80 characters." }),
  service: z.enum(SERVICE_OPTIONS, {
    message: "Please choose the service you need.",
  }),
  message: z
    .string()
    .trim()
    .max(1000, { message: "Message must be under 1000 characters." })
    .optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export function buildInquiryMessage(input: InquiryInput): string {
  const lines = [
    `Hello ${SITE.name}! I'd like help with ${input.service.toLowerCase()}.`,
    `Destination: ${input.destination}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
  ];
  if (input.message) lines.push(`Details: ${input.message}`);
  return lines.join("\n");
}

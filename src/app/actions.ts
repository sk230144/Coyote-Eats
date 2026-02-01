"use server";

import { getMenuRecommendations } from "@/ai/flows/ai-menu-recommendation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// AI Recommender Action
const AiSchema = z.object({
  dietaryPreferences: z.string().min(5, "Please describe your preferences."),
  pastOrderHistory: z.string().optional(),
});

type AiState = {
  message?: string | null;
  recommendations?: string | null;
  errors?: {
    dietaryPreferences?: string[];
    pastOrderHistory?: string[];
    _form?: string;
  };
};

export async function getRecommendation(
  prevState: AiState,
  formData: FormData
): Promise<AiState> {
  const validatedFields = AiSchema.safeParse({
    dietaryPreferences: formData.get("dietaryPreferences"),
    pastOrderHistory: formData.get("pastOrderHistory"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }

  try {
    const result = await getMenuRecommendations({
      dietaryPreferences: validatedFields.data.dietaryPreferences,
      pastOrderHistory: validatedFields.data.pastOrderHistory || "none",
    });

    if (result.recommendations) {
      return { message: "Here are your recommendations!", recommendations: result.recommendations };
    } else {
      return { message: "Could not generate recommendations at this time." };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

// Reservation Action
const ReservationSchema = z.object({
  name: z.string().min(2, "Name is required."),
  phone: z.string().min(10, "A valid phone number is required."),
  date: z.string().min(1, "Date is required."),
  time: z.string().min(1, "Time is required."),
  partySize: z.coerce.number().min(1, "Party size must be at least 1."),
});

type ReservationState = {
  message?: string | null;
  errors?: {
    name?: string[];
    phone?: string[];
    date?: string[];
    time?: string[];
    partySize?: string[];
    _form?: string;
  };
};

export async function submitReservation(
  prevState: ReservationState,
  formData: FormData
): Promise<ReservationState> {
  const validatedFields = ReservationSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    date: formData.get("date"),
    time: formData.get("time"),
    partySize: formData.get("partySize"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }

  // In a real app, you'd save this to a database.
  console.log("New Reservation:", validatedFields.data);

  revalidatePath("/reservations");
  return { message: `Thank you, ${validatedFields.data.name}! Your table for ${validatedFields.data.partySize} is booked for ${validatedFields.data.date} at ${validatedFields.data.time}.` };
}

// Review Action
const ReviewSchema = z.object({
  name: z.string().min(2, "Name is required."),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters long."),
});

type ReviewState = {
  message?: string | null;
  errors?: {
    name?: string[];
    rating?: string[];
    comment?: string[];
    _form?: string;
  };
};

export async function submitReview(
  prevState: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  const validatedFields = ReviewSchema.safeParse({
    name: formData.get("name"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }

  // In a real app, you'd save this to a database.
  console.log("New Review:", validatedFields.data);

  revalidatePath("/reviews");
  return { message: `Thank you for your feedback, ${validatedFields.data.name}!` };
}

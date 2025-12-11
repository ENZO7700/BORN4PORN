
"use server";

import { z } from "zod";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { initializeFirebase } from "@/firebase";

// Schema for the casting form
const CastingApplicationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.coerce.number().min(18, { message: "You must be at least 18 years old." }),
  country: z.string().min(2, { message: "Country is required." }),
  introduction: z.string().min(50, { message: "Introduction must be at least 50 characters." }).max(1000),
  videoUrl: z.string().url({ message: "Please enter a valid URL." }),
});

export async function submitCastingApplication(prevState: any, formData: FormData) {
    const validatedFields = CastingApplicationSchema.safeParse({
      name: formData.get("name"),
      age: formData.get("age"),
      country: formData.get("country"),
      introduction: formData.get("introduction"),
      videoUrl: formData.get("videoUrl"),
    });

    if (!validatedFields.success) {
      return {
        status: "error",
        message: "Invalid form data. Please check the errors below.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    
  try {
    // This will now fail gracefully if Firebase is not configured, but should work with the new rules
    const { firestore } = initializeFirebase();
    if (!firestore) throw new Error("Firestore is not initialized.");
    
    await addDoc(collection(firestore, "casting_applications"), {
      ...validatedFields.data,
      submittedAt: serverTimestamp(),
    });

    return { status: "success", message: "Application submitted successfully! We will review it shortly.", errors: null };
  } catch (error) {
    console.error("Error submitting application:", error);
    // Provide a more generic error as we don't use admin sdk anymore
    return { status: "error", message: "An unexpected error occurred. Please try again later.", errors: null };
  }
}


export async function askCastingAssistant(prevState: any, formData: FormData) {
  // This function is now a placeholder and does not call an AI.
  const question = formData.get("question") as string;
  if (!question) {
    return { answer: "Please ask a question." };
  }
  return { answer: "The AI assistant is currently offline for maintenance. Please check the project documentation for answers to your questions." };
}

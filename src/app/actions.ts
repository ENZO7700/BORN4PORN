
"use server";

import { z } from "zod";
import { getFirestore } from "firebase-admin/firestore";
import { initializeAdminApp } from "@/firebase/admin";
import { askCastingAssistantFlow } from "@/ai/flows/casting-assistant-flow";

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
    // Initialize Firebase Admin SDK
    await initializeAdminApp();
    const firestore = getFirestore();

    // Add a new document with a generated ID
    await firestore.collection("casting_applications").add({
      ...validatedFields.data,
      submittedAt: new Date(),
    });

    return { status: "success", message: "Application submitted successfully! We will review it shortly.", errors: null };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { status: "error", message: "An unexpected error occurred. Please try again.", errors: null };
  }
}


export async function askCastingAssistant(prevState: any, formData: FormData) {
  const question = formData.get("question") as string;
  if (!question) {
    return { answer: "Please ask a question." };
  }

  try {
    const answer = await askCastingAssistantFlow(question);
    return { answer };
  } catch (error) {
    console.error("Error asking AI assistant:", error);
    return { answer: "Sorry, I couldn't answer that question. Please try again." };
  }
}


'use client';

import { doc, setDoc, Firestore, serverTimestamp } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

interface UserProfileData {
    firstName: string;
    lastName: string;
    email: string | null;
}

/**
 * Creates or updates a user's profile document in Firestore.
 * This is a non-blocking operation.
 * @param firestore - The Firestore instance.
 * @param userId - The ID of the user.
 * @param data - The user profile data to save.
 */
export function createUserProfile(firestore: Firestore, userId: string, data: UserProfileData) {
    const userDocRef = doc(firestore, 'users', userId);
    
    const profileData = {
        ...data,
        id: userId,
        registrationDate: serverTimestamp(),
        isSubscribed: false,
        freeProgram: true, // All new users start on the free program
    };
    
    // Uses the non-blocking update helper
    setDocumentNonBlocking(userDocRef, profileData, { merge: true });
}

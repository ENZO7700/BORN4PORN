
'use client';
import {
  Auth, 
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { createUserProfile } from './firestore/user-profiles';

type ErrorCallback = (error: Error) => void;
type SuccessCallback = () => void;
type ProfileData = { firstName: string; lastName: string };


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(auth: Auth, onError?: ErrorCallback): void {
  signInAnonymously(auth).catch(err => {
    console.error("Anonymous sign-in failed", err);
    onError?.(err);
  });
}

/** Initiate email/password sign-up (non-blocking) and create user profile. */
export function initiateEmailSignUp(auth: Auth, firestore: Firestore, email: string, password: string, profileData: ProfileData, onError?: ErrorCallback, onSuccess?: SuccessCallback): void {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // On success, create the user profile document.
      const user = userCredential.user;
      createUserProfile(firestore, user.uid, {
        ...profileData,
        email: user.email,
      });
      onSuccess?.();
    })
    .catch(err => {
      console.error("Email sign-up failed", err);
      onError?.(err);
    });
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(auth: Auth, email: string, password: string, onError?: ErrorCallback, onSuccess?: SuccessCallback): void {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        onSuccess?.();
    })
    .catch(err => {
        console.error("Email sign-in failed", err);
        onError?.(err);
    });
}

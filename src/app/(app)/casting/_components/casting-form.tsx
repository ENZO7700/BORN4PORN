
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitCastingApplication } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const initialState = {
  message: "",
  status: "",
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? "Submitting..." : "Submit Application"}
    </Button>
  );
}

export function CastingForm() {
  const [state, formAction] = useFormState(submitCastingApplication, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: "Success!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.status === "error" && state.message && !state.errors) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name / Stage Name</Label>
          <Input id="name" name="name" required />
          {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" required />
          {state.errors?.age && <p className="text-sm text-destructive">{state.errors.age[0]}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input id="country" name="country" required />
        {state.errors?.country && <p className="text-sm text-destructive">{state.errors.country[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="introduction">Brief Introduction</Label>
        <Textarea
          id="introduction"
          name="introduction"
          placeholder="Tell us about yourself, your motivations, and why you'd be a great fit for the show..."
          rows={6}
          required
        />
        <p className="text-sm text-muted-foreground">Min 50 characters.</p>
        {state.errors?.introduction && <p className="text-sm text-destructive">{state.errors.introduction[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="videoUrl">Audition Video URL</Label>
        <Input id="videoUrl" name="videoUrl" type="url" placeholder="https://your-video-host.com/..." required />
         <p className="text-sm text-muted-foreground">Link to a short (1-3 min) unlisted video introducing yourself.</p>
        {state.errors?.videoUrl && <p className="text-sm text-destructive">{state.errors.videoUrl[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}

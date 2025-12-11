
"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { askCastingAssistant } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const initialState = {
  answer: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Thinking...' : 'Ask AI'}
    </Button>
  );
}

export function CastingAssistant() {
  const [state, formAction] = useFormState(askCastingAssistant, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl tracking-tight md:text-3xl">
          <Sparkles className="h-6 w-6 text-primary" />
          AI Casting Assistant
        </CardTitle>
        <CardDescription>
          Have questions about the project, rules, or what we're looking for? Ask our AI assistant!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col items-start gap-4 sm:flex-row">
          <Input
            name="question"
            placeholder="e.g., What is the main prize for the winner?"
            required
            className="flex-1"
          />
          <SubmitButton />
        </form>
        {state.answer && (
          <div className="mt-4 rounded-lg border bg-background p-4 text-sm">
            <p className="font-semibold text-primary">AI Assistant:</p>
            <p className="whitespace-pre-wrap">{state.answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

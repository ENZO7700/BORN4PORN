
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Info } from 'lucide-react';

export function CastingAssistant() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl tracking-tight md:text-3xl">
          <Info className="h-6 w-6 text-primary" />
          Project Information
        </CardTitle>
        <CardDescription>
          Key details about the "Born 4 Porn" project.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p><strong>Project Goal:</strong> To create the first 18+ reality show in the CZ/SK region in a pay-per-view (PPV) model.</p>
        <p><strong>Target Audience:</strong> Young adults (18–35) accustomed to paying for premium online content.</p>
        <p><strong>Grand Prize:</strong> The winner receives a €50,000 prize and an exclusive contract.</p>
        <p><strong>Format:</strong> A mix of reality TV, competitive tasks, and explicit "Erotic Match" performances rated by viewers, leading to eliminations until one champion remains.</p>
         <p className="pt-2 text-xs italic">The interactive AI assistant is temporarily unavailable. For more details, please refer to the project documentation.</p>
      </CardContent>
    </Card>
  );
}

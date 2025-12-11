'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const projectContext = `
Project: Born 4 Porn (under the Unicorn brand)

Executive Summary:
Born 4 Porn is the first 18+ reality show in a pay-per-view (PPV) model in the CZ/SK region. It combines elements of reality TV, competition, and adult entertainment into a single format. The project is aimed at young adults (18–35) who are accustomed to paying for premium content. The goal is to launch a pilot season in CZ/SK and expand to Europe, USA, Asia, and Russia within 3 years.

Market Analysis:
- Global adult market: ~$100 billion annually
- Czech Republic: >3 billion CZK annually
- Slovakia: ~€50 million online
- Trend: from passive viewing to an interactive experience.

Concept: EROTICON – Reality Show 18+
- Format: Combination of reality show + competition + explicit content.
- Participants: 10–12 men and women selected through casting.
- Goal: Win a €50,000 prize + an exclusive contract.
- Form: Live Pay-Per-View + episodes on the platform.
- Theme: Each episode features a 'battle', tasks, and eliminations until a final winner remains.

First Season Structure:
1. Casting and introductions – viewers vote on who they want to see more of.
2. Challenges and erotic tasks – interactive games, role-playing, couple competitions.
3. Battles (Erotic Match) – explicit live performances, rated by viewers.
4. Eliminations – the least popular participant leaves.
5. Finale – coronation of the champion.

Business Model:
- Pay-Per-View (PPV): Admission to live broadcasts.
- Subscription (SVOD): Monthly fee for archive access and bonuses.
- Fan Voting: Paid voting (SMS, tokens, crypto).
- Merchandising: T-shirts, masks, erotic toys.
- Sponsors: Adult brands.

Legal and Ethical Aspects:
- Clear contracts with participants, confirmed age 18+.
- Mandatory health tests and legal protection.
- Production in a country with liberal laws.
- Distribution exclusively online on a proprietary platform.
- Anonymous payment options.

Financial Forecast (Pilot Season):
- Costs: Production & crew: €300,000; Participants & prizes: €100,000; Marketing: €150,000; Platform operation: €50,000. Total: approx. €600,000.
- Revenue (conservative scenario): PPV tickets: €1,000,000; Subscribers: €900,000; Voting & bonuses: €200,000. Total: approx. €2.1 million.
- Potential Profit: ~€1.5 million.
`;

const assistantPrompt = ai.definePrompt(
  {
    name: 'castingAssistantPrompt',
    input: { schema: z.string() },
    output: { schema: z.string() },
    system: `You are a helpful casting assistant for a new reality show called "Born 4 Porn".
Your role is to answer questions from potential applicants based ONLY on the provided context.
Be friendly, concise, and encouraging.
If the question is about a topic not covered in the context, politely state that you don't have that information.
Do not make up information.
Do not mention financial numbers like revenue or profit unless directly asked.

Context:
${projectContext}
`,
    prompt: `A potential applicant has a question: {{{input}}}`,
  },
);

export async function askCastingAssistantFlow(question: string): Promise<string> {
  const llmResponse = await assistantPrompt(question);
  const output = llmResponse.output;

  if (output === undefined) {
    throw new Error('No output from LLM');
  }

  return output;
}
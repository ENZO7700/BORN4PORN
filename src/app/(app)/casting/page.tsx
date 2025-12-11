
import { CastingForm } from "./_components/casting-form";
import { CastingAssistant } from "./_components/casting-assistant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CastingPage() {
    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Become a Star</h1>
                <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                    Ready for the spotlight? Apply to be a contestant on the next season of Eroticon.
                </p>
            </div>

            <CastingAssistant />

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-background px-4 text-sm text-muted-foreground">Or Apply Directly</span>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl tracking-tight md:text-3xl">Casting Application</CardTitle>
                    <CardDescription>Fill out the form below. All information is confidential. You must be 18 or older to apply.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CastingForm />
                </CardContent>
            </Card>
        </div>
    );
}

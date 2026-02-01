"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getRecommendation } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Sparkles, LoaderCircle } from "lucide-react";

const initialState = {
  message: null,
  recommendations: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? <LoaderCircle className="animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Get Recommendations
    </Button>
  );
}

export function AiRecommender() {
  const [state, formAction] = useFormState(getRecommendation, initialState);

  return (
    <Card className="mx-auto mt-8 max-w-2xl">
      <CardContent className="pt-6">
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dietaryPreferences">What are your tastes or dietary preferences?</Label>
            <Textarea
              id="dietaryPreferences"
              name="dietaryPreferences"
              placeholder="e.g., 'I love spicy food', 'vegetarian', 'looking for something light', 'gluten-free options'"
              required
            />
             {state?.errors?.dietaryPreferences && (
                <p className="text-sm text-destructive">{state.errors.dietaryPreferences[0]}</p>
             )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pastOrderHistory">Any past orders you liked? (Optional)</Label>
            <Textarea
              id="pastOrderHistory"
              name="pastOrderHistory"
              placeholder="e.g., 'I really enjoyed the Drunken Coyote Burger last time.'"
            />
          </div>
          <SubmitButton />
        </form>

        {state?.message && !state.recommendations && (
           <Alert variant={state.errors ? 'destructive' : 'default'} className="mt-6">
              <AlertTitle>{state.errors ? 'Error' : 'Message'}</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
           </Alert>
        )}

        {state?.recommendations && (
          <Card className="mt-8 bg-background">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-primary"/>
                    Your Personalized Recommendations
                </CardTitle>
                <CardDescription>
                    Based on your preferences, here's what our AI chef thinks you'll love!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: state.recommendations.replace(/\n/g, '<br />') }} />
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

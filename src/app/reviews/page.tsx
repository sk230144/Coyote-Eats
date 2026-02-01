"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { REVIEWS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitReview } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, LoaderCircle, Star } from "lucide-react";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? <LoaderCircle className="animate-spin" /> : "Submit Review"}
    </Button>
  );
}

function ReviewForm() {
  const [state, formAction] = useActionState(submitReview, initialState);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (state.message && !state.errors) {
    return (
      <Alert className="border-green-500 bg-green-50 text-green-800 dark:border-green-600 dark:bg-green-950 dark:text-green-300">
        <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
        <AlertTitle>Feedback Received!</AlertTitle>
        <AlertDescription>{state.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label>Your Rating</Label>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                type="button"
                key={starValue}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    starValue <= (hoverRating || rating)
                      ? "text-primary fill-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              </button>
            );
          })}
        </div>
        <Input type="hidden" name="rating" value={rating} />
        {state?.errors?.rating && (
          <p className="text-sm text-destructive">{state.errors.rating[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" name="name" placeholder="e.g., Jane D." required />
        {state?.errors?.name && (
          <p className="text-sm text-destructive">{state.errors.name[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="comment">Your Review</Label>
        <Textarea
          id="comment"
          name="comment"
          placeholder="What did you think?"
          required
          rows={5}
        />
        {state?.errors?.comment && (
          <p className="text-sm text-destructive">{state.errors.comment[0]}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}

export default function ReviewsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center">
        <h1 className="font-headline text-5xl md:text-7xl">Guest Reviews</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          See what people are saying about their experience.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <section className="space-y-8 lg:col-span-2">
          <h2 className="font-headline text-3xl">All Reviews</h2>
          {REVIEWS.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-lg">{review.author}</CardTitle>
                  <Rating rating={review.rating} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{review.comment}"</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="font-headline text-3xl">Leave a Review</h2>
            <Card className="mt-6">
              <CardContent className="p-6">
                <ReviewForm />
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}

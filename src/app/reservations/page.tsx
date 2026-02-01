"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitReservation } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, LoaderCircle } from "lucide-react";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? <LoaderCircle className="animate-spin" /> : "Book Your Table"}
    </Button>
  );
}

export default function ReservationsPage() {
  const [state, formAction] = useActionState(submitReservation, initialState);

  // Generate available times - in a real app, this would come from an API
  const availableTimes = ["11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"];

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <header className="text-center">
        <h1 className="font-headline text-5xl md:text-7xl">Reserve a Table</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We can't wait to host you. Book your spot at The Sleepy Coyote.
        </p>
      </header>

      <main className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Reservation Details</CardTitle>
            <CardDescription>Fill out the form below to secure your spot.</CardDescription>
          </CardHeader>
          <CardContent>
            {!state?.message || state.errors ? (
              <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="partySize">Party Size</Label>
                    <Select name="partySize" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(8)].map((_, i) => (
                          <SelectItem key={i + 1} value={`${i + 1}`}>
                            {i + 1} Guest{i > 0 && "s"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
                     {state?.errors?.date && ( <p className="text-sm text-destructive">{state.errors.date[0]}</p>)}
                  </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Select name="time" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableTimes.map(time => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                     {state?.errors?.time && ( <p className="text-sm text-destructive">{state.errors.time[0]}</p>)}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                  {state?.errors?.name && ( <p className="text-sm text-destructive">{state.errors.name[0]}</p>)}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" placeholder="(555) 123-4567" type="tel" required />
                  {state?.errors?.phone && ( <p className="text-sm text-destructive">{state.errors.phone[0]}</p>)}
                </div>
                
                <SubmitButton />
                {state?.errors?._form && ( <p className="text-sm text-destructive">{state.errors._form[0]}</p>)}
              </form>
            ) : (
                <Alert className="border-green-500 bg-green-50 text-green-800 dark:border-green-600 dark:bg-green-950 dark:text-green-300">
                    <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                    <AlertTitle>Reservation Confirmed!</AlertTitle>
                    <AlertDescription>
                        {state.message}
                    </AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

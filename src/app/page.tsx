import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Rating } from "@/components/ui/rating";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MENU_ITEMS, REVIEWS } from "@/lib/data";
import type { MenuItem, Review } from "@/lib/types";
import { AiRecommender } from "@/components/ai-recommender";
import { Utensils } from "lucide-react";

const popularMenuItems = MENU_ITEMS.filter((item) =>
  item.tags?.includes("popular")
).slice(0, 3);
const featuredReviews = REVIEWS.slice(0, 3);
const heroImage = PlaceHolderImages.find((img) => img.id === "hero-1");

export default function Home() {
  return (
    <main className="flex-1">
      {heroImage && (
        <section className="relative h-[60vh] w-full text-white">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl">
              The Sleepy Coyote
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
              An under discovered gem in the small, but lovely community of Ten
              Sleep.
            </p>
            <Button asChild className="mt-8" size="lg">
              <Link href="/reservations">Book a Table</Link>
            </Button>
          </div>
        </section>
      )}

      <section id="menu" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-center text-4xl md:text-5xl">
            Popular Dishes
          </h2>
          <p className="mt-4 text-center text-lg text-muted-foreground">
            Favorites from our kitchen, loved by our regulars.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {popularMenuItems.map((item: MenuItem) => {
              const itemImage = PlaceHolderImages.find(
                (img) => img.id === item.imageId
              );
              return (
                <Card key={item.id}>
                  {itemImage && (
                    <div className="relative h-60 w-full">
                      <Image
                        src={itemImage.imageUrl}
                        alt={item.name}
                        fill
                        className="rounded-t-lg object-cover"
                        data-ai-hint={itemImage.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <p className="font-headline text-xl text-primary">
                      ${item.price.toFixed(2)}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      <section id="ai-recommender" className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Utensils className="mx-auto h-12 w-12 text-primary" />
            <h2 className="font-headline mt-4 text-center text-4xl md:text-5xl">
              Need a Recommendation?
            </h2>
            <p className="mt-4 text-center text-lg text-muted-foreground">
              Let our AI chef suggest something you'll love based on your tastes.
            </p>
          </div>
          <AiRecommender />
        </div>
      </section>

      <Separator />

      <section id="reviews" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-center text-4xl md:text-5xl">
            What Our Guests Say
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {featuredReviews.map((review: Review) => (
              <Card key={review.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.author}</CardTitle>
                    <Rating rating={review.rating} />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">"{review.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/reviews">More Reviews</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

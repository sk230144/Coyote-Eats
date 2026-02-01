import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MENU_ITEMS } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { MenuItem } from "@/lib/types";

export default function MenuPage() {
  const categories = [...new Set(MENU_ITEMS.map((item) => item.category))];
  const defaultTab = categories.includes("Burgers") ? "Burgers" : categories[0];

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center">
        <h1 className="font-headline text-5xl md:text-7xl">Our Menu</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Crafted with love from local ingredients.
        </p>
      </header>

      <main className="mt-12">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {MENU_ITEMS.filter((item) => item.category === category).map(
                  (item: MenuItem) => {
                    const itemImage = PlaceHolderImages.find(
                      (img) => img.id === item.imageId
                    );
                    return (
                      <Card key={item.id} className="overflow-hidden">
                        {itemImage && (
                          <div className="relative h-56 w-full">
                            <Image
                              src={itemImage.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                          <CardDescription>
                            {item.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    );
                  }
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GALLERY_IMAGES } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

export default function GalleryPage() {
  const categories = [...new Set(GALLERY_IMAGES.map((img) => img.category))];
  categories.unshift("All");

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center">
        <h1 className="font-headline text-5xl md:text-7xl">Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A glimpse into the world of The Sleepy Coyote.
        </p>
      </header>

      <main className="mt-12">
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="All">
            <div className="columns-2 gap-4 pt-4 sm:columns-3 xl:columns-4">
              {GALLERY_IMAGES.map((galleryImage) => {
                const image = PlaceHolderImages.find(
                  (img) => img.id === galleryImage.imageId
                );
                return (
                  image && (
                    <div key={galleryImage.id} className="mb-4 break-inside-avoid">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={600}
                        height={400}
                        className="h-auto w-full rounded-lg object-cover shadow-md"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </TabsContent>

          {categories.filter(c => c !== 'All').map((category) => (
            <TabsContent key={category} value={category}>
              <div className="columns-2 gap-4 pt-4 sm:columns-3 xl:columns-4">
                {GALLERY_IMAGES.filter(
                  (img) => img.category === category
                ).map((galleryImage) => {
                  const image = PlaceHolderImages.find(
                    (img) => img.id === galleryImage.imageId
                  );
                  return (
                    image && (
                      <div key={galleryImage.id} className="mb-4 break-inside-avoid">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          width={600}
                          height={400}
                          className="h-auto w-full rounded-lg object-cover shadow-md"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}

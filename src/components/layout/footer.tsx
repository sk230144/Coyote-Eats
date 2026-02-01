import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Heart,
  Accessibility,
  UtensilsCrossed,
} from "lucide-react";

export function Footer() {
  const socialLinks = [
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Yelp", href: "#" },
  ];

  const infoItems = [
    {
      Icon: MapPin,
      text: "125 2nd St, Ten Sleep, WY 82442",
      href: "https://maps.google.com/?q=125 2nd St, Ten Sleep, WY 82442",
    },
    { Icon: Phone, text: "+1 307-366-2171", href: "tel:+13073662171" },
    { Icon: Clock, text: "Closed · Opens 11:30 am" },
  ];
  
  const highlightItems = [
    { Icon: Heart, text: "LGBTQ+ friendly" },
    { Icon: Accessibility, text: "Wheelchair-accessible" },
  ]

  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 text-center md:grid-cols-2 md:text-left lg:grid-cols-4">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <UtensilsCrossed className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl">The Sleepy Coyote</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Your favorite local spot for great food, friendly service, and a cozy atmosphere.
            </p>
          </div>

          <div>
            <h3 className="font-headline text-lg">Contact & Hours</h3>
            <ul className="mt-4 space-y-3">
              {infoItems.map(({ Icon, text, href }) => (
                <li key={text} className="flex items-center justify-center gap-3 md:justify-start">
                  <Icon className="h-5 w-5 text-primary" />
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
              <li><Link href="/reservations" className="hover:text-primary transition-colors">Reservations</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/reviews" className="hover:text-primary transition-colors">Reviews</Link></li>
            </ul>
          </div>
          
           <div>
            <h3 className="font-headline text-lg">Our Vibe</h3>
            <ul className="mt-4 space-y-3">
              {highlightItems.map(({ Icon, text }) => (
                <li key={text} className="flex items-center justify-center gap-3 md:justify-start">
                  <Icon className="h-5 w-5 text-primary" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The Sleepy Coyote. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

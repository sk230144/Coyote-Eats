"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, UtensilsCrossed, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reservations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
];

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-semibold">
            Coyote Eats
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          <Button asChild className="ml-4">
            <Link href="/reservations">Book a Table</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-card">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                    <UtensilsCrossed className="h-6 w-6 text-primary" />
                    <span className="font-headline text-xl font-semibold">
                      Coyote Eats
                    </span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                    <X />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="mt-8 flex flex-1 flex-col gap-4">
                  {navLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      asChild
                      className="justify-start text-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  ))}
                </nav>
                <Button asChild className="mt-auto" size="lg" onClick={() => setMenuOpen(false)}>
                  <Link href="/reservations">Book a Table</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

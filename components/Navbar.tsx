import Link from "next/link"
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Search, ShoppingCart } from "lucide-react";
import MobileNav from "./mobile-nav";
import SearchInput from "./SearchInput";
import { CartIndicator } from "./CartIndicator";
import { Suspense } from "react";
import { CartIndicatorSkeleton } from "./CartIndicatorSkeleton";

export const categories = [
    { id: 1, name: "Electronics", href: "/search/electronics" },
    { id: 2, name: "Clothing", href: "/search/clothing" },
    { id: 3, name: "Home", href: "/search/home" },
  ];


function Navbar() {
  return (
    <div className="border-b border-dashed">
        <div className="container mx-auto flex h-16 items-center justify-between p-2 md:p-4">
              <div>
                  <div className="flex items-center gap-6">
                      <Link href="/" className="text-2xl font-bold hidden md:block">NextBuy</Link>
                      <nav className="hidden md:flex items-center gap-6">
                        {categories.map((category) => (
                            <Link
                            key={category.id}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            href={category.href}
                            >
                            {category.name}
                            </Link>
                        ))}
                      </nav>
                      {/* Mobile Navigation */}
                      <MobileNav />
                  </div>
              </div>
              <div className="hidden md:block w-full mx-4 md:mx-8">
                  <SearchInput />
              </div>
              
              <div className="flex items-center gap-0">
                  <Button variant="ghost" size="icon" asChild>
                      <Link href="/search">
                          <Search className="w-5 h-5"/>
                      </Link>
                  </Button>
                  <Suspense fallback={<CartIndicatorSkeleton />}>
                    <CartIndicator />
                  </Suspense>
                  <ModeToggle />
              </div>
        </div>
    </div>
  )
}

export default Navbar

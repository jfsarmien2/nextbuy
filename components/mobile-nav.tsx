import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import Link from "next/link"
import { categories } from "./Navbar"


function MobileNav() {
  return (
    <Sheet>
          <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5"/>
              </Button>
          </SheetTrigger>
          <SheetContent side="left">
              <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col py-4 px-2">
                  <SheetClose asChild>
                      <Link href="/" className="font-medium">Home</Link>
                  </SheetClose>
                  <SheetClose asChild>
                      <Link href="/products" className="font-medium">Products</Link>
                  </SheetClose>
                  <div className="mt-2">
                      <h3 className="text-xsmfont-medium text-muted-foreground">
                          Categories
                      </h3>
                      {categories.map(category => (
                          <SheetClose asChild key={category.id}>
                            <Link
                                href={category.href}
                                className="text-sm py-1 block font-medium"
                            >
                                {category.name}
                            </Link>
                          </SheetClose>
                      ))}
                  </div>
              </nav>
          </SheetContent>
    </Sheet>
  )
}

export default MobileNav
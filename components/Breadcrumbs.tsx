import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";


interface BreadcrumbProps { 
    items: { label: string; href: string; active?: boolean; }[];
}

function Breadcrumbs({ items }: BreadcrumbProps) {
  return (
      <Breadcrumb className="mb-4 h-8">
          <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                    <Home className="w-4 h-4"/>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {items.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={item.href}
                            className={item.active ? "active" : ""}
                            aria-current={ item.active ? "page": undefined}
                        >
                            {item.label}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
              ))}
          </BreadcrumbList>
      </Breadcrumb>
  )
}

export default Breadcrumbs;
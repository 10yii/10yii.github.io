'use client'

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

import {Menu, Github} from 'lucide-react';
import { usePathname } from "next/navigation"
import {cn} from '@/lib/utils';
import {useTheme} from "next-themes";
import {ThemeSwitch} from "@/components/ThemeSwitch";


export interface NavBarProps {
  href: string;
  name: string;
}

export function NavBar({ menus }: { menus: NavBarProps[] }) {
    const pathName = usePathname()
    const {theme, setTheme} = useTheme()


    return (
    <div className="top-0 flex h-14 items-center gap-4 border-b backdrop-blur bg-transparent px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
        </Link>
        {menus.map((menu, i) => (
          <Link
            href={menu.href}
            className={cn("text-muted-foreground transition-colors hover:text-foreground",
                pathName?.startsWith(menu.href) ||
                (i === 0 && pathName === "/")
                    ? "font-medium text-primary"
                    : "text-muted-foreground")}
            key={i.toString()}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
            </Link>
            {menus.map((menu, i) => (
              <Link
                href={menu.href}
                className={cn("text-muted-foreground hover:text-foreground",
                    pathName?.startsWith(menu.href) ||
                    (i === 0 && pathName === "/")
                        ? "font-medium text-primary"
                        : "text-muted-foreground")}
                key={i.toString()}
              >
                {menu.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial" />
        <Button variant="outline" size="icon" className="shrink-0"
          type="button"
        >
          <Github className="h-6 w-6  stroke-zinc-500" />
        </Button>
        <ThemeSwitch />
      </div>
    </div>
  );
}

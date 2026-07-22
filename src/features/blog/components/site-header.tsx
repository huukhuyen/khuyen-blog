import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router";
import { ProfileCard } from "@/components/profile-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { POST_CATEGORIES } from "@/content/categories";

const NAV_LINKS = [
  { label: "Trang chủ", to: "/" },
  ...Object.entries(POST_CATEGORIES).map(([slug, label]) => ({
    label,
    to: `/${slug}`,
  })),
];

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-30">
      <div className="site-header__inner mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4">
        <Link className="site-header__brand" to="/">
          Nguyễn Hữu Khuyên
        </Link>
        <nav className="site-header__nav hidden items-center gap-6 text-sm md:flex">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Mở menu"
                className="md:hidden"
                size="icon"
                variant="ghost"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              aria-describedby={undefined}
              aria-label="Menu"
              className="site-header__sheet"
            >
              <nav className="site-header__mobile-nav mb-2 flex flex-col gap-1">
                {NAV_LINKS.map(({ label, to }) => (
                  <SheetClose asChild key={to}>
                    <NavLink
                      className="rounded py-2 !text-[#d78b36] hover:bg-teal-50"
                      to={to}
                    >
                      {label}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>
              <ProfileCard />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

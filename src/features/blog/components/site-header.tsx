import { Menu } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  ['/', 'Trang chủ'],
  // ['/cv', 'Giới thiệu'],
  ['/nhung-dieu-dang-nho', 'Những điều đáng nhớ'],
  ['/coding', 'Chia sẻ coding'],
  ['/suu-tam', 'Sưu tầm'],
] as const;

export function SiteHeader(): JSX.Element {
  return (
    <header className="site-header sticky top-0 z-30">
      <div className="site-header__inner mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4">
        <Link className="site-header__brand" to="/">Nguyễn Hữu Khuyên</Link>
        <nav className="site-header__nav hidden items-center gap-6 text-sm md:flex">
          {navigation.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild><Button aria-label="Mở menu" className="md:hidden" size="icon" variant="ghost"><Menu /></Button></SheetTrigger>
            <SheetContent aria-describedby={undefined} aria-label="Menu" className="site-header__sheet">
              {/* <p className="mb-8 font-serif text-xl font-bold">Khuyen Nguyen</p> */}
              <nav className="site-header__mobile-nav flex flex-col gap-1 mb-2">
                {navigation.map(([to, label]) => <SheetClose asChild key={to}><NavLink className="rounded py-2 !text-[#d78b36] hover:bg-teal-50" to={to}>{label}</NavLink></SheetClose>)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFoundPage(): JSX.Element {
  return <main className="grid min-h-screen place-items-center bg-stone-50 p-6 text-center"><div><p className="text-sm font-semibold uppercase tracking-widest text-teal-700">404</p><h1 className="mt-2 font-serif text-4xl font-bold">Không tìm thấy trang</h1><Button asChild className="mt-6"><Link to="/">Về trang chủ</Link></Button></div></main>;
}

import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/lib/use-seo";

export function NotFoundPage() {
  useSeo(
    "Không tìm thấy trang",
    "Trang bạn tìm không tồn tại hoặc đã được chuyển sang địa chỉ khác.",
  );

  return (
    <main className="grid min-h-screen place-items-center bg-stone-50 p-6 text-center">
      <div>
        <p className="text-sm font-semibold tracking-widest text-teal-700 uppercase">
          404
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold">
          Không tìm thấy trang
        </h1>
        <Button asChild className="mt-6">
          <Link to="/">Về trang chủ</Link>
        </Button>
      </div>
    </main>
  );
}

import { ChevronsUp } from "lucide-react";

const QUOTE =
  "May mắn lớn nhất của cuộc đời, không phải nhặt được tiền, cũng không phải trúng số, mà là có người có thể dẫn bạn đi đến 1 nền tảng cao hơn.";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__content mx-auto px-5">
        <blockquote className="site-footer__quote">{QUOTE}</blockquote>
        <button
          aria-label="Quay về đầu trang"
          className="site-footer__back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          type="button"
        >
          <ChevronsUp aria-hidden="true" size={18} strokeWidth={1.8} />
          <span>Về đầu trang</span>
        </button>
      </div>
    </footer>
  );
}

import { Card, CardContent } from "@/components/ui/card";

const AVATAR_SRC = "/images/HY8A3869.jpg";
const AVATAR_SIZE = 208;

const BIO_PARAGRAPHS = [
  "Một chàng trai 9x đến từ Đà Nẵng - thành phố biển có những cây cầu rực sáng về đêm và nhịp sống đủ yên bình để người ta luôn muốn quay về.",
  "Tôi đang là Frontend Developer tại một công ty công nghệ Nhật Bản.",
  'Ngoài những dòng code, tôi có niềm yêu thích đặc biệt với việc tự tay sửa chữa và "phá" mọi thứ xung quanh. Từ chiếc máy khoan, vài dụng cụ cơ khí nhỏ, đến những công việc điện nước trong nhà, tôi luôn thấy hứng thú.',
  "Tôi cũng thích những buổi đi dạo, thích vị ngọt tự nhiên của trái cây và những khoảnh khắc giúp bản thân tạm rời xa màn hình máy tính để quan sát cuộc sống theo một nhịp độ khác.",
  "Tôi tin rằng dù là viết code hay sửa một món đồ hỏng, sự tỉ mỉ, kiên nhẫn và chân thành luôn tạo nên những kết quả đáng giá.",
];

/** Thẻ giới thiệu dùng chung cho sidebar (desktop) và menu trượt (mobile). */
export function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <img
          alt="Nguyễn Hữu Khuyên"
          className="blog-sidebar__avatar mx-auto mb-5 size-52 rounded-full object-cover"
          height={AVATAR_SIZE}
          src={AVATAR_SRC}
          width={AVATAR_SIZE}
        />
        <h2 className="blog-sidebar__eyebrow text-center font-serif !text-xl font-bold">
          Khuyên
        </h2>
        {BIO_PARAGRAPHS.map((paragraph) => (
          <p
            className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300"
            key={paragraph}
          >
            {paragraph}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from '@/components/ui/card';

export function Sidebar(): JSX.Element {
  return (
    <aside className="blog-sidebar space-y-5">
      <Card>
        <CardContent className="">
          <img
            alt="Nguyễn Hữu Khuyên"
            className="blog-sidebar__avatar mx-auto mb-5 size-52 rounded-full object-cover"
            src="/images/HY8A3869.jpg"
          />
          {/* <p className="blog-sidebar__eyebrow text-center">Xin chào, tôi là</p> */}
          <h2 className="font-serif !text-xl blog-sidebar__eyebrow font-bold text-center">Khuyên</h2>
          <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300"> Một chàng trai 9x đến từ Đà Nẵng - thành phố biển hiền hòa, thành phố của những cây cầu rực sáng về đêm và nhịp sống đủ yên bình để người ta luôn muốn quay về.</p><p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">Tôi đang là Frontend Developer tại một công ty công nghệ Nhật Bản. </p><p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300"> Ngoài những dòng code, tôi có niềm yêu thích đặc biệt với việc tự tay sửa chữa và "phá" mọi thứ xung quanh. Từ chiếc máy khoan, vài dụng cụ cơ khí nhỏ, đến những công việc điện nước trong nhà, tôi luôn thấy hứng thú.</p><p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">Tôi cũng thích những buổi đi dạo, thích vị ngọt tự nhiên của trái cây và những khoảnh khắc giúp bản thân tạm rời xa màn hình máy tính để quan sát cuộc sống theo một nhịp độ khác. </p><p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300"> Tôi tin rằng dù là viết code hay sửa một món đồ hỏng, sự tỉ mỉ, kiên nhẫn và chân thành luôn tạo nên những kết quả đáng giá.</p>
        </CardContent>
      </Card>
    </aside>
  );
}

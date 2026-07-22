---
title: "Một vài thủ thuật làm việc với các dạng layout - Phần 2"
slug: "mot-vai-thu-thuat-lam-viec-voi-cac-dang-layout-phan-2"
category: "coding"
publishedAt: "2020-04-25"
summary: "Chào mọi người, tiếp tụcbài trước hôm nay mình sẽ chia sẻ thêm một trick thú vị nữa về layout."
featuredImage: "https://images.viblo.asia/d57fa50e-9426-4fe7-b088-c6cbc2f2e103.jpg"
featuredImageAlt: "Một vài thủ thuật làm việc với các dạng layout - Phần 2"
legacyPath: "/coding/mot-vai-thu-thuat-lam-viec-voi-cac-dang-layout-phan-2.html"
legacyAliases: []
source: "original"
embeds: ["https://viblo.asia/embed?url=https://jsfiddle.net/KhuyenNH/aebLytxu/7/embed/result,html,css/dark&provider=null","https://viblo.asia/embed?url=https://jsfiddle.net/KhuyenNH/fouba6j8/embed/result,html,css/dark&provider=null"]
---

Chào mọi người, tiếp tục[bài trước](https://huukhuyen.netlify.app/coding/mot-vai-thu-thuat-lam-viec-voi-cac-dang-layout-phan-1.html) hôm nay mình sẽ chia sẻ thêm một trick thú vị nữa về layout.

Vào một buổi chiều tuần trước, một buổi chiều trời nắng đổ lửa thay vì mưa đá vỡ đầu như thời sự nói 2 hôm nay. Đang ngồi lướt fb à không vừa mới support thanh niên bên team khác xong thì đứa em cùng dự án có than thở việc "gọt tròn góc" cho`table`, tuy nhiên gọt thì gọt được đó nhưng nhìn kỹ thì chưa thật sự trơn tru cho lắm, sợ chị designer buồn dẫn đến trầm cảm. Nên mình dành chút thời gian ngồi gọt giúp em nó để tạo ra chiếc table đẹp thật sự như chị designer đã bỏ công thiết kế.

Bây giờ mình sẽ tái hiện lại chiếc table mình làm hôm trước. Anh em review phát xem có gọn gàng không nhé.

![Một vài thủ thuật làm việc với các dạng layout - Phần 2](https://images.viblo.asia/d57fa50e-9426-4fe7-b088-c6cbc2f2e103.jpg)

1\. Table border radius has border
----------------------------------

Thông thường, để dựng ra một cái table bo tròn 4 góc bạn sẽ nghĩ đến việc dùng`border-radius`. Đúng rồi, vì làm tròn thì chỉ có nó thôi, nhưng có người sẽ radius nó ở`table` hoặc selector đến`td` first / last của`tr` đầu tiên và cuối cùng rồi radius... Có thể một vài cách nữa nhưng nó sẽ rườm rà và kết quả là cái table vẫn không được đẹp mắt và không thực sự smooth như design. Bởi vì table và các cell (`th, td`) mặc định là`display: table, table-cel` nên việc can thiệp`box-model` là mạo hiểm ở các browser khác nhau.

![Một vài thủ thuật làm việc với các dạng layout - Phần 2](https://images.viblo.asia/cbb38514-b404-4709-b3fe-11dd8cb4e0d9.png)

### Ý tưởng thực hiện:

*   Bọc table bằng một div để làm việc bo tròn và tạo border
*   Đối với những cell có border thì nên kết hợp[pseudo-class](http://tympanus.net/codrops/css_reference/#section_css-pseudo-class) để tối ưu và tránh xảy ra tình trạng huynh đệ tương tàn (css bị override).

```pug
.wrap // nhiệm vụ để style viền và bo tròn
 table
   thead
     tr
       th Hích đờ
       th Hích đờ
       th Hích đờ
       th Hích đờ
   tbody
     tr
       td ahihi x 3,14
       td ahihi x 3,14
       td ahihi x 3,14
       td ahihi x 3,14
```

```scss
.wrap {
 border: 2px solid #36304a;
 border-radius: 5px;
 overflow: hidden; // cái này để trị thằng con cứng đầu
}

table {
 width: 100%;

 tr {
   // selector đến những cell không thuộc row cuối cùng
   &:not(:last-child) {
     td {
       border-bottom: 1px dotted gray;
     }
   }

   // selector đến những cell thuộc những row chẵn 2, 4, 6...
   &:nth-child(even) {
     td {
       background: rgba(#fff, 0.7);
     }
   }
 }

 th {
   padding: 20px;
   color: white;
   background: #36304a;
 }

 td {
   padding: 10px 20px;
   background: rgba(#fff, .9);
 }

 td, th {
   // selector đến các cell trừ cell cuối cùng
   &:not(:last-child) {
     border-right: 1px dotted gray;
   }
 }
}
```

Đấy, mình chỉ demo một lần cho các bạn xem. Cách này cũng simple, code ngắn gọn, không bị trùng lặp styled. Để mình gửi luôn cái link demo cho mọi người xem:

{{embed:0}}

_**Hiện tại codepen đang bị lỗ hổng bảo mật gì đó, vào cứ bị dính capcha hơi khó chịu nên giờ mình chuyển sang tool này, khá nhanh, nhẹ**_

2\. Table has border using rowspan
----------------------------------

Trường hợp nữa nếu table có thêm`rowspan` thì chúng ta xử lý việc border thế nào để chúng không bị trùng lặp nhau. Việc cho`border-left` hay`border-right` là đơn giản rồi. Còn làm thế nào để selector đúng những cell cần set đường viền ngang thì mới là vấn đề.

![Một vài thủ thuật làm việc với các dạng layout - Phần 2](https://images.viblo.asia/a418e11e-ae9d-47a1-8eb5-860a7721dde3.png)

_**Chỗ border nét đứt để dễ phân biệt selector**_

### Ý tưởng thực hiện:

*   Dựng 1 table như bên trên, selector đến tất cả các cell trừ cell cuối và set`border-left`.
*   Selector đến các cell (**trừ** cell của**hàng cuối cùng** và những cell có attribute là`[rowspan]`**row vị trí thứ n tính từ last**).

```pug
.wrap
 table
   thead
     tr
       th Hích đờ
       th Hích đờ
       th Hích đờ
       th Hích đờ
   tbody
     tr
       td(rowspan='3') ahihi x 3,14
       td(rowspan='3') ahihi x 3,14
       td ahihi x 3,14
       td ahihi x 3,14
     tr
       td ahihi x 3,14
       td ahihi x 3,14
     tr
       td ahihi x 3,14
       td ahihi x 3,14
     tr
       td(rowspan='3') ahihi x 3,14
       td(rowspan='3') ahihi x 3,14
       td ahihi x 3,14
       td(rowspan='3') ahihi x 3,14
     tr
       td ahihi x 3,14
     tr
       td ahihi x 3,14
```

```scss
.wrap {// đoạn này như ở trên
 border: 2px solid #36304a;
 border-radius: 5px;
 overflow: hidden;
}

table {
 width: 100%;

 // Quan trọng từ đây
 tr {
   &:not(:last-child) {
     td {
       border-bottom: 1px dashed #9a3232;
     }
   }

   //  Selector đến hàng thứ n đếm từ dưới lên. Mình đang dùng rowspan = 3 nên mình selector tương ứng
   &:nth-last-child(3) {
     td[rowspan] {
       border-bottom: 0; // cái này để reset border bottom đi tránh trùng
     }
   }
 }
 //- đến đây thôi, phần bên dưới styled như table trước

 td {
   padding: 10px 20px;
   background: rgba(#fff, .9);
 }

 th {
   padding: 20px;
   color: white;
   background: #36304a;
 }

 td, th {
   &:not(:last-child) {
     border-right: 1px solid #36304a;
   }
 }
}
```

Xem phim Mắt biếc 4K Vietsub online

{{embed:1}}

Nếu không xem được trực tiếp thì download tại[Mắt biếc](https://jsfiddle.net/KhuyenNH/fouba6j8)

Tổng kết
--------

Đó là 2 dạng table mà chúng ta thường gặp, dạo này mình hay code bên phía Admin, nên chắc sẽ còn chia sẻ cho anh em những tricks hay về table ở những tập sau. Mọi người cùng đón chờ và ủng hộ nhé. Cảm ơn và chúc mọi người mùa remote nhiều kỷ niệm, giữ gìn sức khoẻ và đề cao ý thức chung chứ mình nhớ công ty lắm rồi.

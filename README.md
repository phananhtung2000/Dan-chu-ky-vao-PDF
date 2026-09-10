# Hướng dẫn deploy "Chèn chữ ký vào PDF" lên GitHub Pages + cài đặt app

## 1. Đưa 6 file lên GitHub
1. Tạo repo mới trên GitHub (public).
2. Đẩy 6 file: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`,
   `icon-512-maskable.png` lên **thư mục gốc** của repo (không để trong thư mục con).
3. Vào Settings → Pages → Source: chọn branch `main`, thư mục `/ (root)` → Save.
4. Đợi vài phút, mở `https://<username>.github.io/<ten-repo>/`.

## 2. Cài trên Android (Chrome)
Mở link trên → menu 3 chấm (góc phải) → "Cài đặt ứng dụng" hoặc "Thêm vào Màn hình chính".

## 3. Cài trên Windows 11 (Edge/Chrome)
Mở link trên → bấm icon "Cài đặt" trên thanh địa chỉ, hoặc menu → Ứng dụng →
"Cài đặt trang này như một ứng dụng".

## 4. Kiểm tra chuẩn PWA
DevTools (F12) → tab Lighthouse → chọn "Progressive Web App" → Analyze.

## Lưu ý
- File vẫn mở được bình thường qua double-click (`file://`), chạy offline hoàn toàn,
  không lỗi console liên quan service worker (script đăng ký service worker tự bỏ qua
  khi `location.protocol` là `file:`).
- Dữ liệu nghiệp vụ (chữ ký đã lưu, vị trí/kích thước chữ ký lần chỉnh gần nhất) lưu
  bằng `localStorage` ngay trong trình duyệt — không bị service worker cache hay can
  thiệp.
- `sw.js` chỉ cache tài nguyên tĩnh: `index.html`, `manifest.json`, 3 icon, và 2 file
  thư viện `pdf.js` (`pdf.min.js` + `pdf.worker.min.js`) tải từ cdnjs — để tính năng
  đọc/xử lý PDF vẫn hoạt động khi mở lại app ở chế độ offline sau lần mở đầu.
- Icon dùng đúng logo PAT đính kèm, nền màu xanh navy gốc của logo phủ kín toàn khung
  (đạt chuẩn maskable icon).

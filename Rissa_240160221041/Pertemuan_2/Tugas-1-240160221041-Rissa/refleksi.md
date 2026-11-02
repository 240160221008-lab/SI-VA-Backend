## Tiga Fitur P2 yang Paling Mengubah Cara Saya Menulis Kode:

1. Arrow Functions & Destructuring
   Penulisan sintaks menjadi jauh lebih ringkas dan bersih. Penggunaan 
   destructuring (seperti const { nama, status } = item) menghindari 
   pengulangan pemanggilan properti objek secara berulang-ulang, 
   sehingga membuat struktur kode lebih deklaratif.

2. Array Iteration Methods (map, filter, find)
   Menggantikan perulangan manual (for loop) dengan method deklaratif 
   seperti .filter() dan .find() membuat alur logika manipulasi data 
   jauh lebih mudah dibaca, meminimalkan bug indeks, serta menjaga kode 
   tetap bersih (clean code).

3. Async/Await dan Promises
   Memahami penanganan operasi asynchronous menggunakan async/await 
   serta Promise.all() memberikan pemahaman nyata bagaimana aplikasi 
   Node.js menangani I/O tanpa memblokir eksekusi utama (non-blocking).

Satu Hal yang Masih Membingungkan:

Hal yang masih membingungkan adalah mengelola penanganan error (error 
handling) pada arsitektur asynchronous yang kompleks, terutama ketika 
beberapa Promise dijalankan secara paralel melalui Promise.all(). Jika 
satu Promise mengalami kegagalan, strategi pembatalan atau fallback 
yang paling aman di tingkat produksi masih perlu dipelajari lebih dalam.
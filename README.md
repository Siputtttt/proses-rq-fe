# Vue.js Project

Ini adalah proyek Vue.js. Dokumentasi ini berisi langkah-langkah untuk mengkloning, menginstal dependensi, dan menjalankan proyek secara lokal.

### Persyaratan
Pastikan Anda telah menginstal hal berikut:
- [Node.js](https://nodejs.org/) (20.11.1)->versi yang digunakan untuk membuat lebih disarankan
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

### Tata Cara Clone dan Menjalankan Proyek

## 1. Clone Repository
Jalankan perintah berikut di terminal untuk mengkloning proyek:
`git clone https://github.com/Siputtttt/proses-rq-fe.git`

## 2. Install dependensi
  npm install
  # atau jika menggunakan yarn
  yarn install

## 3. Jalankan Project
  npm run serve
  # atau jika menggunakan yarn
  yarn serve

## 4. Akses link 
  tunggu beberapa saat setelah menjalan kan project, maka akan muncul `http://localhost:8080/` atau `http://localhost:5173/`


### Struktur project
  src/
  ├── assets/         # File aset seperti gambar
  ├── components/     # Komponen Vue.js
  ├── views/          # Halaman aplikasi
  ├── router/         # Konfigurasi rute aplikasi
  ├── store/          # State management 
  └── App.vue         # Komponen root

  pada bagian `store/index.js` saya menambahkan 2 BASE_URL tergantung dari bagaimana cara menjalankan API nya, jika menggunakan Docker maka gunakan `http://localhost:8080/` jika menggunakan artisan maka `http://127.0.0.1:8080/`

  ##jika ada kendala bisa hubungin nomer kontak yang tercantum

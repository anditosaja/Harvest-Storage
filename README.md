# 👨‍🌾Harvest-Storage👨‍🌾
Sistem RESTful API berbasis Node.js (Express) dan MongoDB yang mengelola inventaris data tanaman serta hasil panen menggunakan arsitektur modular MVC (*Model-View-Controller*):
1. Routes (`routes/`) = Routing endpoint HTTP & parameter dinamis
2. Controller (`controllers/`) = Logika bisnis CRUD, filter/pencarian, dan *error handling*
3. Model (`models/`) = Skema dan validasi struktur data koleksi MongoDB
4. Config (`config/`) = Pengaturan koneksi database MongoDB

Semua request dari client diproses melalui router Express sebelum berinteraksi dengan database.

## Arsitektur Sistem
Client mengakses data melalui alur modular MVC berikut:
`Client -> Routes -> Controller -> Model -> MongoDB`
### setiap request dilengkapi dengan validasi skema dan error handling (*try...catch*)

## Teknologi yang Digunakan
1. Node.js (ES6 Modules)
2. Express.js
3. MongoDB & Mongoose ODM
4. Dotenv
5. Nodemon
6. Git & GitHub
7. Postman
 
## Instalasi
Buka terminal dan masuk ke folder projek lalu instal:
``` bash
npm init -y
npm install express mongoose dotenv
npm install --save-dev nodemon
```

Pada *package.json*, pastikan baris `"type": "module"` dan `script "dev: nodemon index.js"` ditambahkan

## Konfigurasi dan Menjalankan Server
1. Buat `.env` di root directory proyek dengan isi environment variable misalnya seperti berikut:
   ``` bash
   `PORT=5000
   MONGO_URI=mongodb://127.0.0.1`
   ```
   (Ganti isi *MONGO_URI* dengan URL koneksi MongoDB Atlas atau MongoDB lokal)

3. Buat `.gitignore` agar `.env` dan `node_modules` tidak ikut ter-upload ke GitHub

4. Jalankan Server API
   - Mode Development (Nodemon):
     ``` bash
     npm run dev
     ```
   - Mode Production:
     ``` bash
     npm start
     ```
     Server berjalan di `http://localhost:5000`

## ENDPOINT API
Testing dapat dilakukan di Postman
1. Crops Service (/api/crops)

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| GET | /api/crops | Ambil semua data tanaman |
| GET | /api/crops?search=&?status= | Filter data tanaman berdasarkan query search dan status|
| GET | /api/crops/:id | Ambil 1 data tanaman berdasarkan ID |
| POST | /api/crops | Tambah data tanaman baru |
| PUT | /api/crops/:id | Update data tanaman berdasarkan ID |
| DELETE | /api/crops/:id | Hapus data tanaman berdasarkan ID |

### Contoh Request Body (Metode **POST & PUT**)
Kirim data dalam format JSON (Content-Type: application/json):
``` JSON
{
  "name": "Jamur merang",
  "category": "Jamur",
  "quantity": 5,
  "status": "Ditanam"
}
```

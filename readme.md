# Panties

---

Planties adalah super app untuk merawat tanaman, di dalam app ini terdapat AI untuk mengidentifikasi penyakit yang ada di daun. Planties akan mengingatkanmu untuk menyiram tanamanmu dan memperhitungkan apakah tanamanmu perlu disiram jika ada hujan. Selain itu, app ini dapat digunakan untuk chat dengan pakar, mengobrol dalam comunity, dan berberlanja tanaman serta alat tanam dan serba-serbi lainnya.

## Cara Install

---

1. Install dependencies yang diperlukan dapat menggunakan `yarn` atau `npm`

```:bash
yarn install
```

```:bash
npm install
```

2. Ubah file di vendor/tabler-icons-react-native/index.js

Pada saat repo ini dibuat, terdapat big dalam tabler icon yaitu nama IconsAmongus.js

3. Ubah import dari IconsAmongUs.js menjadi IconsAmongus.js
4. Jalankn di iOS
Dalam termunal, lalankan perintah
```:bash
cd ios
```

setelah itu, jalankan:

```:bash
pod install
```

5. Jalankan app dengan
Jika ingin menjalankan di android, maka jalankan perintah berikut di terminal
```:bash
npx react-native run-android
```
atau
Jika ingin menjalankan di iOS, maka jalankan perintah berikut di terminal
```:bash
npx react-native run-ios
```

<!-- 1. npm install
2. Change file on vendor/tabler-icons-react-native/index.js
3. Change import from IconsAmongUs.js to IconsAmongus.js
4. cd ios && pod install if using mac
5. npx react-native run-android / npx react-native run-ios -->

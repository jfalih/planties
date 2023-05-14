# Planties

**Team Berkah Ramadhan**
1. [Galih Akbar Nugraha](https://github.com/whoisgalih) - Hipster
2. [Jan Falih Fadhilah](https://github.com/jfalih) - Hacker 
3. [Muhammad Abiya Makruf](https://github.com/AbiyaMakruf) - Hustler

Planties adalah super app untuk merawat tanaman, di dalam app ini terdapat AI untuk mengidentifikasi penyakit yang ada di daun. Planties akan mengingatkanmu untuk menyiram tanamanmu dan memperhitungkan apakah tanamanmu perlu disiram jika terjadi hujan. Selain itu, app ini dapat digunakan untuk chat dengan pakar tanaman untuk mencari informasi mengenai tanamanmu, mengobrol dalam comunity, dan berberlanja tanaman serta alat tanam dan serba-serbi lainnya.

## Planties Tech Stack

Repository ini merupakan repository untuk front-end mobile yang dibuat menggunakan react native yang memiliki kemampuan cross platform iOS dan android. Berikut adalah link back-end:

Plant disease detection: [planties/planties-ai-dd](https://github.com/planties/planties-ai-dd)

## Build file

Build file adalah file yang dapat langusng diinstall di platform tertentu.

Untuk android, berikut adalah build file (.apk):


Untuk iOS, build file akan dibuat menyusul (.ipa):


## Cara menjalankan

1. Install dependencies yang diperlukan dapat menggunakan `yarn` atau `npm`

```:bash
yarn install
```

```:bash
npm install
```

2. Ubah file di vendor/tabler-icons-react-native/index.js

Pada saat repo ini dibuat, terdapat bug dalam tabler icon yaitu nama IconsAmongus.js

3. Ubah import dari IconsAmongUs.js menjadi IconsAmongus.js
4. Jalankan di iOS
Dalam terminal, lakukan perintah
```:bash
cd ios
```

setelah itu, jalankan:

```:bash
pod install
```

5. Jika ingin menjalankan di android, maka jalankan perintah berikut di terminal
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

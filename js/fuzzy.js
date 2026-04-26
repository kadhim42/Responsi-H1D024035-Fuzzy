function updateLabel() {
  document.getElementById("f1").innerText = document.getElementById("menunda").value;
  document.getElementById("f2").innerText = document.getElementById("distraksi").value;
  document.getElementById("f3").innerText = document.getElementById("motivasi").value;
}

// membership function
function segitiga(x, a, b, c) {
  if (x <= a || x >= c) return 0;
  if (x === b) return 1;
  if (x < b) return (x - a) / (b - a);
  return (c - x) / (c - b);
}

function kiri(x, a, b) {
  if (x <= a) return 1;
  if (x >= b) return 0;
  return (b - x) / (b - a);
}

function kanan(x, a, b) {
  if (x <= a) return 0;
  if (x >= b) return 1;
  return (x - a) / (b - a);
}
// main fuzzy
function hitungFuzzy() {

  let menunda = parseFloat(document.getElementById("menunda").value);
  let distraksi = parseFloat(document.getElementById("distraksi").value);
  let motivasi = parseFloat(document.getElementById("motivasi").value);

  // membership
  let m_ringan = kiri(menunda, 30, 60);
  let m_sedang = segitiga(menunda, 45, 60, 75);
  let m_berat = kanan(menunda, 60, 80);

  let d_ringan = kiri(distraksi, 30, 60);
  let d_sedang = segitiga(distraksi, 45, 60, 75);
  let d_berat = kanan(distraksi, 60, 80);

  let mo_rendah = kiri(motivasi, 30, 60);
  let mo_sedang = segitiga(motivasi, 45, 60, 75);
  let mo_tinggi = kanan(motivasi, 60, 80);

  // rule base (27 rule)
  let r = [];
  //tinggi
  r.push(Math.min(m_ringan, d_ringan, mo_rendah));
  r.push(Math.min(m_ringan, d_sedang, mo_rendah));
  r.push(Math.min(m_ringan, d_berat, mo_rendah));

  r.push(Math.min(m_sedang, d_ringan, mo_rendah));
  r.push(Math.min(m_sedang, d_sedang, mo_rendah));
  r.push(Math.min(m_sedang, d_berat, mo_rendah));

  r.push(Math.min(m_berat, d_ringan, mo_rendah));
  r.push(Math.min(m_berat, d_sedang, mo_rendah));
  r.push(Math.min(m_berat, d_berat, mo_rendah));

  r.push(Math.min(m_ringan, d_berat, mo_sedang));
  r.push(Math.min(m_sedang, d_berat, mo_sedang));
  r.push(Math.min(m_berat, d_berat, mo_sedang));

  //sedang
  r.push(Math.min(m_ringan, d_ringan, mo_sedang));
  r.push(Math.min(m_ringan, d_sedang, mo_sedang));

  r.push(Math.min(m_sedang, d_ringan, mo_sedang));
  r.push(Math.min(m_sedang, d_sedang, mo_sedang));

  r.push(Math.min(m_berat, d_ringan, mo_sedang));
  r.push(Math.min(m_berat, d_sedang, mo_sedang));

  r.push(Math.min(m_ringan, d_berat, mo_tinggi));
  r.push(Math.min(m_sedang, d_berat, mo_tinggi));
  r.push(Math.min(m_berat, d_berat, mo_tinggi));

  //rendah
  r.push(Math.min(m_ringan, d_ringan, mo_tinggi));
  r.push(Math.min(m_ringan, d_sedang, mo_tinggi));

  r.push(Math.min(m_sedang, d_ringan, mo_tinggi));
  r.push(Math.min(m_sedang, d_sedang, mo_tinggi));

  r.push(Math.min(m_berat, d_ringan, mo_tinggi));
  r.push(Math.min(m_berat, d_sedang, mo_tinggi));

  // defuzzifikasi
let z_total = 0;
let total = 0;

for (let i = 0; i < r.length; i++) {
  let bobot = 0;
  if (i < 12) bobot = 75 + (i % 3) * 10;
  else if (i < 21) bobot = 45 + (i % 3) * 10;
  else bobot = 20 + (i % 3) * 10;

  z_total += r[i] * bobot;
  total += r[i];
}

let z = total === 0 ? 0 : z_total / total;


  let kategori = "";
  let warna = "";

  if (z < 40) {
    kategori = "Rendah 😎";
    warna = "green";
  } else if (z < 70) {
    kategori = "Sedang 😐";
    warna = "orange";
  } else {
    kategori = "Tinggi 🚨";
    warna = "red";
  }

  document.getElementById("hasil").innerHTML =
    "Skor: " + z.toFixed(2) +
    "<br>Tingkat: <span style='color:" + warna + "'>" + kategori + "</span>";
}

// init
updateLabel();

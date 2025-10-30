document.addEventListener("DOMContentLoaded", () => {

  // ===== LOGIN PAGE =====
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const pass = document.getElementById("password").value.trim();

      const user = dataPengguna.find(
        u => u.email === email && u.password === pass
      );

      if (user) {
        alert(`Selamat datang, ${user.nama}!`);
        localStorage.setItem("namaPengguna", user.nama);
        window.location.href = "dashboard.html";
      } else {
        alert("Email atau password yang Anda masukkan salah!");
      }
    });
  }

  // ===== MODAL =====
  const modals = document.querySelectorAll(".modal");
  const closeBtns = document.querySelectorAll(".close");

  document.getElementById("forgotBtn")?.addEventListener("click", () => {
    document.getElementById("forgotModal").style.display = "block";
  });

  document.getElementById("registerBtn")?.addEventListener("click", () => {
    document.getElementById("registerModal").style.display = "block";
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modals.forEach(modal => modal.style.display = "none");
    });
  });

  window.onclick = (event) => {
    modals.forEach(modal => {
      if (event.target == modal) modal.style.display = "none";
    });
  };

  // ===== DASHBOARD GREETING =====
  const greeting = document.getElementById("greeting");
  if (greeting) {
    const hour = new Date().getHours();
    let waktu = "Pagi";
    if (hour >= 12 && hour < 18) waktu = "Siang";
    else if (hour >= 18) waktu = "Malam";
    const nama = localStorage.getItem("namaPengguna") || "Pengguna";
    greeting.textContent = `Selamat ${waktu}, ${nama}!`;
  }

 // ===== TRACKING =====
const trackingForm = document.getElementById("trackingForm");
if (trackingForm) {
  trackingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const noDO = document.getElementById("noDO").value.trim();
    const result = document.getElementById("trackingResult");

    const data = dataTracking[noDO];
    if (data) {
      let perjalananHTML = `<div class="timeline">`;
      data.perjalanan.forEach(p => {
        perjalananHTML += `
          <div class="timeline-item">
            <span class="material-icons">local_shipping</span>
            <div class="content">
              <b>${p.waktu}</b><br>${p.keterangan}
            </div>
          </div>
        `;
      });
      perjalananHTML += `</div>`;

      result.innerHTML = `
        <div class="tracking-card">
          <h3>Informasi Pengiriman</h3>
          <div class="tracking-info">
            <p><b>Nama:</b> ${data.nama}</p>
            <p><b>Nomor DO:</b> ${data.nomorDO}</p>
            <p><b>Status:</b> <span class="status">${data.status}</span></p>
            <p><b>Ekspedisi:</b> ${data.ekspedisi}</p>
            <p><b>Tanggal Kirim:</b> ${data.tanggalKirim}</p>
          </div>
          <h4 style="margin-top:20px;">Riwayat Perjalanan:</h4>
          ${perjalananHTML}
        </div>
      `;
    } else {
      result.innerHTML = `<p style="color:red; text-align:center;">Nomor DO tidak ditemukan.</p>`;
    }
  });
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}


  // ===== STOK BAHAN AJAR =====
  const stokTable = document.getElementById("stokTable");
  if (stokTable) {
    const tbody = stokTable.querySelector("tbody");

    // tampilkan dari dataBahanAjar
    dataBahanAjar.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.kodeLokasi}</td>
        <td>${item.kodeBarang}</td>
        <td>${item.namaBarang}</td>
        <td>${item.jenisBarang}</td>
        <td>${item.edisi}</td>
        <td>${item.stok}</td>
        <td>${item.cover}</td>
      `;
      tbody.appendChild(row);
    });

    // tambah stok baru via prompt
    document.getElementById("addRowBtn").addEventListener("click", () => {
      const kodeLokasi = prompt("Masukkan Kode Lokasi:");
      const kodeBarang = prompt("Masukkan Kode Barang:");
      const nama = prompt("Masukkan Nama Bahan Ajar:");
      const jenis = prompt("Masukkan Jenis Barang:");
      const edisi = prompt("Masukkan Edisi:");
      const stok = prompt("Masukkan Jumlah Stok:");
      const cover = prompt("Upload Cover Buku:");

      if (kodeLokasi && kodeBarang && nama && jenis && edisi && stok) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${kodeLokasi}</td>
          <td>${kodeBarang}</td>
          <td>${nama}</td>
          <td>${jenis}</td>
          <td>${edisi}</td>
          <td>${stok}</td>
          <td><img src="${cover}" alt="Cover Buku" width="60" height="80" style="object-fit: cover; border-radius: 5px;"></td>
        `;
        tbody.appendChild(newRow);
      } else {
        alert("Data tidak lengkap!");
      }
    });
  }
});

// ===== LOGOUT FUNCTION (global) =====
function logout() {
  // Hapus semua data localStorage (misalnya nama user)
  localStorage.clear();
  // Arahkan ke halaman login
  window.location.href = "index.html";
}


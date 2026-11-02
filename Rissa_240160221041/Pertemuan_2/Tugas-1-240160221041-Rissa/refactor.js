// ==========================================
// SEBELUM REFACTOR (Kode Warisan)
// ==========================================
/*
function cetakLaporanAbsensi(data, statusFilter) {
  var status = statusFilter;
  if (!statusFilter) {
    status = "Hadir";
  }
  var hasil = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].status === status) {
      hasil.push(data[i]);
    }
  }
  for (var j = 0; j < hasil.length; j++) {
    console.log("Mahasiswa " + hasil[j].nama + " memiliki status: " + hasil[j].status);
  }
  return hasil;
}
*/

// ==========================================
// SESUDAH REFACTOR (Modern ES6+)
// ==========================================
// 1. Arrow Function + 2. Default Value
const cetakLaporanAbsensi = (data = [], statusFilter = "Hadir") => {
  // 3. Array Method (filter)
  const hasil = data.filter((item) => item.status === statusFilter);

  hasil.forEach((item) => {
    // 4. Destructuring + 5. Template Literal
    const { nama, status } = item;
    console.log(`Mahasiswa ${nama} memiliki status: ${status}`);
  });

  return hasil;
};

module.exports = { cetakLaporanAbsensi };
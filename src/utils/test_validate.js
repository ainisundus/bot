const { validate } = require('./validate') // Sesuaikan dengan path sesuai struktur proyek Anda

async function manualValidateTest () {
  // Mendefinisikan objek decoded dengan informasi yang sesuai
  const tokenlog = {
    token: 'eyJhbGciOiJIUzI1NiJ9.UTdyZ0U5N0FXdmJ4ai14SQ.jkLMRpAo6T5cuZ6wvW7iZ6WM_2oLU3O0SGpJGUr5VPs'
  }

  // Memanggil fungsi validate secara manual
  const result = await validate(tokenlog, {}, {})
  // Karena request dan h tidak digunakan, Anda dapat melewatkan null untuk kedua parameter tersebut

  // Menampilkan hasil dari fungsi validate
  console.log(result)
}

// Memanggil fungsi untuk melakukan pengujian secara manual
manualValidateTest()

// tutaj wszystkie funkcje requestujace strapi REST API
export async function getDistrcts() {
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/powiaty/powiaty-medium.geojson'
    )
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error('Nie udało się pobrać danych o powiatach.')
  }
}
const token = process.env.NEXT_PUBLIC_TOKEN

export async function getListOfSchool() {
  try {
    const url = `http://localhost:1337/api/lista-szkols?populate[0]=lokalizacja_szkoly&populate[1]=lista_kierunkow&populate[2]=lista_kierunkow.kierunek&populate[3]=lista_kierunkow.kierunek.zdjecie&populate[4]=rodzaje_szkoly&populate[5]=rodzaje_szkoly.liceum&populate[6]=rodzaje_szkoly.liceum.zdjecia_rodzaju&populate[7]=rodzaje_szkoly.technikum&populate[8]=rodzaje_szkoly.technikum.zdjecia_rodzaju&populate[9]=rodzaje_szkoly.szkola_zawodowa&populate[10]=rodzaje_szkoly.szkola_zawodowa.zdjecia_rodzaju&populate[11]=glowne_zdjecie_szkoly&populate[12]=glowna_galeria_zdjec_szkoly`

    const headers = {
      method: 'GET', // or "POST", "PUT", etc., depending on the API method
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token
        'Content-Type': 'application/json', // Set the content type to JSON (optional)
      },
    }

    const res = await fetch(url, headers)

    const jsonResponse = await res.json()

    // console.log(jsonResponse)
    return jsonResponse
  } catch (error) {
    console.log(error)
    return null
  }
}

// todo rename or reuse
// export async function getSchoolInfo(documentId) {
//   try {
//     const url = `http://localhost:1337/api/lista-szkols/${documentId}?populate[0]=lokalizacja_szkoly&populate[1]=lista_kierunkow&populate[2]=lista_kierunkow.kierunek&populate[3]=lista_kierunkow.kierunek.zdjecie&populate[4]=rodzaje_szkoly&populate[5]=rodzaje_szkoly.liceum&populate[6]=rodzaje_szkoly.liceum.zdjecia_rodzaju&populate[7]=rodzaje_szkoly.technikum&populate[8]=rodzaje_szkoly.technikum.zdjecia_rodzaju&populate[9]=rodzaje_szkoly.szkola_zawodowa&populate[10]=rodzaje_szkoly.szkola_zawodowa.zdjecia_rodzaju&populate[11]=glowne_zdjecie_szkoly&populate[12]=glowna_galeria_zdjec_szkoly`

//     const headers = {
//       method: 'GET', // or "POST", "PUT", etc., depending on the API method
//       headers: {
//         Authorization: `Bearer ${token}`, // Include the Bearer token
//         'Content-Type': 'application/json', // Set the content type to JSON (optional)
//       },
//     }

//     const res = await fetch(url, headers)

//     const jsonResponse = await res.json()

//     // console.log(jsonResponse)
//     return jsonResponse
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }
export async function fetchSchoolInfo(documentId) {
  // const url = `http://localhost:1337/api/lista-szkols/szspld1dk1oqckcwddi25tzp?populate[0]=lista_kierunkow&populate[1]=lista_kierunkow.kierunek`
  try {
    const url = `http://localhost:1337/api/lista-szkols/${documentId}?populate[0]=lista_kierunkow&populate[1]=lista_kierunkow.kierunek`

    const headers = {
      method: 'GET', // or "POST", "PUT", etc., depending on the API method
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token
        'Content-Type': 'application/json', // Set the content type to JSON (optional)
      },
    }

    const res = await fetch(url, headers)

    const jsonResponse = await res.json()

    // console.log(jsonResponse)
    return jsonResponse
  } catch (error) {
    console.log(error)
    return null
  }
}

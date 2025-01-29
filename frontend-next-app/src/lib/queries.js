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
const token =
  '1991e73696a42414b246ceb24cfdcc0685d8634c54cfe8013c5239721b8a94f64e27f96be90f2a85b4f7a37e309e6d1ea59533a848f7184686fc3c42a2f3411e451d9bb736ba4054178f3222854cde1d02cefb2c66e7cc75b893e792d7da0aa789bd4ebe809b28887c2f2b7f30084080f10b62e3829ed4fa4f15b9391487264e'

export async function getSchoolInfo(documentId) {
  try {
    const url = `http://localhost:1337/api/lista-szkols/${documentId}?populate[0]=lokalizacja_szkoly&populate[1]=lista_kierunkow&populate[2]=lista_kierunkow.kierunek&populate[3]=lista_kierunkow.kierunek.zdjecie&populate[4]=rodzaje_szkoly&populate[5]=rodzaje_szkoly.liceum&populate[6]=rodzaje_szkoly.liceum.zdjecia_rodzaju&populate[7]=rodzaje_szkoly.technikum&populate[8]=rodzaje_szkoly.technikum.zdjecia_rodzaju&populate[9]=rodzaje_szkoly.szkola_zawodowa&populate[10]=rodzaje_szkoly.szkola_zawodowa.zdjecia_rodzaju`

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

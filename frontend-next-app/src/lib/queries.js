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

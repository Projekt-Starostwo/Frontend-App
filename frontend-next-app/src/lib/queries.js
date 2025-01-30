// tutaj wszystkie funkcje requestujace strapi REST API
export async function getDistrcts() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/powiaty/powiaty-medium.geojson"
    );
    const json = await res.json();
    return json;
  } catch (error) {
    throw new Error("Nie udało się pobrać danych o powiatach.");
  }
}
const token =
  "46d217f3b4e1874368d2a9890c4a4caddcf536ec7b42b4e01655b9152fa7fda79552b5f7a901a28966adde1db15df1f75e63a2f7579aa6eb041afdfba6d42e7d2a0edd7e42a1fadec1516132c9d1117aad77b12e838104636b2a11a5436025c65d6bcb2dabd331ee2f0e6ef8bff6ec86bf53f217977801e8109461ed2ee0689c";

export async function getSchoolInfo(documentId) {
  try {
    const url = `http://localhost:1337/api/lista-szkols/${documentId}?populate[0]=lokalizacja_szkoly&populate[1]=lista_kierunkow&populate[2]=lista_kierunkow.kierunek&populate[3]=lista_kierunkow.kierunek.zdjecie&populate[4]=rodzaje_szkoly&populate[5]=rodzaje_szkoly.liceum&populate[6]=rodzaje_szkoly.liceum.zdjecia_rodzaju&populate[7]=rodzaje_szkoly.technikum&populate[8]=rodzaje_szkoly.technikum.zdjecia_rodzaju&populate[9]=rodzaje_szkoly.szkola_zawodowa&populate[10]=rodzaje_szkoly.szkola_zawodowa.zdjecia_rodzaju&populate[11]=glowne_zdjecie_szkoly&populate[12]=glowna_galeria_zdjec_szkoly`;

    const headers = {
      method: "GET", // or "POST", "PUT", etc., depending on the API method
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token
        "Content-Type": "application/json", // Set the content type to JSON (optional)
      },
    };

    const res = await fetch(url, headers);

    const jsonResponse = await res.json();

    // console.log(jsonResponse)
    return jsonResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function fetchSchoolInfo(documentId) {
  // const url = `http://localhost:1337/api/lista-szkols/szspld1dk1oqckcwddi25tzp?populate[0]=lista_kierunkow&populate[1]=lista_kierunkow.kierunek`
  try {
    const url = `http://localhost:1337/api/lista-szkols/${documentId}?populate[0]=lista_kierunkow&populate[1]=lista_kierunkow.kierunek`;

    const headers = {
      method: "GET", // or "POST", "PUT", etc., depending on the API method
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token
        "Content-Type": "application/json", // Set the content type to JSON (optional)
      },
    };

    const res = await fetch(url, headers);

    const jsonResponse = await res.json();

    // console.log(jsonResponse)
    return jsonResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
}

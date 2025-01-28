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
const token = process.env.TOKEN;

export async function getSchoolInfo(documentId) {
  try {
    const url = `http://localhost:1337/api/lista-szkols/${documentId}`;

    const headers = {
      method: "GET", // or "POST", "PUT", etc., depending on the API method
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token
        "Content-Type": "application/json", // Set the content type to JSON (optional)
      },
    };

    const res = await fetch(url, headers);

    const jsonResponse = await res.json();

    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
}

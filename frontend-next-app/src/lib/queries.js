// tutaj wszystkie funkcje API

const token = process.env.NEXT_PUBLIC_TOKEN
import qs from 'qs'
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

export async function getSchoolDetails(skrot_szkoly) {
  const queryParams = {
    filters: {
      skrot_szkoly: {
        $eq: skrot_szkoly,
      },
    },
    populate: {
      glowne_zdjecie_szkoly: {
        fields: ['*'],
      },
      glowna_galeria_zdjec_szkoly: {
        fields: ['*'],
      },
      lokalizacja_szkoly: {
        fields: ['dlugosc_geograficzna_szkoly', 'szerokosc_geograficzna_szkoly'],
      },
      lokalizacja_szkoly: {
        fields: ['dlugosc_geograficzna_szkoly', 'szerokosc_geograficzna_szkoly'],
      },
      lista_kierunkow: {
        populate: {
          kierunek: {
            fields: ['nazwa_kierunku', 'opis_kierunku', 'typ_kierunku'],
          },
        },
      },
      rodzaje_szkoly: {
        populate: {
          liceum: {
            fields: ['opis'],
          },
          technikum: {
            fields: ['opis'],
          },
          szkola_zawodowa: {
            fields: ['opis'],
          },
        },
      },
    },
  }
  const queryParamsString = qs.stringify(queryParams)

  try {
    const url = `http://localhost:1337/api/lista-szkols?${queryParamsString}`
    const headers = {
      method: 'GET', // or "POST", "PUT", etc., depending on the API method
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token
        'Content-Type': 'application/json', // Set the content type to JSON (optional)
      },
    }

    const res = await fetch(url, headers)
    const jsonResponse = await res.json()
    console.log(jsonResponse)
    return jsonResponse.data[0]
  } catch (error) {
    console.log(error)
    return null
  }
}
export default async function getKierunekInfo(skrot_szkoly, nazwa_kierunku) {
  const queryParams = qs.stringify({
    filters: {
      skrot_szkoly: {
        $eq: skrot_szkoly,
      },
    },
    populate: {
      lista_kierunkow: {
        filters: {
          kierunek: {
            nazwa_kierunku: {
              $eq: nazwa_kierunku,
            },
          },
        },
        populate: {
          kierunek: {
            fields: ['nazwa_kierunku', 'opis_kierunku', 'typ_kierunku'],
          },
        },
      },
    },
  })

  try {
    const url = `http://localhost:1337/api/lista-szkols?${queryParams}`

    const headers = {
      method: 'GET', // or "POST", "PUT", etc., depending on the API method
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token
        'Content-Type': 'application/json', // Set the content type to JSON (optional)
      },
    }

    const res = await fetch(url, headers)
    const jsonResponse = await res.json()

    return jsonResponse.data[0].lista_kierunkow[0].kierunek
  } catch (error) {
    console.log(error)
    return null
  }
}

// tutaj wszystkie funkcje API
'use server'
export async function getPosthogEnv() {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

  console.log('POSTHOG KEY', posthogKey)
  console.log('POSTHOG HOST', posthogHost)
  return { posthogKey, posthogHost }
}

const token = process.env.TOKEN
const base_api_url = process.env.CMS_URL

import qs from 'qs'
import { normalizeString, tryCatch } from './utils'
import { marked } from 'marked'

export async function getCmsUrl() {
  return base_api_url
}

export async function getListOfSchool() {
  console.log('ENV STRAPI TOKEN', token)
  console.log('base api url = ', base_api_url)

  console.log('getListOfSchools')
  const queryParams = qs.stringify({
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
      rodzaje_szkoly: {
        populate: {
          liceum: {
            fields: ['*'],
            populate: {
              lista_kierunkow: {
                populate: {
                  kierunek: {
                    fields: ['*'],
                    populate: {
                      glowne_zdjecie: {
                        fields: ['*'],
                      },
                      galeria: {
                        fields: ['*'],
                      },
                    },
                  },
                },
              },
            },
          },
          technikum: {
            fields: ['*'],
            populate: {
              lista_kierunkow: {
                populate: {
                  kierunek: {
                    fields: ['*'],
                    populate: {
                      glowne_zdjecie: {
                        fields: ['*'],
                      },
                      galeria: {
                        fields: ['*'],
                      },
                    },
                  },
                },
              },
            },
          },
          szkola_zawodowa: {
            fields: ['*'],
            populate: {
              lista_kierunkow: {
                populate: {
                  kierunek: {
                    fields: ['*'],
                    populate: {
                      glowne_zdjecie: {
                        fields: ['*'],
                      },
                      galeria: {
                        fields: ['*'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  const url = `${base_api_url}/api/lista-szkols?${queryParams}`

  const headers = {
    method: 'GET', // or "POST", "PUT", etc., depending on the API method
    headers: {
      Authorization: `Bearer ${token}`, // Include the Bearer token
      'Content-Type': 'application/json', // Set the content type to JSON (optional)
    },
  }
  const res = await tryCatch(fetch(url, headers))

  if (!res.data) {
    console.log('error fetching listOfSchools')
    console.log(res)
    let error = new Error('Błąd połączenia z serwerem')
    error.statusCode = 500
    throw error
  }

  const jsonResponse = await tryCatch(res.data.json())

  if (!jsonResponse.data) {
    console.log('failed to parse response - ', jsonResponse.error)
    let error = new Error('Błąd połączenia z serwerem')
    error.statusCode = res.data.status
    throw error
  }

  return jsonResponse.data
}

export async function getSchoolDetails(skrot_szkoly) {
  console.log('fire getSchoolDetails for ', skrot_szkoly)
  const queryParams = qs.stringify({
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

      rodzaje_szkoly: {
        populate: {
          liceum: {
            fields: ['*'],
            populate: {
              lista_kierunkow: {
                populate: {
                  kierunek: {
                    fields: ['*'],
                    populate: {
                      glowne_zdjecie: {
                        fields: ['*'],
                      },
                      galeria: {
                        fields: ['*'],
                      },
                    },
                  },
                },
              },
            },
          },
          technikum: {
            fields: ['*'],
            populate: {
              lista_kierunkow: {
                populate: {
                  kierunek: {
                    fields: ['*'],
                    populate: {
                      glowne_zdjecie: {
                        fields: ['*'],
                      },
                      galeria: {
                        fields: ['*'],
                      },
                    },
                  },
                },
              },
            },
          },
          szkola_zawodowa: {
            fields: ['*'],
            populate: {
              lista_kierunkow: {
                populate: {
                  kierunek: {
                    fields: ['*'],
                    populate: {
                      glowne_zdjecie: {
                        fields: ['*'],
                      },
                      galeria: {
                        fields: ['*'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  const url = `${base_api_url}/api/lista-szkols?${queryParams}`
  const headers = {
    method: 'GET', // or "POST", "PUT", etc., depending on the API method
    headers: {
      Authorization: `Bearer ${token}`, // Include the Bearer token
      'Content-Type': 'application/json', // Set the content type to JSON (optional)
    },
  }

  const res = await tryCatch(fetch(url, headers))
  // console.log(res)
  if (!res.data.ok) {
    console.log(res)
    console.log(res.error)
    let error = new Error('Błąd połączenia z serwerem')
    error.statusCode = res.data.status
    throw error
  }

  const jsonResponse = await tryCatch(res.data.json())

  if (!jsonResponse.data) {
    console.log('failed to parse response - ', jsonResponse.error)
    let error = new Error('Błąd połączenia z serwerem')
    error.statusCode = res.data.status
    throw error
  }

  if (jsonResponse.data.length === 0) {
    console.log('404, nie znaleziono szkoly', res, jsonResponse, school)
    let error = new Error('Nie znaleziono szkoły')
    error.statusCode = 404
    throw error
  }
  console.log('jsonResponse', jsonResponse.data)
  const school = jsonResponse.data.data[0]
  // await sleep(2000)
  console.log('school', school)
  // optional formating md file from db, (needs improvments)
  if (school.rodzaje_szkoly.liceum && school.rodzaje_szkoly.liceum.opis_typu_szkoly) {
    school.rodzaje_szkoly.liceum.opis_typu_szkoly = marked.parse(school.rodzaje_szkoly.liceum.opis_typu_szkoly)
  }
  console.log('school', school)
  return school
}
export default async function getKierunekInfo(skrot_szkoly, nazwa_kierunku) {
  console.log('ENV STRAPI TOKEN', token)
  console.log('base api url = ', base_api_url)

  const typySzkol = ['liceum', 'technikum', 'szkola_zawodowa']

  const typySzkolParams = typySzkol.map((typ) => {
    const populatedObject = {
      populate: {
        lista_kierunkow: {
          populate: {
            kierunek: {
              fields: ['*'],
              populate: {
                glowne_zdjecie: {
                  fields: ['*'],
                },
                galeria: {
                  fields: ['*'],
                },
                umiejetnosci: {
                  fields: ['*'],
                },
                praca: {
                  fields: ['*'],
                },
                warunki_pracy: {
                  fields: ['*'],
                },
                cechy_ludzkie_dla_kierunku: {
                  fields: ['*'],
                },
                mozliwosci_rozwoju: {
                  fields: ['*'],
                },
              },
            },
          },
        },
      },
    }
    return { [typ]: populatedObject }
  })

  // sleep(2000)
  const queryParams = qs.stringify({
    filters: {
      skrot_szkoly: {
        $eq: skrot_szkoly,
      },
    },
    populate: {
      rodzaje_szkoly: {
        populate: {
          liceum: {
            ...typySzkolParams[0].liceum,
          },
          technikum: {
            ...typySzkolParams[1].technikum,
          },
          szkola_zawodowa: {
            ...typySzkolParams[2].szkola_zawodowa,
          },
        },
      },
    },
  })

  const url = `${base_api_url}/api/lista-szkols?${queryParams}`

  const headers = {
    method: 'GET', // or "POST", "PUT", etc., depending on the API method
    headers: {
      Authorization: `Bearer ${token}`, // Include the Bearer token
      'Content-Type': 'application/json', // Set the content type to JSON (optional)
    },
  }

  const res = await tryCatch(fetch(url, headers))

  if (!res.data.ok) {
    console.log('error fetching school details')
    console.log(res.error)
    let error = new Error('Błąd połączenia z serwerem')
    error.statusCode = res.data.status
    throw error
  }

  const jsonResponse = await tryCatch(res.data.json())

  if (!jsonResponse.data) {
    console.log('failed to parse response - ', jsonResponse.error)
    let error = new Error('Błąd połączenia z serwerem')
    error.statusCode = res.data.status
    throw error
  }

  // Ensure data structure is as expected
  if (!jsonResponse.data?.data?.length || !jsonResponse.data.data[0]?.rodzaje_szkoly) {
    let error = new Error('Nieprawidłowa odpowiedź z serwera')
    error.statusCode = 500
    throw error
  }
  const rodzajeSzkoly = jsonResponse.data.data[0].rodzaje_szkoly

  const foundKierunek = findKierunekByName(rodzajeSzkoly, nazwa_kierunku)
  console.log(foundKierunek)

  if (!foundKierunek) {
    let error = new Error('Nie znaleziono kierunku')
    error.statusCode = 404
    throw error
  }
  foundKierunek.kierunek.opis_kierunku = marked.parse(foundKierunek.kierunek.opis_kierunku)

  return foundKierunek.kierunek
}

function findKierunekByName(rodzajeSzkoly, nazwa_kierunku) {
  const possibleKeys = ['liceum', 'technikum', 'szkola_zawodowa']

  // Normalize the search term
  const cleanSearchTerm = normalizeString(nazwa_kierunku)
  // console.log('clean search', cleanSearchTerm)

  for (const key of possibleKeys) {
    if (rodzajeSzkoly[key]?.lista_kierunkow?.length) {
      const kierunek = rodzajeSzkoly[key].lista_kierunkow.find((item) => {
        const itemNazwaKierunku = item.kierunek?.nazwa_kierunku
        // console.log('item nazwa', normalizeString(itemNazwaKierunku))
        // console.log(cleanSearchTerm)
        // console.log(normalizeString(itemNazwaKierunku) === cleanSearchTerm)
        return itemNazwaKierunku && normalizeString(itemNazwaKierunku) === cleanSearchTerm
      })
      if (kierunek) {
        return kierunek
      }
    }
  }

  return null
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

// tutaj wszystkie funkcje API

const token = process.env.NEXT_PUBLIC_TOKEN
import qs from 'qs'
export async function getListOfSchool() {
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

    // console.log(jsonResponse)
    return jsonResponse
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getSchoolDetails(skrot_szkoly) {
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

    if (!res.ok) {
      let error = new Error('Błąd połączenia z serwerem')
      error.statusCode = res.status
      throw error
    }

    const jsonResponse = await res.json()
    // console.log(jsonResponse)

    // await sleep(2000)

    if (jsonResponse.data.length === 0) {
      let error = new Error('Nie znaleziono szkoły')
      error.statusCode = 404
      throw error
    }

    return jsonResponse.data[0]
  } catch (error) {
    console.log(error)
    throw error
  }
}
export default async function getKierunekInfo(skrot_szkoly, nazwa_kierunku) {
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
                lista_kwalifikacji: {
                  populate: {
                    kwalifikacja: {
                      fields: ['*'],
                    },
                  },
                },
                lista_zawodow: {
                  populate: {
                    zawod: {
                      fields: ['*'],
                      populate: {
                        zdjecie_zawodu: {
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

    if (!res.ok) {
      let error = new Error('Błąd połączenia z serwerem')
      error.statusCode = res.status
      throw error
    }

    const jsonResponse = await res.json()
    const rodzajeSzkoly = jsonResponse.data[0].rodzaje_szkoly

    const foundKierunek = findKierunekByName(rodzajeSzkoly, nazwa_kierunku)

    if (!foundKierunek) {
      let error = new Error('Nie znaleziono kierunku')
      error.statusCode = 404
      throw error
    }

    return foundKierunek.kierunek
  } catch (error) {
    console.error('Error fetching kierunek info:', error)
    throw error
  }
}

function findKierunekByName(rodzajeSzkoly, nazwa_kierunku) {
  const possibleKeys = ['liceum', 'technikum', 'szkola_zawodowa']

  const lowerCaseNazwaKierunku = nazwa_kierunku.toLowerCase() // Convert search term to lowercase

  for (const key of possibleKeys) {
    if (rodzajeSzkoly[key] && rodzajeSzkoly[key].lista_kierunkow && rodzajeSzkoly[key].lista_kierunkow.length > 0) {
      const kierunek = rodzajeSzkoly[key].lista_kierunkow.find((item) => {
        const itemNazwaKierunku = item.kierunek?.nazwa_kierunku
        return (
          itemNazwaKierunku && // Check if itemNazwaKierunku exists
          itemNazwaKierunku.toLowerCase() === lowerCaseNazwaKierunku
        )
      })
      if (kierunek) {
        return kierunek
      }
    }
  }

  return null
}
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

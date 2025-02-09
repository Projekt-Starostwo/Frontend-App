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

    console.log(jsonResponse)
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
      rodzaje_szkoly: {
        populate: {
          liceum: {
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
    // console.log(jsonResponse.data[0].rodzaje_szkoly.liceum.lista_kierunkow[0].kierunek)

    const possibleKeys = ['liceum', 'technikum', 'szkola_zawodowa']
    let kierunek = null

    for (const key of possibleKeys) {
      if (jsonResponse.data[0].rodzaje_szkoly && jsonResponse.data[0].rodzaje_szkoly[key]) {
        kierunek = jsonResponse.data[0].rodzaje_szkoly[key].lista_kierunkow[0].kierunek
        break // Stop iterating once you find a valid key
      }
    }

    console.log(kierunek) // Output: Liceum Kierunek (or the value from the found key)
    return kierunek
  } catch (error) {
    console.log(error)
    return null
  }
}

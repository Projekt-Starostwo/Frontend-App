const cheerio = require('cheerio')
const fs = require('fs')
import { PRZYSTANKI_MMZ } from '../frontend-next-app/src/lib/przystankiMmz'
async function getData(przystanekId) {
  //   console.log(PRZYSTANKI_MMZ)

  const res = await fetch(`https://minsk-maz.trapeze.fi/vm/main?command=planner&action=sd&id=${przystanekId}`, {
    method: 'GET',
    mode: 'no-cors',
  })
  const html = await res.text()
  try {
    const $ = cheerio.load(html)

    const lineElements = $('span.label-line')

    const lineNumbers = lineElements.map((i, el) => $(el).text()).get()

    const sliced = lineNumbers.map((num) => {
      return num.slice(0, 2)
    })

    return sliced
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

// getData()
async function scrapeDataFromApiWithNoAuth() {
  const promises = PRZYSTANKI_MMZ.map(async (przystanek) => {
    const oznaczeniaPrzystanku = await getData(przystanek.id)
    // console.log(przystanek.name, oznaczeniaPrzystanku)

    const oznaczonyPrzystanek = {
      ...przystanek,
      oznaczenia: [...oznaczeniaPrzystanku],
    }

    // console.log(oznaczonyPrzystanek)
    return oznaczonyPrzystanek
  })

  const result = await Promise.all(promises)
  console.log(result)

  const filePath = './przystankiMmz.json'
  try {
    const jsonData = JSON.stringify(result, null, 2)

    await fs.promises.writeFile(filePath, jsonData, 'utf8')

    console.log(`Data written to ${filePath}`)
  } catch (error) {
    console.error('Error writing to file:', error)
  }
}

scrapeDataFromApiWithNoAuth()

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCmsUrl } from "./queries";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export async function appedDomain(url) {
  const cms = await getCmsUrl(url);
  console.log("CMS RES ", cms);
  console.log("FETCHING", `http://${cms}${url}`);
  return `http://${cms}${url}`;
}

export function slugify(text) {
  if (!text) return "";

  const normalizedText = normalizeString(text);

  return normalizedText
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function deslugify(slug) {
  if (!slug) return "";
  return slug.replace(/-/g, " "); // Replace all hyphens with spaces
}

// use this function to avoid using try catch thats not comfortable
export async function tryCatch(promise) {
  try {
    const data = await promise;
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export function normalizeString(str) {
  if (!str) {
    return "";
  }

  let normalizedStr = str.toLowerCase();

  for (const char in transliterationMap) {
    const regex = new RegExp(char, "g");
    normalizedStr = normalizedStr.replace(regex, transliterationMap[char]);
  }

  normalizedStr = normalizedStr
    .replace(/- /g, "")
    .trim()
    .replace(/[^a-z0-9\s]/g, ""); // Remove any remaining non-ASCII characters

  return normalizedStr;
}

const transliterationMap = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
  Ą: "A",
  Ć: "C",
  Ę: "E",
  Ł: "L",
  Ń: "N",
  Ó: "O",
  Ś: "S",
  Ź: "Z",
  Ż: "Z",
};
// export function findKierunekByName(rodzajeSzkoly, nazwa_kierunku) {
//   const possibleKeys = ['liceum', 'technikum', 'szkola_zawodowa']

//   // Normalize the search term
//   const cleanSearchTerm = normalizeString(nazwa_kierunku)
//   // console.log('clean search', cleanSearchTerm)

//   for (const key of possibleKeys) {
//     if (rodzajeSzkoly[key]?.lista_kierunkow?.length) {
//       const kierunek = rodzajeSzkoly[key].lista_kierunkow.find((item) => {
//         const itemNazwaKierunku = item.kierunek?.nazwa_kierunku
//         // console.log('item nazwa', normalizeString(itemNazwaKierunku))
//         // console.log(cleanSearchTerm)
//         // console.log(normalizeString(itemNazwaKierunku) === cleanSearchTerm)
//         return itemNazwaKierunku && normalizeString(itemNazwaKierunku) === cleanSearchTerm
//       })
//       if (kierunek) {
//         return kierunek
//       }
//     }
//   }

//   return null
// }
export function findKierunekByName(rodzajeSzkoly, nazwa_kierunku) {
  const possibleKeys = ["liceum", "technikum", "szkola_zawodowa"];

  // Normalize the search term
  const cleanSearchTerm = normalizeString(nazwa_kierunku);
  // console.log('clean search', cleanSearchTerm)

  for (const key of possibleKeys) {
    if (rodzajeSzkoly[key]?.lista_kierunkow?.length) {
      const kierunek = rodzajeSzkoly[key].lista_kierunkow.find((item) => {
        const itemNazwaKierunku = item.kierunek?.nazwa_kierunku;
        // console.log('item nazwa', normalizeString(itemNazwaKierunku))
        // console.log(cleanSearchTerm)
        // console.log(normalizeString(itemNazwaKierunku) === cleanSearchTerm)
        return (
          itemNazwaKierunku &&
          normalizeString(itemNazwaKierunku) === cleanSearchTerm
        );
      });
      if (kierunek) {
        return {
          ...kierunek,
          type: key, // Add the key indicating which type was hit
        };
      }
    }
  }

  return null;
}

export function getPolishPlural(number, singular, plural1, plural2) {
  if (number === 1) return singular;
  
  const lastTwoDigits = number % 100;
  const lastDigit = number % 10;
  
  if (lastTwoDigits >= 12 && lastTwoDigits <= 14) {
    return plural2;
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return plural1;
  }
  
  return plural2;
}

export function extractAndRemoveSchoolLinks(text) {
  // Regex:
  // Dowiedź się więcej - matches the literal phrase
  // \s+ - matches one or more spaces
  // ( - starts a capturing group (this will be our URL)
  //   https?:\/\/ - matches "http://" or "https://""
  //   (?:programisci\.zs1mm\.edu\.pl\/|ti\.zs1mm\.edu\.pl\/) - non-capturing group for the two specific domains
  // ) - ends the capturing group
  const regex =
    /Dowiedź się więcej\s+(https?:\/\/(?:programisci\.zs1mm\.edu\.pl\/|ti\.zs1mm\.edu\.pl\/))/;

  let fullPhraseWithLink = null;
  let justTheUrl = null;
  let modifiedText = text;

  const match = regex.exec(text);

  if (match) {
    fullPhraseWithLink = match[0]; // The whole matched string "Dowiedź się więcej https://..."
    justTheUrl = match[1]; // Only the URL part, e.g., "https://programisci.zs1mm.edu.pl/"

    // Remove the matched part from the original text
    modifiedText = text.replace(fullPhraseWithLink, "").trim();
  }

  return { fullPhraseWithLink, justTheUrl, modifiedText };
}

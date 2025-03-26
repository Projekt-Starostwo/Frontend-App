// // Save this script as e.g., fetch_polylines.js
// import fs from 'fs'
// import fetch from 'node-fetch'

// // --- Configuration ---
// const inputFilename = 'ordered_routes.json' // Input file with ordered stops per route
// const outputFilename = 'polylines.json' // Output file for generated polylines
// const OSRM_BASE_URL = 'http://router.project-osrm.org/route/v1/driving/' // OSRM API endpoint

// // NEW: Define mapping for marker images based on the base line name (M1, M2, etc.)
// // Adapt these paths/names as needed for your frontend component
// const baseLineMarkerImages = {
//   M1: '/pictures/m1pin.png',
//   M2: '/pictures/m2pin.png',
//   M3: '/pictures/m3pin.png',
//   M4: '/pictures/m4pin.png',
//   // Add B1, B3, B4 if you process them later, e.g.:
//   // "B1": "/pictures/b1kwpin.png",
//   // "B3": "/pictures/b3pin.png",
//   // "B4": "/pictures/b4pin.png",
//   DEFAULT: '/pictures/default-pin.png', // Fallback image if line name doesn't match
// }

// // --- Helper Function to Fetch Route from OSRM ---
// // (This function remains the same as before)
// async function fetchRoutePolyline(routeId, orderedStops) {
//   console.log(`\nAttempting to fetch polyline for: ${routeId}`)

//   if (!orderedStops || orderedStops.length < 2) {
//     console.error(`Error (${routeId}): Not enough stops provided (${orderedStops?.length || 0}). Cannot fetch route.`)
//     return { routeId, success: false, error: 'Not enough stops provided.' }
//   }

//   // 1. Format Waypoints for OSRM (longitude,latitude;...)
//   const waypointsString = orderedStops
//     .map((stop) => {
//       if (stop.lat == null || stop.lon == null || isNaN(stop.lat) || isNaN(stop.lon)) {
//         console.warn(`WARNING (${routeId}): Skipping invalid coordinates for stop "${stop.name || stop.id}":`, {
//           lat: stop.lat,
//           lon: stop.lon,
//         })
//         return null
//       }
//       return `${stop.lon},${stop.lat}`
//     })
//     .filter((coord) => coord !== null)
//     .join(';')

//   if (waypointsString.split(';').length < 2) {
//     console.error(
//       `Error (${routeId}): Not enough *valid* waypoints after filtering (${
//         waypointsString.split(';').length
//       }). Cannot fetch route.`
//     )
//     return { routeId, success: false, error: 'Not enough valid waypoints.' }
//   }

//   // 2. Construct the Full API URL
//   const apiUrl = `${OSRM_BASE_URL}${waypointsString}?overview=full&geometries=geojson`

//   try {
//     // 3. Make the Fetch Request
//     const response = await fetch(apiUrl)

//     if (!response.ok) {
//       const errorText = await response.text()
//       throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}. Body: ${errorText}`)
//     }

//     const data = await response.json()

//     // 4. Process the Response
//     if (data.code !== 'Ok') {
//       throw new Error(`OSRM API Error: ${data.code} - ${data.message || 'No message provided.'}`)
//     }

//     if (!data.routes || data.routes.length === 0 || !data.routes[0].geometry || !data.routes[0].geometry.coordinates) {
//       throw new Error('OSRM response did not contain valid route geometry.')
//     }

//     const osrmCoordinates = data.routes[0].geometry.coordinates
//     const leafletCoordinates = osrmCoordinates.map((coord) => [coord[1], coord[0]]) // [lat, lon]

//     console.log(`Successfully fetched route for ${routeId}. Polyline points: ${leafletCoordinates.length}`)

//     return {
//       routeId,
//       success: true,
//       polyline: leafletCoordinates,
//       points: leafletCoordinates.length,
//     }
//   } catch (error) {
//     console.error(`Error fetching or processing route for ${routeId}:`, error.message)
//     return { routeId, success: false, error: error.message }
//   }
// }

// // --- Main Execution Logic ---
// async function processAllRoutes() {
//   let orderedRoutesData

//   // 1. Read the input file
//   try {
//     const routeDataRaw = fs.readFileSync(inputFilename, 'utf8')
//     orderedRoutesData = JSON.parse(routeDataRaw)
//     console.log(`Successfully read ordered stop data from ${inputFilename}`)
//   } catch (err) {
//     console.error(`Error reading or parsing input file ${inputFilename}:`, err)
//     process.exit(1)
//   }

//   // 2. Prepare fetch promises
//   const fetchPromises = []
//   for (const routeId in orderedRoutesData) {
//     if (Object.hasOwnProperty.call(orderedRoutesData, routeId)) {
//       const stops = orderedRoutesData[routeId]
//       fetchPromises.push(fetchRoutePolyline(routeId, stops))
//     }
//   }

//   console.log(`\nStarting OSRM polyline fetching for ${fetchPromises.length} route variants...`)

//   // 3. Execute all fetch requests
//   const results = await Promise.all(fetchPromises)

//   // 4. Structure the final output data - MODIFIED
//   const polylinesOutput = {}
//   let successCount = 0
//   let errorCount = 0

//   results.forEach((result) => {
//     if (result.success) {
//       // Determine the base line name (e.g., "M1", "M2") from the routeId
//       const baseLine = result.routeId.split('_')[0]
//       // Get the corresponding marker image name, with a fallback
//       const markerImageName = baseLineMarkerImages[baseLine] || baseLineMarkerImages['DEFAULT'] // MODIFIED

//       // Store successful results, keyed by routeId
//       polylinesOutput[result.routeId] = {
//         polyline: result.polyline,
//         isActive: false, // NEW: Add isActive property
//         markerImageName: markerImageName, // NEW: Add marker image name
//         metadata: {
//           // MODIFIED: Nested metadata
//           source_stops_count: orderedRoutesData[result.routeId]?.length || 0,
//           polyline_points: result.points,
//           // Add distance/duration here if fetched
//         },
//       }
//       successCount++
//     } else {
//       errorCount++
//     }
//   })

//   console.log(`\nFetching complete. Success: ${successCount}, Errors: ${errorCount}`)

//   // 5. Write the collected polyline data to the output file
//   if (successCount > 0) {
//     try {
//       fs.writeFileSync(outputFilename, JSON.stringify(polylinesOutput, null, 2), 'utf8')
//       console.log(`Successfully wrote fetched polyline data (with isActive & markerImageName) to ${outputFilename}`) // MODIFIED Log
//     } catch (err) {
//       console.error(`\nError writing polyline data to file ${outputFilename}:`, err)
//     }
//   } else {
//     console.log('No successful polyline data fetched, skipping output file writing.')
//   }

//   console.log('\n--- End of Polyline Fetch Script ---')
// }

// // Run the main processing function
// processAllRoutes()
// Save this script as e.g., fetch_polylines.js
import fs from 'fs'
import fetch from 'node-fetch'

// --- Configuration ---
const inputFilename = 'ordered_routes.json' // Input file with ordered stops per route
const outputFilename = 'polylines.json' // Output file for generated polylines
const OSRM_BASE_URL = 'http://router.project-osrm.org/route/v1/driving/' // OSRM API endpoint

// Define mapping for marker images based on the base line name (M1, M2, etc.)
const baseLineMarkerImages = {
  M1: '/pictures/m1pin.png',
  M2: '/pictures/m2pin.png',
  M3: '/pictures/m3pin.png',
  M4: '/pictures/m4pin.png',
  // Add B1, B3, B4 if you process them later, e.g.:
  // "B1": "/pictures/b1kwpin.png",
  // "B3": "/pictures/b3pin.png",
  // "B4": "/pictures/b4pin.png",
  DEFAULT: '/pictures/default-pin.png', // Fallback image
}

// --- Helper Function to Fetch Route from OSRM ---
// (This function remains the same)
async function fetchRoutePolyline(routeId, orderedStops) {
  console.log(`\nAttempting to fetch polyline for: ${routeId}`)

  if (!orderedStops || orderedStops.length < 2) {
    console.error(`Error (${routeId}): Not enough stops provided (${orderedStops?.length || 0}). Cannot fetch route.`)
    return { routeId, success: false, error: 'Not enough stops provided.' }
  }

  const waypointsString = orderedStops
    .map((stop) => {
      if (stop.lat == null || stop.lon == null || isNaN(stop.lat) || isNaN(stop.lon)) {
        console.warn(`WARNING (${routeId}): Skipping invalid coordinates for stop "${stop.name || stop.id}":`, {
          lat: stop.lat,
          lon: stop.lon,
        })
        return null
      }
      return `${stop.lon},${stop.lat}`
    })
    .filter((coord) => coord !== null)
    .join(';')

  if (waypointsString.split(';').length < 2) {
    console.error(
      `Error (${routeId}): Not enough *valid* waypoints after filtering (${
        waypointsString.split(';').length
      }). Cannot fetch route.`
    )
    return { routeId, success: false, error: 'Not enough valid waypoints.' }
  }

  const apiUrl = `${OSRM_BASE_URL}${waypointsString}?overview=full&geometries=geojson`

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}. Body: ${errorText}`)
    }
    const data = await response.json()
    if (data.code !== 'Ok') {
      throw new Error(`OSRM API Error: ${data.code} - ${data.message || 'No message provided.'}`)
    }
    if (!data.routes || data.routes.length === 0 || !data.routes[0].geometry || !data.routes[0].geometry.coordinates) {
      throw new Error('OSRM response did not contain valid route geometry.')
    }

    const osrmCoordinates = data.routes[0].geometry.coordinates
    const leafletCoordinates = osrmCoordinates.map((coord) => [coord[1], coord[0]]) // Convert to [lat, lon]

    console.log(`Successfully fetched route for ${routeId}. Polyline points: ${leafletCoordinates.length}`)

    return {
      routeId,
      success: true,
      polyline: leafletCoordinates,
      points: leafletCoordinates.length,
      // Optionally include distance/duration if useful
      // distance_meters: data.routes[0]?.distance,
      // duration_seconds: data.routes[0]?.duration,
    }
  } catch (error) {
    console.error(`Error fetching or processing route for ${routeId}:`, error.message)
    return { routeId, success: false, error: error.message }
  }
}

// --- Main Execution Logic ---
async function processAllRoutes() {
  let orderedRoutesData

  // 1. Read the input file with ordered stops
  try {
    const routeDataRaw = fs.readFileSync(inputFilename, 'utf8')
    orderedRoutesData = JSON.parse(routeDataRaw)
    console.log(`Successfully read ordered stop data from ${inputFilename}`)
  } catch (err) {
    console.error(`Error reading or parsing input file ${inputFilename}:`, err)
    process.exit(1)
  }

  // 2. Prepare fetch promises
  const fetchPromises = []
  for (const routeId in orderedRoutesData) {
    if (Object.hasOwnProperty.call(orderedRoutesData, routeId)) {
      const stops = orderedRoutesData[routeId]
      fetchPromises.push(fetchRoutePolyline(routeId, stops))
    }
  }

  console.log(`\nStarting OSRM polyline fetching for ${fetchPromises.length} route variants...`)

  // 3. Execute all fetch requests
  const results = await Promise.all(fetchPromises)

  // 4. Structure the final output data - MODIFIED
  const polylinesOutput = {}
  let successCount = 0
  let errorCount = 0

  results.forEach((result) => {
    if (result.success) {
      const baseLine = result.routeId.split('_')[0]
      const markerImageName = baseLineMarkerImages[baseLine] || baseLineMarkerImages['DEFAULT']

      // Get the original ordered stops array used for this route variant
      const originalStops = orderedRoutesData[result.routeId] // <-- Get the stops

      polylinesOutput[result.routeId] = {
        polyline: result.polyline, // The fetched route geometry
        stops: originalStops || [], // NEW: Include the original stops array
        isActive: false, // Still include this for frontend state
        markerImageName: markerImageName, // Still include this for icons
        metadata: {
          // source_stops_count is now redundant as we have the stops array length
          polyline_points: result.points,
          // Optional: Add distance/duration if fetched from OSRM
          // distance_meters: result.distance_meters,
          // duration_seconds: result.duration_seconds,
        },
      }
      successCount++
    } else {
      errorCount++
    }
  })

  console.log(`\nFetching complete. Success: ${successCount}, Errors: ${errorCount}`)

  // 5. Write the collected data (polylines + stops) to the output file
  if (successCount > 0) {
    try {
      fs.writeFileSync(outputFilename, JSON.stringify(polylinesOutput, null, 2), 'utf8')
      console.log(`Successfully wrote fetched polyline and stop data to ${outputFilename}`) // Updated Log
    } catch (err) {
      console.error(`\nError writing data to file ${outputFilename}:`, err)
    }
  } else {
    console.log('No successful polyline data fetched, skipping output file writing.')
  }

  console.log('\n--- End of Polyline Fetch Script ---')
}

// Run the main processing function
processAllRoutes()

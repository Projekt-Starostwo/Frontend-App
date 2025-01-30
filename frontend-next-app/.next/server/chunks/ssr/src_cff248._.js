module.exports = {

"[project]/src/lib/queries.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// tutaj wszystkie funkcje requestujace strapi REST API
__turbopack_esm__({
    "fetchSchoolInfo": (()=>fetchSchoolInfo),
    "getDistrcts": (()=>getDistrcts),
    "getListOfSchool": (()=>getListOfSchool)
});
async function getDistrcts() {
    try {
        const res = await fetch('https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/powiaty/powiaty-medium.geojson');
        const json = await res.json();
        return json;
    } catch (error) {
        throw new Error('Nie udało się pobrać danych o powiatach.');
    }
}
const token = ("TURBOPACK compile-time value", "c00eb0bd3807401b93895c9010b754df95a48d8eaf6ddc21cc2d64cbe91c18dfae164ac44be44184d521ad7a6fa97652d1918f50118082442656406b78eee6e205915d30da4c697cc8e556cfdf9dfdd16ff027c87d0567fa343ad6f1d8a5d42c795e80bdb022467554b9a61d11cb9c0c4fed96a4934b40e3c501aa6e5206689c");
async function getListOfSchool() {
    try {
        const url = `http://localhost:1337/api/lista-szkols?populate[0]=lokalizacja_szkoly&populate[1]=lista_kierunkow&populate[2]=lista_kierunkow.kierunek&populate[3]=lista_kierunkow.kierunek.zdjecie&populate[4]=rodzaje_szkoly&populate[5]=rodzaje_szkoly.liceum&populate[6]=rodzaje_szkoly.liceum.zdjecia_rodzaju&populate[7]=rodzaje_szkoly.technikum&populate[8]=rodzaje_szkoly.technikum.zdjecia_rodzaju&populate[9]=rodzaje_szkoly.szkola_zawodowa&populate[10]=rodzaje_szkoly.szkola_zawodowa.zdjecia_rodzaju&populate[11]=glowne_zdjecie_szkoly&populate[12]=glowna_galeria_zdjec_szkoly`;
        const headers = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
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
async function fetchSchoolInfo(documentId) {
    // const url = `http://localhost:1337/api/lista-szkols/szspld1dk1oqckcwddi25tzp?populate[0]=lista_kierunkow&populate[1]=lista_kierunkow.kierunek`
    try {
        const url = `http://localhost:1337/api/lista-szkols/${documentId}?populate[0]=lista_kierunkow&populate[1]=lista_kierunkow.kierunek`;
        const headers = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
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
}}),
"[project]/src/app/[id]/[kierunek]/page.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Page)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/queries.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Page() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const kierunek = useGetKierunekInfo(decodeURIComponent(params.kierunek));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex justify-center items-center flex-col p-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-2/3 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-bold",
                    children: kierunek?.nazwa_kierunku
                }, void 0, false, {
                    fileName: "[project]/src/app/[id]/[kierunek]/page.js",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[id]/[kierunek]/page.js",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-2/3 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: kierunek?.opis_kierunku
                }, void 0, false, {
                    fileName: "[project]/src/app/[id]/[kierunek]/page.js",
                    lineNumber: 16,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[id]/[kierunek]/page.js",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[id]/[kierunek]/page.js",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
function useGetKierunekInfo(nazwa_kierunku) {
    const school = JSON.parse(sessionStorage.getItem('school'));
    const kierunek = school.lista_kierunkow.filter((kierunek)=>{
        return kierunek.kierunek.nazwa_kierunku === nazwa_kierunku;
    });
    return kierunek[0].kierunek;
}
}}),
"[project]/src/app/[id]/[kierunek]/page.js [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=src_cff248._.js.map
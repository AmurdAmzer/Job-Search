module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/app/styles/Home.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "aboutContent": "Home-module__FmBi5G__aboutContent",
  "aboutHero": "Home-module__FmBi5G__aboutHero",
  "aboutPage": "Home-module__FmBi5G__aboutPage",
  "avatar": "Home-module__FmBi5G__avatar",
  "ctaButton": "Home-module__FmBi5G__ctaButton",
  "ctaSection": "Home-module__FmBi5G__ctaSection",
  "featureGrid": "Home-module__FmBi5G__featureGrid",
  "features": "Home-module__FmBi5G__features",
  "footer": "Home-module__FmBi5G__footer",
  "footerBottom": "Home-module__FmBi5G__footerBottom",
  "footerTop": "Home-module__FmBi5G__footerTop",
  "header": "Home-module__FmBi5G__header",
  "hero": "Home-module__FmBi5G__hero",
  "heroBackground": "Home-module__FmBi5G__heroBackground",
  "heroContent": "Home-module__FmBi5G__heroContent",
  "heroImage": "Home-module__FmBi5G__heroImage",
  "heroSection": "Home-module__FmBi5G__heroSection",
  "heroText": "Home-module__FmBi5G__heroText",
  "logo": "Home-module__FmBi5G__logo",
  "logoutBtn": "Home-module__FmBi5G__logoutBtn",
  "nav": "Home-module__FmBi5G__nav",
  "signupBtn": "Home-module__FmBi5G__signupBtn",
  "splitImage": "Home-module__FmBi5G__splitImage",
  "splitSection": "Home-module__FmBi5G__splitSection",
  "splitText": "Home-module__FmBi5G__splitText",
  "userSection": "Home-module__FmBi5G__userSection",
});
}}),
"[project]/app/jobs/page.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// 'use client';
// import { useEffect, useState } from 'react';
// import styles from './Jobs.module.css';
// import LoggedInHeader from '../components/LoggedinHeader';
// import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
// export default function JobsPage() {
//   const [jobs, setJobs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [savedIds, setSavedIds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   // Load saved favorites from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('favorites')) || [];
//     const ids = saved.map((job) => job._id || job.job_id);
//     setSavedIds(ids);
//   }, []);
//   // Fetch jobs from MongoDB on mount
//   // useEffect(() => {
//   //   const fetchJobs = async () => {
//   //     try {
//   //       const response = await fetch('http://localhost:9999/api/jobs');
//   //       const data = await response.json();
//   //       setJobs(data);
//   //     } catch (err) {
//   //       console.error('Failed to load jobs:', err);
//   //       setError('Could not load jobs');
//   //     }
//   //   };
//   //   fetchJobs();
//   // }, []);
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };
//   const handleSearchSubmit = async (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         `http://localhost:9999/api/search-jobs?queryText=${encodeURIComponent(searchQuery.trim())}`
//       );
//       const result = await response.json();
//       console.log('📦 Search results:', result);
//       setJobs(result.jobs || []);
//     } catch (err) {
//       console.error('❌ Search failed:', err);
//       setError('Failed to fetch jobs');
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleSaveToFavorites = async (job) => {
//     const existing = JSON.parse(localStorage.getItem('favorites')) || [];
//     const isSaved = existing.some((j) => (j._id || j.job_id) === (job._id || job.job_id));
//     let updated;
//     if (isSaved) {
//       updated = existing.filter((j) => (j._id || j.job_id) !== (job._id || job.job_id));
//     } else {
//       updated = [...existing, job];
//     }
//     localStorage.setItem('favorites', JSON.stringify(updated));
//     setSavedIds(updated.map((j) => j._id || j.job_id));
//   };
//   return (
//     <>
//       <LoggedInHeader />
//       <div className={styles.container}>
//         <h1 className={styles.pageTitle}>Job Listings</h1>
//         <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
//           <input
//             type="text"
//             placeholder="Search jobs..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className={styles.searchInput}
//           />
//           <div className={styles.buttonWrapper}>
//           <button type="submit" className={styles.searchButton}>Search</button>
//           </div>
//         </form>
//         <div className={styles.gapBelowSearch}></div>
//         {loading && <p className={styles.loading}>Loading jobs...</p>}
//         {error && <p className={styles.error}>{error}</p>}
//         <div className={styles.jobGrid}>
//           {jobs.length > 0 ? (
//             jobs.map((job, index) => (
//               <div key={index} className={styles.jobCard}>
//                 <h2 className={styles.jobTitle}>{job.title || job.job_title}</h2>
//                 <h3 className={styles.employer}>{job.company || job.employer_name}</h3>
//                 <p className={styles.description}>
//                   {(job.description || job.job_description)?.substring(0, 300)}...
//                 </p>
//                 <div className={styles.buttonGroup}>
//                   <a
//                     href={job.externalUrl || job.job_apply_link || '#'}
//                     className={styles.applyButton}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Apply Now
//                   </a>
//                   <button
//                     onClick={() => handleSaveToFavorites(job)}
//                     className={styles.saveButton}
//                     title={savedIds.includes(job._id || job.job_id) ? 'Saved' : 'Save to favorites'}
//                   >
//                     {savedIds.includes(job._id || job.job_id) ? (
//                       <FaBookmark size={18} color="#0070f3" />
//                     ) : (
//                       <FaRegBookmark size={18} color="#333" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className={styles.noResults}>No jobs found.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
__turbopack_context__.s({
    "default": (()=>JobListings)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$styles$2f$Home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/styles/Home.module.css [app-ssr] (css module)");
(()=>{
    const e = new Error("Cannot find module '../styles/Login.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
'use client';
;
;
;
;
function JobListings() {
    const [jobs, setJobs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchJobs = async ()=>{
            try {
                const response = await fetch('/api/jobs');
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
            }
        };
        fetchJobs();
    }, []);
    const filteredJobs = jobs.filter((job)=>job.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$styles$2f$Home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].main,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$styles$2f$Home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                children: "Job Listings"
            }, void 0, false, {
                fileName: "[project]/app/jobs/page.js",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: "Search by job title...",
                value: searchTerm,
                onChange: (e)=>setSearchTerm(e.target.value),
                className: loginStyles.input,
                style: {
                    marginBottom: '1rem'
                }
            }, void 0, false, {
                fileName: "[project]/app/jobs/page.js",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$styles$2f$Home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grid,
                children: filteredJobs.length > 0 ? filteredJobs.map((job, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$styles$2f$Home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: job.title
                            }, void 0, false, {
                                fileName: "[project]/app/jobs/page.js",
                                lineNumber: 190,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: job.description
                            }, void 0, false, {
                                fileName: "[project]/app/jobs/page.js",
                                lineNumber: 191,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Company:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/jobs/page.js",
                                        lineNumber: 192,
                                        columnNumber: 18
                                    }, this),
                                    " ",
                                    job.company
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/jobs/page.js",
                                lineNumber: 192,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Location:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/jobs/page.js",
                                        lineNumber: 193,
                                        columnNumber: 18
                                    }, this),
                                    " ",
                                    job.location
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/jobs/page.js",
                                lineNumber: 193,
                                columnNumber: 15
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/app/jobs/page.js",
                        lineNumber: 189,
                        columnNumber: 13
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "No job listings found."
                }, void 0, false, {
                    fileName: "[project]/app/jobs/page.js",
                    lineNumber: 197,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/jobs/page.js",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/jobs/page.js",
        lineNumber: 174,
        columnNumber: 5
    }, this);
}
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)");
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__9255da69._.js.map
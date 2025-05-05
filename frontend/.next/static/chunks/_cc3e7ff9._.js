(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_cc3e7ff9._.js", {

"[project]/app/styles/Home.module.css [app-client] (css module)": ((__turbopack_context__) => {

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
"[project]/app/jobs/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$styles$2f$Home$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/styles/Home.module.css [app-client] (css module)");
(()=>{
    const e = new Error("Cannot find module '../styles/Login.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function JobListings() {
    _s();
    const [jobs, setJobs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JobListings.useEffect": ()=>{
            const fetchJobs = {
                "JobListings.useEffect.fetchJobs": async ()=>{
                    try {
                        const response = await fetch('/api/jobs');
                        const data = await response.json();
                        setJobs(data);
                    } catch (error) {
                        console.error('Failed to fetch jobs:', error);
                    }
                }
            }["JobListings.useEffect.fetchJobs"];
            fetchJobs();
        }
    }["JobListings.useEffect"], []);
    const filteredJobs = jobs.filter((job)=>job.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$styles$2f$Home$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$styles$2f$Home$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                children: "Job Listings"
            }, void 0, false, {
                fileName: "[project]/app/jobs/page.js",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$styles$2f$Home$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                children: filteredJobs.length > 0 ? filteredJobs.map((job, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$styles$2f$Home$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: job.title
                            }, void 0, false, {
                                fileName: "[project]/app/jobs/page.js",
                                lineNumber: 190,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: job.description
                            }, void 0, false, {
                                fileName: "[project]/app/jobs/page.js",
                                lineNumber: 191,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_s(JobListings, "ElRKo5bt5ZNIjTUsb3a9YQgqlvM=");
_c = JobListings;
var _c;
__turbopack_context__.k.register(_c, "JobListings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    }, specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, Error("react-stack-top-frame"), createTask(getTaskName(type)));
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
}]);

//# sourceMappingURL=_cc3e7ff9._.js.map
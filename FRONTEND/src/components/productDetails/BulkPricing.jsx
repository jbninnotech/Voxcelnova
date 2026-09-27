// import React from "react";
// import { FiTrendingDown } from "react-icons/fi";

// const BulkPricing = ({
//   price = 0,
//   quantity = 1,
//   tiers = [],
// }) => {
//   const defaultTiers = [
//     { min: 1, max: 9, price: Number(price) },
//     {
//       min: 10,
//       max: 49,
//       price: Math.round(Number(price) * 0.95),
//     },
//     {
//       min: 50,
//       max: 99,
//       price: Math.round(Number(price) * 0.9),
//     },
//     {
//       min: 100,
//       max: 499,
//       price: Math.round(Number(price) * 0.85),
//     },
//     {
//       min: 500,
//       max: null,
//       price: null,
//     },
//   ];

//   const pricingTiers = tiers.length ? tiers : defaultTiers;

//   return (
//     <div
//       className="rounded-4 p-4 mb-4"
//       style={{
//         background: "#F8FAFC",
//         border: "1px solid #E2E8F0",
//       }}
//     >
//       <div className="d-flex align-items-center gap-2 mb-3">
//         <div
//           className="rounded-circle d-flex align-items-center justify-content-center"
//           style={{
//             width: "38px",
//             height: "38px",
//             background: "#DBEAFE",
//             color: "#2563EB",
//           }}
//         >
//           <FiTrendingDown size={18} />
//         </div>

//         <div>
//           <div
//             style={{
//               fontSize: "14px",
//               fontWeight: 800,
//               color: "#071A36",
//             }}
//           >
//             Bulk Pricing
//           </div>

//           <div
//             style={{
//               fontSize: "12px",
//               color: "#64748B",
//             }}
//           >
//             Order more and save more
//           </div>
//         </div>
//       </div>

//       <div>
//         {pricingTiers.map((tier, index) => {
//           const active =
//             quantity >= tier.min &&
//             (tier.max === null || quantity <= tier.max);

//           return (
//             <div
//               key={index}
//               className="d-flex align-items-center justify-content-between py-2 px-3 rounded-3 mb-2"
//               style={{
//                 background: active ? "#EFF6FF" : "#FFFFFF",
//                 border: active
//                   ? "1px solid #BFDBFE"
//                   : "1px solid #E2E8F0",
//               }}
//             >
//               <span
//                 style={{
//                   fontSize: "12px",
//                   fontWeight: active ? 700 : 500,
//                   color: "#334155",
//                 }}
//               >
//                 {tier.max
//                   ? `${tier.min}–${tier.max} pieces`
//                   : `${tier.min}+ pieces`}
//               </span>

//               <span
//                 style={{
//                   fontSize: "13px",
//                   fontWeight: 800,
//                   color: active ? "#2563EB" : "#071A36",
//                 }}
//               >
//                 {tier.price
//                   ? `₹${Number(tier.price).toLocaleString("en-IN")}`
//                   : "Contact us"}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BulkPricing;
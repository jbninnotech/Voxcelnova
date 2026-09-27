// import React from "react";
// import {
//   FiTruck,
//   FiPackage,
//   FiClock,
//   FiMapPin,
// } from "react-icons/fi";

// const DeliveryInfo = () => {
//   const items = [
//     {
//       icon: <FiTruck />,
//       title: "Standard Delivery",
//       text: "Usually delivered within 5–7 business days.",
//     },
//     {
//       icon: <FiPackage />,
//       title: "Secure Packaging",
//       text: "Products are packed carefully before dispatch.",
//     },
//     {
//       icon: <FiClock />,
//       title: "Bulk Orders",
//       text: "Manufacturing timelines are confirmed after quotation.",
//     },
//     {
//       icon: <FiMapPin />,
//       title: "Pan India",
//       text: "Delivery available across India.",
//     },
//   ];

//   return (
//     <div className="row g-3">
//       {items.map((item) => (
//         <div className="col-12 col-md-6" key={item.title}>
//           <div
//             className="d-flex gap-3 h-100 p-3 rounded-4"
//             style={{
//               background: "#F8FAFC",
//               border: "1px solid #E2E8F0",
//             }}
//           >
//             <div
//               className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-3"
//               style={{
//                 width: "42px",
//                 height: "42px",
//                 background: "#E0F2FE",
//                 color: "#0369A1",
//               }}
//             >
//               {item.icon}
//             </div>

//             <div>
//               <h6
//                 className="mb-1"
//                 style={{
//                   fontSize: "14px",
//                   fontWeight: 800,
//                   color: "#071A36",
//                 }}
//               >
//                 {item.title}
//               </h6>

//               <p
//                 className="mb-0"
//                 style={{
//                   fontSize: "12px",
//                   color: "#64748B",
//                   lineHeight: 1.6,
//                 }}
//               >
//                 {item.text}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DeliveryInfo;
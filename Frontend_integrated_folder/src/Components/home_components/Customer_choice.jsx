// "use client";
// import Link from "next/link";

// const products = [
//   { id: 1, name: "Diabetes Care 1", image: "/10 1.png" },
//   { id: 2, name: "Diabetes Care 2", image: "/10 2.png" },
//   { id: 3, name: "Diabetes Care 3", image: "/10 7.png" },
//   { id: 4, name: "Diabetes Care 4", image: "/4 5.png" },
//   { id: 5, name: "Diabetes Care 5", image: "/5 4.png" },
//   { id: 6, name: "Diabetes Care 6", image: "/6 11.png" },
//   { id: 7, name: "Diabetes Care 7", image: "/6 11.png" },
//   { id: 8, name: "Diabetes Care 8", image: "/5 4.png" },
//   { id: 9, name: "Diabetes Care 9", image: "/4 5.png" },
//   { id: 10, name: "Diabetes Care 10", image: "/10 7.png" },
//   { id: 11, name: "Diabetes Care 11", image: "/10 2.png" },
//   { id: 12, name: "Diabetes Care 12", image: "/10 1.png" },
// ];

// function CustomerChoice() {
//   return (
//     <section className="w-[90%] md:w-3/4 lg:w-3/4 mx-auto mt-6">
//       {/* Heading */}
//       <h1 className="text-[2rem] font-black text-center mb-6 text-black">
//         Customer <span className="text-[#2cc16d]">Choice</span>
//       </h1>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-lg p-4 border flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 shadow-md"
//           >
//             <Link href="/stores">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-32 h-32 object-cover mb-4 cursor-pointer rounded-md"
//               />
//             </Link>
//             <h3 className="text-lg font-bold text-black">{product.name}</h3>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default CustomerChoice;

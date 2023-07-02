"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import ProductCard from "./ProductCard";

const ProductSelector = ({
  products,
  onChange,
  productId,
}: {
  products: (typeof api.products.get)["_returnType"];
  onChange: (productId: Id<"products">) => void;
  productId: Id<"products">;
}) => {
  return (
    <ul role="list" className="flex flex-row overflow-x-scroll gap-2 m-2">
      {products.map((product) => (
        <li
          key={product._id}
          className={`border-4 rounded-xl ${
            product._id === productId
              ? "border-red-600 bg-zinc-800"
              : "border-gray-800"
          }`}
          onClick={() => onChange(product._id)}
        >
          <ProductCard {...product} fixedWidth />
        </li>
      ))}
    </ul>
  );
};

export default ProductSelector;

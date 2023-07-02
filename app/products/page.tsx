import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

import ProductCard from "@/app/(components)/ProductCard";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

// export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await convex.query(api.products.get);

  return (
    <ul
      role="list"
      className="grid gap-x-6 gap-y-20 grid-cols-2 xl:grid-cols-3"
    >
      {products.map((product) => (
        <li key={product._id}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
}

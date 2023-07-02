import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";
import ProductCard from "@/app/(components)/ProductCard";

export const dynamic = "force-dynamic";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export default async function Home() {
  const outfits = await convex.query(api.outfits.get);

  return (
    <>
      {outfits?.map((outfit) => (
        <div key={outfit._id}>
          <h1 className="mt-5">
            <span className="text-4xl font-bold">{outfit?.title}</span>{" "}
            <span className="text-xl italic font-thin">
              by {outfit?.author}
            </span>
          </h1>
          <ul role="list" className="flex flex-row overflow-x-scroll gap-2 m-2">
            {outfit.products.map((product) => (
              <li key={product._id}>
                <ProductCard {...product} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

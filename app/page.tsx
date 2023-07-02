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
          <div className="flex flex-row items-center ml-2 mr-5">
            <h1 className="mt-5">
              <span className="text-4xl font-bold">{outfit?.title}</span>{" "}
              <span className="text-xl italic font-thin">
                by {outfit?.author}
              </span>
            </h1>
            <div className="flex-grow"></div>
            <div className="text-3xl">
              $
              {outfit?.products?.reduce(
                (acc, product) => acc + (product?.price ?? 0),
                0
              )}
            </div>
          </div>
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

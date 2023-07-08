import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAll, asyncMap } from "./lib/relationships";

export const get = query(async ({ db, storage }) => {
  const outfits = await db.query("outfits").order("desc").take(10);

  return await asyncMap(outfits, async (outfit) => {
    const products = await getAll(db, outfit.products);
    return {
      ...outfit,
      products: await asyncMap(products, async (product) => ({
        ...product,
        image: await storage.getUrl(product?.imageId ?? ""),
      })),
    };
  });
});

export const add = mutation({
  args: {
    products: v.array(v.id("products")),
    title: v.string(),
  },
  handler: async ({ db }, { products, title }) => {
    await db.insert("outfits", {
      products,
      title,
    });
  },
});

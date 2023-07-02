import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query(async ({ db, storage }) => {
  return Promise.all(
    (await db.query("outfits").collect()).map(async (outfit) => ({
      ...outfit,
      products: await Promise.all(
        outfit.products.map(async (id) => {
          const product = await db.get(id);
          return {
            ...product,
            image: await storage.getUrl(product?.imageId ?? ""),
          };
        })
      ),
      author: outfit.author,
    }))
  );
});

export const add = mutation({
  args: {
    products: v.array(v.id("products")),
    title: v.string(),
  },
  handler: async ({ db, auth }, { products, title }) => {
    const identity = await auth.getUserIdentity();
    if (identity == null) {
      throw new Error("Unauthenticated call to mutation");
    }

    await db.insert("outfits", {
      products,
      title,
      author: identity?.name ?? "",
    });
  },
});

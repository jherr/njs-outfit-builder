import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    price: v.float64(),
    title: v.string(),
    imageId: v.string(),
  }),
  outfits: defineTable({
    title: v.string(),
    products: v.array(v.id("products")),
  }),
});

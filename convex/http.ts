import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/addProduct",
  method: "POST",
  handler: httpAction(async ({ storage, runMutation }, request) => {
    const blob = await request.blob();
    const imageId = await storage.store(blob);

    const searchParams = new URL(request.url).searchParams;
    await runMutation(api.products.add, {
      imageId,
      title: searchParams.get("title") ?? "",
      price: +(searchParams.get("price") ?? 0),
      type: searchParams.get("type") ?? "",
    });

    return new Response(null, {
      status: 200,
    });
  }),
});

export default http;

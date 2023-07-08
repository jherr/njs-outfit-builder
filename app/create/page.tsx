"use client";
import { useReducer, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ProductSelector from "@/app/(components)/ProductSelector";

const CreatePage = () => {
  const products = useQuery(api.products.get);
  type State = {
    shoe: Id<"products">;
    shirt: Id<"products">;
    band: Id<"products">;
    title: string;
  };
  const [state, dispatch] = useReducer(
    (state: State, update: Partial<State>) => ({
      ...state,
      ...update,
    }),
    {
      shoe: "" as Id<"products">,
      shirt: "" as Id<"products">,
      band: "" as Id<"products">,
      title: "",
    }
  );

  const addOutfit = useMutation(api.outfits.add);

  const shoes = useMemo(
    () => products?.filter(({ type }) => type === "shoes") ?? [],
    [products]
  );
  const shirts = useMemo(
    () => products?.filter(({ type }) => type === "shirt") ?? [],
    [products]
  );
  const bands = useMemo(
    () => products?.filter(({ type }) => type === "band") ?? [],
    [products]
  );

  useEffect(() => {
    dispatch({
      shoe: shoes?.[0]?._id,
      shirt: shirts?.[0]?._id,
      band: bands?.[0]?._id,
    });
  }, [shoes, shirts, bands]);

  const router = useRouter();

  return products ? (
    <>
      <div className="flex flex-row gap-2 my-5">
        <input
          type="text"
          placeholder="Name your outfit"
          value={state.title}
          onChange={(e) => dispatch({ title: e.target.value })}
          className="flex-grow bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={async () => {
            await addOutfit({
              products: [state.shoe, state.shirt, state.band],
              title: state.title,
            });
            router.push("/", { shallow: false });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Outfit
        </button>
      </div>
      <h2 className="px-5 text-3xl mb-2 font-bold">Select Your Products</h2>
      <ProductSelector
        products={shoes}
        productId={state.shoe}
        onChange={(shoe) => dispatch({ shoe })}
      />
      <ProductSelector
        products={shirts}
        productId={state.shirt}
        onChange={(shirt) => dispatch({ shirt })}
      />
      <ProductSelector
        products={bands}
        productId={state.band!}
        onChange={(band) => dispatch({ band })}
      />
    </>
  ) : null;
};

export default CreatePage;

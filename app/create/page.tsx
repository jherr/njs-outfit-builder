"use client";
import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ProductSelector from "@/app/(components)/ProductSelector";

const CreatePage = () => {
  const products = useQuery(api.products.get);
  const [shoeId, setShoeId] = useState<Id<"products">>();
  const [shirtId, setShirtId] = useState<Id<"products">>();
  const [bandId, setBandId] = useState<Id<"products">>();
  const [title, setTitle] = useState<string>("");

  const user = useUser();

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
    setShoeId(shoes?.[0]?._id);
    setShirtId(shirts?.[0]?._id);
    setBandId(bands?.[0]?._id);
  }, [shoes, shirts, bands]);

  return (
    <div>
      <h2 className="px-5 text-3xl mb-2 font-bold">Select Your Products</h2>
      {products && (
        <>
          <ProductSelector
            products={shoes}
            productId={shoeId!}
            onChange={(id) => setShoeId(id)}
          />
          <ProductSelector
            products={shirts}
            productId={shirtId!}
            onChange={(id) => setShirtId(id)}
          />
          <ProductSelector
            products={bands}
            productId={bandId!}
            onChange={(id) => setBandId(id)}
          />
        </>
      )}
      {user && (
        <div className="flex flex-row gap-2 px-5 mt-5">
          <input
            type="text"
            placeholder="Name your outfit"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => {
              addOutfit({ products: [shoeId!, shirtId!, bandId!], title });
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Outfit
          </button>
        </div>
      )}
      {!user && (
        <div className="px-5 mt-5">
          <h1 className="text-2xl">Sign In to create an outfit</h1>
        </div>
      )}
    </div>
  );
};

export default CreatePage;

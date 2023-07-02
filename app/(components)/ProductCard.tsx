import Image from "next/image";

const ProductCard = ({
  title,
  image,
  fixedWidth = false,
}: {
  title?: string;
  image?: string | null;
  fixedWidth?: boolean;
}) => (
  <div className="p-2">
    <Image
      className={`aspect-[2/2] ${
        fixedWidth ? "w-[12rem] min-w-[12rem]" : "w-full"
      } rounded-md object-cover`}
      src={image ?? ""}
      alt={`${title} image`}
      width={1024}
      height={1024}
    />
    {title && (
      <h3 className="mt-2 text-lg font-bold leading-10 text-gray-100">
        {title}
      </h3>
    )}
  </div>
);

export default ProductCard;

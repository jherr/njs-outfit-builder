const fs = require("fs");

const UPLOAD_URL = `${process.env.SITE_URL}/addProduct`;

const PRODUCTS = [
  {
    title: "CodeCuff",
    price: "9.99",
    type: "band",
    image: "images/band-1.jpeg",
  },
  {
    title: "DevLink",
    price: "9.99",
    type: "band",
    image: "images/band-2.jpeg",
  },
  {
    title: "SyntaxStrap",
    price: "9.99",
    type: "band",
    image: "images/band-3.jpeg",
  },
  {
    title: "CodeChrono",
    price: "9.99",
    type: "band",
    image: "images/band-4.jpeg",
  },

  {
    title: "Code Breaker",
    price: "29.99",
    type: "shirt",
    image: "images/shirt-1.jpeg",
  },
  {
    title: "Hello World",
    price: "19.99",
    type: "shirt",
    image: "images/shirt-2.jpeg",
  },
  {
    title: "Binary Brigade",
    price: "24.99",
    type: "shirt",
    image: "images/shirt-3.jpeg",
  },
  {
    title: "Byte Me",
    price: "34.99",
    type: "shirt",
    image: "images/shirt-4.jpeg",
  },

  {
    title: "ByteKicks",
    price: "39.99",
    type: "shoes",
    image: "images/shoe-1.jpeg",
  },
  {
    title: "CodeSole",
    price: "39.99",
    type: "shoes",
    image: "images/shoe-2.jpeg",
  },
  {
    title: "HackHightops",
    price: "49.99",
    type: "shoes",
    image: "images/shoe-3.jpeg",
  },
  {
    title: "AlgorithmAir",
    price: "39.99",
    type: "shoes",
    image: "images/shoe-4.jpeg",
  },
  {
    title: "SyntaxSneakers",
    price: "49.99",
    type: "shoes",
    image: "images/shoe-5.jpeg",
  },
  {
    title: "CodeCrafters",
    price: "39.99",
    type: "shoes",
    image: "images/shoe-6.jpeg",
  },
  {
    title: "BinaryBoost",
    price: "49.99",
    type: "shoes",
    image: "images/shoe-7.jpeg",
  },
];

const uploadProduct = async (title, price, type, image) => {
  const blob = await new Promise((resolve, reject) => {
    fs.readFile(image, (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      const fileBuffer = Buffer.from(
        data.buffer,
        data.byteOffset,
        data.byteLength
      );
      resolve(fileBuffer);
    });
  });

  await fetch(
    `${UPLOAD_URL}?title=${encodeURIComponent(
      title
    )}&price=${encodeURIComponent(price)}&type=${encodeURIComponent(type)}`,
    {
      headers: {
        "Content-Type": "image/jpeg",
      },
      method: "POST",
      body: blob,
    }
  );
};

(async () => {
  for (const product of PRODUCTS) {
    console.log(product.image);
    await uploadProduct(
      product.title,
      product.price,
      product.type,
      product.image
    );
  }
})();

export const normalizeCartProduct = (product) => {
  const id = product?.id;
  const title = product?.title ?? product?.name ?? '';
  const image = product?.image ?? product?.img ?? '';
  const price = Number(product?.price ?? 0);
  const description = product?.description ?? '';
  const category = product?.category;
  const stock = product?.stock;

  // Keep legacy keys too, so older UI/localStorage doesn't break mid-session
  return {
    id,
    title,
    image,
    price,
    description,
    category,
    stock,
    name: title,
    img: image,
  };
};


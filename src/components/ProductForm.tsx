import type { Product } from "../types";


type ProductFormProps = {
    product?: Product
}

export const ProductForm = ({product} : ProductFormProps) => {
  return (
    <>
      <div className="mb-4">
        <label className="text-white" htmlFor="name">
          Nombre Producto:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 border border-neutral-600 rounded-lg"
          placeholder="Nombre del Producto"
          name="name"
          defaultValue={product?.name}
        />
      </div>
      <div className="mb-4">
        <label className="text-white" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          type="number"
          className="mt-2 block w-full p-3  border border-neutral-600 rounded-lg"
          placeholder="Precio Producto. ej. 200, 300"
          name="price"
          defaultValue={product?.price}
        />
      </div>
    </>
  );
};

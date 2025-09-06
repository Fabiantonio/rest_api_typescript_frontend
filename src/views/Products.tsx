import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { getProducts, updateAvailability } from "../services/ProductService";
import { ProductsDetails } from "../components/ProductsDetails";
import type { Product } from "../types";

export async function loader() {
  const products = await getProducts();
  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updateAvailability(Number(data.id))
  return {};
}

export const Products = () => {
  const products = useLoaderData() as Product[];
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-black">Productos</h1>
        <Link
          to="productos/nuevo"
          className="bg-indigo-600 text-white px-3 py-2 font-bold uppercase rounded text-sm"
        >
          Nuevo Producto
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductsDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

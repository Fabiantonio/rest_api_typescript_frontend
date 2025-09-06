import type { Product } from "../types";
import {
  Form,
  Link,
  useNavigate,
  type ActionFunctionArgs,
  redirect,
  useFetcher,
} from "react-router-dom";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export const ProductsDetails = ({ product }: ProductDetailsProps) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-white-800">{product.name}</td>
      <td className="p-3 text-lg text-white-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-white-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              product.availability ? "" : "text-red-600"
            } rounded-lg w-full uppercase p-2 font-bold text-xs text-center cursor-pointer`}
          >
            {product.availability ? "Disponible" : "No disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-white-800 ">
        <div className="flex gap-3 items-center justify-center">
          <button
            onClick={() => navigate(`/productos/${product.id}/editar`)}
            className="bg-indigo-600 rounded-lg w-full uppercase p-2 font-bold text-xs text-center  cursor-pointer"
          >
            Editar
          </button>
          <Form
            onSubmit={(e) => {
              if (!confirm("Eliminar?")) {
                e.preventDefault();
              }
            }}
            className="w-full"
            action={`productos/${product.id}/eliminar`}
            method="POST"
          >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 rounded-lg w-full uppercase p-2 font-bold text-xs text-center  cursor-pointer"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};

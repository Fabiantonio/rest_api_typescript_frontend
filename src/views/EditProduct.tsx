import {
  Link,
  Form,
  useActionData,
  type ActionFunctionArgs,
  redirect,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { ErrorMsg } from "../components/ErrorMsg";
import {
  addProduct,
  getProductsById,
  updateProduct,
} from "../services/ProductService";
import type { Product } from "../types";
import { ProductForm } from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductsById(Number(params.id));
    if (!product) {
      return redirect("/");
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    await updateProduct(data, params.id);

    return redirect("/");
  }
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export const EditProduct = () => {
  const error = useActionData() as string;

  const product = useLoaderData() as Product;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-black">Editar Producto</h1>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-3 py-2 font-bold uppercase rounded text-sm"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Form className="mt-10" method="POST">
        <ProductForm 
          product={product}
        />
        <div className="mb-4">
          <label className="text-white-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3  border border-neutral-600 rounded-lg"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
};

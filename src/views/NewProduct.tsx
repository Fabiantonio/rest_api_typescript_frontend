import {
  Link,
  Form,
  useActionData,
  type ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import { ErrorMsg } from "../components/ErrorMsg";
import { addProduct } from "../services/ProductService";
import { ProductForm } from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  await addProduct(data);

  return redirect("/");
}

export const NewProduct = () => {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-black">Registrar Producto</h1>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-3 py-2 font-bold uppercase rounded text-sm"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Form className="mt-10" method="POST">
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
};

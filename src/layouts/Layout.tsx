import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>

      <header className="bg-neutral-800">
        <div className="mx-auto max-w-6xl py-10">
          <h1 className="text-4xl font-extrabold">
            Administrador de Productos
          </h1>
        </div>
      </header>

      <main>
        <div className="mt-10 mx-auto max-w-6xl p-10 bg-neutral-800">
          <Outlet />
        </div>
      </main>

    </>
  );
};

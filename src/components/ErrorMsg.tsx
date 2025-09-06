import {type PropsWithChildren } from "react";

export const ErrorMsg = ({ children }: PropsWithChildren) => {
  return <div className="text-center bg-red-600 my-4 p-3">{children}</div>;
};

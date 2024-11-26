"use client";
import { NextUIProvider } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";
const Provider = ({ children }: PropsWithChildren) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Provider;

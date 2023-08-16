import React from "react";

export default function ProductId({ params }: { params: { id: string } }) {
  return <h1>Hello {params.id}</h1>;
}

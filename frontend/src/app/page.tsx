import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <React.Fragment>
      <h1>HomePage</h1>
      <Link href={"/Auth"}>Entrar a Gestion</Link>
    </React.Fragment>
  )
}

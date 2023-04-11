import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { ButtonPrimary, ButtonSecondary } from "@/components/button/button";
import Add from "./Add/Add";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div data-theme="dark">
      <Head>
        <title>Kay Khau</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Add />
    </div>
  );
}

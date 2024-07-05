import Image from "next/image";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import Header from "@/widgets/header/ui/Header"
import CardList from "@/widgets/cardList/ui/CardList";

export default function Home() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <CardList/>
      </main>
  );
}

import { cn } from "@/shared/lib/utils";
import { HEADER_HEIGHT } from "@/shared/config/const";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

export default async function Home() {
  return (
    <main className="flex flex-col">
      <section
        className="flex flex-col flex-1"
        style={{
          minHeight: `calc(100dvh - ${HEADER_HEIGHT})`,
        }}
      >
        <header className="flex items-center bg-secondary dark:bg-secondary/20 w-full h-[30rem]">
          <div className="flex flex-col container items-center gap-8 text-center">
            <h1 className="text-4xl lg:text-5xl">Lorem ipsum dolor sit amet</h1>
            <p className="text-center w-[300px] md:w-1/2">
              Fusce ut placerat orci nulla pellentesque dignissim enim sit. Enim
              praesent elementum facilisis leo vel fringilla est ullamcorper.
              Velit aliquet sagittis id consectetur purus ut. Elementum integer
              enim neque volutpat ac tincidunt.
            </p>
            <div className="flex gap-2">
              <Button>Lorem ipsum</Button>
              <Button variant="secondary">Dolor sit amet</Button>
            </div>
          </div>
        </header>
        <div className="container px-8 grid gap-4 grid-cols-3 items-center flex-1">
          <article className="border h-64 col-span-3 md:col-span-1">
            slide
          </article>
          <article className="border h-64 hidden md:block">slide</article>
          <article className="border h-64 hidden md:block">slide</article>
        </div>
      </section>
      <section
        id="about-us"
        className="flex flex-col"
        style={{
          minHeight: `calc(100dvh - ${HEADER_HEIGHT})`,
        }}
      >
        <header className="bg-secondary dark:bg-secondary/20 w-full h-[11rem] flex items-center"></header>
        <main className="grid container items-center flex-1 py-16">
          <div>
            <h2 className="text-2xl font-semibold">About us</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris
              sit amet massa vitae tortor condimentum lacinia quis vel. Fames ac
              turpis egestas maecenas pharetra convallis posuere morbi. Ut
              ornare lectus sit amet est. Elementum curabitur vitae nunc sed
              velit dignissim sodales ut eu. Elit at imperdiet dui accumsan sit
              amet. Elit duis tristique sollicitudin nibh sit. Diam volutpat
              commodo sed egestas egestas fringilla phasellus faucibus. Etiam
              tempor orci eu lobortis elementum nibh. Maecenas ultricies mi eget
              mauris pharetra et ultrices neque. Consectetur adipiscing elit
              pellentesque habitant morbi tristique senectus et.
            </p>
            <p>
              Egestas maecenas pharetra convallis posuere morbi leo urna
              molestie at. Dui sapien eget mi proin sed libero enim. In est ante
              in nibh. Diam volutpat commodo sed egestas egestas fringilla
              phasellus faucibus scelerisque. Blandit turpis cursus in hac.
              Bibendum ut tristique et egestas quis ipsum. Lacinia at quis risus
              sed vulputate. Neque volutpat ac tincidunt vitae semper quis
              lectus nulla. Tincidunt eget nullam non nisi est sit amet. Ornare
              suspendisse sed nisi lacus sed. Scelerisque purus semper eget duis
              at tellus at. Diam vel quam elementum pulvinar etiam. Mauris
              commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Nulla
              porttitor massa id neque aliquam vestibulum. Posuere lorem ipsum
              dolor sit amet consectetur adipiscing. Quisque id diam vel quam
              elementum. In dictum non consectetur a erat nam at lectus.
              Consequat id porta nibh venenatis. Vivamus arcu felis bibendum ut
              tristique et egestas.
            </p>
          </div>
          <div className="container px-8 grid gap-4 grid-cols-3 items-center flex-1 mt-8">
            <article className="border h-64 col-span-3 md:col-span-1">
              slide
            </article>
            <article className="border h-64 hidden md:block">slide</article>
            <article className="border h-64 hidden md:block">slide</article>
          </div>
        </main>
      </section>
      <section
        id="support-form"
        className="flex flex-col"
        style={{
          minHeight: `calc(100dvh - ${HEADER_HEIGHT})`,
        }}
      >
        <header className="bg-secondary dark:bg-secondary/20 w-full h-[11rem] flex items-center"></header>
        <main className="grid container items-center flex-1 py-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold">
              You have problems or suggestions for improvement?
            </h2>
            <form className="flex flex-col gap-4 mt-8 w-full lg:w-[600px]">
              <Input type="text" placeholder="Name" />
              <Input type="email" placeholder="Email" />
              <Textarea placeholder="Message" />
              captcha
              <Button className="self-end" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </main>
      </section>
    </main>
  );
}

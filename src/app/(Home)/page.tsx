import { IconCircleChevronRight } from "@tabler/icons-react";

export default function Home() {
  return (
    <section className="bg-base-300 h-[calc(100vh-5.6rem)] flex items-center">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl text-base-content font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            AgriScan AI | Empowering Farmers with Vision—Detect Leaf Diseases
            Instantly
          </h1>
          <p className="max-w-2xl mb-6 font-light text-base-content/70 lg:mb-8 md:text-lg lg:text-xl">
            AgriScan AI is a smart leaf disease detection tool powered by deep
            learning. Using a ResNet-based model, it can identify over 35
            diseases across multiple crops including tomatoes, grapes, apples,
            and corn. Built to support farmers and researchers, AgriScan AI
            offers real-time analysis through a user-friendly web interface.
          </p>
          <a
            href="/login"
            className="btn btn-primary text-base font-medium text-center rounded-lg mr-4"
          >
            Get Started
            <IconCircleChevronRight />
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/bg.png" alt="Chef Icon" />
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="text-center">
        <p className="mb-2 text-sm uppercase tracking-widest text-gold">404</p>
        <h1 className="heading-display mb-4 text-5xl text-white-text md:text-6xl">
          Страница не найдена
        </h1>
        <p className="mb-8 max-w-md text-text-secondary">
          Возможно, страница была перемещена или удалена. Вернитесь на главную или посмотрите
          портфолио.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            На главную
          </Link>
          <Link href="/portfolio" className="btn-secondary">
            Портфолио
          </Link>
        </div>
      </div>
    </section>
  );
}

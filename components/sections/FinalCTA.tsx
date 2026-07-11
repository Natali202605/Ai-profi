import Link from "next/link";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { VKButton } from "@/components/ui/VKButton";

export function FinalCTA() {
  return (
    <section className="border-t border-border-subtle py-20 md:py-28">
      <div className="container-site text-center">
        <RevealAnimation>
          <div className="glass-panel-soft mx-auto max-w-3xl rounded-3xl p-10 md:p-14">
          <h2 className="heading-display mb-4 text-balance text-4xl text-white-text md:text-5xl">
            У вас есть идея? Давайте найдём для неё визуальный образ
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary">
            Расскажите о проекте в нескольких словах. Я помогу определить, какой формат лучше
            подойдёт: изображения, видео, сайт, оформление ВКонтакте или комплексное решение.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Обсудить проект
            </Link>
            <VKButton className="btn-secondary" />
          </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}

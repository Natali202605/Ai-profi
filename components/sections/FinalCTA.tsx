import Link from "next/link";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { VKButton } from "@/components/ui/VKButton";

export function FinalCTA() {
  return (
    <section className="border-t border-border-subtle py-16 md:py-28">
      <div className="container-site text-center">
        <RevealAnimation>
          <div className="glass-panel-soft mx-auto max-w-3xl rounded-3xl p-6 sm:p-10 md:p-14">
            <h2 className="heading-display mb-4 text-balance text-3xl text-white-text sm:text-4xl md:text-5xl">
              У вас есть идея? Давайте найдём для неё выразительный визуальный образ
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary">
              Расскажите, что вы хотите создать. Я помогу подобрать подходящий формат — изображение,
              видео, сайт, чат-бот, оформление ВКонтакте или комплексное решение.
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

import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Intro() {
  return (
    <section className="section-light py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            title="Не просто создаю контент. Помогаю увидеть образ вашего проекта"
          />
        </RevealAnimation>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealAnimation delay={0.1}>
            <div className="glass-panel-soft rounded-2xl p-6 md:p-8">
            <p className="text-lg leading-relaxed text-text-secondary">
              Каждый проект начинается не с выбора нейросети или шаблона, а с понимания человека,
              идеи и задачи. Я соединяю возможности современных AI-инструментов с художественным
              опытом, чувством композиции, цвета и атмосферы.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              Благодаря этому изображения, видео, сайты и сообщества выглядят не как набор отдельных
              элементов, а как единая визуальная история.
            </p>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <blockquote className="glass-panel relative p-8">
              <div className="absolute -left-1 top-6 h-12 w-1 rounded-full bg-gold" />
              <p className="font-heading text-2xl leading-relaxed text-white-text md:text-3xl">
                Для меня важно, чтобы визуал был не только красивым. Он должен передавать характер,
                вызывать чувство и помогать человеку запомнить ваш проект.
              </p>
            </blockquote>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}

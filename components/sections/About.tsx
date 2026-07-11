import Image from "next/image";
import Link from "next/link";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VKButton } from "@/components/ui/VKButton";

const skills = [
  "художественное мышление",
  "современные AI-технологии",
  "дизайн",
  "визуальный сторителлинг",
  "понимание социальных сетей",
  "внимание к задачам бизнеса",
  "живое человеческое общение",
];

export function About() {
  return (
    <section id="about" className="section-light py-20 md:py-28">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <RevealAnimation direction="left">
            <div className="relative mx-auto max-w-md">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80"
                  alt="[Добавить профессиональный портрет Натали]"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 glass-panel p-4">
                <p className="font-heading text-3xl text-gold">10+</p>
                <p className="text-xs text-text-secondary">лет в искусстве</p>
              </div>
            </div>
          </RevealAnimation>

          <div className="glass-panel-soft rounded-2xl p-6 md:p-8">
            <RevealAnimation>
              <SectionHeading light title="Здравствуйте, я Натали" />
            </RevealAnimation>
            <RevealAnimation delay={0.1}>
              <p className="mb-4 text-lg leading-relaxed text-text-secondary">
                Я AI-специалист и художник с опытом более 10 лет. Создаю видео, изображения, сайты
                и визуальное оформление для экспертов, брендов и творческих проектов. Также помогаю
                оформлять и развивать личные страницы и сообщества ВКонтакте.
              </p>
              <p className="mb-4 text-lg leading-relaxed text-text-secondary">
                Художественный опыт научил меня видеть больше, чем отдельные детали. Я обращаю
                внимание на композицию, свет, цвет, ритм, настроение и характер образа. А
                современные AI-инструменты позволяют воплощать идеи быстрее, смелее и в самых
                разных форматах.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-text-secondary">
                Мне важно внимательно услышать человека и почувствовать его проект. Поэтому я не
                работаю по одному шаблону. Для каждой задачи ищу собственную интонацию и визуальное
                решение.
              </p>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <p className="mb-3 font-medium text-white-text">В работе я соединяю:</p>
              <ul className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-berry" />
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/portfolio" className="btn-secondary-light">
                  Посмотреть работы
                </Link>
                <VKButton className="btn-secondary-light !border-0 !bg-transparent !p-0" />
                <Link href="/#contact" className="btn-primary">
                  Обсудить проект
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}

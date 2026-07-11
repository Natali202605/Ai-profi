import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

const vkElements = [
  { label: "Обложка", description: "Первое впечатление и визуальный характер сообщества" },
  { label: "Аватар", description: "Узнаваемый знак, который виден в ленте и поиске" },
  { label: "Меню", description: "Навигация к ключевым разделам и услугам" },
  { label: "Закреплённый пост", description: "Главное сообщение для новых посетителей" },
  { label: "Карточки услуг", description: "Структурированное представление ваших предложений" },
  { label: "Шаблоны публикаций", description: "Единый визуальный стиль для контента" },
  { label: "Обложки клипов", description: "Привлекательное оформление видеоконтента" },
  { label: "Форма заявки", description: "Путь от интереса к обращению" },
];

export function VKSection() {
  return (
    <section id="vk" className="py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            title="ВКонтакте как полноценное пространство вашего бренда"
            subtitle="Хорошо оформленное сообщество помогает человеку быстро понять, кто вы, чем можете быть полезны и почему стоит обратиться именно к вам."
          />
        </RevealAnimation>

        <div className="grid gap-12 lg:grid-cols-2">
          <RevealAnimation direction="left">
            <div className="rounded-2xl border border-border-subtle bg-card-bg p-6 backdrop-blur-md">
              <div className="mb-4 h-32 rounded-xl bg-gradient-to-r from-indigo-deep/80 via-plum/70 to-berry/50" />
              <div className="flex items-end gap-4">
                <div className="h-20 w-20 -mt-10 rounded-full border-4 border-plum/60 bg-sand" />
                <div>
                  <p className="font-semibold text-white-text">Сайты | Нейровидео | Чат-боты | Визуал</p>
                  <p className="text-sm text-text-secondary">
                    Сайты под ключ, умные боты, видео с ИИ и дизайн — всё для продвижения бизнеса в
                    одном месте.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {["Услуги", "О нас", "Контакты", "Отзывы"].map((tab) => (
                  <span
                    key={tab}
                    className="glass-inset rounded-lg px-3 py-1.5 text-xs text-text-secondary"
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                <div className="glass-inset rounded-xl p-4">
                  <p className="text-xs text-gold">Закреплённый пост</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Создаю digital-продукты: сайты под ключ, умные боты, видео с ИИ и дизайн. Всё для
                    продвижения вашего бизнеса в одном месте.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Услуга 1", "Услуга 2"].map((s) => (
                    <div key={s} className="glass-inset rounded-lg p-3 text-center text-xs text-text-secondary">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation direction="right" delay={0.15}>
            <p className="mb-6 text-lg leading-relaxed text-text-secondary">
              Я рассматриваю ВКонтакте не как отдельную обложку или набор публикаций, а как цельную
              систему: первое впечатление, позиционирование, навигация, описание услуг, визуальная
              подача, контент, доверие и путь до заявки.
            </p>
            <div className="space-y-4">
              {vkElements.map((el, i) => (
                <div
                  key={el.label}
                  className="flex gap-4 rounded-xl border border-border-subtle bg-card-bg/50 p-4 transition-colors hover:border-gold/20"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-white-text">{el.label}</p>
                    <p className="text-sm text-text-secondary">{el.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}

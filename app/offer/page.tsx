import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_OPERATOR } from "@/data/legal";

export const metadata: Metadata = {
  title: "Публичная оферта",
  robots: { index: false },
};

export default function OfferPage() {
  return (
    <div className="pt-24 pb-20 md:pt-32">
      <div className="container-site max-w-3xl">
        <h1 className="heading-display mb-8 text-4xl text-white-text">Публичная оферта</h1>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            Настоящий документ является официальным предложением ({LEGAL_OPERATOR.fullName}, бренд{" "}
            {LEGAL_OPERATOR.brand}) заключить договор на оказание услуг в сфере digital, AI-визуала,
            дизайна и сопутствующих работ на условиях, изложенных ниже.
          </p>

          <h2 className="heading-display text-2xl text-white-text">1. Общие положения</h2>
          <p>
            1.1. Оферта действует для пользователей сайта и клиентов, обращающихся через формы
            обратной связи или ВКонтакте.
          </p>
          <p>
            1.2. Акцептом оферты считается направление заявки, оплата услуг или письменное
            подтверждение согласия с условиями в переписке.
          </p>
          <p>
            1.3. Исполнитель оказывает услуги дистанционно, если иное не согласовано сторонами.
          </p>

          <h2 className="heading-display text-2xl text-white-text">2. Предмет договора</h2>
          <p>
            2.1. Исполнитель создаёт по заданию Заказчика digital-продукты и визуальные материалы:
            AI-видео, AI-изображения, сайты, оформление и развитие страниц и сообществ ВКонтакте,
            чат-боты, дизайн и иные согласованные работы.
          </p>
          <p>
            2.2. Конкретный перечень работ, сроки, формат результата и стоимость определяются в
            переписке, техническом задании или коммерческом предложении.
          </p>

          <h2 className="heading-display text-2xl text-white-text">3. Порядок оказания услуг</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Заказчик направляет заявку с описанием задачи и материалами.</li>
            <li>Исполнитель уточняет детали, согласовывает объём, сроки и стоимость.</li>
            <li>После согласования условий Исполнитель приступает к работе.</li>
            <li>Результат передаётся в согласованных форматах после приёмки или поэтапно.</li>
          </ul>

          <h2 className="heading-display text-2xl text-white-text">4. Стоимость и оплата</h2>
          <p>
            4.1. Стоимость услуг определяется индивидуально и сообщается до начала работ.
          </p>
          <p>
            4.2. Оплата производится способом, согласованным сторонами (перевод, иные доступные
            способы).
          </p>
          <p>
            4.3. При необходимости предоплаты размер и порядок внесения согласуются до старта
            проекта.
          </p>

          <h2 className="heading-display text-2xl text-white-text">5. Права и обязанности сторон</h2>
          <p>
            5.1. Заказчик предоставляет достоверные данные, материалы и своевременную обратную
            связь.
          </p>
          <p>
            5.2. Исполнитель выполняет работу качественно, в согласованные сроки, с учётом
            согласованных правок.
          </p>
          <p>
            5.3. Количество правок и дополнительных итераций определяется до начала работ или
            согласуется отдельно.
          </p>

          <h2 className="heading-display text-2xl text-white-text">6. Интеллектуальные права</h2>
          <p>
            6.1. Исключительные права на результат работ переходят Заказчику после полной оплаты,
            если иное не согласовано.
          </p>
          <p>
            6.2. Исполнитель вправе использовать работы в портфолио с согласия Заказчика или если
            это не нарушает коммерческую тайну.
          </p>

          <h2 className="heading-display text-2xl text-white-text">7. Ответственность</h2>
          <p>
            7.1. Стороны несут ответственность в пределах, предусмотренных законодательством РФ.
          </p>
          <p>
            7.2. Исполнитель не несёт ответственности за задержки, вызванные несвоевременной
            обратной связью или предоставлением материалов Заказчиком.
          </p>

          <h2 className="heading-display text-2xl text-white-text">8. Персональные данные</h2>
          <p>
            Обработка персональных данных осуществляется в соответствии с{" "}
            <Link href="/privacy" className="text-link">
              политикой конфиденциальности
            </Link>{" "}
            и{" "}
            <Link href="/consent" className="text-link">
              согласием на обработку персональных данных
            </Link>
            .
          </p>

          <h2 className="heading-display text-2xl text-white-text">9. Реквизиты и контакты</h2>
          <p>
            Исполнитель: {LEGAL_OPERATOR.fullName} ({LEGAL_OPERATOR.brand})
            <br />
            Статус: {LEGAL_OPERATOR.status}
            <br />
            Сайт:{" "}
            <a href={LEGAL_OPERATOR.siteUrl} className="text-link">
              {LEGAL_OPERATOR.siteUrl}
            </a>
            <br />
            ВКонтакте:{" "}
            <a href={LEGAL_OPERATOR.vkProfile} className="text-link" target="_blank" rel="noopener noreferrer">
              личная страница
            </a>
            ,{" "}
            <a href={LEGAL_OPERATOR.vkCommunity} className="text-link" target="_blank" rel="noopener noreferrer">
              сообщество
            </a>
          </p>

          <p className="text-sm text-text-secondary/60">Дата публикации: 11 июля 2026 г.</p>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  robots: { index: false },
};

export default function ConsentPage() {
  return (
    <div className="pt-24 pb-20 md:pt-32">
      <div className="container-site max-w-3xl">
        <h1 className="heading-display mb-8 text-4xl text-white-text">
          Согласие на обработку персональных данных
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            Настоящим я даю своё согласие владельцу сайта NATALI NEERO на обработку моих
            персональных данных, указанных в формах обратной связи на сайте.
          </p>

          <h2 className="heading-display text-2xl text-white-text">Перечень данных</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Фамилия, имя</li>
            <li>Контактный телефон или данные мессенджера</li>
            <li>Информация о проекте</li>
            <li>Прикреплённые файлы (при наличии)</li>
          </ul>

          <h2 className="heading-display text-2xl text-white-text">Цели обработки</h2>
          <p>
            Обработка осуществляется в целях связи со мной, обсуждения проекта, подготовки
            коммерческого предложения и заключения договорённостей.
          </p>

          <h2 className="heading-display text-2xl text-white-text">Срок действия</h2>
          <p>
            Согласие действует до момента его отзыва. Отзыв согласия возможен путём направления
            письменного уведомления через форму обратной связи или ВКонтакте.
          </p>

          <p className="text-sm text-text-secondary/60">
            [Дополнить реквизитами оператора перед публикацией]
          </p>
        </div>
      </div>
    </div>
  );
}

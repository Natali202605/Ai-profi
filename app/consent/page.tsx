import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_OPERATOR } from "@/data/legal";

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
            Настоящим я даю своё согласие {LEGAL_OPERATOR.fullName} ({LEGAL_OPERATOR.brand}) на
            обработку моих персональных данных, указанных в формах обратной связи на сайте и в
            переписке.
          </p>

          <h2 className="heading-display text-2xl text-white-text">Оператор</h2>
          <p>
            {LEGAL_OPERATOR.fullName} ({LEGAL_OPERATOR.brand}), {LEGAL_OPERATOR.status}.
          </p>

          <h2 className="heading-display text-2xl text-white-text">Перечень данных</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Фамилия, имя</li>
            <li>Контактный телефон или данные мессенджера</li>
            <li>Информация о проекте</li>
            <li>Прикреплённые файлы (при наличии)</li>
            <li>Технические данные, cookies и UTM-метки (при использовании сайта)</li>
          </ul>

          <h2 className="heading-display text-2xl text-white-text">Цели обработки</h2>
          <p>
            Обработка осуществляется в целях связи со мной, обсуждения проекта, подготовки
            коммерческого предложения, заключения и исполнения договорённостей, а также улучшения
            качества сервиса.
          </p>

          <h2 className="heading-display text-2xl text-white-text">Действия с данными</h2>
          <p>
            Сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача
            (в случаях, предусмотренных законом), обезличивание, блокирование и удаление персональных
            данных.
          </p>

          <h2 className="heading-display text-2xl text-white-text">Срок действия</h2>
          <p>
            Согласие действует до момента его отзыва. Отзыв согласия возможен путём направления
            уведомления через форму обратной связи или{" "}
            <a href={LEGAL_OPERATOR.vkProfile} className="text-link" target="_blank" rel="noopener noreferrer">
              ВКонтакте
            </a>
            .
          </p>

          <h2 className="heading-display text-2xl text-white-text">Подтверждение</h2>
          <p>
            Отправляя заявку на сайте и отмечая соответствующий чекбокс, я подтверждаю, что
            ознакомлен(а) с{" "}
            <Link href="/privacy" className="text-link">
              политикой конфиденциальности
            </Link>{" "}
            и даю согласие на обработку персональных данных на изложенных условиях.
          </p>

          <p className="text-sm text-text-secondary/60">
            Также см.:{" "}
            <Link href="/offer" className="text-link">
              публичная оферта
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

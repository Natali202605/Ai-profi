import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_OPERATOR } from "@/data/legal";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20 md:pt-32">
      <div className="container-site max-w-3xl prose prose-invert">
        <h1 className="heading-display mb-8 text-4xl text-white-text">
          Политика конфиденциальности
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            Настоящая Политика конфиденциальности определяет порядок обработки и защиты
            персональных данных пользователей сайта {LEGAL_OPERATOR.brand}.
          </p>

          <h2 className="heading-display text-2xl text-white-text">1. Общие положения</h2>
          <p>
            Используя сайт и отправляя формы обратной связи, вы соглашаетесь с условиями
            настоящей Политики. Оператором персональных данных является {LEGAL_OPERATOR.fullName}{" "}
            ({LEGAL_OPERATOR.brand}), {LEGAL_OPERATOR.status}.
          </p>

          <h2 className="heading-display text-2xl text-white-text">2. Какие данные собираются</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Имя</li>
            <li>Контактные данные (телефон, мессенджер)</li>
            <li>Информация о проекте и задаче</li>
            <li>UTM-метки и данные об источнике обращения</li>
            <li>Технические данные (cookies, IP-адрес) для аналитики</li>
            <li>Прикреплённые файлы (при отправке через форму)</li>
          </ul>

          <h2 className="heading-display text-2xl text-white-text">3. Цели обработки</h2>
          <p>
            Персональные данные обрабатываются для связи с вами, обсуждения проекта, подготовки
            предложения, заключения и исполнения договорённостей, а также улучшения работы сайта.
          </p>

          <h2 className="heading-display text-2xl text-white-text">4. Правовые основания</h2>
          <p>
            Обработка осуществляется на основании согласия субъекта персональных данных, а также
            для исполнения договора и законных интересов оператора в рамках законодательства РФ.
          </p>

          <h2 className="heading-display text-2xl text-white-text">5. Защита данных</h2>
          <p>
            Принимаются необходимые организационные и технические меры для защиты персональных
            данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
          </p>

          <h2 className="heading-display text-2xl text-white-text">6. Cookies и аналитика</h2>
          <p>
            Сайт может использовать cookies и сервис Яндекс.Метрика для анализа посещаемости.
            Вы можете отключить cookies в настройках браузера.
          </p>

          <h2 className="heading-display text-2xl text-white-text">7. Передача третьим лицам</h2>
          <p>
            Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных
            законом, или когда это необходимо для исполнения заявки (например, хостинг, аналитика)
            при соблюдении конфиденциальности.
          </p>

          <h2 className="heading-display text-2xl text-white-text">8. Права субъекта данных</h2>
          <p>
            Вы вправе запросить уточнение, блокирование или удаление персональных данных, отозвать
            согласие на обработку, обратившись через форму на сайте или{" "}
            <a href={LEGAL_OPERATOR.vkProfile} className="text-link" target="_blank" rel="noopener noreferrer">
              ВКонтакте
            </a>
            .
          </p>

          <h2 className="heading-display text-2xl text-white-text">9. Срок хранения</h2>
          <p>
            Данные хранятся до достижения целей обработки или до отзыва согласия, если более длительный
            срок не требуется законом.
          </p>

          <h2 className="heading-display text-2xl text-white-text">10. Контакты оператора</h2>
          <p>
            {LEGAL_OPERATOR.fullName} ({LEGAL_OPERATOR.brand})
            <br />
            Сайт:{" "}
            <a href={LEGAL_OPERATOR.siteUrl} className="text-link">
              {LEGAL_OPERATOR.siteUrl}
            </a>
            <br />
            ВКонтакте:{" "}
            <a href={LEGAL_OPERATOR.vkProfile} className="text-link" target="_blank" rel="noopener noreferrer">
              {LEGAL_OPERATOR.vkProfile}
            </a>
          </p>

          <p className="text-sm text-text-secondary/60">
            Связанные документы:{" "}
            <Link href="/consent" className="text-link">
              согласие на обработку персональных данных
            </Link>
            ,{" "}
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

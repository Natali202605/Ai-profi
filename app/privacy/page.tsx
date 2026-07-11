import type { Metadata } from "next";

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
            персональных данных пользователей сайта NATALI NEERO.
          </p>

          <h2 className="heading-display text-2xl text-white-text">1. Общие положения</h2>
          <p>
            Используя сайт и отправляя формы обратной связи, вы соглашаетесь с условиями
            настоящей Политики. Оператором персональных данных является владелец сайта NATALI
            NEERO.
          </p>

          <h2 className="heading-display text-2xl text-white-text">2. Какие данные собираются</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Имя</li>
            <li>Контактные данные (телефон, мессенджер)</li>
            <li>Информация о проекте и задаче</li>
            <li>UTM-метки и данные об источнике обращения</li>
            <li>Технические данные (cookies, IP-адрес) для аналитики</li>
          </ul>

          <h2 className="heading-display text-2xl text-white-text">3. Цели обработки</h2>
          <p>
            Персональные данные обрабатываются для связи с вами, обсуждения проекта, подготовки
            предложения и улучшения работы сайта.
          </p>

          <h2 className="heading-display text-2xl text-white-text">4. Защита данных</h2>
          <p>
            Принимаются необходимые организационные и технические меры для защиты персональных
            данных от несанкционированного доступа.
          </p>

          <h2 className="heading-display text-2xl text-white-text">5. Cookies и аналитика</h2>
          <p>
            Сайт может использовать cookies и сервис Яндекс.Метрика для анализа посещаемости.
            Вы можете отключить cookies в настройках браузера.
          </p>

          <h2 className="heading-display text-2xl text-white-text">6. Контакты</h2>
          <p>
            По вопросам обработки персональных данных обращайтесь через форму на сайте или
            ВКонтакте.
          </p>

          <p className="text-sm text-text-secondary/60">
            [Дополнить реквизитами оператора и юридическим статусом перед публикацией]
          </p>
        </div>
      </div>
    </div>
  );
}

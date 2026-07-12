"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  leadFormSchema,
  serviceOptions,
  referralOptions,
  type LeadFormData,
} from "@/lib/validation";
import { getUtmParams, trackEvent } from "@/lib/analytics";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsentCheckbox } from "@/components/forms/ConsentCheckbox";
import { BriefForm } from "@/components/forms/BriefForm";
import { VKButton } from "@/components/ui/VKButton";
import { Loader2, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attachmentName, setAttachmentName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { consent: undefined },
  });

  const selectedService = watch("service");
  const consent = watch("consent");

  const onSubmit = async (data: LeadFormData) => {
    if (loading) return;
    setLoading(true);
    setError("");
    const utm = getUtmParams();

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          attachmentName: attachmentName || undefined,
          ...utm,
          source: "form",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка отправки");
      }

      trackEvent("lead_form_submit");
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось отправить заявку");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="section-light py-20 md:py-28">
        <div className="container-site max-w-2xl text-center">
          <div className="glass-panel rounded-2xl p-8">
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-gold" />
            <h2 className="heading-display section-title-accent mb-4 text-3xl">
              Спасибо! Заявка отправлена
            </h2>
            <p className="mb-4 text-text-secondary">
              Я ознакомлюсь с задачей и свяжусь с вами удобным способом.
            </p>
            <p className="text-sm text-text-secondary">
              Для более быстрой связи можно{" "}
              <VKButton className="inline-flex !min-h-0 !p-0" />.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-light py-20 md:py-28">
      <div className="container-site max-w-2xl">
        <RevealAnimation>
          <SectionHeading
            light
            title="Расскажите о вашем проекте"
            subtitle="Даже если идея пока не оформлена в точное техническое задание, опишите её своими словами."
            align="center"
          />
        </RevealAnimation>

        <RevealAnimation delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onFocus={() => trackEvent("lead_form_start")}
            className="glass-panel space-y-5 rounded-2xl p-6 md:p-8"
            noValidate
          >
            <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white-text">
                  Имя *
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="glass-input w-full"
                  placeholder="Ваше имя"
                />
                {errors.name && <p className="mt-1 text-sm text-berry">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="contact" className="mb-1.5 block text-sm font-medium text-white-text">
                  Удобный способ связи *
                </label>
                <input
                  id="contact"
                  {...register("contact")}
                  className="glass-input w-full"
                  placeholder="+7 (___) ___-__-__ или @username"
                />
                {errors.contact && <p className="mt-1 text-sm text-berry">{errors.contact.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-white-text">
                Услуга *
              </label>
              <select
                id="service"
                {...register("service")}
                onChange={(e) => {
                  register("service").onChange(e);
                  trackEvent("service_select", { service: e.target.value });
                }}
                className="glass-input w-full"
              >
                <option value="">Выберите услугу</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && <p className="mt-1 text-sm text-berry">{errors.service.message}</p>}
            </div>

            {selectedService && <BriefForm service={selectedService} register={register} />}

            <div>
              <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-white-text">
                Описание задачи *
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={4}
                className="glass-input w-full resize-none"
                placeholder="Расскажите, что вы хотите создать..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-berry">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="projectUrl" className="mb-1.5 block text-sm font-medium text-white-text">
                Ссылка на проект
              </label>
              <input
                id="projectUrl"
                {...register("projectUrl")}
                className="glass-input w-full"
                placeholder="https://..."
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="deadline" className="mb-1.5 block text-sm font-medium text-white-text">
                  Желаемый срок
                </label>
                <input
                  id="deadline"
                  {...register("deadline")}
                  className="glass-input w-full"
                  placeholder="Например, через 2 недели"
                />
              </div>
              <div>
                <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-white-text">
                  Ориентировочный бюджет
                </label>
                <input
                  id="budget"
                  {...register("budget")}
                  className="glass-input w-full"
                  placeholder="Необязательно"
                />
              </div>
            </div>

            <div>
              <label htmlFor="referralSource" className="mb-1.5 block text-sm font-medium text-white-text">
                Откуда узнали о специалисте
              </label>
              <select id="referralSource" {...register("referralSource")} className="glass-input w-full">
                <option value="">Не указано</option>
                {referralOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="attachment" className="mb-1.5 block text-sm font-medium text-white-text">
                Прикрепить файл
              </label>
              <input
                id="attachment"
                ref={fileInputRef}
                type="file"
                className="glass-input w-full file:mr-4 file:rounded-lg file:border-0 file:bg-gold/20 file:px-3 file:py-1.5 file:text-sm file:text-gold"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setAttachmentName(file?.name || "");
                  setValue("attachmentName", file?.name || "");
                }}
              />
              {attachmentName && (
                <p className="mt-1 text-xs text-text-secondary">
                  Файл «{attachmentName}» — отправим название в заявке. При необходимости можно
                  передать файл через ВКонтакте.
                </p>
              )}
            </div>

            <ConsentCheckbox
              checked={!!consent}
              onChange={(v) =>
                setValue("consent", v ? true : (undefined as unknown as true), {
                  shouldValidate: true,
                })
              }
              error={errors.consent?.message}
            />

            {error && <p className="text-sm text-berry">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Отправка...
                </>
              ) : (
                "Отправить заявку"
              )}
            </button>
          </form>
        </RevealAnimation>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, serviceOptions, type LeadFormData } from "@/lib/validation";
import { getUtmParams, trackEvent } from "@/lib/analytics";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsentCheckbox } from "@/components/forms/ConsentCheckbox";
import { BriefForm } from "@/components/forms/BriefForm";
import { Loader2, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setError("");
    const utm = getUtmParams();

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
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
          <CheckCircle className="mx-auto mb-4 h-12 w-12 text-gold" />
          <h2 className="heading-display mb-4 text-3xl text-text-dark">
            Спасибо! Ваша заявка отправлена
          </h2>
          <p className="text-text-dark/70">
            Я ознакомлюсь с задачей и свяжусь с вами удобным способом.
          </p>
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
            title="Расскажите о своём проекте"
            subtitle="Опишите задачу в нескольких словах. Я изучу сообщение и свяжусь с вами, чтобы уточнить детали."
            align="center"
          />
        </RevealAnimation>

        <RevealAnimation delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onFocus={() => trackEvent("lead_form_start")}
            className="space-y-5"
            noValidate
          >
            <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-dark">
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
                <label htmlFor="contact" className="mb-1.5 block text-sm font-medium text-text-dark">
                  Телефон или мессенджер *
                </label>
                <input
                  id="contact"
                  {...register("contact")}
                  className="glass-input w-full"
                  placeholder="+7 ... или @username"
                />
                {errors.contact && <p className="mt-1 text-sm text-berry">{errors.contact.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="projectUrl" className="mb-1.5 block text-sm font-medium text-text-dark">
                Ссылка на страницу или проект
              </label>
              <input
                id="projectUrl"
                {...register("projectUrl")}
                className="glass-input w-full"
                placeholder="https://..."
              />
            </div>

            <div>
              <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-text-dark">
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
              <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-text-dark">
                Краткое описание задачи *
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={4}
                className="glass-input w-full resize-none"
                placeholder="Расскажите о задаче..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-berry">{errors.description.message}</p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="deadline" className="mb-1.5 block text-sm font-medium text-text-dark">
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
                <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-text-dark">
                  Примерный бюджет
                </label>
                <input
                  id="budget"
                  {...register("budget")}
                  className="glass-input w-full"
                  placeholder="Необязательно"
                />
              </div>
            </div>

            <ConsentCheckbox
              checked={!!consent}
              onChange={(v) => setValue("consent", v ? true : (undefined as unknown as true), { shouldValidate: true })}
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

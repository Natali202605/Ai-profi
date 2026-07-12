"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle, Star } from "lucide-react";
import { reviewFormSchema, serviceOptions, type ReviewFormData } from "@/lib/validation";
import { ConsentCheckbox } from "@/components/forms/ConsentCheckbox";
import Link from "next/link";

function RatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="rounded p-1 transition-colors hover:bg-gold/10"
          aria-label={`Оценка ${star}`}
        >
          <Star
            className={`h-6 w-6 ${star <= value ? "fill-gold text-gold" : "text-border-subtle"}`}
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 5,
      consent_publication: undefined,
      consent_processing: undefined,
    },
  });

  const rating = watch("rating");
  const consentPublication = watch("consent_publication");
  const consentProcessing = watch("consent_processing");

  const onSubmit = async (data: ReviewFormData) => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) throw new Error(result.error || "Ошибка отправки");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось отправить отзыв");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="card-glass mx-auto max-w-xl p-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-gold" />
        <h2 className="heading-display mb-3 text-2xl text-white-text">Спасибо за отзыв!</h2>
        <p className="text-text-secondary">
          Отзыв отправлен на модерацию. После проверки он появится на сайте.
        </p>
        <Link href="/#reviews" className="btn-secondary mt-6 inline-flex">
          Вернуться к отзывам
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card-glass mx-auto max-w-2xl space-y-5 p-6 md:p-8"
      noValidate
    >
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="review-name" className="mb-1.5 block text-sm font-medium text-white-text">
            Имя *
          </label>
          <input id="review-name" {...register("name")} className="glass-input w-full" />
          {errors.name && <p className="mt-1 text-sm text-peach">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="review-email" className="mb-1.5 block text-sm font-medium text-white-text">
            Email
          </label>
          <input id="review-email" type="email" {...register("email")} className="glass-input w-full" />
          {errors.email && <p className="mt-1 text-sm text-peach">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="review-role" className="mb-1.5 block text-sm font-medium text-white-text">
            Сфера / роль
          </label>
          <input id="review-role" {...register("role")} className="glass-input w-full" />
        </div>
        <div>
          <label htmlFor="review-company" className="mb-1.5 block text-sm font-medium text-white-text">
            Компания / проект
          </label>
          <input id="review-company" {...register("company")} className="glass-input w-full" />
        </div>
      </div>

      <div>
        <label htmlFor="review-service" className="mb-1.5 block text-sm font-medium text-white-text">
          Услуга *
        </label>
        <select id="review-service" {...register("service")} className="glass-input w-full">
          <option value="">Выберите услугу</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-sm text-peach">{errors.service.message}</p>}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-white-text">Оценка *</p>
        <RatingInput value={rating} onChange={(value) => setValue("rating", value, { shouldValidate: true })} />
        {errors.rating && <p className="mt-1 text-sm text-peach">{errors.rating.message}</p>}
      </div>

      <div>
        <label htmlFor="review-text" className="mb-1.5 block text-sm font-medium text-white-text">
          Ваш отзыв *
        </label>
        <textarea id="review-text" rows={6} {...register("full_text")} className="glass-input w-full resize-none" />
        {errors.full_text && <p className="mt-1 text-sm text-peach">{errors.full_text.message}</p>}
      </div>

      <label className="flex min-h-11 cursor-pointer items-start gap-3 py-1 text-sm">
        <input
          type="checkbox"
          checked={consentPublication === true}
          onChange={(e) =>
            setValue("consent_publication", e.target.checked ? true : (undefined as unknown as true), {
              shouldValidate: true,
            })
          }
          className="mt-1 h-5 w-5 shrink-0 rounded border-border-subtle accent-gold"
        />
        <span className="text-text-secondary">
          Я согласен(на) на публикацию отзыва на сайте после модерации
        </span>
      </label>
      {errors.consent_publication && (
        <p className="text-sm text-peach">{errors.consent_publication.message}</p>
      )}

      <ConsentCheckbox
        checked={consentProcessing === true}
        onChange={(checked) =>
          setValue("consent_processing", checked ? true : (undefined as unknown as true), {
            shouldValidate: true,
          })
        }
        error={errors.consent_processing?.message}
      />

      {error ? <p className="text-sm text-peach">{error}</p> : null}

      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
        {loading ? (
          <>
            <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          "Отправить отзыв"
        )}
      </button>
    </form>
  );
}

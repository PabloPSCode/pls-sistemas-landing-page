"use client";

import { CheckIcon } from "@phosphor-icons/react/dist/icons/Check";
import clsx from "clsx";

import {
  plans as defaultPlans,
  promotionalSectionContent,
  type Plan,
} from "@/mocks/plans";
import { startWhatsAppChat } from "@/utils/whatsapp";

export interface PromotionalSectionProps {
  /** Categoria/negócio usado na mensagem enviada ao WhatsApp. */
  category: string;
  /** Planos exibidos. Padrão: planos de criação de sites. */
  plans?: Plan[];
  /** Produto citado na mensagem do WhatsApp. Padrão: "um website". */
  product?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

function buildWhatsAppMessage(
  product: string,
  category: string,
  planName: string,
) {
  return `Olá, gostaria de desenvolver ${product} para ${category} utilizando o plano ${planName}`;
}

function PlanCard({
  plan,
  category,
  product,
}: {
  plan: Plan;
  category: string;
  product: string;
}) {
  return (
    <article
      className={clsx(
        "flex h-full flex-col rounded-3xl border bg-foreground/[0.03] p-6 sm:p-7",
        plan.highlighted
          ? "border-2 border-primary-500 shadow-lg shadow-primary-500/10"
          : "border-foreground/12",
      )}
    >
      <p className="text-sm font-medium uppercase tracking-[0.08em] text-foreground/65">
        {plan.eyebrow}
      </p>
      <h3 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
        {plan.name}
      </h3>
      <p className="mt-4 text-base leading-7 text-foreground/72">
        {plan.description}
      </p>

      <p className="mt-5 flex items-baseline gap-2">
        <span className="text-4xl font-bold text-foreground sm:text-5xl">
          {plan.installmentValue}
        </span>
        <span className="text-base text-foreground/65">
          {plan.installmentLabel}
        </span>
      </p>
      <p className="mt-2 text-base font-medium text-foreground">
        {plan.installments}
      </p>
      <p className="mt-1 text-base text-foreground/65">{plan.totalValue}</p>

      <ul className="mt-6 flex flex-col gap-4 border-y border-foreground/10 py-6">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-base text-foreground/88"
          >
            <CheckIcon
              size={18}
              weight="bold"
              className="mt-1 shrink-0 text-emerald-500"
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <p className="text-sm text-foreground/65">{plan.footnote}</p>
        <button
          type="button"
          onClick={() =>
            startWhatsAppChat(
              buildWhatsAppMessage(product, category, plan.name),
            )
          }
          className={clsx(
            "mt-4 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-base font-semibold transition-colors",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40",
            plan.highlighted
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "border border-foreground/25 text-foreground hover:bg-foreground/[0.06]",
          )}
        >
          {plan.buttonTitle}
        </button>
      </div>
    </article>
  );
}

export default function PromotionalSection({
  category,
  plans = defaultPlans,
  product = "um website",
  title = promotionalSectionContent.title,
  subtitle = promotionalSectionContent.subtitle,
  className,
}: PromotionalSectionProps) {
  return (
    <section
      className={clsx(
        "w-full bg-surface px-4 py-20 sm:px-6 sm:py-24",
        className,
      )}
      id="planos"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-8 text-foreground/70 sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div
          className={clsx(
            "mx-auto mt-14 grid gap-6",
            plans.length > 1 ? "max-w-5xl md:grid-cols-2" : "max-w-xl",
          )}
        >
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              category={category}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

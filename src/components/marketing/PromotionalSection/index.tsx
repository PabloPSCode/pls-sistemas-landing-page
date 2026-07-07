"use client";

import { CheckIcon } from "@phosphor-icons/react/dist/icons/Check";
import { TagIcon } from "@phosphor-icons/react/dist/icons/Tag";
import { XIcon } from "@phosphor-icons/react/dist/icons/X";
import clsx from "clsx";

import DealCard from "@/components/cards/DealCard";
import { plans, promotionalSectionContent, type Plan } from "@/mocks/plans";
import { startWhatsAppChat } from "@/utils/whatsapp";

export interface PromotionalSectionProps {
  /** Categoria/negócio usado na mensagem enviada ao WhatsApp. */
  category: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

function buildWhatsAppMessage(category: string, planName: string) {
  return `Olá, gostaria de desenvolver um website para ${category} utilizando o plano ${planName}`;
}

function buildResources(plan: Plan) {
  const setupResource = {
    icon: <TagIcon size={18} weight="bold" className="text-primary-500" />,
    label: `${plan.setupLabel}: ${plan.setupValue}`,
  };

  const featureResources = plan.features.map((feature) => ({
    icon: feature.included ? (
      <CheckIcon size={18} weight="bold" className="text-emerald-500" />
    ) : (
      <XIcon size={18} weight="bold" className="text-gray-400" />
    ),
    label: feature.included ? feature.label : `${feature.label} (não incluso)`,
  }));

  return [setupResource, ...featureResources];
}

export default function PromotionalSection({
  category,
  title = promotionalSectionContent.title,
  subtitle = promotionalSectionContent.subtitle,
  className,
}: PromotionalSectionProps) {
  return (
    <section
      className={clsx(
        "w-full bg-slate-50 px-4 py-20 sm:px-6 sm:py-24",
        className,
      )}
      id="planos"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-8 text-gray-600 sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mt-14 grid items-start gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="relative pt-4">
              {plan.badge ? (
                <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white shadow-md">
                  {plan.badge}
                </span>
              ) : null}

              <DealCard
                title={plan.name}
                subtitle={plan.description}
                currentPrice={plan.monthlyValue}
                buttonTitle={plan.buttonTitle}
                resources={buildResources(plan)}
                resourcesClassName="!items-start [&_ul]:space-y-2.5 [&_li]:text-left"
                className={clsx(
                  "mx-auto w-full",
                  plan.highlighted &&
                    "!border-2 !border-primary-500 shadow-lg shadow-primary-500/10",
                )}
                buttonClassName={clsx(
                  plan.highlighted &&
                    "!border-transparent !bg-primary-600 !text-white hover:!bg-primary-700",
                )}
                onSeeDetails={() =>
                  startWhatsAppChat(
                    buildWhatsAppMessage(category, plan.name),
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

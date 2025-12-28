import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Grátis",
    uses: 3,
    price: "R$ 0",
    description: "Ideal para testar",
    cta: "Começar grátis",
    ctaVariant: "outline" as const,
    features: ["3 gerações de CV", "Edição completa", "Exportar PDF", "Histórico de versões"],
    popular: false,
  },
  {
    name: "Pacote 10",
    uses: 10,
    price: "R$ 29",
    description: "Para quem está buscando ativamente",
    cta: "Comprar pacote",
    ctaVariant: "default" as const,
    features: [
      "10 gerações de CV",
      "Edição completa",
      "Exportar PDF",
      "Histórico de versões",
      "Suporte prioritário",
    ],
    popular: true,
  },
  {
    name: "Pacote 20",
    uses: 20,
    price: "R$ 49",
    description: "Máxima flexibilidade",
    cta: "Comprar pacote",
    ctaVariant: "default" as const,
    features: [
      "20 gerações de CV",
      "Edição completa",
      "Exportar PDF",
      "Histórico de versões",
      "Suporte prioritário",
    ],
    popular: false,
  },
  {
    name: "Pacote 30",
    uses: 30,
    price: "R$ 69",
    description: "Melhor custo-benefício",
    cta: "Comprar pacote",
    ctaVariant: "default" as const,
    features: [
      "30 gerações de CV",
      "Edição completa",
      "Exportar PDF",
      "Histórico de versões",
      "Suporte prioritário",
    ],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="planos" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Planos simples e transparentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Pague apenas pelo que usar. Sem assinaturas, sem surpresas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-xl border p-6 flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg ring-1 ring-primary/20"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
                  <Sparkles className="h-3 w-3" />
                  Mais popular
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-display font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.uses > 3 && (
                    <span className="text-sm text-muted-foreground">
                      / {plan.uses} usos
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.ctaVariant}
                className="w-full"
              >
                <Link to="/app">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 max-w-xl mx-auto">
          <strong>O que é um "uso"?</strong> Um uso é descontado somente quando a
          geração do CV é concluída com sucesso. Erros ou cancelamentos não consomem usos.
        </p>
      </div>
    </section>
  );
}

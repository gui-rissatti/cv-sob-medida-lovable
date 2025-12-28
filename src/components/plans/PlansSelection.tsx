import { Check, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  usages: number;
  price: number | null;
  pricePerUsage?: number;
  isFree?: boolean;
  isPopular?: boolean;
}

interface PlansSelectionProps {
  selectedPlan: string;
  onSelectPlan: (planId: string) => void;
  onContinue: () => void;
  isLoading?: boolean;
}

const plans: Plan[] = [
  { id: "free", name: "Grátis", usages: 3, price: null, isFree: true },
  { id: "pack-10", name: "Pacote 10", usages: 10, price: 19.90, pricePerUsage: 1.99 },
  { id: "pack-20", name: "Pacote 20", usages: 20, price: 34.90, pricePerUsage: 1.75, isPopular: true },
  { id: "pack-30", name: "Pacote 30", usages: 30, price: 49.90, pricePerUsage: 1.66 },
];

export function PlansSelection({ selectedPlan, onSelectPlan, onContinue, isLoading }: PlansSelectionProps) {
  const selected = plans.find(p => p.id === selectedPlan);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Escolha seu plano
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Um uso é descontado quando você gera um CV com sucesso. Escolha o melhor para você.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "relative cursor-pointer p-5 transition-all hover:shadow-md",
              selectedPlan === plan.id && "ring-2 ring-primary shadow-glow",
              plan.isPopular && "border-primary/50"
            )}
            onClick={() => onSelectPlan(plan.id)}
          >
            {plan.isPopular && (
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary">
                <Sparkles className="h-3 w-3 mr-1" />
                Mais popular
              </Badge>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {plan.isFree ? (
                    "Grátis"
                  ) : (
                    <>
                      R$ {plan.price?.toFixed(2).replace(".", ",")}
                    </>
                  )}
                </p>
                {plan.pricePerUsage && (
                  <p className="text-sm text-muted-foreground">
                    R$ {plan.pricePerUsage.toFixed(2).replace(".", ",")} por uso
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{plan.usages} {plan.usages === 1 ? "uso" : "usos"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Exportar PDF</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Otimizado para ATS</span>
                </div>
              </div>

              <div 
                className={cn(
                  "h-1 w-full rounded-full",
                  selectedPlan === plan.id ? "bg-primary" : "bg-border"
                )}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Trust signals */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span>Pagamento seguro</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span>Acesso imediato</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-primary" />
          <span>Sem pegadinhas</span>
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-center">
        <Button 
          size="xl" 
          variant="hero" 
          onClick={onContinue}
          isLoading={isLoading}
          className="min-w-[200px]"
        >
          {selected?.isFree ? "Continuar com plano gratuito" : "Comprar pacote"}
        </Button>
      </div>
    </div>
  );
}

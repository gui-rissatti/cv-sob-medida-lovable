import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Pronto para criar seu CV sob medida?
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          Comece agora mesmo, sem cadastro. Crie sua conta apenas quando quiser gerar.
        </p>

        <Button asChild size="lg" variant="secondary" className="gap-2 shadow-lg">
          <Link to="/app">
            <span className="inline-flex items-center gap-2">
              Construir meu CV
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </Button>

        <p className="text-primary-foreground/60 text-sm mt-4">
          3 gerações grátis • Sem cartão de crédito
        </p>
      </div>
    </section>
  );
}

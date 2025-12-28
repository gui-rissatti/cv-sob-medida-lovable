import { ShieldCheck, Target, Zap, History, FileText } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Feito para ATS",
    description:
      "Estrutura e formatação otimizadas para passar pelos sistemas de triagem automática.",
  },
  {
    icon: Target,
    title: "Sob medida para a vaga",
    description:
      "Destaca experiências e habilidades relevantes para cada oportunidade específica.",
  },
  {
    icon: Zap,
    title: "Edição rápida",
    description:
      "Interface intuitiva para ajustar textos, reordenar seções e refinar detalhes.",
  },
  {
    icon: History,
    title: "Histórico e versões",
    description:
      "Salve múltiplas versões do seu CV e acesse o histórico de gerações a qualquer momento.",
  },
  {
    icon: FileText,
    title: "PDF pronto para enviar",
    description:
      "Exporte em PDF com formatação profissional, pronto para candidaturas.",
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Por que usar o CV Sob Medida?
          </h2>
          <p className="text-muted-foreground text-lg">
            Ferramentas pensadas para aumentar suas chances em cada candidatura.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="bg-card rounded-xl border border-border p-6 transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="h-5 w-5 text-primary" />
              </div>

              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

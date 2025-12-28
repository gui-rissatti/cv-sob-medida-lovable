import { Upload, ClipboardList, FileDown } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "1",
    title: "Envie seu CV ou LinkedIn",
    description:
      "Faça upload do seu currículo (PDF ou DOCX) ou cole o link do seu perfil LinkedIn.",
  },
  {
    icon: ClipboardList,
    number: "2",
    title: "Cole a vaga (opcional)",
    description:
      "Adicione a descrição da vaga desejada para gerar um CV ainda mais alinhado e relevante.",
  },
  {
    icon: FileDown,
    number: "3",
    title: "Gere, edite e exporte",
    description:
      "Receba seu CV otimizado, faça ajustes se quiser e exporte em PDF pronto para enviar.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Como funciona
          </h2>
          <p className="text-muted-foreground text-lg">
            Em 3 passos simples, você tem um CV profissional e otimizado.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-xl border border-border p-6 h-full transition-shadow hover:shadow-md">
                {/* Number badge */}
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-sm shadow-md">
                  {step.number}
                </div>

                <div className="pt-2">
                  <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

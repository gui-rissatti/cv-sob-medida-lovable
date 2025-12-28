import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: 'O que é um "uso"?',
    answer:
      "Um uso é descontado apenas quando a geração do CV é concluída com sucesso. Se houver erro ou você cancelar, o uso não é consumido. Você pode ver quantos usos restam na sua conta a qualquer momento.",
  },
  {
    question: "Preciso colar a descrição da vaga?",
    answer:
      "Não é obrigatório, mas altamente recomendado. Quando você adiciona a descrição da vaga, nosso sistema consegue destacar as experiências e habilidades mais relevantes, aumentando suas chances de passar pelo filtro ATS e chamar a atenção do recrutador.",
  },
  {
    question: "Posso editar o CV depois de gerado?",
    answer:
      "Sim! Após a geração, você tem acesso a um editor completo onde pode ajustar textos, reordenar seções, adicionar ou remover informações. Todas as alterações são salvas automaticamente.",
  },
  {
    question: "Posso salvar múltiplas versões?",
    answer:
      "Sim, cada geração fica salva no seu histórico. Você pode criar versões diferentes para vagas diferentes e acessá-las quando quiser. É útil para acompanhar quais CVs enviou para quais empresas.",
  },
  {
    question: "O PDF fica bem formatado?",
    answer:
      "Sim, geramos PDFs com formatação profissional, limpa e compatível com sistemas ATS. O layout é pensado para ser legível tanto por humanos quanto por softwares de triagem automática.",
  },
  {
    question: "Meus dados ficam seguros?",
    answer:
      "Sim, levamos privacidade a sério. Seus dados são criptografados e armazenados com segurança. Não compartilhamos suas informações com terceiros. Você pode excluir sua conta e todos os dados associados a qualquer momento.",
  },
  {
    question: "Posso usar em qualquer dispositivo?",
    answer:
      "Sim, o CV Sob Medida funciona em qualquer navegador moderno, seja no computador, tablet ou celular. Sua conta e histórico ficam sincronizados entre dispositivos.",
  },
  {
    question: "Os usos expiram?",
    answer:
      "Não, os usos que você compra não expiram. Use no seu próprio ritmo, quando precisar. Apenas os 3 usos gratuitos são válidos para novas contas.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Tire suas dúvidas sobre o CV Sob Medida.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

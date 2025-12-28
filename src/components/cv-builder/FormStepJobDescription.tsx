import { FileText, Sparkles, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormStepJobDescriptionProps {
  data: {
    jobDescription: string;
  };
  onChange: (data: Partial<FormStepJobDescriptionProps['data']>) => void;
}

export function FormStepJobDescription({ data, onChange }: FormStepJobDescriptionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Descrição da Vaga
        </h2>
        <p className="text-muted-foreground">
          Cole a descrição da vaga para gerar um CV ainda mais personalizado.
        </p>
      </div>

      {/* Benefit callout */}
      <div className="flex gap-3 rounded-lg border border-accent bg-accent/50 p-4">
        <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            Recomendado para melhores resultados
          </p>
          <p className="text-sm text-muted-foreground">
            Ao colar a descrição da vaga, nosso sistema destaca suas habilidades mais relevantes e ajusta o texto para sistemas ATS.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobDescription" className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Descrição da Vaga (opcional, mas recomendado)
        </Label>
        <Textarea
          id="jobDescription"
          placeholder="Cole aqui a descrição completa da vaga, incluindo requisitos, responsabilidades e qualificações desejadas..."
          value={data.jobDescription}
          onChange={(e) => onChange({ jobDescription: e.target.value })}
          className="min-h-[200px] resize-y"
        />
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
          <span>
            Quanto mais detalhes você fornecer, melhor será a personalização do seu CV.
          </span>
        </div>
      </div>
    </div>
  );
}

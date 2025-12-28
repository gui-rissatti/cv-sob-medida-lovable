import { FileText, Check, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface GenerationProgressProps {
  status: "generating" | "success" | "error";
  currentStep: number;
  onRetry?: () => void;
  onCancel?: () => void;
}

const GENERATION_STEPS = [
  { id: 1, label: "Organizando suas informações…" },
  { id: 2, label: "Analisando a descrição da vaga…" },
  { id: 3, label: "Ajustando experiências e habilidades…" },
  { id: 4, label: "Otimizando para ATS…" },
  { id: 5, label: "Finalizando seu CV…" },
];

export function GenerationProgress({
  status,
  currentStep,
  onRetry,
  onCancel,
}: GenerationProgressProps) {
  const progress = status === "success" ? 100 : (currentStep / GENERATION_STEPS.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 animate-fade-in">
      {/* Icon */}
      <div
        className={cn(
          "h-20 w-20 rounded-full flex items-center justify-center mb-6 transition-colors",
          status === "generating" && "bg-primary/10",
          status === "success" && "bg-success/10",
          status === "error" && "bg-destructive/10"
        )}
      >
        {status === "generating" && (
          <FileText className="h-10 w-10 text-primary animate-pulse-subtle" />
        )}
        {status === "success" && <Check className="h-10 w-10 text-success" />}
        {status === "error" && <AlertCircle className="h-10 w-10 text-destructive" />}
      </div>

      {/* Title */}
      <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-2">
        {status === "generating" && "Gerando seu CV..."}
        {status === "success" && "CV gerado com sucesso!"}
        {status === "error" && "Erro ao gerar CV"}
      </h2>

      <p className="text-muted-foreground text-center mb-8 max-w-md">
        {status === "generating" &&
          "Estamos adaptando suas informações para a vaga. Isso leva alguns segundos."}
        {status === "success" && "Seu CV está pronto para revisão e edição."}
        {status === "error" &&
          "Algo deu errado. Você pode tentar novamente sem perder seu rascunho ou gastar um uso."}
      </p>

      {/* Progress */}
      {status === "generating" && (
        <div className="w-full max-w-md space-y-4">
          <Progress value={progress} className="h-2" />

          <div className="space-y-2">
            {GENERATION_STEPS.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-3 text-sm transition-all duration-300",
                  step.id < currentStep && "text-success",
                  step.id === currentStep && "text-foreground font-medium",
                  step.id > currentStep && "text-muted-foreground/50"
                )}
              >
                <div className="w-5 flex justify-center">
                  {step.id < currentStep && <Check className="h-4 w-4" />}
                  {step.id === currentStep && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {step.id > currentStep && (
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-8">
        {status === "generating" && onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        {status === "error" && (
          <>
            <Button variant="outline" onClick={onCancel}>
              Voltar ao editor
            </Button>
            {onRetry && (
              <Button onClick={onRetry} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Tentar novamente
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

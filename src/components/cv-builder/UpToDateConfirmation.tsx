import { AlertCircle, Check, FileText, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DefaultCV {
  fileName: string;
  updatedAt: string;
}

interface UpToDateConfirmationProps {
  hasDefaultCV: boolean;
  defaultCV?: DefaultCV;
  confirmations: {
    experiencesUpdated: boolean;
    skillsUpdated: boolean;
    contactUpdated: boolean;
  };
  onConfirmationChange: (key: keyof UpToDateConfirmationProps["confirmations"], value: boolean) => void;
  saveAsDefault: boolean;
  onSaveAsDefaultChange: (value: boolean) => void;
  onUseDefault?: () => void;
  onUploadNew?: () => void;
}

export function UpToDateConfirmation({
  hasDefaultCV,
  defaultCV,
  confirmations,
  onConfirmationChange,
  saveAsDefault,
  onSaveAsDefaultChange,
  onUseDefault,
  onUploadNew,
}: UpToDateConfirmationProps) {
  const allConfirmed =
    confirmations.experiencesUpdated &&
    confirmations.skillsUpdated &&
    confirmations.contactUpdated;

  // User HAS a default CV saved
  if (hasDefaultCV && defaultCV) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-display text-lg font-semibold text-foreground">
            CV Padrão
          </h3>
        </div>

        <Card className="p-4 bg-accent/30 border-accent">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>

            <div className="flex-1">
              <p className="font-medium text-foreground">{defaultCV.fileName}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Atualizado em {defaultCV.updatedAt}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="default" size="sm" onClick={onUseDefault}>
                Usar CV padrão
              </Button>
              <Button variant="outline" size="sm" onClick={onUploadNew}>
                Enviar outro
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
          <Checkbox
            id="still-updated"
            checked={allConfirmed}
            onCheckedChange={(checked) => {
              const value = !!checked;
              onConfirmationChange("experiencesUpdated", value);
              onConfirmationChange("skillsUpdated", value);
              onConfirmationChange("contactUpdated", value);
            }}
          />
          <Label htmlFor="still-updated" className="text-sm cursor-pointer">
            Confirmo que meu CV padrão ainda está atualizado.
          </Label>
        </div>
      </div>
    );
  }

  // User has NO default CV
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-warning" />
          Este CV está atualizado?
        </h3>
        <p className="text-sm text-muted-foreground">
          Vamos usar este arquivo/perfil como base. Confirme se ele contém suas informações mais recentes.
        </p>
      </div>

      <Card className="p-4 space-y-4 border-warning/30 bg-warning/5">
        <div className="space-y-3">
          {/* Experience confirmation */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="exp-updated"
              checked={confirmations.experiencesUpdated}
              onCheckedChange={(checked) => onConfirmationChange("experiencesUpdated", !!checked)}
            />
            <Label htmlFor="exp-updated" className="text-sm cursor-pointer leading-relaxed">
              Minhas experiências estão atualizadas (cargo atual, datas, responsabilidades).
            </Label>
          </div>

          {/* Skills confirmation */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="skills-updated"
              checked={confirmations.skillsUpdated}
              onCheckedChange={(checked) => onConfirmationChange("skillsUpdated", !!checked)}
            />
            <Label htmlFor="skills-updated" className="text-sm cursor-pointer leading-relaxed">
              Minhas principais habilidades e tecnologias estão atualizadas.
            </Label>
          </div>

          {/* Contact confirmation */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="contact-updated"
              checked={confirmations.contactUpdated}
              onCheckedChange={(checked) => onConfirmationChange("contactUpdated", !!checked)}
            />
            <Label htmlFor="contact-updated" className="text-sm cursor-pointer leading-relaxed">
              Minhas informações de contato estão corretas.
            </Label>
          </div>
        </div>

        {/* All confirmed indicator */}
        {allConfirmed && (
          <div className="flex items-center gap-2 text-success text-sm pt-2 border-t border-border">
            <Check className="h-4 w-4" />
            <span>Tudo confirmado!</span>
          </div>
        )}
      </Card>

      {/* Save as default toggle */}
      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="save-default" className="text-sm font-medium cursor-pointer">
            Salvar como CV padrão
          </Label>
          <p className="text-xs text-muted-foreground">
            Assim você não precisa reenviar da próxima vez.
          </p>
        </div>
        <Switch
          id="save-default"
          checked={saveAsDefault}
          onCheckedChange={onSaveAsDefaultChange}
        />
      </div>
    </div>
  );
}

export function useUpToDateConfirmation() {
  const allConfirmed = (confirmations: UpToDateConfirmationProps["confirmations"]) =>
    confirmations.experiencesUpdated &&
    confirmations.skillsUpdated &&
    confirmations.contactUpdated;

  return { allConfirmed };
}

import { Settings2, Wand2, FileText, Globe, Target, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GenerationSettings } from "@/types/cv";

interface TailoringPanelProps {
  settings: GenerationSettings;
  onChange: (settings: GenerationSettings) => void;
  remainingCredits: number;
}

export function TailoringPanel({ settings, onChange, remainingCredits }: TailoringPanelProps) {
  const update = <K extends keyof GenerationSettings>(key: K, value: GenerationSettings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="flex h-full flex-col border-l border-border bg-sidebar">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border p-4">
        <Settings2 className="h-5 w-5 text-primary" />
        <h2 className="font-display text-lg font-semibold text-sidebar-foreground">
          Configurações
        </h2>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Tone */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Wand2 className="h-4 w-4 text-primary" />
              Tom do CV
            </Label>
            <RadioGroup
              value={settings.tone}
              onValueChange={(v) => update("tone", v as GenerationSettings["tone"])}
              className="space-y-2"
            >
              {[
                { value: "direto", label: "Direto", desc: "Objetivo e conciso" },
                { value: "tecnico", label: "Técnico", desc: "Foco em competências" },
                { value: "executivo", label: "Executivo", desc: "Estratégico e liderança" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-accent/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-accent"
                >
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <div>
                    <span className="text-sm font-medium">{opt.label}</span>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Length */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4 text-primary" />
              Tamanho
            </Label>
            <RadioGroup
              value={settings.length}
              onValueChange={(v) => update("length", v as GenerationSettings["length"])}
              className="flex gap-2"
            >
              {[
                { value: "1page", label: "1 página" },
                { value: "2pages", label: "2 páginas" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border p-3 cursor-pointer hover:bg-accent/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-accent text-sm"
                >
                  <RadioGroupItem value={opt.value} />
                  {opt.label}
                </label>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Language */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Globe className="h-4 w-4 text-primary" />
              Idioma do CV
            </Label>
            <RadioGroup
              value={settings.language}
              onValueChange={(v) => update("language", v as GenerationSettings["language"])}
              className="flex gap-2"
            >
              {[
                { value: "pt-BR", label: "Português" },
                { value: "en", label: "Inglês" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border p-3 cursor-pointer hover:bg-accent/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-accent text-sm"
                >
                  <RadioGroupItem value={opt.value} />
                  {opt.label}
                </label>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Focus */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Target className="h-4 w-4 text-primary" />
              Foco Principal
            </Label>
            <RadioGroup
              value={settings.focus}
              onValueChange={(v) => update("focus", v as GenerationSettings["focus"])}
              className="space-y-2"
            >
              {[
                { value: "relevancia", label: "Relevância para a vaga", desc: "Prioriza alinhamento com requisitos" },
                { value: "ats", label: "Palavras-chave ATS", desc: "Otimizado para sistemas de triagem" },
                { value: "impacto", label: "Impacto com métricas", desc: "Destaca resultados numéricos" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-accent/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-accent"
                >
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <div>
                    <span className="text-sm font-medium">{opt.label}</span>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Toggles */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4 text-primary" />
              Opções Adicionais
            </Label>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Incluir endereço</Label>
                  <p className="text-xs text-muted-foreground">Cidade e estado no cabeçalho</p>
                </div>
                <Switch
                  checked={settings.includeAddress}
                  onCheckedChange={(v) => update("includeAddress", v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Enfatizar liderança</Label>
                  <p className="text-xs text-muted-foreground">Destaca experiências de gestão</p>
                </div>
                <Switch
                  checked={settings.emphasizeLeadership}
                  onCheckedChange={(v) => update("emphasizeLeadership", v)}
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Credits Footer */}
      <div className="border-t border-border p-4 bg-accent/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Usos restantes</span>
          <span className="font-semibold text-foreground">{remainingCredits}</span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">
          1 uso = 1 geração bem-sucedida
        </p>
      </div>
    </div>
  );
}

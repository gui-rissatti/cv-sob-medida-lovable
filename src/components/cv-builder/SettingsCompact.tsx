import { Settings2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GenerationSettings } from "@/types/cv";

interface SettingsCompactProps {
  settings: GenerationSettings;
  onChange: (settings: GenerationSettings) => void;
}

export function SettingsCompact({ settings, onChange }: SettingsCompactProps) {
  const update = <K extends keyof GenerationSettings>(key: K, value: GenerationSettings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-primary" />
          Configurações
        </h3>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Tone */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tom do CV</Label>
          <RadioGroup
            value={settings.tone}
            onValueChange={(v) => update("tone", v as GenerationSettings["tone"])}
            className="flex flex-wrap gap-2"
          >
            {[
              { value: "direto", label: "Direto" },
              { value: "tecnico", label: "Técnico" },
              { value: "executivo", label: "Executivo" },
            ].map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 rounded-md border border-border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-accent text-sm"
              >
                <RadioGroupItem value={opt.value} className="sr-only" />
                {opt.label}
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Length */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tamanho</Label>
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
                className="flex items-center gap-2 rounded-md border border-border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-accent text-sm"
              >
                <RadioGroupItem value={opt.value} className="sr-only" />
                {opt.label}
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Idioma</Label>
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
                className="flex items-center gap-2 rounded-md border border-border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-accent text-sm"
              >
                <RadioGroupItem value={opt.value} className="sr-only" />
                {opt.label}
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Focus */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Foco principal</Label>
          <RadioGroup
            value={settings.focus}
            onValueChange={(v) => update("focus", v as GenerationSettings["focus"])}
            className="flex flex-wrap gap-2"
          >
            {[
              { value: "relevancia", label: "Relevância" },
              { value: "ats", label: "ATS" },
              { value: "impacto", label: "Impacto" },
            ].map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 rounded-md border border-border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-accent text-sm"
              >
                <RadioGroupItem value={opt.value} className="sr-only" />
                {opt.label}
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

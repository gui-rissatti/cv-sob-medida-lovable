import { Briefcase, MapPin, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormStepObjectiveProps {
  data: {
    targetRole: string;
    seniority: string;
    location: string;
  };
  onChange: (data: Partial<FormStepObjectiveProps['data']>) => void;
}

export function FormStepObjective({ data, onChange }: FormStepObjectiveProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Objetivo da Vaga
        </h2>
        <p className="text-muted-foreground">
          Para qual cargo você está se candidatando? Isso nos ajuda a personalizar seu CV.
        </p>
      </div>

      <div className="space-y-4">
        {/* Target Role */}
        <div className="space-y-2">
          <Label htmlFor="targetRole" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            Cargo Alvo <span className="text-destructive">*</span>
          </Label>
          <Input
            id="targetRole"
            placeholder="Ex.: Analista de Dados Pleno"
            value={data.targetRole}
            onChange={(e) => onChange({ targetRole: e.target.value })}
            className="h-12"
          />
          <p className="text-xs text-muted-foreground">
            Digite o cargo exato da vaga ou o mais próximo possível.
          </p>
        </div>

        {/* Seniority */}
        <div className="space-y-2">
          <Label htmlFor="seniority" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Nível de Senioridade
          </Label>
          <Select value={data.seniority} onValueChange={(value) => onChange({ seniority: value })}>
            <SelectTrigger id="seniority" className="h-12">
              <SelectValue placeholder="Selecione o nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="estagio">Estágio</SelectItem>
              <SelectItem value="junior">Júnior</SelectItem>
              <SelectItem value="pleno">Pleno</SelectItem>
              <SelectItem value="senior">Sênior</SelectItem>
              <SelectItem value="especialista">Especialista</SelectItem>
              <SelectItem value="lideranca">Liderança / Gestão</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Localização (opcional)
          </Label>
          <Input
            id="location"
            placeholder="Ex.: São Paulo, SP ou Remoto"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            className="h-12"
          />
        </div>
      </div>
    </div>
  );
}

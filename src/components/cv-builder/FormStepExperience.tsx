import { Building2, Calendar, Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  achievements: string;
}

interface FormStepExperienceProps {
  data: {
    experiences: Experience[];
  };
  onChange: (data: Partial<FormStepExperienceProps['data']>) => void;
}

export function FormStepExperience({ data, onChange }: FormStepExperienceProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      achievements: "",
    };
    onChange({ experiences: [...data.experiences, newExperience] });
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange({
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      experiences: data.experiences.filter((exp) => exp.id !== id),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Experiência Profissional
        </h2>
        <p className="text-muted-foreground">
          Adicione suas experiências mais relevantes para a vaga. Foque em resultados concretos.
        </p>
      </div>

      <div className="space-y-4">
        {data.experiences.map((exp, index) => (
          <Card key={exp.id} className="p-4 animate-scale-in">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground text-sm font-semibold">
                {index + 1}
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor={`company-${exp.id}`} className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      Empresa {index === 0 && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                      id={`company-${exp.id}`}
                      placeholder="Nome da empresa"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <Label htmlFor={`role-${exp.id}`}>
                      Cargo {index === 0 && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                      id={`role-${exp.id}`}
                      placeholder="Seu cargo na empresa"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${exp.id}`} className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Data de Início
                    </Label>
                    <Input
                      id={`startDate-${exp.id}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${exp.id}`}>
                      Data de Término
                    </Label>
                    <Input
                      id={`endDate-${exp.id}`}
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                      disabled={exp.isCurrent}
                      placeholder={exp.isCurrent ? "Atual" : ""}
                    />
                    <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.isCurrent}
                        onChange={(e) => updateExperience(exp.id, { isCurrent: e.target.checked, endDate: "" })}
                        className="rounded border-input"
                      />
                      Trabalho atual
                    </label>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <Label htmlFor={`achievements-${exp.id}`}>
                    Principais Conquistas e Responsabilidades
                  </Label>
                  <Textarea
                    id={`achievements-${exp.id}`}
                    placeholder="• Aumentei as vendas em 30% através de...&#10;• Liderei projeto que reduziu custos em...&#10;• Desenvolvi e implementei..."
                    value={exp.achievements}
                    onChange={(e) => updateExperience(exp.id, { achievements: e.target.value })}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Dica: Use bullet points e números para destacar resultados.
                  </p>
                </div>
              </div>

              {/* Remove button */}
              {data.experiences.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExperience(exp.id)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remover experiência"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}

        {/* Add more */}
        <Button
          type="button"
          variant="outline"
          onClick={addExperience}
          className="w-full border-dashed"
        >
          <Plus className="h-4 w-4" />
          Adicionar outra experiência
        </Button>
      </div>
    </div>
  );
}

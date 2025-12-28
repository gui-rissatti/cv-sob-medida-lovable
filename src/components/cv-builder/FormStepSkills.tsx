import { GraduationCap, Code, Languages, Award, X, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  endYear: string;
}

interface FormStepSkillsProps {
  data: {
    education: Education[];
    skills: string[];
    languages: { name: string; level: string }[];
  };
  onChange: (data: Partial<FormStepSkillsProps['data']>) => void;
}

export function FormStepSkills({ data, onChange }: FormStepSkillsProps) {
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [languageLevel, setLanguageLevel] = useState("intermediario");

  const addSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      onChange({ skills: [...data.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    onChange({ skills: data.skills.filter((s) => s !== skill) });
  };

  const addLanguage = () => {
    if (languageInput.trim() && !data.languages.some(l => l.name === languageInput.trim())) {
      onChange({ 
        languages: [...data.languages, { name: languageInput.trim(), level: languageLevel }] 
      });
      setLanguageInput("");
      setLanguageLevel("intermediario");
    }
  };

  const removeLanguage = (name: string) => {
    onChange({ languages: data.languages.filter((l) => l.name !== name) });
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange({
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      endYear: "",
    };
    onChange({ education: [...data.education, newEdu] });
  };

  const removeEducation = (id: string) => {
    onChange({ education: data.education.filter((edu) => edu.id !== id) });
  };

  const levelLabels: Record<string, string> = {
    basico: "Básico",
    intermediario: "Intermediário",
    avancado: "Avançado",
    fluente: "Fluente",
    nativo: "Nativo",
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Formação e Habilidades
        </h2>
        <p className="text-muted-foreground">
          Complete suas informações de educação, habilidades técnicas e idiomas.
        </p>
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-medium text-foreground flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Formação Acadêmica
        </h3>

        {data.education.map((edu, index) => (
          <Card key={edu.id} className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Formação {index + 1}
              </span>
              {data.education.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-muted-foreground hover:text-destructive h-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`institution-${edu.id}`}>Instituição</Label>
                <Input
                  id={`institution-${edu.id}`}
                  placeholder="Nome da universidade/escola"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`degree-${edu.id}`}>Grau</Label>
                <Select 
                  value={edu.degree} 
                  onValueChange={(value) => updateEducation(edu.id, { degree: value })}
                >
                  <SelectTrigger id={`degree-${edu.id}`}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="graduacao">Graduação</SelectItem>
                    <SelectItem value="pos-graduacao">Pós-Graduação</SelectItem>
                    <SelectItem value="mestrado">Mestrado</SelectItem>
                    <SelectItem value="doutorado">Doutorado</SelectItem>
                    <SelectItem value="curso-livre">Curso Livre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`field-${edu.id}`}>Área/Curso</Label>
                <Input
                  id={`field-${edu.id}`}
                  placeholder="Ex.: Ciência da Computação"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endYear-${edu.id}`}>Ano de Conclusão</Label>
                <Input
                  id={`endYear-${edu.id}`}
                  type="number"
                  placeholder="2024"
                  min="1950"
                  max="2030"
                  value={edu.endYear}
                  onChange={(e) => updateEducation(edu.id, { endYear: e.target.value })}
                />
              </div>
            </div>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addEducation}
          className="w-full border-dashed"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          Adicionar formação
        </Button>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-medium text-foreground flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          Habilidades Técnicas
        </h3>

        <div className="flex gap-2">
          <Input
            placeholder="Ex.: Python, Excel, Marketing Digital..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          />
          <Button type="button" variant="secondary" onClick={addSkill}>
            Adicionar
          </Button>
        </div>

        {data.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 rounded-full p-0.5 hover:bg-foreground/10"
                  aria-label={`Remover ${skill}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Languages Section */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-medium text-foreground flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          Idiomas
        </h3>

        <div className="flex gap-2">
          <Input
            placeholder="Ex.: Inglês, Espanhol..."
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            className="flex-1"
          />
          <Select value={languageLevel} onValueChange={setLanguageLevel}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basico">Básico</SelectItem>
              <SelectItem value="intermediario">Intermediário</SelectItem>
              <SelectItem value="avancado">Avançado</SelectItem>
              <SelectItem value="fluente">Fluente</SelectItem>
              <SelectItem value="nativo">Nativo</SelectItem>
            </SelectContent>
          </Select>
          <Button type="button" variant="secondary" onClick={addLanguage}>
            Adicionar
          </Button>
        </div>

        {data.languages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang) => (
              <Badge key={lang.name} variant="outline" className="gap-1 pr-1">
                {lang.name} - {levelLabels[lang.level]}
                <button
                  type="button"
                  onClick={() => removeLanguage(lang.name)}
                  className="ml-1 rounded-full p-0.5 hover:bg-foreground/10"
                  aria-label={`Remover ${lang.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

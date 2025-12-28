import { Folder, Award, Plus, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Project, Certification } from "@/types/cv";

interface FormStepExtrasProps {
  data: {
    projects: Project[];
    certifications: Certification[];
  };
  onChange: (data: Partial<FormStepExtrasProps["data"]>) => void;
}

export function FormStepExtras({ data, onChange }: FormStepExtrasProps) {
  // Projects
  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      url: "",
    };
    onChange({ projects: [...data.projects, newProject] });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onChange({
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const removeProject = (id: string) => {
    onChange({ projects: data.projects.filter((p) => p.id !== id) });
  };

  // Certifications
  const addCertification = () => {
    const newCert: Certification = {
      id: crypto.randomUUID(),
      name: "",
      issuer: "",
      year: "",
    };
    onChange({ certifications: [...data.certifications, newCert] });
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    onChange({
      certifications: data.certifications.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    });
  };

  const removeCertification = (id: string) => {
    onChange({ certifications: data.certifications.filter((c) => c.id !== id) });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Projetos e Certificações
        </h2>
        <p className="text-muted-foreground">
          Adicione projetos relevantes e certificações que destaquem suas competências (opcional).
        </p>
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-medium text-foreground flex items-center gap-2">
          <Folder className="h-5 w-5 text-primary" />
          Projetos
        </h3>

        {data.projects.map((project, index) => (
          <Card key={project.id} className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Projeto {index + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-muted-foreground hover:text-destructive h-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`project-name-${project.id}`}>Nome do Projeto</Label>
                <Input
                  id={`project-name-${project.id}`}
                  placeholder="Ex.: Sistema de Automação"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`project-url-${project.id}`} className="flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Link (opcional)
                </Label>
                <Input
                  id={`project-url-${project.id}`}
                  placeholder="github.com/seu-projeto"
                  value={project.url}
                  onChange={(e) => updateProject(project.id, { url: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`project-desc-${project.id}`}>Descrição</Label>
              <Textarea
                id={`project-desc-${project.id}`}
                placeholder="Descreva brevemente o projeto e seu impacto..."
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                className="min-h-[80px]"
              />
            </div>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addProject}
          className="w-full border-dashed"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          Adicionar projeto
        </Button>
      </div>

      {/* Certifications Section */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-medium text-foreground flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Certificações
        </h3>

        {data.certifications.map((cert, index) => (
          <Card key={cert.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Certificação {index + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(cert.id)}
                className="text-muted-foreground hover:text-destructive h-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor={`cert-name-${cert.id}`}>Nome</Label>
                <Input
                  id={`cert-name-${cert.id}`}
                  placeholder="Ex.: AWS Solutions Architect"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-issuer-${cert.id}`}>Emissor</Label>
                <Input
                  id={`cert-issuer-${cert.id}`}
                  placeholder="Amazon"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-year-${cert.id}`}>Ano</Label>
                <Input
                  id={`cert-year-${cert.id}`}
                  type="number"
                  placeholder="2024"
                  min="1990"
                  max="2030"
                  value={cert.year}
                  onChange={(e) => updateCertification(cert.id, { year: e.target.value })}
                />
              </div>
            </div>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addCertification}
          className="w-full border-dashed"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          Adicionar certificação
        </Button>
      </div>
    </div>
  );
}

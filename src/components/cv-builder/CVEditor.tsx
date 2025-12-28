import { useState } from "react";
import {
  Eye,
  Download,
  Save,
  RefreshCw,
  ChevronLeft,
  Sparkles,
  Check,
  X,
  Edit3,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { GeneratedCV } from "@/types/cv";
import { cn } from "@/lib/utils";

interface CVEditorProps {
  generatedCV: GeneratedCV;
  cvName: string;
  onCVChange: (cv: GeneratedCV) => void;
  onNameChange: (name: string) => void;
  onPreview: () => void;
  onExport: () => void;
  onSaveVersion: () => void;
  onRegenerate: () => void;
  onBack: () => void;
  isSaving: boolean;
}

type SectionId = "summary" | "experience" | "education" | "skills" | "languages";

const SECTIONS: Array<{ id: SectionId; label: string }> = [
  { id: "summary", label: "Resumo" },
  { id: "experience", label: "Experiência" },
  { id: "education", label: "Formação" },
  { id: "skills", label: "Habilidades" },
  { id: "languages", label: "Idiomas" },
];

interface Suggestion {
  id: string;
  type: "improve" | "ats" | "shorten";
  sectionId: SectionId;
  original: string;
  suggested: string;
  label: string;
}

export function CVEditor({
  generatedCV,
  cvName,
  onCVChange,
  onNameChange,
  onPreview,
  onExport,
  onSaveVersion,
  onRegenerate,
  onBack,
  isSaving,
}: CVEditorProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("summary");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(cvName);

  // Mock suggestions
  const [suggestions] = useState<Suggestion[]>([
    {
      id: "1",
      type: "improve",
      sectionId: "summary",
      original: generatedCV.summary.slice(0, 50),
      suggested: "Adicione métricas concretas para maior impacto.",
      label: "Melhorar impacto",
    },
    {
      id: "2",
      type: "ats",
      sectionId: "skills",
      original: "",
      suggested: "Adicionar: gestão de projetos, análise de dados",
      label: "Palavras-chave ATS",
    },
  ]);

  const handleNameSave = () => {
    onNameChange(tempName);
    setIsEditingName(false);
  };

  const handleSummaryChange = (value: string) => {
    onCVChange({ ...generatedCV, summary: value });
  };

  const handleBulletChange = (expIndex: number, bulletIndex: number, value: string) => {
    const newExp = [...generatedCV.experienceBlocks];
    newExp[expIndex].bullets[bulletIndex] = value;
    onCVChange({ ...generatedCV, experienceBlocks: newExp });
  };

  const applySuggestion = (suggestion: Suggestion) => {
    // In real app, apply the suggestion to the CV
    console.log("Applying suggestion:", suggestion);
  };

  const dismissSuggestion = (suggestionId: string) => {
    // In real app, remove from list
    console.log("Dismissing suggestion:", suggestionId);
  };

  return (
    <div className="flex h-full">
      {/* Left: Section Navigation */}
      <div className="w-48 border-r border-border bg-muted/30 flex flex-col">
        <div className="p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 -ml-2">
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                activeSection === section.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Button variant="outline" size="sm" className="w-full gap-1" onClick={onRegenerate}>
            <RefreshCw className="h-3.5 w-3.5" />
            Nova versão
          </Button>
        </div>
      </div>

      {/* Center: Editor */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <Input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-60 h-8"
                  autoFocus
                />
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleNameSave}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => {
                    setTempName(cvName);
                    setIsEditingName(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="flex items-center gap-2 text-lg font-display font-semibold hover:text-primary transition-colors"
              >
                {cvName || "CV sem nome"}
                <Edit3 className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            {isSaving && (
              <Badge variant="secondary" className="text-xs">
                Salvando...
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onSaveVersion} className="gap-1">
              <Save className="h-4 w-4" />
              Salvar versão
            </Button>
            <Button variant="outline" size="sm" onClick={onPreview} className="gap-1">
              <Eye className="h-4 w-4" />
              Pré-visualizar
            </Button>
            <Button size="sm" onClick={onExport} className="gap-1">
              <Download className="h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <Card className="p-6">
              <h3 className="font-display text-xl font-semibold mb-2">
                {generatedCV.headline}
              </h3>
              <p className="text-sm text-muted-foreground">{generatedCV.contact}</p>
            </Card>

            {/* Summary */}
            {activeSection === "summary" && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-display text-lg font-semibold">Resumo Profissional</h4>
                <Textarea
                  value={generatedCV.summary}
                  onChange={(e) => handleSummaryChange(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            )}

            {/* Experience */}
            {activeSection === "experience" && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-display text-lg font-semibold">Experiência</h4>
                {generatedCV.experienceBlocks.map((exp, expIndex) => (
                  <Card key={exp.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-semibold">{exp.role}</h5>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} • {exp.period}
                        </p>
                      </div>
                      <GripVertical className="h-5 w-5 text-muted-foreground/50 cursor-move" />
                    </div>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          <Input
                            value={bullet}
                            onChange={(e) =>
                              handleBulletChange(expIndex, bulletIndex, e.target.value)
                            }
                            className="flex-1"
                          />
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            )}

            {/* Education */}
            {activeSection === "education" && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-display text-lg font-semibold">Formação</h4>
                {generatedCV.educationBlocks.map((edu) => (
                  <Card key={edu.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-semibold">
                          {edu.degree} em {edu.field}
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {edu.institution} • {edu.year}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Skills */}
            {activeSection === "skills" && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-display text-lg font-semibold">Habilidades</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedCV.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {activeSection === "languages" && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-display text-lg font-semibold">Idiomas</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedCV.languages.map((lang, i) => (
                    <Badge key={i} variant="outline" className="text-sm">
                      {lang.name} — {lang.level}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right: Suggestions */}
      <div className="w-72 border-l border-border bg-sidebar flex flex-col">
        <div className="flex items-center gap-2 border-b border-border p-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-semibold">Sugestões</h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {suggestions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma sugestão no momento.
              </p>
            ) : (
              suggestions.map((sug) => (
                <Card key={sug.id} className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs",
                        sug.type === "improve" && "bg-primary/10 text-primary",
                        sug.type === "ats" && "bg-success/10 text-success",
                        sug.type === "shorten" && "bg-warning/10 text-warning"
                      )}
                    >
                      {sug.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{sug.suggested}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      className="flex-1 h-7 text-xs"
                      onClick={() => applySuggestion(sug)}
                    >
                      Aplicar
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => dismissSuggestion(sug.id)}
                    >
                      Ignorar
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

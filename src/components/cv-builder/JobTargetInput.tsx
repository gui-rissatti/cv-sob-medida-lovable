import { Link2, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface JobTargetInputProps {
  jobUrl: string;
  jobDescription: string;
  companyName: string;
  onJobUrlChange: (url: string) => void;
  onJobDescriptionChange: (description: string) => void;
  onCompanyNameChange: (name: string) => void;
}

export function JobTargetInput({
  jobUrl,
  jobDescription,
  companyName,
  onJobUrlChange,
  onJobDescriptionChange,
  onCompanyNameChange,
}: JobTargetInputProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Job URL */}
        <div className="space-y-2">
          <Label htmlFor="job-url" className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary" />
            URL da vaga
          </Label>
          <Input
            id="job-url"
            type="url"
            placeholder="https://empresa.com/vaga/..."
            value={jobUrl}
            onChange={(e) => onJobUrlChange(e.target.value)}
          />
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="company-name">Nome da empresa</Label>
          <Input
            id="company-name"
            placeholder="Ex.: Nubank, iFood, TOTVS..."
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
          />
        </div>
      </div>

      {/* Job Description */}
      <div className="space-y-2">
        <Label htmlFor="job-description" className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Descrição da vaga
        </Label>
        <Textarea
          id="job-description"
          placeholder="Cole aqui a descrição completa da vaga..."
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          className="min-h-[120px]"
        />
        <p className="text-xs text-muted-foreground">
          Dica: Inclua requisitos, responsabilidades e qualificações desejadas.
        </p>
      </div>
    </div>
  );
}

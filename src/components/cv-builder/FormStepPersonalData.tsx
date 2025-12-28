import { User, Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PersonalData } from "@/types/cv";

interface FormStepPersonalDataProps {
  data: PersonalData;
  onChange: (data: Partial<PersonalData>) => void;
}

export function FormStepPersonalData({ data, onChange }: FormStepPersonalDataProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Dados Pessoais
        </h2>
        <p className="text-muted-foreground">
          Informações de contato que aparecerão no seu CV.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Nome Completo <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="Seu nome completo"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            E-mail <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            Telefone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Cidade
          </Label>
          <Input
            id="city"
            placeholder="São Paulo"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
          />
        </div>

        {/* State */}
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            placeholder="SP"
            maxLength={2}
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value.toUpperCase() })}
          />
        </div>

        {/* LinkedIn */}
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4 text-primary" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/seuperfil"
            value={data.linkedin}
            onChange={(e) => onChange({ linkedin: e.target.value })}
          />
        </div>

        {/* Portfolio */}
        <div className="space-y-2">
          <Label htmlFor="portfolio" className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Portfólio / Site
          </Label>
          <Input
            id="portfolio"
            placeholder="seusite.com"
            value={data.portfolio}
            onChange={(e) => onChange({ portfolio: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

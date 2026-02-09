import { Button } from "@/components/ui/button";
import { RightAngleIcon } from "@/components/icons/rightAngle";
import { InfusionProvider } from "@/content/infusion-providers";

export const ProviderCard = ({ name, phone, websiteUrl, websiteLabel }: InfusionProvider) => (
  <div className="infusion-providers__card">
    <p className="infusion-providers__name" dangerouslySetInnerHTML={{ __html: name }} />
    {phone && (
      <p className="infusion-providers__phone">
        <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
      </p>
    )}
    <Button href={websiteUrl} variant="provider" className="infusion-providers__btn" target="_blank" rel="noopener noreferrer">
      <span className="min-w-0 truncate">{websiteLabel}</span> <RightAngleIcon className="size-5" />
    </Button>
  </div>
);

export const ProviderSection = ({ title, providers }: { title: string; providers: readonly InfusionProvider[] }) => (
  <section className="infusion-providers__section">
    <h4 className="infusion-providers__section-title">{title}</h4>
    <div className="infusion-providers__grid">
      {providers.map((provider) => (
        <ProviderCard key={provider.name} {...provider} />
      ))}
    </div>
  </section>
);
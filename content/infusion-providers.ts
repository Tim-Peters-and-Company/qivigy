export type InfusionProvider = {
  name: string;
  phone: string | null;
  websiteUrl: string;
  websiteLabel: string;
};

export const INFUSION_PROVIDERS = {
  distributors: [
    {
      name: "Accredo Health Group",
      phone: "1-866-820-4844",
      websiteUrl: "https://www.accredoivig.com",
      websiteLabel: "accredoivig.com",
    },
    {
      name: "AIC",
      phone: "1-877-443-4006",
      websiteUrl: "https://www.aiscaregroup.com",
      websiteLabel: "aiscaregroup.com",
    },
    {
      name: "American Outcomes Management, LP",
      phone: "1-800-746-9089",
      websiteUrl: "https://www.aominfusionrx.com",
      websiteLabel: "aominfusionrx.com",
    },
    {
      name: "AvevoRx",
      phone: "1-877-283-8679",
      websiteUrl: "https://www.avevorx.com",
      websiteLabel: "avevorx.com",
    },
    {
      name: "BioMatrix Specialty Pharmacy, LLC",
      phone: "1-877-567-8087",
      websiteUrl: "https://www.biomatrixsprx.com",
      websiteLabel: "biomatrixsprx.com",
    },
    {
      name: "Clinical Specialty Infusions of Dallas, LLC",
      phone: "1-833-569-1005",
      websiteUrl: "https://www.csipharmacy.com",
      websiteLabel: "csipharmacy.com",
    },
  ] satisfies InfusionProvider[],

  specialtyPharmacies: [
    {
      name: "The Consortium (CIIC)",
      phone: null,
      websiteUrl: "https://ciiclinics.org/",
      websiteLabel: "ciiclinics.org",
    },
    {
      name: "CVS Health<sup>®</sup>",
      phone: "1-866-899-1661",
      websiteUrl: "https://www.cvshealth.com",
      websiteLabel: "www.cvshealth.com",
    },
    {
      name: "Elevance",
      phone: null,
      websiteUrl: "https://www.elevancehealth.com",
      websiteLabel: "www.elevancehealth.com",
    },
    {
      name: "InfuCare Rx",
      phone: "1-877-828-3940",
      websiteUrl: "https://www.infucarerx.com",
      websiteLabel: "infucarerx.com",
    },
    {
      name: "KabaFusion, LLC",
      phone: "1-877-577-4844",
      websiteUrl: "https://www.kabafusion.com",
      websiteLabel: "kabafusion.com",
    },
    {
      name: "NUFactor Specialty Pharmacy",
      phone: "1-800-323-6832",
      websiteUrl: "https://www.nufactor.com",
      websiteLabel: "nufactor.com",
    },
    {
      name: "Option Care Health<sup>®</sup>",
      phone: "1-877-974-4844",
      websiteUrl: "https://www.optioncarehealth.com",
      websiteLabel: "optioncarehealth.com",
    },
    {
      name: "Optum Infusion Pharmacy",
      phone: "1-855-427-4682",
      websiteUrl: "https://www.optum.com",
      websiteLabel: "optum.com",
    },
    {
      name: "Promptcare Home Infusion, LLC",
      phone: "1-866-776-6782",
      websiteUrl: "https://www.promptcare.com",
      websiteLabel: "promptcare.com",
    },
    {
      name: "Soleo Health Inc.",
      phone: "1-844-575-1515",
      websiteUrl: "https://www.soleohealth.com",
      websiteLabel: "soleohealth.com",
    },
    {
      name: "Superior Biologics",
      phone: "1-855-494-3121",
      websiteUrl: "https://www.soleohealth.com",
      websiteLabel: "soleohealth.com",
    },
    {
      name: "Vital Care Infusion Services, LLC's Franchise Affiliates",
      phone: "1-800-447-4905",
      websiteUrl: "https://www.vitalcare.com",
      websiteLabel: "vitalcare.com",
    },
  ] satisfies InfusionProvider[],
} as const;

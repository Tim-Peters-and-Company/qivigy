export type InfusionProvider = {
  name: string;
  phone: string | null;
  websiteUrl: string;
  websiteLabel: string;
};

export const INFUSION_PROVIDERS = {
  distributors: [
    {
      name: "CuraScript SD by Evernorth",
      phone: "1-877-599-7748",
      websiteUrl: "https://www.curascriptsd.com",
      websiteLabel: "curascriptsd.com",
    },
  ] satisfies InfusionProvider[],

  acuteGpos: [
    {
      name: "Premier Inc.",
      phone: "1-877-777-1552",
      websiteUrl: "https://www.premierinc.com",
      websiteLabel: "premierinc.com",
    },
  ] satisfies InfusionProvider[],

  nonAcuteGpos: [
    {
      name: "Innovatix",
      phone: "1-877-777-1552",
      websiteUrl: "https://www.innovatix.com",
      websiteLabel: "innovatix.com",
    },
  ] satisfies InfusionProvider[],

  specialtyPharmacies: [
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
      name: "BlueSky/BlueBird",
      phone: "000-000-0000",
      websiteUrl: "#",
      websiteLabel: "TKTK",
    },
    {
      name: "Clinical Specialty Infusions of Dallas, LLC",
      phone: "1-833-569-1005",
      websiteUrl: "https://www.csipharmacy.com",
      websiteLabel: "csipharmacy.com",
    },
    {
      name: "Elevance",
      phone: null,
      websiteUrl: "https://www.elevancehealth.com",
      websiteLabel: "www.elevancehealth.com",
    },
    {
      name: "Local Infusion",
      phone: "000-000-0000",
      websiteUrl: "#",
      websiteLabel: "TKTK",
    },
    {
      name: "Optum Infusion Pharmacy",
      phone: "1-855-427-4682",
      websiteUrl: "https://www.optum.com",
      websiteLabel: "optum.com",
    },
    {
      name: "Soleo Health Inc.",
      phone: "1-844-575-1515",
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

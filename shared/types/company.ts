export interface Site {
    phoneNumbers: any[];
    emailAddresses: any[];
}

export interface Category {
    sector: string;
    industryGroup: string;
    industry: string;
    subIndustry: string;
    sicCode: string;
    naicsCode: string;
}

export interface Geo {
    streetNumber: string;
    streetName: string;
    subPremise?: any;
    city: string;
    postalCode: string;
    state: string;
    stateCode: string;
    country: string;
    countryCode: string;
    lat: number;
    lng: number;
}

export interface Facebook {
    handle: string;
    likes: number;
}

export interface Linkedin {
    handle: string;
}

export interface Twitter {
    handle: string;
    id: string;
    bio: string;
    followers: number;
    following: number;
    location: string;
    site: string;
    avatar: string;
}

export interface Crunchbase {
    handle: string;
}

export interface Identifiers {
    usEIN: string;
}

export interface Metrics {
    alexaUsRank: number;
    alexaGlobalRank: number;
    employees: number;
    employeesRange: string;
    marketCap: number;
    raised?: any;
    annualRevenue: number;
    estimatedAnnualRevenue: string;
    fiscalYearEnd: number;
}

export interface Parent {
    domain: string;
}

export interface UltimateParent {
    domain: string;
}

export interface Company {
    id: string;
    name: string;
    legalName: string;
    domain: string;
    domainAliases: string[];
    site: Site;
    category: Category;
    tags: string[];
    description: string;
    foundedYear: number;
    location: string;
    timeZone: string;
    utcOffset: number;
    geo: Geo;
    logo: string;
    facebook: Facebook;
    linkedin: Linkedin;
    twitter: Twitter;
    crunchbase: Crunchbase;
    emailProvider: boolean;
    type: string;
    ticker: string;
    identifiers: Identifiers;
    phone: string;
    metrics: Metrics;
    indexedAt: Date;
    tech: string[];
    techCategories: string[];
    parent: Parent;
    ultimate_parent: UltimateParent;
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, first, firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private cache = new Map<string, any>();
  selectedCompaniesDomains$ = new BehaviorSubject<{
    domain: string,
    isLiked: boolean
  }[]>([]);

  selectedCompanies$: Observable<CompanyModel[]> = this.selectedCompaniesDomains$.pipe(
    map(companyModels => companyModels.map((model) => {
      return {
        data: this.cache.get(model.domain),
        isLiked: model.isLiked
      }
    }))
  );

  constructor(
    private httpClient: HttpClient
  ) { }

  async addSelectedCompany(domain: string): Promise<'added' | 'exists' | 'failed'> {
    if (this.cache.has(domain)) {
      return 'exists';
    }

    const res = await this.fetchCompanyData(domain);
    if (res.success) {
      this.saveCompany(domain, res);
      return 'added'
    } else {
      return 'failed'
    }
  };

  async getCompany(domain: string): Promise<CompanyModel> {
    const companies = await firstValueFrom(this.selectedCompanies$);
    const company =  companies.find(company => company.data.domain === domain);
    if (company) {
      return company
    } else {
       throw new Error('cant find company')
    }
  }

  private saveCompany(domain: string, res: ServerResponse<Company, ErrorTypes>) {
    this.cache.set(domain, res.data);
    this.selectedCompaniesDomains$.next(
      [...this.selectedCompaniesDomains$.value, {
        domain,
        isLiked: false
      }]
    )
  }

  private async fetchCompanyData(domain: string) {
    return await firstValueFrom(
      this.httpClient.get<ServerResponse<Company, ErrorTypes>>(`http://localhost:3000/company?domain=${domain}`)
    );
  }
}

export interface CompanyModel {
  data: Company
  isLiked: boolean
}

export interface ServerResponse<Data, ErrorType> {
  success: boolean,
  data?: Data,
  errorType?: ErrorType
}

export enum ErrorTypes {
  NotFound = 'notFound'
}

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

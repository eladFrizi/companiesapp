import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { CompaniesService, Company, CompanyModel } from './companies.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyResolver implements Resolve<CompanyModel> {
  constructor(
    private companiesService: CompaniesService
  ){ }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<CompanyModel> {
    const companyDomain = route.queryParamMap.get('domain') as string;
    return this.companiesService.getCompany(companyDomain);
  }
}

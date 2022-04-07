import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CompaniesService, Company } from '../companies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  newDomainInput = new FormControl('google.com');
  selectedCompanies$ = this.companiesService.selectedCompanies$;
  isLoadingNewCompany$ = new BehaviorSubject(false);


  constructor(
    private companiesService: CompaniesService
  ) { }

  ngOnInit(): void {
  }

  async handleAddNewCompany(){
    this.isLoadingNewCompany$.next(true);
    const newCompanyDomain = this.newDomainInput.value;
    const status = await this.companiesService.addSelectedCompany(newCompanyDomain);
    this.isLoadingNewCompany$.next(false);
  }

  async handleCompanyClicked(company: Company) {
    console.log('handlClick', company)
  }
}

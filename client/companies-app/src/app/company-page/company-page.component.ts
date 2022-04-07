import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company, CompanyModel } from '../companies.service';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit {

  company: CompanyModel | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.company = this.route.snapshot.data['company'];
  }

}

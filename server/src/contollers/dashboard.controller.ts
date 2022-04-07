import { Express, Request } from 'express';
import { fetchCompany } from '../services/company.service';

export function registerDashboardController(app: Express) {

    app.get('/company', async (req: Request<{},{},{},{
        domain: string
    }>, res) => {
        try {
            const companyDomain = req.query.domain;
            const company = await fetchCompany(companyDomain)
            res.status(200).json(company);
        } catch {
            res.status(500).send();
        }
    });
}
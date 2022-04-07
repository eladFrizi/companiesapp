import axios from 'axios'
import { Company } from '../../../shared/types/company'
import { ErrorTypes, ServerResponse } from '../../../shared/types/serverResponse';

export async function fetchCompany(domain: string): Promise<ServerResponse<Company, ErrorTypes>> {
    const response = await axios.get<Company | { error: { type: string } }>(`https://company.clearbit.com/v2/companies/find?domain=${domain}`, {
        headers: {
            'Authorization': 'Bearer sk_30240e2d1dfc1d73d26ab80390d1fd49'
        }
    });
    const data = response.data;
    if ("error" in data) {
        const isDomainNotFound = data.error.type === 'queued';
        if (isDomainNotFound) {
            return {
                success: false,
                errorType: ErrorTypes.NotFound
            }
        } else {
            throw new Error("Unknown error")
        }
    } else {
        return {
            success: true,
            data: response.data as Company
        }
    }
}


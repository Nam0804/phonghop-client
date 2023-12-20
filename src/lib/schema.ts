import { z } from "zod";

export const FormDataSchema = z.object({
    company_name: z.string().min(1).max(50),
    company_domain: z.string().min(1).max(50),
    company_address: z.string().min(1).max(200),
    company_taxcode: z.string().min(1).max(50),
});
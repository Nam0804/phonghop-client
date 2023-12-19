import { z } from "zod";

export const FormDataSchema = z.object({
    name: z.string().min(1).max(50),
    email: z.string().email(),
    message: z.string().min(1).max(1000),
    company_name: z.string().min(1).max(50),
    company_domain: z.string().min(1).max(50),
    company_address: z.string().min(1).max(200),
    company_taxcode: z.string().min(1).max(50),
    mng_name: z.string().min(1).max(50),

});
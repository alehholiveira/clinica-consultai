export interface User {
    map: any;
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    cep: string;
    numero: string;
    role: string;
}

export interface Appointment {
    map: any;
    id: number;
    patient_id: number;
    psychologist_id: number;
    date: string;
    time: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

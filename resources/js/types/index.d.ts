export interface User {
    map: any;
    id: number;
    name: string;
    logradouro: string,
    bairro: string,
    localidade: string,
    uf: string,
    celular: string,
    role: string;
}

export interface Appointment {
    map: any;
    id: number;
    patient_id: number;
    patient: User
    psychologist_id: number;
    psychologist: User
    date: string;
    time: string;
    created_at: string;
    updated_at: string;
    hasMeetingSession: any
}

export interface MeetingSession {
    map: any;
    id: number;
    referrals: string
    attendance_certificates: string
    meeting_annotation: string
    appointment_id: number
    created_at: string;
    updated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

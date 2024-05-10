import PrimaryButton from "@/Components/PrimaryButton";
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function AppointmentForm({ patients, psychologists }: { patients: User, psychologists: User }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        time: '',
        patient_id: '',
        psychologist_id: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(errors)
        console.log(data)
        post('/create-consulta');
    };

    return (
        <form onSubmit={submit}>
            <label>
                Data:
                <input type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} required />
            </label>
            <label>
                Hora:
                <input type="time" value={data.time} onChange={(e) => setData('time', e.target.value)} required />
            </label>
            <label>
                Paciente:
                <select value={data.patient_id} onChange={(e) => setData('patient_id', e.target.value)} required>
                    <option value="">Selecione um paciente</option>
                    {patients.map((patient: User) => (
                        <option key={patient.id} value={patient.id}>{patient.name}</option>
                    ))}
                </select>
            </label>
            <label>
                Psicólogo:
                <select value={data.psychologist_id} onChange={(e) => setData('psychologist_id', e.target.value)} required>
                    <option value="">Selecione um psicólogo</option>
                    {psychologists.map((psychologist: User) => (
                        <option key={psychologist.id} value={psychologist.id}>{psychologist.name}</option>
                    ))}
                </select>
            </label>
            <PrimaryButton className="ms-4" disabled={processing}>
                Criar consulta
            </PrimaryButton>
        </form>
    );
}

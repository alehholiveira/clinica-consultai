import { useRef, useState, FormEventHandler } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '', patientid }: { className?: string, patientid: number }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        delete: destroy,
        processing,
        reset,
    } = useForm();

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy', patientid), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Deletar paciente</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Depois que a conta for excluída, todos os recursos e dados serão excluídos permanentemente. Antes
                    excluir o paciente, baixe quaisquer dados ou informações que você deseja reter.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Deletar Paciente</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Tem certeza de que deseja excluir esse paciente?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Depois que o paciente conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Por favor, tenha ciência desse ato antes de prosseguir.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>
                            Deletar Paciente
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import { Head, useForm } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';

export default function Edit({ auth, patient }: PageProps<{ patient: User }>) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: patient.name,
        logradouro: patient.logradouro,
        bairro: patient.bairro,
        localidade: patient.localidade,
        uf: patient.uf,
        celular: patient.celular,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update', patient.id), {
            onSuccess: () => {
                console.log('Profile updated successfully');
            },
            onError: (error) => {
                console.error('Failed to update profile:', error);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Update your account's profile information and email address.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="logradouro" value="Logradouro" />
                                    <TextInput
                                        id="logradouro"
                                        className="mt-1 block w-full"
                                        value={data.logradouro}
                                        onChange={(e) => setData('logradouro', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.logradouro} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="bairro" value="Bairro" />
                                    <TextInput
                                        id="bairro"
                                        className="mt-1 block w-full"
                                        value={data.bairro}
                                        onChange={(e) => setData('bairro', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.bairro} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="localidade" value="Localidade" />
                                    <TextInput
                                        id="localidade"
                                        className="mt-1 block w-full"
                                        value={data.localidade}
                                        onChange={(e) => setData('localidade', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.localidade} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="uf" value="UF" />
                                    <TextInput
                                        id="uf"
                                        className="mt-1 block w-full"
                                        value={data.uf}
                                        onChange={(e) => setData('uf', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.uf} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="celular" value="Celular" />
                                    <TextInput
                                        id="celular"
                                        className="mt-1 block w-full"
                                        value={data.celular}
                                        onChange={(e) => setData('celular', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.celular} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" patientid={patient.id} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

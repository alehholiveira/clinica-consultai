import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({permissao}: {permissao:string}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        cep: '',
        numero: '',
        role: permissao
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(errors)
        post('/register');
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="cep" value="CEP" />

                    <TextInput
                        id="cep"
                        name="cep"
                        value={data.cep}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('cep', e.target.value)}
                        required
                    />

                    <InputError message={errors.cep} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="numero" value="Número de celular" />

                    <TextInput
                        id="numero"
                        name="numero"
                        value={data.numero}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('numero', e.target.value)}
                        required
                    />

                    <InputError message={errors.numero} className="mt-2" />
                </div>
                

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
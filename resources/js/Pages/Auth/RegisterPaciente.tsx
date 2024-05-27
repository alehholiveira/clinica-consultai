import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        celular: '',
        role: 'paciente'
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(errors)
        post('/register-paciente');
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
                {/* implementar a logica da api do cep!!!!!!! */}
                <div>
                    <InputLabel htmlFor="logradouro" value="Logradouro" />

                    <TextInput
                        id="logradouro"
                        name="logradouro"
                        value={data.logradouro}
                        className="mt-1 block w-full"
                        autoComplete="logradouro"
                        isFocused={true}
                        onChange={(e) => setData('logradouro', e.target.value)}
                        required
                    />

                    <InputError message={errors.logradouro} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="bairro" value="Bairro" />

                    <TextInput
                        id="bairro"
                        name="bairro"
                        value={data.bairro}
                        className="mt-1 block w-full"
                        autoComplete="bairro"
                        isFocused={true}
                        onChange={(e) => setData('bairro', e.target.value)}
                        required
                    />

                    <InputError message={errors.bairro} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="localidade" value="localidade" />

                    <TextInput
                        id="localidade"
                        name="localidade"
                        value={data.localidade}
                        className="mt-1 block w-full"
                        autoComplete="localidade"
                        isFocused={true}
                        onChange={(e) => setData('localidade', e.target.value)}
                        required
                    />

                    <InputError message={errors.localidade} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="uf" value="uf" />

                    <TextInput
                        id="uf"
                        name="uf"
                        value={data.uf}
                        className="mt-1 block w-full"
                        autoComplete="uf"
                        isFocused={true}
                        onChange={(e) => setData('uf', e.target.value)}
                        required
                    />

                    <InputError message={errors.uf} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="celular" value="Número de celular" />

                    <TextInput
                        id="celular"
                        name="celular"
                        value={data.celular}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('celular', e.target.value)}
                        required
                    />

                    <InputError message={errors.celular} className="mt-2" />
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

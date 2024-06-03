import { FormEventHandler, useState, ChangeEvent } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function Register() {
    const [isPsychologist, setIsPsychologist] = useState(false);

    const {
        data: patientData,
        setData: setPatientData,
        post: postPatient,
        processing: processingPatient,
        errors: patientErrors,
        reset: resetPatient,
    } = useForm({
        email: '',
        name: '',
        cep: '',
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        celular: '',
        role: 'paciente'
    });

    const {
        data: psychologistData,
        setData: setPsychologistData,
        post: postPsychologist,
        processing: processingPsychologist,
        errors: psychologistErrors,
        reset: resetPsychologist,
    } = useForm({
        email: '',
        name: '',
        role: 'psicologo'
    });

    const fetchCepData = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (!data.erro) {
                setPatientData((prevData) => ({
                    ...prevData,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    localidade: data.localidade,
                    uf: data.uf,
                }));
            } else {
                alert('CEP não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
            alert('Erro ao buscar o CEP');
        }
    };

    const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value;
        setPatientData('cep', cep);
        if (cep.length === 8) {
            fetchCepData(cep);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isPsychologist) {
            postPsychologist('/register-psicologo');
        } else {
            postPatient('/register-paciente');
        }
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="flex justify-center mb-4">
                <button
                    className={`flex-1 py-2 text-center ${!isPsychologist ? 'text-blue-500 font-bold border-b-2 border-blue-500' : 'text-gray-500'}`}
                    onClick={() => setIsPsychologist(false)}
                >
                    Paciente
                </button>
                <button
                    className={`flex-1 py-2 text-center ${isPsychologist ? 'text-blue-500 font-bold border-b-2 border-blue-500' : 'text-gray-500'}`}
                    onClick={() => setIsPsychologist(true)}
                >
                    Psicólogo
                </button>
            </div>
            {!isPsychologist ? (
                <div className=" bg-white border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-100 relative">
                    <form onSubmit={submit} >
                        <div className='relative my-4'>
                            <input
                                id="email"
                                value={patientData.email}
                                className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                                placeholder="Email para contato"
                                onChange={(e) => setPatientData('email', e.target.value)}
                            />
                            <label
                                htmlFor=''
                                className="absolute text-lg text-black duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                            >
                                Email para contato
                            </label>
                            <InputError message={patientErrors.email} className="mt-2" />
                        </div>
                        <div className='relative my-4'>
                            <input
                                id="name"
                                value={patientData.name}
                                className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                                placeholder="Nome do Paciente"
                                onChange={(e) => setPatientData('name', e.target.value)}
                            />
                            <label
                                htmlFor=''
                                className="absolute text-lg text-black duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                            >
                                Nome do Paciente
                            </label>
                            <InputError message={patientErrors.name} className="mt-2" />
                        </div>
                        <div className='relative my-4'>
                            <input
                                id="cep"
                                value={patientData.cep}
                                className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                                placeholder="CEP do Paciente"
                                onChange={handleCepChange}
                                required
                            />
                            <label
                                htmlFor=''
                                className="absolute text-lg text-black duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                            >
                                CEP do Paciente
                            </label>
                        </div>
                        <div className='relative my-4'>
                            <input
                                id="logradouro"
                                value={patientData.logradouro}
                                className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                                placeholder=""
                                onChange={(e) => setPatientData('logradouro', e.target.value)}
                            />
                            <label
                                htmlFor=''
                                className="absolute text-lg text-black duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                            >
                                Endereço
                            </label>
                            <InputError message={patientErrors.logradouro} className="mt-2" />
                        </div>
                        <div className='relative my-4'>
                            <input
                                id="bairro"
                                value={patientData.bairro}
                                className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                                placeholder=""
                                onChange={(e) => setPatientData('bairro', e.target.value)}
                            />
                            <label
                                htmlFor=''
                                className="absolute text-lg text-black duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                            >
                                Bairro
                            </label>
                            <InputError message={patientErrors.bairro} className="mt-2" />
                        </div>
                        <div className='relative my-4'>
                            <input
                                id="localidade"
                                value={patientData.localidade}
                                className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                                placeholder=""
                                onChange={(e) => setPatientData('localidade', e.target.value)}
                            />
                            <label
                                htmlFor=''
                                className="absolute text-lg text-black duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                            >
                                Cidade
                            </label>
                            <InputError message={patientErrors.localidade} className="mt-2" />
                        </div>
                        <div className='relative my-4'>
                            <input
                                id="uf"
                                value={patientData.uf}
                                className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                                placeholder=""
                                onChange={(e) => setPatientData('uf', e.target.value)}
                            />
                            <label
                                htmlFor=''
                                className="absolute text-lg text-black duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                            >
                                Estado
                            </label>
                            <InputError message={patientErrors.uf} className="mt-2" />
                        </div>
                        <div className='relative my-4'>
                            <input
                                id="celular"
                                value={patientData.celular}
                                className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                                placeholder="Número do Paciente"
                                onChange={(e) => setPatientData('celular', e.target.value)}
                            />
                            <label
                                htmlFor=''
                                className="absolute text-lg text-black duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                            >
                                Número para contato
                            </label>
                            <InputError message={patientErrors.celular} className="mt-2" />
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={processingPatient}>
                                Cadastrar
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            ) : (
                <div className=" bg-white border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-100 relative">
                    <form onSubmit={submit}>
                        <div className='relative my-4'>
                            <input
                                id="email"
                                value={psychologistData.email}
                                className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                                placeholder="Email para contato"
                                onChange={(e) => setPsychologistData('email', e.target.value)}
                            />
                            <label
                                htmlFor=''
                                className="absolute text-lg text-black duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                            >
                                Email para contato
                            </label>
                            <InputError message={patientErrors.email} className="mt-2" />
                        </div>
                        <div className='relative my-4'>
                            <input
                                id="nome"
                                value={psychologistData.name}
                                className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                                placeholder="Nome do psicólogo"
                                onChange={(e) => setPsychologistData('name', e.target.value)}
                            />
                            <label
                                htmlFor=''
                                className="absolute text-lg text-black duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                            >
                                Nome do psicólogo
                            </label>
                            <InputError message={psychologistErrors.name} className="mt-2" />
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={processingPsychologist}>
                                Cadastrar
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            )
            }
        </GuestLayout >
    );
}

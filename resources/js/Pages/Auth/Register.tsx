import { useEffect, FormEventHandler, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };
    const [cep, setCep] = useState("");

    return (
        <GuestLayout>
            <div className=" bg-white border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-100 relative">
                <h1 className="text-4xl text-indigo-500 font-bold text-center mb-6">
                    Cadastrar
                </h1>
                <form onSubmit={submit}>
                    <div className="relative my-4">
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                            autoComplete="name"
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <label
                            htmlFor=""
                            className="absolute text-sm text-indigo-500 duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                        >
                            Nome
                        </label>
                        <BiUser className=" absolute top-4 right-4" />
                    </div>

                    <div className="relative my-4">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <label
                            htmlFor=""
                            className="absolute text-sm text-indigo-500 duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                        >
                            Email
                        </label>
                        <BiUser className=" absolute top-4 right-4" />
                    </div>

                    <div className="relative my-4">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <label
                            htmlFor=""
                            className="absolute text-sm text-indigo-500 duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                        >
                            Senha
                        </label>
                        <AiOutlineLock className=" absolute top-4 right-4" />
                    </div>

                    <div className="relative my-4">
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                        <label
                            htmlFor=""
                            className="absolute text-sm text-indigo-500 duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                        >
                            Confirmar Senha
                        </label>
                        <AiOutlineLock className=" absolute top-4 right-4" />
                    </div>
                    <div className="relative my-4">
                        <input
                            className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                            onChange={(e) => setCep(e.target.value)}
                        />
                        <label
                            htmlFor=""
                            className="absolute text-sm text-indigo-500 duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                        >
                            CEP
                        </label>
                        <IoHomeOutline className=" absolute top-4 right-4" />
                    </div>

                    <button
                        className="w-full mb-4 text-[18px] mt-6 rounded-full bg-indigo-500 text-white hover:bg-sky-500 hover:text-black py-2 transition-colors duration-300 "
                        type="submit"
                    >
                        CADASTRAR
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}

import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import InputError from "@/Components/InputError";

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <div className=" bg-white border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-100 relative">
                <h1 className="text-4xl text-indigo-500 font-bold text-center mb-6">
                    Login
                </h1>
                <form onSubmit={submit}>
                    <div className="relative my-4">
                        <input
                            id="username"
                            type="username"
                            name="username"
                            value={data.username}
                            className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                            autoComplete="username"
                            onChange={(e) => setData("username", e.target.value)}
                        />
                        <InputError message={errors.username} className="mt-2" />
                        <label
                            htmlFor=""
                            className="absolute text-sm text-black duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                        >
                            Username
                        </label>
                        <BiUser className=" absolute top-4 right-4" />
                    </div>

                    <div className="relative my-4">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-indigo-500 appearnce-none dark:focus:border-blue-500 focus: outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer "
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError message={errors.password} className="mt-2" />
                        <label
                            htmlFor=""
                            className="absolute text-sm text-indigo-500 duration-300  transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer placeholder-shown:scale-100 peer-placeholder-shown:trasnlate-y-0 peer-focus:sacale-75 peer-focus:-translate-y-6 "
                        >
                            Senha
                        </label>
                        <AiOutlineLock className=" absolute top-4 right-4" />
                    </div>
                    <button
                        className="w-full mb-4 text-[18px] mt-6 rounded-full bg-indigo-500 text-emerald-800 hover:bg-sky-500 hover:text-black py-2 transition-colors duration-300 "
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}

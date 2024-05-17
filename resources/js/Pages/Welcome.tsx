import { PageProps } from "@/types";
import logo from "../assets/logo2.png";
import ex1 from "../assets/exemplo 1.png";
import ex2 from "../assets/exemplo2.png";
import { BiUser } from "react-icons/bi";


const navigation = [
    { label: "Dashboard", href: "#" },
    { label: "Equipe", href: "#" },
    { label: "Clientes", href: "#" },
    { label: "Sobre Nós", href: "#" },
];
const cores = ["from-green-500 via-teal-500 to-blue-500"];

const equipe = [
    {
        //icon: <BiUser/>,
        text: "Dr. Magaldi",
        description:
            "Neuropsicologia: Avalia e trata problemas relacionados a lesões cerebrais e transtornos neurológicos",
    },
    {
        //icon: <BiUser/>,
        text: "Dr. Tahara",
        description:
            "Psicologia do Trânsito: Focada na avaliação psicológica para motoristas e na prevenção de acidentes",
    },
    {
        ////icon: <BiUser/>,
        text: "Dra. Silva",
        description:
            "Psicologia do Esporte: Apoia atletas a melhorar o desempenho mental e lidar com a pressão competitiva",
    },
    {
        //icon: <BiUser/>,
        text: "Dra. Moreira",
        description:
            "Psicologia Organizacional: Ajuda a melhorar a produtividade e o bem-estar dos funcionários nas empresas",
    },
    {
        icon: <BiUser />,
        text: "Dr. Oliveira",
        description:
            "Psicologia Cognitiva: Investiga processos mentais como percepção, memória e resolução de problemas",
    },
    {
        //icon: <BiUser/>,
        text: "Dr. Xastre",
        description:
            "Psicologia Escolar: Auxilia no desenvolvimento acadêmico e emocional de crianças e adolescentes",
    },
];
export const Clientes = [
    {
        user: "Matheus Antonelli",
        icon: <BiUser />,
        text: '"Superar obstáculos pessoais e crescer a cada dia tem sido minha maior conquista. Sou grato por ter encontrado o suporte necessário para essa transformação"',
    },
    {
        user: "Lucas Oliveira",
        icon: <BiUser />,
        text: '"Encontrar equilíbrio emocional foi uma jornada desafiadora, mas com apoio profissional, estou finalmente no caminho certo. Cada avanço é uma vitória pessoal."',
    },

    {
        user: "Isabela Santos",
        icon: <BiUser />,
        text: '"Ser ouvido e compreendido mudou minha vida. Aprendi a valorizar minha saúde mental e a cuidar melhor de mim mesmo."',
    },
    {
        user: "Pedro Almeida",
        icon: <BiUser />,
        text: '"Buscar ajuda foi um grande passo para mim. Aprendi a enfrentar meus medos e a construir uma vida mais feliz e saudável."',
    },
    {
        user: "Camila Costa",
        icon: <BiUser />,
        text: '"Cada sessão de terapia é um passo adiante na minha jornada pessoal. Celebrar pequenas conquistas tem sido fundamental para meu bem-estar."',
    },
    {
        user: "Rafael Pereira",
        icon: <BiUser />,
        text: '"Desenvolver resiliência e encontrar forças internas para lidar com a vida cotidiana tem sido minha maior realização. Estou construindo um futuro mais brilhante."',
    },
];

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };
    return (
        <>
            <nav className="sticky top-0 x-50 py-3 backdrop-blur-lg border-neutral-700/80 ">
                <div className="container px-4 mx-auto relative">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center flex-shrink-0">
                            <img
                                className="h-10 w-10 mr-2"
                                src={logo}
                                alt="logo"
                            />
                            <span className="text-xl tracking-tight">
                                {" "}
                                CONSULTAÍ
                            </span>
                        </div>
                        <ul className="hidden lg:flex ml-14 space-x-12">
                            {navigation.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                        <div className="hidden lg:flex justify-center space-x-12 items-center">
                            <a
                                href="/login"
                                className="bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-3 border-black rounded-md"
                            >
                                Já é paciente?
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="max-w-7xl mx-auto pt-20 px-6 ">
                <div className="flex flex-col items-center mt-6 lg-20">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                        Iluminando o caminho
                        <span className="bg-gradient-to-r from-indigo-500  to-sky-500 text-transparent bg-clip-text">
                            {" "}
                            para o seu bem-estar mental.
                        </span>
                    </h1>
                    <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                        Embarque em uma jornada de autodescoberta na{" "}
                        <span className="bg-gradient-to-r from-indigo-500 to-red-500 text-transparent bg-clip-text">
                            {" "}
                            CONSULTAí.
                        </span>
                    </p>
                    <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                        Nossa equipe de psicólogos dedicados está pronta para
                        guiá-lo através dos desafios da vida, oferecendo um
                        ambiente seguro e acolhedor para explorar e superar
                        obstáculos.
                    </p>
                    <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                        Vamos caminhar juntos nesta jornada.
                    </p>
                    <div className="flex justify-center my-10">
                        <a
                            href="#"
                            className="bg-gradient-to-r from-indigo-500 to-sky-500 py-4 px-4 mx-3 rounded-md"
                        >
                            AGENDE SUA CONSULTA
                        </a>
                    </div>
                    <div className="flex mt-10 justify-center">
                        <img
                            className="rounded-lg w-1/2 border border-indigo-500 shadow bg-indigo-500 mx-2 mv-4"
                            src={ex1}
                            alt="ex1"
                        ></img>
                        <img
                            className="rounded-lg w-1/2 border border-indigo-500 shadow bg-indigo-500 mx-2 mv-4"
                            src={ex2}
                            alt="ex2"
                        ></img>
                    </div>
                </div>
            </div>
            <div className=" mt-20 border-b border-transparent">
                <div className="text-center">
                    <span className="bg-white text-indigo-500  border border-indigo-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase ">
                        NOSSA EQUIPE
                    </span>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
                        Iluminando o caminho
                        <span className="bg-gradient-to-r from-indigo-500  to-sky-500 text-transparent bg-clip-text">
                            {" "}
                            para o seu bem-estar
                        </span>
                    </h2>
                </div>
                <div className="flex flex-wrap mt-10 lg:mt-20 justify-center items-center ">
                    {equipe.map((equipe) => (
                        <div
                            key={equipe.text}
                            className="ml-5 mr-5 w-full sm:1/3 lg:w-1/3 "
                        >
                            <div className="flex">
                                <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-indigo-500 justify-center items-center rounded-full"></div>
                                <div>
                                    <h5 className="mt-1 mb-6 text-xl">
                                        {equipe.text}
                                    </h5>
                                    <p className="text-md p-2 mb-20 text-neutral-500">
                                        {equipe.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" tracking-wide bg">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
                    Depoimentos
                </h2>
                <div className="flex flex-wrap justify-center">
                    {Clientes.map((Clientes) => (
                        <div
                            key={Clientes.text}
                            className=" ml-5 mr-5 w-full sm:w-1/6 lg:w-1/3 px-1 py-2"
                        >
                            <div className="bg-white rounded-md p-6 text-md border-2 border-indigo-500 font-thin h-full flex flex-col justify-between">
                                <p>{Clientes.text}</p>
                                <div className="flex mt-8 items-start">
                                    <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-indigo-100 justify-center items-center rounded-full">
                                        {Clientes.icon}
                                    </div>
                                    <div>
                                        <h6>{Clientes.user}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="relative text-neutral-500">
    <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
        >
            <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="relative block fill-sky-500  "
            ></path>
        </svg>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 h-auto"> 
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 p-28 -mt-28"> 
                <div className="flex flex-col gap-8">
                    <ul>
                        <li className="text-[22px] list-none font-semibold text-indigo-500 py-2 uppercase">
                            CONTATO:
                        </li>
                        <li className="my-4 list-none">
                            (19) 99377-2137
                        </li>
                        <li className="my-4 list-none">
                            (19) 99291-4156
                        </li>
                        <li className="my-4 list-none">
                            (19) 98470-3051
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-8">
                    <ul>
                        <li className="text-[22px] list-none font-semibold text-indigo-500 py-2 uppercase">
                            LOCALIZAÇÃO:
                        </li>
                        <li className="my-4 list-none">
                            {" "}
                            CEP: 13098-309
                        </li>
                        <li className="my-4 list-none">
                            Endereço: Rua Tapiriri
                        </li>
                        <li className="my-4 list-none">
                            Loteamento Alphaville Campinas
                        </li>
                        <li className="my-4 list-none">
                            Cidade: Campinas-SP{" "}
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-8">
                    <h2 className="text-[22px] list-none font-semibold text-indigo-500 py-2 uppercase">   Sobre:</h2>
                    <p>Algo aq</p>
                </div>
            </div>
            <div className="px-4 sm:w-full lg:w-3/4 h-full mx-auto">
                <div className="rounded-ig shadow-lg bg-sky-600 -mt-24 py-10 md:py-12 px-4 md:px-6">
                    <h2 className="text 3x1 text-center text-white font-bold mb-6">ENTRE EM CONTATO</h2>
                    <form action="">
                    <div className="mb-4">
                        <label className="block text-white text-sm font-semibold mb-2" htmlFor="">NOME</label>
                        <input  className=" text-white w-full px-3 py-2 border-white rounded-lg bg-sky-600 focus:outline-nome focus:border-white" required type="text" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white text-sm font-semibold mb-2" htmlFor="">EMAIL</label>
                        <input  className=" text-white w-full px-3 py-2 border-white rounded-lg bg-sky-600 focus:outline-nome focus:border-white" required type="email" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white text-sm font-semibold mb-2" htmlFor="">MENSAGEM</label>
                        <textarea rows={4}  placeholder="" className="text-white w-full px-3 py-2 border-white rounded-lg bg-sky-600 focus:outline-nome focus:border-white" required  />
                    </div>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-sky-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-800 focus:outline-indigo-500 focus:text-indigo-500" >
                                ENVIAR FORMULÁRIO
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</footer>




        </>
    );
}

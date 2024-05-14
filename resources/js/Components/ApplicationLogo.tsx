import { ImgHTMLAttributes } from 'react';
import logo from "../assets/logo2.png"

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img className="h-10 w-10 mr-2"src={logo} alt="logo" />
    );
}

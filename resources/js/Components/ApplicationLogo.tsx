import { ImgHTMLAttributes } from 'react';
import logo from "../assets/logo2.png"

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img className="h-20 w-20 mr-2"src={logo} alt="logo" />
    );
}

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { User } from "@/types";
import type { MeetingSession } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";


export default function MeetingSession({meetingsession}: {meetingsession: any}) {
    console.log(meetingsession)
    return (
        <GuestLayout>
        <Head title="Register" />
        
        </GuestLayout>
    );
}

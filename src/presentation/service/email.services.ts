import { Resend } from "resend";

export interface SendMailOptions {
    from: string;
    to: string | string[];
    subject: string;
    html: string;
}

const resend = new Resend("re_FMe7HQde_JY9kTmTiCvFRqQPErppZ2727");

export const sendMail = async (sendMailOptions: SendMailOptions): Promise<boolean> => {

    const { data, error } = await resend.emails.send(sendMailOptions);

    if (error) {
         console.log(error);
         return false;
    }

    console.log({ data });

    return true;

};
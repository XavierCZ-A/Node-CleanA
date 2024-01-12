import { bcryptAdapter, createAccessToken, envs } from "../../config";
import { UserModel } from "../../data";
import { LoginUserDto, RegisterUserDto, entity, errors } from "../../domain";
import { sendMail } from "./email.services";



export const registerUser = async (registerDto: RegisterUserDto) => {

    const existUser = await UserModel.findOne({ email: registerDto.email })

    if (existUser) throw errors.badRequest("Email already exist");

    try {

        const user = new UserModel(registerDto)


        //*Encriptar contraseña
        user.password = bcryptAdapter.hash(registerDto.password)

        await user.save()

        //* Email de confirmacion
        await sendEmailValidationLink(user.email)

        const { password, ...rest } = entity(user)

        return {
            user: rest
        }

    } catch (error) {
        throw errors.internalServer(`${error}`)
    }

};


export const loginUser = async (loginDto: LoginUserDto) => {

    try {

        const user = await UserModel.findOne({ email: loginDto.email })

        if (!user) throw errors.badRequest("Email  incorrect");

        const isMatch = await bcryptAdapter.compare(loginDto.password, user.password)

        if (!isMatch) throw errors.badRequest("password incorrect");

        const token = await createAccessToken({ id: user.id, email: user.email });

        if (!token) throw errors.internalServer("Token creation token");


        const { password, ...rest } = entity(user)

        return {
            user: rest,
            token: token
        }

    } catch (error) {
        throw error
    }
};


export const sendEmailValidationLink = async (email: string) => {

    try {

        const token = await createAccessToken({ email });

        if (!token) throw errors.internalServer("Error creating token");

        const link = `http://localhost:3000/api/auth/verify-email/${token}`

        const html = `
            Hi, <br/> <br/> Please click on the below link to validate your email. <br/> <br/> <a href="${link}">${link}</a>
        `;

        const emailOptions = {
            from: `Test <onboarding@resend.dev>`,
            to: [email],
            subject: 'Validate your email',
            html: html
        }

        const isSet = await sendMail(emailOptions);

        if (!isSet) throw errors.internalServer("Error sending email");

    } 
    catch (error) {
        throw error
    }
}





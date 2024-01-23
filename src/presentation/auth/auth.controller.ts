import { Request, Response } from "express";
import { loginUser, registerUser, validateEmail } from "../service/auth.services";
import { loginUserDto, registerUserDto } from "../../domain";


export const registerUsers = async (req: Request, res: Response) => {
  const [error, registerDto] = registerUserDto(req.body);

  if (error) return res.status(400).json({ error }); 
  
  
  try {

    const user = await registerUser(registerDto!);
    
    res.json(user);
   
    
  } catch (error) {

    res.status(500).json(error)
    
  }
};



export const loginUsers = async (req: Request, res: Response) => {
  const [error, loginDto] = loginUserDto(req.body);

  if (error) return res.status(400).json({ field: 'email', error });

  try {
    const user = await loginUser(loginDto!);

    res.json({message: "Login successfully", user});

  } catch (error) {
    res.status(500).json(error)  }
};



// export const registerUsers =  (req: Request, res: Response) => {
//   const [error, registerDto] = createUser(req.body)

//   if ( error ) return res.status(400).json({error})

//   registerUser(registerDto!)
//     .then(user => res.json(user))
//     .catch(error => res.json(error))
    
 
// }

export const verifyEmail = (req: Request, res: Response) => {
  const { token } = req.params;
  validateEmail(token);
  if (!token) return res.status(400).json({ message: "Email not verified" });
  res.json({ message: "Email verificated" });
}
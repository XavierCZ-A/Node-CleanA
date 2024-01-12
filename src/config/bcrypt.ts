import { compareSync, genSaltSync,hashSync } from "bcryptjs";


export const bcryptAdapter = {
    
    hash: (password:string) => {
        const salt = genSaltSync()
        return hashSync(password, salt)
    },

    compare: async (password:string, hashed: string) => {
        return compareSync(password, hashed);
    }

}


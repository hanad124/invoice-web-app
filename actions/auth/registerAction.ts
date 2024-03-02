"use server"

import { db } from "@/lib/db";
import { registerSchema } from "@/schemas/user"
import { z } from "zod"
import bcryptjs from "bcryptjs"

export const userRegister = async (values : z.infer<typeof registerSchema>) => {
    
    try {

        const validateFields = registerSchema.safeParse(values);
        if(!validateFields.success){
            return { error : "invalid fields"}
        }

        const { name , email , password} = validateFields.data;

        const hashedPassword = await bcryptjs.hash(password , 10);

        const existingUser = await db.user.findUnique({ where : { email }});

        if(existingUser){
            return { error :"email already in use" };
        }
        const user = await db.user.create({
            data : {
                name,
                email,
                password : hashedPassword
            }
        })
        if(!user){
            return { error : "user not created"}
        }

        return { success : "user created successfully"}
    } catch (error) {
        console.error(error);
    }
}
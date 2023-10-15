import { headers } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/libs/prisma"

export async function GET() {
    try {
        const headerList = headers()
        const token = headerList.get("token")

        //we validated if exist token 
        if (!token) {
            return NextResponse.json({ message: "no te has logueado pendejo" }, { status: 400 })
        }
 

        try {
            const isTokenValid = jwt.verify(token, "secreto")
            const {data}= isTokenValid;
            const userFind=await prisma.users.findUnique({where:{id:data.id}})

            if(!userFind){
                return NextResponse.json({
                     message: "Not Found" }, 
                     { status: 400 })
            }

            return NextResponse.json(
                {isAutorized:true, message: "logged success" }, 
                { status: 200 })

        } catch (error) {
            return NextResponse.json({
                message: "token not valid" }, 
                { status: 400 })
        }


    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong" }, 
            { status: 400 })
    }
}
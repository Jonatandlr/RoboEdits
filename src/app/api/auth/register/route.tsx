
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req:Request){
    try {
        const body=await req.json()
        const {username, password}=body

        //check if exist
        const existUsername=await prisma.users.findUnique({
            where:{username:username}
        })
        if(existUsername){
            return NextResponse.json({user:null, message:"User Already Exist"}, {status:409})
        }

        const hashedPassword=await hash(password,10)

        const newUser=await prisma.users.create({
            data:{
                username,
                password:hashedPassword
            }
        })

        const{password:newUserPassword,...rest}=newUser

        return NextResponse.json({user:rest, message:"User created successfully"})
    } catch (error) {
        return NextResponse.json({message:"something went wrong"})
    }
}

export async function DELETE(){

    await prisma.users.deleteMany()
    return NextResponse.json("ya lo elimine alv")
}


import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken"


export async function POST(request: NextResponse) {
    try {
        const body = await request.json()
        const { username, password } = body;
        //We validate that the fields are not empty
        if (!username || !password) {
            return NextResponse.json({ message: "need props" }, { status: 400 })
        }
        //searching user and validate
        const userFind = await prisma.users.findUnique({
            where: {
                username
            }
        })

        if (!userFind) {
            return NextResponse.json({ message: "User or/and password incorrect" },{status:400})
        }


        //we validate if password is correct
        const passwordMatch = await compare(password, userFind.password)
        if (!passwordMatch) {
            return NextResponse.json({ message: "User or/and password incorrect" },{status:400})
        }

        const { password: userpass, ...rest } = userFind

        const token = jwt.sign({ data: rest }, "secreto", { expiresIn: 86400 })

        const response = NextResponse.json({ message: "User Logged" }, { status: 200 })

        response.cookies.set("auth_cookies", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
            path: "/"

        })
        return response
    } catch (error) {
        return  NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}
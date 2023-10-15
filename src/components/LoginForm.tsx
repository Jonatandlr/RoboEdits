"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from 'axios'

function LoginForm() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPasword] = useState("")
    const [log, setLog] = useState(1)

    // const login=async(formData:any)=>{

    //   await authFetch({
    //     endpoint:"login",
    //     redirectRouter:"/home",
    //     formData
    //   })
    // }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = { username: username, password: password }
        try {
            const  data  = await axios.post(`/api/auth/login`, formData)
            router.push("/home")
        } catch (error) {
            setLog(log + 1)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" form="username">
                        Nombre de Usuario
                    </label>
                    <input className=" text-black border border-gray-300 p-2 w-full"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nombre de Usuario" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" form="password">
                        Contraseña
                    </label>
                    <input className="text-black border border-gray-300 p-2 w-full"
                        type="password"
                        value={password}
                        onChange={(e) => setPasword(e.target.value)}
                        placeholder="Contraseña" required />
                </div>
                <div>
                    <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Iniciar Sesión
                    </button>
                    {log > 1 && <label className='text-black pl-2'>
                        User or/and password incorrect
                    </label>}
                </div>
            </form>
        </div>
    )
}

export default LoginForm
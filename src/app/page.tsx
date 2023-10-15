import LoginForm from "@/components/LoginForm"


async function HomePage() {

  return (
    <div className="bg-slate-300 flex items-center justify-center h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-black">Iniciar Sesión</h2>
        <LoginForm />
      </div>
    </div>
  )
}

export default HomePage
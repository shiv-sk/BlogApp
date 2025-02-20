export default function Login(){
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <div className="max-w-sm w-full bg-base-100 p-6 rounded-lg shadow-md">
                <h1 className="text-center font-bold text-2xl mb-1.5">Login</h1>
                <div className="">
                    <form className="flex flex-col gap-4">
                    <input type="email" placeholder="exp@email.com" className="input w-full" required/>
                    <input type="password" placeholder="pass@123" className="input w-full" required/>
                    <button className="btn w-full">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
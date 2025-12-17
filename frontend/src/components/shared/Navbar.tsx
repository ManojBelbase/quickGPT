import { Link } from "react-router-dom";
import { path } from "../../routes/paths"
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
    const { user } = useUser();
    const { openSignIn } = useClerk()

    return (
        <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer">
            <Link to={path.HOME} className="text-purple-600 font-bold text-4xl">

                QuickGPT
            </Link>

            {user ? <UserButton /> : <button onClick={() => openSignIn()} className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5">Get Started</button>}

        </div>
    )
}

export default Navbar
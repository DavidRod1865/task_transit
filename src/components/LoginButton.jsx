import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    <div>
                        <button onClick={() => loginWithRedirect()} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Log In with Auth0
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginButton;


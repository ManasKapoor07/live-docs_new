import React from 'react'

const AuthLayout = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <div>
            <nav className='flex justify-center items-center bg-red-200'>
                Auth Layout
            </nav>
            {children}
        </div>
    )
}

export default AuthLayout
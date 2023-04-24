import React from 'react'
import Head from 'next/head'

import Login from '@/components/Login/Login'

const Home = () => {
    React.useEffect(() => {
        
    }, [])

    const handleSpotifyLogin = () => {
        window.location.replace('/api/spotify/login')
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Login 
                onClickLogin={handleSpotifyLogin}
            />
        </>
    )
}

export default Home;
import React from 'react';

import Button from '@/elements/Button/Button';

import styles from './Login.module.scss';

type LoginProps = {
    onClickLogin: (e: React.MouseEvent<HTMLElement>) => void,
}

const Login = ({ onClickLogin }: LoginProps) => {
  return (
    <div className={styles.container}>
        <div className={styles.card}>
            <h1 className={styles.title}>SPOTIFY TRACK VISUALIZER</h1>
            <Button 
                title='Spotify Login'
                variant='spotify'
                onClick={onClickLogin}
            />
        </div>

    </div>
  )
}

export default Login
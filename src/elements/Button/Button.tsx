import React from 'react';
import classNames from 'classnames/bind';
import { BsSpotify } from 'react-icons/bs'

import styles from './Button.module.scss';
const cx = classNames.bind(styles);

type ButtonProps = {
    title: string,
    variant?: 'contained' | 'outline' | 'iconButton' | 'spotify',
    icon?: React.ReactNode,
    [x:string]: any;
}

const Button = ({title, variant = 'contained', icon, ...rest }: ButtonProps) => {

    return (
        <button
			tabIndex={0}
			type="button"
			className={cx(styles.button, styles[variant])}
			{...rest}
		>
			{icon && <span>{icon}</span>}
			<span>{title}</span>
            {variant === 'spotify' && <BsSpotify size={20} className={styles.icon} />}
		</button>
    )
}

export default Button;
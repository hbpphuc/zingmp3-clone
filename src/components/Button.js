import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const Button = ({ text, style = '', active, to, href, onClick, ...passProps }) => {
    let Compnt = 'button'
    const props = {
        onClick,
        ...passProps,
    }

    if (to) {
        props.to = to
        Compnt = Link
    } else if (href) {
        props.href = href
        Compnt = 'a'
    }
    return (
        <Compnt className={`btn ${style}`} {...props}>
            {text}
        </Compnt>
    )
}

export default memo(Button)

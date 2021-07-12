import React from 'react';
import './CardToday.scss'

interface Props {
    title: string
    number: number
    unit: string
}
function CardToday({title,number,unit}: Props) {
    return (
        <div className="card__today">
            <h1>{title}</h1>
            <p>{Math.round(number)}
                <span>{unit}</span>
            </p>
        </div>
    );
}

export default CardToday;
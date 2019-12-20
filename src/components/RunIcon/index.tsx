import React from 'react';
import './index.less';

interface IProps {
    style?: {
        [props: string]: string | number;
    };
    top?: number;
}

export const RunIcon: React.FC<IProps> = props => {
    const { style, top } = props;
    return (
        <div
            className="barRoot"
            style={{ top: `${top}vh` }}
        >
            {
                [1, 2, 3, 4].map(item => {
                    return (
                        <div style={style} />
                    )
                })
            }
        </div >
    );
}

export const CircleIcon: React.FC<IProps> = props => {
    const { style } = props;
    return (
        <div
            className="circleRoot"
            style={style}
        />
    );
}

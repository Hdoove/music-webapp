import React, { useEffect, useState } from 'react';
import './index.less';

interface IProps {
    style?: any;
}

export const RunIcon: React.FC<IProps> = props => {
    const { style } = props;
    return (
        <div
            className="barRoot"
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

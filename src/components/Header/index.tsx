import React from 'react';
import { Icon } from 'antd';
import { useHistory } from 'react-router-dom';
import { RunIcon } from '@src/components/RunIcon/index';

interface IProps {
    title: string;
    isPlay: boolean;
    goBack: () => void;
    goMusic: () => void;
    color?: string;
}

const Header: React.FC<IProps> = props => {

    const { title, isPlay, goBack, color, goMusic } = props;
    const history = useHistory();

    return (
        <header>
            <Icon type="left" onClick={() => { goBack() }} />
            <span style={{ fontSize: '4vw' }}>{title}</span>
            <div style={{ display: 'flex' }} onClick={() => goMusic()}>
                <Icon type="align-left" rotate={-90} style={{ display: isPlay ? 'none' : 'block' }} />
                <RunIcon style={{ display: !isPlay ? 'none' : 'block', background: color || '#fff' }} />
            </div>
        </header>
    )
}

export default Header;
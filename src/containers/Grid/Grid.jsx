import style from './Grid.module.scss';
import Row from '../Row/Row';
import React from 'react';

const Grid = () => {
    return (
        <div className={style.Grid}>
            <Row id={`r1`} />
            <Row id={`r2`} />
            <Row id={`r3`} />
            <Row id={`r4`} />
            <Row id={`r5`} />
            <Row id={`r6`} />
        </div>
    );
};

export default Grid;

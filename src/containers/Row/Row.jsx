import Box from '../../components/Box/Box';
import style from './Row.module.scss';
import React from 'react';

const Row = ({ id }) => {
    return (
        <div className={style.Row}>
            <Box id={`${id}b1`} />
            <Box id={`${id}b2`} />
            <Box id={`${id}b3`} />
            <Box id={`${id}b4`} />
            <Box id={`${id}b5`} />
            {}
        </div>
    );
};

export default Row;

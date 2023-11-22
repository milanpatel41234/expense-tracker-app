import React from 'react';
import style from './Skeleton.module.css';

const LoadingSkeleton = ({ width, height, borderRadius }) => {
  const styleObj = {
    width: width || '100%',
    height: height || '4rem',
    borderRadius: borderRadius || '4px',
  };

  return <div className={style.loadingSkeleton} style={styleObj}></div>;
};

export default LoadingSkeleton;

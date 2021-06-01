import React from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import classes from './LoadingIndicator.module.scss';

const LoadingIndicator = () => (
  <div className={classes.example}>
    <Spin />
  </div>
);

export default LoadingIndicator;

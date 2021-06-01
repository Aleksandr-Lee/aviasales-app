import React from 'react';
import classes from './Header.module.scss';
import logoAviasales from '../../Assets/Images/logo-header.svg';

const Header = () => (
  <header>
    <div className={classes.logo}>
      <a href="#">
        <img
          className={classes.image}
          src={logoAviasales}
          alt="aviasales logo"
        />
      </a>
    </div>
  </header>
);

export default Header;

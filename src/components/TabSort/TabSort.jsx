/* eslint-disable no-shadow */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionActiveButton } from '../../redux/actions/sortTickets';
import classes from './TabSort.module.scss';

const TabSort = () => {
  const dispatch = useDispatch();
  const sortButtons = useSelector((state) => state.sortTicketsReducer.button);

  const changeActiveBtn = (sortButtons, id) =>
    sortButtons.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          active: true,
        };
      }
      return {
        ...item,
        active: false,
      };
    });

  const activeButton = (event) => {
    dispatch(actionActiveButton(changeActiveBtn(sortButtons, event.target.id)));
  };

  const sortButtonsItems = sortButtons.map((item) => {
    const activeClass = item.active
      ? `${classes.tabTicket} ${classes.tabTicket__active}`
      : `${classes.tabTicket}`;

    return (
      <button
        type="button"
        key={item.id}
        id={item.id}
        className={activeClass}
        onClick={activeButton}
      >
        {item.name}
      </button>
    );
  });

  return <div className={classes.sort__button}>{sortButtonsItems}</div>;
};

export default TabSort;

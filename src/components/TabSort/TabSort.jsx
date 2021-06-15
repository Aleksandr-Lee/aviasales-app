import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionActiveSort from '../../redux/actions/sortTickets';
import classes from './TabSort.module.scss';

const TabSort = () => {
  const dispatch = useDispatch();
  const sortButtons = useSelector((state) => state.sortTicketsReducer.button);

  const changeActiveSort = (sortButton, id) =>
    sortButton.map((item) => {
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

  const activeSort = (event) => {
    dispatch(actionActiveSort(changeActiveSort(sortButtons, event.target.id)));
  };

  const sortButtonsItems = sortButtons.map((item) => {
    const classNames = item.active
      ? `${classes.tabTicket} ${classes.tabTicket__active}`
      : `${classes.tabTicket}`;

    return (
      <button
        type="button"
        key={item.id}
        id={item.id}
        className={classNames}
        onClick={activeSort}
      >
        {item.name}
      </button>
    );
  });

  return <div className={classes.sort__button}>{sortButtonsItems}</div>;
};

export default TabSort;

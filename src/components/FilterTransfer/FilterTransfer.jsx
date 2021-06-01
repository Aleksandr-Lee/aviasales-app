/* eslint-disable no-shadow */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import activeCheckbox from '../../redux/actions/filtersCheckbox';
import classes from './FilterTransfer.module.scss';

const FilterTransfer = () => {
  const dispatch = useDispatch();
  const checkboxes = useSelector(
    (state) => state.filtersCheckboxReducer.checkbox
  );

  const visibleCheckboxAll = (checkboxes, id) => {
    if (id === 'all') {
      return checkboxes.map((item) => ({
        ...item,
        checked: !checkboxes[0].checked,
      }));
    }

    return checkboxes.map((item) => {
      if (item.htmlFor === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
  };

  const checkCheckboxAll = (checkboxes) => {
    if (
      checkboxes[1].checked &&
      checkboxes[2].checked &&
      checkboxes[3].checked &&
      checkboxes[4].checked
    ) {
      return checkboxes.map((item) => ({
        ...item,
        checked: true,
      }));
    }
    return checkboxes.map((item) => {
      if (item.htmlFor === 'all') {
        return {
          ...item,
          checked: false,
        };
      }
      return item;
    });
  };

  const activeCheck = (event) => {
    const visibleCheckboxAllResult = visibleCheckboxAll(
      checkboxes,
      event.target.id
    );

    const checkCheckboxAllResult = checkCheckboxAll(visibleCheckboxAllResult);

    dispatch(activeCheckbox(checkCheckboxAllResult));
  };

  const checboxItems = checkboxes.map((item) => (
    <div key={item.htmlFor}>
      <input
        className={classes.checkbox}
        type="checkbox"
        id={item.htmlFor}
        checked={item.checked}
        onChange={activeCheck}
      />
      <label className={classes.label} htmlFor={item.htmlFor}>
        {item.lable}
      </label>
    </div>
  ));
  return (
    <div className={classes.filter}>
      <h1 className={classes.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h1>
      {checboxItems}
    </div>
  );
};

export default FilterTransfer;

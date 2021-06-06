import reduxTypes from '../reduxTypes';

const initialState = {
  checkbox: [
    {
      lable: 'Все',
      checked: true,
      htmlFor: 'all',
      filter: 'all',
    },
    {
      lable: 'Без пересадок',
      checked: true,
      htmlFor: 'withoutTransfers',
      filter: 0,
    },
    {
      lable: '1 пересадка',
      checked: true,
      htmlFor: 'oneTransfer',
      filter: 1,
    },
    {
      lable: '2 пересадки',
      checked: true,
      htmlFor: 'twoTransfer',
      filter: 2,
    },
    {
      lable: '3 пересадки',
      checked: true,
      htmlFor: 'threeTransfer',
      filter: 3,
    },
  ],
};

const filtersCheckboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxTypes.setActiveFilter:
      return {
        ...state,
        checkbox: action.checkbox,
      };
    default:
      return state;
  }
};

export default filtersCheckboxReducer;

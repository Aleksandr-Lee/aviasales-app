import actionTypes from '../actionTypes';

const activeCheckbox = (checkbox) => ({
  type: actionTypes.setActiveFilter,
  checkbox,
});

export default activeCheckbox;

import actionTypes from '../actionTypes';

const actionActiveSort = (button) => ({
  type: actionTypes.setActiveSort,
  button,
});

export default actionActiveSort;

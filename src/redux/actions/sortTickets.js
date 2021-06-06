import reduxTypes from '../reduxTypes';

const actionActiveSort = (button) => ({
  type: reduxTypes.setActiveSort,
  button,
});

export default actionActiveSort;

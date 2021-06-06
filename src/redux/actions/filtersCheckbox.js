import reduxTypes from '../reduxTypes';

const activeCheckbox = (checkbox) => ({
  type: reduxTypes.setActiveFilter,
  checkbox,
});

export default activeCheckbox;

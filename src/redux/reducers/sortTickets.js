const initialState = {
  button: [
    {
      id: 'cheap',
      name: 'Самый дешевый',
      active: true,
    },
    {
      id: 'fast',
      name: 'Самый быстрый',
      active: false,
    },
  ],
};

const sortTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTIVE_BUTTON':
      return {
        ...state,
        button: action.button,
      };
    default:
      return state;
  }
};

export default sortTicketsReducer;

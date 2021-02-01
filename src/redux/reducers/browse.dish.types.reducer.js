// Used to store list of creators from the server
const theDishTypes = (state = [], action) => {
  switch (action.type) {
    case 'SET_DISH_TYPES':
      return action.payload;
    default:
      return state;
  }
};

export default theDishTypes;

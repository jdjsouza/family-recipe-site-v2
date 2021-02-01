// Used to store list of dish types on the server
const theDishList = (state = [], action) => {
  switch (action.type) {
    case 'SET_DISH_LIST':
      return action.payload;
    default:
      return state;
  }
};

export default theDishList;

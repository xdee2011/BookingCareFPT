const initState = {
  user:null,
};
const rootReducer = (state = initState, action) => {
  if(action.type === "SAVE_USER") {
    state.user = action.payload;
  }
  if(action.type==="LOG_OUT"){
    state.user = null;
  }
  return {...state};
};

export default rootReducer;

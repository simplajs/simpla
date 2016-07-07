const INITIAL_STATE = {};

// // TODO: Reimplement the below
// export function dataEntity(state = {}, action) {
//   switch (action.type) {
//   case REQUEST_DATA:
//     return Object.assign({}, state, { requesting: true, error: null });
//   case REQUEST_DATA_FAILED:
//     return Object.assign({}, state, { requesting: false, error: action.error.message });
//   case RECEIVE_DATA:
//     return Object.assign({}, state, { requesting: false, error: null, data: action.data });
//   default:
//     return state;
//   }
// }

export default function data(state = INITIAL_STATE, action) {
  switch (action.type) {
  // TODO: Handle data actions
  default:
    return state;
  }
}

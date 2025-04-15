export const initialStore=()=>{
  return{
    
    token:null

  }
}

export default function storeReducer(store, action = {}) {
  if(action.type == "updateToken"){
    return {
      ...store,
      token: action.payload
    };
  }
//   switch(action.type){
//     case 'set_hello':
//       return {
//         ...store,
//         message: action.payload
//       };
      
//     case 'add_task':

//       const { id,  color } = action.payload

//       return {
//         ...store,
//         todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
//       };
//     default:
//       throw Error('Unknown action.');
//   }    
  }

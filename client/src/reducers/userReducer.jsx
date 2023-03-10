export const initialState= null
export const reducer= (state, action)=>{
  if(action.type==="USER"){
    return action.payload
  }
  if(action.type==="CLEAR"){
    return null
  }
  if(action.type==="updateProfilePic"){
    return{
      ...state, profilePic:action.payload
    }
  }
  return state
}
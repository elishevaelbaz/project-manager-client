import { HIDE_ERROR } from "./types"

export const hideError = () => dispatch =>{
  dispatch({
    type: HIDE_ERROR
  })
}

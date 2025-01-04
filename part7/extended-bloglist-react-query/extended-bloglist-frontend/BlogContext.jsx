// import { createContext, useContext, useReducer } from "react"
// import { useQuery } from "@tanstack/react-query"
// import blogService from "./src/services/blogs";

// const blogReducer = (state, action) => {
//     console.log("state: ", state)
//     console.log("action: ", action)
//     switch (action.type) {
//         case "SET":
//             return action.payload
//         case "ADD":
//             return state
//         case "REMOVE":
//             return state
//         default: 
//             return state
//     }
// }

// const BlogContext = createContext()

// export const BlogContextProvider = (props) => {

//     const [blogs, blogDispatch] = useReducer(blogReducer, [])

//     console.log('blogs variable: ', blogs)

//     return (
//         <BlogContext.Provider value={[blogs, blogDispatch]}>
//             {props.children}
//         </BlogContext.Provider>
//     )
// }

// export const useBlogsValue = () => {
//     const blogAndDispatch = useContext((BlogContext))
//     return blogAndDispatch[0]
// }
// export const useBlogsDispatch = () => {
//     const blogAndDispatch = useContext((BlogContext))
//     return blogAndDispatch[1]
// }

// export default BlogContext
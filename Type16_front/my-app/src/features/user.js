import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        allUsers: [],
        posts: [],
        messages: [],
        selectedUser: null,
    },

    reducers: {

        setUser: (state, action) => {
            state.user = action.payload
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload
        },
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        setMessages: (state, action) =>{
            state.messages = action.payload
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(x => x._id !== action.payload)
        },
        addComment: (state, action) => {
            state.comments.push(action.payload)
        },
        addMessage: (state, action) =>{
            state.messages.push(action.payload)
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
    },
})

export const { setUser,
    addPost,
    setPosts,
    removePost,
    setMessages,
   } = userSlice.actions

export default userSlice.reducer;
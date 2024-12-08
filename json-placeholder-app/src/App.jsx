import React from 'react'
import PostList from './components/PostList'
import AddPost from './components/AddPost'
import EditPost from './components/EditPost'
import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/post-list' element={<PostList/>}/>
        <Route path='/add-post' element={<AddPost/>}/>
        <Route path='/edit-post/:id' element={<EditPost/>}/>
      </Routes>
    </>
  )
}

export default App;
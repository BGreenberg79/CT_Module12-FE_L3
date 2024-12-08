import axios from 'axios'

const addPostAPI = async (post) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts',
        {title: post.title,
        body: post.body,
        userId: post.userId}, 
        {headers: {'Content-type': 'application/json; charset=UTF-8',}}
    )
    return response.data
}

export default addPostAPI;
import axios from 'axios'

const editPostAPI = async (post) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`,
        {title: post.title,
        body: post.body,
        userId: post.userId}, 
        {headers: {'Content-type': 'application/json; charset=UTF-8',}}
    )
    console.log(response)
    return response.data
}

export default editPostAPI;
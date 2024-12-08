import axios from 'axios';

const fetchSinglePost = async (id) => {
    try{
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
    return response.data[0]}
    catch(err){ console.error(err)}
}

export default fetchSinglePost;
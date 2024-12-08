import axios from 'axios';

const deletePostAPI = async (id) => {
    try{
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    console.log(response)}
    catch(err){ console.error(err)}
}

export default deletePostAPI;
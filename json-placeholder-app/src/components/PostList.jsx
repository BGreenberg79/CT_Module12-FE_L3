import React from 'react'
import { Container, ListGroup, Spinner, Alert, Button } from 'react-bootstrap'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import fetchPostList from '../api/fetchPostList'
import { useNavigate } from 'react-router-dom'
import deletePostAPI from '../api/deletePostAPI'

const PostList = () => {

    const [show, setShow] = useState(true)
    const navigate = useNavigate()

    const editPostNav = (post) => {
        if (post.id) {
            navigate(`/edit-post/${post.id}`)
        } else {
            console.error('Error editing post', error)
        }
    }

    const { mutate } = useMutation({
        mutationFn: deletePostAPI,
        onSuccess: (data) => {
            console.log(data)
        }
    })

    const handleDeletePost = (post) => {
        mutate(post.id)
    }

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPostList
    })

    if (isLoading) {
        return (
            <Spinner animation="border" role="status" variant="warning">
                <span>Loading...</span></Spinner>
        )
    }
    if (isError) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>
                    {error.message}
                </p>
            </Alert>
        );
    }

    return (
        <Container>
            <h2>JSON Placeholder Post List</h2>
            <ListGroup>
                {data.map((post, index) => (
                    <ListGroup.Item variant='info' key={index}>
                        Post ID: {post.id}<br />
                        User ID: {post.userId}<br />
                        Title: {post.title}<br />
                        Body: {post.body}
                        <Button variant='warning' className='shadow-sm m-1 p-1' onClick={() => editPostNav(post)}>
                            Edit
                        </Button>
                        <Button variant='danger' className='shadow-sm m-1 p-1' onClick={() => handleDeletePost(post.id)}>
                            Delete
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}

export default PostList;
import React, { useEffect, useState } from 'react'
import editPostAPI from '../api/editPostAPI'
import fetchSinglePost from '../api/fetchSinglePost'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'


const EditPost = () => {
    const {id} = useParams()

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['post', id],
        queryFn: ()=>fetchSinglePost(id),
        enabled: !!id})

    const [post, setPost] = useState({
        title: '',
        body: '',
        userId: 0


    })
    useEffect(() => {
        if (data) {
            console.log(data)
            setPost({id:data.id,
                title:data.title,
                body: data.body, 
                userId: data.userId})
        } else{
            setPost({id:0,
                title: '', 
                body: '', 
                userId: 0})
        }
    }, [data])
    const [show, setShow] = useState(true)

    const { mutate } = useMutation({
        mutationFn: editPostAPI,
        onSuccess: (data) => {
            console.log(data)
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        mutate(post)
    }

    return (
        <Container>
            {isError && (<Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>
                    {error.message}
                </p>
            </Alert>)}
            <h1>Edit Post</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        onChange={(event) =>
                            setPost({ ...post, title: event.target.value })
                        }
                        value={post.title}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="body">
                    <Form.Label>Body:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter body"
                        onChange={(event) =>
                            setPost({ ...post, body: event.target.value })
                        }
                        value={post.body}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userId">
                    <Form.Label>User Id:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter User Id"
                        onChange={(event) =>
                            setPost({ ...post, userId: Number(event.target.value) })
                        }
                        value={post.userId}
                    />
                </Form.Group>


                <Button variant="success" type="submit">
                    {isLoading ? 'Editing Post...' : 'Edit Post'}
                </Button>
            </Form>
        </Container>
    )
}

export default EditPost
import React, { useState } from 'react'
import addPostAPI from '../api/addPostAPI'
import { Form, Button, Container } from 'react-bootstrap'
import { useMutation } from '@tanstack/react-query'


const AddPost = () => {
    const [post, setPost] = useState({
        title: '',
        body: '',
        userId: 0


    })
    const [show, setShow] = useState(true)

    const { mutate, isLoading, isError, error, } = useMutation({
        mutationFn: addPostAPI,
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
            <h1>Add Post</h1>
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
                    {isLoading ? 'Adding Post...' : 'Add Post'}
                </Button>
            </Form>
        </Container>
    )
}

export default AddPost
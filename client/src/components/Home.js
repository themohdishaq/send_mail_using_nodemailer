import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const Home = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState(""); // New state for subject
    const [message, setMessage] = useState(""); // New state for message
    const [error, setError] = useState("");

    const sendEmail = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous error message

        const url = "http://localhost:8004/register";  // Define the full URL

        try {
            console.log("Sending email to:", url);  // Log the full URL
            const response = await axios.post(url, { email, subject, message }); // Include subject and message in the request
            const data = response.data;

            if (response.status === 201) {
                setShow(true);
                setEmail("");
                setSubject(""); // Clear subject after sending email
                setMessage(""); // Clear message after sending email
                console.log("Email sent");
            } else {
                setError(data.error || "An error occurred while sending the email.");
                console.log("Error:", data);
            }
        } catch (error) {
            setError("An error occurred while sending the email.");
            console.log("Error:", error);
        }
    };

    return (
        <>
            {show && (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    Your Email was successfully sent!
                </Alert>
            )}
            {error && (
                <Alert variant="danger" onClose={() => setError("")} dismissible>
                    {error}
                </Alert>
            )}
            <div className="container mt-2">
                <div className='d-flex justify-content-center'>
                    <h2>Sending mail using nodemailer</h2>
                    <img src="/gmail.png" alt="gmail" className='mx-3' style={{ width: "50px" }} />
                </div>
                <div className="d-flex justify-content-center">
                    <Form className='mt-2 col-lg-6' onSubmit={sendEmail}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Your Email</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSubject"> {/* New form group for subject */}
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name='subject'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter subject"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicMessage"> {/* New form group for message */}
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name='message'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter message"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Home;

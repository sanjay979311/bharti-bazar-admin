

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useCreateCountryMutation } from './countryApiSlice';

const AddCountry = () => {
    const [formData, setFormData] = useState({
        name: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [addCountry, { isLoading: isAdding, error }] = useCreateCountryMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when field is changed
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Country name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await addCountry(formData).unwrap();
            toast.success('Country added successfully!');
            setTimeout(() => navigate('/dashboard/countries'), 1000);
        } catch (err) {
            console.error('Failed to add country:', err);
            toast.error(err?.data?.error || 'Failed to add country. Please try again.');
        }
    };

    return (
        <Container className="py-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <Card className="border-0 shadow">
                <Card.Header className="bg-white border-0 py-3">
                    <h5 className="mb-0 d-flex align-items-center">
                        <i className="bi bi-globe me-2"></i>
                        Add New Country
                    </h5>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* Country Name Field */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Country Name *</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter country name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                                disabled={isAdding}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* API Error Display */}
                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error?.data?.error || 'An error occurred while adding the country'}
                            </Alert>
                        )}

                        {/* Form Actions */}
                        <div className="d-flex justify-content-between border-top pt-4">
                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate('/dashboard/country-list')}
                                disabled={isAdding}
                            >
                                Back to List
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isAdding}
                            >
                                {isAdding ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            className="me-2"
                                        />
                                        Adding...
                                    </>
                                ) : 'Add Country'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddCountry;
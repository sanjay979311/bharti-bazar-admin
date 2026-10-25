

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import {
    useUpdateStateMutation,
    useGetStateByIdQuery
} from './stateApiSlice';
import { useGetCountriesQuery } from '../country/countryApiSlice';

const EditState = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        country: ''
    });
    const [errors, setErrors] = useState({});

    // API Hooks
    const {
        data: state,
        isLoading: isStateLoading,
        isError: isStateError
    } = useGetStateByIdQuery(id);

    const {
        data: countries = [],
        isLoading: isCountriesLoading,
        isError: isCountriesError
    } = useGetCountriesQuery();

    const [updateState, { isLoading: isUpdating, error }] = useUpdateStateMutation();

    // Initialize form with fetched state data
    useEffect(() => {
        if (state) {
            setFormData({
                name: state.name || '',
                country: state.country?._id || ''
            });
        }
    }, [state]);

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
        if (!formData.name.trim()) newErrors.name = 'State name is required';
        if (!formData.country) newErrors.country = 'Please select a country';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await updateState({
                id,
                data: {
                    name: formData.name,
                    country: formData.country
                }
            }).unwrap();

            toast.success('State updated successfully!',{position:"top-center"});
            setTimeout(() => navigate('/dashboard/states'), 1000);
        } catch (err) {
            console.error('Failed to update state:', err);
            toast.error(err?.data?.error || 'Failed to update state. Please try again.');
        }
    };

    if (isStateLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (isStateError) {
        return (
            <Container>
                <Alert variant="danger">
                    Failed to load state data. Please try again later.
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <Card className="border-0 shadow">
                <Card.Header className="bg-white border-0 py-3">
                    <h5 className="mb-0 d-flex align-items-center">
                        <i className="bi bi-pencil-square me-2"></i>
                        Edit State
                    </h5>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* State Name Field */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">State Name *</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter state name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                                disabled={isUpdating}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Country Selection */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Country *</Form.Label>
                            <Form.Select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                isInvalid={!!errors.country}
                                disabled={isUpdating || isCountriesLoading}
                            >
                                <option value="">Select a country</option>
                                {countries.map(c => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.country}
                            </Form.Control.Feedback>
                            {isCountriesError && (
                                <Alert variant="danger" className="mt-2">
                                    Failed to load countries. Please try again.
                                </Alert>
                            )}
                        </Form.Group>

                        {/* API Error Display */}
                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error?.data?.error || 'An error occurred while updating the state'}
                            </Alert>
                        )}

                        {/* Form Actions */}
                        <div className="d-flex justify-content-between border-top pt-4">
                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate('/dashboard/state-list')}
                                disabled={isUpdating}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isUpdating || isCountriesLoading}
                            >
                                {isUpdating ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            className="me-2"
                                        />
                                        Updating...
                                    </>
                                ) : 'Save Changes'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditState;

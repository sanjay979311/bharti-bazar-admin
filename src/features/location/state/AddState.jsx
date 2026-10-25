

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useCreateStateMutation } from './stateApiSlice';
import { useGetCountriesQuery } from '../country/countryApiSlice';
import axios from "axios";


const AddState = () => {
    const [formData, setFormData] = useState({
        name: '',
        country: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // API Hooks
    const [addState, { isLoading: isAdding, error }] = useCreateStateMutation();
    const {
        data: countries = [],
        isLoading: isCountriesLoading,
        isError: isCountriesError
    } = useGetCountriesQuery();

      useEffect(() => {
        const fetchUserCountry = async () => {
          try {
            const res = await axios.get("https://ipapi.co/json/");
            // console.log("location is ==========>",res.data)
            const userCountry = res.data.country_name?.toLowerCase();
    
            if (countries && countries.length > 0 && userCountry) {
              const matchedCountry = countries.find(
                (c) => c.name.toLowerCase() === userCountry
              );
    
              if (matchedCountry) {
                setFormData((prev) => ({
                  ...prev,
                  country: matchedCountry._id,
                }));
              } else {
                // fallback to India if no match found
                const india = countries.find(
                  (c) => c.name.toLowerCase() === "india"
                );
                if (india) {
                  setFormData((prev) => ({
                    ...prev,
                    country: india._id,
                  }));
                }
              }
            }
          } catch (error) {
            console.error("🌐 Could not detect location:", error);
    
            // fallback to India on error
            if (countries && countries.length > 0) {
              const india = countries.find(
                (c) => c.name.toLowerCase() === "india"
              );
              if (india) {
                setFormData((prev) => ({
                  ...prev,
                  country: india._id,
                }));
              }
            }
          }
        };
    
        if (countries && countries.length > 0 && !formData.country) {
          fetchUserCountry();
        }
      }, [countries]);

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
            await addState(formData).unwrap();
            toast.success('State added successfully!',{position:"top-center"});
            setTimeout(() => navigate('/dashboard/states'), 1000);
        } catch (err) {
            console.error('Failed to add state:', err);
            toast.error(err?.data?.error || 'Failed to add state. Please try again.',{position:"top-center"});
        }
    };

    return (
        <Container className="py-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <Card className="border-0 shadow">
                <Card.Header className="bg-white border-0 py-3">
                    <h5 className="mb-0 d-flex align-items-center">
                        <i className="bi bi-geo-alt me-2"></i>
                        Add New State
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
                                disabled={isAdding}
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
                                disabled={isAdding || isCountriesLoading}
                            >
                                <option value="">Select a country</option>
                                {countries.map(country => (
                                    <option key={country._id} value={country._id}>
                                        {country.name}
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
                                {error?.data?.error || 'An error occurred while adding the state'}
                            </Alert>
                        )}

                        {/* Form Actions */}
                        <div className="d-flex justify-content-between border-top pt-4">
                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate('/dashboard/state-list')}
                                disabled={isAdding}
                            >
                                Back to List
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isAdding || isCountriesLoading}
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
                                ) : 'Add State'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddState;
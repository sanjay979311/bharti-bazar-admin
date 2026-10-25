

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Spinner, Container, Card, Alert, Row, Col } from "react-bootstrap";
import {
    useUpdateCityMutation,
    useGetCityByIdQuery
} from "./cityApiSlice";
import { useGetCountriesQuery } from "../country/countryApiSlice";
import { useGetStateByCountryIdQuery } from "../state/stateApiSlice";
import { FaCity, FaGlobe , FaMapMarkerAlt, FaArrowLeft, FaSave } from "react-icons/fa";

const EditCity = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        state: ""
    });
    const [errors, setErrors] = useState({});

    // API Hooks
    const {
        data: cityData,
        isLoading: isCityLoading,
        isError: isCityError
    } = useGetCityByIdQuery(id);

    const {
        data: countries,
        isLoading: isCountriesLoading,
        isError: isCountriesError
    } = useGetCountryQuery();

    const {
        data: states,
        isLoading: isStatesLoading,
        isError: isStatesError,
        isFetching: isStatesFetching
    } = useGetStateByCountryIdQuery(formData.country, {
        skip: !formData.country,
    });

    const [updateCity, { isLoading: isUpdating, error }] = useUpdateCityMutation();

    // Initialize form with fetched city data
    useEffect(() => {
        if (cityData) {
            setFormData({
                name: cityData.name || "",
                country: cityData.country?._id || "",
                state: cityData.state?._id || ""
            });
        }
    }, [cityData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field changes
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }

        // Reset state when country changes
        if (name === "country") {
            setFormData(prev => ({
                ...prev,
                state: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "City name is required";
        if (!formData.country) newErrors.country = "Please select a country";
        if (!formData.state) newErrors.state = "Please select a state";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await updateCity({
                id,
                formData: {
                    name: formData.name,
                    country: formData.country,
                    state: formData.state
                }
            }).unwrap();

            toast.success("City updated successfully!",{position:"top-center"});
            setTimeout(() => navigate("/dashboard/cities"), 1000);
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update city. Please try again.",{position:"top-center"});
            console.error("Update city error:", err);
        }
    };

    if (isCityLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (isCityError) {
        return (
            <Container>
                <Alert variant="danger">
                    Failed to load city data. Please try again later.
                </Alert>
            </Container>
        );
    }

    const hasStates = formData.country && states?.length > 0;
    const showNoStatesMessage = formData.country && !isStatesLoading && !isStatesFetching && !hasStates;

    return (
        <Container className="py-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <Card className="border-0 shadow">
                <Card.Header className="bg-white border-0 py-3">
                    <div className="d-flex align-items-center">
                        <Button
                            variant="outline-secondary"
                            onClick={() => navigate(-1)}
                            size="sm"
                            className="me-3"
                        >
                            <FaArrowLeft />
                        </Button>
                        <h5 className="mb-0 d-flex align-items-center">
                            <FaCity className="me-2 text-primary" />
                            Edit City
                        </h5>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* City Name Field */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">
                                <FaMapMarkerAlt className="me-2 text-muted" />
                                City Name *
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter city name"
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
                            <Form.Label className="fw-semibold">
                                <FaGlobe  className="me-2 text-muted" />
                                Country *
                            </Form.Label>
                            <Form.Select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                isInvalid={!!errors.country}
                                disabled={isUpdating || isCountriesLoading}
                            >
                                <option value="">Select a country</option>
                                {countries?.map((country) => (
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

                        {/* State Selection */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">
                                <FaMapMarkerAlt className="me-2 text-muted" />
                                State *
                            </Form.Label>
                            <Form.Select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                isInvalid={!!errors.state}
                                disabled={isUpdating || isStatesLoading || isStatesFetching || !formData.country || !hasStates}
                            >
                                <option value="">
                                    {!formData.country
                                        ? "Select a country first"
                                        : isStatesLoading || isStatesFetching
                                            ? "Loading states..."
                                            : hasStates
                                                ? "Select a state"
                                                : "No states available"}
                                </option>
                                {states?.map((state) => (
                                    <option key={state._id} value={state._id}>
                                        {state.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.state}
                            </Form.Control.Feedback>
                            {showNoStatesMessage && (
                                <Alert variant="warning" className="mt-2">
                                    No states available for the selected country.
                                </Alert>
                            )}
                            {isStatesError && (
                                <Alert variant="danger" className="mt-2">
                                    Failed to load states. Please try again.
                                </Alert>
                            )}
                        </Form.Group>

                        {/* API Error Display */}
                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error?.data?.message || "An error occurred while updating the city"}
                            </Alert>
                        )}

                        {/* Form Actions */}
                        <div className="d-flex justify-content-between border-top pt-4">
                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate("/dashboard/city-list")}
                                disabled={isUpdating}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isUpdating || !hasStates}
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
                                ) : (
                                    <>
                                        <FaSave className="me-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditCity;
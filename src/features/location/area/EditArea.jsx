

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Spinner, Container, Card, Alert } from "react-bootstrap";

import {
    useGetAreaByIdQuery,
    useUpdateAreaMutation
} from "./areaApiSlice";

import { useGetCountriesQuery } from "../country/countryApiSlice";
import { useGetStateByCountryIdQuery } from "../state/stateApiSlice";
import { useGetCityByStateIdQuery } from "../city/cityApiSlice";

import { FaCity, FaMapMarkerAlt, FaArrowLeft, FaSave } from "react-icons/fa";

const EditArea = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        country: "",
        state: "",
        city: "",
    });

    const [errors, setErrors] = useState({});

    // --- Fetch Area By ID ---
    const {
        data: areaData,
        isLoading: isAreaLoading,
        isError: isAreaError,
    } = useGetAreaByIdQuery(id);

    // --- Country Fetch ---
    const { data: countries, isLoading: isCountriesLoading } = useGetCountriesQuery();

    // --- State Fetch by Country ---
    const {
        data: states,
        isLoading: isStatesLoading,
        isFetching: isStatesFetching,
    } = useGetStateByCountryIdQuery(formData.country, {
        skip: !formData.country,
    });

    // --- City Fetch by State ---
    const { data: cities, isLoading: isCityLoading } = useGetCityByStateIdQuery(
        formData.state,
        { skip: !formData.state }
    );

    // --- Update Area ---
    const [updateArea, { isLoading: isUpdating, error }] = useUpdateAreaMutation();

    // Prefill existing area data
    useEffect(() => {
        if (areaData) {
            setFormData({
                name: areaData.name || "",
                country: areaData.country?._id || "",
                state: areaData.state?._id || "",
                city: areaData.city?._id || "",
            });
        }
    }, [areaData]);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

        if (name === "country") {
            setFormData((prev) => ({ ...prev, state: "", city: "" }));
        }

        if (name === "state") {
            setFormData((prev) => ({ ...prev, city: "" }));
        }
    };

    // Validate Form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Area name is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.city) newErrors.city = "City is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await updateArea({ id, data:formData }).unwrap();
            toast.success("Area updated successfully!",{position:"top-center"});

            setTimeout(() => navigate("/dashboard/areas"), 1000);
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update area",{position:"top-center"});
        }
    };

    if (isAreaLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    if (isAreaError) {
        return (
            <Container>
                <Alert variant="danger">Failed to load area data.</Alert>
            </Container>
        );
    }

    const hasStates = formData.country && states?.length > 0;
    const hasCities = formData.state && cities?.length > 0;

    const showNoStatesMessage =
        formData.country && !isStatesLoading && !isStatesFetching && !hasStates;

    return (
        <Container className="py-4">
            <ToastContainer />
            <Card className="shadow border-0">

                <Card.Header className="bg-white border-0 py-3">
                    <div className="d-flex align-items-center">
                        <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)} className="me-3">
                            <FaArrowLeft />
                        </Button>
                        <h5 className="mb-0">
                            <FaCity className="me-2 text-primary" /> Edit Area
                        </h5>
                    </div>
                </Card.Header>

                <Card.Body>
                    <Form onSubmit={handleSubmit}>

                       

                        {/* Country */}
                        <Form.Group className="mb-4">
                            <Form.Label>Country *</Form.Label>
                            <Form.Select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                isInvalid={!!errors.country}
                            >
                                <option value="">Select Country</option>
                                {countries?.map((country) => (
                                    <option key={country._id} value={country._id}>
                                        {country.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                        </Form.Group>

                        {/* State */}
                        <Form.Group className="mb-4">
                            <Form.Label>State *</Form.Label>
                            <Form.Select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                disabled={!formData.country}
                                isInvalid={!!errors.state}
                            >
                                <option value="">
                                    {!formData.country
                                        ? "Select a country first"
                                        : isStatesLoading
                                            ? "Loading states..."
                                            : "Select State"}
                                </option>

                                {states?.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>

                            {showNoStatesMessage && (
                                <Alert variant="warning" className="mt-2">
                                    No states available for this country.
                                </Alert>
                            )}
                        </Form.Group>

                        {/* City */}
                        <Form.Group className="mb-4">
                            <Form.Label>
                                <FaMapMarkerAlt className="me-2 text-muted" /> City *
                            </Form.Label>

                            {isCityLoading ? (
                                <div className="d-flex align-items-center">
                                    <Spinner size="sm" className="me-2" /> Loading cities...
                                </div>
                            ) : (
                                <Form.Select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    isInvalid={!!errors.city}
                                    disabled={!hasCities}
                                >
                                    <option value="">
                                        {hasCities ? "Select City" : "No cities available"}
                                    </option>

                                    {cities?.map((city) => (
                                        <option key={city._id} value={city._id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}

                            <Form.Control.Feedback type="invalid">
                                {errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                         {/* Area Name */}
                        <Form.Group className="mb-4">
                            <Form.Label>Area Name *</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter area name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Update Error */}
                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error?.data?.message || "Update failed"}
                            </Alert>
                        )}

                        <div className="d-flex justify-content-between border-top pt-4">
                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate("/dashboard/area-list")}
                            >
                                Cancel
                            </Button>

                            <Button variant="primary" type="submit" disabled={isUpdating}>
                                {isUpdating ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" className="me-2" />
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

export default EditArea;

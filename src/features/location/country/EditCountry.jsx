


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Spinner, Card } from "react-bootstrap"; // Import Bootstrap components
import {
    useUpdateCountryMutation,
    useGetCountryByIdQuery,
} from "./countryApiSlice";

const EditCountry = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");

    // Fetch country data
    const { data: country, isLoading: isFetching, isError: isFetchError, refetch } = useGetCountryByIdQuery(id);

    // Update country mutation
    const [updateCountry, { isLoading: isUpdating }] = useUpdateCountryMutation();

    // Set form data when country is fetched
    useEffect(() => {
        if (country) {
            setName(country.name);
        }
    }, [country]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (!name.trim()) {
            toast.error("Country name is required");
            return;
        }

        // Prepare form data
        const formData = { name };

        try {
            // Trigger the update mutation
            const response = await updateCountry({ id, data:formData }).unwrap();
            toast.success(response?.message || "Country updated successfully!",{position:"top-center"});

            // Redirect to country list after 1 second
            setTimeout(() => {
                navigate("/dashboard/countries");
            }, 1000);
        } catch (error) {
            console.error("Error updating country:", error);
            toast.error(error?.data?.error || "Error updating country!");
        }
    };

    // Show loading state while fetching data
    if (isFetching) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    // Show error state if fetching fails
    if (isFetchError) {
        return (
            <Container className="text-center text-danger mt-5">
                <p>Error loading country data.</p>
            </Container>
        );
    }

    return (
        <>
            <Container>
                <ToastContainer />
                <h5 className="mb-4">Update Country</h5>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="py-4 border-top">
                                <div className="row align-items-center">
                                    <div className="col-md-10">
                                        <Card border="0" className="p-3 shadow-sm">
                                            <Card.Body>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-medium">
                                                        Country Name *
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        disabled={isUpdating} // Disable input while updating
                                                    />
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col sticky-bottom">
                            <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
                                <div className="row">
                                    <div className="col-auto">
                                        <Button
                                            variant="outline-primary"
                                            size="lg"
                                            className="fw-semibold"
                                            onClick={() => navigate("/dashboard/country-list")}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                    <div className="col-auto ms-auto">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="fw-semibold"
                                            disabled={isUpdating} // Disable button while updating
                                        >
                                            {isUpdating ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="me-2"
                                                    />
                                                    Updating...
                                                </>
                                            ) : (
                                                "Submit"
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default EditCountry;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Spinner, Container, Card, Alert } from "react-bootstrap";
import {
  FaCity,
  FaGlobe ,
  FaMapMarkerAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { useGetCountriesQuery } from "../country/countryApiSlice";
import { useGetStateByCountryIdQuery } from "../state/stateApiSlice";
import { useGetCityByStateIdQuery } from "../city/cityApiSlice";
import { useCreateAreaMutation } from "./areaApiSlice";

const AddArea = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    state: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ RTK Query Hooks
  const [addArea, { isLoading: isAdding, error }] = useCreateAreaMutation();
  const { data: countries, isLoading: isCountriesLoading } = useGetCountriesQuery();
  const { data: states, isLoading: isStatesLoading } = useGetStateByCountryIdQuery(
    formData.country,
    { skip: !formData.country }
  );
  const { data: cities, isLoading: isCityLoading } = useGetCityByStateIdQuery(
    formData.state,
    { skip: !formData.state || !formData.country }
  );

  // ✅ Detect and auto-select user's country
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

  // ✅ Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      setFormData({ ...formData, country: value, state: "", city: "" });
    } else if (name === "state") {
      setFormData({ ...formData, state: value, city: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Area name(s) are required";
    if (!formData.country) newErrors.country = "Please select a country";
    if (!formData.state) newErrors.state = "Please select a state";
    if (!formData.city) newErrors.city = "Please select a city";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const areaNames = formData.name
      .split(/[,|\n]/)
      .map((a) => a.trim())
      .filter(Boolean);

    if (areaNames.length === 0) {
      setErrors({ name: "Please enter at least one valid area name" });
      return;
    }

    const payload = {
      areas: areaNames.map((name) => ({
        name,
        country: formData.country,
        state: formData.state,
        city: formData.city,
      })),
    };

    try {
      await addArea(payload).unwrap();
      toast.success(
        `${areaNames.length} area${areaNames.length > 1 ? "s" : ""} added successfully!`,{position:"top-center"}
      );
      setTimeout(() => navigate("/dashboard/areas",), 1200);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add areas. Please try again.",{position:"top-center"});
      console.error("Add multiple areas error:", err);
    }
  };

  const hasStates = states && states.length > 0;
  const hasCities = cities && cities.length > 0;

  return (
    <Container className="py-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <Card className="border-0 shadow-sm">
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
              Add Multiple Areas
            </h5>
          </div>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Country */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                <FaGlobe  className="me-2 text-muted" /> Country *
              </Form.Label>
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleChange}
                isInvalid={!!errors.country}
                disabled={isAdding || isCountriesLoading}
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
            </Form.Group>

            {/* State */}
            {formData.country && (
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">
                  <FaMapMarkerAlt className="me-2 text-muted" /> State *
                </Form.Label>
                {isStatesLoading ? (
                  <div className="d-flex align-items-center">
                    <Spinner size="sm" className="me-2" /> Loading states...
                  </div>
                ) : (
                  <Form.Select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    isInvalid={!!errors.state}
                    disabled={isAdding || !hasStates}
                  >
                    <option value="">
                      {hasStates ? "Select a state" : "No states available"}
                    </option>
                    {states?.map((state) => (
                      <option key={state._id} value={state._id}>
                        {state.name}
                      </option>
                    ))}
                  </Form.Select>
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
            )}

            {/* City */}
            {formData.state && (
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">
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
                    disabled={isAdding || !hasCities}
                  >
                    <option value="">
                      {hasCities ? "Select a city" : "No cities available"}
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
            )}

            {/* Area Input */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                <FaMapMarkerAlt className="me-2 text-muted" /> Area Names *
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="name"
                placeholder="Enter multiple area names separated by commas or new lines (e.g., Park Street, Salt Lake)"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                disabled={isAdding}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                You can separate area names using commas or line breaks.
              </Form.Text>
            </Form.Group>

            {/* Error */}
            {error && (
              <Alert variant="danger" className="mb-4">
                {error?.data?.message || "An error occurred while adding areas"}
              </Alert>
            )}

            {/* Buttons */}
            <div className="d-flex justify-content-between border-top pt-4">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/dashboard/area-list")}
                disabled={isAdding}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={
                  isAdding || !formData.country || !formData.state || !formData.city
                }
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
                ) : (
                  "Add Areas"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddArea;


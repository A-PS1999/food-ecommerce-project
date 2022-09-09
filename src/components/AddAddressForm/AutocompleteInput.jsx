import React, { useState, useEffect } from "react";
import useGoogleAutocompleteService from "../../hooks/useGoogleAutocompleteService";
import './AutocompleteInput.scss';

export default function AutocompleteInput({ onChange, className, setCity }) {

    const [sessionToken, setSessionToken] = useState(undefined);
    const [autocompleteService, setAutocompleteService] = useState(undefined);
    const [addressInput, setAddressInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(true);
    const suggestions = useGoogleAutocompleteService(autocompleteService, sessionToken, addressInput);

    useEffect(() => {
        const initService = async () => {
            try {
                if (!window.google) throw new Error("Google Places script not yet loaded");
                if (!window.google.maps.places) throw new Error("Google Maps Places script not yet loaded");

                setSessionToken(new google.maps.places.AutocompleteSessionToken());
                setAutocompleteService(new window.google.maps.places.AutocompleteService());
            } catch (error) {
                console.log(error);
            }
        }

        initService();
    }, []);

    const handleInputChange = (e) => {
        setAddressInput(e.target.value);
        onChange(e.target.value);
    }

    const handlePredictionSelection = (e, prediction) => {
        const townCityValue = prediction.terms[2].value ? prediction.terms[2].value : prediction.terms[1].value

        e.preventDefault();
        setAddressInput(prediction.structured_formatting.main_text);
        onChange(prediction.structured_formatting.main_text);
        setCity(townCityValue);
        setShowSuggestions(!showSuggestions);
    }

    return (
        <>
            <input className={className} onChange={(e) => handleInputChange(e)} value={addressInput} />
                {showSuggestions && suggestions && suggestions.length > 0 ? (
                    <ul className="predictions-list">
                        <button type="button" onClick={() => setShowSuggestions(!showSuggestions)} className="predictions-list__close-btn">
                                Close
                        </button>
                        {suggestions.map((prediction) => {
                            return (
                                <li key={prediction.place_id} className="predictions-list__prediction"
                                    onClick={(e) => handlePredictionSelection(e, prediction)}
                                >
                                    {prediction.description}
                                </li>
                            )
                        })}
                        <span className="predictions-list__bottom-section">
                            <div className="predictions-list__bottom-section__attribution">
                                Powered by <img src="/google_attribution.png" className="predictions-list__bottom-section__attribution__google-logo" />
                            </div>
                        </span>
                    </ul>
                ) : null}
        </>
    )
}
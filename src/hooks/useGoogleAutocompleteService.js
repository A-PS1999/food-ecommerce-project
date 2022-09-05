import { useEffect, useState } from "react"

export default function useGoogleAutocompleteService(autocompleteService, token, input="", timeout=400) {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (!autocompleteService || !token) return;

        const debouncedPlacesCall = setTimeout(async () => {
            try {
                const placesSuggestions = await autocompleteService.getPlacePredictions({
                    input: input,
                    sessionToken: token,
                    componentRestrictions: { country: "gb" },
                })
                setSuggestions(placesSuggestions);
            } catch (error) {
                console.log(error);
            }
        }, timeout)

        return () => {
            clearTimeout(debouncedPlacesCall)
        }
    }, [input])

    return suggestions.predictions;
}
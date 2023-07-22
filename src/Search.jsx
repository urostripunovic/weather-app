import React, { useState } from 'react'
import { AsyncPaginate } from "react-select-async-paginate";
import axios from "axios"

const GEO_URL = import.meta.env.VITE_GEO_URL;
const API_KEY = import.meta.env.VITE_API_KEY_GEO_DB;

export default function Search({ onSearchChange }) {

    const [search, setSearch] = useState(null);

    const loadCities = async (city) => {
        try {
            const response = await axios.get(`${GEO_URL}`, {
                params: {
                    namePrefix: city,
                    minPopulation: '1000',
                },
                headers: {
                    "X-RapidAPI-Key": API_KEY,// enter your rapid api key here
                    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                },
            });
            const options = response.data.data.map(value => {
                return {
                    label: `${value.name}, ${value.countryCode}`,
                };
            })
            return { options }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <>
            <AsyncPaginate
                placeholder="Search for city"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadCities}
            />
        </>
    )
}

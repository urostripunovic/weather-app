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
            const res = response.data.data.map(value => {
                return {
                    label: `${value.name}, ${value.countryCode}`,
                };
            })
            const removedDuplicated = [...new Set(res.map(option => option.label))];
            const options = Array.from(removedDuplicated, value => ({ label: value }));
            
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

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: '5px',
            border: '2px solid #ccc',
            boxShadow: state.isFocused ? '0 0 0 2px #3699FF' : null,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#3699FF' : null,
            color: state.isFocused ? 'white' : null,
        }),
    }

    return (
        <>
            <AsyncPaginate
                placeholder="Search for city"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadCities}
                styles={customStyles}
            />
        </>
    )
}

import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ICurrency} from "../../../models/currency";
import {toast} from "react-toastify";
import Loader from "../../ui/loader/loader";
import {CoreTextField, MainDiv} from "../../ui/styled";
import {InputLabel} from "@mui/material";
import {config} from "../../../environments";

const CurrencyDetails = () => {
    const {id} = useParams<{ id: string }>();
    const [data, setData] = useState<ICurrency>();
    const [isLoading, setIsLoading] = useState(false);

    async function fetchCurrencyById() {
        try {
            setIsLoading(true);
            const request =
                `${config}/currencies/${id}`;
            const response = await fetch(request);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            setData(result);
        } catch (error: any) {
            toast.error('Ошибка при загрузке данных')
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        if (id) {
            fetchCurrencyById();
        }
    }, []);

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <MainDiv>
            <h2>Детали валюты</h2>
            <div>
                <InputLabel>Название</InputLabel>
                <CoreTextField
                    value={data?.name}
                >
                </CoreTextField>
            </div>
            <div>
                <InputLabel>Символ</InputLabel>
                <CoreTextField
                    value={data?.charCode}
                >
                </CoreTextField>
            </div>
            <div>
                <InputLabel>Номинал</InputLabel>
                <CoreTextField
                    value={data?.nominal}
                >
                </CoreTextField>
            </div>
            <div>
                <InputLabel>Цена</InputLabel>
                <CoreTextField
                    value={data?.value}
                >
                </CoreTextField>
            </div>
            <div>
                <InputLabel>Цена за 1</InputLabel>
                <CoreTextField
                    value={data?.vunitRate}
                >
                </CoreTextField>
            </div>
        </MainDiv>
    );
};

export default CurrencyDetails;
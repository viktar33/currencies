import React, {useEffect, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {IMetaData} from "../../models/metaData";
import {ICurrency} from "../../models/currency";
import {Button, debounce} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import currenciesColumns from "./currenciesColumns";
import {CoreButton, CoreTextField, MainDiv} from "../ui/styled";
import {NavLink, useNavigate} from "react-router-dom";
import {config} from "../../environments";

const Currencies = () => {
    const [data, setData] = useState<ICurrency[]>([]);
    const [metaData, setMetaData] = useState<IMetaData>();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date();
    const navigate = useNavigate();

    async function fetchCurrencies() {
        try {
            setIsLoading(true);
            const request =
                `${config}/currencies?` + new URLSearchParams({
                    searchTerm: searchTerm,
                    pageSize: paginationModel.pageSize.toString(),
                    pageNumber: (paginationModel.page + 1).toString()
                });
            const response = await fetch(request);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            setData(result.items);
            setMetaData(result.metaData);

        } catch (error: any) {
            toast.error('Ошибка при загрузке данных')
        } finally {
            setIsLoading(false);
        }
    }

    const updateCurrencies = async () => {

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

        try {
            setIsLoading(true);
            const response = await fetch(
                `${config}/currencies`,{method:'POST',headers:headers})
                .then(res => res.json())
            if (!response) {
                throw new Error();
            }
            toast.success('Данные обновлены');
            fetchCurrencies();
        } catch (error: any) {
            toast.error('Ошибка при обновлении данных')
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    useEffect(() => {
        fetchCurrencies();
    }, [paginationModel, searchTerm]);

    const debouncedSearch = debounce((event: any) => {
        setSearchTerm(event.target.value);
    }, 1500);

    const pageChangeHandler = (e: any) => {
        setPaginationModel({
            ...paginationModel,
            page: e.page,
            pageSize: e.pageSize,
        });
    };

    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <MainDiv>
            {!localStorage.getItem('token') &&
                <div style={{marginBottom: '1%'}}>
                    <NavLink to={'/signIn'}>
                        <Button variant='outlined' color='info'>Войти</Button>
                    </NavLink>
                </div>
            }
            {localStorage.getItem('token') &&
                <>
                    <div>
                        <CoreButton
                            color='error'
                            variant='outlined'
                            onClick={() => logOut()}
                        >
                            Выйти
                        </CoreButton>
                    </div>
                    <CoreButton
                        color='success'
                        variant='outlined'
                        onClick={() => updateCurrencies()}
                    >
                        Обновить данные
                    </CoreButton>
                </>
            }
            <h2>Курсы валют на {today.toString()}</h2>
            <CoreTextField
                fullWidth
                value={searchTerm || ""}
                label="Поиск по названию валюты..."
                onChange={(event: any) => {
                    setSearchTerm(event.target.value);
                    debouncedSearch(event);
                }}
            />
            <DataGrid
                loading={isLoading}
                pagination
                paginationMode="server"
                rowCount={metaData?.totalCount}
                autoHeight
                rows={data}
                paginationModel={paginationModel}
                style={{backgroundColor: 'white'}}
                columns={currenciesColumns}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                onPaginationModelChange={(e) => pageChangeHandler(e)}
            />
            <ToastContainer/>
        </MainDiv>
    );
};

export default Currencies;
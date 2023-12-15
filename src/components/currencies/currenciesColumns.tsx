import {GridActionsCellItem, GridColDef, GridRowParams} from "@mui/x-data-grid";
import {NavLink} from "react-router-dom";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";


const currenciesColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Валюта',
        width: 350,
    },
    {
        field: 'nominal',
        headerName: 'Номинал, руб.',
        width: 150,
    },
    {
        field: 'charCode',
        headerName: 'Символ',
        width: 150,
    },
    {
        field: 'value',
        headerName: 'Цена',
        width: 150,
    },
    {
        field: 'vunitRate',
        headerName: 'Цена за 1 руб.',
        width: 150,
    },
    {
        field: "Details",
        headerName: "Подробнее",
        type: "actions",
        width: 100,
        getActions: (params: GridRowParams) => [
            <GridActionsCellItem
                icon={
                    <NavLink
                        style={{textDecoration: "none", color: "gray"}}
                        to={`/currencies/${params.id}`}
                    >
                        <InfoTwoToneIcon/>
                    </NavLink>
                }
                label="MoreInfo"
            />,
        ],
    },
];

export default currenciesColumns;
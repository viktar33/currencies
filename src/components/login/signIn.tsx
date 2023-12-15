import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {config} from "../../environments";
import {Button} from "@mui/material";
import {CoreTextField} from "../ui/styled";

const SignIn = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: any) => {

        event.preventDefault();

        try {
            const response = await fetch(
                `${config}/users/token?Name=${name}&Password=${password}`, {
                    method: 'GET',
                }).then((res) => res.json());
            if (!response.token) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const token = response.token;
            if (token) {
                toast.success("Вы вошли на сайт");
                localStorage.setItem("token", token);
                navigate("/")
            }
        } catch (error: any) {
            toast.error('Ошибка при входе')
        }
    };

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Добро пожаловать на страницу входа</h1>
            <p>Логин: Admin</p>
            <p>Пароль: admin</p>
            <form onSubmit={handleSubmit}>
                <CoreTextField
                    placeholder='Введите логин'
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    required/>
                <div>
                    <CoreTextField
                        placeholder='Введите пароль'
                        type="text"
                        value={password}
                        onChange={handlePasswordChange}
                        required/>
                </div>
                <Button variant='contained' color='success' type="submit">Войти</Button>
                <ToastContainer/>
            </form>
        </div>
    );
};

export default SignIn;
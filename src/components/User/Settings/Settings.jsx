import { Close, Exit, MEXC_URL } from "../../../utils/const";
import { Link } from "react-router-dom";
import { useState } from "react";
import styleSettings from "./settings.module.scss";
import Select from 'react-select';
import axios from "axios";

function Settings ({setIsLogged}){
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
      setDarkMode(prevMode => !prevMode);
    };

    const getTokenFromLocalStorage = () => {
        return localStorage.getItem("accessToken");
      };

    const handleLogout = () => {
        // Дополнительная логика выхода, например, сброс статуса авторизации
        setIsLogged(false);
  
        localStorage.removeItem('accessToken');
    }

    const handleSettingBtn = (event) =>{
        event.preventDefault();
        if (password !== passwordConfirmation) {
            setPasswordError(true);
            setPasswordConfirmationError(true);
            return;
        }
    
        axios.put(`${MEXC_URL}/api/user`, {password: password},{
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${getTokenFromLocalStorage()}`,
              },
            }
          )
          .then((response) => {
            setPassword("")
            setPasswordConfirmation("")
            setPasswordError(false);
            setPasswordConfirmationError(false);
          })
          .catch((error) => {});
      }

    return(
        <div className={styleSettings.profile}>
            <div className={styleSettings.ball__left}></div>
            <div className={styleSettings.frame}>
                <nav>
                    <div className={styleSettings.nav__items}>
                        <Link to="/profile">
                            <button>Профиль</button>
                        </Link>
                        {/* <Link to="/profile/tariffs">
                            <button >Тарифы <span>и оплаты</span></button>
                        </Link> */}
                        <Link to="/profile/settings">
                            <button className={styleSettings.nav__btn}>Настройка <span>аккаунта</span></button>
                        </Link>
                    </div>
                    <div className={styleSettings.nav__exit} onClick={handleLogout}>{Exit} &nbsp; выйти</div>
                </nav>

                <div className={styleSettings.settings}>
                    <h2>Настройка аккаунта</h2>
                    <div className={styleSettings.settings__password}>
                        <h4>Изменит пароль</h4>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError(false);
                            }}
                            placeholder="Пароль"
                            className={passwordError ? styleSettings.error : ''}
                        />
                        <input
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => {
                                setPasswordConfirmation(e.target.value);
                                setPasswordConfirmationError(false);
                            }}
                            placeholder="Повторите пароль"
                            className={passwordConfirmationError ? styleSettings.error : ''}
                        />
                        <button onClick={handleSettingBtn}>Сохранить</button>
                    </div>
                    <div className={styleSettings.settings__theme}>
                        <div>
                            <h4>Тема</h4>
                            <button onClick={toggleTheme} className={styleSettings.theme__toggle}>
                                {darkMode ? (
                                    <div>
                                        <span role="img" aria-label="Light Mode" >
                                        ☀️
                                        </span>
                                        <span role="img" aria-label="Dark Mode" className={styleSettings.theme__choose}>
                                        🌙
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        <span role="img" aria-label="Light Mode" className={styleSettings.theme__choose}>
                                        ☀️
                                        </span>
                                        <span role="img" aria-label="Dark Mode" >
                                        🌙
                                        </span>
                                    </div>
                                )}
                            </button>
                        </div>
                        <div>
                            <h4>Помощь</h4>
                            <input type="text" placeholder="t.me/athkeeperinfo" readOnly/>
                        </div>
                    </div>
                </div>
                <Link to="/trade">
                        <div className={styleSettings.close}>{Close}</div>
                </Link>
            </div>
            <div className={styleSettings.ball__rigth}></div>
        </div>
    )
}

export default Settings
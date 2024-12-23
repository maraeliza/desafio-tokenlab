import { useState, useEffect } from "react";

import InputField from "../components/inputs/InputField.jsx";
import InputPassword from "../components/inputs/InputPassword.jsx";

import isValidEmail from "../utils/validarEmail.jsx";
import isValidSenha from "../utils/validarSenha.jsx";

import "../styles/styleLogin.css";
import routes from "../utils/routes.json";
import CustomInput from "../components/inputs/CustomInput.jsx";

const LOGIN_ROUTE = routes.basePath + routes.loginUser;

const ScreenLogin = () => {
  const [email, setEmail] = useState("");
  const [emailFocado, setEmailFocado] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdFocado, setPwdFocado] = useState(false);

  const [valid, setValid] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!valid) {
      return "";
    }
    var userDados = {
      email: email,
      senha: pwd
    };

    try {
      const response = await fetch(LOGIN_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDados),
      });
      if (response.status == 200) {
        const data = await response.json();
        if(data.auth){
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          
          window.location.href = '#/home';
        }       
      } else {
        console.log("Não foi possível logar!");
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
    }
  }
  useEffect(() => {
    setValid( isValidEmail(email) && isValidSenha(pwd));
  }, [pwd, email]);

  return (
    <section className="login-container">
      <div className="icon"></div>

      <h2 className="form-title">LOGAR</h2>
      <form action="#" className="login-form" onSubmit={handleSubmit}>
        <InputField
          type="text"
          icon="account_circle"
          name="email"
          setValue={(e) => setEmail(e.target.value)}
          Input={CustomInput}
          setFocado={setEmailFocado}
        />
        <InputField
          icon="lock"
          name="senha"
          setValue={(e) => setPwd(e.target.value)}
          Input={InputPassword}
          setFocado={setPwdFocado}
        />

        <a href="#" className="forgot-pass-link">
          Esqueceu a senha?
        </a>
        <button type="submit" className="login-button" disabled={!valid}>
          Log in
        </button>
        <p className="signup-text">
          Não tem uma conta? <a href="#/registro">Cadastre-se agora</a>
        </p>
      </form>
    </section>
  );
};
export default ScreenLogin;

import { useState, useEffect } from "react";

import CustomInput from "../components/inputs/CustomInput.jsx";
import InputPassword from "../components/inputs/InputPassword.jsx";
import InputVerified from "../components/inputs/InputVerifiedField.jsx";

import isValidEmail from "../utils/validarEmail.jsx";
import isValidSenha from "../utils/validarSenha.jsx";

import "../styles/styleRegistro.css";

import routes from "../utils/routes.json";
const REGISTER_ROUTE = routes.basePath + routes.registerUser;

const isValidNome = (nome) => {
  return nome.length > 1;
};

const ScreenRegister = () => {
  const [nome, setNome] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdMatch, setPwdMatch] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);

  const isValidMatch = (pwdMatch) => {
    return pwd && pwdMatch && isValidSenha(pwd) && pwd === pwdMatch;
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!valid) {
      return "";
    } else {
      var userDados = {
        nome: nome,
        email: email,
        senha: pwd,
      };

      try {
        const response = await fetch(REGISTER_ROUTE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDados),
        });
        console.log(response);
        if (response.status == 201) {
          console.log("Usuário registrado com sucesso.");
          window.location.href = "#/login";
        }
      } catch (error) {
        console.error("Erro ao enviar dados para a API:", error);
      }
    }
  }

  useEffect(() => {
    setValid(isValidEmail(email) && isValidMatch(pwdMatch));
  }, [pwd, pwdMatch]);

  return (
    <section className="registro-container">
      <h2 className="form-title">Cadastrar Novo Usuário</h2>
      <form action="#" className="registro-form" onSubmit={handleSubmit}>
        <InputVerified
          icon="account_circle"
          name="nome"
          value={nome}
          setValue={(e) => setNome(e.target.value)}
          Input={CustomInput}
          legenda="Esse campo não deve estar vazio"
          validar={isValidNome}
        />

        <InputVerified
          icon="mail"
          name="email"
          value={email}
          setValue={(e) => setEmail(e.target.value)}
          Input={CustomInput}
          legenda="Insira um e-mail válido no formato: nome@dominio.com. Certifique-se de incluir uma '@' e um domínio válido, como '.com' ou '.org'."
          validar={isValidEmail}
        />
        <InputVerified
          icon="lock"
          name="senha"
          value={pwd}
          setValue={(e) => setPwd(e.target.value)}
          Input={InputPassword}
          legenda={`Sua senha deve conter entre 4 e 24 caracteres, com pelo menos uma letra
            maiúscula e minúscula, um número e um desses caracteres especiais ! @ #
            $ %`}
          validar={isValidSenha}
        />
        <InputVerified
          icon="lock"
          name="confirmar senha"
          value={pwdMatch}
          setValue={(e) => setPwdMatch(e.target.value)}
          Input={InputPassword}
          legenda="As senhas devem ser iguais"
          validar={isValidMatch}
        />
        <button type="submit" className="registro-button" disabled={!valid}>
          Cadastrar
        </button>
        <p className="signup-text">
          Já tem uma conta? <a href="#/login">Logue agora</a>
        </p>
      </form>
    </section>
  );
};

export default ScreenRegister;

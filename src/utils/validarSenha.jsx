

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;

const isValidSenha= (senha) => {
    return PWD_REGEX.test(senha);
}
export default isValidSenha;
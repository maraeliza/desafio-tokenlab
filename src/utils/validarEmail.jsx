
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isValidEmail= (email) => {
    return EMAIL_REGEX.test(email);
}
export default isValidEmail;
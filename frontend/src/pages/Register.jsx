import Form from "../components/Form"

// the route prop (user/register/) will append to the baseURL in api.js, resulting in http://localhost:8000/api/user/register/

// when logging in the route to go to is:/api/user/register/ in django
function Register() {
    // use creater form component
    return <Form route="/api/user/register/" method="register" />
}

export default Register
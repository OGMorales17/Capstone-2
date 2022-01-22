import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../utilities/Alert";

// import { useFormik, Formik, Field, Form } from 'formik';
// import 'bootstrap/dist/css/bootstrap.min.css';



function LoginForm({ login }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            navigate("/");
        } else {
            setFormErrors(result.errors);
        }
    }

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    return (
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Log In</h3>

                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null}

                            <button
                                className="btn btn-primary float-right mt-2"
                                onSubmit={handleSubmit}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;








// return (
//     <Box
//         p={3}
//         style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "20px",
//         }}
//     >
//         <TextField
//             variant="outlined"
//             type="email"
//             label="Enter Username"
//             value={formData.username}
//             onChange={handleChange}
//             autoComplete="username"
//             required
//             fullWidth
//         />
//         <TextField
//             variant="outlined"
//             label="Enter Password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             autoComplete="current-password"
//             required
//             fullWidth
//         />

//         {formErrors.length
//             ? <Alert type="danger" messages={formErrors} />
//             : null}
//         <Button
//             variant="contained"
//             size="large"
//             onClick={handleSubmit}
//             style={{ backgroundColor: "#EEBC1D" }}
//         >
//             Login
//         </Button>
//     </Box>
// );

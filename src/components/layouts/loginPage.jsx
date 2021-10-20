import React, { useState } from "react";

const LoginPage = () => {
    const [data, setData] = useState({ email: "", password: "" });

    const handleChange = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    return (
        <form action="">
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={data.email} onChange={handleChange} name="email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={data.password} onChange={handleChange} name="password"/>
            </div>
        </form>
    );
};

export default LoginPage;

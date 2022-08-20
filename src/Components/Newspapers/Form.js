import React, { useState } from "react";

const Form = props => {
    const [name, setName] = useState('');
    const [num, setNum] = useState('');
    const [email, setEmail] = useState('');

    const formSubmit = (event) => {
        event.preventDefault();
        let formData = {
            Name: name,
            Number: num,
            Email: email
        }
        props.SaveData(formData);
        setEmail('');
        setName('');
        setNum('');
    };

    const nameHandler = (event) => {
        setName(event.target.value);
    }
    const emailHandler = (event) => {
        setEmail(event.target.value);
    }
    const numHandler = (event) => {
        setNum(event.target.value);
    }

    return (
        <>
            <h2>Form</h2>
            <form onSubmit={formSubmit}>
                <div>
                    <label>Enter full name</label>
                    <input type="text" onChange={nameHandler} value={name}></input>
                </div>
                <div>
                    <label>Enter email</label>
                    <input type="email" onChange={emailHandler} value={email}></input>
                </div>
                <div>
                    <label>Enter phone number</label>
                    <input type="number" onChange={numHandler} value={num}></input>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );
};

export default Form;

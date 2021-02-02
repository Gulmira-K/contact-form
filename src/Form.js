import { Component } from "react";
import "./Form.css";
import axios from "axios";

export class ContactForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            email: "",
            message: "",
            sent: false,
            validationMessage: ""
        };
        this.change = this.change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    change(e) {
       this.setState({[e.target.name] : e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        let name = this.state.name;
        let surname = this.state.surname;
        let message = this.state.message;
        let email = this.state.email;
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email) || name.length < 1 || surname.length < 1 || message.length < 1) {
            this.setState({
                validationMessage: "Please enter valid data"
            })
        }
        
        let data = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            message: this.state.message
        }

        axios.post('/api/forma', data)
            .then(res => {
                this.setState({
                    sent: true,
                }, this.resetForm())
            }).catch(() => {
                console.log("message not sent")
            })
    }

    // reset initial form
    resetForm = () => {
        this.setState({
            name: "",
            surname: "",
            email: "",
            message: "",
        })

        setTimeout(() => {
            this.setState({
                sent: false,
            })
        }, 3000)
    }

    render() {
        return (
            <div className="ContactForm">
                <form onSubmit={e => this.handleSubmit(e)}>
                        <div className="content-container">
                            <div className="name-input">
                                <input
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Nombre"
                                    value = {this.state.name}
                                    onChange={e => this.change(e)}
                                />
                                <input
                                    name="surname"
                                    type="text"
                                    className="form-control"
                                    id="surname"
                                    placeholder="Apellidos"
                                    value = {this.state.surname}
                                    onChange={e => this.change(e)}
                                />
                            </div>
                            <div className="email-input">
                                <input
                                    name="email"
                                    type="text"
                                    id="email"
                                    placeholder="E-mail"
                                    value = {this.state.email}
                                    onChange={e => this.change(e)}
                                />
                            </div>
                            <div className="message-input">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows= "5"
                                    placeholder="Puedes escribirnos aquí lo que quieras..."
                                    value={this.state.message}
                                    onChange={e => this.change(e)}/>
                        </div>
                        <div className="validation-msg">{this.state.validationMessage}</div>
                        <br/>
                            <div className="send-btn">
                                <button>ENVIAR</button>
                        </div>
                        </div>
                </form>
            </div>
        );
    }
}

export default ContactForm;

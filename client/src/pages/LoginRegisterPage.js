import React, { Component } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import AuthService from "../components/AuthService";
import ModalCard from "../components/ModalCard";
import API from "../utils/API";
import Modal from "@material-ui/core/Modal";

const HomeWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1
  display: flex;
`;

const IntroWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  background-position: center;
  background-size: cover;
  position: relative;
`;

const LoginRegisterWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const LoginRegisterTop = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginRegisterBottom = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class LoginRegisterPage extends Component {
  state = {
    loginEmail: "",
    loginPassword: "",
    loginErrors: {},
    loginShow: false,
    loginIsEnabled: false,

    registerEmail: "",
    registerPassword: "",
    registerRepeatPassword: "",
    registerErrors: {},
    registerShow: false,
    registerIsEnabled: false,

    modalOpen: false,
    modalHeadline: "",
    modalContent: ""
  };
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        if (name === "loginEmail" || name === "loginPassword") {
          return this.validateLogin();
        }
        this.validateRegister();
      }
    );
  };

  handleLogin = e => {
    e.preventDefault();

    this.Auth.login(this.state.loginEmail, this.state.loginPassword)
      .then(response => {
        this.props.history.replace("/");
      })
      .catch(error => {
        this.setState({
          modalHeadline: "Email or Password Incorrect",
          modalContent: "",
          modalOpen: true
        });
      });
  };

  handleRegister = e => {
    e.preventDefault();

    const query = {
      email: this.state.registerEmail,
      password: this.state.registerPassword
    };

    API.registerUser(query)
      .then(response => {
        this.setState({
          modalHeadline: "You've Successfully Registered!",
          modalContent: "Please try loggin in",
          modalOpen: true,
          registerShow: false,
          loginShow: true
        });
      })
      .catch(error => {
        this.setState({
          modalHeadline: "User Already Exists",
          modalContent: "",
          modalOpen: true
        });
      });
  };

  handleShow = e => {
    const { name } = e.target;
    this.setState({ [name]: true });
  };

  closeModal = e => {
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <HomeWrapper>
        <ContentWrapper>
          <IntroWrapper>
            <Intro />
          </IntroWrapper>
          <LoginRegisterWrapper>
            <LoginRegisterTop>
              <LoginForm
                email={this.state.loginEmail}
                password={this.state.loginPassword}
                errors={this.state.loginErrors}
                show={this.state.loginShow}
                isEnabled={this.state.loginIsEnabled}
                handleShow={this.handleShow}
                handleChange={this.handleChange}
                handleLogin={this.handleLogin}
              />
            </LoginRegisterTop>
            <Modal
              open={this.state.modalOpen}
              onBackdropClick={this.closeModal}
              children={
                <ModalCard
                  headline={this.state.modalHeadline}
                  content={this.state.modalContent}
                  handleClose={this.closeModal}
                />
              }
            />
            <LoginRegisterBottom>
              <RegisterForm
                email={this.state.registerEmail}
                password={this.state.registerPassword}
                repeatPassword={this.state.registerRepeatPassword}
                errors={this.state.registerErrors}
                show={this.state.registerShow}
                isEnabled={this.state.registerIsEnabled}
                handleShow={this.handleShow}
                handleChange={this.handleChange}
                handleRegister={this.handleRegister}
              />
            </LoginRegisterBottom>
          </LoginRegisterWrapper>
        </ContentWrapper>
        <Footer />
      </HomeWrapper>
    );
  }

  validateLogin = () => {
    const { loginEmail, loginPassword } = this.state;
    let errors = {};
    if (!loginEmail) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(loginEmail)) {
      errors.email = "Invalid email address";
    }
    if (!loginPassword) {
      errors.password = "Required";
    } else if (loginPassword.length < 6) {
      errors.password = "Must contain at least 6 characters";
    }

    this.setState({ loginErrors: errors }, () => this.enableLogin());
  };

  enableLogin = () => {
    const { loginErrors } = this.state;
    if (!loginErrors.email && !loginErrors.password) {
      this.setState({ loginIsEnabled: true });
    } else {
      this.setState({ loginIsEnabled: false });
    }
  };

  validateRegister = () => {
    const {
      registerEmail,
      registerPassword,
      registerRepeatPassword
    } = this.state;
    let errors = {};

    if (!registerEmail) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(registerEmail)
    ) {
      errors.email = "Invalid email address";
    }
    if (!registerPassword || !registerRepeatPassword) {
      errors.password = "Required";
    } else if (
      registerPassword.length < 6 ||
      registerRepeatPassword.length < 6
    ) {
      errors.password = "Must contain at least 6 characters";
    } else if (registerPassword !== registerRepeatPassword) {
      errors.password = "Passwords don't match";
    }

    this.setState({ registerErrors: errors }, () => this.enableRegister());
  };

  enableRegister = () => {
    const { registerErrors } = this.state;
    if (!registerErrors.email && !registerErrors.password) {
      this.setState({ registerIsEnabled: true });
    } else {
      this.setState({ registerIsEnabled: false });
    }
  };
}

export default LoginRegisterPage;

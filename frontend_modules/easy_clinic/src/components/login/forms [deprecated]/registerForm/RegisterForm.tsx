import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import '../Form.scss';

interface RegisterState {
    firstStepData: FirstStepData;
    firstStepErrorFields: FirstStepData;
    isContinueEnable: false;
}

export interface FirstStepData {
    registrationCode: string;
    name: string;
    surname: string;
    password: string;
    email: string;
}

interface RegisterProps {

}


class RegisterForm extends React.Component<RegisterProps, RegisterState> {

    constructor(props: RegisterProps) {
        super(props);
    }

    public handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({

        })
    }

    render(): React.ReactElement {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className='paper'>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className='form' noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirm-password"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="surname"
                            label="Surname"
                            name="surname"
                            autoComplete="surname"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Registration Code"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            classes={{root: 'submit'}}
                        >
                            Continue
                        </Button>


                    </form>
                </div>
            </Container>
        );
    }


}

export default RegisterForm;
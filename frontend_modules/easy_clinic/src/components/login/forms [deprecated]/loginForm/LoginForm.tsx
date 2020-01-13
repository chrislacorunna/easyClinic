import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../Form.scss';

export interface LoginFormProps {

}

export interface LoginFormState {

}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    constructor(props: LoginFormProps) {
        super(props);

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
                            label="Email Address / ID"
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
                        <Button
                            fullWidth
                            variant="contained"
                            classes={{root: 'submit'}}
                        >
                            Sign In
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            classes={{root: 'submit'}}
                            color="secondary"
                        >
                            Recover Password
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            classes={{root: 'info'}}
                        >
                            Sign Up
                        </Button>
                        {/*<Grid container>*/}
                        {/*    <Grid item xs>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            Forgot password?*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*    <Grid item>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            {"Don't have an account? Sign Up"}*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                    </form>
                </div>
            </Container>
        );
    }


}

export default LoginForm;
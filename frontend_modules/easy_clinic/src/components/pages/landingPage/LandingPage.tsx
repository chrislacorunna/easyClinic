import * as React from "react";
import './LandingPage.scss';
import Button from "@material-ui/core/Button";
import {LOGIN_URL, REGISTRATION_URL} from "../../navigation/Constants";

export const LandingPage: React.FC = () => {
    return (
        <div className='landing-page'>
            <div className='flex'>
                <div className='huge-photo'>
                    <img src="/header_logo_small.png"/>
                </div>
                <div className='login-panel'>
                    <h1> Welcome in Easy Clinic </h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.</p>
                    <div className='mt30'/>
                    <Button
                        id={'sing-in-button'}
                        variant="contained"
                        classes={{root: 'submit'}}
                        href={LOGIN_URL}
                    >
                        Sign In
                    </Button>
                    <p>or</p>
                    <Button
                        variant="contained"
                        classes={{root: 'submit'}}
                        href={REGISTRATION_URL}
                    >
                        Register
                    </Button>
                </div>
            </div>
            <div className='flex'>
                <div className='small-photo'>
                    <img src="/header_logo_small.png"/>
                </div>
                <div className='small-photo'>
                    <img src="/header_logo_small.png"/>
                </div >
                <div className='small-photo'>
                    <img src="/header_logo_small.png"/>
                </div>
                <div className='small-photo'>
                    <img src="/header_logo_small.png"/>
                </div>
                <div className='small-photo'>
                    <img src="/header_logo_small.png"/>
                </div>
                <div className='small-photo'>
                    <img src="/header_logo_small.png"/>
                </div>
            </div>
            <div className='flex'>
                <div className='feature-field'>
                    <h3> Lorem Feature 1 </h3>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. </p>
                </div>
                <div className='feature-field'>
                    <h3> Lorem Feature 2 </h3>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. </p>
                </div>
                <div className='feature-field'>
                    <h3> Lorem Feature 3 </h3>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. </p>
                </div>
            </div>
            <div className='flex'>
                <div className='feature-field'>
                    <h3> Lorem Feature 4 </h3>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. </p>
                </div>
                <div className='feature-field'>
                    <h3> Lorem Feature 5 </h3>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. </p>
                </div>
                <div className='feature-field'>
                    <h3> Lorem Feature 6 </h3>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. </p>
                </div>
            </div>
        </div>);
}


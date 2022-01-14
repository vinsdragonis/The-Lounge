import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react';
import CommonInputs from '../components/Common/CommonInputs';
import ImageDropDiv from '../components/Common/ImageDropDiv';
import { HeaderMessage, FooterMessage } from '../components/Common/WelcomeMessage';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { registerUser } from '../utils/authUser';
import uploadPic from '../utils/uploadPicToCloudinary';
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
let cancel;

export default function signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        bio: "",
        facebook: "",
        github: "",
        twitter: "",
    });

    const { name, email, password, bio } = user;
    
    const [showSocialLinks, setShowSocialLinks] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [username, setUsername] = useState('');
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(false);

    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [highlighted, setHighlighted] = useState(false);
    
    const inputRef = useRef();

    useEffect(() => {
        const isUser = Object.values({ name, email, password, bio }).every(item => Boolean(item));
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
    }, [user]);

    const handleSubmit = async e => {
        e.preventDefault();
        setFormLoading(true);

        let profilePicUrl;

        if (media !== null) {
            profilePicUrl = await uploadPic(media)
        }

        if (media !== null && !profilePicUrl) {
            setFormLoading(false)
            return setErrorMsg('Error uploading profile image')
        }

        await registerUser(user, profilePicUrl, setErrorMsg, setFormLoading);
    }

    const handleChange = e => {
        const { name, value,files } = e.target;

        if (name === 'media') {
            setMedia(files[0]);
            setMediaPreview(URL.createObjectURL(files[0]));
        }

        setUser(prev => ({ ...prev, [name]: value }));
    }

    const checkUsername = async () => {
        setUsernameLoading(true);
        
        try {
            cancel && cancel();
        
            const CancelToken = axios.CancelToken;
        
            const res = await axios.get(`${baseUrl}/api/signup/${username}`, {
                cancelToken: new CancelToken(canceler => {
                    cancel = canceler;
                })
            });

            if (errorMsg !== null) setErrorMsg(null);
        
            if (res.data === "Available") {
                if (errorMsg !== null) setErrorMsg(null);
                setUsernameAvailable(true);
                setUser(prev => ({ ...prev, username }));
            }
        } catch (error) {
            setErrorMsg("Username Not Available");
            setUsernameAvailable(false);
        }
        setUsernameLoading(false);
    };

    useEffect(() => {
        username === "" ? setUsernameAvailable(false) : checkUsername();
    }, [username]);

    return (
        <>
            <HeaderMessage />

            <Form
                loading={ formLoading }
                error={ errorMsg !== null }
                onSubmit={ handleSubmit }
            >
                <Message
                    error header="Oops!"
                    content={ errorMsg }
                    onDismiss={ () => setErrorMsg(null) }
                />

                <Segment>
                    <ImageDropDiv
                        highlighted={ highlighted }
                        setHighlighted={ setHighlighted }
                        inputRef={ inputRef }
                        handleChange={ handleChange }
                        mediaPreview={ mediaPreview }
                        setMediaPreview={ setMediaPreview }
                        setMedia={ setMedia }
                    />

                    <Form.Input
                        label="Name"
                        placeholder="Name"
                        name="name"
                        value={ name }
                        onChange={ handleChange }
                        fluid
                        icon="user"
                        iconPosition="left"
                        required
                    />
                    
                    <Form.Input
                        loading={ usernameLoading }
                        error={ !usernameAvailable }
                        label="Username"
                        placeholder="Username"
                        name="username"
                        value={ username }
                        onChange={ (e) => {
                            setUsername(e.target.value)
                            
                            if (regexUserName.test(e.target.value)) {
                                setUsernameAvailable(true)
                            } else {
                                setUsernameAvailable(false)
                            }
                        }}
                        fluid
                        icon={ usernameAvailable ? "check" : "close" }
                        iconPosition="left"
                        required
                    />

                    <Form.Input
                        label="Email"
                        placeholder="Email"
                        name="email"
                        value={ email }
                        onChange={ handleChange }
                        fluid
                        icon="envelope"
                        iconPosition="left"
                        type="email"
                        required
                    />

                    <Form.Input
                        label="Password"
                        placeholder="Password"
                        name="password"
                        value={ password }
                        onChange={ handleChange }
                        fluid
                        icon={{
                            name: "eye",
                            circular: true,
                            link: true,
                            onClick: () => {
                                setShowPassword(!showPassword)
                            }
                        }}
                        iconPosition="left"
                        type={ showPassword ? 'text' : 'password' }
                        required
                    />

                    <CommonInputs
                        user={ user }
                        showSocialLinks={ showSocialLinks }
                        setShowSocialLinks={ setShowSocialLinks }
                        handleChange={ handleChange }
                    />

                    <Divider hidden />

                    <Button
                        icon="signup"
                        content="Sign up"
                        type="submit"
                        color="orange"
                        disabled={ submitDisabled || !usernameAvailable }
                    />
                </Segment>
            </Form>

            <FooterMessage />
        </>
    )
}

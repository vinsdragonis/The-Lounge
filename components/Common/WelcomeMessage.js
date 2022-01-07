import { Icon, Message, Divider } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const HeaderMessage = () => {
    const router = useRouter();
    const signUpRoute = router.pathname === '/signup';
    
    return (
        <Message
            color = 'teal'
            attached
            headers = { signUpRoute ? 'Get started!' : 'Welcome back!' }
            icon = { signUpRoute ? 'settings' : 'privacy'}
            content = { signUpRoute ? 'Create new account' : 'Login with email and password' }
        />
    );
}
    
export const FooterMessage = () => {
    const router = useRouter();
    const signUpRoute = router.pathname === '/signup';
    
    return (
        <>
            {
                signUpRoute ? (
                    <>
                        <Message attached="bottom" warning>
                            <Icon name="help" />
                            Existing user? {" "}

                            <Link href="/login">
                                Login here instead
                            </Link>
                            
                            <Divider hidden />
                        </Message>
                    </>
                ) : (
                    <>
                        <Message attached="bottom" warning>
                            <Icon name="lock" />

                            <Link href="/reset">
                                Forgot Password?
                            </Link>
                        </Message>
                        
                        <Message attached="bottom" warning>
                            <Icon name="help" />
                            New user? {" "}

                            <Link href="/signup">
                                Signup here
                            </Link>
                            {" "} instead {" "}
                            <Divider hidden />
                        </Message>
                    </>
                )
            }
        </>
    );
}
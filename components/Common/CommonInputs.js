import React from 'react';
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react';

export default function CommonInputs({
    user: { bio, facebook, github, twitter },
    handleChange,
    showSocialLinks, setShowSocialLinks
}) {
    return (
        <>
            <Form.Field
                required
                control={ TextArea }
                name="bio"
                value={ bio }
                onChange={ handleChange }
                placeholder="Bio"
            />

            <Button
                content="Add social links"
                color="red"
                icon="at"
                type="button"
                onClick={() => {
                    setShowSocialLinks(!showSocialLinks)
                }}
            />

            {
                showSocialLinks &&
                <>
                    <Divider />
                    
                    <Form.Input
                        icon="facebook f"
                        iconPosition='left'
                        name="facebook"
                        value={ facebook }
                        onChange={ handleChange }
                    />
                    
                    <Form.Input
                        icon="github"
                        iconPosition='left'
                        name="github"
                        value={ github }
                        onChange={ handleChange }
                    />
                    
                    <Form.Input
                        icon="twitter"
                        iconPosition='left'
                        name="twitter"
                        value={ twitter }
                        onChange={ handleChange }
                    />

                    <Message
                        icon="attention"
                        info
                        size='small'
                        header="Social links are optional"
                    />
                </>
            }
        </>
    )
}

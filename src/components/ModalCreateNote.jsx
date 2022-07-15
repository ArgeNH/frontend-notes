import { useState, useRef } from "react";

import { Modal, Button, Text, Input, Row, Textarea, useInput } from "@nextui-org/react";

const URL = import.meta.env.VITE_URL_API;


export const ModalCreateNote = ({ visible, setVisible, setIsChange }) => {

    const closeHandler = () => setVisible(false);
    const [message, setMessage] = useState({
        state: false,
        message: "",

    });
    const { value: title, setValue: setTitle, reset: resetTitle, bindings: changeTitle } = useInput();
    const { value: content, setValue: setContent, reset: resetContent, bindings: changeContent } = useInput();

    const handleSubmit = async () => {
        console.log(URL);
        const response = await fetch(`${URL}notes/new-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                content
            })
        });

        const { success, message } = await response.json();
        if (!success) {
            setMessage(message);
        }

        setTitle('');
        setContent('');
        confirm(message);
        setIsChange(true);
        setVisible(false);
    }

    return (
        <>
            <Modal
                closeButton
                aria-labelledby="New Note"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={30}>
                        Create/Edit {''}
                        <Text b size={30}>
                            Note
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        {...changeTitle}
                        clearable
                        bordered
                        fullWidth
                        color="secondary"
                        size="lg"
                        placeholder="Title"
                    />
                    <Textarea
                        {...changeContent}
                        bordered
                        color="secondary"
                        size="lg"
                        fullWidth
                        placeholder="Content note"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Cancel
                    </Button>
                    <Button auto onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

import { useState, useRef, useEffect } from "react";

import { Modal, Button, Text, Input, Textarea, useInput } from "@nextui-org/react";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_URL_API;

export const ModalCreateNote = ({ visible, setVisible, setIsChange, isChangeEdit, setIsChangeEdit, values }) => {

    const closeHandler = () => setVisible(false);

    const { value: title, setValue: setTitle, reset: resetTitle, bindings: changeTitle } = useInput();
    const { value: content, setValue: setContent, reset: resetContent, bindings: changeContent } = useInput();

    useEffect(() => {
        if (isChangeEdit) {
            setTitle(values.title);
            setContent(values.content);
        }
    }, [isChangeEdit])

    const handleSubmit = async () => {
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
        setIsChange(true);
        setVisible(false);
        Swal.fire(
            'Created',
            `${message}`,
            'success'
        )
    }

    const handleEdit = async () => {
        const response = await fetch(`${URL}notes/update-note/${values.idNote}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                content
            })
        });
        const data = await response.json();
        const { success, message } = data;
        if (success) {
            Swal.fire(
                'Created',
                `${message}`,
                'success'
            )
            //setIsChange(true);
            setVisible(false);
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
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
                        {isChangeEdit ? 'Edit' : 'Create'} {''}
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
                    {
                        isChangeEdit ? (
                            <Button auto onClick={handleEdit}>
                                Edit
                            </Button>
                        ) : (
                            <Button auto onClick={handleSubmit}>
                                Save
                            </Button>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

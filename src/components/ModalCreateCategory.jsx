import { Modal, Button, Text, Input, useInput } from "@nextui-org/react";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_URL_API;

export const ModalCreateCategory = ({ visible, setVisible }) => {

    const closeHandler = () => setVisible(false);

    const { value, setValue, reset, bindings } = useInput();

    const handleSubmitCategory = async () => {
        await fetch(`${URL}category/new-category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: value
            })
        })
            .then(response => response.json())
            .then(result => {
                const { success, message, error } = result;
                if (!success) {
                    console.log(error);
                    return
                }
                Swal.fire(
                    'Created',
                    `${message}`,
                    'success'
                ).then(res => {
                    const { isConfirmed } = res;
                    if (isConfirmed)
                        location.reload();
                })
            });
        setValue('');
        setVisible(false);
    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={30}>
                    Create {''}
                    <Text b size={30}>
                        Category
                    </Text>
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input
                    {...bindings}
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Category name"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={closeHandler}>
                    Close
                </Button>
                <Button auto onClick={handleSubmitCategory}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

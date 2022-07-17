import { useState, useRef, useEffect } from 'react';

import { Modal, Button, Text, Input, Textarea, useInput, Dropdown } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { SelectCategory } from './SelectCategory';
import { ButtonCategories } from './ButtonCategories';

const URL = import.meta.env.VITE_URL_API;
const URL_LOCAL = import.meta.env.VITE_URL_LOCAL;

export const ModalCreateNote = ({ visible, setVisible, setIsChange, isChangeEdit, setIsChangeEdit, values, categories }) => {

    const [errors, setErrors] = useState([]);
    const [saveCategories, setSaveCategories] = useState([]);

    const { value: title, setValue: setTitle, reset: resetTitle, bindings: changeTitle } = useInput();
    const { value: content, setValue: setContent, reset: resetContent, bindings: changeContent } = useInput();

    useEffect(() => {
        if (isChangeEdit) {
            setTitle(values.title);
            setContent(values.content);
        }
    }, [isChangeEdit])

    const closeHandler = () => {
        setVisible(false);
        setErrors([]);
    }

    const handleSubmit = async () => {
        const response = await fetch(`${URL}notes/new-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                content,
                category: saveCategories
            })
        });

        const { success, message, error } = await response.json();
        if (!success) {
            setErrors(error);
            return
        }

        setTitle('');
        setContent('');
        setIsChange(true);
        setVisible(false);
        setErrors([]);
        setSaveCategories([]);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Created',
            text: `${message}`,
            showConfirmButton: false,
            timer: 1500
        })
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
                'Edited!',
                `${message}`,
                'success'
            ).then(res => {
                const { isConfirmed } = res;
                if (isConfirmed) {
                    setIsChange(true);
                    setIsChangeEdit(true);
                }
            })
            setVisible(false);
        }
    }

    const handleAddCategory = (idCategory) => {
        if (!saveCategories?.includes(idCategory)) {
            setSaveCategories([...saveCategories, idCategory]);
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
                        color={errors[0]?.param.includes('title') ? 'error' : 'primary'}
                        size="lg"
                        placeholder="Title"
                        label={errors[0]?.param.includes('title') && `* ${errors[0]?.msg}`}
                    />
                    <Textarea
                        {...changeContent}
                        bordered
                        color={errors[1]?.param.includes('content') ? 'error' : 'primary'}
                        size="lg"
                        fullWidth
                        placeholder="Content note"
                        label={errors[1]?.param.includes('content') && `* ${errors[1]?.msg}`}
                    />
                    {
                        isChangeEdit && categories?.map(category => (
                            <ButtonCategories
                                key={category.name}
                                {...category}
                                setVisible={setVisible}
                                setIsChange={setIsChange}
                            />
                        ))
                    }
                    {
                        !isChangeEdit && (
                            <SelectCategory
                                name={'Select your category'}
                                saveCategories={saveCategories}
                                setSaveCategories={setSaveCategories}
                                handleAddCategory={handleAddCategory}
                                isFilter={false}
                            />
                        )
                    }
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
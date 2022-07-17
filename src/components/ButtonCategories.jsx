import { Button } from '@nextui-org/react';
import Swal from 'sweetalert2';

const URL = import.meta.env.VITE_URL_API;

export const ButtonCategories = ({ name, notecategory, setVisible, setIsChange }) => {

    const { noteIdNote, categoryIdCategory } = notecategory;

    const handleDeleteCategory = async (idNote, idCategory) => {
        await fetch(`${URL}notes/delete-note-category/${idNote}/${idCategory}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const { success, message } = data;
                if (success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Delete category',
                        text: `${message}`
                    });
                    setVisible(false);
                    setIsChange(true);
                }
            });
    }

    return (
        <Button.Group color="error" ghost size="xs">
            <Button disabled css={{ width: '75%' }}>{name}</Button>
            <Button css={{ width: '25%' }}
                onClick={() => handleDeleteCategory(noteIdNote, categoryIdCategory)}
            >Delete</Button>
        </Button.Group>
    )
}
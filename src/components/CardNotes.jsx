import { useEffect, useState } from 'react';

import { Card, Text, Grid, Row, Button } from '@nextui-org/react';
import { MdArchive, MdUnarchive } from 'react-icons/md';
import { IoIosTrash } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';

import { ModalCreateNote } from './ModalCreateNote';

const URL = import.meta.env.VITE_URL_API;

export const CardNotes = ({ idNote, title, content, setIsChange, isArchive = true }) => {

    const [visible, setVisible] = useState(false);
    const [isChangeEdit, setIsChangeEdit] = useState(false);
    const [values, setValues] = useState({});

    const handler = () => {
        setVisible(true);
        setIsChangeEdit(true);
        setValues({
            idNote,
            title,
            content
        });
    }

    const handleArchive = async (idNote) => {
        const response = await fetch(`${URL}notes/set-notes-archived/${idNote}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const { success, message } = data;
        if (success) {
            confirm(message);
            setIsChange(true);
        }
    };

    const handleDelete = async (idNote) => {
        const response = await fetch(`${URL}notes/delete-note/${idNote}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const { success, message } = data;
        if (success) {
            confirm(message);
            setIsChange(true);
        }
    };

    const handleUnArchive = async (idNote) => {
        const response = await fetch(`${URL}notes/set-notes-unarchived/${idNote}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const { success, message } = data;
        if (success) {
            confirm(message);
            setIsChange(true);
        }
    };

    return (
        <>
            <Grid xs={12} sm={5} justify='center'>
                <Card css={{ mw: '500px', $$cardColor: '$colors$purple100', }}>
                    <Card.Header>
                        <Text b>{title}</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: '$10' }}>
                        <Text>
                            {content}
                        </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                        <Row justify="flex-end" >
                            {
                                isArchive ? (
                                    <Button size="sm" css={{ mx: '$2' }} auto flat color="primary"
                                        onClick={() => handleUnArchive(idNote)}
                                    >
                                        <MdUnarchive size={20} />
                                    </Button>
                                ) : (
                                    <>
                                        <Button size="sm" css={{ mx: '$2' }} auto flat color="primary"
                                            onClick={() => handleArchive(idNote)}
                                        >
                                            <MdArchive size={20} />
                                        </Button>
                                        <Button size="sm" css={{ mx: '$2' }} flat color="warning" auto
                                            onClick={handler}
                                        >
                                            <FaEdit size={20} />
                                            <ModalCreateNote
                                                visible={visible}
                                                setVisible={setVisible}
                                                setIsChangeEdit={setIsChangeEdit}
                                                isChangeEdit={isChangeEdit}
                                                values={values}
                                            />
                                        </Button>
                                        <Button size="sm" css={{ mx: '$2' }} auto flat color="error"
                                            onClick={() => handleDelete(idNote)}
                                        >
                                            <IoIosTrash size={20} />
                                        </Button>
                                    </>
                                )
                            }
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
        </>
    )
}
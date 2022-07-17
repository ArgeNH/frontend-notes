import { useState } from 'react';

import { Card, Text, Grid, Row, Button, Col } from '@nextui-org/react';
import { MdArchive, MdUnarchive } from 'react-icons/md';
import { IoIosTrash } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

import { ModalCreateNote } from './ModalCreateNote';
import { formatDate } from '../helpers/formatDate';

const URL = import.meta.env.VITE_URL_API;

export const CardNotes = ({ idNote, title, content, updatedAt, categories, setIsChange, isArchive = true }) => {

    const [visible, setVisible] = useState(false);
    const [isChangeEdit, setIsChangeEdit] = useState(false);
    const [values, setValues] = useState({});

    const updateDate = formatDate(updatedAt);

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
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Archived',
                text: `${message}`,
                showConfirmButton: false,
                timer: 1500
            })
            setIsChange(true);
        }
    };

    const handleDelete = async (idNote) => {
        Swal.fire({
            title: 'Are you sure to delete this Note?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(`${URL}notes/delete-note/${idNote}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        const { success, message } = data;
                        Swal.fire(
                            'Deleted!',
                            `${message}`,
                            'success'
                        )
                        setIsChange(true);
                    })
            }
        })
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
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Unarchived',
                text: `${message}`,
                showConfirmButton: false,
                timer: 1500
            })
            setIsChange(true);
        }
    };

    return (
        <>
            <Grid xs={12} sm={5} justify='center'>
                <Card
                    css={{ mw: '500px', $$cardColor: '$colors$blue100', }}
                    variant='bordered'
                    borderWeight='black'
                    isHoverable={true}
                    
                >
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
                    <Row gap={2} wrap='nowrap'>
                        {
                            categories && (
                                categories.map(category => (
                                    <Col key={category.name} span={3}>
                                        <Text b color='primary'>
                                            {category.name}
                                        </Text>
                                    </Col>
                                ))
                            )
                        }
                    </Row>
                    <Card.Divider />
                    <Card.Footer css={{ width: '100%', justifyContent: 'space-between' }}>
                        <Text b>
                            Last edited: {updateDate}
                        </Text>
                        <Row justify="flex-end" css={{ width: 'auto' }}>
                            {
                                isArchive ? (
                                    <Button size="sm" css={{ mx: '$2' }} auto flat color="primary"
                                        onClick={() => handleUnArchive(idNote)}
                                    >
                                        <MdUnarchive size={20} />
                                    </Button>
                                ) : (
                                    <Button size="sm" css={{ mx: '$2' }} auto flat color="primary"
                                        onClick={() => handleArchive(idNote)}
                                    >
                                        <MdArchive size={20} />
                                    </Button>
                                )
                            }
                            <Button size="sm" css={{ mx: '$2' }} flat color="warning" auto
                                onClick={handler}
                            >
                                <FaEdit size={20} />
                                <ModalCreateNote
                                    visible={visible}
                                    setVisible={setVisible}
                                    setIsChange={setIsChange}
                                    setIsChangeEdit={setIsChangeEdit}
                                    isChangeEdit={isChangeEdit}
                                    values={values}
                                    categories={categories}
                                />
                            </Button>
                            <Button size="sm" css={{ mx: '$2' }} auto flat color="error"
                                onClick={() => handleDelete(idNote)}
                            >
                                <IoIosTrash size={20} />
                            </Button>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
        </>
    )
}
import { Card, Text, Grid, Row, Button } from '@nextui-org/react';

const URL = import.meta.env.VITE_URL_API;

export const CardNotes = ({ idNote, title, content }) => {

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
        }
    };
    const handleEdit = async (idNote) => {
        console.log('Edit', idNote);
    };
    const handleDelete = async (idNote) => {
        console.log('Delete', idNote);
    };

    return (
        <>
            <Grid>
                <Card css={{ mw: '500px', $$cardColor: '$colors$purple100', }} sm={12} md={5}>
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
                            <Button size="sm" css={{ mx: '$1' }} auto
                                onClick={() => handleArchive(idNote)}
                            >
                                A
                            </Button>
                            <Button size="sm" css={{ mx: '$1' }} auto
                                onClick={() => handleEdit(idNote)}
                            >
                                E
                            </Button>
                            <Button size="sm" css={{ mx: '$1' }} auto
                                onClick={() => handleDelete(idNote)}
                            >
                                D
                            </Button>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>

        </>
    )
}

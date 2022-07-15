import { useEffect, useState } from 'react'

import { Button, Container, Row, Col, Card, Text, Grid, Modal } from '@nextui-org/react';
import { ModalCreateNote } from '../components/ModalCreateNote';
import { CardNotes } from '../components/CardNotes';

const URL = import.meta.env.VITE_URL_API;

export const Home = () => {

    const [visible, setVisible] = useState(false);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const getNotes = async () => {
            await fetch(`${URL}notes/`)
                .then(response => response.json())
                .then(result => {
                    const { success, data } = result;
                    if (success) setNotes(data);
                });
        }
        getNotes();
    }, [setNotes]);

    console.log(notes);

    const handler = () => setVisible(true);

    return (
        <>
            <Container responsive display='flex' gap={3}>
                <Grid.Container gap={3}>
                    <Grid>
                        <Text h1 size={30} css={{
                            textGradient: "45deg, $yellow600 -20%, $red600 100%",
                        }}
                            weight="bold"
                        >
                            My Notes
                        </Text>
                    </Grid>

                    <Grid>
                        <Text span h1 size={30}>📝</Text>
                    </Grid>

                    <Grid justify='center' alignContent='center' alignItems='center'>
                        <Button shadow auto onClick={handler}>Create Note</Button>
                        <ModalCreateNote
                            visible={visible}
                            setVisible={setVisible}
                        />
                    </Grid>
                    <Grid>
                        <Button shadow color='gradient' auto>Archived Notes</Button>
                    </Grid>
                </Grid.Container>
            </Container>
            <Container>
                <Grid.Container gap={2}>
                    {
                        notes.map(note => (
                            <CardNotes key={note.idNote} {...note} />
                        ))
                    }
                </Grid.Container>
            </Container>
        </>
    )
}
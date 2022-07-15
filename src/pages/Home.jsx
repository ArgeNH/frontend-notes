import { useEffect, useState, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Container, Text, Grid, Loading } from '@nextui-org/react';
import { ModalCreateNote } from '../components/ModalCreateNote';
import { CardNotes } from '../components/CardNotes';

const URL = import.meta.env.VITE_URL_API;

export const Home = () => {

    const [visible, setVisible] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getNotes = async () => {
            await fetch(`${URL}notes/`)
                .then(response => response.json())
                .then(result => {
                    const { success, data } = result;
                    if (success) setNotes(data);
                    setIsChange(false);
                });
        }
        getNotes();
    }, [isChange, setNotes]);

    const handler = () => setVisible(true);

    const navigateToArchived = () => navigate('/archived');

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
                            setIsChange={setIsChange}
                        />
                    </Grid>
                    <Grid>
                        <Button shadow color='gradient' auto onClick={navigateToArchived}>Archived Notes</Button>
                    </Grid>
                </Grid.Container>
            </Container>
            <Container responsive display='flex' justify='center'>
                <Grid.Container gap={2}>
                        {
                            notes.map(note => (

                                <CardNotes key={note.idNote} {...note} setIsChange={setIsChange} isArchive={false} />

                            ))
                        }
                </Grid.Container>
            </Container>
        </>
    )
}

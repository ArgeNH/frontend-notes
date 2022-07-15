import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Container, Text, Grid } from '@nextui-org/react';
import { TiArrowLeftThick } from 'react-icons/ti';

import { CardNotes } from '../components/CardNotes';

const URL = import.meta.env.VITE_URL_API;

export const ArchivedNotes = () => {

    const [notesArchived, setNotesArchived] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getNotesArchived = async () => {
            await fetch(`${URL}notes/archived/notes`)
                .then(response => response.json())
                .then(result => {
                    const { success, data } = result;
                    if (success) setNotesArchived(data);
                    setIsChange(false);
                });
        }
        getNotesArchived();
    }, [isChange, setNotesArchived]);

    const navigateToHome = () => navigate('/');

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
                            Archived Notes
                        </Text>
                    </Grid>

                    <Grid>
                        <Text span h1 size={30}>📝</Text>
                    </Grid>
                    <Grid>
                        <Button flat color='primary' auto onClick={navigateToHome}>
                            <TiArrowLeftThick size={20} />
                            Go back to unarchived notes
                        </Button>
                    </Grid>
                </Grid.Container>
            </Container>
            <Container responsive display='flex' justify='center'>
                <Grid.Container gap={2}>
                    {
                        notesArchived.map(note => (
                            <CardNotes key={note.idNote} {...note} setIsChange={setIsChange} />
                        ))
                    }
                </Grid.Container>
            </Container>
        </>
    )
}

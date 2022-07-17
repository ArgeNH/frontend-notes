import { useEffect, useState, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Container, Text, Grid, Spacer } from '@nextui-org/react';
import { ModalCreateNote } from '../components/ModalCreateNote';
import { TiArrowRightThick } from 'react-icons/ti';

import { CardNotes } from '../components/CardNotes';
import { Nothing } from '../components/Nothing';
import { Layout } from '../components/Layout';
import { ModalCreateCategory } from '../components/ModalCreateCategory';
import { SelectCategory } from '../components/SelectCategory';

const URL = import.meta.env.VITE_URL_API;
const URL_LOCAL = import.meta.env.VITE_URL_LOCAL;

export const Home = () => {

    const [visible, setVisible] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [saveCategories, setSaveCategories] = useState([]);
    const [titleFilter, setTitleFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getNotes = async () => {
            await fetch(`${URL}notes/`)
                .then(response => response.json())
                .then(result => {
                    const { success, data } = result;
                    if (success) setNotes(data);
                    setIsChange(false);
                    setTitleFilter('')
                });
        }
        getNotes();
    }, [isChange, setNotes]);

    const handler = () => setVisible(true);

    const navigateToArchived = () => navigate('/archived');

    const handleSubmitCategory = async (key) => {
        console.log(key)
        await fetch(`${URL}notes/category/notes/${key}`)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                const { success, data } = result;
                if (data) {
                    const { notes, name } = data;
                    setTitleFilter(name);
                    if (success) {
                        setNotes(notes);
                        setIsChange(false);
                    }
                } else {
                    setIsChange(false);
                }
            });
    }

    return (
        <>
            <Layout gap={3}>
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
                    <Button flat color='primary' auto onClick={navigateToArchived}>
                        Archived Notes
                        <TiArrowRightThick size={20} />
                    </Button>
                </Grid>
            </Layout>
            <Layout gap={5} isJustify={false}>
                <SelectCategory
                    name={'Category filter'}
                    saveCategories={saveCategories}
                    setSaveCategories={setSaveCategories}
                    handleSubmitCategory={handleSubmitCategory}
                />

            </Layout>
            <Spacer x={1} />
            <Layout gap={2}>
                <Text b size={20} color='primary' transform='capitalize'>
                    {titleFilter ? `Category: ${titleFilter}` : 'All Notes'}
                </Text>
            </Layout>
            <Spacer x={1} />
            <Layout gap={2}>

                {
                    notes.map(note => (
                        <CardNotes
                            key={note.idNote}
                            {...note}
                            setIsChange={setIsChange}
                            isArchive={false}
                        />
                    ))
                }
                {
                    notes.length === 0 && (<Nothing text={'Create your notes'} />)
                }
            </Layout>
        </>
    )
}
import { useState } from 'react'

import { Button, Container, Row, Col, Card, Text, Grid, Modal } from '@nextui-org/react';
import { ModalCreateNote } from './components/ModalCreateNote';


function App() {

  const [visible, setVisible] = useState(false);

  const handler = () => setVisible(true);

  return (
    <Container responsive display='block'>
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
  )
}

export default App

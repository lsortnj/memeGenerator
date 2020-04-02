import React, { useState } from 'react'
import { Button, Grid, Header, Icon, Modal } from 'semantic-ui-react'

export default function Index() {

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <Grid verticalAlign='middle' centered style={{ padding: '20%' }}>
      <Grid.Row centered>
        <Grid.Column style={{ textAlign: 'center' }}>
          <h3>哩賀，呷霸袂</h3>
          <p>迷因產生器自己做</p>
          <Modal
            trigger={<Button color='teal' onClick={handleOpen}>用台語學JS</Button>}
            open={modalOpen}
            onClose={handleClose}
            basic
            size='small'
          >
            <Header icon='browser' content='課程即將開始' />
            <Modal.Content>
              <h3>希望大家一起來學台語～學程式</h3>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={handleClose} inverted>
                <Icon name='checkmark' /> 賀啦！
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
;
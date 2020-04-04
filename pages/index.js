import React, { useState, useEffect } from 'react';
import {
  Grid,
  Icon,
  Card,
  Image,
  Loader,
  Label,
  Modal,
  Header,
  Button,
} from 'semantic-ui-react';
import MemeEditModal from '../components/MemeEditModal';

const MEME_API_URL = 'https://api.imgflip.com/get_memes'

export default function Index() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setloadError] = useState(null);
  const [showMemeModal, setShowMemeModal] = useState(false);
  const [currentMeme, setCurrentMeme] = useState(false);

  useEffect(() => {
    fetch(MEME_API_URL)
      .then(data => {
        if (!data.ok) {
          throw Error(data.toString());
        }
        return data.json();
      }).then(json => {
        setMemes(json.data.memes);
        setLoading(false);
      }).catch(error =>  {
        setloadError(error.toString());
      });
  }, []);

  const showMemeInfo = meme => {
    setCurrentMeme(meme);
    setShowMemeModal(true);
  };

  const hideMemeModal = () => {
    setShowMemeModal(false);
  };

  return (
    <Grid verticalAlign='top' style={{ padding: 35 }} centered >

      <Grid.Row centered>
        <Grid.Column style={{ textAlign: 'center' }}>
          <h3>迷因產生器</h3>
          {loading && (<Loader active inline />)}
          {loadError && (
            <Label as='a' image>
            <img src='/images/avatar/small/joe.jpg' />
            {loadError}
          </Label>
          )}
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={4}>
        {
          memes.map(m => {
            return (
              <Grid.Column key={m.id}>
                <Card style={{marginBottom: 15}} onClick={() => showMemeInfo(m)}>
                  <Image src={m.url} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{m.name}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name='conversation' />
                    {m.box_count} 句對白
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          })
        }
      </Grid.Row>
      
      {/* 編輯迷因對白的彈出視窗 */}
      <MemeEditModal
        currentMeme={currentMeme}
        showMemeModal={showMemeModal}
        hideMemeModal={hideMemeModal}
      />
    </Grid>
  );
};


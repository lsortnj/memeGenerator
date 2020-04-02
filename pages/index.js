import React, { useState, useEffect } from 'react';
import { Grid, Icon, Card, Image, Loader, Label } from 'semantic-ui-react';

const MEME_API_URL = 'https://api.imgflip.com/get_memes'

export default function Index() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setloadError] = useState(null);

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
                <Card style={{marginBottom: 15}}>
                  <Image src={m.url} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{m.name}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='conversation' />
                      {m.box_count} 句對白
                    </a>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          })
        }
      </Grid.Row>
    </Grid>
  );
};


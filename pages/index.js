import React, { useState, useEffect } from 'react';
import { Grid, Icon, Card, Image, Loader, Label } from 'semantic-ui-react';

const MEME_API_URL = 'https://api.imgflip.com/get_memes'

export default function Index() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setloadError] = useState(null);

  // TODO: 這是測試用的假資料，串好API後刪除
  const fakeData = [
    {
        id: '61579',
        name: 'One Does Not Simply',
        url: 'https://i.imgflip.com/1bij.jpg',
        width: 568,
        height: 335,
        box_count: 2
    },
    {
        id: '101470',
        name: 'Ancient Aliens',
        url: 'https://i.imgflip.com/26am.jpg',
        width: 500,
        height: 437,
        box_count: 2
    }
  ];

  useEffect(() => {
    // TODO: 根據API文件，將這邊改寫，呼叫API拿到迷因圖資料。https://api.imgflip.com/
    setMemes(fakeData);
    setLoading(false);
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


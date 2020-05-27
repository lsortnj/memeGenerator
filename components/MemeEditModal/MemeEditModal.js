import React, { useState } from 'react';
import {
  Image,
  Input,
  Modal,
  Header,
  Button,
} from 'semantic-ui-react';

const INIT_SLOT_MAPPING = {
  0: '', 1: '', 2: '', 3: '', 4: '', 5: '',
};

export default function MemeEditModal ({
  currentMeme,
  showMemeModal,
  hideMemeModal,
}) {

  const [newMemeUrl, setNewMemeUrl] = useState(null);
  const [slotTextMapping, setSlotTextMapping] = useState(INIT_SLOT_MAPPING);

  const getCurrentMemeSlots = () => {
    const slots = [];
    if (currentMeme && currentMeme.box_count) {
      for(let i = 0; i < currentMeme.box_count; i+=1) {
        slots.push({ order: i + 1, text: '' });
      }
    }
    return slots;
  }

  const makeCaptionImage = () => {
    const CREATE_IMG_API_URL = ''; // TODO: 根據API文件，填入API的URL

    // 這裡是產生要送到API的參數
    const getPostFormData = () => {
      const postData = new FormData();
      if (currentMeme) {
        postData.append('template_id', currentMeme.id);
        postData.append('username', ''); // TODO: 填入你在Imgflip的帳號
        postData.append('password', ''); // TODO: 填入你在Imgflip的密碼
        postData.append('font', 'arial'); // 避免有些預設字型為impact的圖，中文無法顯示
        for(let i = 0; i < currentMeme.box_count; i += 1 ) {
          postData.append(`boxes[${i}][text]`, slotTextMapping[i]);
        }
      }
      return postData;
    };

    // TODO: 在這邊發POST到API
  };

  const resetAll = () => {
    setNewMemeUrl(null);
    setSlotTextMapping(INIT_SLOT_MAPPING);
  };

  const onTextChange = (e, idx) => {
    const tmp = { ...slotTextMapping };
    tmp[idx] = e.target.value;
    setSlotTextMapping({ ...tmp });
  };

  const onCloseModal = () => {
    resetAll();
    hideMemeModal();
  };

  return (
    <Modal open={showMemeModal} onClose={onCloseModal}>
      <Modal.Header>輸入你想要的對白，產生屬於你的迷因圖</Modal.Header>

      <Modal.Content image>
        <Image
          wrapped
          size='medium'
          src={newMemeUrl || currentMeme && currentMeme.url}
        />
        <Modal.Description style={{ width: '100%' }}>
          <Header>{currentMeme && currentMeme.name}</Header>
          {currentMeme && getCurrentMemeSlots().map((slot, idx) => {
            return (
              <div key={slot.order}>
                <Input
                  type="text"
                  fluid
                  placeholder={slot.order}
                  value={slotTextMapping[idx]}
                  onChange={e => onTextChange(e, idx)}
                />
                <br />
              </div>
            );
          })}
          <Button
            positive
            icon='eye'
            labelPosition='left'
            content="預覽"
            onClick={makeCaptionImage}
          />
          {newMemeUrl && (
            <a
              href={`https://www.facebook.com/sharer.php?u=${newMemeUrl}`}
              target="_blank"
            >
              分享到FB
            </a>
          )}
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button color='black' onClick={hideMemeModal}>
          取消
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

export default {
  title: 'Components/Modal',
  component: Modal,
};

const Template = (args) => {
  const [show, setShow] = useState(args.show);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Button variant="primary" onClick={openModal}>Open Modal</Button>
      <Modal {...args} show={show} onClose={closeModal} />
    </>
  );
};

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  title: 'Modal Title',
  children: 'This is the content of the modal.',
  show: false,
};

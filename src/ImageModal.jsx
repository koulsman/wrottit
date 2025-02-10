import { Modal } from '@mantine/core';

export default function ImageModal({ opened, onClose }) {
  return (
    <Modal opened={opened} onClose={onClose} title="Image Preview">
      <p>Here you can display the full-sized image or other content.</p>
    </Modal>
  );
}

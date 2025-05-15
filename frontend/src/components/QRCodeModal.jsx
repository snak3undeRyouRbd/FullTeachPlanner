import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';

const QRCodeModal = ({ show, onHide, event }) => {
  const qrRef = useRef(null);

  const handleDownload = async () => {
    if (qrRef.current) {
      const canvas = await html2canvas(qrRef.current);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `qr-code-${event.id}.png`;
      link.click();
    }
  };

  const handleCopyLink = () => {
    const url = `http://127.0.0.1:5000/events/${event.id}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Посилання скопійовано до буфера обміну!');
      })
      .catch(err => {
        console.error('Помилка копіювання:', err);
        alert('Не вдалося скопіювати посилання.');
      });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>QR-код для події: {event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <div ref={qrRef} className="p-3 bg-white">
          <QRCodeCanvas
            value={`http://127.0.0.1:5000/events/${event.id}`}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
        <p className="mt-3 text-center">
          Відскануйте QR-код, щоб перейти до події.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрити
        </Button>
        <Button variant="primary" onClick={handleDownload}>
          Завантажити QR-код
        </Button>
        <Button
          variant="info"
          onClick={handleCopyLink}
          title="Скопіювати посилання"
        >
          <svg
            className="icon icon-xs"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QRCodeModal;
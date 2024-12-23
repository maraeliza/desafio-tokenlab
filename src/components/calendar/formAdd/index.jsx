import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import routes from "../../../utils/routes.json";
const ADD_EVENT_ROUTE = routes.basePath + routes.addEventPath;

function FormAdd({ show, handleClose, addEvento }) {
  const [novoEvento, setNovoEvento] = useState({
    title: "",
    start: "",
    end: "",
    desc: "",
    color: "",
    tipo: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoEvento({ ...novoEvento, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (novoEvento.title && novoEvento.start && novoEvento.end) {
      const startDate = new Date(novoEvento.start);
      const endDate = new Date(novoEvento.end);

      if (startDate >= endDate) {
        alert("A data início deve ser anterior à data de término");
        return;
      }
      await enviarEvento(novoEvento);
      setNovoEvento({
        title: "",
        start: "",
        end: "",
        desc: "",
        color: "",
        tipo: "",
        userId: "",
      });
      handleClose(); // Fechar o modal após salvar
    }
  };

  const enviarEvento = async (novoEvento) => {
    if (!novoEvento) return "";

    try {
      const userId = localStorage.getItem("userId");
      const dados = { ...novoEvento, userId };

      const response = await fetch(ADD_EVENT_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(dados),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        addEvento(dados);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Título do Evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o Título"
              name="title"
              value={novoEvento.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Row>
            <Col xs={6}>
              <Form.Group controlId="formBasicStart">
                <Form.Label>Início</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="start"
                  value={novoEvento.start}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="formBasicEnd">
                <Form.Label>Término</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="end"
                  value={novoEvento.end}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <Form.Group controlId="formBasicColor">
                <Form.Label>Cor</Form.Label>
                <Form.Control
                  type="color"
                  name="color"
                  value={novoEvento.color}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs={10}>
              <Form.Group controlId="formBasicDesc">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a Descrição"
                  name="desc"
                  value={novoEvento.desc}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="success"
            type="submit"
            style={{ marginTop: "10px", width: "100%" }}
            disabled={!novoEvento.title || !novoEvento.start || !novoEvento.end}
          >
            Salvar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default FormAdd;

import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Calendar,
  momentLocalizer,
  dateFnsLocalizer,
} from "react-big-calendar";
import { Button } from "react-bootstrap";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./calendar.css";
import FormAdd from "./formAdd/index";
import Navbar from "../navbar";
import ModalEvento from "./modal/index";
import messages from "./content";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import routes from "../../utils/routes.json";
const GET_EVENT_ROUTE = routes.basePath + routes.getEventPath;
const DELETE_EVENT_ROUTE = routes.basePath + routes.deleteEventPath;
const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Calendario() {
  const [showModal, setShowModal] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [eventos, setEventos] = useState([]);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleEventClick = (event) => {
    setEventoSelecionado(event);
  };
  const handleEventClose = () => {
    setEventoSelecionado(null);
  };
  const handleEventDelete = async (eventId) => {
    const updatedEvents = eventos.filter((event) => event.id !== eventId);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(DELETE_EVENT_ROUTE, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ userId: userId, eventId: eventId }),
      });

      if (response.ok) {
        console.log("Evento deletado com sucesso");
      } else {
        console.log("Erro ao deletar o evento:", response.status);
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição DELETE:", error);
    }
    setEventos(updatedEvents);
    setEventoSelecionado(null);
  };

  const handleEventUpdate = (updatedEvent) => {
    const updatedEvents = eventos.map((event) => {
      if (event.id === updatedEvent.id) {
        return updatedEvent;
      }
      return event;
    });
    setEventos(updatedEvents);
    set(null);
  };
  const eventStyle = (event) => ({
    style: {
      backgroundColor: event.color,
    },
  });

  const getEventos = async () => {
    setEventos([]);
    var listaEventos = [];
    const token = localStorage.getItem("token");

    if (!token) {
      return "";
    }
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(GET_EVENT_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ userId: userId }),
      });
      if (response.status == 201) {
        const data = await response.json();
        if (data.eventos) {
          for (let i = 0; i < data.eventos.length; i++) {
            var obj = {
              id: data.eventos[i]._id,
              title: data.eventos[i]._title,
              desc: data.eventos[i]._desc,
              start: new Date(data.eventos[i]._start),
              end: new Date(data.eventos[i]._end),
              color: data.eventos[i]._color,
            };
            listaEventos.push(obj);
          }
          setEventos(listaEventos);
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
    }
  };

  const addEvento = (data) => {
    console.log("-----------ADD EVENTO------------");
    console.log("LISTA ANTES " + eventos);
    setEventos((prevEventos) => [...prevEventos, data]);
    console.log("LISTA DPS " + eventos);
  };

  useEffect(() => {
    getEventos();
  }, []);

  return (
    <div>
      <Navbar />

      <button onClick={handleShow} className="btnShowFormAdd">
        <i className="bi bi-calendar-plus" style={{ marginRight: "5px" }}></i>
        Adicionar Novo Evento
      </button>
      <div>
        <FormAdd
          show={showModal}
          handleClose={handleClose}
          addEvento={addEvento}
        />

        <div className="container-calendar">
          <DragAndDropCalendar
            defaultDate={moment().toDate()}
            defaultView="month"
            localizer={localizer}
            resizable
            eventPropGetter={eventStyle}
            onSelectEvent={handleEventClick}
            className="calendar"
            messages={messages}
            events={eventos}
          />
          {eventoSelecionado && (
            <ModalEvento
              evento={eventoSelecionado}
              onClose={handleEventClose}
              onDelete={handleEventDelete}
              onUpdate={handleEventUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

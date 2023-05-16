import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Tarea } from './model/tarea.model';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  calendarOptions:CalendarOptions;
  listaTareas: Tarea[] = [
    new Tarea({
      id: 1,
      titulo: 'Hacer la compra',
      descripcion: 'Comprar los ingredientes para cocinar la cena',
      estado: 1,
      tipologia: 1,
      fecha: '15/05/2023 12:01m ',
    }),
    new Tarea({
      id: 2,
      titulo: 'Limpiar el garaje',
      descripcion: 'Ordenar y limpiar el garaje',
      estado: 2,
      tipologia: 2,
      fecha: '15/05/2023 12:05m ',
    }),
    new Tarea({
      id: 3,
      titulo: 'Hacer ejercicio',
      descripcion: 'Ir al gimnasio y hacer una rutina de ejercicios',
      estado: 3,
      tipologia: 3,
      fecha: new Date(new Date().getTime() + 86400000),
    }),
    new Tarea({
      id: 4,
      titulo: 'Estudiar para el examen',
      descripcion: 'Repasar los apuntes y hacer ejercicios prácticos',
      estado: 3,
      tipologia: 4,
      fecha: new Date(new Date().getTime()),
    }),
    new Tarea({
      id: 5,
      titulo: 'Enviar el informe',
      descripcion: 'Enviar el informe mensual al supervisor',
      estado: 1,
      tipologia: 1,
      fecha: new Date(new Date(2023, 4, 16, 9, 30, 0).getTime()),
    }),
    new Tarea({
      id: 6,
      titulo: 'Llamar al médico',
      descripcion: 'Hacer una cita para el chequeo anual',
      estado: 2,
      tipologia: 2,
      fecha: new Date(new Date(2023, 4, 16, 11, 30, 0).getTime() + 86400000),
    }),
    new Tarea({
      id: 7,
      titulo: 'Revisar el correo electrónico',
      descripcion: 'Responder a los correos importantes',
      estado: 3,
      tipologia: 3,
      fecha: new Date(new Date(2023, 4, 16, 10, 0, 0).getTime() + 86400000),
    }),
    // Agrega las tareas restantes aquí...
  ];


  calendarVisible = true;
  events:EventInput[]=[];
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.listaTareas.forEach((tarea) => {
      this.events.push(this.mapTareaToEvent(tarea));
    });


    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialEvents:this.events,
      eventDisplay: 'block', 
      weekends: true,
      editable: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
    


  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  mapTareaToEvent(tarea: Tarea): any {
    const objeto = {
      title: tarea.titulo,
      start: tarea.fecha,
      description: tarea.descripcion, // Agrega la descripción al objeto de propiedades extendidas
      backgroundColor: this.getColorCaja(tarea.estado),
      eventTextColor: this.getColorTitulo(tarea.tipologia), // Agrega la clase CSS personalizada
    };
    return objeto;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Introduxca un nuevo titulo para el evento');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Estas seguro que quiere borrar el evento  '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }
  getColorCaja(estado: any): string {
    // Lógica para determinar el color en función del estado
    if (estado === 2) {
      return '#ABEBC6'; // Cambiar al color deseado
    } else if (estado === 1) {
      return '#F8C471'; // Cambiar al color deseado
    } else if (estado === 3) {
      return '#EC7063'; // Cambiar al color deseado
    } else {
      return 'transparent'; // Cambiar al color deseado por defecto
    }
  }

  getColorTitulo(tipologia: any): string {
    // Lógica para determinar el color en función del estado
    if (tipologia === 1) {
      return '#000000'; // Cambiar al color deseado
    } else if (tipologia === 2) {
      return '#0000FF'; // Cambiar al color deseado
    } else if (tipologia === 3) {
      return '#1E8449'; // Cambiar al color deseado
    } else if (tipologia === 4) {
      return '#7D3C98'; // Cambiar al color deseado
    } else {
      return 'transparent'; // Cambiar al color deseado por defecto
    }
  }
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}

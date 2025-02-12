/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import "@fortawesome/fontawesome-free/css/all.css";
import colors from "vuetify/lib/util/colors";

// Icons
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";

import { en } from "vuetify/locale";
// Composables
import { createVuetify } from "vuetify";

const es = {
  badge: "Placa",
  open: "Abrir",
  close: "Cerrar",
  confirmEdit: {
    ok: "OK",
    cancel: "Cancelar",
  },
  dataIterator: {
    noResultsText: "Ningún elemento coincide con la búsqueda",
    loadingText: "Cargando...",
  },
  dataTable: {
    itemsPerPageText: "Filas por página:",
    ariaLabel: {
      sortDescending: "Orden descendente.",
      sortAscending: "Orden ascendente.",
      sortNone: "Sin ordenar.",
      activateNone: "Pulse para quitar orden.",
      activateDescending: "Pulse para ordenar de forma descendente.",
      activateAscending: "Pulse para ordenar de forma ascendente.",
    },
    sortBy: "Ordenado por",
  },
  dataFooter: {
    itemsPerPageText: "Elementos por página:",
    itemsPerPageAll: "Todos",
    nextPage: "Página siguiente",
    prevPage: "Página anterior",
    firstPage: "Primera página",
    lastPage: "Última página",
    pageText: "{0}-{1} de {2}",
  },
  dateRangeInput: {
    divider: "a",
  },
  datePicker: {
    itemsSelected: "{0} seleccionados",
    range: {
      title: "Seleccionar rango",
      header: "Seleccionar rango",
    },
    title: "Seleccionar fecha",
    header: "Seleccionar fecha",
    input: {
      placeholder: "Seleccionar fecha",
    },
  },
  noDataText: "No hay datos disponibles",
  carousel: {
    prev: "Visual anterior",
    next: "Visual siguiente",
    ariaLabel: {
      delimiter: "Visual {0} de {1}",
    },
  },
  calendar: {
    moreEvents: "{0} más",
  },
  input: {
    clear: "Borrar {0}",
    prependAction: "{0} acción",
    appendAction: "{0} acción",
    otp: "Por favor ingrese el caracter OTP {0}",
  },
  fileInput: {
    counter: "{0} archivos",
    counterSize: "{0} archivos ({1} en total)",
  },
  timePicker: {
    am: "AM",
    pm: "PM",
  },
  pagination: {
    ariaLabel: {
      root: "Navegación de paginación",
      next: "Página siguiente",
      previous: "Página anterior",
      page: "Ir a la página {0}",
      currentPage: "Página actual, página {0}",
      first: "Primera página",
      last: "Última página",
    },
  },
  stepper: {
    next: "Siguiente",
    prev: "Anterior",
  },
  rating: {
    ariaLabel: {
      item: "Puntuación {0} de {1}",
    },
  },
  loading: "Cargando...",
  infiniteScroll: {
    loadMore: "Cargar más",
    empty: "No hay elementos para mostrar",
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: "es",
    fallback: "en",
    messages: { en, es },
    // adapter: createVueI18nAdapter({ i18n, useI18n })
  },
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#2e7d32",
          secondary: "#5b5b5f",
          background: "#EAEAEA",
        },
        primary: colors.green,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
        rounded: true,
      },
      dark: {
        dark: true,
        colors: {
          primary: "#2e7d32",
          secondary: "#5b5b5f",
          error: colors.red.accent3,
        },
        primary: colors.blue.lighten3,
      },
    },
  },
  defaults: {
    VTextField: {
      variant: "outlined",
      density: "compact",
      hideDetails: "auto",
      // clearable: true,
    },
    VTextarea: {
      variant: "outlined",
      density: "compact",
      hideDetails: "auto",
      // clearable: true,
    },
    VSelect: {
      variant: "outlined",
      density: "compact",
      hideDetails: "auto",
      // clearable: true,
    },
    VAutocomplete: {
      variant: "outlined",
      density: "compact",
      hideDetails: "auto",
      // clearable: true,
      autoSelectFirst: false,
    },
    VCheckbox: {
      variant: "outlined",
      density: "compact",
      hideDetails: "auto",
    },
    VIcon: { size: "small" },
    VTable: {
      hover: true,
      "fixed-header": true,
    },
    VDataTable: {
      hover: true,
      "fixed-header": true,
    },
    VDataTableServer: {
      hover: true,
      "fixed-header": true,
    },
    VChip: {
      size: "small",
      rounded: 0,
    },
    VStepper: {
      rounded: 0,
      elevation: 0,
      flat: false,
      border: false,
    },
    VSheet: {
      rounded: 0,
    },
  },
});

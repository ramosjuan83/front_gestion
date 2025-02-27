import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { moment } from "./moment";

const autotable_config = {
  tableWidth: "auto",
  useCss: true,
  margin: { top: 18, left: 6, right: 6, bottom: 10 },
  styles: { cellPadding: 0.7, fontSize: 8 },
};

/**
 * export html to pdf
 * @param {{wrapper: string, title: string, orientation: string, unit: string, format: string, metadata: object}} param0
 * @returns {void}
 */
export const htmlToPdf = ({
  wrapper = "report-wrapper",
  title = "Titulo del reporte",
  orientation = "p",
  unit = "mm",
  format = "a4",
  metadata = {},
}) => {
  const doc = new jsPDF({
    orientation,
    unit,
    format,
  });

  const $wrapper = document.getElementById(wrapper);
  const $tables = [...$wrapper.querySelectorAll("table")];

  for (let index = 0; index < $tables.length; index++) {
    const table = $tables[index];

    autoTable(doc, {
      html: table,
      ...autotable_config,
      didDrawCell: (data) => {},
      willDrawCell: (data) => {},
    });
  }

  setup_page_layout(doc, title);

  window.open(doc.output("bloburl"));
};

/**
 * export html to pdf
 * @param {{title: string, columns: Array, body: Array, orientation: string, unit: string, format: string, metadata: object}} param0
 * @returns {void}
 */
export const jsonToPdf = ({
  title = "Titulo del reporte",
  columns = [],
  body = [],
  orientation = "p",
  unit = "mm",
  format = "a4",
  metadata = {},
}) => {
  const doc = new jsPDF({
    orientation,
    unit,
    format,
  });

  autoTable(doc, {
    theme: "striped",
    body,
    columns,
    ...autotable_config,
  });

  setup_page_layout(doc, title);

  window.open(doc.output("bloburl"));
};

function setup_page_layout(doc, title) {
  const footerPosition = doc.internal.pageSize.getHeight() - 5;
  const pagetWidth = doc.internal.pageSize.getWidth() - 30;
  const pageCount = doc.internal.getNumberOfPages();

  for (let page = 1; page <= pageCount; page++) {
    doc.setPage(page);
    // HEADER
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(title, 8, 15);
    doc.setFontSize(10);
    add_logo_company(doc);

    // FOOTER
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`${footeInfo(title)}`, 40, footerPosition);
    doc.text(` pág ${page} de ${pageCount}`, pagetWidth, footerPosition);
  }
}

function add_logo_company(doc) {
  const x = doc.internal.pageSize.getWidth();
  const y = 4;
  const w = 20;
  const h = 20;
  const { logo } = JSON.parse(localStorage.getItem("company"));
  doc.addImage(logo, "png", x, y, w, h);
}

function footeInfo(title) {
  return `${title} - generado el ${moment().format("lll")}`;
}

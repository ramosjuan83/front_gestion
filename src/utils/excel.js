import { writeFile, utils } from "xlsx";
import { moment } from "./moment";

/**
 * export html to pdf
 * @param {{title: string, columns: Array, body: Array}} param0
 * @returns {void}
 */
export const jsonToExcel = ({
  title = "Titulo del reporte",
  columns = [],
  body = [],
}) => {
  const fileName = `${title}.xlsx`;

  /* generate worksheet and workbook */
  const _body = body.map((item) => {
    return columns.map((key) => {
      return item[key.dataKey];
    });
  });

  const _columns = columns.map((key) => key.dataKey);

  const worksheet = utils.json_to_sheet(_body);

  const workbook = utils.book_new();

  utils.book_append_sheet(workbook, worksheet, title);

  utils.sheet_add_aoa(worksheet, [_columns]);

  writeFile(workbook, fileName, { compression: true });
};

export const htmlToExcel = ({
  wrapper = "report-wrapper",
  title = "reporte-sin-titulo",
}) => {
  const createDate = moment().format("DD-MM-YYYY h:mm:ss a");
  const $wrapper = document.getElementById(wrapper);
  const $tables = [...$wrapper.querySelectorAll("table")]
    .map((table) => {
      return table.outerHTML;
    })
    .join("");

  const htmltbls = $tables;

  const html = `<html lang="es" class="no-js">
          <head>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Type" content="application/xls">
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
          <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
          <meta http-equiv="cache-control" content="max-age=0" />
          <meta http-equiv="cache-control" content="no-cache" />
          <meta http-equiv="expires" content="-1" />
          <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
          <meta http-equiv="pragma" content="no-cache" />            
          <title>${title}</title>
          <style>
          
          table tbody tr th{border:1px solid #000000;}
          table tbody.tfoot tr th{border:1px solid #000000;}
          td.has-text-weight-bold{font-weight: bold;}
          tr.has-background-grey-light{background: #b5b5b5;}
          tr.has-background-grey-lighter{background:#dbdbdb}
          table {
              border-collapse: collapse;
              width: 100%;
              font-size: 12pt !important;
              text-align: center;
          }
          table th,
          table td {
              border: 1px solid #CDCDCD;
              padding: 6px;
              font-size: 12pt !important;
              text-align: center;
          }
          table th{
              background: #c7c7c7;color: #4c4f53
              font-size: 12pt !important;
              text-align: center;
              word-break: break-word;
              width:100px
          }
          table th, table td{border:1px solid #000000;}
          </style>
          </head>
          <body>
          <h4  style="font-size: 16pt !important">${title}</h4>
          ${htmltbls}
          <div>${createDate}</div>
          </body>
          </html>`;

  const blob = new Blob([html], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title}-${createDate}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

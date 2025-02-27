/**
 * convert gr to pound
 * @param {number} gramos
 * @returns {number}
 */
export const toPound = (gr) => {
  if (gr && !isNaN(+gr)) return (+gr / 453.6).toFixed(4);
  else return 0;
};

/**
 * convert pound to gr
 * @param {number} - number
 * @returns {number} - number
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

export const formatDecimal = (num, decimal=0) => {
  if(decimal!=0){
    let decimalAlt ="";
    let datoDecimal = String(num).split(".");
    if(datoDecimal[1]){
      //console.log("num",num,"decimal",decimal,'datoDecimal',datoDecimal[1]);
      decimalAlt = datoDecimal[1].substring(0, decimal);
      let resul = datoDecimal[0]+'.'+datoDecimal[1].substring(0, decimal);

      num = parseFloat(resul);
    }
  }

  return num;
};

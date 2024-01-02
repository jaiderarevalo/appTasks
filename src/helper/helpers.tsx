import moment from "moment";

export const formatDate = moment(new Date()).format("YYYY-MM-DD");
export const formatHour = moment(new Date()).format("HH:mm");
export const formatearFecha = (fecha: string) => {
  return moment(fecha).format("YYYY-MM-DD");
};

export const formatearHora = (hora: string): string => {
  return moment(hora, "HH:mm:ss").format("hh:mm A");
};

import axios from "./axios";

export const movimientos = {
  get(filtros) {
    return new Promise((resolve, reject) => {
      axios
        .post(`movimiento`,
          filtros
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getResumen(filtros) {
    return new Promise((resolve, reject) => {
      axios
        .post(`movimiento/resumen`,
          filtros
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  create() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/cliente/create`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  store(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/movimiento/store`, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  edit(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/movimiento/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  update(id,data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/movimiento/${id}`, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  recycle(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/cliente/${id}/recycle`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  destroy(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/movimiento/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getProductByCode(code) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/detal/show`, {
          params: { qr: code },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  storeDetal(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/detal/store`, data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

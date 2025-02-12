import axios from "./axios";

export const categorias = {
  get(filtros) {
    return new Promise((resolve, reject) => {
      axios
        .get(`categoria`, {
          params: {
            filtros,
          },
        })
        .then((res) => {
          console.log("res",res.data);
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
        .post(`/categoria`, data)
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
        .get(`/cliente/${id}/edit`)
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
        .put(`/cliente/${id}`, data)
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
        .delete(`/categoria/${id}`)
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

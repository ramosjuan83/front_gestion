import { categorias as API_CATEGORIAS } from "@/api/categorias";
//import { setupPagination, setupFilters } from "@/utils/pagination";
import { ref } from "vue";
export function useCategorias() {
  const clients = ref([]);
  const loading = ref(true);
  const totalRecords = ref(0);
  const references = ref({});
  const filters = ref({});

  const pagination = ref({
    where: {},
    skip: 0,
    limit: 10,
    sort: "id asc",
  });

  const headers = ref([
    {
      title: "ID",
      key: "id",
      input: "text",
      type: "string",
      searchable: false,
    },
    {
      title: "Identificación",
      key: "identificacion_arrendatario",
      input: "text",
      type: "string",
      align: "center",
      searchable: true,
    },
    {
      title: "Nombre",
      key: "nombre_arrendatario",
      input: "text",
      type: "string",
      searchable: true,
    },
    {
      title: "Telefono 1",
      key: "telefono1",
      input: "text",
      type: "string",
      align: "center",
      searchable: true,
    },
    {
      title: "Telefono 2",
      key: "telefono2",
      input: "text",
      type: "string",
      align: "center",
      searchable: true,
      sortable: false,
    },
    {
      title: "Dirección",
      key: "direccion",
      input: "text",
      align: "end",
      type: "string",
      align: "left",
      searchable: true,
    },
    {
      title: "Email",
      key: "email",
      input: "text",
      align: "end",
      type: "string",
      searchable: true,
    },
    
    // {
    //   title: "Apw",
    //   key: "apw",
    //   input: "number",
    //   align: "end",
    //   type: "string",
    //   searchable: true,
    // },
    // {
    //   title: "Precio",
    //   key: "precio_kg",
    //   input: "number",
    //   align: "end",
    //   type: "string",
    //   searchable: true,
    // },
    { title: "Status", key: "status", align: "center" },
    { title: "Actions", key: "actions", align: "end" },
  ]);

  const getCategorias = async (options) => {
    try {
      loading.value = true;
      // pagination.value = setupPagination(pagination.value, options);
      // pagination.value.where = setupFilters(filters.value, headers.value);

      const r = await API_CATEGORIAS.get(pagination.value);
      clients.value = r.data;
      totalRecords.value = r.totalRecords;

      references.value = {
        ...r.options,
      };
      loading.value = false;

      return r;
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  };

  const getClienteById = async (id) => {
    try {
      const r = await API_CATEGORIAS.edit(id);
      console.log(r);
      return r;
    } catch (error) {
      console.log(error);
    }
  };

  const createClient = async (product) => {};
  const updateClient = async (client) => {};
  const deleteClient = async (id) => {
    try {
      loading.value = true;
      const r = await API_CATEGORIAS.destroy(id);

      return r;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      loading.value = false;
    }
  };
  const recycleClient = async (id) => {
    try {
      loading.value = true;
      const r = await API_CATEGORIAS.recycle(id);

      return r;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      loading.value = false;
    }
  };
  return {
    //data
    headers,
    clients,
    loading,
    totalRecords,
    pagination,
    references,
    filters,
    //methods
    getCategorias,
    createClient,
    updateClient,
    getClienteById,
    deleteClient,
    recycleClient,
  };
}

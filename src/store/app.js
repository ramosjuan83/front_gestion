// // Utilities
// import { defineStore } from "pinia";
// import { ref } from "vue";

// import router from "@/router";
// import { useStorage } from "@vueuse/core";
// import { useCookies } from "@vueuse/integrations/useCookies";

// import Swal from "sweetalert2";

// const Toast = Swal.mixin({
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 1000,
//   timerProgressBar: true,
// });

// const { set } = useCookies();

// const expirationDate = new Date();
// expirationDate.setDate(expirationDate.getDate() + 7);

// export const useAppStore = defineStore("app", () => {
//   const drawer = useStorage("drawer", true)
//   const currentUser = useStorage("currentUser", {});
//   const permissions = useStorage("permissions", []);
//   const theme = useStorage("theme", "light");
//   const rootLoading = ref(false);

//   const loginUser = (user) => {
//     return new Promise((resolve) => {
//       currentUser.value = user.data;
//       permissions.value = user.permissions;
//       set("token", user.Authorization, { expires: expirationDate });
//       Toast.fire({
//         icon: "success",
//         title: "Bienvenido",
//       });
//       router.push({ name: "Inicio" });
//       resolve(user);
//     });
//   };

//   const logoutUser = () => {
//     return new Promise((resolve) => {
//       currentUser.value = {};
//       permissions.value = [];
//       set("token", null);
//       Toast.fire({
//         icon: "success",
//         title: "Sesión cerrada",
//       });
//       router.push({ name: "Login" });
//       resolve(true);
//     });
//   };

//   /**
//    * 
//    * @param {String} modulo:permiso 
//    * @returns boolean
//    */
//   const hasPermission = (acl) => {
//     if(!acl) return true;
//     if(acl === "*") return true;  

//     const split = acl.split(",");
//     if (permissions.value.some((permission) => split.includes(permission))) {
//       return true;
//     }else{
//       return false;
//     }
//   };

//   const userLogged = () => {
//     return currentUser.value?.id ? true : false;
//   };

//   return {
//     // state
//     drawer,
//     currentUser,
//     rootLoading,
//     theme,
//     // computed
//     userLogged,
//     hasPermission,
//     // actions
//     loginUser,
//     logoutUser,
//   };
// });

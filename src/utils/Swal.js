// import Swal from "sweetalert2";
// import { errorSound, warningSound, infoSound, okSound } from "./sounds";

// export const $toast = Swal.mixin({
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
//   didOpen: async (toast) => {
//     toast.onmouseenter = Swal.stopTimer;
//     toast.onmouseleave = Swal.resumeTimer;
//     [...toast.classList].includes("swal2-icon-error") && errorSound();
//     [...toast.classList].includes("swal2-icon-warning") && warningSound();
//     [...toast.classList].includes("swal2-icon-info") && infoSound();
//     [...toast.classList].includes("swal2-icon-success") && okSound();
//   },
// });

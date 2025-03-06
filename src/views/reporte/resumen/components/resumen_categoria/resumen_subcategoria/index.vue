<template>
       <ion-content color="light">
      <ion-list :inset="true">
        <ion-item>
            <ion-label horizontal="center"><strong> {{ dataSubcategorias.length > 0?dataSubcategorias[0].nombre_categoria:'' }}</strong></ion-label>
            <ion-label horizontal="end"><ion-button @click="emit('cerrarDetalleSubCategoria');">cerrar</ion-button></ion-label>
          </ion-item>
        <ion-item>
            <ion-label horizontal="center"><strong> Categoría</strong></ion-label>
            <ion-label horizontal="center"><strong> Monto </strong> </ion-label>
          </ion-item>
        <template v-for="(fila, index) in dataSubcategorias" :key="index">
          <ion-item>
            <ion-label horizontal="center"><ion-icon :icon="add"></ion-icon><strong>{{ fila.nombre_subcategoria }}</strong></ion-label>
            <ion-label horizontal="center"><strong>{{ formatNumber(fila.monto_divisas, 2) }}</strong> </ion-label>
          </ion-item>
        </template>
      </ion-list>
    </ion-content>
   
  </template> 

<script setup>

//import { IonContent, IonItem, IonHeader, IonToolbar, IonButtons, IonTitle, IonModal, IonButton, IonInput, IonToast, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineEmits, ref , onMounted } from 'vue';
import  {formatNumber} from '../../../../../../utils/calc.js';
// import { eye } from 'ionicons/icons';
import lodash from 'lodash';

const props = defineProps(['data']);
const dataSubcategorias = ref([]);
const emit = defineEmits(['cerrarDetalleSubCategoria']);
// const dataSubcategorias=ref([]);
//const titulo=ref('');

onMounted(async ()=>{

    dataSubcategorias.value=lodash.orderBy(props.data,["monto_divisas"],["desc"]);
});



</script>


<style>
    ion-button {
    color: white;
    }
</style>
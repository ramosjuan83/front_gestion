<template>
    <ion-content color="light">
      <ion-list :inset="true">
        <ion-item>
            <ion-label horizontal="center"><strong> {{ titulo }}</strong></ion-label>
            <ion-label horizontal="end"><ion-button @click="emit('cerrarDetalleCategoria');">cerrar</ion-button></ion-label>
          </ion-item>
        <ion-item>
            <ion-label horizontal="center"><strong> Categoría</strong></ion-label>
            <ion-label horizontal="center"><strong> Monto </strong> </ion-label>
            <ion-label slot="end"><strong> Acción </strong></ion-label>
          </ion-item>
        <template v-for="(fila, index) in dataCategorias" :key="index">
          <ion-item>
            <ion-label horizontal="center"><ion-icon :icon="add"></ion-icon><strong>{{ fila.nombre_categoria }}</strong></ion-label>
            <ion-label horizontal="center"><strong>{{ formatNumber(fila.monto_divisas, 2) }}</strong> </ion-label>
            <ion-label slot="end"> <ion-fab-button color="light"  size="small" :disabled="progress"><ion-icon :icon="eye" size="small" color="success"  @click="mostrarResumenSub(fila)"></ion-icon></ion-fab-button></ion-label>
          </ion-item>
        </template>
      </ion-list>
      <!-- <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll> -->
      <!-- <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll> -->
      
  
      <resumenSubcategoria v-if="isOpenSub" :data="dataSub"  @cerrarDetalleSubCategoria="cerrarSubDetalle"/>
      
    </ion-content>
   
   
   
  </template> 

<script setup>

import { IonContent, IonItem, IonHeader, IonToolbar, IonButtons, IonTitle, IonModal, IonButton, IonInput, IonToast, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineEmits, ref , onMounted, watch } from 'vue';
  import resumenSubcategoria from './resumen_subcategoria/index.vue'
import  {formatNumber} from '../../../../../utils/calc.js';
import { eye } from 'ionicons/icons';
import lodash from 'lodash';

const props = defineProps(['data','id']);
const emit = defineEmits(['cerrarDetalleCategoria']);
const dataCategorias=ref([]);
const titulo=ref('');
const isOpenSub=ref(false);
const dataSub=ref([]);

onMounted(async ()=>{

    dataCategorias.value=lodash.orderBy(props.data.categorias, ["monto_divisas"], ["desc"]);
   // console.log("prueba",dataCategorias.value),
    titulo.value=props.data.tipo_movimiento;
});


const mostrarResumenSub = async (fila) => {
    //isOpen.value=true;
    //console.log("fila",fila.subcategorias);
    isOpenSub.value=true;
    dataSub.value=fila.subcategorias;
    // objCategorias.value.tipo_movimiento=fila.tipo_movimiento;
    // objCategorias.value.categorias=fila.categorias;
};

const cerrarSubDetalle = (()=>{
  isOpenSub.value=false;
  });



</script>


<style>
    ion-button {
    color: white;
    }
</style>
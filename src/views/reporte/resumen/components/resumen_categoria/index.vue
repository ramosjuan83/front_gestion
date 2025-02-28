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
            <ion-label slot="end"> <ion-fab-button color="light"  size="small" :disabled="progress"><ion-icon :icon="eye" size="small" color="success"  @click="mostrarResumen(fila.id)"></ion-icon></ion-fab-button></ion-label>
          </ion-item>
        </template>
      </ion-list>
      <!-- <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll> -->
      <!-- <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll> -->
      
  
      <!-- <resumenSubcategoria v-if="isOpen"/> -->
      
    </ion-content>
   
   
   
  </template> 

<script setup>

import { IonContent, IonItem, IonHeader, IonToolbar, IonButtons, IonTitle, IonModal, IonButton, IonInput, IonToast, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineEmits, ref , onMounted, watch } from 'vue';
import  {formatNumber} from '../../../../../utils/calc.js';
import { eye } from 'ionicons/icons';
import moment from 'moment';

const props = defineProps(['data','id']);
const emit = defineEmits(['cerrarDetalleCategoria']);
const dataCategorias=ref([]);
const titulo=ref('');

onMounted(async ()=>{

    console.log('data', props.data);
    dataCategorias.value=props.data.categorias;
    titulo.value=props.data.tipo_movimiento;
});



</script>


<style>
    ion-button {
    color: white;
    }
</style>
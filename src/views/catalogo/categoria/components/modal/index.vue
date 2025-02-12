<template>
    <ion-modal :is-open="true">
        <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
            <ion-button fill="outline" @click="setOpen(false)">Cancelar</ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Crear</ion-title>
            <ion-buttons slot="end">
            <ion-button fill="solid" :strong="true" @click="confirm()">Confirmar</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-item>
            <ion-input
            v-model="objForm.nombre"
            label="Ingrese el nombre"
            label-placement="stacked"
            ref="input"
            type="text"
            placeholder="Nombre"
            ></ion-input>
        </ion-item>
        </ion-content>
    </ion-modal>
</template>  

<script setup>

import { IonContent, IonItem, IonHeader, IonToolbar, IonButtons, IonTitle, IonModal, IonButton, IonInput } from '@ionic/vue';
import { defineEmits, ref } from 'vue';
import { categorias as API_CATEGORIAS} from "@/api/categorias.js";


const emit = defineEmits(['abrirModal','updateList','mensaje']);


var objForm= ref({});
objForm.value.nombre="";


const setOpen=((sw)=>{
    emit('abrirModal',sw);
});

const confirm=(async(sw)=>{
    try {
        await API_CATEGORIAS.store(objForm.value);
        emit('mensaje','Se guardo con Éxito');
        emit('updateList');
        emit('abrirModal',sw);        

    } catch (error) {
        console.log("error",error);
    }

})

</script>
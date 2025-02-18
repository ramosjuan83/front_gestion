<template>
    <ion-modal :is-open="true">
        <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
            <ion-button fill="outline" @click="setOpen(false)">Cancelar</ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">{{ titulo }}</ion-title>
            <ion-buttons slot="end">
            <ion-button fill="solid" :strong="true" @click="confirm()" :disabled="$v.$invalid">Confirmar</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-item>
            <ion-input
            v-model="objForm.nombre"
            label="Ingrese el nombre"
            label-placement="stacked"
            :error="$v.nombre.$error"
            ref="input"
            type="text"
            placeholder="Nombre"
            ></ion-input>
        </ion-item>
        <ion-item>
            <ion-input
            v-model="objForm.abreviatura"
            label="Ingrese la abreviatura"
            label-placement="stacked"
            :error="$v.abreviatura.$error"
            ref="input"
            type="text"
            placeholder="Abreviatura"
            ></ion-input>
        </ion-item>
        <ion-item>
            <ion-input
            v-model="objForm.simbolo"
            label="Ingrese la simbolo"
            label-placement="stacked"
            :error="$v.simbolo.$error"
            ref="input"
            type="text"
            placeholder="Símbolo"
            ></ion-input>
        </ion-item>

        <ion-toast trigger="open-toast" :is-open="swOpen" :message="mensaje" :duration="3000"></ion-toast>
        </ion-content>
    </ion-modal>
</template>  

<script setup>

import { IonContent, IonItem, IonHeader, IonToolbar, IonButtons, IonTitle, IonModal, IonButton, IonInput, IonToast, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineEmits, ref , onMounted } from 'vue';
import { monedas as API_MONEDAS} from "@/api/monedas.js";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const props = defineProps(['accion','id']);
const emit = defineEmits(['abrirModal','updateList','mensaje']);


var objForm= ref({});
objForm.value.nombre="";
objForm.value.abreviatura=null;
objForm.value.simbolo=null;
objForm.value.status_id=101;


var mensaje=ref();
let swOpen=ref(false);
let titulo=ref();



const setOpen=((sw)=>{
    emit('abrirModal',sw);
});

onMounted(()=>{

    if(props.accion=='editar'){
        titulo.value='Editar'
        editar(props.id);
        

    }else{
        titulo.value='Crear'
    }

});

const confirm=(async(sw)=>{
    try {
        if(props.accion=='crear'){
            await API_MONEDAS.store(objForm.value);
            emit('mensaje','Se guardo con Éxito');
        }else if(props.accion=='editar'){
            await API_MONEDAS.update(props.id,objForm.value);
            emit('mensaje','Se actualizó con Éxito');
        }
        
        emit('updateList');
        emit('abrirModal',sw);        

    } catch (error) {
        console.log("error",error);
        swOpen.value=true;
        mensaje.value=error.response.data.message;
        setTimeout(()=>{
            swOpen.value=false;
            mensaje.value='';
        },3000);
        
        
    }

})

const editar= (async(id)=>{

    try {
        let resul = await API_MONEDAS.edit(id);
        objForm.value.nombre=resul[0].nombre;
        objForm.value.abreviatura=resul[0].abreviatura;
        objForm.value.simbolo=resul[0].simbolo;

    } catch (error) {
        console.log("error",error);
    }
});



const rules = {
  nombre: { required },
  abreviatura: {required},
  simbolo: {required}
};

const $v = ref(useVuelidate(rules, objForm.value));

const validCurrentStep = async () => {
  const isvalid = await $v.value.$validate();

  if (!isvalid) {
    const errors = $v.value.$errors;
    // console.log(errors);
    return false;
  }

  return true;
};

defineExpose({ validCurrentStep });

</script>
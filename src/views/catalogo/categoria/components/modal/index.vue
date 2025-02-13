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
        <ion-list>
            <ion-item>
            <ion-select aria-label="Fruit" interface="popover" v-model="objForm.tipo_movimiento" placeholder="Select tipo" :error="$v.tipo_movimiento.$error">
                <ion-select-option value='1' >Ingreso</ion-select-option>
                <ion-select-option value='2' >Egreso</ion-select-option>
            </ion-select>
            </ion-item>
        </ion-list>
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
        <ion-toast trigger="open-toast" :is-open="swOpen" :message="mensaje" :duration="3000"></ion-toast>
        </ion-content>
    </ion-modal>
</template>  

<script setup>

import { IonContent, IonItem, IonHeader, IonToolbar, IonButtons, IonTitle, IonModal, IonButton, IonInput, IonToast, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineEmits, ref , onMounted } from 'vue';
import { categorias as API_CATEGORIAS} from "@/api/categorias.js";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const props = defineProps(['accion','id']);
const emit = defineEmits(['abrirModal','updateList','mensaje']);


var objForm= ref({});
objForm.value.nombre="";
objForm.value.tipo_movimiento=null;

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
            await API_CATEGORIAS.store(objForm.value);
            emit('mensaje','Se guardo con Éxito');
        }else if(props.accion=='editar'){
            await API_CATEGORIAS.update(props.id,objForm.value);
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
        let resul = await API_CATEGORIAS.edit(id);
        objForm.value.nombre=resul[0].nombre;
        objForm.value.tipo_movimiento=String(resul[0].tipo_movimiento);

    } catch (error) {
        console.log("error",error);
    }
});



const rules = {
  nombre: { required },
  tipo_movimiento: {required}
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
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
        <ion-list>
            <ion-item>
            <ion-select aria-label="Fruit" interface="popover" v-model="objForm.categorias" placeholder="Select categoría" :error="$v.categorias.$error">
                    <ion-select-option v-for="(fila, index) in arrCategorias" :value="fila.id">{{ fila.nombre }}</ion-select-option>

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
import { defineEmits, ref , onMounted, watch } from 'vue';
import { subcategorias as API_SUBCATEGORIAS} from "@/api/subcategorias.js";
import { categorias as API_CATEGORIAS} from "@/api/categorias.js";


import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const props = defineProps(['accion','id']);
const emit = defineEmits(['abrirModal','updateList','mensaje']);


var objForm= ref({});
objForm.value.nombre="";
objForm.value.tipo_movimiento=null;
objForm.value.categorias=null;
objForm.value.status_id=101;



var mensaje=ref();
let swOpen=ref(false);
let titulo=ref();


let arrCategorias = ref([]);



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
            await API_SUBCATEGORIAS.store(objForm.value);
            emit('mensaje','Se guardo con Éxito');
        }else if(props.accion=='editar'){

            delete objForm.value.tipo_movimiento;

            await API_SUBCATEGORIAS.update(props.id,objForm.value);
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
        let resul = await API_SUBCATEGORIAS.edit(id);
        
        //let arrCat= await API_CATEGORIAS.edit(resul[0].categoria_id);
        objForm.value.tipo_movimiento=String(resul[0].categorias.tipo_movimiento);
        objForm.value.categorias=resul[0].categorias.id;
        objForm.value.nombre=resul[0].nombre;


    } catch (error) {
        console.log("error",error);
    }
});


watch(
    () => objForm.value.tipo_movimiento,
    async (nval) => {

        let resulC = await API_CATEGORIAS.tipo_movimiento(nval);

            arrCategorias.value=resulC.data.map((e)=>{
                return {
                    id:e.id,
                    nombre:e.nombre
                }
            });

        
    }
  );


const rules = {
  nombre: { required },
  categorias: {required},
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
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
            <ion-select aria-label="Fruit" interface="popover" v-model="objForm.monedas" placeholder="Select moneda" :error="$v.monedas.$error">
                    <ion-select-option v-for="(fila, index) in arrMonedas" :value="fila.id">{{ fila.nombre }}</ion-select-option>
            </ion-select>
            </ion-item>
        </ion-list>
        <ion-list>
            <ion-item>
            <ion-select aria-label="Fruit" interface="popover" v-model="objForm.tipocambios" placeholder="Select cambio" :error="$v.tipocambios.$error">
                    <ion-select-option v-for="(fila, index) in arrTipoCambios" :value="fila.id">{{ fila.nombre }}</ion-select-option>
            </ion-select>
            </ion-item>
        </ion-list>
        <ion-item>
            <ion-input
            v-model="objForm.fecha"
            label="Ingrese la fecha"
            label-placement="stacked"
            :error="$v.fecha.$error"
            ref="input"
            type="date"
            placeholder="Fecha"
            ></ion-input>
        </ion-item>    

        <ion-item>
            <ion-input
            v-model="objForm.monto_tasa"
            label="Ingrese la tasa"
            label-placement="stacked"
            :error="$v.monto_tasa.$error"
            ref="input"
            type="number"
            placeholder="Monto Tasa"
            ></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Por Defecto</ion-label>
            <ion-checkbox v-model="objForm.defecto"></ion-checkbox>
        </ion-item>   
        <ion-toast trigger="open-toast" :is-open="swOpen" :message="mensaje" :duration="3000"></ion-toast>
        </ion-content>
    </ion-modal>
</template>  

<script setup>

import { IonContent, IonItem, IonHeader, IonToolbar, IonButtons, IonTitle, IonModal, IonButton, IonInput, IonToast, IonSelect, IonSelectOption, IonCheckbox } from '@ionic/vue';
import { defineEmits, ref , onMounted, watch } from 'vue';
import { monedas as API_MONEDAS} from "@/api/monedas.js";
import { tipocambios as API_TIPOCAMBIOS} from "@/api/tipocambios.js";
import { tasas as API_TASAS} from "@/api/tasas.js";
import moment from 'moment';


import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const props = defineProps(['accion','id']);
const emit = defineEmits(['abrirModal','updateList','mensaje']);


var objForm= ref({});
objForm.value.monedas=null;
objForm.value.tipocambios=null;
objForm.value.fecha='';
objForm.value.monto_tasa=0;
objForm.value.defecto=false;
objForm.value.status_id=101;



var mensaje=ref();
let swOpen=ref(false);
let titulo=ref();


let arrMonedas = ref([]);
let arrTipoCambios = ref([]);



const setOpen=((sw)=>{
    emit('abrirModal',sw);
});

onMounted(()=>{


    cargarMonedas();

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
            objForm.value.fecha=moment(objForm.value.fecha).format('YYYY-MM-DD');
            await API_TASAS.store(objForm.value);
            emit('mensaje','Se guardo con Éxito');
        }else if(props.accion=='editar'){

            objForm.value.fecha=moment(objForm.value.fecha).format('YYYY-MM-DD');
            await API_TASAS.update(props.id,objForm.value);
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
        let resul = await API_TASAS.edit(id);
        
        //console.log("resul",resul);
        //let arrCat= await API_CATEGORIAS.edit(resul[0].categoria_id);
        objForm.value.monedas=String(resul[0].monedas.id);
        objForm.value.tipocambios=String(resul[0].tipocambios.id);
        objForm.value.nombre=resul[0].nombre;
        objForm.value.fecha=moment(resul[0].fecha).format('YYYY-MM-DD');
        objForm.value.monto_tasa=resul[0].monto_tasa;
        objForm.value.defecto=resul[0].defecto;


    } catch (error) {
        console.log("error",error);
    }
});


const cargarMonedas= async()=>{
    try {
        let res = await API_MONEDAS.get();
        arrMonedas.value=res;
    } catch (error) {
        console.log("error",error);
    }
}

watch(
    () => objForm.value.monedas,
    async (nval) => {

        let resulC = await API_TIPOCAMBIOS.tipo_cambio(nval);

        console.log("resulC",resulC);

        arrTipoCambios.value=resulC.data.map((e)=>{
            return {
                id:e.id,
                nombre:e.nombre
            }
        });
        
    }
  );


const rules = {
  monedas: {required},
  tipocambios: {required},
  fecha: {required},
  monto_tasa: {required}
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
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
            <ion-select aria-label="Fruit" interface="popover" v-model="tipo_movimiento" placeholder="Select tipo" :error="$v.tipo_movimiento.$error">
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
        <ion-list>
            <ion-item>
            <ion-select aria-label="Fruit" interface="popover" v-model="objForm.subcategorias" placeholder="Select subcategoría" :error="$v.subcategorias.$error">
                    <ion-select-option v-for="(fila, index) in arrSubcategorias" :value="fila.id">{{ fila.nombre }}</ion-select-option>

            </ion-select>
            </ion-item>
        </ion-list>
        <ion-item>
            <ion-input
            v-model="moneda"
            label="Moneda"
            label-placement="stacked"
            :error="$v.moneda.$error"
            ref="input"
            type="text"
            disabled="true"
            placeholder="Moneda"
            ></ion-input>
        </ion-item>
        <ion-item>
            <ion-input
            v-model="tipo_cambio"
            label="Tipo Cambio"
            label-placement="stacked"
            :error="$v.tipo_cambio.$error"
            ref="input"
            type="text"
            disabled="true"
            placeholder="Tipo cambio"
            ></ion-input>
        </ion-item>
        <ion-item>
            <ion-input
            v-model="monto_tasa"
            label="Tasa"
            label-placement="stacked"
            :error="$v.monto_tasa.$error"
            ref="input"
            type="text"
            disabled="true"
            placeholder="Tasa"
            ></ion-input>
        </ion-item>

        <ion-item>
            <ion-input
            v-model="objForm.monto_bolivares"
            label="Monto Bolivares"
            label-placement="stacked"
            v-on:keyup="calcular('bolivares')"
            :error="$v.monto_bolivares.$error"
            ref="input"
            type="number"
            placeholder="Monto Bolivares"
            ></ion-input>
        </ion-item>

        <ion-item>
            <ion-input
            v-model="objForm.monto_divisas"
            label="Monto Divisas"
            label-placement="stacked"
            v-on:keyup="calcular('divisas')"
            :error="$v.monto_divisas.$error"
            ref="input"
            type="number"
            placeholder="Monto Divisas"
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
import { movimientos as API_MOVIMIENTOS } from "@/api/movimientos.js";
import { tasas as API_TASAS } from "@/api/tasas.js";
import moment from 'moment';


import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const props = defineProps(['accion','id']);
const emit = defineEmits(['abrirModal','updateList','mensaje']);


var objForm= ref({});
objForm.value.categorias=null;
objForm.value.subcategorias=null;
objForm.value.monto_bolivares=null;
objForm.value.monto_divisas=null;
objForm.value.fecha_movimiento=moment().format("YYYY-MM-DD");
objForm.value.hora=moment().format("HH:MM:ss");
objForm.value.tasas=null;
objForm.value.status_id=101;


var tipo_movimiento=ref(null);
var monto_tasa=ref(null);
var moneda=ref(null);
var tipo_cambio=ref(null);



var mensaje=ref();
let swOpen=ref(false);
let titulo=ref();


let arrCategorias = ref([]);
let arrSubcategorias = ref([]);



const setOpen=((sw)=>{
    emit('abrirModal',sw);
});

const calcular=((tipo)=>{

    if(tipo=='bolivares'){
        objForm.value.monto_divisas=objForm.value.monto_bolivares/monto_tasa.value;
        objForm.value.monto_bolivares=parseFloat(objForm.value.monto_bolivares);
    }else{
        objForm.value.monto_bolivares=objForm.value.monto_divisas*monto_tasa.value;
        objForm.value.monto_divisas=parseFloat(objForm.value.monto_divisas);
    }

});

onMounted(async ()=>{

    if(props.accion=='editar'){
        titulo.value='Editar'
        editar(props.id);
        

    }else{
        let tasasD = await API_TASAS.defecto(); 
        console.log("tasaD",tasasD[0]);
        monto_tasa.value=tasasD[0].monto_tasa;
        moneda.value=tasasD[0].monedas.nombre;
        tipo_cambio.value=tasasD[0].tipocambios.nombre;
        objForm.value.tasas=tasasD[0].id;

        titulo.value='Crear'
    }

});

const confirm=(async(sw)=>{
    try {
        if(props.accion=='crear'){
            await API_MOVIMIENTOS.store(objForm.value);
            emit('mensaje','Se guardo con Éxito');
        }else if(props.accion=='editar'){


            await API_MOVIMIENTOS.update(props.id,objForm.value);
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
        let resul = await API_MOVIMIENTOS.edit(id);
        
        tipo_movimiento.value=String(resul[0].categorias.tipo_movimiento);
        objForm.value.categorias=resul[0].categorias.id;
        objForm.value.subcategorias=resul[0].subcategorias?.id;
        objForm.value.nombre=resul[0].nombre;
        objForm.value.monto_bolivares=resul[0].monto_bolivares.toFixed(2);
        objForm.value.monto_divisas=resul[0].monto_divisas.toFixed(2);
        monto_tasa.value=resul[0].tasas.monto_tasa;
        moneda.value=resul[0].tasas.monedas.nombre;
        tipo_cambio.value=resul[0].tasas.tipocambios.nombre;
        objForm.value.tasas=resul[0].tasas.id;



    } catch (error) {
        console.log("error",error);
    }
});


watch(
    () => tipo_movimiento.value,
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

  watch(() => objForm.value.categorias,
    async (tipo_categoria) => {

        let resulS = await API_SUBCATEGORIAS.tipo_categoria(tipo_categoria);

            arrSubcategorias.value=resulS.data.map((e)=>{
                return {
                    id:e.id,
                    nombre:e.nombre
                }
            });

        
    }

  );


const rules = {
  categorias: { required },
  subcategorias: {  },
  tipo_movimiento: {},
  monto_tasa: {},
  tasas: { required },
  monto_bolivares: { required },
  monto_divisas: { required},
  tipo_cambio: { },
  moneda: { }
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
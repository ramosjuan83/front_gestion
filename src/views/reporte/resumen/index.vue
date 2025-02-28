<template>
  <ion-fab horizontal="end" vertical="bottom">
      <ion-fab-button :disabled="progress">
        <ion-icon :icon="add"  @click="setOpen(true)"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  <ion-content color="light">


    <ion-list :inset="true">
        <ion-item>
            <ion-input
            v-model="fecha_desde"
            label="Fecha desde"
            label-placement="stacked"
            ref="input"
            type="date"
            placeholder="Fecha"
            @change="listar()"
            ></ion-input>
            <ion-input
            v-model="fecha_hasta"
            label="Fecha Hasta"
            label-placement="stacked"
            ref="input"
            type="date"
            placeholder="Fecha"
            @change="listar()"
            ></ion-input>
        </ion-item> 
     
      <template v-for="(fila, index) in data" :key="index">
        <ion-item>
          <ion-label horizontal="center"><strong>{{ fila.tipo_movimiento }}</strong></ion-label>
          <ion-label horizontal="center"><strong>{{ formatNumber(fila.monto_divisas, 2) }}</strong> </ion-label>
          <ion-label slot="end"> <ion-fab-button color="light"  size="small" :disabled="progress"><ion-icon :icon="eye" size="small" color="success"  @click="mostrarResumen(fila.id, fila)"></ion-icon></ion-fab-button></ion-label>
        </ion-item>
      </template>
    </ion-list>
    <!-- <ion-infinite-scroll @ionInfinite="ionInfinite">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll> -->
    <!-- <ion-infinite-scroll @ionInfinite="ionInfinite">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll> -->
    

    <resumenCategoria v-if="isOpen" :data="objCategorias" @cerrarDetalleCategoria="cerrarDetalle"/>
    <ion-toast trigger="open-toast" :is-open="swOpen" :message="mensaje" :duration="3000"></ion-toast>

    <ion-alert trigger="present-alert" class="custom-alert" header="Are you sure?" :buttons="alertButtons"></ion-alert>
    
  </ion-content>
 
 
 
</template>

<script setup>
  import { IonContent, IonItem, IonLabel, IonList, IonIcon, IonFabButton, IonFab, IonToast, IonAlert, alertController, IonInput } from '@ionic/vue';
  import { add, trash, create, eye } from 'ionicons/icons';
  import { movimientos as API_MOVIMIENTOS} from "@/api/movimientos.js";
  import { onMounted, ref} from 'vue';
  import resumenCategoria from './components/resumen_categoria/index.vue'
  import moment from 'moment';
  import  {formatNumber} from '../../../utils/calc.js'

  
  let param={};
  let data=ref([]);
  let totales=ref({});
  let objCategorias=ref({});

  let swOpen=ref(false);
  let mostrarAlert=ref(false);
  let mensaje=ref('');
  let error1=ref('');
  let progress=ref(false);

  let fecha_inicio = moment().format("YYYY-MM-DD");

  let fecha_desde=ref(fecha_inicio.substring(0,7)+"-01");
  let fecha_hasta=ref(moment().format("YYYY-MM-DD"))

  let listar = (async()=>{

    try {


      const res = await API_MOVIMIENTOS.getResumen({fecha_desde:fecha_desde.value,fecha_hasta:fecha_hasta.value});
      console.log("res",res.resumen);
      data.value=res.resumen;
      // totales.value=res.totales;
      // totales.value.ingreso=formatNumber(totales.value.ingreso.toFixed(2),2);
      // totales.value.egreso=formatNumber(totales.value.egreso.toFixed(2),2);
      // totales.value.saldo=formatNumber(totales.value.saldo.toFixed(2),2);


      // data.value=res.movimiento.map((e)=>{
      //   return {
      //     ...e,
      //     monto_bolivares: formatNumber(e.monto_bolivares.toFixed(2),2),
      //     monto_divisas: formatNumber(e.monto_divisas.toFixed(2),2),
      //     fecha_movimiento:moment(e.fecha_movimiento).format('DD/MM/YYYY')
      //   }
      // });
    } catch (error) {
      console.log("ERROR",error);
      error1.value=error;
    }
  });

  onMounted(()=>{
    listar();
  });

  const isOpen = ref(false);
  const idDelete = ref();
  var accion = ref('crear');
  var id=ref();

  const setOpen = ((open) => {
    accion.value='crear';
    isOpen.value = open
  }
  );

  const cerrarDetalle = (()=>{
    isOpen.value=false;
  });

  const confirm = (()=>{
    isOpen.value = false;
  });
  
  const abrirModal = ((sw)=>{
    isOpen.value=sw;
  });

  const Delete = ((id)=>{

    mostrarAlert.value=true;
  });
  
  const updateList = (()=>{
    listar();
    progress.value=true;
    swOpen.value = true;
    setTimeout(()=>{
      progress.value=false;
      swOpen.value=false;
      mensaje.value='';
    },3000);
  })


  const alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
      handler: async() => {
        //console.log('Alert No',idDelete.value);
       
      },
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler: async () => {
        try {
          await API_MOVIMIENTOS.destroy(idDelete.value);
          mensaje.value="Se eliminó con Éxito";
          updateList();
        } catch (error) {

          console.log("error",error);
          
        }
      },
    },
  ];

const mostrarResumen = async (id, fila) => {
    isOpen.value=true;
    console.log("fila",fila);
    objCategorias.value.tipo_movimiento=fila.tipo_movimiento;
    objCategorias.value.categorias=fila.categorias;
};

const mostrarMensaje=((msg)=>{
  mensaje.value=msg;
})

const edit=((idEdit)=>{

    accion.value='editar';
    id.value=idEdit;
    isOpen.value=true;
});



</script>

<style>
i.icon::before {
    font-size: 5px;
}


ion-fab-button {
  color: aqua;
}

.alignme {
    text-align: right;
}

ion-col {
    background-color: #FFFFFF;
    border: solid 0.1px #c1c1c1;
    color: #000;
    text-align: center;
    border-left: 0px;
    border-right: 0px;

  }
</style>
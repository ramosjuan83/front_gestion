<template>
  <ion-fab horizontal="end" vertical="bottom">
      <ion-fab-button :disabled="progress">
        <ion-icon :icon="add"  @click="setOpen(true)"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  <ion-content color="light">


    <ion-list :inset="true">
      <ion-item>
        <!-- <ion-label horizontal="center"><strong>Nro</strong></ion-label>
        <ion-label horizontal="center"><strong>Moneda</strong></ion-label>
        <ion-label horizontal="center"><strong>Tipo Cambio</strong></ion-label> -->
        
      </ion-item>
      <template v-for="(fila, index) in data" :key="index">
        <ion-item>
          <ion-label horizontal="center"><strong>Nro: </strong>{{ fila.id }}</ion-label>
          <ion-label horizontal="center"><strong>Moneda: </strong> {{ fila.monedas.nombre }}</ion-label>
          <ion-label horizontal="center"><strong>Tipo Cambio: </strong> {{ fila.tipocambios.nombre }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label horizontal="center"><strong>Fecha: {{ fila.fecha }}</strong></ion-label>
          <ion-label horizontal="center"><strong>Tasa: {{ fila.monto_tasa }} </strong> </ion-label>
          <ion-label horizontal="center"><strong>Por Defecto: {{ fila.defecto==true?'Si':'No' }}</strong></ion-label>
        </ion-item>
        <ion-item>
          <ion-label slot="end"> <ion-fab-button color="light"  size="small" :disabled="progress"><ion-icon :icon="trash" size="small" color="danger"  @click="presentAlert(fila.id)"></ion-icon></ion-fab-button></ion-label>
          <ion-label slot="end"> <ion-fab-button color="light" size="small" :disabled="progress"><ion-icon :icon="create" size="small" color="primary" @click="edit(fila.id)"></ion-icon></ion-fab-button></ion-label>
        </ion-item>
      </template>
    </ion-list>
    <!-- <ion-infinite-scroll @ionInfinite="ionInfinite">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll> -->
    <!-- <ion-infinite-scroll @ionInfinite="ionInfinite">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll> -->
    

    <componentModal v-if="isOpen" @mensaje="mostrarMensaje" @abrirModal="abrirModal" @updateList="updateList" :accion="accion" :id="id"/>
    <ion-toast trigger="open-toast" :is-open="swOpen" :message="mensaje" :duration="3000"></ion-toast>

    <ion-alert trigger="present-alert" class="custom-alert" header="Are you sure?" :buttons="alertButtons"></ion-alert>
    
  </ion-content>
 
 
 
</template>

<script setup>
  import { IonContent, IonItem, IonLabel, IonList, IonIcon, IonFabButton, IonFab, IonToast, IonAlert, alertController } from '@ionic/vue';
  import { add, trash, create } from 'ionicons/icons';
  import { tasas as API_TASAS} from "@/api/tasas.js";
  import { onMounted, ref } from 'vue';
  import componentModal from './components/modal/index.vue'
  import moment from 'moment';
  import lodash from 'lodash';



  
  let param={};
  let data=ref([]);
  let swOpen=ref(false);
  let mostrarAlert=ref(false);
  let mensaje=ref('');
  let error1=ref('');
  let progress=ref(false);

  let listar = (async()=>{
    
    var self=this;
    try {
      const res = await API_TASAS.get(param);
      //data.value=res;
      data.value=res.map((e)=>{
        e.fecha=moment(e.fecha).format('DD/MM/YYYY');
        e.id=Number(e.id)
        return e;
      });

      data.value = lodash.orderBy(data.value, ["defecto"], ["desc"]);

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
          await API_TASAS.destroy(idDelete.value);
          mensaje.value="Se eliminó con Éxito";
          updateList();
        } catch (error) {

          console.log("error",error);
          
        }
      },
    },
  ];

const presentAlert = async (id) => {
  const alert = await alertController.create({
    header: '',
    subHeader: '',
    message: 'Esta seguro de eliminar la sub categoria.',
    buttons: alertButtons,
  });

  let res = await alert.present();
  idDelete.value=id;
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

ion-button {
  color: red;
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
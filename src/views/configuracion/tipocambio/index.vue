<template>
  <ion-fab horizontal="end" vertical="bottom">
      <ion-fab-button :disabled="progress">
        <ion-icon :icon="add"  @click="setOpen(true)"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  <ion-content color="light">


    <ion-list :inset="true">
      <ion-item>
        <ion-label horizontal="center"><strong>Nro</strong></ion-label>
        <ion-label horizontal="center"><strong>Moneda</strong></ion-label>
        <ion-label horizontal="center"><strong>Tipo Cambio</strong></ion-label>
        <ion-label horizontal="center"><strong>Acción</strong></ion-label>
      </ion-item>
      <ion-item v-for="(fila, index) in data" :key="index">
        <ion-label>{{ fila.id }}</ion-label>
        <ion-label><div style="text-align: justify;">{{ fila.monedas.nombre }}</div></ion-label>
        <ion-label><div style="text-align: justify;">{{ fila.nombre }}</div></ion-label>
        <ion-label slot="end"> <ion-fab-button color="light"  size="small" :disabled="progress"><ion-icon :icon="trash" size="small" color="danger"  @click="presentAlert(fila.id)"></ion-icon></ion-fab-button></ion-label>
        <ion-label slot="end"> <ion-fab-button color="light" size="small" :disabled="progress"><ion-icon :icon="create" size="small" color="primary" @click="edit(fila.id)"></ion-icon></ion-fab-button></ion-label>

      </ion-item>
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
  import { tipocambios as API_TIPOCAMBIOS} from "@/api/tipocambios.js";
  import { onMounted, ref } from 'vue';
  import componentModal from './components/modal/index.vue'


  
  let param={};
  let data=ref([]);
  let swOpen=ref(false);
  let mostrarAlert=ref(false);
  let mensaje=ref('');
  let error1=ref('');
  let progress=ref(false);

  let listar = (async()=>{

    try {
      const res = await API_TIPOCAMBIOS.get(param);
      data.value=res;
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
          await API_TIPOCAMBIOS.destroy(idDelete.value);
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
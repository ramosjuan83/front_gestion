<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header> -->

      <!-- <div id="container"> -->
        <!-- se llama los componentes -->

        <inicio v-if="$route.params.id=='Dashboard'" />
        <catalogoCategoria v-if="$route.params.id=='Categoria'" />
        <catalogoSubcategoria v-if="$route.params.id=='Subcategoria'" />
        <configuracionMoneda v-if="$route.params.id=='Moneda'" />
        <configuracionTipocambio v-if="$route.params.id=='Tipocambio'" />
        <configuracionTasa v-if="$route.params.id=='Tasa'" />
        <reporteResumen v-if="$route.params.id=='Resumen'" />
        <movimiento v-if="$route.params.id=='Movimiento'" />

        


      <!-- </div> -->
    <!-- </ion-content> -->
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import catalogoCategoria from './catalogo/categoria/index.vue'
import catalogoSubcategoria from './catalogo/subcategoria/index.vue'
import configuracionMoneda from './configuracion/moneda/index.vue'
import configuracionTipocambio from './configuracion/tipocambio/index.vue'
import configuracionTasa from './configuracion/tasa/index.vue'
import reporteResumen from './reporte/resumen/index.vue'
import movimiento from './movimiento/index.vue'

import inicio from './inicio/index.vue';


</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>

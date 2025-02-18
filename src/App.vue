<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>MasMenos</ion-list-header>
            <ion-note>hi@ionicframework.com</ion-note>

            <ion-menu-toggle id="idToggle" :auto-hide="true" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>

            <ion-accordion-group>
              <ion-accordion value="first">
                <ion-item slot="header">     
                  <ion-icon slot="start" :ios="heartOutline" :md="book" ></ion-icon>
                  <ion-label>Catálogos</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content" >
                <ion-icon slot="start" :ios="heartOutline" :md="list"></ion-icon><router-link class="quita_color"  to="/folder/Categoria" @click="click()">Categorías</router-link></div>
                <div class="ion-padding" slot="content">
                <ion-icon slot="start" :ios="heartOutline" :md="list" ></ion-icon><router-link class="quita_color" to="/folder/Subcategoria" @click="click()">Sub Categorías</router-link></div>

                

              </ion-accordion>
              <ion-accordion value="second">
                <ion-item slot="header">
                  <ion-icon slot="start" :ios="heartOutline" :md="list" ></ion-icon>
                  <ion-label>Reportes</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">Resumen</div>
              </ion-accordion>
              <ion-accordion value="third">
                <ion-item slot="header">
                  <ion-icon slot="start" :ios="heartOutline" :md="list" ></ion-icon>
                  <ion-label>Configuración</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                <ion-icon slot="start" :ios="heartOutline" :md="list" ></ion-icon><router-link class="quita_color" to="/folder/Moneda" @click="click()">Monedas</router-link></div>
                <div class="ion-padding" slot="content">
                  <ion-icon slot="start" :ios="heartOutline" :md="list" ></ion-icon><router-link class="quita_color" to="/folder/Tipocambio" @click="click()">Tipo Cambios</router-link></div>
                <div class="ion-padding" slot="content">Tasa</div>
              </ion-accordion>
          
            </ion-accordion-group>

            
          </ion-list>

          <!-- <ion-list id="labels-list">
            <ion-list-header>Labels</ion-list-header>

            <ion-item v-for="(label, index) in labels" lines="none" :key="index">
              <ion-icon aria-hidden="true" slot="start" :ios="bookmarkOutline" :md="bookmarkSharp"></ion-icon>
              <ion-label>{{ label }}</ion-label>
            </ion-item>
          </ion-list> -->
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">


import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  IonAccordion
} from '@ionic/vue';
import { ref } from 'vue';
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  logoIonic,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  book,
  list
} from 'ionicons/icons';

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Movimiento',
    url: '/folder/Movimiento',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  // {
  //   title: 'Categoría',
  //   url: '/folder/Categoria',
  //   iosIcon: paperPlaneOutline,
  //   mdIcon: paperPlaneSharp,
  // },
  // {
  //   title: 'Sub categoría',
  //   url: '/folder/Subcategoria',
  //   iosIcon: heartOutline,
  //   mdIcon: heartSharp,
  // },
  // {
  //   title: 'Reportes',
  //   url: '/folder/Reportes',
  //   iosIcon: trashOutline,
  //   mdIcon: trashSharp,
  // },
  // {
  //   title: 'Configuracíon',
  //   url: '/folder/Configuracion',
  //   iosIcon: archiveOutline,
  //   mdIcon: archiveSharp,
  // },
];
const labels = [];

const click=(()=>{
  console.log("PASA");
  document.getElementById('idToggle').click()
});

const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}
</script>



<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-background-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}




ion-accordion {
    margin: 0 auto;
  }

  ion-accordion.accordion-expanding,
  ion-accordion.accordion-expanded {
    width: calc(100% - 32px);

    margin: 16px auto;
  }

  ion-accordion.accordion-collapsing ion-item[slot='header'],
  ion-accordion.accordion-collapsed ion-item[slot='header'] {
    --background: var(--ion-color-light);
    --color: var(--ion-color-light-contrast);
  }

  ion-accordion.accordion-expanding ion-item[slot='header'],
  ion-accordion.accordion-expanded ion-item[slot='header'] {
    --background: var(--ion-color-primary);
    --color: var(--ion-color-primary-contrast);
  }


  .quita_color{
    text-decoration: none; color: inherit;
  }

  .custom-icon {
  color:blue;
  }
  .custom-icon2 {
    color:red;
  }
</style>

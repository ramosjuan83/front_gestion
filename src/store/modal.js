import { markRaw } from "vue";
import { defineStore } from "pinia";

export const useModal = defineStore("modal", {
    state: () => ({
        isOpen: false,
        view: {},
        actions: {},
        props: {},
        model: {},
    }),
    actions: {
        open(view, { actions, props, model } = {}) {
            this.actions = actions;
            this.props = props;
            this.model = model;
            this.isOpen = true;
            // using markRaw to avoid over performance as reactive is not required
            this.view = markRaw(view);
        },
        close() {
            this.isOpen = false;
            this.view = {};
            this.actions = {};
            this.props = {};
            this.model = {};
        },
    },
});

export default useModal;

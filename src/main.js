import { createApp } from 'vue'
import App from './App.vue'
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns"
import { ButtonPlugin } from "@syncfusion/ej2-vue-buttons"

const app = createApp(App)
app.use(DropDownListPlugin)
app.use(ButtonPlugin)
app.mount('#app')

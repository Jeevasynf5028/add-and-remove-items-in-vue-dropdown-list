<template>
    <div class="controls">
      <div class="dropdownlist">
        <br>
        <ejs-dropdownlist  ref='dropdownObj' popupHeight="200px" popupWidth="250px" 
        :dataSource='dataItem' :fields='dataFields' 
        placeholder='Select a game'>
        </ejs-dropdownlist>
      </div>
      <div id="button-controls">
        <div class="button_add">
          <ejs-button :isPrimary="true" v-on:click.native="addItems">
          Add</ejs-button>
        </div>
        <div class="button_clear">
          <ejs-button :isPrimary="true" v-on:click.native="clearText">
          Clear</ejs-button>
        </div>
        <div class="button_remove">
          <ejs-button :isPrimary="true" v-on:click.native="removeItems">
          Remove</ejs-button>
        </div>  
      </div>    
    </div>
</template>

<script>
import Vue from "vue";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(DropDownListPlugin);
import { ButtonPlugin } from "@syncfusion/ej2-vue-buttons";
Vue.use(ButtonPlugin);

export default Vue.extend({
  data: function() {
    return {
        dataItem: [
          { Id: 'game1', Game: 'Baseball' },
          { Id: 'game2', Game: 'Basketball' },
          { Id: 'game3', Game: 'Volleyball' }
        ],
      dataFields: { text: 'Game', value: 'Id' },
    };
  },
  methods: {
    addItems: function(){
       this.$refs.dropdownObj.addItem({Id: 'game4', Game: 'Football'}, 0);
    },
    clearText: function () {
      this.$refs.dropdownObj.ej2Instances.value = null;
      this.$refs.dropdownObj.dataBind();
    },
    removeItems: function() {
      if(this.$refs.dropdownObj.getItems().length > 1) {
        this.$refs.dropdownObj.getItems()[0].remove();
        this.$refs.dropdownObj.dataSource.splice(0, 1);
        } 
    } 
  }
});

</script>
<style>
@import url(https://cdn.syncfusion.com/ej2/material.css);

#button-controls {
  display: inline-block;
  margin-top: 17%;
}
.controls {
  display: inline-block;
  width: 100%;
}
.dropdownlist {
 width: 250px;
 margin-top: 15%;
 margin-bottom: 15%;
 margin-left: 25%;
 margin-right: 1%;
 float: left;
}
.button_add {
float: left;
padding-left: 10px;
padding-right: 10px;
}
.button_clear {
float: left;
padding-left: 10px;
padding-right: 10px;
}
.button_remove {
float: right;
padding-left: 10px;
padding-right: 10px;
}
</style>
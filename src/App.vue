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
          <ejs-button :isPrimary="true" @click="addItems">
          Add</ejs-button>
        </div>
        <div class="button_clear">
          <ejs-button :isPrimary="true" @click="clearText">
          Clear</ejs-button>
        </div>
        <div class="button_remove">
          <ejs-button :isPrimary="true" @click="removeItems">
          Remove</ejs-button>
        </div>
      </div>    
    </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
        dataItem: [
          { Id: 'game1', Game: 'Baseball' },
          { Id: 'game2', Game: 'Basketball' },
          { Id: 'game3', Game: 'Volleyball' }
        ],
      dataFields: { text: 'Game', value: 'Id' },
      gameCounter: 4, // Counter for generating unique IDs
      availableGames: ['Football', 'Tennis', 'Cricket', 'Soccer', 'Hockey', 'Golf', 'Swimming', 'Boxing']
    };
  },
  methods: {
    addItems(){
       // Add a random game from available games that's not already in the list
       const currentGames = this.dataItem.map(item => item.Game);
       const availableOptions = this.availableGames.filter(game => !currentGames.includes(game));
       
       if (availableOptions.length > 0) {
         const randomGame = availableOptions[Math.floor(Math.random() * availableOptions.length)];
         const newItem = { Id: `game${this.gameCounter}`, Game: randomGame };
         
         // Add to data source
         this.dataItem.push(newItem);
         
         // Update dropdown
         const dropdown = this.$refs.dropdownObj.ej2Instances;
         dropdown.dataSource = this.dataItem;
         dropdown.dataBind();
         
         this.gameCounter++;
         
         console.log(`Added: ${randomGame}`);
       } else {
         alert('All available games have been added!');
       }
    },
    clearText() {
      // Clear the selected value
      const dropdown = this.$refs.dropdownObj.ej2Instances;
      dropdown.value = null;
      dropdown.text = '';
      dropdown.dataBind();
      console.log('Cleared selected value');
    },
    removeItems() {
      const dropdown = this.$refs.dropdownObj.ej2Instances;
      
      if(this.dataItem.length > 1) {
        // Get currently selected item
        const selectedValue = dropdown.value;
        
        if (selectedValue) {
          // Remove the selected item
          const selectedIndex = this.dataItem.findIndex(item => item.Id === selectedValue);
          if (selectedIndex > -1) {
            const removedGame = this.dataItem[selectedIndex].Game;
            this.dataItem.splice(selectedIndex, 1);
            
            // Update dropdown
            dropdown.dataSource = this.dataItem;
            dropdown.value = null;
            dropdown.text = '';
            dropdown.dataBind();
            
            console.log(`Removed: ${removedGame}`);
          }
        } else {
          // If no item is selected, remove the last item
          const removedGame = this.dataItem[this.dataItem.length - 1].Game;
          this.dataItem.pop();
          
          // Update dropdown
          dropdown.dataSource = this.dataItem;
          dropdown.dataBind();
          
          console.log(`Removed: ${removedGame}`);
        }
      } else {
        alert('Cannot remove the last item!');
      }
    } 
  }
};

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
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

/* Main container styling */
.controls {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Dropdown section */
.dropdownlist {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Remove the br tag and add proper spacing */
.dropdownlist br {
  display: none;
}

/* Dropdown component styling */
.dropdownlist .e-dropdownlist {
  min-width: 300px;
  height: 40px;
}

.dropdownlist .e-input-group {
  border: 2px solid #e9ecef;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.dropdownlist .e-input-group:hover,
.dropdownlist .e-input-group.e-input-focus {
  border-color: #007bff;
}

/* Button controls container */
#button-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Individual button containers */
.button_add,
.button_clear,
.button_remove {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* Button styling */
#button-controls .e-btn {
  min-width: 120px;
  height: 40px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Button hover effects */
.button_add .e-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.button_clear .e-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.button_remove .e-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

/* Different button colors */
.button_add .e-btn {
  background-color: #28a745;
  border-color: #28a745;
}

.button_clear .e-btn {
  background-color: #007bff;
  border-color: #007bff;
}

.button_remove .e-btn {
  background-color: #dc3545;
  border-color: #dc3545;
}

/* Responsive design */
@media (max-width: 768px) {
  .controls {
    margin: 20px;
    padding: 15px;
  }
  
  #button-controls {
    flex-direction: column;
    gap: 10px;
  }
  
  .button_add,
  .button_clear,
  .button_remove {
    flex: none;
    width: 100%;
  }
  
  .dropdownlist .e-dropdownlist {
    min-width: 100%;
  }
}

/* Additional visual enhancements */
.controls::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #007bff, #28a745, #ffc107, #dc3545);
  border-radius: 14px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.controls {
  position: relative;
}

.controls:hover::before {
  opacity: 0.1;
}

/* Title/Header styling */
.controls::after {
  content: "Dropdown Controls Demo";
  display: block;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e9ecef;
}
</style>

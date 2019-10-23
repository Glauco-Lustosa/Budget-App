//Clouser
var budgetController = (function() {
  //Do some code
  // This is the exmpensevalues we atribute a ID , Description and value
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  // This is the income values we atribute a ID , Description and value
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  // We use this obj to store our data and values exp and inc
  var data = {
    allitem: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
  // the budgetController return a metod add item
  return {
    // This method take 3 parameters type des and val.
    addItem: function(type, des, val) {
      var newItem, iD;
      // Create new ID
      // ID = last ID +1
      // this is the logic of ID, the ID always be calculate based on array legnth
      if (data.allitem[type].length > 0) {
        iD = data.allitem[type][data.allitem[type].length - 1].id + 1;
      } else {
        iD = 0;
      }
      // Create new item based on inc  or exp type
      if (type === "exp") {
        newItem = new Expense(iD, des, val);
      } else if (type === "inc") {
        newItem = new Income(iD, des, val);
      }
      // Push it into our data structure
      data.allitem[type].push(newItem);
      // Return the new element
      return newItem;
    },
    // We can use this method to test our code data
    testing: function() {
      console.log(data);
    }
  };
})();
// The Ui controller controls everthing in the UI for now we just get a DOM values and put inside a obj to make
var UIController = (function() {
  // Crete a variable to store string, because if we want to change some class we just need to change the name of variable.
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
  };

  return {
    // Method to return 3 values
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // income ande exp values
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    addListItem: function(obj, type) {
      var html, newHtml, element;
      // create HTML string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%iD%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%iD%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placholder text with some actual data.

      newHtml = html.replace("%iD%", obj.iD);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      // insert the html into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    // Expose DOMstrings to public to be acessable in other part of code
    // Replace() --> search for string and replace for anther thing
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// this mix UI and Budget controler in a single function
// GlobalController is the main function IIFE, this recive two Parameters  budgetController, UIController

var GlobalController = (function(budgetCtrl, UICtrl) {
  // Initialize event Listeners just it
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAdditem);

    document.addEventListener("keypress", function(event) {
      // event.wich is most commum then keycode
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAdditem();
      }
    });
  };

  // Fuction to add a item
  // This Function adds a item and
  var ctrlAdditem = function() {
    var input, newItem;
    // 1. Get the filed input data
    //getInput is the public method inside a IIFE
    // we just get the DOM manipulator and put inside a variable
    input = UICtrl.getInput();
    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    //3. Add the new item to the UI
    UICtrl.addListItem(newItem, input.type);
    //4. Calculate the budget
    //5. Display the budget on the UI
  };

  // Place to initializate ower code
  return {
    init: function() {
      console.log("Aplication has started ");
      setupEventListeners();
    }
  };
  //ctrlAdditem --> is a callback for add item
})(budgetController, UIController);

GlobalController.init();

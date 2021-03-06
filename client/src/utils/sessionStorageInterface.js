const storage = {
    set: function(key, value) {
      if (!key || !value) {return;}
  
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
     sessionStorage.setItem(key, value);
    },
    get: function(key) {
      let value = sessionStorage.getItem(key);
  
      if (!value) {return;}
  
      // assume it is an object that has been stringified
      if (value[0] === "{") {
        value = JSON.parse(value);
      }
  
      return value;
    }
  }

  export default storage;
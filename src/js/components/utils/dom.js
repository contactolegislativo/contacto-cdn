
export function createOption(attr) {
    var option = document.createElement('option');
    option.innerHTML = attr.name;
    option.value = attr.id;
    option.id = attr.id;
    return option;
  }

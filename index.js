var productName = document.getElementById("productName");
var productUrl = document.getElementById("productUrl");
var btnAdd = document.getElementById("btnSubmit");
var btnUpdate = document.getElementById("btnupdate");
var productCountainer = [];

if (localStorage.getItem("products") !== null) {
    productCountainer = JSON.parse(localStorage.getItem("products"));
    display();
}

function addProduct() {
    if (validateForm(productName) && validateForm(productUrl)) {
        var productExists = productCountainer.some(function (product) {
            return product.Name.toLowerCase() === productName.value.toLowerCase();
        });
        if (productExists) {
            Swal.fire({
                title: "Product name already exists!",
                icon: "error",
                text: "Please enter a different product name."
            });
        } else {
            var product = {
                Name: productName.value,
                Url: productUrl.value
            };
            productCountainer.push(product);
            localStorage.setItem("products", JSON.stringify(productCountainer));
            display();
            clearForm();
        }
    } else {
        Swal.fire({
            title: "Site Name or Url is not valid, Please follow the rules below :",
            icon: "question",
            iconHtml: "?",
            confirmButtonText: "Site name must contain at least 3 characters",
            cancelButtonText: "Site URL must be a valid one",
            showCancelButton: true,
            showCloseButton: true
        });
    }
}


function display() {
    var cartona = '';
    for (var i = 0; i < productCountainer.length; i++) {
        cartona += createCollms(i);
    }
    document.getElementById("demo").innerHTML = cartona;
}

function clearForm() {
    productName.value = null;
    productUrl.value = null;
    productName.classList.remove("is-valid");
    productUrl.classList.remove("is-valid");
}

function createCollms(i) {
    return `
    <tr>
      <td>${i + 1}</td>
            <td>${productCountainer[i].Name}</td>
            <td>
              <button class="btn btn-success">
                <a target="_blank" href="${productCountainer[i].Url}" class="text-decoration-none text-light">
                  <i class="fa-solid fa-eye pe-2"></i>
                  Visit
                </a>
              </button>
            </td>
            <td>
              <button class="btn btn-danger pe-2 text-light" onclick="deleteProduct(${i})">
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </button>
            </td>
            <td>
              <button class="btn btn-warning pe-2 text-light" onclick="setFormUpdate(${i})">
              <i class="fa-solid fa-gear"></i>                
                Update
              </button>
            </td>
        </tr>
    `
}

function deleteProduct(delet) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success mx-3",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productCountainer.splice(delet, 1);
            localStorage.setItem("products", JSON.stringify(productCountainer));
            display();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
}

var updateIndex;

function setFormUpdate(i) {
    updateIndex = i;
    productName.value = productCountainer[i].Name;
    productUrl.value = productCountainer[i].Url;
    btnAdd.classList.add("d-none");
    btnUpdate.classList.remove("d-none");
}

function validateForm(ele) {
    var regex = {
        productName: /^[A-z]{3,10}( [A-z]{1,10}){0,1}$/,
        productUrl: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

    }
    if (regex[ele.id].test(ele.value)) {
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
        ele.nextElementSibling.classList.add("d-none");
        return true;
    }
    else {
        ele.classList.add("is-invalid");
        ele.classList.remove("is-valid");
        ele.nextElementSibling.classList.remove("d-none");
        return false;
    }
}
function updateProduct() {
    if (validateForm(productName) && validateForm(productUrl)) {
        var productExists = productCountainer.some(function (product) {
            return product.Name.toLowerCase() === productName.value.toLowerCase();
        });
        if (productExists) {
            Swal.fire({
                title: "Product name already exists!",
                icon: "error",
                text: "Please enter a different product name."
            });
        } else {
            productCountainer[updateIndex].Name = productName.value;
            productCountainer[updateIndex].Url = productUrl.value;
            display();
            localStorage.setItem('products', JSON.stringify(productCountainer));
            btnAdd.classList.remove("d-none");
            btnUpdate.classList.add("d-none");
            clearForm();
        }
    } else {
        Swal.fire({
            title: "Site Name or Url is not valid, Please follow the rules below :",
            icon: "question",
            iconHtml: "?",
            confirmButtonText: "Site name must contain at least 3 characters",
            cancelButtonText: "Site URL must be a valid one",
            showCancelButton: true,
            showCloseButton: true
        });
    }
}

function searchProduct() {
    var term = searchBtn.value;
    var cartona = '';
    for (var i = 0; i < productCountainer.length; i++) {
        if (productCountainer[i].Name.toLowerCase().includes(term.toLowerCase())) {
            cartona += createCollms(i);
        }
    }
    document.getElementById("demo").innerHTML = cartona;
}
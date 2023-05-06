function createDropDownInput(optionsList) {
    var input = $("#input");
    var dropdownOptions = $("#dropdown-options");

    input.focus(function () {
        dropdownOptions.show();
    });

    dropdownOptions.on("click", "li", function () {
        var selectedValue = $(this).data("value");
        input.val(selectedValue);
        dropdownOptions.hide();
    });

    input.on("input", function () {
        var text = input.val().toUpperCase();
        if (text === "") {
            renderDepTypes(depTypes);
            input[0].setCustomValidity(""); // Reset custom validity message
        } else {
            var filteredOptions = depTypes.filter(function (option) {
                return option.toUpperCase().indexOf(text) > -1;
            });
            renderDepTypes(filteredOptions);
            if (filteredOptions.length === 0) {
                input[0].setCustomValidity("אנא בחר את סוג המחלקה מתוך הרשימה");
            } else {
                input[0].setCustomValidity(""); // Reset custom validity message
            }
        }
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".custom-dropdown").length) {
            dropdownOptions.hide();
        }
    });
}

function renderDepTypes(typesArr) {
    let str = "";
    for (var i = 0; i < typesArr.length; i++) {
        str += `<li data-value="${typesArr[i]}">${typesArr[i]}</li>`;
    }
    $("#dropdown-options").empty().append(str);
}
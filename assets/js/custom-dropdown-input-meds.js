function createDropDownMedsInput(optionsList) {
    var input = $("#medInput");
    var dropdownOptions = $("#meds-dropdown-options");
    var isInputClicked = false;

    input.click(function (e) {
        e.stopPropagation(); // Prevent the click event from bubbling up

        if (!dropdownOptions.is(":visible")) {
            dropdownOptions.show();
        }

        isInputClicked = true;
    });

    input.focus(function () {
        if (!isInputClicked) {
            dropdownOptions.show();
        }
    });

    dropdownOptions.on("click", "li", function (e) {
        var selectedValue = $(this).data("value");
        input.val(selectedValue);
        dropdownOptions.hide();
        isInputClicked = false;
        e.stopPropagation(); // Prevent the click event from propagating to document click event
    });

    input.on("input", function () {
        var text = input.val().toUpperCase();
        if (text === "") {
            renderMedsOptions(optionsList);
            input[0].setCustomValidity(""); // Reset custom validity message
            dropdownOptions.show(); // Show dropdown options when input is empty
        } else {
            var filteredOptions = optionsList.filter(function (option) {
                return option.toUpperCase().indexOf(text) > -1;
            });
            renderMedsOptions(filteredOptions);
            if (filteredOptions.length === 0) {
                input[0].setCustomValidity("אנא בחר את סוג המחלקה מתוך הרשימה");
            } else {
                input[0].setCustomValidity(""); // Reset custom validity message
            }
            dropdownOptions.show(); // Show dropdown options when input has text
        }
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".custom-dropdown").length) {
            dropdownOptions.hide();
            isInputClicked = false;
        }
    });
}

function renderMedsOptions(Arr) {
    let str = "";
    for (var i = 0; i < Arr.length; i++) {
        str += `<li id="${Arr[i]['medId']}" data-value="${Arr[i]['medName']}">${Arr[i]['medName']}</li>`;
    }
    $("#meds-dropdown-options").empty().append(str);
}


//function createDropDownMedsInput(optionsList) {
//    var input = $("#medInput");
//    var dropdownOptions = $("#meds-dropdown-options");
//    var isInputClicked = false;

//    input.click(function (e) {
//        e.stopPropagation();
//        dropdownOptions.toggle();
//        isInputClicked = true;
//    });

//    input.focus(function () {
//        if (!isInputClicked) {
//            dropdownOptions.show();
//        }
//    });

//    dropdownOptions.on("click", "li", function (e) {
//        var selectedValue = $(this).data("value");
//        input.val(selectedValue);
//        dropdownOptions.hide();
//        isInputClicked = false;
//        e.stopPropagation();
//    });

//    input.on("input", function () {
//        var text = input.val().toUpperCase();
//        if (text === "") {
//            renderMedsOptions(optionsList.slice(0, 4));
//            input[0].setCustomValidity("");
//            dropdownOptions.show();
//        } else {
//            var filteredOptions = optionsList.filter(function (option) {
//                return option.toUpperCase().indexOf(text) > -1;
//            });
//            renderMedsOptions(filteredOptions.slice(0, 4));
//            input[0].setCustomValidity(filteredOptions.length === 0 ? "אנא בחר את סוג המחלקה מתוך הרשימה" : "");
//            dropdownOptions.show();
//        }
//    });

//    $(document).on("click", function (e) {
//        if (!$(e.target).closest(".custom-dropdown").length) {
//            dropdownOptions.hide();
//            isInputClicked = false;
//        }
//    });
//}

//function renderMedsOptions(arr) {
//    var options = arr.map(function (item) {
//        return `<li id="${item.medId}" data-value="${item.medName}">${item.medName}</li>`;
//    });
//    $("#meds-dropdown-options").html(options);
//}

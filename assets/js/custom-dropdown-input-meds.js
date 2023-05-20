﻿function createDropDownMedsInput(optionsList) {
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
            renderOptions(optionsList);
            input[0].setCustomValidity(""); // Reset custom validity message
            dropdownOptions.show(); // Show dropdown options when input is empty
        } else {
            var filteredOptions = optionsList.filter(function (option) {
                return option.toUpperCase().indexOf(text) > -1;
            });
            renderOptions(filteredOptions);
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
        str += `<li data-value="${Arr[i]}">${Arr[i]}</li>`;
    }
    $("#meds-dropdown-options").empty().append(str);
}
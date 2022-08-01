$(function() {

    // Select Dropdown
    $('html').on('click', function() {
        $('.select .dropdown').hide();
    });
    $('.select').on('click', function(event) {
        event.stopPropagation();
    });
    $('.select .select-control').on('click', function() {
        $(this).parent().next().toggle();
    })
    $('.select .dropdown li').on('click', function() {
        $(this).parent().toggle();
        var text = $(this).attr('rel');
        $(this).parent().prev().find('div').text(text);
    })

    $(".step-box-content ").on('click', function() {

        $(".step-box-content").removeClass("active");
        $(this).addClass("active");
    });

    $(".services-select-option li").on('click', function() {

        $(".services-select-option li").removeClass("active");
        $(this).addClass("active");
    });

    $(".opti-list ul li").on('click', function(e) {
        $(this).find('input[type=checkbox]').prop("checked", !$(this).find('input[type=checkbox]').prop("checked"));

        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
    });

    $('input[type=checkbox]').click(function(e) {
        e.stopPropagation();
        return true;
    });

    $(".plan-icon-text").on('click', function() {
        $(this).find('input[type=radio]').prop("checked", true);
        $(".plan-icon-text").removeClass("active");
        $(this).addClass("active");
    });

    //DOM elements
    const DOMstrings = {
        stepsBtnClass: 'multisteps-form__progress-btn',
        stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
        stepsBar: document.querySelector('.multisteps-form__progress'),
        stepsForm: document.querySelector('.multisteps-form__form'),
        stepFormPanelClass: 'multisteps-form__panel',
        stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
        stepPrevBtnClass: 'js-btn-prev',
        stepNextBtnClass: 'js-btn-next'
    };


    //remove class from a set of items
    const removeClasses = (elemSet, className) => {

        elemSet.forEach(elem => {

            elem.classList.remove(className);

        });

    };

    //return exect parent node of the element
    const findParent = (elem, parentClass) => {

        let currentNode = elem;

        while (!currentNode.classList.contains(parentClass)) {
            currentNode = currentNode.parentNode;
        }

        return currentNode;

    };

    //get active button step number
    const getActiveStep = elem => {
        return Array.from(DOMstrings.stepsBtns).indexOf(elem);
    };

    //set all steps before clicked (and clicked too) to active
    const setActiveStep = activeStepNum => {

        //remove active state from all the state
        removeClasses(DOMstrings.stepsBtns, 'js-active');
        removeClasses(DOMstrings.stepsBtns, 'current');

        //set picked items to active
        DOMstrings.stepsBtns.forEach((elem, index) => {
            if (index <= activeStepNum) {
                elem.classList.add('js-active');
                $(elem).addClass(index);

            }

            if (index == activeStepNum) {
                elem.classList.add('current');
            }


        });
    };

    //get active panel
    const getActivePanel = () => {

        let activePanel;

        DOMstrings.stepFormPanels.forEach(elem => {

            if (elem.classList.contains('js-active')) {

                activePanel = elem;

            }

        });

        return activePanel;

    };

    //open active panel (and close unactive panels)
    const setActivePanel = activePanelNum => {

        const animation = $(DOMstrings.stepFormPanels, 'js-active').attr("data-animation");

        //remove active class from all the panels
        removeClasses(DOMstrings.stepFormPanels, 'js-active');
        removeClasses(DOMstrings.stepFormPanels, animation);
        removeClasses(DOMstrings.stepFormPanels, 'animate__animated');

        //show active panel
        DOMstrings.stepFormPanels.forEach((elem, index) => {
            if (index === activePanelNum) {

                elem.classList.add('js-active');
                // stepFormPanels
                elem.classList.add('animate__animated', animation);

                setTimeout(function() {
                    removeClasses(DOMstrings.stepFormPanels, 'animate__animated', animation);
                }, 1200);

                setFormHeight(elem);

            }
        });

    };


    //set form height equal to current panel height
    const formHeight = activePanel => {

        const activePanelHeight = activePanel.offsetHeight;

        DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;

    };

    const setFormHeight = () => {
        const activePanel = getActivePanel();

        formHeight(activePanel);
    };

    DOMstrings.stepsBar.addEventListener('click', e => {
        const eventTarget = e.target;

        if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
            return;
        }

        const activeStep = getActiveStep(eventTarget);
    });

    DOMstrings.stepsForm.addEventListener('click', e => {

        const eventTarget = e.target;

        if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`))) {
            return;
        }

        const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

        let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);
        if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
            activePanelNum--;

            setActiveStep(activePanelNum);
            setActivePanel(activePanelNum);

        } else if (eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)) {

            var form = $('#wizard');
            form.validate();


            var parent_fieldset = $('.multisteps-form__panel.js-active');
            var next_step = true;

            parent_fieldset.find('.required').each(function() {
                next_step = false;
                var form = $('.required');
                form.validate();
                $(this).addClass('custom-select is-invalid');
            });

            if (next_step === true || form.valid() === true) {
                $("html, body").animate({
                    scrollTop: 0
                }, 600);
                activePanelNum++;
                setActiveStep(activePanelNum);
                setActivePanel(activePanelNum);
            }


        }


    });

    //SETTING PROPER FORM HEIGHT ONLOAD
    window.addEventListener('load', setFormHeight, true);

    //SETTING PROPER FORM HEIGHT ONRESIZE
    window.addEventListener('resize', setFormHeight, true);
})


//TELEPHONE MASK
const telephoneMaskBehavior = function(val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000 0000' : '(00) 0000 00009';
};
const telephoneMaskOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(telephoneMaskBehavior.apply({}, arguments), options);
    }
};

$('#phone').mask(telephoneMaskBehavior, telephoneMaskOptions);


function RSetContato(escolha) {
    document.querySelector('.js-btn-next').click();
    if (escolha == "poremail") {
        $("#txtFormIni").html("Preencha o dado solicitado para finalizar.");
        $("#txtMinimoSobre").html("Gerar Script");
        document.getElementById("type_ID").setAttribute("value", "email");
        
        document.getElementById("txtMinimoSobre").setAttribute("class", "flash");
        setTimeout(function() {
            document.getElementById("txtMinimoSobre").setAttribute("class", "");
        }, 1500);

        //talkAssistente("Luciana","Como devemos te chamar?");
        $("#escolhasContato").hide();
        document.getElementById("phone").value = '6199999999';
        verificarDigitarEmail();
        formularioValidarEmail();
        setTimeout(function() {
            $("#email").show();
            $("#email").focus();
            $("#phone").hide();
        }, 100);
    } else {
        $("#txtFormIni").html("Preencha o dado solicitado para finalizar.");
        $("#txtMinimoSobre").html("Gerar Script");
        document.getElementById("type_ID").setAttribute("value", "phone");

        document.getElementById("txtMinimoSobre").setAttribute("class", "flash");
        setTimeout(function() {
            document.getElementById("txtMinimoSobre").setAttribute("class", "");
        }, 1500);
        $("#escolhasContato").hide();
        document.getElementById("email").value = 'teste@gmail.com';
        verificarDigitarTelefone();
        formularioValidarTelefone();
        setTimeout(function() {
            $("#phone").show();
            $("#phone").focus();
            $("#email").hide();
        }, 100);
    }
}

function piscarUltimo() {

  document.getElementById("tituloRelato").setAttribute("class", "flash");
  var type_ID = document.getElementById("type_ID").value;
  if(type_ID == 'email'){
  var dataID = document.getElementById("email").value;
  } else {
  var dataID = document.getElementById("phone").value;
  }

  $.ajax({url: './src/SIA.php',type: 'POST',async : true,data: { dataID: dataID, typeID: typeID },beforeSend: function() { /*app.preloader.show();*/},
  complete: function(){ /*$loading.addClass('hide');*/ },success: function(json) {  
    
    if (json.status == "1") {
    setTimeout(function() {
        $('.tituloTextoLoading').html('Carregando informações...');
        document.getElementById("ldg01").setAttribute("style", "display:block;");
    }, 10);
    setTimeout(function() {
        document.getElementById("tituloRelato").setAttribute("class", "");
        $("#ldg01").hide();
        $("#ratingAuto").show();
        //Buscando o perfil do cliente
        $("#rating-4").click();
        $("#tituloRelato").html("Sigas as etapas a seguir com o "+json.name+"");
        $("#descricaoRelato").html(""+json.instrucoes+"");
    }, 1500);
    return false;
    }
    if (json.status == "0") {
    console.log("Um erro ocorreu. Tente novamente.");
    return false;
    }
    if (json.status == "4") {
    console.log("Erro na comunicação. Tente novamente.");
    return false;
    }

  },
  });
  
}

function verificarDigitarEmail() {

    var delay = (function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })()

    //Nome
    let $filter = $('#full_name');
    $filter.on('keydown', function() {
        delay(function() {
            $("#email").focus();
        }, 1000);
    });

}


function verificarDigitarTelefone() {

    var delay = (function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })()

    //Nome
    let $filter = $('#full_name');
    $filter.on('keydown', function() {
        delay(function() {
            $("#phone").focus();
        }, 2000);
    });

}



function formularioValidarEmail() {

    function validateEmail(email) {
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (reg.test(email)) {
            return true;
        } else {
            return false;
        }
    }


    function isAnyEmpty(el) {

        var isEmpty = false,
            v;
        el.each(function(e) {
            v = $(this).val();

            if (isEmpty == false) {
                if (validateEmail(document.getElementById("email").value) == false) {
                    isEmpty = true;
                } else {
                    isEmpty = false;
                }
            }

            if (v == "" || v == null || v == undefined) {
                isEmpty = true
            }
        });
        return isEmpty;
    }

    var el = $('input');
    el.on('keyup', function() {
        //console.log(isAnyEmpty(el));

        if (isAnyEmpty(el) == false) {
            document.getElementById("btnAcessar").setAttribute("style", "text-align: center;display:block;opacity:1.0 !important;background-color:#1A1A1A;z-index:0;position: fixed;bottom: 0px;cursor: pointer;width: 92%;left: 50%;margin-right: -50%;transform: translate(-50%, -50%);");
        } else {
            document.getElementById("btnAcessar").setAttribute("style", "display:none;background-color:gray;opacity:0.3 !important;");
        }

        $('#btnAcessar').prop('disabled', isAnyEmpty(el));
    });
}

function formularioValidarTelefone() {

    function validateEmail(email) {
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (reg.test(email)) {
            return true;
        } else {
            return false;
        }
    }


    function isAnyEmpty(el) {

        var isEmpty = false,
            v;
        el.each(function(e) {
            v = $(this).val();


            if (v == "" || v == null || v == undefined) {
                isEmpty = true
            }
        });
        return isEmpty;
    }

    var el = $('input');
    el.on('keyup', function() {
        //console.log(isAnyEmpty(el));

        if (isAnyEmpty(el) == false) {
            document.getElementById("btnAcessar").setAttribute("style", "text-align: center;display:block;opacity:1.0 !important;background-color:#1A1A1A;z-index:0;position: fixed;bottom: 0px;cursor: pointer;width: 92%;left: 50%;margin-right: -50%;transform: translate(-50%, -50%);");
        } else {
            document.getElementById("btnAcessar").setAttribute("style", "display:none;background-color:gray;opacity:0.3 !important;");
        }

        $('#btnAcessar').prop('disabled', isAnyEmpty(el));
    });
}
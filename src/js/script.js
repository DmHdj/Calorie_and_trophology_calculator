'use strict';

// Tabs
const tabsParent = document.querySelector('.tabtoggler_wrapper'),
      tabs = tabsParent.querySelectorAll('.tabtoggler_item'),
      tabsContent = document.querySelectorAll('article');


function hideTabContent () {
    tabsContent.forEach(item => {
        item.classList.remove('activ');
        item.classList.add('hide');
    });

    tabs.forEach(tab => {
        tab.classList.remove('tabtoggler_item_activ');
    });
}

function showTabsContent (i = 0) {
        tabsContent[i].classList.add('activ');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabtoggler_item_activ');
}

hideTabContent();
showTabsContent();

tabsParent.addEventListener('click', event => {
    if (event.target && event.target.classList.contains('tabtoggler_item')) {
        tabs.forEach((item, i) => {
            if (event.target === item) {
                hideTabContent();
                showTabsContent(i);
            }
        });
    }
});

// Adding input characteristics depending on gender

const formTrophological = document.querySelector('.trophological_calc'),
      gendersTrophological = formTrophological.querySelectorAll('[data-gender]'),
      biceps = formTrophological.querySelector('[data-biceps]'),
      shoulder = formTrophological.querySelector('[data-shoulder]'),
      thigh = formTrophological.querySelector('[data-thigh]');
   
function showAdditionalInputs () {
    biceps.classList.remove('hide');
    shoulder.classList.remove('hide');
    thigh.classList.remove('hide');

    biceps.classList.add('activ');
    shoulder.classList.add('activ');
    thigh.classList.add('activ'); 
}

function hideAdditionalInputs () {
    biceps.classList.remove('activ');
    shoulder.classList.remove('activ');
    thigh.classList.remove('activ');
    
    biceps.classList.add('hide');
    shoulder.classList.add('hide');
    thigh.classList.add('hide'); 
}

gendersTrophological.forEach(item => {
    item.addEventListener('click', event => {
        if (event.target.defaultValue === "female" && event.target.checked) {
            showAdditionalInputs();
        } else {
            hideAdditionalInputs();
        }
    });
});

// Calculation of proteins, fats, carbohydrates

const formPfc = document.querySelector('.pfc_calc'),
      gendersPfc = formPfc.querySelectorAll('[data-gender="pfc"]'),
      heightPfc = formPfc.querySelector('#pfc_height'),
      weightPfc = formPfc.querySelector('#pfc_weight'),
      agePfc = formPfc.querySelector('#pfc_age'),
      btnPfc = formPfc.querySelector('#calculate'),
      weightFactorPfc = 10,
      heightFactorPfc = 6.25,
      ageFactorPfc = 5,
      maleFactorPfc = 5,
      femaleFactorPfc = 161; 

function calculatePfc (gender) {
    let result;
    if (gender === 'male') {
        console.log('муж');
        result = (weightFactorPfc * +weightPfc.value) + (heightFactorPfc * +heightPfc.value) - (ageFactorPfc * +agePfc.value) + maleFactorPfc;
        
        return result;
    } else {
        console.log('жен');
        result = (weightFactorPfc * +weightPfc.value) + (heightFactorPfc * +heightPfc.value) - (ageFactorPfc * +agePfc.value) - femaleFactorPfc;

        return result;
    }
}

btnPfc.addEventListener('click', event => {
    event.preventDefault();

    let calories;
    gendersPfc.forEach(item => {
        // console.log(item.defaultValue);
        if (item.defaultValue === "male" && item.checked) {
            calories = calculatePfc(item.defaultValue);
        } else if (item.defaultValue === "female" && item.checked) {
            calories = calculatePfc(item.defaultValue);
        }
    });

    console.log(calories);

});








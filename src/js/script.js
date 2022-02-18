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
      btnPfc = formPfc.querySelector('#calculatePfc'),
      parentResultPfc = document.querySelector('.pfc_result'),
      weightFactorPfc = 10,
      heightFactorPfc = 6.25,
      ageFactorPfc = 5,
      maleFactorPfc = 5,
      femaleFactorPfc = 161,
      proteinPerKilogram = 1.5,
      fatPerKilogram = 1,
      caloriesPerGramProtein = 4,
      caloriesPerGramFat = 9, 
      caloriesPerGramCH = 4,
      resultPfc = {
        calories: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0
      };
// for modal
const modal = document.querySelector('.modal'),
      btnModalClose = modal.querySelector('[data-close]');

function getValueReplaceComma(input) {
    return parseFloat(input.value.replace(',', '.'));
}


function calculatePfc (gender) {
    const weight = getValueReplaceComma(weightPfc),
          height = getValueReplaceComma(heightPfc),
          age = getValueReplaceComma(agePfc);

    if (gender === 'male') {
        resultPfc.calories = (weightFactorPfc * weight) + (heightFactorPfc * height) - (ageFactorPfc * age) + maleFactorPfc;        
    } else {
        resultPfc.calories = (weightFactorPfc * weight) + (heightFactorPfc * height) - (ageFactorPfc * age) - femaleFactorPfc;
    }

    resultPfc.proteins = proteinPerKilogram * weight;

    resultPfc.fats = fatPerKilogram * weight;

    resultPfc.carbohydrates = (resultPfc.calories - (resultPfc.proteins * caloriesPerGramProtein) - (resultPfc.fats * caloriesPerGramFat)) / caloriesPerGramCH;
}

function printResultPfc () {
    let {calories, proteins, fats, carbohydrates} = resultPfc;

    parentResultPfc.innerHTML = '';

    parentResultPfc.innerHTML += `
        <li class="result_item">Калории: ${calories.toFixed(0)}</li>
        <li class="result_item">Белки: ${fats.toFixed(0)}</li>
        <li class="result_item">Жиры: ${proteins.toFixed(0)}</li>
        <li class="result_item">Углеводы: ${carbohydrates.toFixed(0)}</li>
    `;
}

function openModal () {
    modal.classList.toggle('activ');
    document.body.style.overflow = 'hidden';
}

function closeModal () {
    modal.classList.toggle('activ');
    document.body.style.overflow = '';  
}

btnPfc.addEventListener('click', event => {
    event.preventDefault();
    
    if ( heightPfc.value == '' || isNaN(+heightPfc.value.replace(',', '.')) || weightPfc.value == '' || isNaN(+weightPfc.value.replace(',', '.')) || agePfc.value == '' || isNaN(+agePfc.value.replace(',', '.'))) {
        console.log('attencion');
        openModal ();
    } else {
        gendersPfc.forEach(item => {
            if (item.defaultValue === "male" && item.checked) {
                calculatePfc(item.defaultValue);
            } else if (item.defaultValue === "female" && item.checked) {
                calculatePfc(item.defaultValue);
            }
        });
    
        printResultPfc();
    }
    
});

// close bodal
btnModalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
    closeModal();       
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('activ')) {
    closeModal();
    }
});

// calculation of human nutritional status
const heightTroph = formTrophological.querySelector('#trophological_height'),
      weightTroph = formTrophological.querySelector('#trophological_weight'),
      bellyTroph = formTrophological.querySelector('#trophological_belly'),
      bicepsTroph = biceps.querySelector('#trophological_biceps'),
      shoulderTroph = shoulder.querySelector('#trophological_shoulder'),
      thighTroph = thigh.querySelector('#trophological_thigh'),
      neckTroph = formTrophological.querySelector('#trophological_neck'),
      btnTroph = formTrophological.querySelector('#calculateTroph'),
      parentResultTroph = document.querySelector('.trophological_result'),
      factorForMale = {
        bodyWeight: 0.2,
        belly: 0.74,
        neck: 1.249,
        fatPercentFactor: 0.528
      },
      factorForFemale = {
        bodyWeight: 0.4,
        belly: 0.326,
        neck: 0.879,
        shoulder: 1.522,
        biceps: 1.051,
        thigh: 0.597,
        fatPercentFactor: 0.707
      },
    resultTroph = {
        bodyMassIndex: 0,
        recommendedBodyWeight: 0,
        deviationOfMass: 0,
        fatPercent: 0
    };

    console.log(heightTroph, weightTroph);

function calcBodyMassIndex () {
    const weight = getValueReplaceComma(weightTroph),
          height = getValueReplaceComma(heightTroph);

    const massIndex = weight / (height / 100) ** 2;

    resultTroph.bodyMassIndex = massIndex;

    if (massIndex > 20 && massIndex <= 25) {
        return `${massIndex.toFixed(1)} - Эйтрофия (нормальный)`;
    } else if (massIndex > 19  && massIndex <= 20) {
        return `${massIndex.toFixed(1)} - Пониженное питание`;
    } else if (massIndex > 17  && massIndex <= 19) {
        return `${massIndex.toFixed(1)} - Гипотрофия 1 стадии`;
    } else if (massIndex > 15  && massIndex <= 17) {
        return `${massIndex.toFixed(1)} - Гипотрофия 2 стадии`;
    } else if (massIndex > 25  && massIndex < 30) {
        return `${massIndex.toFixed(1)} - Повышенное питание`;
    } else if (massIndex >= 30  && massIndex < 35) {
        return `${massIndex.toFixed(1)} - Ожирение 1 стадии`;
    } else if (massIndex >= 35  && massIndex < 40) {
        return `${massIndex.toFixed(1)} - Ожирение 2 стадии`;
    } else if (massIndex >= 40) {
        return `${massIndex.toFixed(1)} - Ожирение 3 стадии`;
    } else {
        return `${massIndex.toFixed(1)} - Скорее всего, вы неверно ввели данные`;
    }
}

function calcRecommendedBodyWeight (gender) {
    let recomBodyWeight;
    const height = getValueReplaceComma(heightTroph);

    if (gender === 'male') {
        console.log('муж реком');
        recomBodyWeight = (height - 100) - ((height - 152) * factorForMale.bodyWeight);
    } else {
        console.log('жен реком');
        recomBodyWeight = (height - 100) - ((height - 152) * factorForFemale.bodyWeight);
    }

    resultTroph.recommendedBodyWeight = recomBodyWeight;
}

function calrDeviationOfMass (recomBodyWeight) {
    const weight = getValueReplaceComma(weightTroph);

    resultTroph.deviationOfMass = Math.round((weight * 100) / recomBodyWeight);
}

function culcFatPercent (gender) {
    const bellyInp = getValueReplaceComma(bellyTroph),
          bicepsInp = getValueReplaceComma(bicepsTroph),
          shoulderInp = getValueReplaceComma(shoulderTroph),
          thighInp = getValueReplaceComma(thighTroph),
          neckInp = getValueReplaceComma(neckTroph);

    if (gender === 'male') {
        let {belly, neck, fatPercentFactor} = factorForMale;

        resultTroph.fatPercent = ((belly * bellyInp) - (neck * neckInp)) + fatPercentFactor;
    } else {
        let {belly, neck, shoulder, biceps, thigh, fatPercentFactor} = factorForFemale;
    
        resultTroph.fatPercent = ((biceps * bicepsInp) - (shoulder * shoulderInp) - (neck * neckInp) + (belly * bellyInp) + (thigh * thighInp)) + fatPercentFactor;
    }
}

function printResultTroph () {
    let {recommendedBodyWeight, deviationOfMass, fatPercent} = resultTroph;

    parentResultTroph.innerHTML = '';

    parentResultTroph.innerHTML += `
        <li class="result_item">Индекс массы тела: ${calcBodyMassIndex()}</li>
        <li class="result_item">Рекомендуемая масса тела: ${recommendedBodyWeight.toFixed(1)}</li>
        <li class="result_item">Отклонение фактической массы тела от рекомендуемой: ${deviationOfMass.toFixed(1)} %</li>
        <li class="result_item">Процент жира: ${fatPercent.toFixed(1)}</li>
    `;
}

btnTroph.addEventListener('click', event => {
    event.preventDefault();

    gendersTrophological.forEach(item => {
        if (item.defaultValue === "male" && item.checked) {
            console.log('муж пол');
            calcRecommendedBodyWeight(item.defaultValue);

            culcFatPercent(item.defaultValue);
        } else if (item.defaultValue === "female" && item.checked) {
            console.log('жен пол');

            calcRecommendedBodyWeight(item.defaultValue);

            culcFatPercent(item.defaultValue);
        }
    });
    
    calrDeviationOfMass(resultTroph.recommendedBodyWeight);

    printResultTroph();

    console.log(typeof(resultTroph.recommendedBodyWeight));
});




